import $ from 'jQuery';
import Dispather from '../dispatcher/appDispatcher';
import ActionTypesConstants from '../constants/ActionTypesConstants';
import PlaceViewService from '../services/placeViewService';
import AppEventEmitter from './appEventEmitter';

let places = [];
let isAllPlacesLoaded = false;

var whenAllPlacesAreLoaded = function () {

    var promise = new Promise(function(resolve, reject) {
        if (isAllPlacesLoaded) {
            resolve();
        } else {
            var interval = setInterval(function() {
                if (isAllPlacesLoaded) {
                    clearInterval(interval);
                    resolve();
                }
            }, 100);
        }
    });

    return promise;
};

class PlaceEventEmmiter extends AppEventEmitter {

    getAllPlaces() {
        return places;
    }

    getPlace(placeId) {
        var placeViewService = new PlaceViewService();
        return placeViewService.getPlace(placeId, places);
    }    
}

var PlaceStore = new PlaceEventEmmiter();

Dispather.register(action => {
    switch(action.actionType) {
        case ActionTypesConstants.RECEIVED_ALL_PLACES:

            places = action.places;
            isAllPlacesLoaded = true;
            PlaceStore.emitChange();

            break;

        case ActionTypesConstants.RECEIVED_PLACE:

            var place = action.place;

            whenAllPlacesAreLoaded().then(function () {

                var placeViewService = new PlaceViewService();
                var placeInStore = placeViewService.getPlace(place._id, places);

                if (!place) {
                    places.push(place);
                }    
                          
                PlaceStore.emitChange();
            });

            break;            

        case ActionTypesConstants.CREATED_PLACE:
            
            var place = action.place;
            places.push(place);

            PlaceStore.emitChange();

            break;

        case ActionTypesConstants.UPDATED_PLACE:

            var place = action.place;

            places.every(function (_place, index) {
                if (_place._id === place._id) {
                    places[index] = place;
                    return false;
                }

                return true;
            });

            PlaceStore.emitChange();

            break;

        case ActionTypesConstants.DELETED_PLACE:

            var placeId = action.placeId;

            var placeViewService = new PlaceViewService();
            placeViewService.remove(places, placeId);

            PlaceStore.emitChange();

            break;

        default:
            // nothing to do here
            
    }
});

export default PlaceStore;