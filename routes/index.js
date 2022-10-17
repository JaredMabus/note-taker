const api = require('express').Router();

const notesRouter = require('./notes');

// Api routes
api.use('/notes', notesRouter);

module.exports = api;