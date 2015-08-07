import React from 'react';
import Router from 'react-router';  

export default class ViewPlace extends React.Component {

    constructor() {
        super();
        this.render = this.render.bind(this);
    }
 

    render() {

        var place = this.props.place;

        return (
            <div className="dynamic-menu">
                <div className="row">
                    <div className="col12">

                        <h2>{place.title}</h2>

                        <Link to="inbox">Inbox</Link>

                        <a data-ui-sref="places.edit({id: data.place._id})" class="btn btn-default">Edit</a>
                        <button type="button" data-ng-click="onDeletePlace()" class="btn btn-danger">Delete</button>
                        <br/>
                        <br/>
                        <p>Address: {place.address}</p>
                        <p>Latitude: {place.latitude}</p>
                        <p>Longitude: {place.longitude}</p>

                        <p>Categories: 
                            <span class="ui-select-match-item btn btn-default btn-xs" 
                            data-ng-repeat="category in place.categories track by $index"

                            style="margin-right: 5px;">
                                {category.title}
                            </span>
                        </p>


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