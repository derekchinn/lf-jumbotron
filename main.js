Livefyre.require([
    "streamhub-sdk/collection",
    "streamhub-sdk/content/views/content-list-view",
    "streamhub-map"],
function (Collection, ListView, MapView) {

    var Slideshow = function (opts) {
        opts = opts || {};

        this._slideEls = $('.item');
        this._collections = {};
        this._apps = {};
        this._feedIntervalIds = {};
        this._prevIndex = this._slideEls.length-1;
        this._index = 0;
        this._firstRun = true;
        this._config = SLIDE_CONFIG;

        this.$carousel = window.$carousel = opts.el ? $(opts.el) : $('<div>');
        this.slideCounter = 0;
        this.numSlides = this._slideEls.length;
        this.$activeSlide;

        this._parseQueryArgs();
        this._attachHandlers();

        this._initCarousel();
    };

    Slideshow.prototype.isPaused = function () {
        return this.$carousel.data()['bs.carousel'].paused;
    }

    Slideshow.prototype.pause = function () {
        this.$carousel.carousel('pause');
        clearTimeout(this._timeoutId);
    };

    Slideshow.prototype.resume = function () {
        this.$carousel.carousel('cycle');
    };

    Slideshow.prototype.next = function () {
        this.$carousel.carousel('next');
        if (this._timeoutId) {
            clearTimeout(this._timeoutId);
        }
    };

    Slideshow.prototype.prev = function () {
        this.$carousel.carousel('prev');
        if (this._timeoutId) {
            clearTimeout(this._timeoutId);
        }
    };

    Slideshow.prototype.jump = function (index) {
        this.$carousel.carousel(index);
    };

    Slideshow.prototype.beginSlideTransitionEvent = 'slide.bs.carousel';
    Slideshow.prototype.endSlideTransitionEvent = 'slid.bs.carousel';

    Slideshow.prototype._getCollectionForSlide = function (slideIndex) {
        return this._collections[slideIndex];
    };

    Slideshow.prototype._pauseCollection = function (slideIndex) {
        var collectionToPause = this._getCollectionForSlide(slideIndex);
        if (collectionToPause) {
            collectionToPause.pause();
        }
    };

    Slideshow.prototype._activateCollection = function (slideIndex) {
        var appView = this._initAppForSlide(slideIndex);
        if (! appView) {
            return;
        }

        var collectionToActivate = this._getCollectionForSlide(slideIndex);
        collectionToActivate.resume();
    };

    Slideshow.prototype._initAppForSlide = function (slideIndex) {
        if (this._apps[slideIndex] || this._apps[slideIndex] === null) {
            return;
        }

        var view;
        var slideEl = this._slideEls.eq(slideIndex);

        if (slideEl.hasClass('business-screen')) {
            view = this.initBusiness();
        } else if (slideEl.hasClass('science-screen')) {
            view = this.initScience();
        }
        
        // Note: initMap invoked in endSlideTransitionEvent callback, as 
        // Leaflet expects a visible parent div to render within.

        if (! view) {
            this._apps[slideIndex] = null;
        } else {
            this._apps[slideIndex] = view;
        }

        return view;
    };
    
    Slideshow.prototype._initCarousel = function() {
        $carousel.carousel({
            interval: false,
            pause: ""
        });
        $carousel.trigger(this.endSlideTransitionEvent);
    };

    Slideshow.prototype._attachHandlers = function () {
        var self = this;

        this.$carousel.on(this.beginSlideTransitionEvent, function () {
            self._prevIndex = self._slideEls.index(self.$activeSlide[0]);
            self._index = self._prevIndex + 1;
            self._nextIndex = self._index + 1;
            self.$prevSlide = self._slideEls.eq(self._prevIndex);
            self.$activeSlide = self._slideEls.eq(self._index);
            self.$nextSlide = self._slideEls.eq(self._nextIndex);

            if (self.$activeSlide.hasClass('lf-feed-1')) {
                clearInterval(self._feedIntervalIds[1]);
            }

            self._pauseCollection(self._prevIndex);
        });

        this.$carousel.on(this.endSlideTransitionEvent, function () {
            self.$activeSlide = self.$carousel.find(".active");

            // Operations on next slide
            var nextIndex = self._index + 1;
            var $nextSlide = self._slideEls.eq(nextIndex);

            if ($nextSlide.hasClass('avatar-wall-container')) {
                var view = self._apps[nextIndex];
                if (view) {
                    view.restartLoop();
                }
            }

            // Preload the next slide,
            // with 2s delay to avoid janking slide animation.
            setTimeout(function () {
                self._activateCollection(nextIndex);
            }, 2000);

            // Operations on active slide
            if (self.$activeSlide.hasClass('business-screen')) {
                var view = self._apps[self._index];
                if (view) {
                    self._rotateFeed(3);
                }
                else if (!view && self._firstRun) {
                    self._activateCollection(self._index);
                    self._rotateFeed(3);
                    self._firstRun = false;
                }
            }
            if (self.$activeSlide.hasClass('science-screen')) {
                var view = self._apps[self._index];
                if (view) {
                    self._rotateFeed(4);
                }
                else if (!view && self._firstRun) {
                    self._activateCollection(self._index);
                    self._rotateFeed(4);
                    self._firstRun = false;
                }
            }

            var slideDuration = self.$activeSlide.attr('data-slide-duration');
            if (slideDuration) {
                slideDuration = parseInt(slideDuration, 10);
            } else {
                slideDuration = this.config.carouselInterval;
            }
            this._timeoutId = setTimeout(function () {
                if (! self.isPaused()) {
                    self.next();
                }
            }, slideDuration);

            if (self._config.reloadCycle > 0) {
                if ((self._config.reloadCycle * self.numSlides) == ++self.slideCounter) {
                    self._firstRun = false;
                    self.slideCounter = 0;
                    location.reload();
                }
            }
        });
    };

    Slideshow.prototype._initView = function (opts) {
        opts = opts || {};

        var slideIndex = this._slideEls.index($(opts.el).parents('.item')[0]);
        if (this._collections[slideIndex]) {
            return;
        }

        var collection = this._collections[slideIndex] = opts.collection || new Collection(opts.config);

        opts.config.el = opts.el;
        var view = new opts.view(opts.config);
        collection.pipe(view);

        return view;
    };

    Slideshow.prototype.initBusiness = function() {
        var $el = $('#feed3');
        var view = this._initView({
            config: this._config.businessCollection,
            collection: new Collection(this._config.businessCollection),
            el: $el[0],
            view:ListView
        });

        return view;
    }

    Slideshow.prototype.initScience= function() {
        var $el = $('#feed4');
        var view = this._initView({
            config: this._config.scienceCollection,
            collection: new Collection(this._config.scienceCollection),
            el: $el[0],
            view:ListView
        });

        return view;
    }

    Slideshow.prototype._rotateFeed = function (feedIndex) {
        var fn = function () {
            var $el = $('#feed'+feedIndex);
            var $contentEls = $el.find('.hub-content-container');

            // If there's just 1 piece of content, show it
            if ($contentEls == 1) {
                $contentEls.eq(0).find('article').show();
            } else {
                $contentEls.eq(0).find("article").fadeOut("slow", function () {
                    $contentEls.eq(0).appendTo($el.find(".hub-list"));
                    $contentEls.eq(1).find("article").fadeIn("slow", function() {} );
                });
            }
        };

        fn();
        this._feedIntervalIds[feedIndex] = setInterval(fn, this._config.feedScrollerInterval);
    };

    Slideshow.prototype.initMap = function () {
        return this._initView({
            config: this._config.map,
            collection: new Collection(this._config.map),
            el: document.getElementById("lf-map"),
            view: MapView
        });
    };

    Slideshow.prototype._parseQueryArgs = function () {
        // Parse out query params
        var url = location.search;
        var params = url.split("&");

        for (var i = 0, len = params.length; i < len; i++) {
            var kv = params[i].split("=");
            kv[0] = kv[0].replace("?", "");
            kv[1] = parseInt(kv[1]);

            // Carousel Interval
            if (kv[0] == "ci") {
                this._config.set("carouselInterval", kv[1]);
            }

            // Feed Interval
            if (kv[0] == "fi") {
                this._config.set("feedScrollerInterval", kv[1]);
            }

            // Reload Carousel
            if (kv[0] == "rc") {
                this._config.set("reloadCycle", kv[1]);
            }
        }
    };
    
    $(window).on('load', function () {
        window.slideshow = new Slideshow({ el: $('.carousel') });
    });

    // setInterval(function () {
    //     $('body').trigger('increment.counter');
    // }, 750);
}); 
