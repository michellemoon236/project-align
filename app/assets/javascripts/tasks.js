<a href="#" onclick="displayCreateTaskForm()">Add Task</a>
<div id="task-form">
</div>

function displayCreateTaskForm() {
  let taskFormDiv = document.getElementById('task-form');
  let form = `
    <form onsubmit="createTask()">
      <label>New Task:</label>
      <input type="text" id="content">
      <input type=?submit" value="Create Task">
    </form>
  `
  taskFormDiv.innerHTML = form;
}