import Dispather from '../dispatcher/appDispatcher';
import ActionTypesConstants from '../constants/ActionTypesConstants';
import Api from '../api';

export default {

    getAllPlaces() {
        Api.getAllPlaces();
    },

    getPlace(placeId) {
        Api.getPlace(placeId);
    },

    savePlace(place) {
        Api.savePlace(place);
    },

    deletePlace(placeId) {
        Api.deletePlace(placeId);
    }
}