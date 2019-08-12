function displayCreateTaskForm() {
  let taskFormDiv = document.getElementById('task-form');
  let form = `
    <form onsubmit="createTask(); return false;">
      <label>New Task:</label>
      <input type="text" id="content">
      <input type="hidden" id="project_id">
      <input type="submit" value="Create Task">
    </form>
  `
  taskFormDiv.innerHTML = form;
}

function createTask() {
  const task = { content: document.getElementById('content').value }
  let id = document.getElementById('project_id').value
  fetch('/tasks', {
    method: 'POST',
    body: JSON.stringify({task}),
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  }).then(resp => resp.json())
  .then(task => {
    t = new Task(task)
    document.querySelector("task-added").innerHTMl += t.render()
    let taskFormDiv = document.getElementById('task-form');
    taskFormDiv.innerHTML = '';
  })
}

class Task {
  constructor(task){
    this.id = task.id
    this.content = task.content
  }

  render() {
    return `
      <li>${this.content}</li>
    `
  }

}