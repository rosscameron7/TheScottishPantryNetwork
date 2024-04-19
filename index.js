const express = require('express');
const path = require('path');
const Datastore = require('gray-nedb');
const mustacheExpress = require('mustache-express');

const app = express(); // Move the declaration and initialization of 'app' to the top

// Register '.mustache' extension with The Mustache Express
app.engine('mustache', mustacheExpress());

app.set('view engine', 'mustache');

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, './public')));

// Initialize Gray-NEDB datastore
const db = new Datastore({ filename: './database/tspn.db', autoload: true });

// About page
app.get('/', (req, res) => {
    res.render('home', {}); // Render the 'home' view
});

// About page
app.get('/about', (req, res) => {
    res.render('about', {}); // Render the 'about' view
});

//Handle 404 errors
app.use((req, res) => {
    res.status(404);
    res.render('404', {}); // Render the '404' view
});

app.listen(2020, () => {
    console.log('Server listening on port: 2020');
});
