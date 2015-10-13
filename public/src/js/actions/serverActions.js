import Dispather from '../dispatcher/appDispatcher';
import ActionTypesConstants from '../constants/ActionTypesConstants';

export default {

    receivedAllPlaces(places) {
        Dispather.dispatch({
            actionType: ActionTypesConstants.RECEIVED_ALL_PLACES,
            places
        });
    }
    receivedPlace(place) {
        Dispather.dispatch({
            actionType: ActionTypesConstants.RECEIVED_PLACE,
            place
        });
    }

}