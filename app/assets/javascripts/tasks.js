function displayCreateTaskForm() {
  let taskFormDiv = document.getElementById('task_form');
  let projectId = window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1)
  let form = `
    <form onsubmit="createTask(); return false;">
      <label>New Task:</label>
      <input type="text" id="content">
      <input type="hidden" id="project_id" value="${projectId}">
      <input type="submit" value="Create Task">
    </form>
  `
  taskFormDiv.innerHTML = form;
}

function createTask() {
  const task = {content: document.getElementById('content').value, project_id: document.getElementById('project_id').value}

  fetch('/tasks', {
    method: 'POST',
    body: JSON.stringify({task}),
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  }).then(response => response.json())
  .then(task => {

    document.querySelector("#task_added").innerHTML += `
      <li><a href="#" data-id="${task.id}">${task.content}</a></li>
    `
    document.querySelector("#task_added li a").addEventListener('click', displayTask)
    let taskFormDiv = document.getElementById('task_form');
    taskFormDiv.innerHTML = '';
  })
}

function attachClickTaskLinks() {
  let tasks = document.querySelectorAll('#tasks_list li a');
  for (let i= 0; i < tasks.length; i++) {
    tasks[i].addEventListener('click', displayTask)
  }
}


function displayTask(e) {
  e.preventDefault();
  let id = this.dataset.id;
  let task_details = document.getElementById('task_details');
  task_details.innerHTML = '';
  fetch('/tasks/' + id)
  .then(response => response.json())
  .then(task => {
    task_details.innerHTML += `
      <p><strong>Content:</strong> ${task.content}</p>
      <p><strong>Date Created:</strong> ${task.created_at}</p>
      <table>
        <tr>
          <td>${completed(task)}</td>
          <td>
            <form action="/tasks/${task.id}/complete" method="get">
            <input type="hidden" id="id" value="${task.id}">
            <input type="submit" value="Change Status">
            </form>
          </td>
        </tr>
      </table>
      <a href="/tasks/${task.id}/complete">Change Status</a> |
      <a href="/projects/${task.project_id}/tasks/${task.id}/edit">Edit Task</a> | 
      <a data-method="delete" href="/tasks/${task.id}">Delete Task</a>
      `
  })

}

function completed(task) {
  return task.complete ? '<strong>Status:</strong> Complete' : '<strong>Status:</strong> Not Complete'
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


window.addEventListener('load', function(){
  attachClickTaskLinks();
})
