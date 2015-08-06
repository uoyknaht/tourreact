import React from 'react';
import SearchBar from './searchBar';

export default class AllPlaces extends React.Component {

    constructor() {
        super();
        this.render = this.render.bind(this);
    }

    render() {

        var places = [];

        this.props.places.forEach(function (place) {

            if (place.title.indexOf(this.props.filterText) !== -1) {
                places.push(
                    <li className="collection-item avatar">
                        <img src="src/img/alert-info.png" className="circle" />
                        <a className="title">
                            {place.title}
                        </a>
                    </li>
                );
            }

        }.bind(this)); 

        return (
            <div>
                <SearchBar filterText={this.props.filterText} onUserInput={this.props.onUserInput} />

                <ul className="collection">
                    {places}
                </ul>
                <br/>
                <hr/>
                <br/>
            </div>
        );
    }

}