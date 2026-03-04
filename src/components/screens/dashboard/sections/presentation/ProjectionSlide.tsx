import { useEffect, useRef } from 'react';
import '../../../../../styles/dashboard-projection.css';
import { LEGACY_PROJECTION_HTML, LEGACY_PROJECTION_SCRIPT } from './projectionLegacy.generated';

interface ProjectionSlideProps {
  onGoToGoalStep: () => void;
}

type LegacyProjectionGlobalFn = (...args: any[]) => void;

declare global {
  interface Window {
    toggleSeries?: LegacyProjectionGlobalFn;
    highlightWeek?: LegacyProjectionGlobalFn;
    switchTableView?: LegacyProjectionGlobalFn;
    triggerCelebration?: LegacyProjectionGlobalFn;
  }
}

const NOOP = () => undefined;

const ensureCanvasContext = (canvas: HTMLCanvasElement | null): CanvasRenderingContext2D | null => {
  if (!canvas || typeof canvas.getContext !== 'function') {
    return null;
  }

  let nativeContext: CanvasRenderingContext2D | null = null;
  try {
    nativeContext = canvas.getContext('2d');
  } catch {
    nativeContext = null;
  }

  if (!nativeContext) {
    return null;
  }

  const target = nativeContext as unknown as Record<string, unknown>;
  const gradientFallback = {
    addColorStop: NOOP,
  } as unknown as CanvasGradient;
  const textMetricsFallback = {
    width: 0,
  } as unknown as TextMetrics;

  return new Proxy(target, {
    get(proxyTarget, prop) {
      const value = Reflect.get(proxyTarget, prop);
      if (typeof value === 'function') {
        return value.bind(nativeContext);
      }
      if (value !== undefined) {
        return value;
      }

      if (typeof prop === 'string') {
        if (prop === 'createLinearGradient' || prop === 'createRadialGradient') {
          return () => gradientFallback;
        }
        if (prop === 'measureText') {
          return () => textMetricsFallback;
        }
        return NOOP;
      }

      return undefined;
    },
    set(proxyTarget, prop, value) {
      try {
        Reflect.set(proxyTarget, prop, value);
      } catch {
        // Ignore unsupported canvas properties (ex.: letterSpacing in some environments).
      }
      return true;
    },
  }) as unknown as CanvasRenderingContext2D;
};

