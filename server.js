const dotenv = require('dotenv');

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require("path");

dotenv.config();
//MONGO_URI=mongodb://localhost:27017/diagnostic_test
//MONGO_URI=mongodb+srv://dhanya_joseph:dhanya86@cluster0.hvdgiue.mongodb.net/diagnostic_test
//MONGO_URI=mongodb+srv://dhanya_joseph:dhanya86@cluster0.hvdgiue.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
const app = express();
app.use(cors());
app.use(express.json());
console.log("Mongo URI:2", process.env.MONGO_URI);
// DB Connection
mongoose.connect(process.env.MONGO_URI, {dbName : "diagnostic_test"} 
  )
.then(() => console.log("MongoDB connected"))
.catch((err) => console.error("MongoDB error:", err));
app.use(cors({
    origin:  [
      "https://diagnostic-test-frontendcode.vercel.app",
    "http://localhost:3000"
    
  ],
     // frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));
app.use(express.json());
// Routes



const authRoutes= require('./routes/authroutes');
const orderRoutes = require('./routes/orderRoutes')
const adminRoutes = require('./routes/adminRoutes');
app.use('/api', authRoutes);
app.use('/api',orderRoutes);
app.use('/admin',adminRoutes);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/admin", adminRoutes);



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
