import React from 'react';

import { Tab, Row, Col, Nav } from 'react-bootstrap';
import ProjectTable from './projects/ProjectTable';
import IssuesPage from './issues/IssuesPage';
import CommentsPage from './comments/CommentsPage';

export const App = () => {
    return (
        <Tab.Container id="left-tabs-example" defaultActiveKey="projects">
            <Row className="m-4">
                <Col sm={3}>
                    <Nav variant="pills" className="flex-column">
                        <Nav.Item>
                            <Nav.Link eventKey="projects">Projects</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="issues">Issues</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="comments">Comments</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Col>
                <Col sm={9}>
                    <Tab.Content>
                        <Tab.Pane eventKey="projects">
                            <ProjectTable />
                        </Tab.Pane>
                        <Tab.Pane eventKey="issues">
                            <IssuesPage />
                        </Tab.Pane>
                        <Tab.Pane eventKey="comments">
                            <CommentsPage />
                        </Tab.Pane>
                    </Tab.Content>
                </Col>
            </Row>
        </Tab.Container>
    );
}