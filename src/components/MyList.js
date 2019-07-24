import React from 'react';
import axios from 'axios';
import CardList from './CardList';
import ListInfo from './ListInfo';
import { Grid, Container } from 'semantic-ui-react';

const storage = window.localStorage;

class MyList extends React.Component {
    state = { cards: [] };

    componentDidMount() {
        axios
            .get(`http://localhost:1337/user/${storage.getItem('userId')}/list/`, {
                withCredentials: true
            })
            .then(res => {
                this.setState({ cards: res.data });
            })
            .catch(err => console.log(err));
    }

    updateCardView = cards => {
        this.setState({ cards: cards });
    };

    render() {
        const haveCards = this.state.cards.length > 0;

        return (
            haveCards && (
                <Container>
                    <ListInfo cards={this.state.cards} />
                    <Grid stackable={true}>
                        <CardList cards={this.state.cards} updateCardView={this.updateCardView} />
                    </Grid>
                </Container>
            )
        );
    }
}

export default MyList;
