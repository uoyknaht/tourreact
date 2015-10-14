import Dispather from '../dispatcher/appDispatcher';
import ActionTypesConstants from '../constants/ActionTypesConstants';
import Api from '../api';

export default {

    getAllPlaces() {
        Api.getAllPlaces();
    },

    getPlace(placeId) {
        Api.getAllPlaces(placeId);
        // Dispather.dispatch({
        //     actionType: ActionTypesConstants.GET_PLACE,
        //     data: placeId
        // });
    },

    savePlace(place) {
        Api.savePlace(place);
    }
}