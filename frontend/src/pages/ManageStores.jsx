import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import API from '../api/axios';

const ManageStores = () => {
  const navigate = useNavigate();
  const [stores, setStores] = useState([]);
  const [filters, setFilters] = useState({ name: '', email: '', address: '' });
  const [sortOrder, setSortOrder] = useState('asc');

  const fetchStores = async () => {
    const res = await API.get('/admin/stores', { params: filters });
    setStores(res.data);
  };

  useEffect(() => { fetchStores(); }, []);

  const sorted = [...stores].sort((a, b) =>
    sortOrder === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
  );

  return (
    <div>
      <Navbar title="Manage Stores" />
      <div style={styles.container}>
        <button onClick={() => navigate('/admin')} style={styles.backBtn}>← Back</button>
        <div style={styles.filters}>
          {['name', 'email', 'address'].map(f => (
            <input key={f} style={styles.input} placeholder={f.charAt(0).toUpperCase() + f.slice(1)}
              value={filters[f]} onChange={e => setFilters({ ...filters, [f]: e.target.value })} />
          ))}
          <button style={styles.btn} onClick={fetchStores}>Search</button>
        </div>
        <button style={styles.sortBtn} onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}>
          Sort by Name {sortOrder === 'asc' ? '↑' : '↓'}
        </button>
        <table style={styles.table}>
          <thead>
            <tr style={styles.th}>
              <th>Name</th><th>Email</th><th>Address</th><th>Rating</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map(s => (
              <tr key={s.id} style={styles.tr}>
                <td>{s.name}</td><td>{s.email}</td><td>{s.address}</td>
                <td>{s.rating ? `⭐ ${s.rating}` : 'No ratings yet'}</td>
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
  filters: { display: 'flex', gap: '10px', marginBottom: '16px', flexWrap: 'wrap' },
  input: { padding: '8px', borderRadius: '4px', border: '1px solid #ccc' },
  btn: { padding: '8px 16px', background: '#2c3e50', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' },
  sortBtn: { marginBottom: '10px', padding: '6px 14px', background: '#7f8c8d', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' },
  table: { width: '100%', borderCollapse: 'collapse' },
  th: { background: '#2c3e50', color: '#fff' },
  tr: { borderBottom: '1px solid #eee' },
  backBtn: { marginBottom: '16px', padding: '6px 14px', background: '#95a5a6', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }
};

export default ManageStores;