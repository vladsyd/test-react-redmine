import { combineReducers } from 'redux';

import { 
    AUTH,
    GET_PROJECTS,
    GET_PROJECT_ISSUES,
    ADD_COMMENT,
    LOG_ISSUE_TIME,
    AUTH_ERROR,
    CLEAR_AUTH_ERROR,
    GET_PROJECT_ISSUES_ERROR
} from "../actions/"

import { setUserData } from "../localStorage/setUserData";
import { saveComment } from "../localStorage/saveComment";
import { getSavedComments } from "../localStorage/getSavedComments";

const authReducer = (state = {}, action) => {
    switch (action.type) {
        case AUTH:
            state = Object.assign({},
                { userData: action.userData.user, password: action.password });
            setUserData(action);
            return state;
        case AUTH_ERROR:
            state = Object.assign({}, { errorMessage: action.errorMessage });
            return state;
        case CLEAR_AUTH_ERROR:
            state = Object.assign({}, { errorMessage: '' });
            return state;
        default:
            return state;
    }
}

const projectsReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_PROJECTS:
            let { projects } = action;
            projects = getSavedComments(projects);
            state = Object.assign({}, { projects });
            return state;
        case ADD_COMMENT:
            state = Object.assign({}, { projects: action.projects });
            saveComment(action);
            return state;
        default:
            return state;
    }
}

const issuesReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_PROJECT_ISSUES:
            let { issues } = action;
            state = Object.assign({}, { issues });
            return state;
        case LOG_ISSUE_TIME:
            state = Object.assign({}, { issues: action.issues });
            return state;
        case GET_PROJECT_ISSUES_ERROR:
            state = Object.assign({}, { errorMessage: action.errorMessage });
            return state;
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    authReducer,
    projectsReducer,
    issuesReducer,
})

export default rootReducer;