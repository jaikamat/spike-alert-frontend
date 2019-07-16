import React, { createRef } from 'react';
import axios from 'axios';
import SearchBar from './SearchBar';
import CardList from './CardList';
import { Grid, Container, Sticky, Ref, Menu } from 'semantic-ui-react';

class Search extends React.Component {
    state = { cards: [], autocomplete: [] };
    contextRef = createRef();

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
                <div ref={this.contextRef}>
                    <Sticky context={this.contextRef} offset={50}>
                        <Menu>
                            <Menu.Item>
                                <SearchBar
                                    userSearch={this.onSearchSubmit}
                                    autocomplete={this.state.autocomplete}
                                />
                            </Menu.Item>
                        </Menu>
                    </Sticky>
                    {cards}
                </div>
            </Container>
        );
    }
}

export default Search;
