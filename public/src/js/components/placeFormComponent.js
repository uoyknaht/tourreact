import React from 'react';
import Router from 'react-router';  

export default class PlaceForm extends React.Component {

    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.render = this.render.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();

        var data = {
            title: React.findDOMNode(this.refs.title).value.trim(),
            address: React.findDOMNode(this.refs.address).value.trim(),
            latitude: React.findDOMNode(this.refs.latitude).value.trim(),
            longitude: React.findDOMNode(this.refs.longitude).value.trim()
        }


        this.props.onPlaceSubmit(data, this.props.isEditAction); 

        React.findDOMNode(this.refs.title).value = '';
        React.findDOMNode(this.refs.address).value = '';
        React.findDOMNode(this.refs.latitude).value = '';
        React.findDOMNode(this.refs.longitude).value = '';

        this._redirectAfterSave();
    }

    handleCancel(e) {
        e.preventDefault();
        this._redirectAfterSave();
    }  

    _redirectAfterSave() {
        this.context.router.transitionTo('allPlaces');
    }  

    render() {

        var title = this.props.isEditAction ? 'Add new place' ? 'Edit place';

        return (
            <div className="dynamic-menu">
                <div className="row">
                    <form className="placeForm" class="col s12">
                        <h2>{title}</h2>
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
                                <input type="submit" className="waves-effect waves-light btn" value="Save" onClick={this.handleSubmit} />
                                <button type="button" className="waves-effect waves-light btn" onClick={this.handleCancel}>Cancel</button>
                            </div>
                        </div>

                    </form>
                </div>
            </div>
        );
    }

}

// https://github.com/rackt/react-router/issues/975
PlaceForm.contextTypes = {
  router: React.PropTypes.func.isRequired
};