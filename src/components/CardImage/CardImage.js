import React from 'react';
import axios from 'axios';
import scryfallCodeMap from './scryfallCodeMap';
import { Image } from 'semantic-ui-react';

async function fetchImageUri(cardName, setCode) {
    let sfQuery, scryfallCode, filter;

    // See if the setCode appears in the custom maps. If so, we alter the scryfall query
    const inList = scryfallCodeMap.hasOwnProperty(setCode);

    sfQuery = inList ? scryfallCodeMap[setCode].query : 'set';
    scryfallCode = inList ? scryfallCodeMap[setCode].code : setCode;
    filter = inList ? scryfallCodeMap[setCode].filter : '';

    const fetchCard = await axios.get(
        `https://api.scryfall.com/cards/search?q=${cardName} ${sfQuery}:${scryfallCode} ${filter}`
    );

    // Retrieve the first and only card
    const rawData = fetchCard.data.data[0];

    // Check for flip cards
    if (rawData.card_faces) {
        return rawData.card_faces[0].image_uris.border_crop;
    }
    return rawData.image_uris.border_crop;
}

class CardImage extends React.Component {
    state = { imageLink: '' };

    componentDidMount() {
        const { cardName, setCode } = this.props;

        fetchImageUri(cardName, setCode)
            .then(uri => this.setState({ imageLink: uri }))
            .catch(err => console.log(err));
    }

    // Trigger fetch of new image if component props change
    componentDidUpdate(prevProps) {
        const { cardName, setCode } = this.props;

        if (cardName !== prevProps.cardName && setCode !== prevProps.setCode) {
            fetchImageUri(cardName, setCode)
                .then(uri => this.setState({ imageLink: uri }))
                .catch(err => console.log(err));
        }
    }

    render() {
        return <Image fluid rounded src={this.state.imageLink} />;
    }
}

export default CardImage;
