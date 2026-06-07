import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import API from '../api/axios';

const UserDashboard = () => {
  const [stores, setStores] = useState([]);
  const [filters, setFilters] = useState({ name: '', address: '' });
  const [ratingInputs, setRatingInputs] = useState({});

  const fetchStores = async () => {
    const res = await API.get('/user/stores', { params: filters });
    setStores(res.data);
  };

  useEffect(() => { fetchStores(); }, []);

  const handleRating = async (storeId) => {
    const rating = ratingInputs[storeId];
    if (!rating || rating < 1 || rating > 5)
      return alert('Please enter a rating between 1 and 5.');
    try {
      await API.post('/user/ratings', { store_id: storeId, rating: parseInt(rating) });
      alert('Rating submitted!');
      fetchStores();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to submit rating.');
    }
  };

  return (
    <div>
      <Navbar title="Store Listings" />
      <div style={styles.container}>
        <div style={styles.filters}>
          <input style={styles.input} placeholder="Search by Name"
            value={filters.name} onChange={e => setFilters({ ...filters, name: e.target.value })} />
          <input style={styles.input} placeholder="Search by Address"
            value={filters.address} onChange={e => setFilters({ ...filters, address: e.target.value })} />
          <button style={styles.btn} onClick={fetchStores}>Search</button>
        </div>
        <div style={styles.grid}>
          {stores.map(store => (
            <div key={store.id} style={styles.card}>
              <h3 style={styles.storeName}>{store.name}</h3>
              <p style={styles.address}>📍 {store.address}</p>
              <p>⭐ Overall Rating: <strong>{store.overall_rating || 'No ratings yet'}</strong></p>
              <p>Your Rating: <strong>{store.user_rating ? `⭐ ${store.user_rating}` : 'Not rated yet'}</strong></p>
              <div style={styles.ratingRow}>
                <input style={styles.ratingInput} type="number" min="1" max="5"
                  placeholder="1-5"
                  value={ratingInputs[store.id] || ''}
                  onChange={e => setRatingInputs({ ...ratingInputs, [store.id]: e.target.value })} />
                <button style={styles.rateBtn} onClick={() => handleRating(store.id)}>
                  {store.user_rating ? 'Update Rating' : 'Submit Rating'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: { padding: '24px' },
  filters: { display: 'flex', gap: '10px', marginBottom: '20px' },
  input: { padding: '8px', borderRadius: '4px', border: '1px solid #ccc' },
  btn: { padding: '8px 16px', background: '#2c3e50', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' },
  card: { background: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' },
  storeName: { color: '#2c3e50', marginBottom: '8px' },
  address: { color: '#7f8c8d', marginBottom: '8px' },
  ratingRow: { display: 'flex', gap: '8px', marginTop: '12px' },
  ratingInput: { width: '60px', padding: '6px', borderRadius: '4px', border: '1px solid #ccc' },
  rateBtn: { padding: '6px 12px', background: '#27ae60', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }
};

export default UserDashboard;