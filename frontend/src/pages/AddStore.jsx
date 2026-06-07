import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import API from '../api/axios';

const AddStore = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', address: '', owner_id: '' });
  const [owners, setOwners] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    API.get('/admin/users', { params: { role: 'store_owner' } })
      .then(res => setOwners(res.data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); setSuccess('');
    if (form.name.length < 20 || form.name.length > 60)
      return setError('Store name must be 20-60 characters.');
    try {
      await API.post('/admin/stores', form);
      setSuccess('Store added successfully!');
      setForm({ name: '', email: '', address: '', owner_id: '' });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add store.');
    }
  };

  return (
    <div>
      <Navbar title="Add Store" />
      <div style={styles.container}>
        <button onClick={() => navigate('/admin')} style={styles.backBtn}>← Back</button>
        <div style={styles.box}>
          <h3>Add New Store</h3>
          {error && <p style={styles.error}>{error}</p>}
          {success && <p style={styles.success}>{success}</p>}
          <form onSubmit={handleSubmit}>
            <input style={styles.input} placeholder="Store Name (min 20 characters)"
              value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
            <input style={styles.input} type="email" placeholder="Store Email"
              value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
            <textarea style={{ ...styles.input, height: '80px' }} placeholder="Address"
              value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} />
            <select style={styles.input} value={form.owner_id}
              onChange={e => setForm({ ...form, owner_id: e.target.value })}>
              <option value="">Select Store Owner (optional)</option>
              {owners.map(o => (
                <option key={o.id} value={o.id}>{o.name}</option>
              ))}
            </select>
            <button style={styles.btn} type="submit">Add Store</button>
          </form>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: { padding: '24px' },
  box: { background: '#fff', padding: '30px', borderRadius: '8px', maxWidth: '420px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' },
  input: { width: '100%', padding: '10px', marginBottom: '12px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' },
  btn: { width: '100%', padding: '10px', background: '#2c3e50', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' },
  error: { color: 'red', marginBottom: '10px' },
  success: { color: 'green', marginBottom: '10px' },
  backBtn: { marginBottom: '16px', padding: '6px 14px', background: '#95a5a6', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }
};

export default AddStore;