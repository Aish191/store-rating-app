import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import API from '../api/axios';

const ManageUsers = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [filters, setFilters] = useState({ name: '', email: '', address: '', role: '' });
  const [sortOrder, setSortOrder] = useState('asc');

  const fetchUsers = async () => {
    const res = await API.get('/admin/users', { params: filters });
    setUsers(res.data);
  };

  useEffect(() => { fetchUsers(); }, []);

  const sorted = [...users].sort((a, b) =>
    sortOrder === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
  );

  return (
    <div>
      <Navbar title="Manage Users" />
      <div style={styles.container}>
        <button onClick={() => navigate('/admin')} style={styles.backBtn}>← Back</button>
        <div style={styles.filters}>
          {['name', 'email', 'address'].map(f => (
            <input key={f} style={styles.input} placeholder={f.charAt(0).toUpperCase() + f.slice(1)}
              value={filters[f]} onChange={e => setFilters({ ...filters, [f]: e.target.value })} />
          ))}
          <select style={styles.input} value={filters.role}
            onChange={e => setFilters({ ...filters, role: e.target.value })}>
            <option value="">All Roles</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
            <option value="store_owner">Store Owner</option>
          </select>
          <button style={styles.btn} onClick={fetchUsers}>Search</button>
        </div>
        <button style={styles.sortBtn} onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}>
          Sort by Name {sortOrder === 'asc' ? '↑' : '↓'}
        </button>
        <table style={styles.table}>
          <thead>
            <tr style={styles.th}>
              <th>Name</th><th>Email</th><th>Address</th><th>Role</th><th>Detail</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map(u => (
              <tr key={u.id} style={styles.tr}>
                <td>{u.name}</td><td>{u.email}</td><td>{u.address}</td><td>{u.role}</td>
                <td><button style={styles.detailBtn}
                  onClick={() => navigate(`/admin/users/${u.id}`)}>View</button></td>
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
  detailBtn: { padding: '4px 10px', background: '#3498db', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' },
  backBtn: { marginBottom: '16px', padding: '6px 14px', background: '#95a5a6', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }
};

export default ManageUsers;