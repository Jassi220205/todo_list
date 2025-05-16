function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
  localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
}

window.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
  }

  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  const taskList = document.getElementById('task-list');

  if (taskList) {
    tasks.forEach(task => {
      if (!task.completed) {
        const li = document.createElement('li');
        li.innerHTML = `<label><input type="checkbox" onchange="completeTask('${task.id}')"> ${task.text}</label>`;
        taskList.appendChild(li);
      }
    });
  }
});

function addTask(text) {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  const newTask = {
    id: Date.now().toString(),
    text: text,
    completed: false
  };
  tasks.push(newTask);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  location.reload();
}

function completeTask(taskId) {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  const updatedTasks = tasks.map(task => {
    if (task.id === taskId) task.completed = true;
    return task;
  });
  localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  location.reload();
}
