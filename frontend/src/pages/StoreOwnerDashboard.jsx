import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import API from '../api/axios';

const StoreOwnerDashboard = () => {
  const [data, setData] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    API.get('/store-owner/dashboard').then(res => setData(res.data));
  }, []);

  if (!data) return <div style={{ padding: '40px' }}>Loading...</div>;

  const sorted = [...data.ratings].sort((a, b) =>
    sortOrder === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
  );

  return (
    <div>
      <Navbar title="Store Owner Dashboard" />
      <div style={styles.container}>
        <div style={styles.storeInfo}>
          <h2>{data.store.name}</h2>
          <p>📍 {data.store.address}</p>
          <p style={styles.avg}>Average Rating: ⭐ <strong>{data.average_rating || 'No ratings yet'}</strong></p>
        </div>
        <h3>Users Who Rated Your Store</h3>
        <button style={styles.sortBtn} onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}>
          Sort by Name {sortOrder === 'asc' ? '↑' : '↓'}
        </button>
        <table style={styles.table}>
          <thead>
            <tr style={styles.th}>
              <th>Name</th><th>Email</th><th>Rating</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((r, i) => (
              <tr key={i} style={styles.tr}>
                <td>{r.name}</td><td>{r.email}</td><td>⭐ {r.rating}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const styles = {
  container: { padding: '24px' },
  storeInfo: { background: '#fff', padding: '20px', borderRadius: '8px', marginBottom: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' },
  avg: { fontSize: '18px', marginTop: '8px' },
  sortBtn: { marginBottom: '10px', padding: '6px 14px', background: '#7f8c8d', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' },
  table: { width: '100%', borderCollapse: 'collapse', background: '#fff' },
  th: { background: '#2c3e50', color: '#fff' },
  tr: { borderBottom: '1px solid #eee' }
};

export default StoreOwnerDashboard;