/*!
 *
 * intro-home.js
 *
 */
var App=App||{};!function(){var e=function(){var e,n,o,t,i,a,r,s,p,l=function(){e=$(window),n=$(".page-home"),n.length&&(o=$("#header"),t=o.find(".logo").css("transform","translateY(20px)"),i=o.find(".news"),a=o.find(".portfolio"),r=o.find(".company"),s=o.find(".profile"),p=$("#footer").css("opacity",0),e.on("load",c))},c=function(){var e=new TweenMax.to(t,1.7,{opacity:1,delay:1.2,ease:Power1.easeOut}),n=new TweenMax.to(t,.5,{transform:"translateY(0)",delay:-.4,ease:Power1.easeOut}),o=new TweenMax.to(i,.4,{transform:"translateY(0)",opacity:1,delay:-.1,ease:Power1.easeOut}),l=new TweenMax.to(a,.4,{transform:"translateY(0)",opacity:1,delay:-.28,ease:Power1.easeOut}),c=new TweenMax.to(r,.4,{transform:"translateY(0)",opacity:1,delay:-.28,ease:Power1.easeOut}),u=new TweenMax.to(s,.4,{transform:"translateY(0)",opacity:1,delay:-.28,ease:Power1.easeOut}),d=new TweenMax.to(p,1,{opacity:1,delay:0,ease:Power1.easeOut}),g=new TimelineMax;g.add([e]).add([n]).add([o]).add([l]).add([c]).add([u]).add([d]),g.play()};return{initialize:l}}();App.introHome=e,App.introHome.initialize()}();/*!
 *
 * intro-portfolio.js
 *
 */
var App=App||{};!function(){var e=function(){var e,n,o=function(){e=$(".works-content"),n=e.find(".show-item"),n.length&&t()},t=function(){e.waitForImages(function(){setTimeout(i,300)})},i=function(){_.each(n,function(e,o,t){setTimeout(function(){n.eq(o).addClass("onscreen")},60*o)})};return{initialize:o}}();App.introPortfolio=e,App.introPortfolio.initialize()}();/*!
 *
 * map.js
 *
 */
var App=App||{};!function(){var e=function(){var e,n=function(){e=$("#googlemap"),e.length&&o()},o=function(){function e(){t={center:o,zoom:17,mapTypeControl:!1,panControl:!1,zoomControl:!1,scaleControl:!0,scrollwheel:!1,streetViewControl:!1,mapTypeId:google.maps.MapTypeId.ROADMAP,panControlOptions:{position:google.maps.ControlPosition.TOP_RIGHT},zoomControlOptions:{position:google.maps.ControlPosition.TOP_RIGHT,style:google.maps.ZoomControlStyle.SMALL},mapTypeControlOptions:{position:google.maps.ControlPosition.TOP_CENTER},streetViewControlOptions:{position:google.maps.ControlPosition.TOP_RIGHT},styles:[{stylers:[{hue:"#000000"},{saturation:-180},{lightness:13},{gamma:0}]}]},n=new google.maps.Map($("#googlemap").get(0),t);var e=new google.maps.LatLng(35.666329,139.715593);new google.maps.Marker({map:n,position:e});google.maps.event.addDomListener(window,"resize",function(){setTimeout(function(){n.panTo(t.center)},100)})}var n,o,t,i=new google.maps.Geocoder;i.geocode({location:{lat:35.666329,lng:139.715593}},function(n,t){t==google.maps.GeocoderStatus.OK&&(o=n[0].geometry.location,e())})};return{initialize:n}}();App.googlemap=e,App.googlemap.initialize()}();/*!
 *
 * news-ajax-scroll.js
 *
 */
var App=App||{};!function(){(function(){var e,n,o=function(){e=$(window),$(".news-posts").length&&(n=jQuery.ias({container:".news-posts",item:".news-post",pagination:".pagination",next:".pagination .next",negativeMargin:150,delay:0}),n.on("render",function(e){$(".news-posts").waitForImages(function(){setTimeout(t,200)})}),e.on("load",t))},t=function(){var e=$('.news-post:not(".onscreen")');e.each(function(e){var n=$(this);setTimeout(function(){n.addClass("onscreen")},320*(e+1))})};return o(),{}})()}();/*!
 *
 * photoswipe.js
 *
 */


var App = App || {};

