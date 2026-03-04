import { useCallback, useEffect, useRef, useState } from 'react';

import { RefeedSection } from '../RefeedSection';

interface RefeedSlideProps {
  refeedCount: number;
}

const getStepSize = (scroller: HTMLElement, itemSelector: string): number => {
  const firstCard = scroller.querySelector<HTMLElement>(itemSelector);
  if (!firstCard) {
    return scroller.clientWidth;
  }
  const styles = window.getComputedStyle(scroller);
  const gap = Number.parseFloat(styles.columnGap || styles.gap || '0') || 0;
  return firstCard.getBoundingClientRect().width + gap;
};

export const RefeedSlide = ({ refeedCount }: RefeedSlideProps) => {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [page, setPage] = useState(0);
  const maxPage = Math.max(0, refeedCount - 1);

  const withScroller = useCallback((handler: (scroller: HTMLDivElement) => void) => {
    const scroller = rootRef.current?.querySelector<HTMLDivElement>('.refeed-grid');
    if (!scroller) {
      return;
    }
    handler(scroller);
  }, []);

  const scrollToPage = useCallback(
    (nextPage: number) => {
      const clamped = Math.max(0, Math.min(maxPage, nextPage));
      withScroller((scroller) => {
        const step = getStepSize(scroller, '.refeed-item');
        scroller.scrollTo({ left: step * clamped, behavior: 'smooth' });
      });
      setPage(clamped);
    },
    [maxPage, withScroller],
  );

  useEffect(() => {
    const scroller = rootRef.current?.querySelector<HTMLDivElement>('.refeed-grid');
    if (!scroller) {
      return undefined;
    }

    const onScroll = () => {
      const step = getStepSize(scroller, '.refeed-item');
      const next = step > 0 ? Math.round(scroller.scrollLeft / step) : 0;
      setPage(Math.max(0, Math.min(maxPage, next)));
    };

    onScroll();
    scroller.addEventListener('scroll', onScroll, { passive: true });
    return () => scroller.removeEventListener('scroll', onScroll);
  }, [maxPage]);

  return (
    <div className="dfp-refeed" ref={rootRef}>
      <div className="dfp-carousel-head">
        <h2 className="dfp-section-title" id="dfp-heading-refeed">
          Refeed
        </h2>
        <div className="dfp-carousel-arrows">
          <button
            type="button"
            className="dfp-btn"
            onClick={() => scrollToPage(page - 1)}
            disabled={page <= 0}
            aria-label="Rolar refeeds para esquerda"
          >
            ←
          </button>
          <button
            type="button"
            className="dfp-btn"
            onClick={() => scrollToPage(page + 1)}
            disabled={page >= maxPage}
            aria-label="Rolar refeeds para direita"
          >
            →
          </button>
        </div>
      </div>

      <RefeedSection />

      <div className="dfp-carousel-dots" aria-label="Paginação de refeeds">
        {Array.from({ length: refeedCount }).map((_, index) => (
          <button
            key={`refeed-dot-${index}`}
            type="button"
            className={index === page ? 'dfp-mobile-dot is-active' : 'dfp-mobile-dot'}
            onClick={() => scrollToPage(index)}
            aria-label={`Ir para refeed ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
