import React from "react";
import { Table } from "react-bootstrap";
import { connect } from 'react-redux';
import moment from 'moment';

import { getProjects } from '../../actions/';

class ProjectTable extends React.Component {

    componentWillMount() {
        if (!this.props.projects) {
            this.props.getProjects();
        }
    }

    render() {

        const projects = this.props.projects ? this.props.projects : null;

        return (
            <Table bordered hover striped>
                <thead>
                    <tr>
                        <th scope="col">Project Name</th>
                        <th scope="col">Identifier</th>
                        <th scope="col">Status</th>
                        <th scope="col">Created On</th>
                        <th scope="col">Updated On</th>
                    </tr>
                </thead>
                <tbody>
                    {projects ? projects.map((project) => {
                        return (
                            <React.Fragment key={project.identifier}>
                                <tr>
                                    <td>{project.name}</td>
                                    <td>{project.identifier}</td>
                                    <td>{project.status}</td>
                                    <td>{moment(project.created_on).format("dddd, MMMM Do YYYY, h:mm:ss a")}</td>
                                    <td>{moment(project.updated_on).format("dddd, MMMM Do YYYY, h:mm:ss a")}</td>
                                </tr>
                                <tr>
                                    <th>Comment:</th>
                                    <td colSpan="4">
                                        {project.comment || ''}
                                    </td>
                                </tr>
                            </React.Fragment>
                        )
                    }) : <tr>
                            <td colSpan="5" className="text-center">
                                NO DATA
                            </td>
                        </tr>}
                </tbody>
            </Table>
        );
    }
};

function mapStateToProps(state) {
    const { projects } = state.projectsReducer;

    return { projects }
}

export default connect(
    mapStateToProps,
    { getProjects }
)(ProjectTable);