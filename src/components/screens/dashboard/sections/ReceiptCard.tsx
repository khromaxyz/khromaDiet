import { dashboardMock } from '../../../../lib/constants/mockDashboard';

export const ReceiptCard = () => {
  return (
    <>
      <div className="dash-section-header">
        <div className="dash-section-title">Recibo de Cálculo</div>
        <span className="dash-section-action">Metodologia Katch-McArdle</span>
      </div>

      <div className="receipt-card">
        {dashboardMock.receipt.map((item, index) => {
          const rowClassName = [
            'receipt-row',
            item.total ? 'total-row' : '',
            item.meta ? 'meta-row' : '',
          ]
            .filter(Boolean)
            .join(' ');

          return (
            <div key={item.id}>
              {index === 5 ? <div className="receipt-divider-line" /> : null}
              <div className={rowClassName}>
                <div className="receipt-label">
                  <strong>{item.label}</strong>
                </div>
                <span
                  className={
                    item.total
                      ? 'receipt-tag receipt-tag-total'
                      : item.meta
                        ? 'receipt-tag receipt-tag-meta'
                        : 'receipt-tag'
                  }
                >
                  {item.tag}
                </span>
                <div
                  className={
                    item.total
                      ? 'receipt-value total-val'
                      : item.meta
                        ? 'receipt-value meta-val-color'
                        : item.positive
                          ? 'receipt-value positive'
                          : 'receipt-value'
                  }
                >
                  {item.value}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

