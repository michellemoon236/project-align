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
    let dataAlphabetized = data.projects.sort(function(a, b) {
      var nameA = a.name
      var nameB = b.name
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
    
      return 0;
    });

    main.innerHTML += dataAlphabetized.map(project => {
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
  }

  render() {
    return `
      <li><a href="/projects/${this.id}">${this.name}</a></li>
    `
  }

}

