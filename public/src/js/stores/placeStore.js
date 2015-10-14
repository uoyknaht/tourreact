import $ from 'jQuery';
import Dispather from '../dispatcher/appDispatcher';
import ActionTypesConstants from '../constants/ActionTypesConstants';
import { EventEmitter } from 'events';
import PlaceViewService from '../services/placeViewService';

let CHANGE_EVENT = 'change';

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

class PlaceEventEmmiter extends EventEmitter {

    getAllPlaces() {
        return places;
    }

    getPlace(placeId) {
        var placeViewService = new PlaceViewService();
        return placeViewService.getPlace(placeId, places);
    }    

    emitChange() {
        this.emit(CHANGE_EVENT);
    }    

    addChangeListener(callback) {
        this.on(CHANGE_EVENT, callback);
    }

    removeChangeListener(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }
}

var PlaceStore = new PlaceEventEmmiter();



// var PlaceStore = Object.assign({}, EventEmitter.prototype, {
//     addChangeListener: function (callback) {
//         this.on(CHANGE_EVENT, callback);
//     },
//     removeChangeListener: function (callback) {
//         this.removeListener(CHANGE_EVENT, callback);
//     },
//     emitChange: function () {
//         this.emit(CHANGE_EVENT);
//     },

//     getAllPlaces() {
//         return places;
//     },

//     getPlace(placeId) {
//         var placeViewService = new PlaceViewService();
//         return placeViewService.getPlace(placeId, places);
//     }
// });

Dispather.register(action => {
    switch(action.actionType) {
        case ActionTypesConstants.RECEIVED_ALL_PLACES:

            places = action.places;
            isAllPlacesLoaded = true;
            PlaceStore.emitChange();

            // var getPlacesUrl = 'api/places';
            // var _this = this;

            // $.ajax({
            //     url: getPlacesUrl,
            //     cache: false,
            //     success: function(data) {
            //         places = data;
            //         
            //         PlaceStore.emitChange();
            //     },
            //     error: function(xhr, status, err) {
            //         console.error(getPlacesUrl, status, err.toString());
            //     }
            // });

            break;

        case ActionTypesConstants.RECEIVED_PLACE:

            var place = action.place;



            whenAllPlacesAreLoaded().then(function () {

                var placeId = action.data;
                var placeViewService = new PlaceViewService();
                var place = placeViewService.getPlace(placeId, places);

                if (place) {
                    PlaceStore.emitChange();
                    return;
                }

                $.ajax({
                    method: 'GET',
                    url: 'api/places/' + placeId,
                    success: function(place) {
                        places.push(place);

                        PlaceStore.emitChange();
                    }.bind(this),
                    error: function(xhr, status, err) {
                        console.error('errrrrrrrrrr');
                    }
                });                

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

        default:
            // nothing to do here
            
    }
});

export default PlaceStore;