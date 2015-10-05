import Dispather from '../dispatcher/appDispatcher';
import ActionTypesConstants from '../constants/ActionTypesConstants';

var placeActions = {

    getAllPlaces: function () {
        Dispather.dispatch({
            actionType: ActionTypesConstants.GET_ALL_PLACES
        });
    }, 

    savePlace: function (place) {

        var actionType = ActionTypesConstants[place._id ? EDIT_PLACE : CREATE_PLACE];

        Dispather.dispatch({
            actionType: actionType,
            data: place
        });
    }
};

export default placeActions;