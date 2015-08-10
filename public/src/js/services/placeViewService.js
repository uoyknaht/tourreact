
export default class PlaceViewService {

    remove(places, placeId) {
        var index = null;

        places.every(function (place, i) {
            if (place._id === placeId) {
                index = i;
                return false;
            }
        });

        if (index) {
            places.splice(index, 1);
        }
    }
}