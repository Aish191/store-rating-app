import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import API from '../api/axios';

const AddUser = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', address: '', role: 'user' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const validate = () => {
    if (form.name.length < 20 || form.name.length > 60) return 'Name must be 20-60 characters.';
    if (form.address.length > 400) return 'Address max 400 characters.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return 'Invalid email.';
    if (!/^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,16}$/.test(form.password))
      return 'Password: 8-16 chars, one uppercase, one special character.';
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); setSuccess('');
    const err = validate();
    if (err) return setError(err);
    try {
      await API.post('/admin/users', form);
      setSuccess('User added successfully!');
      setForm({ name: '', email: '', password: '', address: '', role: 'user' });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add user.');
    }
  };

  return (
    <div>
      <Navbar title="Add User" />
      <div style={styles.container}>
        <button onClick={() => navigate('/admin')} style={styles.backBtn}>← Back</button>
        <div style={styles.box}>
          <h3>Add New User</h3>
          {error && <p style={styles.error}>{error}</p>}
          {success && <p style={styles.success}>{success}</p>}
          <form onSubmit={handleSubmit}>
            <input style={styles.input} placeholder="Full Name (min 20 characters)"
              value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
            <input style={styles.input} type="email" placeholder="Email"
              value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
            <input style={styles.input} type="password" placeholder="Password"
              value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required />
            <textarea style={{ ...styles.input, height: '80px' }} placeholder="Address"
              value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} />
            <select style={styles.input} value={form.role}
              onChange={e => setForm({ ...form, role: e.target.value })}>
              <option value="user">Normal User</option>
              <option value="admin">Admin</option>
              <option value="store_owner">Store Owner</option>
            </select>
            <button style={styles.btn} type="submit">Add User</button>
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

export default AddUser;