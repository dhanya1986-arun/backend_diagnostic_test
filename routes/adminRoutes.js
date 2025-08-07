// routes/adminRoutes.js
const express = require("express");
const router = express.Router();
const {getOrder,updateOrder} = require("../controllers/adminControllers");

// GET all orders with user info populated
router.get('/orders',getOrder);
router.put('/orders/:id/status',updateOrder);
module.exports = router;
