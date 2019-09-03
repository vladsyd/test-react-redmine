import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import { login, clearAuthError } from "../../actions";
import { Notification } from '../Notification';

class LoginPage extends React.Component {

    componentWillReceiveProps(props) {
        if (props.userData) {
            this.props.history.push("/app");
        }
        else {
            setTimeout(this.props.clearAuthError, 2000);
        }
    }

    handleSubmit = async (fields) => {
        this.props.login(fields);
    }

    render() {
        const { errorMessage } = this.props;
        const notifType = 'ERROR';

        return (
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-6 offset-md-3 bg-light rounded">
                        <Formik
                            initialValues={{
                                username: '',
                                password: '',
                            }}
                            validationSchema={Yup.object().shape({
                                username: Yup.string()
                                    .required('Username is required'),
                                password: Yup.string()
                                    .required('Password is required'),
                            })}
                            onSubmit={fields => {
                                this.handleSubmit(fields);
                            }}
                            render={({ errors, status, touched }) => (
                                <Form>
                                    <div className="form-group">
                                        <label htmlFor="username">Username</label>
                                        <Field name="username" type="text" className={'form-control' + (errors.username && touched.username ? ' is-invalid' : '')} />
                                        <ErrorMessage name="username" component="div" className="invalid-feedback" />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="password">Password</label>
                                        <Field name="password" type="password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                                        <ErrorMessage name="password" component="div" className="invalid-feedback" />
                                    </div>

                                    <div className="form-group">
                                        <button type="submit" className="btn btn-primary mr-2">Login</button>
                                        <button type="reset" className="btn btn-secondary">Reset</button>
                                    </div>
                                </Form>
                            )}
                        />

                    </div>
                </div>
                <div className="row justify-content-center mt-2">
                    {this.props.errorMessage &&
                        <Notification
                            text={errorMessage}
                            type={notifType}
                        />}
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { userData, errorMessage } = state.authReducer;

    return { userData, errorMessage }
}

export default connect(
    mapStateToProps,
    { login, clearAuthError }
)(LoginPage);