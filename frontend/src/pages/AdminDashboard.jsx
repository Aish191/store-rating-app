import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import API from '../api/axios';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({ totalUsers: 0, totalStores: 0, totalRatings: 0 });

  useEffect(() => {
    API.get('/admin/dashboard').then(res => setStats(res.data));
  }, []);

  return (
    <div>
      <Navbar title="Admin Dashboard" />
      <div style={styles.container}>
        <div style={styles.cards}>
          <div style={styles.card}><h3>Total Users</h3><p style={styles.num}>{stats.totalUsers}</p></div>
          <div style={styles.card}><h3>Total Stores</h3><p style={styles.num}>{stats.totalStores}</p></div>
          <div style={styles.card}><h3>Total Ratings</h3><p style={styles.num}>{stats.totalRatings}</p></div>
        </div>
        <div style={styles.actions}>
          <button style={styles.btn} onClick={() => navigate('/admin/users')}>Manage Users</button>
          <button style={styles.btn} onClick={() => navigate('/admin/stores')}>Manage Stores</button>
          <button style={styles.btn} onClick={() => navigate('/admin/add-user')}>Add User</button>
          <button style={styles.btn} onClick={() => navigate('/admin/add-store')}>Add Store</button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: { padding: '30px' },
  cards: { display: 'flex', gap: '20px', marginBottom: '30px' },
  card: { background: '#fff', padding: '20px 30px', borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)', textAlign: 'center', flex: 1 },
  num: { fontSize: '36px', fontWeight: 'bold', color: '#2c3e50' },
  actions: { display: 'flex', gap: '12px', flexWrap: 'wrap' },
  btn: { padding: '10px 20px', background: '#2c3e50', color: '#fff',
    border: 'none', borderRadius: '4px', cursor: 'pointer' }
};

export default AdminDashboard;