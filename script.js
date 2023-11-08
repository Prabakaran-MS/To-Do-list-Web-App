const taskInput = document.getElementById("task");
const taskList = document.getElementById("taskList");
let tasks = [];

function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText !== "") {
        const newTask = {
            text: taskText,
            completed: false,
        };

        tasks.push(newTask);
        saveTasks();
        renderTasks();
        taskInput.value = "";
    }
}

function renderTasks() {
    taskList.innerHTML = "";
    tasks.forEach((task, index) => {
        const taskItem = createTaskItem(task, index);
        taskList.appendChild(taskItem);
    });
}

function createTaskItem(task, index) {
    const taskItem = document.createElement("li");
    taskItem.className = "list-group-item";

    const taskRow = document.createElement('div');
    taskRow.className = 'row'

    const taskCol = document.createElement('div');
    taskCol.className = 'form-check text-start col-sm-8 col-md-9';

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.className = "form-check-input task-checkbox mx-2";
    checkbox.addEventListener("change", function() {
        handleCheckboxChange(index);
    });

    const taskText = document.createElement("label");
    taskText.className = 'form-check-label ';
    taskText.textContent = task.text;

    taskCol.appendChild(checkbox);
    taskCol.appendChild(taskText);

    const taskAction = document.createElement('div');
    taskAction.className = 'col-sm-4  col-md-3 d-grid';

    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-button btn btn-danger";
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", function() {
        handleDeleteButtonClick(index);
    });
    taskAction.appendChild(deleteButton);

    taskRow.appendChild(taskCol);
    taskRow.appendChild(taskAction);

    taskItem.appendChild(taskRow);
    return taskItem;
}

function handleCheckboxChange(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
}

function handleDeleteButtonClick(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

const savedTasks = localStorage.getItem("tasks");
if (savedTasks) {
    tasks = JSON.parse(savedTasks);
}


renderTasks();