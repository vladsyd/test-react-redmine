export function setUserData(actionData) {

    const { userData, password } = actionData;
    const { api_key } = userData.user;

    localStorage.setItem('userData', JSON.stringify(userData));
    localStorage.setItem('password', password);
    localStorage.setItem('apiKey', api_key);
}