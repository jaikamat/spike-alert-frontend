import React from 'react';
import _ from 'lodash';
import { Search } from 'semantic-ui-react';
import './SearchBar.module.css';

const initialState = { value: '', results: [], isLoading: false };

class SearchBar extends React.Component {
    state = initialState;

    onFormSubmit = event => {
        event.preventDefault();
        this.props.userSearch(this.state.value);
    };

    handleResultSelect = (e, { result }) => {
        // Apparetly setState is async, so we search after
        // the results have been posted with 2nd func arg
        this.setState({ value: result.title }, () => {
            this.props.userSearch(this.state.value);
        });
    };

    handleSearchChange = (e, { value }) => {
        this.setState({ isLoading: true, value: value });

        setTimeout(() => {
            if (this.state.value.length < 1) return this.setState(initialState);

            const re = new RegExp(_.escapeRegExp(this.state.value), 'i');
            const isMatch = result => re.test(result.title);

            this.setState({
                isLoading: false,
                results: _.filter(this.props.autocomplete, isMatch)
            });
        }, 500);
    };

    render() {
        const { isLoading, results, value } = this.state;

        return (
            <Search
                className="transparent"
                size="tiny"
                placeholder="Search for a card..."
                className="searchmod"
                input={{ className: 'transparent', iconPosition: 'left' }}
                loading={isLoading}
                results={results}
                value={value}
                onResultSelect={this.handleResultSelect}
                onSearchChange={_.debounce(this.handleSearchChange, 500, { leading: true })}
            />
        );
    }
}

export default SearchBar;
