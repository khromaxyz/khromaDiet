import { dashboardMock } from '../../../../lib/constants/mockDashboard';

export const MealsSection = () => {
  return (
    <>
      <div className="dash-section-header">
        <div className="dash-section-title">Distribuição por Refeição</div>
        <span className="dash-section-action">Protocolo 4 refeições</span>
      </div>

      <div className="meals-grid">
        {dashboardMock.meals.map((meal) => (
          <div
            key={meal.id}
            className={
              meal.variant === 'pre'
                ? 'meal-card pre-treino'
                : meal.variant === 'post'
                  ? 'meal-card pos-treino'
                  : 'meal-card'
            }
          >
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
                <div className="meal-macro-val">{meal.macros.protein}</div>
                <div className="meal-macro-label">Prot</div>
              </div>
              <div className="meal-macro carb">
                <div className="meal-macro-val">{meal.macros.carbs}</div>
                <div className="meal-macro-label">Carb</div>
              </div>
              <div className="meal-macro fat-m">
                <div className="meal-macro-val">{meal.macros.fat}</div>
                <div className="meal-macro-label">Gord</div>
              </div>
            </div>
            {meal.tag ? <span className={`meal-tag badge-${meal.tag.tone}`}>{meal.tag.label}</span> : null}
          </div>
        ))}
      </div>
    </>
  );
};

