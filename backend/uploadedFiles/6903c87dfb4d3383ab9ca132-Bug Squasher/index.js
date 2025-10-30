//Anica Ferreira 40_u24581802

//client logic:
const socket = io();

socket.on('connect', () => {
    console.log('I connected with ID: ', socket.id);
    handleTasks();
    
    socket.on('updateTasks', (tasks) => {
        update(tasks);
    });
});

//handle adding tasks
const handleTasks = () => {
    const form = document.getElementById('taskForm');
    
    //listen for new tasks
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        let newTask = document.getElementById('taskIn').value;
        if(newTask !== ''){
            //emit task event
            socket.emit('task', newTask);
            //clear input
            document.getElementById('taskIn').value = '';
        }
    });
}

//update tasks
const update = (tasks) => {
    const taskList = document.getElementById('taskList');
    //clear current tasks
    taskList.innerHTML = '';

    tasks.map((task) => {
        const listItem = document.createElement('li');
        listItem.textContent = task;
        taskList.appendChild(listItem);
    });
}