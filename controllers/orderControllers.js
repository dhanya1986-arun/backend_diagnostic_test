const Order = require("../models/bookordermodel.js");
const path = require("path");

const bookOrders = async (req, res) => {
  try {
    const { userId, test } = req.body;
    const prescription = req.file;
    if (!userId || !test || !prescription) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const newOrder = new Order({
       user:userId,
      test,
        prescriptionPath: prescription.filename,
      status: "pending",
    });

    await newOrder.save();
    res.status(201).json({ message: "Order placed successfully." });
  } catch (err) {
    console.error("Order Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { bookOrders };
