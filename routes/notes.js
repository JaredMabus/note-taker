const notes = require('express').Router();
const uuid = require('uuid');
let data = require('../db/db.json');
const db = require('../lib/db');

notes.get('/', (req, res) => {
    // Return note data
    if (data) {
        res.status(200).json(data);
    } else {
        res.status(500).json({ msg: "No data" });
    }
});

notes.post('/', async (req, res) => {
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
        data = data;

        // Return msg and status
        success === true
            ? res.status(200).json({ msg: "Success!" })
            : res.status(400).json({ msg: "Sorry, error occurred." });

    } else {
        res.sendStatus(400);
    }
});

notes.delete('/:id', async (req, res) => {
    // Get id from url params
    let id = req.params.id

    // Remove note from data global var
    let filteredData = data.filter(note => {
        return note.id !== id;
    });

    // Update db.json
    const success = await db.updateDb(filteredData);

    // Update global data variable
    data = filteredData;

    // Return msg and status
    success
        ? res.status(200).json({ msg: "Success!" })
        : res.status(400).json({ msg: "Sorry, error occurred." });
});


module.exports = notes;