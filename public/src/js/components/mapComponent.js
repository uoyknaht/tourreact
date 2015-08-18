import React from 'react';
import GoogleMap from './googleMapComponent/googleMapComponent';
import Marker from './googleMapComponent/markerComponent';

export default class Map extends React.Component {

    constructor() {
        super();
        this.render = this.render.bind(this);
    }

    render() {
        var markers = [];

        this.props.places.forEach(function(place) {
            markers.push({
                lat: place.latitude,
                lng: place.longitude
            });
        });

        console.log(markers);


        return (
            <div>
                <GoogleMap mapCenterLat={54} mapCenterLng={24} initialZoom={8} map={this.props.map} markers={markers}>

                </GoogleMap>
          
            </div>
        );
    }

}