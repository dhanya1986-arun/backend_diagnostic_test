const User = require('../models/user.js');
//const login = require('../models/loginmodel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


exports.createOrder = (req, res) => {
  res.send('Order Created');
};

exports.getOrders = (req, res) => {
  res.send('All Orders');
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
     console.log("Email received from frontend:", email);
     console.log("secret_key",require('crypto').randomBytes(32).toString('hex'))
    const existingUser = await User.findOne( {email} );
    if (!existingUser) {
      return res.status(400).json({ message: "User not found" });
    }

    // Validate password
    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        id: existingUser._id,
        role: existingUser.role,
      },
       process.env.JWT_SECRET, // replace with process.env.JWT_SECRET in production
      { expiresIn: "1d" }
    );

    // Send response
    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        _id: existingUser._id,
        name: existingUser.name,
        email: existingUser.email,
        role: existingUser.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};


const registerUser = async (req, res) => {
  const { name, email, password, confirmPassword, role } = req.body;

  try {
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newuser = new User({
      name,
      email,
      password: hashedPassword,
      role
    });

    await newuser.save();
    res.status(201).json({ message: "User registered successfully" });

  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const registerAdminUser = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  try {
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const existingUser = await user.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = new user({
      name,
      email,
      password: hashedPassword,
      role: 'Admin'  // hardcoded admin role
    });

    await admin.save();
    res.status(201).json({ message: "Admin registered successfully" });

  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = { registerUser, registerAdminUser ,loginUser};




