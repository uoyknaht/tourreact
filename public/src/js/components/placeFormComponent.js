import React from 'react';

export default class PlaceForm extends React.Component {

    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.render = this.render.bind(this);
    }

    handleSubmit(e) {
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
    }

    render() {

        return (
            <div className="dynamic-menu">
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
            </div>
        );
    }

}