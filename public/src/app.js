import React from 'react';
import $ from 'jQuery';
import Sidebar from './js/components/sidebar';

class App extends React.Component {

    constructor() {
        super();
        this.handlePlaceSubmit = this.handlePlaceSubmit.bind(this);
        this.handleUserInput = this.handleUserInput.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.render = this.render.bind(this);

        this.state = {
            places: [],
            filterText: ''
        };
    }

    handlePlaceSubmit(place) {
        var savePlaceUrl = 'api/places';
        var _this = this;


        $.ajax({
            method: 'POST',
            data: place,
            url: savePlaceUrl,
            success: function(addedPlace) {
                var places = this.state.places;
                places.push(addedPlace);
               // _this.setState({places: places});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(savePlaceUrl, status, err.toString());
            }.bind(this)
        });
    }

    handleUserInput(filterText) {
        console.log(filterText);
        this.setState({
            filterText: filterText
        });
    }

    // getInitialState() {
    //     return {
    //         places: [],
    //         filterText: ''
    //     };
    // }

    componentDidMount() {
        var getPlacesUrl = 'api/places';

        $.ajax({
            url: getPlacesUrl,
            cache: false,
            success: function(data) {
                this.setState({places: data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(getPlacesUrl, status, err.toString());
            }.bind(this)
        });
    }

    render() {
        return (
            <div>
                  <div class="header">
                    <ul class="nav nav-pills pull-right">
                      <li ui-sref-active="active"><a data-ui-sref="home">Home</a></li>
                      <li ui-sref-active="active"><a data-ui-sref="places.list">All places</a></li>
                    </ul>
                  </div>
           
                <div className="row">
                    <div className="col s6">
                        <Sidebar places={this.state.places} onPlaceSubmit={this.handlePlaceSubmit} filterText={this.state.filterText} onUserInput={this.handleUserInput} />
                    </div>
                    <div class="col s6">
                        Map2
                    </div>
                </div>
                
            </div>
        );
    }

}

React.render(
  <App />,
  document.body
);

//<Sidebar places={this.state.places} onPlaceSubmit={this.handlePlaceSubmit} filterText={this.state.filterText} onUserInput={this.handleUserInput} />