const drawStaticChartFallback = (canvas: HTMLCanvasElement | null) => {
  if (!canvas) {
    return;
  }

  const ctx = ensureCanvasContext(canvas);
  if (!ctx) {
    return;
  }

  const width = Math.max(320, canvas.clientWidth || canvas.width || 960);
  const height = Math.max(220, canvas.clientHeight || canvas.height || 420);
  canvas.width = width;
  canvas.height = height;
  canvas.style.width = width + 'px';
  canvas.style.height = height + 'px';

  ctx.clearRect(0, 0, width, height);
  const gradient = ctx.createLinearGradient(0, 0, 0, height);
  gradient.addColorStop(0, 'rgba(25,25,40,0.45)');
  gradient.addColorStop(1, 'rgba(12,12,20,0.88)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  ctx.beginPath();
  ctx.moveTo(44, height - 68);
  ctx.lineTo(width - 44, height - 68);
  ctx.strokeStyle = 'rgba(255,255,255,0.12)';
  ctx.lineWidth = 1;
  ctx.stroke();

  ctx.font = '600 12px -apple-system, system-ui, sans-serif';
  ctx.fillStyle = 'rgba(148,163,184,0.75)';
  ctx.textAlign = 'left';
  ctx.fillText('Falha no render dinâmico: exibindo estado estático.', 44, 34);
};

const replaceScriptFragment = (source: string, pattern: string | RegExp, replacement: string): string => {
  const updated = source.replace(pattern, replacement);
  return updated === source ? source : updated;
};

const patchLegacyProjectionScript = (source: string): string => {
  let patched = source;

  patched = replaceScriptFragment(patched, /canvas\.addEventListener\(/g, 'addCanvasListener(');

  patched = replaceScriptFragment(
    patched,
    /const canvas = document\.getElementById\('projectionChart'\);\s*const ctx = canvas\.getContext\('2d'\);/,
    "const canvas = document.getElementById('projectionChart');\n    let ctx = ensureCanvasContext(canvas);",
  );

  patched = replaceScriptFragment(
    patched,
    /function resizeCanvas\(\) \{/,
    `function resizeCanvas() {
      if (!canvas) return;
      if (!ctx) {
        ctx = ensureCanvasContext(canvas);
      }
      if (!ctx) return;`,
  );

  patched = replaceScriptFragment(
    patched,
    /const w = wrapper\.clientWidth;\s*const h = wrapper\.clientHeight;/,
    `const fallbackWidth = canvas.clientWidth || canvas.width || 960;
      const fallbackHeight = canvas.clientHeight || canvas.height || 420;
      const w = Math.max(320, Math.round((wrapper && wrapper.clientWidth) || fallbackWidth));
      const h = Math.max(220, Math.round((wrapper && wrapper.clientHeight) || fallbackHeight));`,
  );

  patched = replaceScriptFragment(
    patched,
    /ctx\.scale\(dpr, dpr\);/,
    `if (typeof ctx.setTransform === 'function') {
        ctx.setTransform(1, 0, 0, 1, 0, 0);
      }
      if (typeof ctx.scale === 'function') {
        ctx.scale(dpr, dpr);
      }`,
  );

  patched = replaceScriptFragment(
    patched,
    /function renderChart\(animProgress = 1\) \{/,
    `function renderChart(animProgress = 1) {
      if (!canvas) return;
      if (!ctx) {
        ctx = ensureCanvasContext(canvas);
      }
      if (!ctx) return;`,
  );

  const hasInitialProgressPatch = patched.includes(
    'const initialProgress = Math.max(0, Math.min(1, state.chartAnimProgress || 0));',
  );
  if (!hasInitialProgressPatch) {
    patched = replaceScriptFragment(patched, /chartAnimProgress:\s*0,/, 'chartAnimProgress: 0.16,');
    patched = replaceScriptFragment(patched, /renderChart\(0\);/, 'renderChart(state.chartAnimProgress);');
    patched = replaceScriptFragment(
      patched,
      /const duration = 2800; \/\/ ms\s*const startTime = performance\.now\(\);/,
      `const duration = 2800; // ms
      const startTime = performance.now();
      const initialProgress = Math.max(0, Math.min(1, state.chartAnimProgress || 0));`,
    );
    patched = replaceScriptFragment(
      patched,
      /state\.chartAnimProgress = easeInOutCubic\(raw\);/,
      'state.chartAnimProgress = initialProgress + (1 - initialProgress) * easeInOutCubic(raw);',
    );
  }

  const hasObserverFallbackPatch = patched.includes('if (!state.animationStarted) {\n        startChartAnimation();');
  if (!hasObserverFallbackPatch) {
    patched = replaceScriptFragment(
      patched,
      /chartObserver\.observe\(canvas\);/,
      `if (canvas) {
      chartObserver.observe(canvas);
    }

    setTimeout(() => {
      if (!state.animationStarted) {
        startChartAnimation();
        animateStackedBars();
        animateAdaptationBar();
        animateCounterStats();
      }
    }, 120);`,
    );
  }

  const hasKeyboardGuardPatch = patched.includes(
    "if (canvas && (document.activeElement === canvas || canvas.matches(':hover'))) {",
  );
  if (!hasKeyboardGuardPatch) {
    patched = replaceScriptFragment(
      patched,
      /if \(document\.activeElement === canvas \|\| canvas\.matches\(':hover'\)\) \{/,
      "if (canvas && (document.activeElement === canvas || canvas.matches(':hover'))) {",
    );
  }

  return patched;
};

export const ProjectionSlide = ({ onGoToGoalStep: _onGoToGoalStep }: ProjectionSlideProps) => {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) {
      return;
    }

    const windowListeners: Array<{
      type: string;
      listener: EventListenerOrEventListenerObject;
      options: AddEventListenerOptions | boolean | undefined;
    }> = [];
    const documentListeners: Array<{
      type: string;
      listener: EventListenerOrEventListenerObject;
      options: AddEventListenerOptions | boolean | undefined;
    }> = [];
    const canvasListeners: Array<{
      type: string;
      listener: EventListenerOrEventListenerObject;
      options: AddEventListenerOptions | boolean | undefined;
    }> = [];

    const timeoutIds = new Set<number>();
    const rafIds = new Set<number>();
    const observers: IntersectionObserver[] = [];
    let runtimeFailed = false;
    let canvas: HTMLCanvasElement | null = null;

    const failRuntime = (label: string, error: unknown) => {
      if (runtimeFailed) {
        return;
      }
      runtimeFailed = true;
      console.error(label, error);
      drawStaticChartFallback(canvas);
    };

    const runSafely = <T extends (...args: any[]) => any>(label: string, fn: T): T => {
      return ((...args: Parameters<T>) => {
        if (runtimeFailed) {
          return undefined;
        }
        try {
          return fn(...args);
        } catch (error) {
          failRuntime(label, error);
          return undefined;
        }
      }) as T;
    };

    const toSafeEventListener = (label: string, listener: EventListenerOrEventListenerObject): EventListener => {
      if (typeof listener === 'function') {
        return runSafely(label, listener as EventListener);
      }
      return runSafely(label, (event: Event) => listener.handleEvent.call(listener, event));
    };

    const trackSetTimeout: typeof window.setTimeout = ((handler: TimerHandler, timeout?: number, ...args: any[]) => {
      const safeHandler =
        typeof handler === 'function'
          ? (runSafely('Projection legacy runtime callback error:', handler as (...handlerArgs: any[]) => unknown) as TimerHandler)
          : handler;
      const id = window.setTimeout(safeHandler, timeout, ...args);
      timeoutIds.add(id);
      return id;
    }) as typeof window.setTimeout;

    const trackClearTimeout: typeof window.clearTimeout = ((id?: number) => {
      if (typeof id === 'number') {
        timeoutIds.delete(id);
        window.clearTimeout(id);
      }
    }) as typeof window.clearTimeout;

    const trackRequestAnimationFrame: typeof window.requestAnimationFrame = ((callback: FrameRequestCallback) => {
      const safeCallback = runSafely('Projection legacy runtime callback error:', callback);
      const id = window.requestAnimationFrame((time) => {
        rafIds.delete(id);
        safeCallback(time);
      });
      rafIds.add(id);
      return id;
    }) as typeof window.requestAnimationFrame;

    const trackCancelAnimationFrame: typeof window.cancelAnimationFrame = ((id: number) => {
      rafIds.delete(id);
      window.cancelAnimationFrame(id);
    }) as typeof window.cancelAnimationFrame;

    const trackWindowAddEventListener = (
      type: string,
      listener: EventListenerOrEventListenerObject,
      options?: AddEventListenerOptions | boolean,
    ) => {
      const wrapped = toSafeEventListener('Projection legacy window listener error:', listener);
      windowListeners.push({ type, listener: wrapped, options });
      window.addEventListener(type, wrapped, options);
    };

    const trackDocumentAddEventListener = (
      type: string,
      listener: EventListenerOrEventListenerObject,
      options?: AddEventListenerOptions | boolean,
    ) => {
      const wrapped = toSafeEventListener('Projection legacy document listener error:', listener);
      documentListeners.push({ type, listener: wrapped, options });
      document.addEventListener(type, wrapped, options);
    };

    const getScopedById = (id: string): HTMLElement | null => {
      return root.querySelector<HTMLElement>('#' + id);
    };

    const scopedDocument = new Proxy(document, {
      get(target, prop) {
        if (prop === 'getElementById') {
          return (id: string) => getScopedById(id) ?? target.getElementById(id);
        }
        if (prop === 'querySelector') {
          return (selector: string) => root.querySelector(selector);
        }
        if (prop === 'querySelectorAll') {
          return (selector: string) => root.querySelectorAll(selector);
        }
        if (prop === 'addEventListener') {
          return trackDocumentAddEventListener;
        }
        if (prop === 'removeEventListener') {
          return target.removeEventListener.bind(target);
        }

        const value = Reflect.get(target, prop);
        return typeof value === 'function' ? value.bind(target) : value;
      },
    });

    const scopedWindow = new Proxy(window, {
      get(target, prop) {
        if (prop === 'addEventListener') {
          return trackWindowAddEventListener;
        }
        if (prop === 'removeEventListener') {
          return target.removeEventListener.bind(target);
        }
        if (prop === 'setTimeout') {
          return trackSetTimeout;
        }
        if (prop === 'clearTimeout') {
          return trackClearTimeout;
        }
        if (prop === 'requestAnimationFrame') {
          return trackRequestAnimationFrame;
        }
        if (prop === 'cancelAnimationFrame') {
          return trackCancelAnimationFrame;
        }

        const value = Reflect.get(target, prop);
        return typeof value === 'function' ? value.bind(target) : value;
      },
    });

    canvas = getScopedById('projectionChart') as HTMLCanvasElement | null;

    const addCanvasListener = (
      type: string,
      listener: EventListenerOrEventListenerObject,
      options?: AddEventListenerOptions | boolean,
    ) => {
      if (!canvas) {
        return;
      }
      const wrapped = toSafeEventListener('Projection legacy canvas listener error:', listener);
      canvasListeners.push({ type, listener: wrapped, options });
      canvas.addEventListener(type, wrapped, options);
    };

    const NativeIntersectionObserver = window.IntersectionObserver;

    const TrackedIntersectionObserver: typeof window.IntersectionObserver = (function () {
      function WrappedObserver(this: IntersectionObserver, callback: IntersectionObserverCallback, options?: IntersectionObserverInit) {
        if (typeof NativeIntersectionObserver === 'function') {
          const observer = new NativeIntersectionObserver(callback, options);
          observers.push(observer);
          return observer as unknown as IntersectionObserver;
        }

        const fallback: IntersectionObserver = {
          root: null,
          rootMargin: '0px',
          thresholds: [0],
          disconnect() {},
          observe() {},
          takeRecords() {
            return [];
          },
          unobserve() {},
        };

        observers.push(fallback);
        return fallback;
      }

      if (typeof NativeIntersectionObserver === 'function') {
        WrappedObserver.prototype = NativeIntersectionObserver.prototype;
      }

      return WrappedObserver as unknown as typeof window.IntersectionObserver;
    })();

    const scriptWithRuntimePatches = patchLegacyProjectionScript(LEGACY_PROJECTION_SCRIPT);

    const previousToggleSeries = window.toggleSeries;
    const previousHighlightWeek = window.highlightWeek;
    const previousSwitchTableView = window.switchTableView;
    const previousTriggerCelebration = window.triggerCelebration;

    try {
      const runner = new Function(
        'window',
        'document',
        'console',
        'IntersectionObserver',
        'setTimeout',
        'clearTimeout',
        'requestAnimationFrame',
        'cancelAnimationFrame',
        'performance',
        'addCanvasListener',
        'ensureCanvasContext',
        scriptWithRuntimePatches +
          '\nreturn {\n  toggleSeries: typeof toggleSeries === \'function\' ? toggleSeries : undefined,\n  highlightWeek: typeof highlightWeek === \'function\' ? highlightWeek : undefined,\n  switchTableView: typeof switchTableView === \'function\' ? switchTableView : undefined,\n  triggerCelebration: typeof triggerCelebration === \'function\' ? triggerCelebration : undefined,\n};',
      ) as (
        windowArg: Window,
        documentArg: Document,
        consoleArg: Console,
        intersectionObserverArg: typeof window.IntersectionObserver,
        setTimeoutArg: typeof window.setTimeout,
        clearTimeoutArg: typeof window.clearTimeout,
        requestAnimationFrameArg: typeof window.requestAnimationFrame,
        cancelAnimationFrameArg: typeof window.cancelAnimationFrame,
        performanceArg: Performance,
        addCanvasListenerArg: (
          type: string,
          listener: EventListenerOrEventListenerObject,
          options?: AddEventListenerOptions | boolean,
        ) => void,
        ensureCanvasContextArg: (canvasElement: HTMLCanvasElement | null) => CanvasRenderingContext2D | null,
      ) => {
        toggleSeries?: LegacyProjectionGlobalFn;
        highlightWeek?: LegacyProjectionGlobalFn;
        switchTableView?: LegacyProjectionGlobalFn;
        triggerCelebration?: LegacyProjectionGlobalFn;
      };

      const exposed = runner(
        scopedWindow as unknown as Window,
        scopedDocument as unknown as Document,
        console,
        TrackedIntersectionObserver,
        trackSetTimeout,
        trackClearTimeout,
        trackRequestAnimationFrame,
        trackCancelAnimationFrame,
        performance,
        addCanvasListener,
        ensureCanvasContext,
      );

      if (exposed.toggleSeries) {
        window.toggleSeries = exposed.toggleSeries;
      }
      if (exposed.highlightWeek) {
        window.highlightWeek = exposed.highlightWeek;
      }
      if (exposed.switchTableView) {
        window.switchTableView = exposed.switchTableView;
      }
      if (exposed.triggerCelebration) {
        window.triggerCelebration = exposed.triggerCelebration;
      }
    } catch (error) {
      failRuntime('Projection legacy script execution error:', error);
    }

    return () => {
      canvasListeners.forEach(({ type, listener, options }) => {
        canvas?.removeEventListener(type, listener as EventListener, options);
      });

      windowListeners.forEach(({ type, listener, options }) => {
        window.removeEventListener(type, listener, options);
      });

      documentListeners.forEach(({ type, listener, options }) => {
        document.removeEventListener(type, listener, options);
      });

      observers.forEach((observer) => {
        observer.disconnect();
      });

      timeoutIds.forEach((id) => {
        window.clearTimeout(id);
      });

      rafIds.forEach((id) => {
        window.cancelAnimationFrame(id);
      });

      if (previousToggleSeries) {
        window.toggleSeries = previousToggleSeries;
      } else {
        delete window.toggleSeries;
      }

      if (previousHighlightWeek) {
        window.highlightWeek = previousHighlightWeek;
      } else {
        delete window.highlightWeek;
      }

      if (previousSwitchTableView) {
        window.switchTableView = previousSwitchTableView;
      } else {
        delete window.switchTableView;
      }

      if (previousTriggerCelebration) {
        window.triggerCelebration = previousTriggerCelebration;
      } else {
        delete window.triggerCelebration;
      }
    };
  }, []);

  return (
    <div
      ref={rootRef}
      id="dfp-heading-projection"
      className="projection-section-legacy"
      aria-label={'Proje\u00e7\u00e3o e Progresso'}
    >
      <div dangerouslySetInnerHTML={{ __html: LEGACY_PROJECTION_HTML }} />
    </div>
  );
};
