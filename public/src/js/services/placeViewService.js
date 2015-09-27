
export default class PlaceViewService {

    getPlace(places, placeId) {

        for (var i = places.length - 1; i >= 0; i--) {
            var place = places[i];

            if (place._id === placeId) {
                return place;
            }
        };
    }

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