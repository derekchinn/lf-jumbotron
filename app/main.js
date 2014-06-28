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
        el: document.getElementById("list-view-0")
    });

    collection.pipe(view);
});