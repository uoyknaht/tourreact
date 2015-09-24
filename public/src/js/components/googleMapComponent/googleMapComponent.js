import $ from 'jQuery';
import React from 'react';

export default class GoogleMap extends React.Component {

    constructor() {
        super();

        this.componentDidMount = this.componentDidMount.bind(this);
        this.getMapCenterLatLng = this.getMapCenterLatLng.bind(this);
        this._updateMarkers = this._updateMarkers.bind(this);
        this._removeMarkers = this._removeMarkers.bind(this);
        this._updateCenter = this._updateCenter.bind(this);
        this.render = this.render.bind(this);

        this._markers = [];

        this.state = {
            map: {},
            zoom: 8,
            mapCenterLat: 43.6425569,
            mapCenterLng: -79.4073126
        };
    }

    componentDidMount (rootNode) {

        var mapOptions = {
            center: this.getMapCenterLatLng(),
            zoom: this.props.zoom
        };

        var mapCanvas = document.getElementById('google-map');
        var map = new google.maps.Map(mapCanvas, mapOptions);

        this.setState({map: map});
        this._updateMarkers();
    }

    componentDidUpdate () {
       this._updateCenter();
       this._updateMarkers();
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

    _updateMarkers() {
        var map = this.state.map;

        this._removeMarkers();

        this.props.markersParams.forEach(function(markerParams) {
            markerParams.map = map;

            var marker = new google.maps.Marker(markerParams);  

            if (markerParams.markerDragendCallback) {
                google.maps.event.addListener(marker, 'dragend', markerParams.markerDragendCallback);
            }

            if (markerParams.click) {
                google.maps.event.addListener(marker, 'click', markerParams.click);
            }            

            this._markers.push(marker);
        }.bind(this));         
    }

    _removeMarkers() {

        this._markers.forEach(function(marker) {
            marker.setMap(null);
        });         

        this._markers.length = 0;
    }    

    _updateCenter() {
        var map = this.state.map;
        map.panTo(this.getMapCenterLatLng());       
    }    
}

  // propTypes: {
  //   zoom: PropTypeUtils.or('initialZoom', React.PropTypes.number).isRequired,
  //   center: PropTypeUtils.or('initialCenter', MapPropTypes.LatLng).isRequired,
  //   width: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.string]),
  //   height: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.string])
  // },
