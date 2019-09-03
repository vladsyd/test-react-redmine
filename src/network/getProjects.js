import { getBasicRequestHeaders } from './getBasicRequestHeaders'; 

export function getProjects(dispatch, type) {

  let headers = getBasicRequestHeaders();

  fetch('https://redmine.ekreative.com/projects.json', { headers })
    .then((resp) => {
      resp.json().then((data) => {
        dispatch({ type, projects: data.projects });
      })
    });
}



