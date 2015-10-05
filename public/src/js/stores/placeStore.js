import $ from 'jQuery';
import Dispather from '../dispatcher/appDispatcher';
import ActionTypesConstants from '../constants/ActionTypesConstants';
import { EventEmitter } from 'events';

var CHANGE_EVENT = 'change';

var places = [];

var PlaceStore = Object.assign({}, EventEmitter.prototype, {
    addChangeListener: function (callback) {
        this.on(CHANGE_EVENT, callback);
    },
    removeChangeListener: function (callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },
    emitChange: function () {
        this.emit(CHANGE_EVENT);
    },
    getAllPlaces: function () {
        return places;
    },
    getPlaceById: function (id) {
        //_.find(places, {_id: id});
    }
});

Dispather.register(function (action) {
    switch(action.actionType) {
        case ActionTypesConstants.GET_ALL_PLACES:

            var getPlacesUrl = 'api/places';
            var _this = this;

            $.ajax({
                url: getPlacesUrl,
                cache: false,
                success: function(data) {
                    places = data;
                    PlaceStore.emitChange();
                },
                error: function(xhr, status, err) {
                    console.error(getPlacesUrl, status, err.toString());
                }
            });

            break;

        case ActionTypesConstants.CREATE_PLACE:
        case ActionTypesConstants.EDIT_PLACE:

            var isEditAction = action.actionType === ActionTypesConstants.EDIT_PLACE;
            var place = action.data;
            
            var savePlaceUrl = 'api/places';
            var methodType = 'POST';

            if (isEditAction) {
                savePlaceUrl = savePlaceUrl + '/' + place._id;
                methodType = 'PUT';                
            }

            $.ajax({
                method: methodType,
                data: place,
                url: savePlaceUrl,
                success: function(addedOrEditedPlace) {

                    if (this.isEditAction) {

                        places.every(function (_place, index) {
                            if (_place._id === addedOrEditedPlace._id) {
                                places[index] = addedOrEditedPlace;
                                return false;
                            }

                            return true;
                        });
                    } else {
                        places.push(addedOrEditedPlace);
                    }                

                    PlaceStore.emitChange();


                },
                error: function(xhr, status, err) {
                    console.error(savePlaceUrl, status, err.toString());
                }
            });

            break;

        default:
            // nothing to do here
            
    }
});

export default PlaceStore;