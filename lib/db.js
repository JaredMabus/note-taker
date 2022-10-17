const fs = require('fs');

// Update db with new note
const updateDb = (data) => {
    fs.writeFile('./db/db.json', JSON.stringify(data, "", "\t"), (err) => {
        let success = err
            ? false
            : true;

        return success
    })
};

module.exports = { updateDb }