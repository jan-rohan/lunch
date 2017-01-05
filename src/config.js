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

module.exports.restaurants = restaurants;