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

const sampleCourses = [
  { id: 1, title: "Health & Wellness", shortDescription: "Look good and feel good...", description: "Look good and feel good with our health and wellness tips. Discover how you can spruce up your look with some grooming, make-up and skincare advice, and learn how to take better care of your health and body. With our ‘Health & Wellness’ courses, it is time for you to start feeling and looking your very best.", subcourses: ["Personal Health", "Stress Management", "Dietary Nutrition", "Skincare & Make-up"], image: "/images/health-wellness.png" },
  { id: 2, title: "Lifestyle & Leisure", shortDescription: "Embrace the Arts...", description: "Embrace the Arts, craft your own leather cardholder, cook up a storm with our celebrity chefs and trainers or unleash your creativity and find the star in you.", subcourses: ["Art & Crafts", "Culinary Skills", "Creative Writing"], image: "/images/lifestyle-leisure.png" },
  { id: 3, title: "Sports & Fitness", shortDescription: "Conquer air, water, and land...", description: "Conquer air, water, and land while staying up to date with the latest in sports!", subcourses: ["Aerobics", "Swimming", "Yoga"], image: "/images/sports-fitness.png" },
  { id: 4, title: "Education & Enrichment", shortDescription: "Pique your child's interest...", description: "Pique your child's interest with our range of hands-on science courses or improve pronunciation and reading with our phonics courses.", subcourses: ["Science Experiments", "Phonics", "Reading Clubs"], image: "/images/education-enrichment.png" },
  { id: 5, title: "Lifelong Learning", shortDescription: "In the age of evolving technology...", description: "In the age of evolving technology, you should evolve as well and learn skills that can keep you up with the times.", subcourses: ["Computer Skills", "Digital Marketing", "Photography"], image: "/images/lifelong-learning.png" },
  { id: 6, title: "Lifelong", shortDescription: "In the age of evolving technology...", description: "In the age of evolving technology, you should evolve as well and learn skills that can keep you up with the times.", subcourses: ["Computer Skills", "Digital Marketing", "Photography"], image: "/images/lifelong-learning.png" }
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

// Booking success route
app.post('/booking-success', (req, res) => {
  // Logic to handle booking (e.g., save to database) would go here.
  // For now, we simply render the success page.
  res.render('booking-success');
});

// Booking failed route
app.post('/booking-failed', (req, res) => {
  // Logic to handle booking (e.g., save to database) would go here.
  // For now, we simply render the success page.
  res.render('booking-failed');
});

app.get('/booking-failed', (req, res) => {
  // Logic to handle booking (e.g., save to database) would go here.
  // For now, we simply render the success page.
  res.render('booking-failed');
});

// Courses route
app.get('/courses', (req, res) => {
  res.render('courses', { courses: sampleCourses });
});

// Course details route
app.get('/courses/:id', (req, res) => {
  const courseId = parseInt(req.params.id);
  const course = sampleCourses.find(c => c.id === courseId);
  if (course) {
      res.render('course-details', { course });
  } else {
      res.status(404).send('Course not found');
  }
});

// Rewards route
app.get('/rewards', (req, res) => {
  res.render('rewards');
});


app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
