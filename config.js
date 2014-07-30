/**
 * Configuration
 **/
var SLIDE_CONFIG = {
    // The time (in milliseconds) between slide shifts
    carouselInterval: 21000,

    // The time (in milliseconds) between tweets fading in and out
    feedScrollerInterval: 7000,

    // The number of rotations before the carousel reloads
    reloadCycle: 0,

    // Collections info

    businessCollection: {
        "network": "strategy-prod.fyre.co",
        "siteId": "340628",
        "articleId": "custom-1402435110097"
    },
    scienceCollection: {
        "network": "strategy-prod.fyre.co",
        "siteId": "340628",
        "articleId": "custom-1402435110097"
    },
    get: function (key) {
         return this[key];
    },
    set: function (key, value) {
        this[key] = value;
    }
};
