import React from 'react';
import axios from 'axios';
import scryfallCodeMap from './scryfallCodeMap';
import { Image } from 'semantic-ui-react';
import cardBack from './card_back.jpg';

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

    async componentDidMount() {
        const { cardName, setCode } = this.props;
        try {
            const uri = await fetchImageUri(cardName, setCode);
            this.setState({ imageLink: uri });
        } catch (error) {
            this.setState({ imageLink: cardBack });
        }
    }

    // Trigger fetch of new image if component props change
    async componentDidUpdate(prevProps) {
        const { cardName, setCode } = this.props;

        if (cardName !== prevProps.cardName || setCode !== prevProps.setCode) {
            try {
                const uri = await fetchImageUri(cardName, setCode);
                this.setState({ imageLink: uri });
            } catch (error) {
                this.setState({ imageLink: cardBack });
            }
        }
    }

    render() {
        return <Image fluid rounded src={this.state.imageLink} />;
    }
}

export default CardImage;
