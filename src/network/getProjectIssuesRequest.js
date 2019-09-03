import { getIssueTimeRequest } from './getIssueTimeRequest';
import { getBasicRequestHeaders } from './getBasicRequestHeaders';

export function getProjectIssuesRequest(dispatch, projectId, type, errorType) {

  let headers = getBasicRequestHeaders();

  //GET /issues.json?project_id=2

  fetch('https://redmine.ekreative.com/issues.json?project_id=' + projectId, { headers })
    .then((resp) => {
      resp.json().then((data) => {

        let { issues } = data;

        const promises = issues.map(issue => new Promise(resolve => {
          getIssueTimeRequest(issue.id).then((resp) => {
            resp.json().then((data) => {
              let { time_entries } = data;
              let timeOverall = 0;

              time_entries.map((time_entry) => {
                timeOverall += time_entry.hours;
              });

              issue.logTime = timeOverall;
              resolve(issue);
            });
          });
        }));
        Promise.all(promises).then(issues => {
          dispatch({ type, issues });
        });
      });
    }).catch(() => {
      dispatch({
        type: errorType,
        errorMessage: 'You can\'t get issues for this project due to permissions.'
      });
    });
}



