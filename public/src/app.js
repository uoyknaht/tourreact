import React from 'react';
import Router from 'react-router';  
import { DefaultRoute, Link, Route, RouteHandler } from 'react-router';
import Home from './js/components/homeComponent';
import AllPlaces from './js/components/allPlacesComponent';
import PlaceForm from './js/components/placeFormComponent';
import ViewPlace from './js/components/viewPlaceComponent';

(function () {

    'use strict';


    // class Wrapper extends React.Component {
    //     constructor(props) {
    //         super(props);
    //         this.state = { handler: null };
    //     }
    //     componentDidMount() {
    //         Router.run(routes, this.handleNavigation.bind(this));
    //     }
    //     handleNavigation(Handler, state) {
    //         this.setState({
    //             handler: Handler
    //         });
    //     }
    //     render() {
    //         if(!this.state.handler) return null;
            
    //         var Handler = this.state.handler;
    //         return <Handler/>;
    //     }
    // }


    var routes = (  
        <Route name="home" path="/" handler={Home}>

            <Route name="allPlaces" path="places" handler={AllPlaces}>
                <Route name="addPlace" path="new" handler={PlaceForm}/>
                <Route name="editPlace" path=":placeId/edit" handler={PlaceForm}/>
                <Route name="viewPlace" path=":placeId" handler={ViewPlace}/>
            </Route>

        </Route>
    );   

 

    Router.run(routes, function (Handler, state) {
        var params = state.params;
        React.render(<Handler params={params}/>, document.body);
    });    

    // React.render(<Wrapper/>, document.body);

})();

