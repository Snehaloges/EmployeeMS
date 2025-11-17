import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import cors from "cors";
import connectDB from "./db.js";

const app = express();
app.use(express.json());
app.use(cors());

const admin_email = "admin@gmail.com";
const admin_password = "admin123";
const jwt_secret = "mysecretkey";

connectDB();

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true }, 
  phone: { type: String }, 
  role: { type: String, required: true },
  salary: { type: Number, required: true }
});

const Employee = mongoose.model("Employee", employeeSchema);

app.post("/api/admin/login", (req, res) => {
  const { email, password } = req.body;

  if (email === admin_email && password === admin_password) {
    const token = jwt.sign({ email }, jwt_secret, { expiresIn: "2h" });
    return res.json({ success: true, token });
  }

  res.status(401).json({ success: false, message: "invalid credentials" });
});

const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(403).json({ message: "token missing" });

  try {
    jwt.verify(token, jwt_secret);
    next();
  } catch (err) {
    res.status(403).json({ message: "invalid token" });
  }
};

app.post("/api/admin/employees", auth, async (req, res) => {
  const emp = await Employee.create(req.body);
  res.json(emp);
});

app.get("/api/admin/employees", auth, async (req, res) => {
  const data = await Employee.find();
  res.json(data);
});

app.put("/api/admin/employees/:id", auth, async (req, res) => {
  const updated = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

app.delete("/api/admin/employees/:id", auth, async (req, res) => {
  await Employee.findByIdAndDelete(req.params.id);
  res.json({ message: "employee deleted" });
});




app.get("/api/admin/users", auth, async (req, res) => {
  try {
    const response = await fetch('https://dummyjson.com/users?limit=50&select=firstName,lastName,birthDate');
    if (!response.ok) {
      return res.status(response.status).json({ message: "Failed to fetch" });
    }

    const data = await response.json();
    res.json(data.users || []); 

  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Error Fetching" });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));
