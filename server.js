const express = require('express');
const path = require('path');
const fs = require('fs');
const data = require('./db/db.json');

// Set port variable
const PORT = 3001;

// Initialize express 
const app = express();

// Middleware: 
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'))
});

app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, 'public/notes.html'))
);

// Create API route at "api/notes" to handle request data


// Set listening port
app.listen(PORT, () =>
    console.log(`Example app listening at http://localhost:${PORT}`)
);