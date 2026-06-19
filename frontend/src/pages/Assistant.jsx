import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ChatBot from '../components/ChatBot';
import './Assistant.css';

export default function Assistant() {
  return (
    <div className="page">
      <Navbar />
      <main style={{ padding: '2rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <h1 className="asst-title">🤖 AI Assistant</h1>
          <p style={{ color: 'var(--text-muted)' }}>Ask questions about potholes, road safety, and our detection system.</p>
        </div>
        <ChatBot />
      </main>
      <Footer />
    </div>
  );
}
