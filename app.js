// File: app.js

const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

// Set the view engine to ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Main route
app.get('/', (req, res) => {
  res.render('index');
});

// Events route
app.get('/events', (req, res) => {
  res.render('events');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
