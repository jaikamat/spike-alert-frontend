import React from 'react';
import axios from 'axios';
import CardDisplay from './CardDisplay';
import { Grid } from 'semantic-ui-react';

async function getUserList(userId) {
    return await axios.get(`http://localhost:1337/user/${userId}/list/`, { withCredentials: true });
}

class CardList extends React.Component {
    state = { userList: [] };

    // Maintain the user's list for the add/remove button components to track changes
    async componentDidMount() {
        const userId = window.localStorage.getItem('userId');

        if (userId) {
            try {
                const res = await getUserList(userId);
                this.setState({ userList: res.data.map(el => el._id) });
            } catch (error) {
                console.log(error);
            }
        }
    }

    addCardToList = async (userId, cardId) => {
        try {
            const res = await axios.post(
                `http://localhost:1337/user/${userId}/list/${cardId}`,
                {},
                { withCredentials: true }
            );
            this.setState({ userList: res.data.map(el => el._id) });
        } catch (error) {
            console.log(error);
        }
    };

    removeCardFromList = async (userId, cardId) => {
        try {
            const res = await axios.put(
                `http://localhost:1337/user/${userId}/list/${cardId}`,
                {},
                { withCredentials: true }
            );
            this.setState({ userList: res.data.map(el => el._id) });
            this.props.updateCardView(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    render() {
        const cards = this.props.cards.map((item, key) => {
            return (
                <CardDisplay
                    key={key}
                    {...item}
                    userList={this.state.userList}
                    addCardToList={this.addCardToList}
                    removeCardFromList={this.removeCardFromList}
                />
            );
        });

        return <Grid.Column>{cards}</Grid.Column>;
    }
}

export default CardList;
