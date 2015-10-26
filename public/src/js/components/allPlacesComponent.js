import React from 'react';
import Router from 'react-router';  
import { DefaultRoute, Link, Route, RouteHandler } from 'react-router';
import SearchBar from './searchBar';
// import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class AllPlaces extends React.Component {

    constructor() {
        super();
        this.render = this.render.bind(this);
    }

    render() {
        var places = [];

        this.props.places.forEach(function (place) {
            if (place._id && place.title.indexOf(this.props.filterText) !== -1) {
                places.push(
                    <li className="collection-item avatar"  key={place._id}>
                        <img src="src/img/alert-info.png" className="circle" />
                        
                        <Link className="title" to="viewPlace" params={{placeId: place._id}}>{place.title}</Link>
                    </li>
                );
            }

        }.bind(this)); 

        return (
            <div>
                <SearchBar filterText={this.props.filterText} onUserInput={this.props.onUserInput} />

                {/*<ReactCSSTransitionGroup 
                    transitionName="example" 
                    transitionEnterTimeout={500} 
                    transitionLeaveTimeout={300}
                    component="ul"
                    className="collection">*/}
                <ul className="collection">
                 {places}
                </ul>
                {/*</ReactCSSTransitionGroup>*/}
                <br/>
                <hr/>
                <br/>

                <RouteHandler map={this.props.map} place={this.props.activePlace} />

            </div>
        );
    }

}