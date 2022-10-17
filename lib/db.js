const fs = require('fs');

// Update db with new note
const updateDb = async (data) => {
    fs.writeFile('./db/db.json', JSON.stringify(data, "", "\t"), (err) => {
        if (err) {
            return false;
        }
    })

    return true;
};

module.exports = { updateDb }