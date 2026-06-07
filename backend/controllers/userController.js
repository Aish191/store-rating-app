const pool = require('../config/db');

// Get all stores with user's rating
const getStores = async (req, res) => {
  const { name, address } = req.query;
  const userId = req.user.id;
  try {
    let query = `
      SELECT s.id, s.name, s.address,
        ROUND(AVG(r.rating), 1) as overall_rating,
        MAX(CASE WHEN r.user_id = $1 THEN r.rating END) as user_rating
      FROM stores s
      LEFT JOIN ratings r ON s.id = r.store_id
      WHERE 1=1
    `;
    const params = [userId];
    let i = 2;
    if (name) { query += ` AND s.name ILIKE $${i++}`; params.push(`%${name}%`); }
    if (address) { query += ` AND s.address ILIKE $${i++}`; params.push(`%${address}%`); }
    query += ' GROUP BY s.id ORDER BY s.name ASC';
    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: 'Server error.', error: err.message });
  }
};

// Submit or update rating
const submitRating = async (req, res) => {
  const { store_id, rating } = req.body;
  const userId = req.user.id;
  try {
    const existing = await pool.query(
      'SELECT * FROM ratings WHERE user_id = $1 AND store_id = $2',
      [userId, store_id]
    );
    if (existing.rows.length > 0) {
      await pool.query(
        'UPDATE ratings SET rating = $1 WHERE user_id = $2 AND store_id = $3',
        [rating, userId, store_id]
      );
      return res.json({ message: 'Rating updated successfully!' });
    }
    await pool.query(
      'INSERT INTO ratings (user_id, store_id, rating) VALUES ($1, $2, $3)',
      [userId, store_id, rating]
    );
    res.status(201).json({ message: 'Rating submitted successfully!' });
  } catch (err) {
    res.status(500).json({ message: 'Server error.', error: err.message });
  }
};

module.exports = { getStores, submitRating };