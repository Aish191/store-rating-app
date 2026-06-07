const pool = require('../config/db');
const bcrypt = require('bcryptjs');

// Dashboard stats
const getDashboardStats = async (req, res) => {
  try {
    const users = await pool.query("SELECT COUNT(*) FROM users WHERE role != 'admin'");
    const stores = await pool.query('SELECT COUNT(*) FROM stores');
    const ratings = await pool.query('SELECT COUNT(*) FROM ratings');
    res.json({
      totalUsers: users.rows[0].count,
      totalStores: stores.rows[0].count,
      totalRatings: ratings.rows[0].count,
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error.', error: err.message });
  }
};

// Add user (admin or normal)
const addUser = async (req, res) => {
  const { name, email, password, address, role } = req.body;
  try {
    const existing = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (existing.rows.length > 0) {
      return res.status(400).json({ message: 'Email already registered.' });
    }
    const hashed = await bcrypt.hash(password, 10);
    const result = await pool.query(
      'INSERT INTO users (name, email, password, address, role) VALUES ($1, $2, $3, $4, $5) RETURNING id, name, email, role',
      [name, email, hashed, address, role]
    );
    res.status(201).json({ message: 'User added successfully!', user: result.rows[0] });
  } catch (err) {
    res.status(500).json({ message: 'Server error.', error: err.message });
  }
};

// Add store
const addStore = async (req, res) => {
  const { name, email, address, owner_id } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO stores (name, email, address, owner_id) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, email, address, owner_id]
    );
    res.status(201).json({ message: 'Store added successfully!', store: result.rows[0] });
  } catch (err) {
    res.status(500).json({ message: 'Server error.', error: err.message });
  }
};

// Get all users with filters
const getUsers = async (req, res) => {
  const { name, email, address, role } = req.query;
  try {
    let query = 'SELECT id, name, email, address, role FROM users WHERE 1=1';
    const params = [];
    let i = 1;
    if (name) { query += ` AND name ILIKE $${i++}`; params.push(`%${name}%`); }
    if (email) { query += ` AND email ILIKE $${i++}`; params.push(`%${email}%`); }
    if (address) { query += ` AND address ILIKE $${i++}`; params.push(`%${address}%`); }
    if (role) { query += ` AND role = $${i++}`; params.push(role); }
    query += ' ORDER BY name ASC';
    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: 'Server error.', error: err.message });
  }
};

// Get all stores with rating
const getStores = async (req, res) => {
  const { name, email, address } = req.query;
  try {
    let query = `
      SELECT s.id, s.name, s.email, s.address,
        ROUND(AVG(r.rating), 1) as rating
      FROM stores s
      LEFT JOIN ratings r ON s.id = r.store_id
      WHERE 1=1
    `;
    const params = [];
    let i = 1;
    if (name) { query += ` AND s.name ILIKE $${i++}`; params.push(`%${name}%`); }
    if (email) { query += ` AND s.email ILIKE $${i++}`; params.push(`%${email}%`); }
    if (address) { query += ` AND s.address ILIKE $${i++}`; params.push(`%${address}%`); }
    query += ' GROUP BY s.id ORDER BY s.name ASC';
    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: 'Server error.', error: err.message });
  }
};

// Get single user detail
const getUserDetail = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      'SELECT id, name, email, address, role FROM users WHERE id = $1',
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'User not found.' });
    }
    const user = result.rows[0];
    if (user.role === 'store_owner') {
      const ratingResult = await pool.query(
        `SELECT ROUND(AVG(r.rating), 1) as avg_rating
         FROM stores s
         LEFT JOIN ratings r ON s.id = r.store_id
         WHERE s.owner_id = $1`,
        [id]
      );
      user.store_rating = ratingResult.rows[0].avg_rating;
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error.', error: err.message });
  }
};

module.exports = { getDashboardStats, addUser, addStore, getUsers, getStores, getUserDetail };