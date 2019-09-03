export function saveComment(action) {

    const { projectId, comment } = action;
    
    let comments = JSON.parse( localStorage.getItem('comments') );

    if(comments) {
        comments[projectId] = comment;
    }
    else {
        comments = { [projectId]: comment };
    }

    localStorage.setItem('comments', JSON.stringify(comments));
}