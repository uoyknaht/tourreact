import Dispather from '../dispatcher/appDispatcher';
import ActionTypesConstants from '../constants/ActionTypesConstants';

export default {

    receivedAllPlaces(places) {
        Dispather.dispatch({
            actionType: ActionTypesConstants.RECEIVED_ALL_PLACES,
            places
        });
    },

    receivedPlace(place) {
        Dispather.dispatch({
            actionType: ActionTypesConstants.RECEIVED_PLACE,
            place
        });
    },

    createdPlace(place) {
        Dispather.dispatch({
            actionType: ActionTypesConstants.CREATED_PLACE,
            place
        });        
    },

    updatedPlace(place) {
        Dispather.dispatch({
            actionType: ActionTypesConstants.UPDATED_PLACE,
            place
        });        
    }

}