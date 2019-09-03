
export function getIssueTimeRequest(issueId) {

    let headers = new Headers();

    let apiKey = localStorage.getItem('apiKey');
    headers.append('X-Redmine-API-Key', apiKey);

    //GET /time_entries.json

    return fetch('https://redmine.ekreative.com/time_entries.json?issue_id=' + issueId+'&limit=100', { headers });
}



