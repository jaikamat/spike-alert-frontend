import React from 'react';
import axios from 'axios';
import SearchBar from './SearchBar';
import CardList from './CardList';
import { Grid, Container } from 'semantic-ui-react';

class Search extends React.Component {
    state = { cards: [], autocomplete: [] };

    onSearchSubmit = async arg => {
        const res = await axios.get('http://localhost:1337/search', {
            params: { name: arg }
        });
        this.setState({ cards: res.data });
    };

    componentDidMount() {
        axios
            .get('http://localhost:1337/search/autocomplete')
            .then(res => {
                this.setState({ autocomplete: res.data });
            })
            .catch(err => console.log(err));
    }

    render() {
        let cards;

        if (this.state.cards.length > 0) {
            cards = (
                <Grid stackable={true}>
                    <CardList cards={this.state.cards} />
                </Grid>
            );
        }

        return (
            <Container>
                <SearchBar
                    userSearch={this.onSearchSubmit}
                    autocomplete={this.state.autocomplete}
                />
                {cards}
            </Container>
        );
    }
}

export default Search;
