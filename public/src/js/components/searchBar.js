import React from 'react';

export default class SearchBar extends React.Component {

    constructor() {
        super();
        this.handleChange = this.handleChange.bind(this);
        this.render = this.render.bind(this);
    }

    handleChange() {
        this.props.onUserInput(this.refs.filterTextInput.getDOMNode().value);
    }

    render() { 
        return (
            <form>
            a
                <input
                    type="text"
                    placeholder="Search..."
                    value={this.props.filterText}
                    ref="filterTextInput"
                    onChange={this.handleChange}
                />
            </form>
        );
    }

}