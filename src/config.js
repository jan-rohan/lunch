//let Restaurant = require('./restaurant');
let Hrbek = require('./restaurants/hrbek');
let Bernard = require('./restaurants/bernard');
let Formanka = require('./restaurants/formanka');
let Tradice = require('./restaurants/tradice');

let restaurants = [
    new Hrbek(),
    new Formanka(),
    new Tradice(),
    new Bernard()
];

/*
restaurants.sort((r1, r2) => {
    if (r1.name > r2.name) {
        return 1;
    } else if (r2.name > r1.name) {
        return -1;
    }

    return 0;
});
*/

module.exports.restaurants = restaurants;