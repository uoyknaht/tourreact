import Dispather from '../dispatcher/appDispatcher';
import ActionTypesConstants from '../constants/ActionTypesConstants';

var placeActions = {

    getAllPlaces: function () {
        Dispather.dispatch({
            actionType: ActionTypesConstants.GET_ALL_PLACES
        });
    }, 

    getPlace: function (placeId) {
        Dispather.dispatch({
            actionType: ActionTypesConstants.GET_PLACE,
            data: placeId
        });
    }, 

    savePlace: function (place) {

        var actionType = ActionTypesConstants[place._id ? ActionTypesConstants.EDIT_PLACE : ActionTypesConstants.CREATE_PLACE];

        Dispather.dispatch({
            actionType: actionType,
            data: place
        });
    }
};

export default placeActions;