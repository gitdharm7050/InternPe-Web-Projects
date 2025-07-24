// script.js
let taskList = [];

window.onload = function () {
  loadTasks();
};

function addTask() {
  const input = document.getElementById("taskInput");
  const date = document.getElementById("taskDate").value;
  const priority = document.getElementById("taskPriority").value;
  const taskText = input.value.trim();

  if (taskText === "") return alert("Please enter a task!");

  taskList.push({
    text: taskText,
    completed: false,
    dueDate: date,
    priority: priority
  });

  input.value = "";
  document.getElementById("taskDate").value = "";
  document.getElementById("taskPriority").value = "Low";

  saveTasks();
  renderTasks();
}

function renderTasks() {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  taskList.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = task.completed ? "completed" : "";

    // Priority class
    if (task.priority === "High") li.classList.add("high");
    else if (task.priority === "Medium") li.classList.add("medium");
    else if (task.priority === "Low") li.classList.add("low");

    const text = document.createElement("span");
    text.textContent = task.text;
    text.style.cursor = "pointer";
    text.onclick = () => toggleComplete(index);

    const info = document.createElement("div");
    info.innerHTML = `
      <small>📅 ${task.dueDate || "No date"}</small><br>
      <small>⚡ Priority: <strong>${task.priority}</strong></small>
    `;
    info.style.fontSize = "12px";
    info.style.color = "#666";

    const content = document.createElement("div");
    content.appendChild(text);
    content.appendChild(info);

    const buttons = document.createElement("div");
    buttons.className = "task-buttons";

    const editBtn = document.createElement("button");
    editBtn.textContent = "✏️";
    editBtn.onclick = () => editTask(index);

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "🗑️";
    deleteBtn.onclick = () => deleteTask(index);

    buttons.appendChild(editBtn);
    buttons.appendChild(deleteBtn);

    li.appendChild(content);
    li.appendChild(buttons);
    list.appendChild(li);
  });
}

function toggleComplete(index) {
  taskList[index].completed = !taskList[index].completed;
  saveTasks();
  renderTasks();
}

function deleteTask(index) {
  taskList.splice(index, 1);
  saveTasks();
  renderTasks();
}

function editTask(index) {
  const newText = prompt("Edit task:", taskList[index].text);
  if (newText !== null && newText.trim() !== "") {
    taskList[index].text = newText.trim();
    saveTasks();
    renderTasks();
  }
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(taskList));
}

function loadTasks() {
  const storedTasks = localStorage.getItem("tasks");
  if (storedTasks) {
    taskList = JSON.parse(storedTasks);
    renderTasks();
  }
}

