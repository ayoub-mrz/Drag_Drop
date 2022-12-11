
let todos = [];
const All_Status = document.querySelectorAll('.column .todos-container');
let draggebleTodo = null;
const Show_Btn = document.querySelector(".show-btn");
const Add_Btn = document.querySelector(".add-btn");
const Input_Ctn = document.querySelector(".input-container");
const Input_Card = document.querySelector(".input-card");
const Input = document.querySelector('input');
const Todo_Status = document.querySelector(".todo-clm .todos-container");
const Progress_Status = document.querySelector(".inProgress-clm .todos-container");
const Done_Status = document.querySelector(".done-clm .todos-container");
let localData = JSON.parse(localStorage.getItem("tasks")) || [];
let myTask;
const Task_Pattern = {
    title: "",
    id: Date.now(),
    done: false,
    status: 'todo',
}
// ----------------------------------------------------------

// Set LocalStoreg Data
if (localData.length > 0) {
    PlaceItem()
} else {
    localStorage.setItem("tasks", JSON.stringify([]));
}

//
function PlaceItem() {
    let data = JSON.parse(localStorage.getItem("tasks"));
    data.forEach(task => {
        let div = document.createElement("div");
        div.className = "todo";
        div.id = task.id;
        div.draggable = true;
        div.appendChild(document.createTextNode(task.title))
        switch (task.status) {
            case "todo":
                Todo_Status.appendChild(div);
            break;
            case "inProgress":
                Progress_Status.appendChild(div);
            break;
            case "done":
                Done_Status.appendChild(div);
            break;
        }
    })
}

window.onload = function () {
    todos = document.querySelectorAll('.todos-container .todo');
    //
    todos.forEach(todo => {
        todo.addEventListener("dragstart", dragStart);
        todo.addEventListener("dragend", dragEnd);
    })
}

function dragStart() {
    draggebleTodo = this;
    myTask = localData.filter(task => +task.id === +this.id)
};
function dragEnd() {
    draggebleTodo = null;
    myTask = null;
};

All_Status.forEach(status => {
    status.addEventListener("dragover", dragOver);
    status.addEventListener("dragenter", dragEnter);
    status.addEventListener("dragleave", dragLeave);
    status.addEventListener("drop", dragDrop);
})

function dragOver(e) {
    e.preventDefault();
};
function dragEnter() {
    this.style.backgroundColor = '#FFF';
};
function dragLeave() {
    this.style.backgroundColor = '#eeeeee';
};
function dragDrop() {
    this.style.backgroundColor = '#eeeeee';
    this.appendChild(draggebleTodo);
    handleStatusTask(myTask[0].id, this.getAttribute("type-task"));
};

// Show input task
Show_Btn.onclick = () => {
    Input_Ctn.style.display = "flex";
    setTimeout(() => {
        Input_Ctn.style.opacity = "1";
    }, 300);
}
// Hide input task
Input_Ctn.onclick = () => {
    Input_Ctn.style.opacity = "0";
    Input.value = "";
    setTimeout(() => {
        Input_Ctn.style.display = "none";
    }, 300);
}
// Stop Input Card From Hiding im self
Input_Card.onclick = (e) => {
    e.stopPropagation();
}
// 
Add_Btn.addEventListener('click', () => {
    if (Input.value === "" || Input.value > 20) {
        inputAnimation();
    } else {
        addTaskData();
        location.reload();
    }
})

function addTaskData() {
    Task_Pattern.title = Input.value;
    let data = JSON.parse(localStorage.getItem("tasks"));
    let Finished_Data = JSON.stringify([...data, Task_Pattern]);
    localStorage.setItem("tasks", Finished_Data)
}

function inputAnimation() {
    Input.style.outline = "1px solid red"
    setTimeout(() => {
        Input.style.outline = "unset"
    }, 3000);
}

//
function handleStatusTask(taskId, status) {
    let data = localData.filter(task => +task.id !== +taskId)
    myTask[0].status = status;
    data.push(...myTask)
    localStorage.setItem("tasks", JSON.stringify(data));
}