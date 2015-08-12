import $ from 'jQuery';
import React from 'react';
import Router from 'react-router';  
import { DefaultRoute, Link, Route, RouteHandler } from 'react-router';
import PlaceViewService from '../services/placeViewService';

export default class Home extends React.Component {

    constructor() {
        super();
        this.handlePlaceSubmit = this.handlePlaceSubmit.bind(this);
        this.handleDeletePlace = this.handleDeletePlace.bind(this);
        this.handleUserInput = this.handleUserInput.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.render = this.render.bind(this);

        this.state = {
            places: [],
            filterText: ''
        };
    }

    handlePlaceSubmit(place, isEditAction) {
        var places = this.state.places;

        if (!isEditAction) {
            places.push(place);
        } else {

            var oldPlace = null;

            places.every(function (_place, index) {
                if (_place._id === place._id) {
                    places[index] = place;
                    console.log(index);
                    return false;
                }
            })
        }

        this.setState({places: places});
    }

    handleDeletePlace(placeId, callback) {

        $.ajax({
            method: 'DELETE',
            url: 'api/places/' + placeId,
            success: function() {

                var places = this.state.places;

                var placeViewService = new PlaceViewService();
                placeViewService.remove(places, placeId);

                this.setState({
                    places: places
                });

                console.log('deleted');
                callback();
            }.bind(this),
            error: function(xhr, status, err) {
                console.error('errrrrrrrrrr');
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
                                        onPlaceDelete={this.handleDeletePlace}
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