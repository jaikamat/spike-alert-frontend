import React from 'react';
import { Menu } from 'semantic-ui-react';

const SortBy = props => {
    const { activeSortItem } = props;
    return (
        <Menu.Menu position="right">
            <Menu.Item header>Sort by</Menu.Item>
            <Menu.Item
                name="price"
                active={activeSortItem === 'price'}
                onClick={el => {
                    props.sortCardsPrice();
                    props.handleSort(el, 'price');
                }}
            />
            <Menu.Item
                name="percent"
                active={activeSortItem === 'percent'}
                onClick={el => {
                    props.sortCardsPercent();
                    props.handleSort(el, 'percent');
                }}
            />
        </Menu.Menu>
    );
};

export default SortBy;
