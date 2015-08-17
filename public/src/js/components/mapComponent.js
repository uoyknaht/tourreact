import React from 'react';
import GoogleMap from './googleMapComponent/googleMapComponent';
import Marker from './googleMapComponent/markerComponent';

export default class Map extends React.Component {

    constructor() {
        super();
        this.render = this.render.bind(this);
    }

    render() {


        return (
            <div>
                <GoogleMap mapCenterLat={54} mapCenterLng={24} initialZoom={8} ref="map">
                    <Marker lat={54} lng={24} />    
                </GoogleMap>

            </div>
        );
    }

}