export function login(dispatch, credentials, type, errorType) {

    let { username, password } = credentials;

    let headers = new Headers();

    headers.append('Authorization', 'Basic ' + btoa(username + ':' + password));

    fetch('https://redmine.ekreative.com/users/current.json', { headers })
        .then((resp) => {
            resp.json().then((data) => {
                dispatch({ type, userData: data, password: credentials.password });
            });
        }).catch((error) => {
            console.log(error);
            dispatch({
                type: errorType, errorMessage: 'Incorrect Username or Password'
            });
        });
}



