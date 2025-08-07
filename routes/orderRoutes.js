const express = require('express');
const router = express.Router();
const { bookOrders } = require('../controllers/orderControllers');

const upload = require("../middleware/upload");
router.post("/bookOrder", upload.single("prescription"), bookOrders);



module.exports = router;