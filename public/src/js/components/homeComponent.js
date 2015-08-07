import $ from 'jQuery';
import React from 'react';
import Router from 'react-router';  
import { DefaultRoute, Link, Route, RouteHandler } from 'react-router';

export default class Home extends React.Component {

    constructor() {
        super();
        this.handlePlaceSubmit = this.handlePlaceSubmit.bind(this);
        this.handleUserInput = this.handleUserInput.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.render = this.render.bind(this);

        this.state = {
            places: [],
            filterText: ''
        };
    }

    handlePlaceSubmit(place, isEditAction) {
        var savePlaceUrl = 'api/places';
        var methodType = isEditAction ? 'PUT' : 'POST';

        $.ajax({
            method: 'POST',
            data: place,
            url: savePlaceUrl,
            success: function(addedPlace) {
                var places = this.state.places;
                places.push(addedPlace);
                this.setState({places: places});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(savePlaceUrl, status, err.toString());
            }.bind(this)
        });
    }

    handleUserInput(filterText) {
        console.log(filterText);
        this.setState({
            filterText: filterText
        });
    }

    componentDidMount() {
        var getPlacesUrl = 'api/places';

        $.ajax({
            url: getPlacesUrl,
            cache: false,
            success: function(data) {
                this.setState({places: data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(getPlacesUrl, status, err.toString());
            }.bind(this)
        });
    }

    render() {
        return (
            <div>
                <div class="header">
                    <Link to="home">Home</Link>
                    <Link to="allPlaces">All places</Link>
                    <Link to="addPlace">Add place</Link>
                </div>
           
                <div className="row">
                    <div className="col s6">
                        <RouteHandler places={this.state.places} 
                                        onPlaceSubmit={this.handlePlaceSubmit} 
                                        filterText={this.state.filterText} 
                                        onUserInput={this.handleUserInput} />
                    </div>
                    <div class="col s6">
                        Map2
                    </div>
                </div>
                
            </div>
        );
    }

}