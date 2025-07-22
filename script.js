const form = document.getElementById("task-form");
const input = document.getElementById("task-input");
const taskList = document.getElementById("task-list");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const taskText = input.value.trim();
  if (taskText === "") return;

  tasks.push({ text: taskText, completed: false });
  input.value = "";
  saveTasks();
  showTasks();
});

function showTasks() {
  taskList.innerHTML = "";

  if (tasks.length === 0) {
    const empty = document.createElement("p");
    empty.textContent = "No tienes tareas pendientes";
    empty.style.textAlign = "center";
    empty.style.color = "gray";
    taskList.appendChild(empty);
    return;
  }

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.textContent = task.text;
    if (task.completed) li.classList.add("completada");

    li.addEventListener("click", function () {
      tasks[index].completed = !tasks[index].completed;
      saveTasks();
      showTasks();
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "X";
    deleteBtn.classList.add("btn-delete");
    deleteBtn.addEventListener("click", function () {
      tasks.splice(index, 1);
      saveTasks();
      showTasks();
    });

    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

showTasks(); // Cargar tareas al iniciar

