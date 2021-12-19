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
            <li class="list-group-item bg-secondary text-light">${task}<a href="# " class="mx-2 delete-item text-danger">X</a><a href="#" class="edit-item">Edit</a></li>
            `;
        })
    }
}

function addTask() {
    const task = taskInput.value;
    if(emptyTask.test(task)) {
        error.innerHTML = '<p class=".h3">Error: please Enter a task!</p>';
        setTimeout(() => {
            error.innerHTML = '';
        }, 2000);
    } else if(!tasks.includes(task)) {
        tasks.push(task)
        taskList.innerHTML += 
        `
        <li class="list-group-item bg-secondary text-light">${task}<a href="# " class="mx-2 delete-item text-danger">X</a><a href="#" class="edit-item">Edit</a></li>
        `;
        localStorage.setItem('tasks', JSON.stringify(tasks));
    } else {
        error.innerHTML = '<p class=".h3">Error: task already exists!</p>';
        setTimeout(() => {
            error.innerHTML = '';
        }, 2000);
    }
    taskInput.value = '';
}

function deleteTask(e) {
    tasks.forEach((task,i) => {
        if(task == e.target.parentElement.innerText.slice(0,-5)) {
            tasks.splice(i,1);
        }
    });
    e.target.parentElement.remove();
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function editTask(e) {
    text = e.target.parentElement.innerText;
        const textArr = [];
        for(let i = 0; i < text.length; i++) {
            textArr.push(text[i]);
        }
        for(let i = 0; i < 5; i++) {
            textArr.pop()
        }
        text = textArr.join('');
        taskInput.value = text;
        tasks.forEach((task,i) => {
            if(task == e.target.parentElement.innerText.slice(0,-5)) {
                tasks.splice(i,1);
            }
        });
        e.target.parentElement.remove();
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
                    <li class="list-group-item bg-secondary text-light">${task}<a href="# " class="mx-2 delete-item text-danger">X</a><a href="#" class="edit-item">Edit</a></li>
                    `;
                }
            }
        } else {
            taskList.innerHTML = '';
            tasks.forEach(task=>{
                taskList.innerHTML += `
                <li class="list-group-item bg-secondary text-light">${task}<a href="# " class="mx-2 delete-item text-danger">X</a><a href="#" class="edit-item">Edit</a></li>
                `;
            });
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