import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../api/axios';

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await API.post('/auth/login', form);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      const role = res.data.user.role;
      if (role === 'admin') navigate('/admin');
      else if (role === 'user') navigate('/user');
      else navigate('/store-owner');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed.');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.box}>
        <h2 style={styles.heading}>Store Rating App</h2>
        <h3 style={{ textAlign: 'center', marginBottom: '20px' }}>Login</h3>
        {error && <p style={styles.error}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <input style={styles.input} type="email" placeholder="Email"
            value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
          <input style={styles.input} type="password" placeholder="Password"
            value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required />
          <button style={styles.btn} type="submit">Login</button>
        </form>
        <p style={{ textAlign: 'center', marginTop: '12px' }}>
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: { display: 'flex', justifyContent: 'center',
    alignItems: 'center', height: '100vh', background: '#f0f2f5' },
  box: { background: '#fff', padding: '40px', borderRadius: '8px',
    width: '360px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' },
  heading: { textAlign: 'center', color: '#2c3e50', marginBottom: '8px' },
  input: { width: '100%', padding: '10px', marginBottom: '12px',
    borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' },
  btn: { width: '100%', padding: '10px', background: '#2c3e50',
    color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' },
  error: { color: 'red', textAlign: 'center', marginBottom: '10px' }
};

export default Login;