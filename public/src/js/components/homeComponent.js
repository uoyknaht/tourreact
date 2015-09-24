import $ from 'jQuery';
import React from 'react';
import Router from 'react-router';  
import { DefaultRoute, Link, Route, RouteHandler } from 'react-router';
import mui from 'material-ui';
let AppBar = mui.AppBar;
let IconButton = mui.IconButton;
let FlatButton = mui.FlatButton;
let NavigationClose = mui.NavigationClose;
let TextField = mui.TextField;
import injectTapEventPlugin from 'react-tap-event-plugin';
import PlaceViewService from '../services/placeViewService';
import Map from './mapComponent';

import GoogleMap from './googleMapComponent/googleMapComponent';

let ThemeManager = new mui.Styles.ThemeManager();

export default class Home extends React.Component {

    constructor() {
        super();
        this.updateMarkersParamsFromPlaces = this.updateMarkersParamsFromPlaces.bind(this);
        this.handlePlaceSubmit = this.handlePlaceSubmit.bind(this);
        this.handleDeletePlace = this.handleDeletePlace.bind(this);
        this.handleUserInput = this.handleUserInput.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.render = this.render.bind(this);

        this.state = {
            places: [],
            markers: [],
            filterText: '',
            map: {},
            markersParams: [
                {
                    position: {
                        lat: 54,
                        lng: 24
                    },
                    title: 'labas'
                }
            ]
        };

        injectTapEventPlugin();

        // this.themeManager = new mui.Styles.ThemeManager();
        //this.themeManager = new ThemeManager();
    }

    updateMarkersParamsFromPlaces() {
        var places = this.state.places;
        var markersParams = [];

        places.forEach(function (place) {
            markersParams.push({
                position: {
                    lat: place.latitude,
                    lng: place.longitude
                },
                title: 'labas'                
            })
        });

console.log(markersParams);
        this.setState({markersParams: markersParams});
    }

    handlePlaceSubmit(place, isEditAction) {
        var places = this.state.places;

        if (!isEditAction) {
            places.push(place);
        } else {
            places.every(function (_place, index) {
                if (_place._id === place._id) {
                    places[index] = place;
                    return false;
                }

                return true;
            });
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
                this.updateMarkersParamsFromPlaces();
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(getPlacesUrl, status, err.toString());
            }.bind(this)
        });
    }

    getChildContext() {
        return {
            muiTheme: ThemeManager.getCurrentTheme()
            // muiTheme: this.themeManager.getCurrentTheme()
        };
    }

    render() {
        return (
            <div>

                <AppBar
                  title="TourReact"
                  iconElementLeft={<IconButton></IconButton>}
                  iconElementRight={<FlatButton label="Save" />} />

                <div class="header">
                    <Link to="home">Home</Link>
                    <Link to="allPlaces">All places</Link>
                    <Link to="addPlace">Add place</Link>
                </div>

                {/*
                <div className="row">
                    <form className="col s12">
                      <div className="row">
                        <div className="input-field col s6">
                          <i className="material-icons prefix">account_circle</i>
                            <TextField hintText="Hint Text" floatingLabelText="Floating Label Text" />
                        </div>
                      </div>
                    </form>
                </div>
*/}
                 

           
                <div className="row">
                    <div className="col s12 m6">
                        <RouteHandler places={this.state.places} 
                                        onPlaceSubmit={this.handlePlaceSubmit} 
                                        onPlaceDelete={this.handleDeletePlace}
                                        filterText={this.state.filterText} 
                                        onUserInput={this.handleUserInput} />
                    </div>
                    <div class="col s12 m6">


                        <GoogleMap mapCenterLat={54} 
                                    mapCenterLng={24} 
                                    zoom={8} 
                                    map={this.map} 
                                    markersParams={this.state.markersParams}>

                        </GoogleMap>   



                    </div>
                </div>
                
            </div>
        );
    }

}

Home.childContextTypes = {
    muiTheme: React.PropTypes.object
};