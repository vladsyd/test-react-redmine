export function getBasicRequestHeaders() {
    
    let headers = new Headers();

    let apiKey = localStorage.getItem('apiKey');
    headers.append('X-Redmine-API-Key', apiKey);

    return headers;
}

