const fs = require('fs');

function jsonReader(filePath, cb) {
    fs.readFile(filePath, (err, fileData) => {
        if (err) {
            return cb && cb(err);
        };
        try {
            const object = JSON.parse(fileData);
            return cb && cb(null, object);
        } catch(err) {
            return cb && cb(err);
        };
    });
};

// update json file template

/*

jsonReader("filePathHere", (err, data) => {
    if (err) {
        console.log('Error reading file:', err);
        return;
    };
    
    fs.writeFile("filePathHere", JSON.stringify(data), (err) => {
        if (err) console.log('Error writing file:', err);
    });
});

*/
module.exports = {
    jsonReader
}