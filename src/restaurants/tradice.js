let moment = require('moment');
let Restaurant = require('../restaurant.js');

module.exports = class Tradice extends Restaurant {

    constructor() {
        super('Tradice', 'http://www.tradiceandel.cz/cz/denni-nabidka/');
    }

    parseInner(resolve, reject) {

        this.loadHtml((error, body, $) => {

            let n = new Date().getDay();
            $('.separator-section').each((i, elem) => {
                if (i + 1 === n) {
                    return $(elem).find('.item').each((i, elem) => {
                        let name = $(elem).find('div').first().text().trim();
                        let price = $(elem).find('div').last().text().trim().replace(',-', ' Kč');
                        this.addItem(name, price);
                    });
                }
            });

            console.log("Tradice finished.");
            resolve();
        });
    }

}




