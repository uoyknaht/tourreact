import React from 'react';
import Router from 'react-router';  
import { DefaultRoute, Link, Route, RouteHandler } from 'react-router';
import Home from './js/components/homeComponent';
import AllPlaces from './js/components/allPlacesComponent';
import PlaceForm from './js/components/placeFormComponent';
import ViewPlace from './js/components/viewPlaceComponent';

(function () {

    'use strict';

    // React.render(
    //   <App />,
    //   document.body
    // );

    // var routes = (  
    //   <Route name="app" path="/" handler={Home}>
    //     <Route name="allPlaces" path="/all-places" handler={Labas}/>
    //     <Route name="addPlace" path="/add-place" handler={Hello}/>
    //   </Route>
    // );

    // var SidebarWrap = React.createClass({
    //   render: function () {
    //     return (
    //         <Sidebar places={this.state.places} onPlaceSubmit={this.handlePlaceSubmit} filterText={this.state.filterText} onUserInput={this.handleUserInput} />
    //     );
    //   }
    // });



    var routes = (  
        <Route name="home" path="/" handler={Home}>

            <Route name="allPlaces" path="places" handler={AllPlaces}>
                <Route name="addPlace" path="new" handler={PlaceForm}/>
                <Route name="editPlace" path=":placeId/edit" handler={PlaceForm}/>
                <Route name="viewPlace" path=":placeId" handler={ViewPlace}/>
            </Route>

        </Route>
    );   

    //      var routes = (  
    //     <Route name="home" path="/" handler={Home}>

    //         <Route name="allPlaces" handler={AllPlaces}>
    //             <Route name="message" path="all-places" handler={Sidebar}/>
    //             <DefaultRoute handler={Sidebar}/>
    //         </Route>

    //         <Route name="addPlace" path="add-place" handler={PlaceForm}/>
    //         <DefaultRoute handler={PlaceForm}/>

    //     </Route>
    // ); 

    // Router.run(routes, function (Handler) {  
    //   React.render(<Handler/>, document.body);
    // });    

    Router.run(routes, function (Handler, state) {
        var params = state.params;
        React.render(<Handler params={params}/>, document.body);
    });    

})();

