import $ from 'jQuery';
import React from 'react';
import Router from 'react-router';  
import { DefaultRoute, Link, Route, RouteHandler } from 'react-router';

import GoogleMap from './googleMapComponent/googleMapComponent';
import PlaceActions from '../actions/placeActions';
import PlaceStore from '../stores/placeStore';

export default class ViewPlace extends React.Component {

    constructor(props, context) {
        super(props);
        this.context = context;
        this.render = this.render.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleBackToAllPlaces = this.handleBackToAllPlaces.bind(this);
        this.redirectToAllPlaces = this.redirectToAllPlacesView.bind(this);
        this.shouldComponentUpdate = this.shouldComponentUpdate.bind(this); 
    }

    shouldComponentUpdate(nextProps) {
        // return true;
        if (nextProps.place && (!this.props.place || nextProps.place._id !== this.props.place._id)) {
            return true;
        }

        return false;
    }    

    handleDelete() {
        var placeId = this.props.place._id;
        PlaceActions.deletePlace(placeId);
        this.redirectToAllPlacesView();

        return false;
    }

    handleBackToAllPlaces(e) {
        e.preventDefault();
        this.redirectToAllPlacesView();
    }

    redirectToAllPlacesView() {
        this.context.router.transitionTo('allPlaces');
    }

    render() {

        var place = this.props.place;

        if (!place) {
            return (
                <div></div>
            );
        }

        return (
            <div className="dynamic-menu" key={place._id}>
                <div className="row">
                    <div className="col12">
                        <h2>{place.title}</h2>
                      
                        <Link to="editPlace" params={{placeId: place._id}}>Edit</Link>
                        &nbsp;
                        <a href="#" onClick={this.handleDelete}>Delete</a>

                        <br/>
                        <br/>
                        <p>Address: {place.address}</p>
                        <p>Latitude: {place.latitude}</p>
                        <p>Longitude: {place.longitude}</p>

                        <div className="row">
                            <div class="input-field col s12">
                                <button type="button" className="waves-effect waves-light btn" onClick={this.handleBackToAllPlaces}>Back to all places</button>
                            </div>
                        </div>


                    </div>
                </div>
            </div>
        );
    }

}

// https://github.com/rackt/react-router/issues/975
ViewPlace.contextTypes = {
  router: React.PropTypes.func.isRequired
};