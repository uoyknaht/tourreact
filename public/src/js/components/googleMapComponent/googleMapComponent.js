import $ from 'jQuery';
import React from 'react';

export default class GoogleMap extends React.Component {

    constructor() {
        super();

        this.componentDidMount = this.componentDidMount.bind(this);
        this.getMapCenterLatLng = this.getMapCenterLatLng.bind(this);
        this.render = this.render.bind(this);

        this.state = {
            initialZoom: 8,
            mapCenterLat: 43.6425569,
            mapCenterLng: -79.4073126,        
            map: {}    
        };

    }

    componentDidMount (rootNode) {
        var mapOptions = {
            center: this.getMapCenterLatLng(),
            zoom: this.props.initialZoom
        };
        var mapCanvas = document.getElementById('google-map');
        // console.log(mapCanvas);
        // console.log(mapOptions);
        var map = new google.maps.Map(mapCanvas, mapOptions);
        //var marker = new google.maps.Marker({position: this.mapCenterLatLng(), title: 'Hi', map: map});
        //this.setState({map: map});
    }

    getMapCenterLatLng () {
        var props = this.props;
        return new google.maps.LatLng(props.mapCenterLat, props.mapCenterLng);
    }

    render() {
        var children = this.props.children;
        console.log(children);


        return (
            <div>
                <div id="google-map" className="google-map"></div>
                {children}
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
