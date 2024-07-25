const express = require('express');
const app = express();
const path = require('path');

// Sample event data (replace with database query results in real implementation)
const sampleEvents = [
  {
    name: "Hougang Basketball Tournament",
    organizer: "Hougang CC",
    location: "Hougang CC",
    date: "25 May 2024",
    time: "12:00 PM - 6:00 PM"
  },
  {
    name: "Jurong Spring CCC Football Workshop",
    organizer: "Jurong Spring CCC",
    location: "Jurong Spring CC",
    date: "25 May 2024",
    time: "12:00 PM - 5:00 PM"
  },
  {
    name: "Punggol CC Zumba Jam",
    organizer: "Punggol CC",
    location: "Punggol CC",
    date: "25 May 2024",
    time: "12:00 PM - 3:00 PM"
  }
];

// Set the view engine to ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Body parser middleware to handle form data
app.use(express.urlencoded({ extended: true }));

// Main route
app.get('/', (req, res) => {
  res.render('index');
});

// Events route
app.get('/events', (req, res) => {
  res.render('events');
});

// Search results route
app.post('/search', (req, res) => {
  const { eventWhat = '', eventWhere, eventWhen } = req.body;
  // Ensure 'eventWhat' is a string before calling toLowerCase
  const searchTerm = eventWhat.toLowerCase();
  // Filter events based on the search term
  const filteredEvents = sampleEvents.filter(event => 
    event.name.toLowerCase().includes(searchTerm)
  );
  res.render('search', { events: filteredEvents });
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
