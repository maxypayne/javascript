class Tooltip {}

class ProjectItem {
  constructor(id) {
    this.id = id;
    this.connectMoreInfoButton();
    this.connectSwitchButton();
  }
  connectMoreInfoButton();
  connectSwitchButton() {
   const projectItemElement =  document.getElementById(this.id);
   const switchButton = projectItemElement.querySelector('button:last-of-type');
   switchButton.addEventListener('click', () => {})
  }
}

class ProjectList {
  projects = [];
  constructor(type, switchHandler) {
    this.switchHandler = switchHandler;
    const projectItems = document.querySelectorAll(`#${type}-projects li`);
    projectItems.forEach(item => {
      this.projects.push(new ProjectItem(item.id));
    })
    console.log(this.projects);
  }
  setSwitchHandler
  addProject() {}
  switchProject(projectId) {
    // const projectIndex = this.projects.findIndex(p => p.id === projectId);
    // this.projects.splice(projectIndex, 1);
    this.switchHandler(this.projects.find(p => p.id === projectId));
    this.projects.filter(p => p !== projectId);
  }
}
class App {
  static init() {
    const activeProjectList = new ProjectList('active');
    const finishedProjectList = new ProjectList('finished');
  }
}
App.init();
