import React from "react";
import Select from 'react-select';
import { connect } from 'react-redux';
import { getProjects, getProjectIssues } from '../../actions';
import { Accordion } from "react-bootstrap";
import Issue from './Issue';
import { Notification } from '../Notification';

class IssuesPage extends React.Component {

    componentWillMount() {
        if (!this.props.projects) {
            this.props.getProjects();
        }
    }

    state = {
        selectedOption: null,
    };

    getOptions(projects) {
        return projects.map((project) => {
            project.value = project.id;
            project.label = project.name;
            return project;
        })
    }

    handleChange = selectedOption => {
        this.setState({ selectedOption });
        this.props.getProjectIssues(selectedOption.id);
    };

    render() {
        const { selectedOption } = this.state;
        let { projects, issues, errorMessage } = this.props;

        const notifType = 'ERROR';

        const options = projects ? this.getOptions(projects) : [];

        return (
            <div>
                <Select
                    value={selectedOption}
                    onChange={this.handleChange}
                    options={options}
                    placeholder="Project name"
                />
                {this.props.errorMessage &&
                    <div className="row justify-content-center m-2">
                        <Notification
                            text={errorMessage}
                            type={notifType}
                        />
                    </div>
                }
                <Accordion className="mt-4">
                    {issues ? issues.map((issue) => {
                        return (<Issue key={issue.id} issue={issue} issues={issues} />);
                    }) :
                        <p className="text-center bg-light p-4">NO ISSUES</p>}
                </Accordion>
            </div>
        );
    }
};

function mapStateToProps(state) {
    const { projects } = state.projectsReducer;
    const { issues, errorMessage } = state.issuesReducer;

    return { projects, issues, errorMessage }
}

export default connect(
    mapStateToProps,
    { getProjects, getProjectIssues }
)(IssuesPage);