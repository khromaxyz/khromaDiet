import { useEffect, useRef } from 'react';

import '../../../../../styles/dashboard-final.css';
import { LEGACY_FINAL_HTML, LEGACY_FINAL_SCRIPT } from './finalLegacy.generated';

type EventMapEntry = {
  type: string;
  listener: EventListenerOrEventListenerObject;
  options: AddEventListenerOptions | boolean | undefined;
};

interface FinalSlideProps {
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

const asListenerKey = (listener: EventListenerOrEventListenerObject): object => {
  return listener as unknown as object;
};

export const FinalSlide = ({ isActive }: FinalSlideProps) => {
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

    content.innerHTML = LEGACY_FINAL_HTML;

    const windowListeners: EventMapEntry[] = [];
    const documentListeners: EventMapEntry[] = [];
    const timeoutIds = new Set<number>();
    const intervalIds = new Set<number>();
    const rafIds = new Set<number>();
    const observers = new Set<IntersectionObserver>();
    const previousBodyOverflow = document.body.style.overflow;
    const documentListenerMap = new WeakMap<object, EventListener>();
    const windowListenerMap = new WeakMap<object, EventListener>();
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

    const getOrCreateWrappedListener = (
      map: WeakMap<object, EventListener>,
      label: string,
      listener: EventListenerOrEventListenerObject,
    ): EventListener => {
      const key = asListenerKey(listener);
      const existing = map.get(key);
      if (existing) {
        return existing;
      }
      const wrapped = toSafeEventListener(label, listener);
      map.set(key, wrapped);
      return wrapped;
    };

    const trackSetTimeout: typeof window.setTimeout = ((handler: TimerHandler, timeout?: number, ...args: any[]) => {
      const safeHandler =
        typeof handler === 'function'
          ? (runSafely('Final legacy runtime callback error:', handler as (...handlerArgs: any[]) => unknown) as TimerHandler)
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

    const trackSetInterval: typeof window.setInterval = ((handler: TimerHandler, timeout?: number, ...args: any[]) => {
      const safeHandler =
        typeof handler === 'function'
          ? (runSafely('Final legacy runtime callback error:', handler as (...handlerArgs: any[]) => unknown) as TimerHandler)
          : handler;

      const id = window.setInterval(safeHandler, timeout, ...args);
      intervalIds.add(id);
      return id;
    }) as typeof window.setInterval;

    const trackClearInterval: typeof window.clearInterval = ((id?: number) => {
      if (typeof id === 'number') {
        intervalIds.delete(id);
        window.clearInterval(id);
      }
    }) as typeof window.clearInterval;

    const trackRequestAnimationFrame: typeof window.requestAnimationFrame = ((callback: FrameRequestCallback) => {
      const safeCallback = runSafely('Final legacy runtime callback error:', callback);
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
      const wrapped = getOrCreateWrappedListener(windowListenerMap, 'Final legacy window listener error:', listener);
      windowListeners.push({ type, listener: wrapped, options });
      window.addEventListener(type, wrapped, options);
    };

    const trackWindowRemoveEventListener = (
      type: string,
      listener: EventListenerOrEventListenerObject,
      options?: AddEventListenerOptions | boolean,
    ) => {
      const wrapped = windowListenerMap.get(asListenerKey(listener)) ?? listener;
      window.removeEventListener(type, wrapped, options);
    };

    const trackDocumentAddEventListener = (
      type: string,
      listener: EventListenerOrEventListenerObject,
      options?: AddEventListenerOptions | boolean,
    ) => {
      if (type === 'DOMContentLoaded') {
        const wrapped = getOrCreateWrappedListener(
          documentListenerMap,
          'Final legacy DOMContentLoaded handler error:',
          listener,
        );
        wrapped(new Event('DOMContentLoaded'));
        return;
      }

      const wrapped = getOrCreateWrappedListener(documentListenerMap, 'Final legacy document listener error:', listener);
      documentListeners.push({ type, listener: wrapped, options });
      document.addEventListener(type, wrapped, options);
    };

    const trackDocumentRemoveEventListener = (
      type: string,
      listener: EventListenerOrEventListenerObject,
      options?: AddEventListenerOptions | boolean,
    ) => {
      const wrapped = documentListenerMap.get(asListenerKey(listener)) ?? listener;
      document.removeEventListener(type, wrapped, options);
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
          return trackDocumentRemoveEventListener;
        }
        if (prop === 'readyState') {
          return 'complete';
        }
        if (prop === 'body') {
          return target.body;
        }

        const value = Reflect.get(target, prop);
        return typeof value === 'function' ? value.bind(target) : value;
      },
    });

    const scopedWindow = new Proxy(window, {
      get(target, prop) {
        if (prop === 'document') {
          return scopedDocument;
        }
        if (prop === 'addEventListener') {
          return trackWindowAddEventListener;
        }
        if (prop === 'removeEventListener') {
          return trackWindowRemoveEventListener;
        }
        if (prop === 'setTimeout') {
          return trackSetTimeout;
        }
        if (prop === 'clearTimeout') {
          return trackClearTimeout;
        }
        if (prop === 'setInterval') {
          return trackSetInterval;
        }
        if (prop === 'clearInterval') {
          return trackClearInterval;
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
          const safeCallback = runSafely('Final legacy intersection observer error:', callback);
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

    try {
      const runner = new Function(
        'window',
        'document',
        'console',
        'IntersectionObserver',
        'setTimeout',
        'clearTimeout',
        'setInterval',
        'clearInterval',
        'requestAnimationFrame',
        'cancelAnimationFrame',
        'performance',
        LEGACY_FINAL_SCRIPT,
      ) as (
        windowArg: Window,
        documentArg: Document,
        consoleArg: Console,
        intersectionObserverArg: typeof window.IntersectionObserver,
        setTimeoutArg: typeof window.setTimeout,
        clearTimeoutArg: typeof window.clearTimeout,
        setIntervalArg: typeof window.setInterval,
        clearIntervalArg: typeof window.clearInterval,
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
        trackSetInterval,
        trackClearInterval,
        trackRequestAnimationFrame,
        trackCancelAnimationFrame,
        performance,
      );
    } catch (error) {
      failRuntime('Final legacy script execution error:', error);
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

      intervalIds.forEach((id) => {
        window.clearInterval(id);
      });

      rafIds.forEach((id) => {
        window.cancelAnimationFrame(id);
      });

      document.body.style.overflow = previousBodyOverflow;
      content.innerHTML = '';
    };
  }, [isActive]);

  return (
    <div
      ref={rootRef}
      id="dfp-heading-final"
      className="final-section-legacy"
      aria-label={'Encerramento do Protocolo Nutricional'}
    >
      <div ref={contentRef} />
    </div>
  );
};
