import React from 'react';
import SearchBar from './searchBar';
import PlaceForm from './placeForm';

export default class Sidebar extends React.Component {

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

        // var places = this.props.places.map(function (place) {
        //     return (
        //         <a className="collection-item avatar">
        //             <img src="src/img/alert-info.png" />a
        //             {place.title}
        //         </a>
        //     );
        // });        


        return (
            <div>

                <SearchBar filterText={this.props.filterText} onUserInput={this.props.onUserInput} />


                <ul className="collection">
                    {places}
                </ul>
                <br/>
                <hr/>
                <br/>
                <PlaceForm onPlaceSubmit={this.props.onPlaceSubmit} />
            </div>
        );
    }

}