/**
 * Configuration
 **/
var SLIDE_CONFIG = {
    // The time (in milliseconds) between slide shifts
    carouselInterval: 10000,

    // The time (in milliseconds) between tweets fading in and out
    feedScrollerInterval: 10000,

    // The number of rotations before the carousel reloads
    reloadCycle: 0,

    // Collections info
    counterWall: {
        network: "strategy-prod.fyre.co",
        siteId: "340628",
        articleId: "custom-1395010000184"
    },
    listFeed1: {
        network: "strategy-prod.fyre.co",
        siteId: "340628",
        articleId: 'custom-1395009388264',
        initial: 10,
        showMore: 0
    },
    map: {
        network: "strategy-prod.fyre.co",
        siteId: "340628",
        articleId: "custom-1395009388264",
        cloudmadeStyleId: 56565,
        leafletMapOptions: {
            center: [37.7825471,-122.3978904],
            styles: 'dark',
            zoom: 18
        }
    },
    get: function (key) {
         return this[key];
    },
    set: function (key, value) {
        this[key] = value;
    }
};
