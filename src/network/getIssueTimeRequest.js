import { getBasicRequestHeaders } from './getBasicRequestHeaders';

export function getIssueTimeRequest(issueId) {

    let headers = getBasicRequestHeaders();
    
    //GET /time_entries.json

    return fetch('https://redmine.ekreative.com/time_entries.json?issue_id=' + issueId+'&limit=100', { headers });
}



