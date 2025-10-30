//Anica Ferreira 40_u24581802

const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const fs = require('fs');
const path = require('path');

//include class
const TaskHandler = require('./taskHandler');
const taskHandler = new TaskHandler();

//path to JSON file
const filePath = path.join(__dirname, 'tasks.json');

//load tasks from file
if(fs.existsSync(filePath)){
    const savedTask = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    savedTask.forEach(task =>  taskHandler.addTask(task));
}else{
    //create new file if it doesnt exist
    fs.writeFileSync(filePath, JSON.stringify(taskHandler.getTasks(), null, 2));
}

//function to update JSON file
const saveToFile = () => {
    fs.writeFileSync(filePath, JSON.stringify(taskHandler.getTasks(), null, 2));
}

//serve index.html file
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

//route to server.js
app.get("/index.js", (req, res) => {
    res.setHeader("Content-Type", "application/javascript");
    res.sendFile(__dirname + "/index.js");
});

//handle server sockets
io.on('connection', (socket) => {
    //connect
    console.log('A user connected with ID ', socket.id);

    //update tasks when user connects
    socket.emit("updateTasks", taskHandler.getTasks());

    //when task event is received
    socket.on('task', (task) =>{
        taskHandler.addTask(task);
        saveToFile();
        //emit current votes to update tasks
        io.emit("updateTasks", taskHandler.getTasks());
    });

    //disconnect
    socket.on("disconnect", () =>{
        console.log('A user disconnected with ID ', socket.id);
    });
});

http.listen(3000, () => {
    console.log("Listening on http://localhost:3000");
});