let moment = require('moment');
let Restaurant = require('../restaurant.js');

module.exports = class Tradice extends Restaurant {

    constructor() {
        super('Volyňka', 'http://volynka.cz/denni-menu.html');
    }

    parseInner(resolve, reject) {

        this.loadHtml((error, body, $) => {

            $('table.imB0 tr').each((i, elem) => {
                if (i > 0) {
                    let name = $(elem).find('td:nth-child(2)').first().text().trim();
                    let price = $(elem).find('td').last().text().trim().replace(',-', ' ');
                    if (price) {
                        this.addItem(name, price);
                    }
                }
            });

            console.log("Volyňka finished.");
            resolve();
        });
    }

}




