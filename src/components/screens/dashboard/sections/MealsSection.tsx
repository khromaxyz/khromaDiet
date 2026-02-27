import { useDietForgeStore } from '../../../../store/useDietForgeStore';

export const MealsSection = () => {
  const meals = useDietForgeStore((state) => state.results?.macros.meals ?? []);

  return (
    <>
      <div className="dash-section-header">
        <div className="dash-section-title">Distribuição por Refeição</div>
        <span className="dash-section-action">Macros reais por refeição</span>
      </div>

      <div className="meals-grid">
        {meals.map((meal) => {
          const className =
            meal.tag === 'pre' ? 'meal-card pre-treino' : meal.tag === 'post' ? 'meal-card pos-treino' : 'meal-card';

          const tag =
            meal.tag === 'pre'
              ? { label: 'Pré-treino', tone: 'yellow' }
              : meal.tag === 'post'
                ? { label: 'Pós-treino', tone: 'green' }
                : null;

          const totalMacro = meal.proteinG + meal.carbsG + meal.fatG;
          const proteinPct = totalMacro > 0 ? (meal.proteinG * 100) / totalMacro : 0;
          const carbsPct = totalMacro > 0 ? (meal.carbsG * 100) / totalMacro : 0;
          const fatPct = Math.max(0, 100 - proteinPct - carbsPct);

          return (
            <div key={meal.id} className={className}>
              <div className="meal-header">
                <div className="meal-info">
                  <div className="meal-number">{meal.number}</div>
                  <div className="meal-name">{meal.name}</div>
                </div>
                <div className="meal-time-badge">{meal.time}</div>
              </div>
              <div className="meal-kcal">
                {meal.kcal} <span className="meal-kcal-unit">kcal</span>
              </div>
              <div className="meal-macros">
                <div className="meal-macro prot">
                  <div className="meal-macro-val">{meal.proteinG}g</div>
                  <div className="meal-macro-label">Prot</div>
                </div>
                <div className="meal-macro carb">
                  <div className="meal-macro-val">{meal.carbsG}g</div>
                  <div className="meal-macro-label">Carb</div>
                </div>
                <div className="meal-macro fat-m">
                  <div className="meal-macro-val">{meal.fatG}g</div>
                  <div className="meal-macro-label">Gord</div>
                </div>
              </div>

              <div className="meal-composition-bar" aria-hidden>
                <span className="meal-composition-seg meal-composition-prot" style={{ width: `${proteinPct}%` }} />
                <span className="meal-composition-seg meal-composition-carb" style={{ width: `${carbsPct}%` }} />
                <span className="meal-composition-seg meal-composition-fat" style={{ width: `${fatPct}%` }} />
              </div>

              {tag ? <span className={`meal-tag badge-${tag.tone}`}>{tag.label}</span> : null}
            </div>
          );
        })}
      </div>
    </>
  );
};
