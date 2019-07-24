import React from 'react';
import { Menu } from 'semantic-ui-react';

const ListInfo = props => {
    const totalValue = props.cards.map(card => card.currentPrice.price1).reduce((a, b) => a + b);

    return (
        <Menu secondary>
            <Menu.Item>
                {props.cards.length} cards, ${totalValue.toFixed(2)} total
            </Menu.Item>
        </Menu>
    );
};

export default ListInfo;
