const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const users = {}; // In-memory storage for now

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/register', (req, res) => {
  const { username, password } = req.body;
  if (users[username]) return res.status(400).send('User already exists');
  users[username] = { password };
  res.send('Registered successfully!');
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (!users[username] || users[username].password !== password) {
    return res.status(401).send('Invalid credentials');
  }
  res.send('Login successful!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
