
export default class PlaceViewService {

    remove(places, placeId) {

        places.some(function (place, index) {

            if (place._id === placeId) {
                places.splice(index, 1);
                return true;
            }

            return false;
        });
    }
}