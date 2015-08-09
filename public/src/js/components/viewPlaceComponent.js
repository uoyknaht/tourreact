import $ from 'jQuery';
import React from 'react';
import Router from 'react-router';  
import { DefaultRoute, Link, Route, RouteHandler } from 'react-router';

export default class ViewPlace extends React.Component {

    constructor(props, context) {
        super(props);
        this.render = this.render.bind(this);
        this.getPlace = this.getPlace.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);

        this.state = {
            place: {
                _id: 'somethingForNow'
            }
        };    

        this.context = context;
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

    render() {

        var place = this.state.place;

        return (
            <div className="dynamic-menu">
                <div className="row">
                    <div className="col12">
                        <h2>{place.title}</h2>
                      
                        <Link to="editPlace" params={{placeId: place._id}}>Edit</Link>
                        

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