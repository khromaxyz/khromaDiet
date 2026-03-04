import { useEffect, useRef } from 'react';

import '../../../../../styles/dashboard-supplements.css';
import { LEGACY_SUPPLEMENTS_HTML, LEGACY_SUPPLEMENTS_SCRIPT } from './supplementsLegacy.generated';

type EventMapEntry = {
  type: string;
  listener: EventListenerOrEventListenerObject;
  options: AddEventListenerOptions | boolean | undefined;
};

type LegacySupplementWindowFn = (...args: any[]) => unknown;

type LegacySupplementExports = {
  openModal?: LegacySupplementWindowFn;
  closeModal?: LegacySupplementWindowFn;
  handleOverlayClick?: LegacySupplementWindowFn;
};

declare global {
  interface Window {
    openModal?: LegacySupplementWindowFn;
    closeModal?: LegacySupplementWindowFn;
    handleOverlayClick?: LegacySupplementWindowFn;
  }
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

export const SupplementsSlide = ({ isActive }: { isActive: boolean }) => {
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

    content.innerHTML = LEGACY_SUPPLEMENTS_HTML;

    const windowListeners: EventMapEntry[] = [];
    const documentListeners: EventMapEntry[] = [];
    const timeoutIds = new Set<number>();
    const intervalIds = new Set<number>();
    const rafIds = new Set<number>();
    const observers = new Set<IntersectionObserver>();
    const previousBodyOverflow = document.body.style.overflow;
    let runtimeFailed = false;

    const previousOpenModal = window.openModal;
    const previousCloseModal = window.closeModal;
    const previousHandleOverlayClick = window.handleOverlayClick;
    let assignedOpenModal: LegacySupplementWindowFn | undefined;
    let assignedCloseModal: LegacySupplementWindowFn | undefined;
    let assignedHandleOverlayClick: LegacySupplementWindowFn | undefined;

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
          ? (runSafely('Supplements legacy runtime callback error:', handler as (...handlerArgs: any[]) => unknown) as TimerHandler)
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
          ? (runSafely('Supplements legacy runtime callback error:', handler as (...handlerArgs: any[]) => unknown) as TimerHandler)
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
      const safeCallback = runSafely('Supplements legacy runtime callback error:', callback);
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
      const wrapped = toSafeEventListener('Supplements legacy window listener error:', listener);
      windowListeners.push({ type, listener: wrapped, options });
      window.addEventListener(type, wrapped, options);
    };

    const trackDocumentAddEventListener = (
      type: string,
      listener: EventListenerOrEventListenerObject,
      options?: AddEventListenerOptions | boolean,
    ) => {
      if (type === 'DOMContentLoaded') {
        const wrapped = toSafeEventListener('Supplements legacy DOMContentLoaded handler error:', listener);
        wrapped(new Event('DOMContentLoaded'));
        return;
      }

      const wrapped = toSafeEventListener('Supplements legacy document listener error:', listener);
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
          return target.removeEventListener.bind(target);
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
          const safeCallback = runSafely('Supplements legacy intersection observer error:', callback);
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
        `${LEGACY_SUPPLEMENTS_SCRIPT}\nreturn {\n  openModal: typeof openModal === 'function' ? openModal : undefined,\n  closeModal: typeof closeModal === 'function' ? closeModal : undefined,\n  handleOverlayClick: typeof handleOverlayClick === 'function' ? handleOverlayClick : undefined\n};`,
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
      ) => LegacySupplementExports;

      const exports = runner(
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

      if (typeof exports.openModal === 'function') {
        assignedOpenModal = runSafely('Supplements legacy openModal error:', exports.openModal);
        window.openModal = assignedOpenModal;
      }

      if (typeof exports.closeModal === 'function') {
        assignedCloseModal = runSafely('Supplements legacy closeModal error:', exports.closeModal);
        window.closeModal = assignedCloseModal;
      }

      if (typeof exports.handleOverlayClick === 'function') {
        assignedHandleOverlayClick = runSafely('Supplements legacy handleOverlayClick error:', exports.handleOverlayClick);
        window.handleOverlayClick = assignedHandleOverlayClick;
      }
    } catch (error) {
      failRuntime('Supplements legacy script execution error:', error);
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

      if (window.openModal === assignedOpenModal) {
        if (previousOpenModal) {
          window.openModal = previousOpenModal;
        } else {
          delete window.openModal;
        }
      }

      if (window.closeModal === assignedCloseModal) {
        if (previousCloseModal) {
          window.closeModal = previousCloseModal;
        } else {
          delete window.closeModal;
        }
      }

      if (window.handleOverlayClick === assignedHandleOverlayClick) {
        if (previousHandleOverlayClick) {
          window.handleOverlayClick = previousHandleOverlayClick;
        } else {
          delete window.handleOverlayClick;
        }
      }

      document.body.style.overflow = previousBodyOverflow;
      content.innerHTML = '';
    };
  }, [isActive]);

  return (
    <div ref={rootRef} id="dfp-heading-supplements" className="supplements-section-legacy" aria-label={'Stack de Suplementa\u00e7\u00e3o'}>
      <div ref={contentRef} dangerouslySetInnerHTML={{ __html: LEGACY_SUPPLEMENTS_HTML }} />
    </div>
  );
};
