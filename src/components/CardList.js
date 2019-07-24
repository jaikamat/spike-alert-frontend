import React from 'react';
import axios from 'axios';
import CardDisplay from './CardDisplay';
import { Grid } from 'semantic-ui-react';

function getUserList(userId) {
    return axios.get(`http://localhost:1337/user/${userId}/list/`, { withCredentials: true });
}

class CardList extends React.Component {
    state = { userList: [] };

    // Maintain the user's list for the add/remove button components to track changes
    componentDidMount() {
        const userId = window.localStorage.getItem('userId');

        if (userId) {
            getUserList(userId)
                .then(res => this.setState({ userList: res.data.map(el => el._id) }))
                .catch(err => console.log(err));
        }
    }

    addCardToList = (userId, cardId) => {
        axios
            .post(
                `http://localhost:1337/user/${userId}/list/${cardId}`,
                {},
                { withCredentials: true }
            )
            .then(res => this.setState({ userList: res.data.map(el => el._id) }))
            .catch(err => console.log(err));
    };

    removeCardFromList = (userId, cardId) => {
        const { updateCardView } = this.props;

        axios
            .put(
                `http://localhost:1337/user/${userId}/list/${cardId}`,
                {},
                { withCredentials: true }
            )
            .then(res => {
                this.setState({ userList: res.data.map(el => el._id) });
                if (updateCardView) updateCardView(res.data);
            })
            .catch(err => console.log(err));
    };

    render() {
        const cards = this.props.cards.map((item, key) => {
            return (
                <CardDisplay
                    key={key}
                    id={item._id}
                    name={item.name}
                    setCode={item.setCode}
                    setName={item.setName}
                    price1={item.currentPrice.price1}
                    price2={item.currentPrice.price2}
                    priceTrends={item.priceTrends}
                    priceHistory={item.priceHistory}
                    setIcon={item.setIcon}
                    foilMultiplier={item.foilMultiplier}
                    isOnlyFoil={item.isOnlyFoil}
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
