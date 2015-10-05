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
        this.componentDidMount = this.componentDidMount.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleSetAdressFromCoordinates = this.handleSetAdressFromCoordinates.bind(this);
        this.render = this.render.bind(this);

        this.state = {
            place: {},
            markersParams: [] 
        };   

        this.isEditAction = false;  
    }

    componentDidMount() {
        // var _this = this;
        // var placeId = this.context.router.getCurrentParams().placeId;

        // if (!placeId) {
        //     return;
        // }

        // this.isEditAction = true;

        // this.getPlace(placeId, function (place) {
        //     _this.setState({
        //         place: place,
        //     });

        //     React.findDOMNode(_this.refs.title).value = place.title;
        //     React.findDOMNode(_this.refs.address).value = place.address;
        //     React.findDOMNode(_this.refs.latitude).value = place.latitude;
        //     React.findDOMNode(_this.refs.longitude).value = place.longitude;


        //     _this.props.updateMarkersParamsFromPlaces([place], {
        //         dragend: function (e, place) {
        //             React.findDOMNode(_this.refs.latitude).value = e.latLng.lat();
        //             React.findDOMNode(_this.refs.longitude).value = e.latLng.lng();
        //             place.latitude = e.latLng.lat();
        //             place.longitude = e.latLng.lng();

        //             var markersParams = _this.state.markersParams;
        //             markersParams[0].position.lat = e.latLng.lat();
        //             markersParams[0].position.lng = e.latLng.lng();

        //             _this.setState({
        //                 place: place,
        //                 markersParams: markersParams
        //             });
        //         }                
        //     })
        // });            
        


    }    

    handleChange(e, a) {
        console.log(e.target.value);
        console.log(a);
        //this.setState({ place: e.target.place});
    }
 
    getPlace(placeId, callback) {
        $.ajax({
            method: 'GET',
            url: 'api/places/' + placeId,
            success: function(place) {
                callback(place);
            }.bind(this),
            error: function(xhr, status, err) {
                console.error('errrrrrrrrrr');
            }.bind(this)
        });
    }   

    // savePlace(data, callback) {

    //     PlaceActions.savePlace()

    //     var savePlaceUrl = 'api/places';
    //     var methodType = 'POST';
        
    //     if (this.isEditAction) {
    //         savePlaceUrl = savePlaceUrl + '/' + this.state.place._id;
    //         methodType = 'PUT';
    //     }

    //     $.ajax({
    //         method: methodType,
    //         data: data,
    //         url: savePlaceUrl,
    //         success: function(addedOrEditedPlace) {
    //             callback(addedOrEditedPlace);
    //         }.bind(this),
    //         error: function(xhr, status, err) {
    //             console.error(savePlaceUrl, status, err.toString());
    //         }.bind(this)
    //     });        
    // }  

    handleSetAdressFromCoordinates(e) {
        e.preventDefault();

        var place = this.state.place;
        var latlng = new google.maps.LatLng(place.latitude, place.longitude);
        var geocoder = new google.maps.Geocoder();

        geocoder.geocode({
            'latLng': latlng
            }, function (results, status) {
                if (status === google.maps.GeocoderStatus.OK) {
                    if (results && results[0]) {
                        var address = results[0].formatted_address;
                        place.address = address;
                        this.setState({place: place});
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

        if (this.isEditAction) {
            data._id = this.state.place._id;
        }

        PlaceActions.savePlace(data);

        // this.savePlace(data, function (place) {
        //     _this.props.onPlaceSubmit(data, _this.isEditAction);

        //     if (!this.isEditAction) {
        //         React.findDOMNode(this.refs.title).value = '';
        //         React.findDOMNode(this.refs.address).value = '';
        //         React.findDOMNode(this.refs.latitude).value = '';
        //         React.findDOMNode(this.refs.longitude).value = '';

        //         this.context.router.transitionTo('viewPlace', { placeId: place._id });
        //     }

        // }.bind(this));

    }

    handleCancel(e) {
        e.preventDefault();
        this.context.router.transitionTo('allPlaces');
    }  

    render() {

        var title = this.isEditAction ?'Edit place' : 'Add new place';
        var place = this.state.place;

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
                            <div class="col s12">
{/*                                    <GoogleMap mapCenterLat={place.latitude} 
                                                mapCenterLng={place.longitude} 
                                                zoom={8} 
                                                map={this.props.map} 
                                                markersParams={this.state.markersParams}>

                                    </GoogleMap>
*/}
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