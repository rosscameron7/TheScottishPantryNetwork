const express = require('express');
const app = express();

const cookieParser = require('cookie-parser'); // Import cookie-parser
app.use(cookieParser()); // Use cookie-parser middleware

app.use(express.urlencoded({ 
    extended: true 
}));

const path = require('path');
const public = path.join(__dirname, 'public');
const mustacheExpress = require('mustache-express'); // Import mustacheExpress

app.use(express.static(public));

const mustache = require('mustache-express');
// Register '.mustache' extension with The Mustache Express
app.engine('mustache', mustacheExpress()); // Initialize mustacheExpress
app.set('view engine', 'mustache');

const router = require('./routes/pantryRoutes');
app.use('/', router);

// Mount pantryRoutes middleware
app.use('/', router);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server started. Listening on port ${port}. Ctrl^c to quit.`);
});
