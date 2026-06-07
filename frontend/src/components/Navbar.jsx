import { useNavigate } from 'react-router-dom';

const Navbar = ({ title }) => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav style={styles.nav}>
      <h2 style={styles.title}>{title}</h2>
      <div style={styles.right}>
        <span style={styles.name}>👤 {user.name}</span>
        <button onClick={logout} style={styles.btn}>Logout</button>
      </div>
    </nav>
  );
};

const styles = {
  nav: { display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    padding: '12px 24px', background: '#2c3e50', color: '#fff' },
  title: { margin: 0, fontSize: '18px' },
  right: { display: 'flex', alignItems: 'center', gap: '16px' },
  name: { fontSize: '14px' },
  btn: { padding: '6px 14px', background: '#e74c3c', color: '#fff',
    border: 'none', borderRadius: '4px', cursor: 'pointer' }
};

export default Navbar;