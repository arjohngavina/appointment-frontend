const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

require('dotenv').config();
const mysql = require('mysql2');


// Create app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL DB connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

db.connect((err) => {
  if (err) {
    console.error('MySQL connection failed:', err);
    process.exit(1);
  }
  console.log('✅ Connected to MySQL RDS database.');
});


// Simple test route
app.get('/api/ping', (req, res) => {
  res.json({ message: 'Backend is working!' });
});


// Start server
const PORT = process.env.PORT || 5000;


app.post('/api/register', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password required.' });
  }

  const query = 'INSERT INTO users (email, password) VALUES (?, ?)';

  db.query(query, [email, password], (err, results) => {
    if (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(400).json({ message: 'Email already registered.' });
      }
      console.error(err);
      return res.status(500).json({ message: 'Database error.' });
    }

    return res.json({ success: true, message: 'User registered!' });
  });
});

const verifyToken = require('./middleware/auth');

//  GET /api/appointments
/* 
  app.get('/api/appointments', verifyToken, (req, res) => {
    req.user contains decoded token info
    res.json({ message: 'You accessed a protected route', user: req.user });
});

app.get('/api/appointments', verifyToken, (req, res) => {
  const demoAppointments = [
    { date: '2025-07-10', title: 'Dentist' },
    { date: '2025-07-11', title: 'Business Meeting' }
  ];
  res.json(demoAppointments); // ✅ return an array
});

*/

app.get('/api/appointments', verifyToken, (req, res) => {
  const userEmail = req.user.email;

  const sql = "SELECT * FROM appointments WHERE user_email = ?";
  db.query(sql, [userEmail], (err, results) => {
    if (err) {
      console.error("Error fetching appointments:", err);
      return res.status(500).json({ message: "Database error" });
    }
    res.json(results);
  });
});


app.post('/api/appointments', verifyToken, (req, res) => {
  const { title, date } = req.body;
  const userEmail = req.user.email;

  if (!title || !date) {
    return res.status(400).json({ message: 'Title and date are required.' });
  }

  const sql = "INSERT INTO appointments (user_email, title, date) VALUES (?, ?, ?)";
  db.query(sql, [userEmail, title, date], (err, result) => {
    if (err) {
      console.error("Error saving appointment:", err);
      return res.status(500).json({ message: "Database error", error: err.message });
    }
    res.json({ message: "Appointment saved!" });
  });
});


//////////////


/////////////



app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});




/*
// 
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password required.' });
  }

  const query = 'SELECT * FROM users WHERE email = ? AND password = ?';

  db.query(query, [email, password], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Database error.' });
    }

    if (results.length > 0) {
      // You can generate JWT here later
      return res.json({ success: true, token: 'fake-jwt-token' });
    } else {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
  });
});

*/


