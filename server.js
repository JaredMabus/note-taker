const express = require('express');
const path = require('path');
let data = require('./db/db.json');
const uuid = require('uuid');
const db = require('./lib/db');

const PORT = process.env.PORT || 3001;
// const PORT = 3001;

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

// Create GET API route for notes data
app.get('/api/notes', (req, res) => {
    // Return note data
    if (data) {
        res.status(200).json(data);
    } else {
        res.status(500).json({ msg: "No data" });
    }
});

// Create POST API route for notes data
app.post('/api/notes', async (req, res) => {
    let note = req.body;

    // If note object is not empty, add note to db
    if (Object.keys(note).length > 0) {
        // Add id to note
        note.id = uuid.v4();

        // Add note to top of data global var
        data.push(note);

        // Update db.json
        const success = await db.updateDb(data);

        // Update global data variable
        success ? data = data : ""

        // Return msg and status
        success === true
            ? res.status(200).json({ msg: "Success!" })
            : res.status(400).json({ msg: "Sorry, error occurred." });

    } else {
        res.sendStatus(400);
    }
});

// Create DELETE API route for notes data
app.delete('/api/notes/:id', async (req, res) => {
    // Get id from url params
    let id = req.params.id

    // Remove note from data global var
    let filteredData = data.filter(note => {
        return note.id !== id;
    });

    // Update db.json
    const success = await db.updateDb(filteredData);

    // Update global data variable
    data = filteredData

    // Return msg and status
    success
        ? res.status(200).json({ msg: "Success!" })
        : res.status(400).json({ msg: "Sorry, error occurred." });
});

// Set listening port
app.listen(PORT, () =>
    console.log(`Example app listening at http://localhost:${PORT}`)
);