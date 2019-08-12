function displayCreateTaskForm() {
  let taskFormDiv = document.getElementById('task-form');
  let projectId = window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1)
  let form = `
    <form onsubmit="createTask()">
      <label>New Task:</label>
      <input type="text" id="content">
      <input type="hidden" id="project_id" value="${projectId}">
      <input type="submit" value="Create Task">
    </form>
  `
  taskFormDiv.innerHTML = form;
}

function createTask() {
  const task = { content: document.getElementById('content').value, project_id: document.getElementById('project_id').value, complete: "false" }

  fetch("/tasks", {
    method: 'POST',
    body: JSON.stringify({task}),
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  }).then(response => response.json())
  .then(task => {
    document.querySelector("#task-added").innerHTML += `<li>${task.content}</li>`;
    let taskFormDiv = document.getElementById('task-form');
    taskFormDiv.innerHTML = '';
  })
}
  
class Task {
  constructor(task){
    this.id = task.id
    this.content = task.content
    this.project_id = task.project_id
  }

  render() {
    return `
      <li>${this.content}</li>
    `
  }

}

