import React from 'react';
import PriceGraph from './PriceGraph';
import CardImage from './CardImage/CardImage';
import UserListButton from './UserListButton';
import { Segment, Grid, Statistic, Accordion } from 'semantic-ui-react';

class CardDisplay extends React.Component {
    state = { collapsed: true };

    handleClick = (e, el) => this.setState({ collapsed: !this.state.collapsed });

    // This collapses all open accordion components when the user searches
    // while other accordions are open
    componentDidUpdate(prevProps) {
        if (this.props._id !== prevProps._id && !this.state.collapsed) {
            this.setState({ collapsed: true });
        }
    }

    render() {
        const { collapsed } = this.state;
        const { currentPrice, isOnlyFoil } = this.props;
        // Some cards are only foil printings. This checks to make sure.
        const foilStatus = isOnlyFoil ? 'price2' : 'price1';
        const foilPrice = currentPrice.price2 ? currentPrice.price2.toFixed(2) : null;
        let chart;

        // Grabs all-time price data
        const changePrice = this.props.priceTrends.all_time[foilStatus];

        // Check to see if the accordion is active, then render the graph
        if (!collapsed) {
            chart = (
                <PriceGraph
                    id={this.props._id}
                    priceHistory={this.props.priceHistory}
                    isOnlyFoil={this.props.isOnlyFoil}
                />
            );
        }

        return (
            <Segment>
                <Accordion>
                    <Accordion.Title active={!collapsed} index={0} onClick={this.handleClick}>
                        <Grid columns={3}>
                            <Grid.Row>
                                <Grid.Column width={1} only="computer">
                                    <i className={`${this.props.setIcon} ss-3x`} />
                                </Grid.Column>
                                <Grid.Column floated="left">
                                    <div>
                                        <h3>{this.props.name}</h3>
                                    </div>
                                    <div>{this.props.setName}</div>
                                </Grid.Column>
                                <Grid.Column floated="right">
                                    <Statistic size="tiny" floated="right">
                                        <Statistic.Value>
                                            ${currentPrice[foilStatus].toFixed(2)}
                                        </Statistic.Value>
                                        <Statistic.Label>
                                            {changePrice > 0 ? '+' + changePrice : changePrice}%
                                        </Statistic.Label>
                                    </Statistic>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Accordion.Title>
                    <Accordion.Content active={!collapsed}>
                        <Segment>
                            <Grid columns={2} stackable>
                                <Grid.Column width={5} only="computer">
                                    <CardImage
                                        cardName={this.props.name}
                                        setCode={this.props.setCode}
                                    />
                                    {/* <p>Daily Change: {this.props.priceTrends.daily.price1}</p>
                                    <p>Two-Day Change: {this.props.priceTrends.two_day.price1}</p>
                                    <p>
                                        Three-Day Change: {this.props.priceTrends.three_day.price1}
                                    </p>
                                    <p>Weekly Change: {this.props.priceTrends.weekly.price1}</p>
                                    <p>Monthly Change: {this.props.priceTrends.monthly.price1}</p>
                                    <p>All-Time Change: {this.props.priceTrends.all_time.price1}</p>
                                    <p>Foil Price: ${foilPrice}</p>
                                    <p>Foil Multiplier: {this.props.foilMultiplier}</p> */}
                                </Grid.Column>
                                <Grid.Column width={11}>
                                    {chart}
                                    <UserListButton
                                        cardId={this.props._id}
                                        userList={this.props.userList}
                                        addCardToList={this.props.addCardToList}
                                        removeCardFromList={this.props.removeCardFromList}
                                    />
                                </Grid.Column>
                            </Grid>
                        </Segment>
                    </Accordion.Content>
                </Accordion>
            </Segment>
        );
    }
}

export default CardDisplay;
