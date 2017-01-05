let moment = require('moment');
let Restaurant = require('../restaurant.js');

module.exports = class Formanka extends Restaurant {

    constructor() {
        super('Formanka', 'http://www.zomato.com/cs/widgets/daily_menu?entity_id=16506447');
    }

    parseInner(resolve, reject) {

        let self = this;
        this.loadHtml((error, body, $) => {

            let today = moment().format(', DD ');

            $('.date').each( function (i, elem) {
                if ( $(this).text().search(today) == -1 ) {
                    return
                }
                $(elem).nextUntil('.date, .divider', '.item').each(function (i, elem) {
                    
                        let name = $(this).find('.item-name').text().trim()
                        let desc = $(this).find('.item-description').text().trim()
                        let price = $(this).find('.item-price').text().trim()

                        if (name && price) {
                            self.addItem(name, price);
                        }
                });
            });

            console.log("Formanka finished.");
            resolve();
        });
    }

}




