require([
    "streamhub-sdk/jquery",
    "streamhub-sdk/collection",
    "streamhub-sdk/content/views/content-list-view"], 
function ($, Collection, ListView) {

    var collection = new Collection({
        "network": "strategy-prod.fyre.co",
        "siteId": "340628",
        "articleId": "custom-1402435110097"
    });
    
    var view = new ListView({
        el: document.getElementById("feed4")
    });

    var Slideshow = function (opts) {
        opts = opts || {};

        this._slideEls = $('.item');
        this._collections = {};
        this._apps = {};
        this._feedIntervalIds = {};
        this._prevIndex = this._slideEls.length-1;
        this._index = 0;
        this._firstRun = true;

        this.$carousel = window.$carousel = opts.el ? $(opts.el) : $('<div>');
        this.slideCounter = 0;
        this.numSlides = this._slideEls.length;
        this.$activeSlide;
    };

    Slideshow.prototype._rotateFeed = function (feedIndex) {
        var fn = function () {
        var $el = $('#feed4');
        var $contentEls = $el.find('.hub-content-container');

        // If there's just 1 piece of content, show it
        if ($contentEls == 1) {
            $contentEls.eq(0).find('article').show();
        } else {
            $contentEls.eq(0).find("article").fadeOut("slow", function () {
                $contentEls.eq(0).appendTo($el.find(".hub-list"));
                $contentEls.eq(1).find("article").fadeIn("slow", function() {});
            });
        }
    };
        fn();
        this._feedIntervalIds[feedIndex] = setInterval(fn, 10000);
    };

    var slideShow = new Slideshow();

    slideShow._rotateFeed(3);

    collection.pipe(view);
});