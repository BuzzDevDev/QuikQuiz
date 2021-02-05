const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const fs = require('fs');
const easytoken = require("@ksplat/easytoken");
const { jsonReader, updateJson } = require("./utils/jsonReader")

var port = process.env.PORT || 8080;


app.use(express.urlencoded({
    extended: true
}));

app.post('/create-quiz', (req, res) => {
    const quizName = req.body.quizName;
    var code = easytoken.createShort();

    // Update quizzes.json file

    jsonReader("./data/quizzes.json", (err, data) => {
        if (err) {
            console.log('Error _reading_ file:', err);
            return;
        };
        
        data.quizzes++
        data.codes.push(code);

        fs.writeFile("./data/quizzes.json", JSON.stringify(data), (err) => {
            if (err) console.log('Error _writing_ file:', err);
        });
    });

    // create code.json file

    fs.writeFile(`./data/quizzes/${code}.json`, JSON.stringify(data), (err) => {
        if (err) console.log('Error _writing_ file:', err);
    });


    res.redirect(`/?code=${code}`);
    res.end();
});

// use webpage file index.html in /public/
app.use(express.static(__dirname + '/public/'));

// event listener listening for a user to connect to server
io.on('connection', socket => {
    socket.emit('Console', 'Connected to server.');
    socket.on("req-quiz-data", msg => {
        // msg = code
        
    });
});

server.listen(port);