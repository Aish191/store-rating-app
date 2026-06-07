const pool = require('../config/db');

const getDashboard = async (req, res) => {
  const ownerId = req.user.id;
  try {
    const storeResult = await pool.query(
      'SELECT * FROM stores WHERE owner_id = $1',
      [ownerId]
    );
    if (storeResult.rows.length === 0) {
      return res.status(404).json({ message: 'No store found for this owner.' });
    }
    const store = storeResult.rows[0];
    const ratingsResult = await pool.query(
      `SELECT u.name, u.email, r.rating
       FROM ratings r
       JOIN users u ON r.user_id = u.id
       WHERE r.store_id = $1
       ORDER BY u.name ASC`,
      [store.id]
    );
    const avgResult = await pool.query(
      'SELECT ROUND(AVG(rating), 1) as avg_rating FROM ratings WHERE store_id = $1',
      [store.id]
    );
    res.json({
      store,
      average_rating: avgResult.rows[0].avg_rating,
      ratings: ratingsResult.rows,
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error.', error: err.message });
  }
};

module.exports = { getDashboard };