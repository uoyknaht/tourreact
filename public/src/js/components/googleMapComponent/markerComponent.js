import $ from 'jQuery';
import React from 'react';

export default class Marker extends React.Component {

    constructor() {
        super();

        this.componentDidMount = this.componentDidMount.bind(this);
        this.render = this.render.bind(this);



    }

    componentDidMount() {

        var markerPos = this.props.marker;

        var latLang = {
            lat: this.props.lat,
            lng: this.props.lng
        };

        var map = this.props.map;

        new google.maps.Marker({
            position: markerPos,
            map: map
        });

    }


    render() {
        console.log('rendering marker');
        return (
            <div>aaa</div>
        );
    }
}