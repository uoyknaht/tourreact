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
        this.componentWillMount = this.componentWillMount.bind(this);
        this.componentWillUnount = this.componentWillUnmount.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
        this._onChange = this._onChange.bind(this);

        this.state = {
            place: {
                _id: 'somethingForNow'
            }
        };    
    }

    componentWillMount() {
        PlaceStore.addChangeListener(this._onChange);
    }

    componentWillUnmount() {
        PlaceStore.removeChangeListener(this._onChange);
    }

    componentDidMount() {
        var placeId = this.context.router.getCurrentParams().placeId;

        PlaceActions.getPlace(placeId);
    }

    componentWillReceiveProps(newProps) {
        var placeId = newProps.params.placeId;

        if (placeId === this.state.place._id) {
            return;
        }

        PlaceActions.getPlace(placeId);
    }

    _onChange() {
        var placeId = this.context.router.getCurrentParams().placeId;
        var place = PlaceStore.getPlace(placeId);

        this.setState({ place: place });

        // this.updateMarkersParamsFromPlaces(places, {
        //     click: function (e, place) {
        //         _this.context.router.transitionTo('viewPlace', { placeId: place._id });
        //     } 
        // });
    }    

 

    handleDelete() {
        var placeId = this.state.place._id;

        // this.props.onPlaceDelete(placeId, () => {
        //     this.redirectToAllPlacesView();
        // });

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

        var place = this.state.place;

        return (
            <div className="dynamic-menu" key={place}>
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