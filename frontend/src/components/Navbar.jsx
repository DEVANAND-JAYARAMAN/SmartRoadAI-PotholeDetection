import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const logout = () => {
    localStorage.removeItem('auth');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <Link to="/dashboard" className="nav-logo">
        🛣️ <span>SmartRoadAI-PotholeDetection</span>
      </Link>
      <div className="nav-links">
        <Link to="/dashboard" className={pathname === '/dashboard' ? 'active' : ''}>Dashboard</Link>
        <Link to="/assistant" className={pathname === '/assistant' ? 'active' : ''}>AI Assistant</Link>
        <button onClick={logout} className="logout-btn">Logout</button>
      </div>
    </nav>
  );
}
