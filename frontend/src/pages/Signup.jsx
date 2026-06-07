import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../api/axios';

const Signup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', address: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const validate = () => {
    if (form.name.length < 20 || form.name.length > 60)
      return 'Name must be between 20 and 60 characters.';
    if (form.address.length > 400)
      return 'Address must be under 400 characters.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      return 'Invalid email format.';
    if (!/^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,16}$/.test(form.password))
      return 'Password: 8-16 chars, one uppercase, one special character.';
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); setSuccess('');
    const validationError = validate();
    if (validationError) return setError(validationError);
    try {
      await API.post('/auth/signup', form);
      setSuccess('Signup successful! Redirecting to login...');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed.');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.box}>
        <h2 style={styles.heading}>Create Account</h2>
        {error && <p style={styles.error}>{error}</p>}
        {success && <p style={styles.success}>{success}</p>}
        <form onSubmit={handleSubmit}>
          <input style={styles.input} placeholder="Full Name (min 20 characters)"
            value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
          <input style={styles.input} type="email" placeholder="Email"
            value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
          <input style={styles.input} type="password" placeholder="Password"
            value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required />
          <textarea style={{ ...styles.input, height: '80px' }} placeholder="Address (max 400 characters)"
            value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} />
          <button style={styles.btn} type="submit">Sign Up</button>
        </form>
        <p style={{ textAlign: 'center', marginTop: '12px' }}>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: { display: 'flex', justifyContent: 'center',
    alignItems: 'center', minHeight: '100vh', background: '#f0f2f5' },
  box: { background: '#fff', padding: '40px', borderRadius: '8px',
    width: '360px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' },
  heading: { textAlign: 'center', color: '#2c3e50', marginBottom: '20px' },
  input: { width: '100%', padding: '10px', marginBottom: '12px',
    borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' },
  btn: { width: '100%', padding: '10px', background: '#2c3e50',
    color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' },
  error: { color: 'red', textAlign: 'center', marginBottom: '10px' },
  success: { color: 'green', textAlign: 'center', marginBottom: '10px' }
};

export default Signup;