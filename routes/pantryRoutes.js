const express = require('express');
const router = express.Router();
const controller = require('../controllers/pantryController.js');

// register page
router.get('/register', (req, res) => {
    res.render('user/register', {}); // Render the 'pantryRegister' view
});

// Landing page
router.get('/', (req, res) => {
    res.render('home', {}); // Render the 'home' view
});

// Route for registering a user
router.post('/register', async (req, res) => {
    // Assuming you're saving the user's details to the database
    const { forename, surname, email, password } = req.body;
    // Call the controller function to handle user registration
    controller.handle_register(req, res);
});

// Login page
router.get('/login', (req, res) => {
    res.render('login', {}); // Render the 'login' view
});

// Handle login submission
router.post('/login', async (req, res) => {
    // Assuming you're handling login authentication
    controller.loginUser(req, res);
});

// About page
router.get('/about', (req, res) => {
    res.render('about', {}); // Render the 'about' view
});

// Handle 404 errors
router.use((req, res) => {
    res.status(404);
    res.type('text/plain');
    res.send('404 Not found.');
});

// Handle internal server errors
router.use((err, req, res, next) => {
    res.status(500);
    res.type('text/plain');
    res.send('Internal Server Error.');
});

module.exports = router;