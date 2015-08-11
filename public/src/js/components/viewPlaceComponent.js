import $ from 'jQuery';
import React from 'react';
import Router from 'react-router';  
import { DefaultRoute, Link, Route, RouteHandler } from 'react-router';
import PlaceViewService from '../services/placeViewService';

export default class ViewPlace extends React.Component {

    constructor(props, context) {
        super(props);
        this.context = context;
        this.render = this.render.bind(this);
        this.getPlace = this.getPlace.bind(this);
        this.deletePlace = this.deletePlace.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleBackToAllPlaces = this.handleBackToAllPlaces.bind(this);
        this.redirectToAllPlaces = this.redirectToAllPlacesView.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);

        this.state = {
            place: {
                _id: 'somethingForNow'
            }
        };    
    }

    componentDidMount() {
        var _this = this;
        this.getPlace(this.context.router.getCurrentParams().placeId, function (place) {
            _this.setState({place: place});
        });
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

    deletePlace(placeId, callback) {
        $.ajax({
            method: 'DELETE',
            url: 'api/places/' + placeId,
            success: function() {
                callback();
            }.bind(this),
            error: function(xhr, status, err) {
                console.error('errrrrrrrrrr');
            }.bind(this)
        });        
    }

    handleDelete() {
        var placeId = this.state.place._id;
        this.deletePlace(placeId, () => {
            var places = this.props.places;

            var placeViewService = new PlaceViewService();
            placeViewService.remove(places, placeId);

            this.setState({
                places: places
            });

            console.log('deleted');
            this.redirectToAllPlacesView();
        });

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

                        {/*<p>Categories: 
                            <span class="ui-select-match-item btn btn-default btn-xs" 
                            data-ng-repeat="category in place.categories track by $index"

                            style="margin-right: 5px;">
                                category.title
                            </span>
                        </p>*/}

                        <br/>
                        <br/>
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