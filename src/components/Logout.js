import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

class Logout extends React.Component {
    state = { redirectToLogin: false };

    logout = async () => {
        await axios
            .get('http://localhost:1337/auth/logout')
            .then(res => {
                this.setState({ redirectToLogin: true });
                window.localStorage.clear();
                this.props.checkAuth();
            })
            .catch(err => console.log(err));
    };

    render() {
        if (this.state.redirectToLogin) {
            return <Redirect to="/login" />;
        }
        return <button onClick={this.logout}>Click to log out</button>;
    }
}

export default Logout;
