import Dispather from '../dispatcher/appDispatcher';
import ActionTypesConstants from '../constants/ActionTypesConstants';
import PlaceActions from './placeActions';

var InitActions = {

    initApp: function (place) {

        Dispather.dispatch({
            actionType: ActionTypesConstants.INIT,
            initialData: place
        });

    }
};

export default placeActions;