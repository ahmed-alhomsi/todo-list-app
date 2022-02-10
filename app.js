const taskInputBtn = document.getElementById('task-input-btn');
const taskInput = document.getElementById('task-input');
const searchInput = document.getElementById('search');
const taskList = document.getElementById('task-list');
const error = document.querySelector('.error');
let tasks = [];
const emptyTask = /^\s*$/;

document.addEventListener('DOMContentLoaded', ()=>{
    showAllTasks();
})

function showAllTasks() {
    if(localStorage.getItem('tasks') === null) {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
        tasks.forEach(task=>{
            taskList.innerHTML += 
            `
            <div class="d-flex my-2">
                <li class="list-group-item bg-task text-light w-75">${task}</li>
                <div class="d-flex">
                    <button type="button" class="btn btn-danger btn primary-btn delete-item p-2 px-3 mx-1">Delete</button>
                    <button type="button" class="btn btn-primary edit-item p-2 px-4 mx-1">Edit</button>
                </div>
            </div>
            `;
        })
    }
}

function addTask() {
    const task = taskInput.value;
    if(emptyTask.test(task)) {
        error.innerHTML = '<p class="h3">Error: please Enter a task!</p>';
        setTimeout(() => {
            error.innerHTML = '';
        }, 2500);
    } else if(!tasks.includes(task)) {
        tasks.push(task)
        taskList.innerHTML += 
        `
        <div class="d-flex my-2">
            <li class="list-group-item bg-task text-light w-75">${task}</li>
            <div class="d-flex">
                <button type="button" class="btn btn-danger btn primary-btn delete-item p-2 px-3 mx-1">Delete</button>
                <button type="button" class="btn btn-primary edit-item p-2 px-4 mx-1">Edit</button>
            </div>
        </div>
        `;
        localStorage.setItem('tasks', JSON.stringify(tasks));
    } else {
        error.innerHTML = '<p class="h3">Error: task already exists!</p>';
        setTimeout(() => {
            error.innerHTML = '';
        }, 2500);
    }
    taskInput.value = '';
}

function deleteTask(e) {
    tasks.forEach((task,i) => {
        if(task == e.target.parentElement.parentElement.innerText.slice(0,-12)) {
            tasks.splice(i,1);
        }
    });
    e.target.parentElement.parentElement.remove();
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function editTask(e) {
    text = e.target.parentElement.parentElement.innerText.slice(0,-12);
        const textArr = [];
        for(let i = 0; i < text.length; i++) {
            textArr.push(text[i]);
        }
        text = textArr.join('');
        console.log(text)
        taskInput.value = text;
        tasks.forEach((task,i) => {
            if(task == e.target.parentElement.parentElement.innerText.slice(0,-12)) {
                tasks.splice(i,1);
            }
        });
        e.target.parentElement.parentElement.remove();
        localStorage.setItem('tasks', JSON.stringify(tasks));
}

function searchTask(e) {
    taskList.innerHTML = '';
    const input = searchInput.value;
    const searchedTasks = [];
    const carachtersMatched = [];
    tasks.forEach(task=>{
        if(searchInput.value !== '') {
            for(let i = 0; i < input.length; i++) {
                if(input[i] == task[i]) {
                    carachtersMatched.push(i);
                }
            }
            const accurance = (carachtersMatched.length/task.length) * 100;
            if(task == input || accurance > 50) {
                if(!searchedTasks.includes(task)) {
                    searchedTasks.push(task);
                    taskList.innerHTML += `
                    <div class="d-flex my-2">
                        <li class="list-group-item bg-task text-light w-75">${task}</li>
                        <div class="d-flex">
                            <button type="button" class="btn btn-danger btn primary-btn delete-item p-2 px-3 mx-1">Delete</button>
                            <button type="button" class="btn btn-primary edit-item p-2 px-4 mx-1">Edit</button>
                        </div>
                    </div>
                    `;
                }
            }
        } else {
            taskList.innerHTML = '';
            showAllTasks();
        }
    })
}

taskInputBtn.addEventListener('click', ()=>{
    addTask();
});

taskList.addEventListener('click', (e)=>{
    if(e.target.classList.contains('edit-item')) {
        editTask(e);
    }
});

taskList.addEventListener('click', (e)=>{
    if(e.target.classList.contains('delete-item')) {
        deleteTask(e);
    }
});

searchInput.addEventListener('keyup', (e)=>{
    searchTask(e);
});