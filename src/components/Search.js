import React, { createRef } from 'react';
import axios from 'axios';
import SearchBar from './SearchBar';
import CardList from './CardList';
import SortBy from './SortBy';
import { Grid, Container, Sticky, Menu, Button } from 'semantic-ui-react';
import _ from 'lodash';
import { cardList__marginTop } from './Search.module.css';

class Search extends React.Component {
    state = { cards: [], autocomplete: [], activeSortItem: '' };
    contextRef = createRef();

    onSearchSubmit = async arg => {
        const res = await axios.get('http://localhost:1337/search', {
            params: { name: arg }
        });
        this.setState({ cards: res.data });
    };

    sortCardsPrice = () => {
        const cards = _.sortBy(this.state.cards, card => {
            return card.priceHistory[card.priceHistory.length - 1].price1;
        }).reverse();
        this.setState({ cards: cards });
    };

    sortCardsPercent = () => {
        const cards = _.sortBy(this.state.cards, card => {
            return card.priceTrends.all_time.price1;
        }).reverse();
        this.setState({ cards: cards });
    };

    async componentDidMount() {
        await axios
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
                <div className={cardList__marginTop}>
                    <Grid stackable={true}>
                        <CardList cards={this.state.cards} />
                    </Grid>
                </div>
            );
        }

        return (
            <Container>
                <div ref={this.contextRef}>
                    <Sticky context={this.contextRef} offset={40}>
                        <Menu>
                            <Menu.Item>
                                <SearchBar
                                    userSearch={this.onSearchSubmit}
                                    autocomplete={this.state.autocomplete}
                                />
                            </Menu.Item>
                            <SortBy
                                sortCardsPrice={this.sortCardsPrice}
                                sortCardsPercent={this.sortCardsPercent}
                            />
                        </Menu>
                    </Sticky>
                    {cards}
                </div>
            </Container>
        );
    }
}

export default Search;
