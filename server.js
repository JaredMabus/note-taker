const express = require('express');
const path = require('path');
const api = require('./routes/index');

const PORT = process.env.PORT || 3001;

// Initialize express 
const app = express();

// Middleware: 
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api', api)

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'))
});

app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, 'public/notes.html'))
);

// Set listening port
app.listen(PORT, () =>
    console.log(`Example app listening at http://localhost:${PORT}`)
);