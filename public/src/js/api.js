import $ from 'jQuery';
// import Dispather from '../dispatcher/appDispatcher';
// import ActionTypesConstants from '../constants/ActionTypesConstants';
// import { EventEmitter } from 'events';
// import PlaceViewService from '../services/placeViewService';

import ServerActions from './actions/serverActions';

export default {

    getAllPlaces() {
        var getPlacesUrl = 'api/places';

        $.ajax({
            url: getPlacesUrl,
            cache: false,
            success: (places) => {
                // places = data;
                // isAllPlacesLoaded = true;
                // PlaceStore.emitChange();

                ServerActions.receivedAllPlaces(places);
            },
            error: function(xhr, status, err) {
                console.error(getPlacesUrl, status, err.toString());
            }
        });           
    },

    getPlace(placeId) {

        // var placeViewService = new PlaceViewService();
        // var place = placeViewService.getPlace(placeId, places);

        // if (place) {
        //     PlaceStore.emitChange();
        //     return;
        // }

        $.ajax({
            method: 'GET',
            url: 'api/places/' + placeId,
            success: function(place) {
                ServerActions.receivedPlace(place);

                // places.push(place);
                // PlaceStore.emitChange();
            }.bind(this),
            error: function(xhr, status, err) {
                console.error('errrrrrrrrrr');
            }
        }); 

    },

    savePlace(place) {

        var savePlaceUrl = 'api/places';
        var methodType = 'POST';

        if (place._id) {
            savePlaceUrl = savePlaceUrl + '/' + place._id;
            methodType = 'PUT';                
        }

        $.ajax({
            method: methodType,
            data: place,
            url: savePlaceUrl,
            success: function(addedOrEditedPlace) {
                if (place._id) {
                    ServerActions.updatedPlace(place);    
                } else {
                    ServerActions.createdPlace(place);
                }
                

                // if (place._id) {

                //     places.every(function (_place, index) {
                //         if (_place._id === addedOrEditedPlace._id) {
                //             places[index] = addedOrEditedPlace;
                //             return false;
                //         }

                //         return true;
                //     });
                // } else {
                //     places.push(addedOrEditedPlace);
                // }                

                // PlaceStore.emitChange();
            },
            error: function(xhr, status, err) {
                console.error(savePlaceUrl, status, err.toString());
            }
        });

    },

    deletePlace(placeId) {

        $.ajax({
            method: 'DELETE',
            url: 'api/places/' + placeId,
            success: function() {
                ServerActions.deletedPlace(placeId); 
            }.bind(this),
            error: function(xhr, status, err) {
                console.error('errrrrrrrrrr');
            }.bind(this)
        });        
    },    
}