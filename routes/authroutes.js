const express = require('express');
const router = express.Router();
const { createOrder, getOrders,registerUser,registerAdminUser ,loginUser} = require('../controllers/authControllers');


//router.post('/', createOrder);
//router.get('/', getOrders);
router.post('/register', registerUser);
router.post('/admin/register', registerAdminUser);
router.post('/login', loginUser);

module.exports = router;



