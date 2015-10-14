import $ from 'jQuery';
import React from 'react';
import Router from 'react-router';  
import { DefaultRoute, Link, Route, RouteHandler } from 'react-router';

import GoogleMap from './googleMapComponent/googleMapComponent';
import PlaceActions from '../actions/placeActions';

export default class PlaceForm extends React.Component {

    constructor(props, context) {
        super(props);
        this.context = context;
        this._updateForm = this._updateForm.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleSetAdressFromCoordinates = this.handleSetAdressFromCoordinates.bind(this);
        this.render = this.render.bind(this);
    }

    componentDidMount() {
        this._updateForm(this.props.place);
    }

    componentWillReceiveProps(newProps) {
        this._updateForm(newProps.place);
    }    

    _updateForm(place) {
        if (place) {
            React.findDOMNode(this.refs.title).value = place.title;
            React.findDOMNode(this.refs.address).value = place.address;
            React.findDOMNode(this.refs.latitude).value = place.latitude;
            React.findDOMNode(this.refs.longitude).value = place.longitude;
        } else {
            React.findDOMNode(this.refs.title).value = '';
            React.findDOMNode(this.refs.address).value = '';
            React.findDOMNode(this.refs.latitude).value = '';
            React.findDOMNode(this.refs.longitude).value = '';     
        }
    }    



    handleChange(e, a) {
        console.log(e.target.value);
        console.log(a);
        //this.setState({ place: e.target.place});
    }
 
 

    handleSetAdressFromCoordinates(e) {
        e.preventDefault();

        var latlng = new google.maps.LatLng(place.latitude, place.longitude);
        var geocoder = new google.maps.Geocoder();

        geocoder.geocode({
            'latLng': latlng
            }, function (results, status) {
                if (status === google.maps.GeocoderStatus.OK) {
                    if (results && results[0]) {
                        var address = results[0].formatted_address;
                        // place.address = address;
                        // this.setState({place: place});
                        React.findDOMNode(this.refs.address).value = address;
                    } else {
                        console.log('No results found');
                    }
                } else {
                     console.log('Geocoder failed due to: ' + status);
                }
            }.bind(this));
    }

    handleSubmit(e) {
        e.preventDefault();

        var _this = this;

        var data = {
            title: React.findDOMNode(this.refs.title).value.trim(),
            address: React.findDOMNode(this.refs.address).value.trim(),
            latitude: React.findDOMNode(this.refs.latitude).value.trim(),
            longitude: React.findDOMNode(this.refs.longitude).value.trim(),
            categories: []
        }

        if (this.props.place) {
            data._id = this.props.place._id;
        }

        PlaceActions.savePlace(data);


        if (!this.props.place) {

            // TODO: redirect back to place form if saving of place in server fails
            this.context.router.transitionTo('viewPlace', { placeId: this.props.place._id });

        } else {
            alert('place updated');
            // React.findDOMNode(this.refs.title).value = '';
            // React.findDOMNode(this.refs.address).value = '';
            // React.findDOMNode(this.refs.latitude).value = '';
            // React.findDOMNode(this.refs.longitude).value = '';            
        }

        // this.savePlace(data, function (place) {
        //     _this.props.onPlaceSubmit(data, _this._isEditAction);

        //     if (!this._isEditAction) {
        //         React.findDOMNode(this.refs.title).value = '';
        //         React.findDOMNode(this.refs.address).value = '';
        //         React.findDOMNode(this.refs.latitude).value = '';
        //         React.findDOMNode(this.refs.longitude).value = '';

        //         
        //     }

        // }.bind(this));

    }

    handleCancel(e) {
        e.preventDefault();
        this.context.router.transitionTo('allPlaces');
    }  

    render() {

        var title = this.props.place ?'Edit place' : 'Add new place';

        return (
            <div className="dynamic-menu">
                <div className="row">
                    <form className="placeForm" class="col s12">
                        <h2>{title}</h2>
                        <div className="row">
                            <div class="input-field col s12">
                                <input type="text"  
                                ref="title" 
                                id="place-form-title" 
                                placeholder="Title" 
                                className="validate" />
                                <label for="place-form-title">Title</label>
                            </div>
                        </div>
                        <div className="row">
                            <div class="input-field col s12">
                                <input type="text" ref="address" />
                                <label>Address</label>
                            </div>
                            <div class="col s12">
                                <button type="button" onClick={this.handleSetAdressFromCoordinates}>Set address from coordinates</button>
                            </div>
                        </div>
                        <div className="row">
                            <div class="input-field col s12">
                                <input type="text"  ref="latitude" />
                                <label>Latitude</label>
                            </div>
                        </div>
                        <div className="row">
                            <div class="input-field col s12">
                                <input type="text"  ref="longitude" />
                                <label>Longitude</label>
                            </div>
                        </div>



                        <br/>
                        <br/>
                        <br/>
                        <div className="row">
                            <div class="input-field col s12">
                                <input type="submit" className="waves-effect waves-light btn" value="Save" onClick={this.handleSubmit} />
                                <button type="button" className="waves-effect waves-light btn" onClick={this.handleCancel}>Cancel</button>
                            </div>
                        </div>

                    </form>
                </div>
            </div>
        );
    }

}

// https://github.com/rackt/react-router/issues/975
PlaceForm.contextTypes = {
  router: React.PropTypes.func.isRequired
};