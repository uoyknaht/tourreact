import $ from 'jQuery';
// import Dispather from '../dispatcher/appDispatcher';
// import ActionTypesConstants from '../constants/ActionTypesConstants';
// import { EventEmitter } from 'events';
// import PlaceViewService from '../services/placeViewService';

import ServerActions from './actions/serverActions';

export default {

    getAllPlaces() {
        var getPlacesUrl = 'api/places';

        $.ajax({
            url: getPlacesUrl,
            cache: false,
            success: (places) => {
                // places = data;
                // isAllPlacesLoaded = true;
                // PlaceStore.emitChange();

                ServerActions.receivedAllPlaces(places);
            },
            error: function(xhr, status, err) {
                console.error(getPlacesUrl, status, err.toString());
            }
        });           
    },

    getPlace(placeId) {

        // var placeViewService = new PlaceViewService();
        // var place = placeViewService.getPlace(placeId, places);

        // if (place) {
        //     PlaceStore.emitChange();
        //     return;
        // }

        $.ajax({
            method: 'GET',
            url: 'api/places/' + placeId,
            success: function(place) {
                ServerActions.receivedPlace(place);

                // places.push(place);
                // PlaceStore.emitChange();
            }.bind(this),
            error: function(xhr, status, err) {
                console.error('errrrrrrrrrr');
            }
        }); 

    }
}