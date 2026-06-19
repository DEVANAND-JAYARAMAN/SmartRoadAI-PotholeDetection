import './PredictionCard.css';

export default function PredictionCard({ prediction, confidence }) {
  const isPothole = prediction === 'potholes';
  const badge =
    isPothole && confidence > 80 ? 'danger' :
    isPothole && confidence >= 50 ? 'warning' : 'safe';

  const badgeLabel = badge === 'danger' ? '🔴 Danger' : badge === 'warning' ? '🟠 Warning' : '🟢 Safe';

  const recommendations = isPothole
    ? ['Reduce speed immediately', 'Maintain safe distance from other vehicles', 'Report to local authorities', 'Avoid sudden braking']
    : ['Road condition is normal', 'Drive at standard speed limits', 'Stay alert for other hazards'];

  return (
    <div className={`prediction-card ${badge}`}>
      <div className="pred-header">
        <h3>Detection Result</h3>
        <span className={`badge ${badge}`}>{badgeLabel}</span>
      </div>
      <div className="pred-body">
        <div className="pred-item">
          <span className="pred-label">Prediction</span>
          <span className="pred-value">{isPothole ? '⚠️ Potholes Detected' : '✅ Normal Road'}</span>
        </div>
        <div className="pred-item">
          <span className="pred-label">Confidence</span>
          <span className="pred-value">{confidence}%</span>
        </div>
        <div className="confidence-bar">
          <div className="confidence-fill" style={{ width: `${confidence}%`, background: badge === 'danger' ? '#ef4444' : badge === 'warning' ? '#f97316' : '#22c55e' }} />
        </div>
      </div>
      <div className="recommendations">
        <h4>Recommendations</h4>
        <ul>
          {recommendations.map((r) => <li key={r}>• {r}</li>)}
        </ul>
      </div>
    </div>
  );
}
