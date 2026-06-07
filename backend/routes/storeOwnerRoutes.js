const express = require('express');
const router = express.Router();
const { getDashboard } = require('../controllers/storeOwnerController');
const { verifyToken, authorizeRoles } = require('../middleware/auth');

router.use(verifyToken, authorizeRoles('store_owner'));

router.get('/dashboard', getDashboard);

module.exports = router;