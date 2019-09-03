export function setUserData(actionData) {

    let { userData, password } = actionData;
    const { api_key } = userData.user;

    try {
        userData = JSON.stringify(userData);
    } catch(error) {
        console.log('Error in ' + setUserData.name + ' : ' + error);
        userData = '';
    }

    localStorage.setItem('userData', userData);
    localStorage.setItem('password', password);
    localStorage.setItem('apiKey', api_key);
}