(function(){

    // photoswipe
    var photoswipe = (function()
    {

        var initialize = function(gallerySelector)
        {

            var parseThumbnailElements = function(el) {
                var thumbElements = el.childNodes,
                    numNodes = thumbElements.length,
                    items = [],
                    figureEl,
                    linkEl,
                    size,
                    thumbnail,
                    mobileSize,
                    item;

                for(var i = 0; i < numNodes; i++) {

                    figureEl = thumbElements[i]; // <figure> element

                    // include only element nodes
                    if(figureEl.nodeType !== 1) {
                        continue;
                    }

                    linkEl = figureEl.children[0]; // <a> element

                    size = linkEl.getAttribute('data-size').split('x');

                    // create slide object
                    item = {
                        src: linkEl.getAttribute('href'),
                        w: parseInt(size[0], 10),
                        h: parseInt(size[1], 10)
                    };

                    item.full = {src: item.src, w: item.w, h: item.h};
                    mobileSize = linkEl.getAttribute('data-mobile-size');
                    if(linkEl.getAttribute('data-mobile-src') && mobileSize) {
                        mobileSize = mobileSize.split('x');
                        item.mobile = {
                            src: linkEl.getAttribute('data-mobile-src'),
                            w: parseInt(mobileSize[0], 10),
                            h: parseInt(mobileSize[1], 10)
                        };
                    }

                    if(figureEl.children.length > 1) {
                        // <figcaption> content
                        item.title = figureEl.children[1].innerHTML;
                    }

                    thumbnail = linkEl.querySelector('img');
                    if(thumbnail) {
                        // <picture> でブラウザが選択した画像をプレビューに使う。
                        item.msrc = thumbnail.currentSrc || thumbnail.getAttribute('src');
                    }

                    item.el = figureEl; // save link to element for getThumbBoundsFn
                    items.push(item);
                }

                return items;
            };

            // find nearest parent element
            var closest = function closest(el, fn) {
                return el && ( fn(el) ? el : closest(el.parentNode, fn) );
            };

            // triggers when user clicks on thumbnail
            var onThumbnailsClick = function(e) {
                e = e || window.event;
                e.preventDefault ? e.preventDefault() : e.returnValue = false;

                var eTarget = e.target || e.srcElement;

                // find root element of slide
                var clickedListItem = closest(eTarget, function(el) {
                    return (el.tagName && el.tagName.toUpperCase() === 'FIGURE');
                });

                if(!clickedListItem) {
                    return;
                }

                // find index of clicked item by looping through all child nodes
                // alternatively, you may define index via data- attribute
                var clickedGallery = clickedListItem.parentNode,
                    childNodes = clickedListItem.parentNode.childNodes,
                    numChildNodes = childNodes.length,
                    nodeIndex = 0,
                    index;

                for (var i = 0; i < numChildNodes; i++) {
                    if(childNodes[i].nodeType !== 1) {
                        continue;
                    }

                    if(childNodes[i] === clickedListItem) {
                        index = nodeIndex;
                        break;
                    }
                    nodeIndex++;
                }

                if(index >= 0) {
                    // open PhotoSwipe if valid index found
                    openPhotoSwipe( index, clickedGallery );
                }
                return false;
            };

            // parse picture index and gallery index from URL (#&pid=1&gid=2)
            var photoswipeParseHash = function() {
                var hash = window.location.hash.substring(1),
                params = {};

                if(hash.length < 5) {
                    return params;
                }

                var vars = hash.split('&');
                for (var i = 0; i < vars.length; i++) {
                    if(!vars[i]) {
                        continue;
                    }
                    var pair = vars[i].split('=');
                    if(pair.length < 2) {
                        continue;
                    }
                    params[pair[0]] = pair[1];
                }

                if(params.gid) {
                    params.gid = parseInt(params.gid, 10);
                }

                return params;
            };

            var openPhotoSwipe = function(index, galleryElement, disableAnimation, fromURL) {
                var pswpElement = document.querySelectorAll('.pswp')[0],
                    gallery,
                    options,
                    items;

                items = parseThumbnailElements(galleryElement);

                // define options (if needed)
                options = {

                    //modal: false,
                    spacing: 0.3,
                    closeOnScroll: true,
                    maxSpreadZoom: 0.8,
                    //showAnimationDuration: 1000,

                    // define gallery index (for URL)
                    galleryUID: galleryElement.getAttribute('data-pswp-uid'),
                    showHideOpacity:true,
                    getThumbBoundsFn:false,

                    // getThumbBoundsFn: function(index) {
                    //     // See Options -> getThumbBoundsFn section of documentation for more info
                    //     var thumbnail = items[index].el.getElementsByTagName('img')[0], // find thumbnail
                    //         pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
                    //         rect = thumbnail.getBoundingClientRect();

                    //     return {x:rect.left, y:rect.top + pageYScroll, w:rect.width};
                    // }

                };

                // PhotoSwipe opened from URL
                if(fromURL) {
                    if(options.galleryPIDs) {
                        // parse real index when custom PIDs are used
                        // http://photoswipe.com/documentation/faq.html#custom-pid-in-url
                        for(var j = 0; j < items.length; j++) {
                            if(items[j].pid == index) {
                                options.index = j;
                                break;
                            }
                        }
                    } else {
                        // in URL indexes start from 1
                        options.index = parseInt(index, 10) - 1;
                    }
                } else {
                    options.index = parseInt(index, 10);
                }

                // exit if index not found
                if( isNaN(options.index) ) {
                    return;
                }

                if(disableAnimation) {
                    options.showAnimationDuration = 0;
                }

                // Pass data to PhotoSwipe and initialize it
                gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
                // CSS / <picture> と同じ幅で拡大画像を切り替える。
                var mobileMedia = window.matchMedia('(max-width: 700px)'),
                    useMobileImage = mobileMedia.matches;
                gallery.listen('beforeResize', function() {
                    if(useMobileImage !== mobileMedia.matches) {
                        useMobileImage = mobileMedia.matches;
                        gallery.invalidateCurrItems();
                    }
                });
                gallery.listen('gettingData', function(index, item) {
                    var image = useMobileImage && item.mobile ? item.mobile : item.full;
                    item.src = image.src;
                    item.w = image.w;
                    item.h = image.h;
                });
                gallery.init();
            };

            // loop through all gallery elements and bind events
            var galleryElements = document.querySelectorAll( gallerySelector );

            for(var i = 0, l = galleryElements.length; i < l; i++) {
                galleryElements[i].setAttribute('data-pswp-uid', i+1);
                galleryElements[i].onclick = onThumbnailsClick;
            }

            // Parse URL and open gallery if it contains #&pid=3&gid=1
            var hashData = photoswipeParseHash();
            if(hashData.pid && hashData.gid) {
                openPhotoSwipe( hashData.pid ,  galleryElements[ hashData.gid - 1 ], true, true );
            }
        };

        return {
            initialize: initialize
        };
    })();


    /*--------------------------------------------------
      regist App
    ----------------------------------------------------*/
    App.photoswipe = photoswipe;

    $(function(){
        $('.page-portfolio').each(function()
        {
            App.photoswipe.initialize('.works-gallery');
        });
    });

}());
