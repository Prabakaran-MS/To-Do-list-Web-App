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

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.className = "task-checkbox";
    checkbox.addEventListener("change", function() {
        handleCheckboxChange(index);
    });

    const taskTextSpan = document.createElement("span");
    taskTextSpan.textContent = task.text;

    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-button";
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", function() {
        handleDeleteButtonClick(index);
    });

    taskItem.appendChild(checkbox);
    taskItem.appendChild(taskTextSpan);
    taskItem.appendChild(deleteButton);

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