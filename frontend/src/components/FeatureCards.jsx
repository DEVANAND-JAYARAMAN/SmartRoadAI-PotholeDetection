import './FeatureCards.css';

const features = [
  { icon: '🤖', title: 'AI Detection', desc: 'ResNet18 deep learning model trained on real road data.' },
  { icon: '🛡️', title: 'Road Safety', desc: 'Instant safety assessments to protect drivers.' },
  { icon: '⚡', title: 'Instant Analysis', desc: 'Real-time predictions in milliseconds.' },
  { icon: '📊', title: 'Confidence Scoring', desc: 'Probability-based confidence for every prediction.' },
];

export default function FeatureCards() {
  return (
    <div className="feature-grid">
      {features.map((f) => (
        <div key={f.title} className="feature-card">
          <span className="feature-icon">{f.icon}</span>
          <h3>{f.title}</h3>
          <p>{f.desc}</p>
        </div>
      ))}
    </div>
  );
}
