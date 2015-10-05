import React from 'react';
import Router from 'react-router';  
import { DefaultRoute, Link, Route, RouteHandler, NotFoundRoute } from 'react-router';
import Home from './js/components/homeComponent';
import AllPlaces from './js/components/allPlacesComponent';
import PlaceForm from './js/components/placeFormComponent';
import ViewPlace from './js/components/viewPlaceComponent';
import NotFoundPage from './js/components/NotFoundPage';

console.log(NotFoundPage);

var routes = (  
    <Route name="home" path="/" handler={Home}>

        <Route name="allPlaces" path="places" handler={AllPlaces}>
            <Route name="addPlace" path="new" handler={PlaceForm}/>
            <Route name="editPlace" path=":placeId/edit" handler={PlaceForm}/>
            <Route name="viewPlace" path=":placeId" handler={ViewPlace}/>
            
        </Route>
        <NotFoundRoute handler={NotFoundPage}/>

    </Route>
);   

export default routes;