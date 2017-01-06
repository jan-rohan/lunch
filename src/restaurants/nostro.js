let moment = require('moment');
let Restaurant = require('../restaurant.js');

module.exports = class Tradice extends Restaurant {

    constructor() {
        super('Nostro', 'http://www.ilnostro.cz/cz/tydenni-menu');
    }

    parseInner(resolve, reject) {

        this.loadHtml((error, body, $) => {

            var n = new Date().getDay();
            $('.obsah table').each((i, elem) => {
                if (i + 1 === n) {
                    $(elem).find('tr').each((i, elem) => {
                        let name = $(elem).find('td').eq(1).text().trim();
                        let price = $(elem).find('td').last().text().trim();
                        this.addItem(name, price);
                    });
                }
            });

            console.log("Nostro finished.");
            resolve();
        });
    }

}




