function displayCreateTaskForm() {
  let taskFormDiv = document.getElementById('task-form');
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

    document.querySelector("#task-added").innerHTML += `<li><a href="#" data-id="${task.id}">${task.content}</a></li>`
    document.querySelector("#task-added li a").addEventListener('click', displayTask)
    let taskFormDiv = document.getElementById('task-form');
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
  let task_show = document.getElementById('task');
  task_show.innerHTML = '';
  fetch('/tasks/' + id)
  .then(response => response.json())
  .then(task => {
    task_show.innerHTML += `
      <p>Content: ${task.content}</p>
      <p>${completed(task)}</p>
      <p>Date Created: ${task.created_at}</p>
      `
  })

}

function completed(task) {
  return task.complete ? 'Status: Complete' : 'Status: Not Complete'
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
