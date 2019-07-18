import React from 'react';
import { Menu } from 'semantic-ui-react';

class SortBy extends React.Component {
    state = { activeSortItem: '' };

    handleSort = (evt, { name }) => this.setState({ activeSortItem: name });

    render() {
        return (
            <Menu.Menu position="right">
                <Menu.Item header>Sort by</Menu.Item>
                <Menu.Item
                    name="price"
                    active={this.state.activeSortItem === 'price'}
                    onClick={evt => {
                        this.props.sortCardsPrice();
                        this.handleSort(evt, 'price');
                    }}
                />
                <Menu.Item
                    name="percent"
                    active={this.state.activeSortItem === 'percent'}
                    onClick={evt => {
                        this.props.sortCardsPercent();
                        this.handleSort(evt, 'percent');
                    }}
                />
            </Menu.Menu>
        );
    }
}

export default SortBy;
