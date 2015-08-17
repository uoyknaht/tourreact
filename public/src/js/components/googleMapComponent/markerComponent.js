import $ from 'jQuery';
import React from 'react';

export default class Marker extends React.Component {

    constructor() {
        super();

        this.componentDidMount = this.componentDidMount.bind(this);
        this.render = this.render.bind(this);



    }

    componentDidMount() {
        console.log(this.props);
        var latLang = {
            lat: this.props.lat,
            lng: this.props.lng
        };

        // var map = this.props.map;

        // var marker = new google.maps.Marker({
        //     position: latLang,
        //     map: map
        // });

    }


    render() {
        return (
            <div>aaa</div>
        );
    }
}