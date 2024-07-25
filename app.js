const express = require('express');
const app = express();
const path = require('path');

// Sample event data
const sampleEvents = [
  {
    id: 1,
    name: "Hougang Basketball Tournament",
    description: "This is a 5v5 Basketball tournament held by Hougang CC and open to all age groups. Registration ends on 24 May.",
    organizer: "Hougang CC",
    location: "Hougang CC",
    date: "25 May 2024",
    time: "12:00 PM - 6:00 PM"
  },
  {
    id: 2,
    name: "Jurong Spring CCC Football Workshop",
    description: "A comprehensive football workshop for all levels, organized by Jurong Spring CCC.",
    organizer: "Jurong Spring CCC",
    location: "Jurong Spring CC",
    date: "25 May 2024",
    time: "12:00 PM - 5:00 PM"
  },
  {
    id: 3,
    name: "Punggol CC Zumba Jam",
    description: "Join us for a fun and energetic Zumba session at Punggol CC.",
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
  const searchTerm = eventWhat.toLowerCase();
  const filteredEvents = sampleEvents.filter(event => 
    event.name.toLowerCase().includes(searchTerm)
  );
  res.render('search', { events: filteredEvents });
});

// Booking route
app.get('/booking/:id', (req, res) => {
  const eventId = parseInt(req.params.id);
  const event = sampleEvents.find(e => e.id === eventId);
  if (event) {
    res.render('booking', { event });
  } else {
    res.status(404).send('Event not found');
  }
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
