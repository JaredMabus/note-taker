const api = require('express').Router();

const notesRouter = require('./notes');

// const api = express.Router();

// Api routes
api.use('/notes', notesRouter);

module.exports = api;