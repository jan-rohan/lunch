let moment = require('moment');
let Restaurant = require('../restaurant.js');

module.exports = class Tradice extends Restaurant {

    constructor() {
        super('Tradice', 'http://www.tradiceandel.cz/cz/denni-nabidka/');
    }

    parseInner(resolve, reject) {

        let self = this;
        this.loadHtml((error, body, $) => {

            let n;
            n = (new Date()).getDay();
            $('.separator-section').each(function(i, elem) {
                if (i + 1 === n) {
                    return $(this).find('.item').each(function(i, elem) {
                        var name, price;
                        name = $(this).find('div').first().text().trim();
                        price = $(this).find('div').last().text().trim();
                        self.addItem(name, price);
                    });
                }
            });

            console.log("Tradice finished.");
            resolve();
        });
    }

}




