New Marquee screens
===

---

####Current Status: 
As it stands now this project contains the html, css, and javascript files for two new screens for the marquee (the screens relating to business and science articles and corresponding comments.) 

Barring a couple of formatting issues (see below) the project as it stands supports comments collected from twitter and instagram.  Comments from other sites should broadly be usable but there may be formatting issues that need to be corrected depending on the default format settings of the website the comment was collected from (margins, font color, etc.)

Business screen

![Business Screen](/relative/path/to/img.jpg?raw=true "WILL FIX THIS")

Science Screen

![Science Screen](/relative/path/to/img.jpg?raw=true "WILL FIX THIS")

---

####Notes

Although comments with images attached will still be formatted correctly, the image will not appear.  The pages were designed this way, as images provided too many formatting issues given the limited space available to display comments.

The moving background on the business slide is not infinite - it functions due to the fact that there is a larger background image than is being shown and that much of it is being cut off.  As it stands now if the business screen is shown for more than twenty or so seconds the background will stop moving.

The formatting for these slides has not yet been tested on the big marquee up front and may need adjusting

---

####Issues

Some of the animations on the business screen are somewhat jerky, although this may in part be due to the fact that as the first slide on the rotation  (at the moment) some of the animations take place while the page is still loading.

As of now the title of the article and its author/publish date are not dynamic, it's just hard-coded in to be the article shown in the screenshots.  The collections attached to the pages, however, are dynamic and can be configured in the config.js file in the project.

On twitter comments that are two or fewer lines in length, the "view on twitter" bird icon is positioned incorrectly, ~100 pixels below the rest of the action buttons (reply, retweet, favorite)

For many of the posts (short twitter posts, especially short instagram posts, and especially long instagram posts) the position of their post date is incorrect, above or below where they are supposed to be.

The above two problems are likely related, but I was unable to find the precise cause or how to fix it.

----

#### (Somewhat) Easy-to-follow instructions on how to change around the formatting for these screens

**Note**: while these do require the reader to have some knowledge of how css, javascript, and html work, my personal experience with writing with these languages doesn't go back more than five or six weeks so they should be pretty simple.

The purpose of these instructions is to give a reasonable easy method to allow the user to prevent the slides from shifting, prevent the comments from rotating, and show all comments in the collection associated with the current slide.  These are primarily useful for editing the formatting of elements on the slide without interruption.

Ultimately this is a pretty basic method and reasonably easy to figure out if you look through the code but I thought it would be polite to save the reader the trouble.

**1.** To pause the slideshow on one specific slide, enter "$carousel.carousel("pause")" into the console (without the "" marks, of course.)  Whether or not the slideshow is paused you can send the slideshow to the next or previous slide by entering into the console $carousel.carousel("next") or $carousel.carousel("prev"), respectively.

* Note that while the slides will not cycle while paused, any animations on the slide itself will continue.  This includes cycling between comments from the collection associated with the slide.

**2.** To prevent the individual comments from cycling, we need to comment out the lines of the part of the attachHandlers (main.js: 119) method that deal with rotating the comments on the given slide.

* First, figure out the feed index of the slide you want to pause comment rotation on.  At the moment the business screen's feed index is 3 and the science screen's is 4.

* Next, comment out the lines of attachHandlers that deal with rotating comments connected to that slide index.
   * The section of attachHandlers that deals with operations on the active slide begins on main.js: 158.

   * For the Business Screen, which has a feed index of 3, the lines of code that we need to comment out are main.js: 161 and main.js: 165, which both read self._rotateFeed(3);

**3.** Comment out main.css: 306 - this shows all the comments in the collection associated with the current slide.

**4.**  Un-comment main.css: 76 - this makes all the comments that overflow the bounds of the slideshow (i.e. the vast majority of them) visible