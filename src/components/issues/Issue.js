import React from "react";
import { Card, Accordion, Button, InputGroup, FormControl } from 'react-bootstrap';

import { connect } from 'react-redux';

import { logIssueTime } from '../../actions';

export class Issue extends React.Component {

    state = {
        hours: '',
        minutes: '',
    }

    logTime() {

        if (!this.controlTimeForm()) {
            return;
        }

        let { issues } = this.props;
        const searchId = this.props.issue.id;
        const { hours, minutes } = this.state;

        this.setState({ 
            hours: '',
            minutes: ''
        });

        this.props.logIssueTime(issues, searchId, hours, minutes);
    }

    getLoggedTime(issue) {
        let hours = Math.floor(issue.logTime) + 'h ';
        let minutes = Math.round( (issue.logTime % 1) * 60 ) + 'm';

        return  hours + minutes;
    }

    hoursChange = (event) => {
        let { value } = event.target;
        value += ""; //convert to string

        // regular for positive integer
        if (/^\+?(0|[1-9]\d*)$/.test(value) || value === "") {
            this.setState({ hours: value });
        }
    }

    minutesChange = (event) => {
        let { value } = event.target;
        value += ""; //convert to string

        // regular for positive integer
        if ((/^\+?(0|[1-9]\d*)$/.test(value) && +value < 60) || value === "") {
            this.setState({ minutes: value });
        }
    }

    controlTimeForm() {
        return this.state.hours || this.state.minutes;
    }

    render() {
        const { issue } = this.props;
        const { hours, minutes } = this.state;

        return (
            <Card>
                <Card.Header>
                    <Accordion.Toggle
                        as={Button}
                        variant="link"
                        eventKey={this.props.issue.id}
                        className="w-100 text-decoration-none"
                    >

                        <div className="d-flex justify-content-between">
                            <span>{issue.subject}</span>
                            <span className="bg-info text-white p-1 rounded">{issue.tracker.name}</span>
                        </div>
                    </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey={this.props.issue.id}>
                    <Card.Body className="text-center d-flex justify-content-start align-items-center">
                        <InputGroup style={{ flex: 2 }}>
                            <InputGroup.Prepend>
                                <InputGroup.Text>
                                    Hours and minutes
                                </InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl value={hours} onChange={this.hoursChange} placeholder="Hours" />
                            <FormControl value={minutes} onChange={this.minutesChange} placeholder="minutes" />
                        </InputGroup>
                        <Button onClick={() => this.logTime()} className="ml-2" style={{ flex: 1 }}>Log Time</Button>
                        <span className="ml-2" style={{ flex: 1 }}>
                            Spent: {this.getLoggedTime(issue)}
                        </span>
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        );
    }
};

function mapStateToProps(state, ownProps) {
    const { issues } = ownProps;

    return { issues }
}

export default connect(
    mapStateToProps,
    { logIssueTime }
)(Issue);