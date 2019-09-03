export function getProjects(dispatch, type) {

  let headers = new Headers();

  let apiKey = localStorage.getItem('apiKey');
  headers.append('X-Redmine-API-Key', apiKey);

  fetch('https://redmine.ekreative.com/projects.json', { headers })
    .then((resp) => {
      resp.json().then((data) => {
        dispatch({ type, projects: data.projects });
      })
    });
}



