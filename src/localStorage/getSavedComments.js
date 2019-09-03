export function getSavedComments(projects) {

    let comments;

    try {
        comments = JSON.parse(localStorage.getItem('comments'));
    } catch (error) {
        console.log('Error in ' + getSavedComments.name + ' : ' + error);
        return projects;
    }

    return projects.map((project) => {
        const { id } = project;

        if (comments && comments[id]) {
            project.comment = comments[id];
        }

        return project;
    });
}