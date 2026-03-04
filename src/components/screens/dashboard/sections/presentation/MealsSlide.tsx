import { useEffect, useRef } from 'react';

import '../../../../../styles/dashboard-meals.css';
import { LEGACY_MEALS_HTML, LEGACY_MEALS_SCRIPT } from './mealsLegacy.generated';

type EventMapEntry = {
  type: string;
  listener: EventListenerOrEventListenerObject;
  options: AddEventListenerOptions | boolean | undefined;
};

interface MealsSlideProps {
  isActive: boolean;
}

const createFallbackObserver = (): IntersectionObserver => {
  return {
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
};

export const MealsSlide = ({ isActive }: MealsSlideProps) => {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isActive) {
      return;
    }

    const root = rootRef.current;
    const content = contentRef.current;
    if (!root || !content) {
      return;
    }

    // Rebuild markup on every setup to avoid duplicated listeners in StrictMode/HMR remount cycles.
    content.innerHTML = LEGACY_MEALS_HTML;

    const windowListeners: EventMapEntry[] = [];
    const documentListeners: EventMapEntry[] = [];
    const timeoutIds = new Set<number>();
    const rafIds = new Set<number>();
    const observers = new Set<IntersectionObserver>();
    let runtimeFailed = false;

    const failRuntime = (label: string, error: unknown) => {
      if (runtimeFailed) {
        return;
      }
      runtimeFailed = true;
      console.error(label, error);
    };

    const runSafely = <T extends (...args: any[]) => unknown>(label: string, fn: T): T => {
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
          ? (runSafely('Meals legacy runtime callback error:', handler as (...handlerArgs: any[]) => unknown) as TimerHandler)
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
      const safeCallback = runSafely('Meals legacy runtime callback error:', callback);
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
      const wrapped = toSafeEventListener('Meals legacy window listener error:', listener);
      windowListeners.push({ type, listener: wrapped, options });
      window.addEventListener(type, wrapped, options);
    };

    const trackDocumentAddEventListener = (
      type: string,
      listener: EventListenerOrEventListenerObject,
      options?: AddEventListenerOptions | boolean,
    ) => {
      if (type === 'DOMContentLoaded') {
        const wrapped = toSafeEventListener('Meals legacy DOMContentLoaded handler error:', listener);
        wrapped(new Event('DOMContentLoaded'));
        return;
      }

      const wrapped = toSafeEventListener('Meals legacy document listener error:', listener);
      documentListeners.push({ type, listener: wrapped, options });
      document.addEventListener(type, wrapped, options);
    };

    const scopedDocument = new Proxy(document, {
      get(target, prop) {
        if (prop === 'getElementById') {
          return (id: string) => content.querySelector<HTMLElement>('#' + id);
        }
        if (prop === 'querySelector') {
          return (selector: string) => content.querySelector(selector);
        }
        if (prop === 'querySelectorAll') {
          return (selector: string) => content.querySelectorAll(selector);
        }
        if (prop === 'addEventListener') {
          return trackDocumentAddEventListener;
        }
        if (prop === 'removeEventListener') {
          return target.removeEventListener.bind(target);
        }
        if (prop === 'readyState') {
          return 'complete';
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

    const NativeIntersectionObserver = window.IntersectionObserver;

    const TrackedIntersectionObserver: typeof window.IntersectionObserver = (function () {
      function WrappedObserver(
        this: IntersectionObserver,
        callback: IntersectionObserverCallback,
        options?: IntersectionObserverInit,
      ) {
        if (typeof NativeIntersectionObserver === 'function') {
          const safeCallback = runSafely('Meals legacy intersection observer error:', callback);
          const observer = new NativeIntersectionObserver(safeCallback, options);
          observers.add(observer);
          return observer as unknown as IntersectionObserver;
        }

        const fallback = createFallbackObserver();
        observers.add(fallback);
        return fallback;
      }

      if (typeof NativeIntersectionObserver === 'function') {
        WrappedObserver.prototype = NativeIntersectionObserver.prototype;
      }

      return WrappedObserver as unknown as typeof window.IntersectionObserver;
    })();

    const scriptWithRuntimePatches = LEGACY_MEALS_SCRIPT.replace(/\bmealReveal\b/g, 'meals-mealReveal');

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
        scriptWithRuntimePatches,
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
      ) => void;

      runner(
        scopedWindow as unknown as Window,
        scopedDocument as unknown as Document,
        console,
        TrackedIntersectionObserver,
        trackSetTimeout,
        trackClearTimeout,
        trackRequestAnimationFrame,
        trackCancelAnimationFrame,
        performance,
      );
    } catch (error) {
      failRuntime('Meals legacy script execution error:', error);
    }

    return () => {
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

      // Drop all legacy DOM nodes so element-bound listeners are fully released.
      content.innerHTML = '';
    };
  }, [isActive]);

  return (
    <div ref={rootRef} id="dfp-heading-meals" className="meals-section-legacy" aria-label={'Plano Alimentar Di\u00e1rio'}>
      <div ref={contentRef} dangerouslySetInnerHTML={{ __html: LEGACY_MEALS_HTML }} />
    </div>
  );
};
