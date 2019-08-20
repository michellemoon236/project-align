function displayCreateTaskForm(id) {
  let taskFormDiv = document.getElementById('task_form');
  let projectId = id
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
    document.querySelector("#task_added li a").addEventListener('click', function(e) {
      displayTask(e, `${task.id}`)})

    let taskFormDiv = document.getElementById('task_form');
    taskFormDiv.innerHTML = '';
  })
}

function displayTask(e, id) {
  e.preventDefault();
  let task_details = document.getElementById('task_details');
  task_details.innerHTML = '';
  fetch('/tasks/' + id)
  .then(response => response.json())
  .then(task => {
    task_details.innerHTML += `
      <p><strong>Content:</strong> ${task.content}</p>
      <p><strong>Created:</strong> ${task.date_created}</p>
      <p><strong>Updated:</strong> ${task.date_updated}</p>
      <table>
        <tr>
          <td>${completed(task)}</td>
          <td>
            <form action="/tasks/${task.id}/complete" method="get">
            <input type="submit" value="Change Status">
            </form>
          </td>
        </tr>
      </table>
      <a href="/projects/${task.project_id}/tasks/${task.id}/edit">Edit Task</a> | 
      <a data-method="delete" href="/tasks/${task.id}">Delete Task</a>
      `
  })

}

function completed(task) {
  return task.complete ? '<strong>Status:</strong> Complete' : '<strong>Status:</strong> Not Complete'
}


