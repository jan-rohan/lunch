let Restaurant = require('../restaurant.js');

module.exports = class Bife extends Restaurant {

    //self = this;

    constructor() {
        super('Bifé', 'http://www.biferestaurant.cz/#denni-menu');
    }

    parseInner(resolve, reject) {

        this.loadHtml((error, body, $) => {

            const days = ['pondeli', 'utery', 'streda', 'ctvrtek', 'patek'];
            const dayNumber = new Date().getDay() - 1;
            if (dayNumber < 5) {
                const day = days[dayNumber];

                let items = $('#' + day + ' p' );

                if (items.length > 0) {
                    items.each((index, item) => {

                        const polevka = $(item).find('strong').length > 1;
                        
                        let name = ((polevka)? $(item).find('strong').first().text() : '') + $(item).clone().children().remove().end().text().replace(/\s+/g,' ').trim();
                        let price = $(item).find('strong').last().text().replace(',-', ' Kč').trim();
                        this.addItem(name, price);
                    });
                }
            }

            console.log("Bife finished.");
            resolve();
        });
    }

}




