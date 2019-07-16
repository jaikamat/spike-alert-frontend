import React from 'react';
import axios from 'axios';
import { Form, Button, Segment, Container, Label, Message } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';

const initialState = {
    email: '',
    password: '',
    password2: '',
    emailError: false,
    passwordLengthError: false,
    passwordMatchError: false,
    serverError: false,
    redirectToHome: false
};

class Signup extends React.Component {
    state = initialState;

    handleChange = e => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };

    // Return new state from this validation function
    validateField(name, value) {
        switch (name) {
            case 'email':
                const re = new RegExp(/\S+@\S+/);
                const emailValid = re.test(String(value).toLowerCase());
                this.setState({ emailError: !emailValid });
                break;
            case 'password':
                const passwordValid = value.length > 5;
                this.setState({ passwordLengthError: !passwordValid });
                break;
            case 'password2':
                const passwordMatchValid = this.state.password === value;
                this.setState({ passwordMatchError: !passwordMatchValid });
                break;
            default:
        }
    }

    handleBlur = e => {
        const { name, value } = e.target;
        this.validateField(name, value);
    };

    handleSubmit = () => {
        const {
            email,
            password,
            password2,
            emailError,
            passwordLengthError,
            passwordMatchError
        } = this.state;
        if (emailError || passwordLengthError || passwordMatchError) return;

        this.setState({ loading: true });

        axios
            .post('http://localhost:1337/auth/signup', {
                email: email,
                password: password,
                password2: password2
            })
            .then(res => {
                this.setState({
                    redirectToHome: true,
                    userCreated: true,
                    loading: false
                });
                window.localStorage.setItem('username', res.data.email);
                window.localStorage.setItem('userId', res.data._id);
                this.props.checkAuth();
            })
            .catch(err => {
                let msg;

                if (err.response && err.response.data.code === 11000) {
                    msg = 'Your email is taken, please enter a new one';
                } else msg = err.response.data;

                this.setState({
                    loading: false,
                    serverError: true,
                    errorMsg: msg
                });
            });
    };

    render() {
        const {
            email,
            password,
            password2,
            emailError,
            passwordLengthError,
            passwordMatchError
        } = this.state;

        if (this.state.redirectToHome) {
            return <Redirect to="/" />;
        }

        return (
            <Container>
                <Segment>
                    <Form
                        onSubmit={this.handleSubmit}
                        success={this.state.userCreated}
                        error={this.state.serverError}
                        loading={this.state.loading}
                    >
                        <Message error header="Error" content={this.state.errorMsg} />
                        <Form.Field>
                            <label>Email</label>
                            <input
                                placeholder="Email"
                                name="email"
                                onChange={this.handleChange}
                                onBlur={this.handleBlur}
                                value={email}
                            />
                            {emailError && (
                                <Label basic color="red" pointing>
                                    Please enter a valid email address
                                </Label>
                            )}
                        </Form.Field>
                        <Form.Field>
                            <label>Password</label>
                            <input
                                placeholder="Password"
                                name="password"
                                type="password"
                                onChange={this.handleChange}
                                onBlur={this.handleBlur}
                                value={password}
                            />
                            {passwordLengthError && (
                                <Label basic color="red" pointing>
                                    Your password should be at least 6 characters
                                </Label>
                            )}
                        </Form.Field>
                        <Form.Field>
                            <label>Confirm password</label>
                            <input
                                placeholder="Re-enter password"
                                name="password2"
                                type="password"
                                onChange={this.handleChange}
                                onBlur={this.handleBlur}
                                value={password2}
                            />
                            {passwordMatchError && (
                                <Label basic color="red" pointing>
                                    Your passwords should match
                                </Label>
                            )}
                        </Form.Field>
                        <Message
                            success
                            header="Signup complete"
                            content="Navigate to Login and log in now!"
                        />
                        <Button type="submit">Create your account</Button>
                    </Form>
                </Segment>
            </Container>
        );
    }
}

export default Signup;
