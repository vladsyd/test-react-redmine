import { login as loginRequest } from '../network/login';
import { getProjects as getProjectsRequest } from '../network/getProjects';
import { getProjectIssuesRequest } from '../network/getProjectIssuesRequest';
import { logIssueTimeRequest } from '../network/logIssueTimeRequest';

export const AUTH = 'AUTH';
export const GET_PROJECTS = 'GET_PROJECTS';
export const GET_PROJECT_ISSUES = 'GET_PROJECT_ISSUES';
export const LOG_ISSUE_TIME = 'LOG_ISSUE_TIME';
export const ADD_COMMENT = 'ADD_COMMENT';

export const AUTH_ERROR = 'AUTH_ERROR';
export const CLEAR_AUTH_ERROR = 'CLEAR_AUTH_ERROR';
export const GET_PROJECT_ISSUES_ERROR = 'GET_PROJECT_ISSUES_ERROR';

export function login(credentials) {
    return (dispatch) => {
        loginRequest(dispatch, credentials, AUTH, AUTH_ERROR);    
    };
}

export function getProjects() {
    return (dispatch) => {
        getProjectsRequest(dispatch, GET_PROJECTS);
    }
}

export function clearAuthError() {
    return (dispatch) => {
        dispatch({ type: CLEAR_AUTH_ERROR })
    }
}

export function getProjectIssues(projectId) {
    return (dispatch) => {
        getProjectIssuesRequest(dispatch, projectId, GET_PROJECT_ISSUES, GET_PROJECT_ISSUES_ERROR);
    }
}

export function logIssueTime(issues, issueId, hours, minutes) {
    return (dispatch) => {
        logIssueTimeRequest(dispatch, issues, issueId, hours, minutes, LOG_ISSUE_TIME);
    }
}

export function addComment(projects, projectId, comment) {
    return (dispatch) => {
        dispatch({ 
            projects,
            projectId,
            comment,
            type: ADD_COMMENT
        });
    }
}

