//let Restaurant = require('./restaurant');
const Hrbek = require('./restaurants/hrbek');
const Bernard = require('./restaurants/bernard');
const Formanka = require('./restaurants/formanka');
const Tradice = require('./restaurants/tradice');
const Nostro = require('./restaurants/nostro');
const Volynka = require('./restaurants/volynka');
const Bife = require('./restaurants/bife');

let restaurants = [
    new Hrbek(),
    new Formanka(),
    new Tradice(),
    new Bife(),
    new Nostro(),
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