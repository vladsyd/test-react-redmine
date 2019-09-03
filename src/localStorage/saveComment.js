export function saveComment(action) {

    const { projectId, comment } = action;

    let comments;

    try {
        comments = JSON.parse(localStorage.getItem('comments'));
    } catch (error) {
        console.log('Error in ' + saveComment.name + ' : ' + error);
    }

    if (comments) {
        comments[projectId] = comment;
    }
    else {
        comments = { [projectId]: comment };
    }

    let result;

    try {
        result = JSON.stringify(comments);
    } catch (error) {
        console.log('Error in ' + saveComment.name + ' : ' + error);
        result = '';
    }
    
    localStorage.setItem('comments', result);
}