import { heroCopy } from '../../../lib/constants/copy';

export const HeroStats = () => {
  return (
    <div className="hero-stats">
      {heroCopy.stats.map((stat, index) => (
        <div key={stat.id} className="hero-stat-group">
          <div className="hero-stat">
            <div className="hero-stat-number">{stat.value}</div>
            <div className="hero-stat-label">{stat.label}</div>
          </div>
          {index !== heroCopy.stats.length - 1 ? <div className="hero-stat-divider" /> : null}
        </div>
      ))}
    </div>
  );
};

