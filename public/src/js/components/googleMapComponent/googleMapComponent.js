import $ from 'jQuery';
import React from 'react';

export default class GoogleMap extends React.Component {

    constructor() {
        super();

        this.componentDidMount = this.componentDidMount.bind(this);
        this.getMapCenterLatLng = this.getMapCenterLatLng.bind(this);
        this.render = this.render.bind(this);

        this.state = {
            map: {},
            initialZoom: 8,
            mapCenterLat: 43.6425569,
            mapCenterLng: -79.4073126,         
        };



    }

    componentDidMount (rootNode) {


        // console.log(mapCanvas);
        // console.log(mapOptions);

        //setTimeout(function() {

        var mapOptions = {
            center: this.getMapCenterLatLng(),
            zoom: this.props.initialZoom
        };
        var mapCanvas = document.getElementById('google-map');

            var map = new google.maps.Map(mapCanvas, mapOptions);


            if (this.props.markers) {
                this.props.markers.forEach(function(marker) {
                    new google.maps.Marker({position: marker, title: 'Hi', map: map});  
                })            
            }


        //var marker = new google.maps.Marker({position: this.mapCenterLatLng(), title: 'Hi', map: map});
        this.setState({map: map});

     //   }.bind(this), 1500);

    }

    componentDidUpdate () {
        var map = this.state.map;

        map.panTo(this.getMapCenterLatLng());
    }   

    getMapCenterLatLng () {
        var props = this.props;

        if (props.mapCenterLat && props.mapCenterLng) {
            return new google.maps.LatLng(props.mapCenterLat, props.mapCenterLng);
        }
        
        return new google.maps.LatLng(this.state.mapCenterLat, this.state.mapCenterLng);
    }

    render() {
        var children = this.props.children;

        return (
            <div>
                <div id="google-map" className="google-map"></div>
               
            </div>

        );
    }
}

  // propTypes: {
  //   zoom: PropTypeUtils.or('initialZoom', React.PropTypes.number).isRequired,
  //   center: PropTypeUtils.or('initialCenter', MapPropTypes.LatLng).isRequired,
  //   width: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.string]),
  //   height: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.string])
  // },
