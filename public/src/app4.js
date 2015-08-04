// jsx --watch src/ build/


var App = React.createClass({
    handlePlaceSubmit: function (place) {
        var savePlaceUrl = 'api/places';

        $.ajax({
            method: 'POST',
            data: place,
            url: savePlaceUrl,
            success: function(addedPlace) {
                var places = this.state.places;
                places.push(addedPlace);
                this.setState({places: places});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(savePlaceUrl, status, err.toString());
            }.bind(this)
        });


    },
    handleUserInput: function(filterText) {
        console.log(filterText);
        this.setState({
            filterText: filterText
        });

    },    
    getInitialState: function() {
        return {
            places: [],
            filterText: ''
        };
    },      
    componentDidMount: function() {
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
    },    
    render: function() {
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
});

var Sidebar = React.createClass({   
    render: function() {
        var places = [];

        this.props.places.forEach(function (place) {

            if (place.title.indexOf(this.props.filterText) !== -1) {
                places.push(
                    <li className="collection-item avatar">
                        <img src="src/img/alert-info.png" className="circle" />
                        <a className="title">
                            {place.title}
                        </a>
                    </li>
                );
            }


        }.bind(this));

        // var places = this.props.places.map(function (place) {
        //     return (
        //         <a className="collection-item avatar">
        //             <img src="src/img/alert-info.png" />a
        //             {place.title}
        //         </a>
        //     );
        // });        


        return (
            <div>

                <SearchBar filterText={this.props.filterText} onUserInput={this.props.onUserInput} />


                <ul className="collection">
                    {places}
                </ul>
                <br/>
                <hr/>
                <br/>
                <PlaceForm onPlaceSubmit={this.props.onPlaceSubmit} />
            </div>
        );
    }
});



var PlaceForm = React.createClass({  
    handleSubmit: function(e) {
        e.preventDefault();

        var title = React.findDOMNode(this.refs.title).value.trim();
        var address = React.findDOMNode(this.refs.address).value.trim();
        var latitude = React.findDOMNode(this.refs.latitude).value.trim();
        var longitude = React.findDOMNode(this.refs.longitude).value.trim();

        this.props.onPlaceSubmit({
            title: title, 
            address: address,
            latitude: latitude,
            longitude: longitude
        }); 

        React.findDOMNode(this.refs.title).value = '';
        React.findDOMNode(this.refs.address).value = '';
        React.findDOMNode(this.refs.latitude).value = '';
        React.findDOMNode(this.refs.longitude).value = '';

        return;
    },    
    render: function() {

        return (
            <div className="row">
                <form className="placeForm" class="col s12">
                    <h2>Add new place</h2>
                    <div className="row">
                        <div class="input-field col s12">
                            <input type="text"  ref="title" id="place-form-title" placeholder="Title" className="validate" />
                            <label for="place-form-title">Title</label>
                        </div>
                    </div>
                    <div className="row">
                        <div class="input-field col s12">
                            <input type="text" ref="address" />
                            <label>Address</label>
                        </div>
                    </div>
                    <div className="row">
                        <div class="input-field col s12">
                            <input type="text"  ref="latitude" />
                            <label>Latitude</label>
                        </div>
                    </div>
                    <div className="row">
                        <div class="input-field col s12">
                            <input type="text"  ref="longitude" />
                            <label>Longitude</label>
                        </div>
                    </div>



                    <br/>
                    <br/>
                    <br/>
                    <div className="row">
                        <div class="input-field col s12">
                            <input type="button" className="waves-effect waves-light btn" type="submit" value="Save" onClick={this.handleSubmit} />
                            <a className="waves-effect waves-light btn">Cancel</a>
                        </div>
                    </div>

                </form>
            </div>
        );
    }
});


// var SearchBar = React.createClass({
//     handleChange: function() {
//         this.props.onUserInput(this.refs.filterTextInput.getDOMNode().value);
//     },
//     render: function() {
//         return (
//             <form>
//                 <input
//                     type="text"
//                     placeholder="Search..."
//                     value={this.props.filterText}
//                     ref="filterTextInput"
//                     onChange={this.handleChange}
//                 />
//             </form>
//         );
//     }
// });

//import React from 'react';

import SearchBar from "./js/components/searchBar";


React.render(
  React.createElement(App, null),
  document.getElementById('content')
);


// var CommentBox = React.createClass({displayName: "CommentBox",
//   render: function() {
//     return (
//       React.createElement("div", {className: "commentBox"}, 
//         React.createElement("h1", null, "Comments"), 
//         React.createElement(CommentList, null), 
//         React.createElement(CommentForm, null)
//       )
//     );
//   }
// });

// var CommentList = React.createClass({displayName: "CommentList",
//   render: function() {
//     return (
//       React.createElement("div", {className: "commentList"}, 
//         "Hello, world! I am a CommentList."
//       )
//     );
//   }
// });

// var CommentForm = React.createClass({displayName: "CommentForm",
//   render: function() {
//     return (
//       React.createElement("div", {className: "commentForm"}, 
//         "Hello, world! I am a CommentForm."
//       )
//     );
//   }
// });

// var Comment = React.createClass({displayName: "Comment",
//   render: function() {
//     return (
//       React.createElement("div", {className: "comment"}, 
//         React.createElement("h2", {className: "commentAuthor"}, 
//           this.props.author
//         ), 
//         this.props.children
//       )
//     );
//   }
// });
