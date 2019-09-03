import moment from "moment";
import { getIssueTimeRequest } from './getIssueTimeRequest';

export function logIssueTimeRequest(dispatch, issues, issueId, hours, minutes, type) {

    let headers = new Headers();

    let apiKey = localStorage.getItem('apiKey');
    headers.append('X-Redmine-API-Key', apiKey);

    // POST /time_entries.json

    let FD = new FormData();
    let currentDate = moment().format("YYYY-MM-DD").toString();
    hours = calculateHours(hours, minutes);

    FD.append("time_entry[issue_id]", issueId);
    FD.append("time_entry[spent_on]", currentDate);
    FD.append("time_entry[hours]", hours);

    fetch('https://redmine.ekreative.com/time_entries.json', {
        headers,
        method: 'POST',
        body: FD,
    })
        .then(() => {
            let issue = getCurrentIssue(issues, issueId);

            getIssueTimeRequest(issueId).then((data) => {
                data.json().then((data) => {
                    let { time_entries } = data;
                    let timeOverall = 0;

                    time_entries.map((time_entry) => {
                        timeOverall += time_entry.hours;
                    });

                    issue.logTime = timeOverall;
                    return issue;
                }).then((updatedIssue) => {

                    issues = issues.map((issue) => {
                        if (issue.id === issueId) {
                            return updatedIssue;
                        }
                        return issue;
                    });

                    dispatch({ type, issues });
                });
            });
        });
}

function calculateHours(hours, minutes) {
    return +hours + (minutes / 60);
}

function getCurrentIssue(issues, issueId) {
    issues = issues.filter((issue) => {
        return issue.id === issueId;
    });

    return issues[0];
}



