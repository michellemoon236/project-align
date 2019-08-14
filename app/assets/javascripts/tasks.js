function displayCreateTaskForm() {
  let taskFormDiv = document.getElementById('task-form');
  let projectId = window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1)
  let form = `
    <form onsubmit="createTask(); return false;">
      <label>New Task:</label>
      <input type="text" id="content">

      <input type="submit" value="Create Task">
    </form>
  `
  taskFormDiv.innerHTML = form;
}

function createTask() {
  const task = {content: document.getElementById('content').value}

  fetch('/tasks', {
    method: 'POST',
    body: JSON.stringify({content: "hello"}),
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



function displayTask() {
  let id = document.getElementById('task_link').dataset.id;
  let task_show = document.getElementById('task'+ id);
  task_show.innerHTML = '';
  fetch('/tasks/' + id)
  .then(response => response.json())
  .then(task => {
    task_show.innerHTML += `<p>${task.complete}</p>`;
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


