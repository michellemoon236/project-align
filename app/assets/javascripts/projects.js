function getProjects() {
  let main = document.getElementById('main');
  main.innerHTML = '<ul>';
  fetch("/projects")
  .then(response => response.json())
  .then(data => {
    main.innerHTML += `
      <h2>Welcome ${data.name}</h2>
      <h4>Email: ${data.email}</h4>
      <h4>Your Projects:</h4>
    `
    main.innerHTML += data.projects.map(project => {
      const p = new Project(project)
      return p.render()
    }).join('')
  main.innerHTML += '</ul>'
    })
}

class Project {
  constructor(project){
    this.id = project.id
    this.name = project.name
    this.description = project.description
  }

  render() {
    return `
      <li><a href="/projects/${this.id}">${this.name}</a></li>
    `
  }

}

