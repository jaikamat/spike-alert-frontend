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
        try {
            const res = await axios.get('http://localhost:1337/search', {
                params: { name: arg }
            });

            // Sort the cards by nonfoil price initially
            const sortedCards = _.sortBy(res.data, card => {
                return card.currentPrice.price1;
            }).reverse();

            this.setState({ cards: sortedCards, activeSortItem: 'price' });
        } catch (error) {
            console.log(error);
        }
    };

    handleSort = (el, name) => {
        if (!this.state.cards.length) return;
        this.setState({ activeSortItem: name });
    };

    sortCardsPrice = () => {
        const cards = _.sortBy(this.state.cards, card => {
            return card.currentPrice.price1;
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
        try {
            const res = await axios.get('http://localhost:1337/search/autocomplete');
            this.setState({ autocomplete: res.data });
        } catch (error) {
            console.log(error);
        }
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
                                handleSort={this.handleSort}
                                activeSortItem={this.state.activeSortItem}
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
