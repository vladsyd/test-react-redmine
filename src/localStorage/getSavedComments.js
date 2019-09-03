export function getSavedComments(projects) {

    let comments = JSON.parse(localStorage.getItem('comments'));

    return projects.map((project) => {
        const { id } = project;

        if (comments && comments[id]) {
            project.comment = comments[id];
        }

        return project;
    });
}