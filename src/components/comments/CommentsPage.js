import React from "react";
import Select from 'react-select';
import { getProjects, addComment } from '../../actions';
import { connect } from 'react-redux';
import { Button, Form } from 'react-bootstrap';
import { Notification } from '../Notification';


class CommentsPage extends React.Component {

    componentWillMount() {
        if (!this.props.projects) {
            this.props.getProjects();
        }
    }

    state = {
        selectedOption: null,
        comment: '',
        showNotif: false,
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
    };

    handleComment = event => {
        this.setState({ comment: event.target.value });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const { selectedOption, comment } = this.state;
        this.addComment(comment, selectedOption)
    }

    addComment(comment, selectedOption) {
        let { projects } = this.props;
        const searchId = selectedOption.id;

        projects = projects.map((project) => {
            if (project.id === searchId) {
                project.comment = comment;
            }
            return project;
        });

        this.props.addComment(projects, searchId, comment);
        this.setTimersToShowNotif();
    }

    setTimersToShowNotif() {
        setTimeout(() => {
            this.setState({
                showNotif: true,
            })
        }, 500)

        setTimeout(() => {
            this.setState({
                showNotif: false,
                comment: '',
            })
        }, 3000)
    }


    render() {
        const { selectedOption, comment } = this.state;
        let { projects } = this.props;

        const success = "Comment successfully added";
        const notifType = 'SUCCESS';

        const options = projects ? this.getOptions(projects) : [];

        return (
            <div>
                <Select
                    value={selectedOption}
                    onChange={this.handleChange}
                    options={options}
                    placeholder="Project name"
                />

                <div className="mt-4">
                    <Form>
                        <Form.Group controlId="formComment">
                            <Form.Label>Comment</Form.Label>
                            <Form.Control
                                value={comment}
                                onChange={this.handleComment}
                                type="text"
                                placeholder="" />
                        </Form.Group>
                        <Button
                            onClick={this.handleSubmit}
                            variant="primary"
                            className="mr-2"
                            type="submit"
                        >
                            Add comment
                        </Button>
                    </Form>
                </div>
                {this.state.showNotif &&
                    <div className="row justify-content-center m-2">
                        <Notification
                            text={success}
                            type={notifType} />
                    </div>}
            </div>
        )
    }
};

function mapStateToProps(state) {
    const { projects } = state.projectsReducer;

    return { projects }
}

export default connect(
    mapStateToProps,
    { getProjects, addComment }
)(CommentsPage);