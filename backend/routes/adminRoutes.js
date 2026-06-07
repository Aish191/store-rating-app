const express = require('express');
const router = express.Router();
const { getDashboardStats, addUser, addStore, getUsers, getStores, getUserDetail } = require('../controllers/adminController');
const { verifyToken, authorizeRoles } = require('../middleware/auth');

router.use(verifyToken, authorizeRoles('admin'));

router.get('/dashboard', getDashboardStats);
router.post('/users', addUser);
router.post('/stores', addStore);
router.get('/users', getUsers);
router.get('/stores', getStores);
router.get('/users/:id', getUserDetail);

module.exports = router;