import React from 'react';
import axios from 'axios';
import { Container, Menu, Table, Icon } from 'semantic-ui-react';

export default class HighLow extends React.Component {
    state = {
        activeItem: 'nonfoil',
        foilWinners: [],
        foilLosers: [],
        nonfoilWinners: [],
        nonfoilLosers: []
    };

    handleItemClick = (evt, { name }) => this.setState({ activeItem: name });

    async componentDidMount() {
        const { data } = await axios.get(`http://localhost:1337/search/highlow`);
        this.setState({
            foilWinners: data.foil.winners,
            foilLosers: data.foil.losers,
            nonfoilWinners: data.nonfoil.winners,
            nonfoilLosers: data.nonfoil.losers
        });
    }

    render() {
        const { activeItem, foilWinners, foilLosers, nonfoilWinners, nonfoilLosers } = this.state;

        let currWinners, currLosers;

        const createTable = (cards, foilStatus) => {
            const foiling = foilStatus === 'foil' ? 'price2' : 'price1';

            return cards.map(card => {
                // Create pos/neg arrows
                let cellStatus;
                if (card.priceTrends.two_day[foiling] > 0) {
                    cellStatus = <Icon name="arrow up" color="green" />;
                } else {
                    cellStatus = <Icon name="arrow down" color="red" />;
                }

                return (
                    <Table.Row key={card._id}>
                        <Table.Cell collapsing>
                            <i className={`${card.setIcon} ss-fw`} /> {card.setName}
                        </Table.Cell>
                        <Table.Cell>{card.name}</Table.Cell>
                        <Table.Cell>${card.currentPrice[foiling]}</Table.Cell>
                        <Table.Cell>
                            {cellStatus}
                            {card.priceTrends.two_day[foiling]}%
                        </Table.Cell>
                    </Table.Row>
                );
            });
        };

        if (activeItem === 'foil') {
            currWinners = createTable(foilWinners, activeItem);
            currLosers = createTable(foilLosers, activeItem);
        }

        if (activeItem === 'nonfoil') {
            currWinners = createTable(nonfoilWinners, activeItem);
            currLosers = createTable(nonfoilLosers, activeItem);
        }

        return (
            <Container>
                <Menu tabular>
                    <Menu.Item
                        name="nonfoil"
                        active={activeItem === 'nonfoil'}
                        onClick={this.handleItemClick}
                    />
                    <Menu.Item
                        name="foil"
                        active={activeItem === 'foil'}
                        onClick={this.handleItemClick}
                    />
                </Menu>
                <Table celled striped>
                    <Table.Body>{currWinners}</Table.Body>
                    <Table.Body>{currLosers}</Table.Body>
                </Table>
            </Container>
        );
    }
}
