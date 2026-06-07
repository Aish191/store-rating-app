const express = require('express');
const router = express.Router();
const { getStores, submitRating } = require('../controllers/userController');
const { verifyToken, authorizeRoles } = require('../middleware/auth');

router.use(verifyToken, authorizeRoles('user'));

router.get('/stores', getStores);
router.post('/ratings', submitRating);

module.exports = router;