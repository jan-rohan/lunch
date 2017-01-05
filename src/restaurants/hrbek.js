let Restaurant = require('../restaurant.js');

module.exports = class Hrbek extends Restaurant {

    constructor() {
        super('Hrbek', 'http://www.stravovanihrbek.websnadno.cz/jidelnicek.html');
    }

    parseInner(resolve, reject) {

        super.loadHtml((error, body, $) => {
            
            this.setImagePriceList( $('img').first().attr('src') );

            console.log("Hrbek finished.");
            resolve();
        });
    }

}




