import React from 'react';
import { Button, Container } from 'semantic-ui-react';

const UserListButton = props => {
    // We check localstorage for user session committed in Login
    const storage = window.localStorage;
    const loggedIn = storage.getItem('username');
    const { cardId, userList, removeCardFromList, addCardToList } = props;
    const userId = storage.getItem('userId');
    const inUserList = userList.includes(cardId);

    // Determine if the card is in the user list; if so, define the add/remove fn
    const buttonMethod = inUserList ? removeCardFromList : addCardToList;

    return (
        <Container>
            {loggedIn && (
                <Button floated="right" onClick={() => buttonMethod(userId, cardId)}>
                    {inUserList ? 'Remove from my list' : 'Add to my list'}
                </Button>
            )}
        </Container>
    );
};

export default UserListButton;
