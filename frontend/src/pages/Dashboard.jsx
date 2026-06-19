import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FeatureCards from '../components/FeatureCards';
import UploadSection from '../components/UploadSection';
import StatsCards from '../components/StatsCards';
import './Dashboard.css';

export default function Dashboard() {
  return (
    <div className="page">
      <Navbar />
      <main>
        <section className="hero">
          <div className="hero-badge">🤖 AI Powered</div>
          <h1>AI Powered Pothole Detection</h1>
          <p>Upload road images and detect potholes instantly using deep learning.</p>
        </section>

        <FeatureCards />

        <div className="divider" />
        <UploadSection />

        <div className="divider" />
        <StatsCards />

        <div className="divider" />
        <section className="about-section">
          <h2 className="section-title">About SmartRoadAI</h2>
          <div className="about-grid">
            <div className="about-card">
              <h3>🎯 Mission</h3>
              <p>Improve road safety through AI-powered pothole detection, enabling faster maintenance response and reducing vehicle damage and accidents.</p>
            </div>
            <div className="about-card">
              <h3>🛠️ Technology Stack</h3>
              <div className="tech-tags">
                {['React', 'FastAPI', 'PyTorch', 'ResNet18', 'Computer Vision', 'Deep Learning'].map((t) => (
                  <span key={t} className="tech-tag">{t}</span>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
