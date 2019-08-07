const BASE_URL = "http://localhost:3000"

function getProjects() {
  let main = document.getElementById('main')
  main.innerHTML = '<ul>'
  fetch("http://localhost:3000/projects")
  .then(response => response.json())
  .then(data => {
    main.innerHTML += data.map(project => {
      let p = new Project(project)
      return p.render()
    }
  ).join('')
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
      <li><a href="#" data-id="$this.id}">${this.name}</a></li>
    `
  }

}