import './StatsCards.css';

const stats = [
  { icon: '🖼️', label: 'Total Images Analysed', value: '1,250' },
  { icon: '⚠️', label: 'Potholes Detected', value: '472' },
  { icon: '✅', label: 'Safe Roads', value: '778' },
  { icon: '🎯', label: 'Average Confidence', value: '95%' },
];

export default function StatsCards() {
  return (
    <div className="stats-section">
      <h2 className="section-title">System Statistics</h2>
      <div className="stats-grid">
        {stats.map((s) => (
          <div key={s.label} className="stat-card">
            <span className="stat-icon">{s.icon}</span>
            <h2 className="stat-value">{s.value}</h2>
            <p className="stat-label">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
