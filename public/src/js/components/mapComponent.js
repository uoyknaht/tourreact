import React from 'react';
import GoogleMap from './googleMapComponent/googleMapComponent';
import Marker from './googleMapComponent/markerComponent';

export default class Map extends React.Component {

    constructor() {
        super();
        this.componentDidMount = this.componentDidMount.bind(this);
        // this.componentWillReceiveProps  = this.componentWillReceiveProps .bind(this);
        this.render = this.render.bind(this);

        this.state = {
            markers: []
        };
    }

    componentDidMount() {


    }

    // componentWillReceiveProps () {

    //     var markers = [];

    //     this.props.places.forEach(function(place) {
    //         markers.push({
    //             lat: place.latitude,
    //             lng: place.longitude
    //         });
    //     }.bind(this));  

    //     this.setState({
    //         markers: markers
    //     });
    // }

    render() {
      



        console.log(this.state.markers);

       // console.log(markers);


        return (
            <div>
                <GoogleMap mapCenterLat={54} mapCenterLng={24} initialZoom={8} map={this.props.map} markers={this.state.markers}>

                </GoogleMap>
          
            </div>
        );
    }

}