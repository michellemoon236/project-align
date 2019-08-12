function getProjects() {
  fetch("/projects")
  .then(response => response.json())
  .then(data => {
    let main = document.getElementById('main');
    main.innerHTML = '<ul>';
    main.innerHTML += data.map(project => {
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
      <li><a href="#" data-id="${this.id}">${this.name}</a></li>
    `
  }

}