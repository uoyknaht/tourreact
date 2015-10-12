import $ from 'jQuery';
import React from 'react';
import Router from 'react-router';  
import { DefaultRoute, Link, Route, RouteHandler } from 'react-router';
// import mui from 'material-ui';
// let AppBar = mui.AppBar;
// let IconButton = mui.IconButton;
// let FlatButton = mui.FlatButton;
// let NavigationClose = mui.NavigationClose;
// let TextField = mui.TextField;
import injectTapEventPlugin from 'react-tap-event-plugin';
import PlaceViewService from '../services/placeViewService';
import Map from './mapComponent';

import GoogleMap from './googleMapComponent/googleMapComponent';
import PlaceActions from '../actions/placeActions';
import PlaceStore from '../stores/placeStore';

// let ThemeManager = new mui.Styles.ThemeManager();

export default class Home extends React.Component {

    constructor() {
        super();
        this.updateMarkersParamsFromPlaces = this.updateMarkersParamsFromPlaces.bind(this);
        this.handleDeletePlace = this.handleDeletePlace.bind(this);
        this.handleUserInput = this.handleUserInput.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
        this._updateActivePlace = this._updateActivePlace.bind(this);
        this._onChange = this._onChange.bind(this);
        this.render = this.render.bind(this);

        this._activePlaceId = null;

        this.state = {
            places: [],
            activePlace: null,
            markers: [],
            filterText: '',
            map: {},
            markersParams: [],
            mapCenterLat: 54.940477128917166,
            mapCenterLng: 23.721830736236598
        };

        injectTapEventPlugin();

        // this.themeManager = new mui.Styles.ThemeManager();
        //this.themeManager = new ThemeManager();
    }

    updateMarkersParamsFromPlaces(places, callbacks) {
        var markersParams = [];
        var _this = this;

        places.forEach(function (place) {
            var params = {
                position: {
                    lat: place.latitude,
                    lng: place.longitude
                },
                title: place.title            
            };

            if (callbacks) {
                for (var key in callbacks) {
                    params[key] = function (e) {
                        callbacks[key](e, place);
                    }
                }
            }


            markersParams.push(params);
        });

        this.setState({markersParams: markersParams});

        if (places.length === 1) {
            this.state.mapCenterLat = places[0].latitude;
            this.state.mapCenterLng = places[0].longitude;
        }
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

    componentWillMount() {
        PlaceStore.addChangeListener(this._onChange);
    }

    componentWillUnmount() {
        PlaceStore.removeChangeListener(this._onChange);
    }

    componentDidMount() {

        PlaceActions.getAllPlaces();

        this._updateActivePlace(this.props.params.placeId);

        var map = new google.maps.Map(
            document.getElementById('google-map'), 
            {
                center: new google.maps.LatLng(54, 24),
                zoom: 8
            }
        );

        this.setState({map: map});
    }

    componentWillReceiveProps(newProps) {
        this._updateActivePlace(newProps.params.placeId);
    }    

    _updateActivePlace(routePlaceId) {

        if (!routePlaceId) {
            this._activePlaceId = null;

            this.setState({ 
                activePlace: null
            });

        } else if (routePlaceId && routePlaceId !== this._activePlaceId) {
            this._activePlaceId = routePlaceId;
            PlaceActions.getPlace(routePlaceId);
        } 
    }

    _onChange() {
        var _this = this;
        var places = PlaceStore.getAllPlaces();
        var activePlace = null;

        if (this._activePlaceId) {
            activePlace = PlaceStore.getPlace(this._activePlaceId);
        }

        this.setState({ 
            places: places,
            activePlace: activePlace
        });

        this.updateMarkersParamsFromPlaces(places, {
            click: function (e, place) {
                _this.context.router.transitionTo('viewPlace', { placeId: place._id });
            } 
        });     
    }    

    // getChildContext() {
    //     return {
    //         muiTheme: ThemeManager.getCurrentTheme()
    //         // muiTheme: this.themeManager.getCurrentTheme()
    //     };
    // }

    render() {
        return (
            <div>



                <div class="header">
                    <Link to="home">Home</Link>
                    <Link to="allPlaces">All places</Link>
                    <Link to="addPlace">Add place</Link>
                </div>

                {/*

                <AppBar
                  title="TourReact"
                  iconElementLeft={<IconButton></IconButton>}
                  iconElementRight={<FlatButton label="Save" />} />


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
                                        filterText={this.state.filterText} 
                                        onUserInput={this.handleUserInput}
                                        map={this.state.map}
                                        activePlace={this.state.activePlace} />
                    </div>
                    <div className="col s12 m6">


                        <GoogleMap mapCenterLat={this.state.mapCenterLat} 
                                    mapCenterLng={this.state.mapCenterLng} 
                                    zoom={8} 
                                    map={this.state.map} 
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

Home.contextTypes = {
  router: React.PropTypes.func.isRequired
};