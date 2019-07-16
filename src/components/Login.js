import React from 'react';
import axios from 'axios';
import { Form, Button, Segment, Container } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';

const initialState = { email: '', password: '', redirectToHome: false };
const storage = window.localStorage;

class Login extends React.Component {
    state = initialState;

    handleChange = e => {
        const name = e.target.name;
        const value = e.target.value;

        this.setState({ [name]: value });
    };

    handleSubmit = () => {
        axios
            .post(
                'http://localhost:1337/auth/login',
                {
                    username: this.state.email,
                    password: this.state.password
                },
                { withCredentials: true }
            )
            .then(res => {
                console.log(res);
                storage.setItem('username', res.data.email);
                storage.setItem('userId', res.data._id);
                this.setState({ redirectToHome: true });
                this.props.checkAuth();
            })
            .catch(err => console.log(err.response.data));
    };

    render() {
        if (this.state.redirectToHome) {
            return <Redirect to="/myList" />;
        }

        return (
            <Container>
                <Segment>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Field>
                            <label>Email</label>
                            <input
                                placeholder="Email"
                                name="email"
                                onChange={this.handleChange}
                                value={this.state.email}
                            />
                        </Form.Field>
                        <Form.Field>
                            <label>Password</label>
                            <input
                                type="password"
                                placeholder="Password"
                                name="password"
                                onChange={this.handleChange}
                                value={this.state.password}
                            />
                        </Form.Field>
                        <Button type="submit">Submit</Button>
                    </Form>
                </Segment>
            </Container>
        );
    }
}

export default Login;
