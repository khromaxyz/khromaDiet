import { DataCard, StatBlock } from '@/components/design-system';
import { useCountUp } from '@/hooks/useCountUp';
import { heroCopy, type HeroSignalTone, type HeroStatCopy } from '@/lib/constants/copy';

const formatAnimatedValue = (stat: HeroStatCopy, rawValue: number) => {
  const decimals = stat.decimals ?? 0;

  return new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(rawValue);
};

const AnimatedHeroStat = ({ stat, active }: { stat: HeroStatCopy; active: boolean }) => {
  const scale = 10 ** (stat.decimals ?? 0);
  const animatedValue = useCountUp(Math.round(stat.value * scale), active, 1250);
  const displayValue = animatedValue / scale;

  return (
    <StatBlock
      value={formatAnimatedValue(stat, displayValue)}
      unit={stat.unit ?? stat.suffix}
      label={stat.label}
      color={stat.color}
      size="md"
      align="center"
      className="hero-screen__stat"
    />
  );
};

const SIGNAL_TONE_CLASS_MAP: Record<HeroSignalTone, string> = {
  neutral: 'hero-screen__signal-item--neutral',
  emerald: 'hero-screen__signal-item--emerald',
  gold: 'hero-screen__signal-item--gold',
  blue: 'hero-screen__signal-item--blue',
};

export const HeroStats = () => {
  const active = true;

  return (
    <DataCard
      glow="emerald"
      className="hero-screen__panel w-full p-[var(--space-5)] sm:p-[var(--space-6)] xl:p-[var(--space-7)]"
    >
      <div className="hero-screen__panel-header">
        <div className="hero-screen__brand">
          <div className="hero-screen__brand-chip" aria-hidden>
            {heroCopy.panel.chip}
          </div>

          <div className="hero-screen__brand-copy">
            <div className="hero-screen__brand-name">{heroCopy.panel.brand}</div>
            <div className="hero-screen__brand-sub">{heroCopy.panel.brandSub}</div>
          </div>
        </div>

        <div className="hero-screen__panel-tags">
          <span className="hero-screen__mini-badge hero-screen__mini-badge--live">
            <span className="hero-screen__mini-badge-dot" aria-hidden />
            {heroCopy.panel.liveBadge}
          </span>
          <span className="hero-screen__mini-badge hero-screen__mini-badge--neutral">
            {heroCopy.panel.contextTag}
          </span>
        </div>
      </div>

      <div className="hero-screen__stats-grid">
        {heroCopy.stats.map((stat) => (
          <AnimatedHeroStat key={stat.id} stat={stat} active={active} />
        ))}
      </div>

      <div className="hero-screen__signal-strip" role="list" aria-label="Sinais do motor DietForge">
        {heroCopy.panel.signals.map((signal) => (
          <div
            key={signal.id}
            className={`hero-screen__signal-item ${SIGNAL_TONE_CLASS_MAP[signal.tone]}`}
            role="listitem"
          >
            <div className="hero-screen__signal-label">{signal.label}</div>
            <div className="hero-screen__signal-value">{signal.value}</div>
          </div>
        ))}
      </div>
    </DataCard>
  );
};
