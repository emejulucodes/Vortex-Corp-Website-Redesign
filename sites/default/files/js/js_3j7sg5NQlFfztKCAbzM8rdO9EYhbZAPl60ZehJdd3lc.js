(function($) {
  /**
   * Initialization
   */
  Drupal.behaviors.prevent_js_alerts = {
    /**
     * Run Drupal module JS initialization.
     * 
     * @param context
     * @param settings
     */
    attach: function(context, settings) {
      // Override the alert() function.
      window.alert = function(text) {
        // Check if the console exists (required e.g. for older IE versions).
        if (typeof console != "undefined") {
          // Log error to console instead.
          console.error("Module 'prevent_js_alerts' prevented the following alert: " + text);
        }
        return true;
      };
    }
  };
})(jQuery);;
(function(){function C(){var a="{}";if("userDataBehavior"==h){d.load("jStorage");try{a=d.getAttribute("jStorage")}catch(b){}try{r=d.getAttribute("jStorage_update")}catch(c){}g.jStorage=a}D();x();E()}function u(){var a;clearTimeout(F);F=setTimeout(function(){if("localStorage"==h||"globalStorage"==h)a=g.jStorage_update;else if("userDataBehavior"==h){d.load("jStorage");try{a=d.getAttribute("jStorage_update")}catch(b){}}if(a&&a!=r){r=a;var k=l.parse(l.stringify(c.__jstorage_meta.CRC32)),p;C();p=l.parse(l.stringify(c.__jstorage_meta.CRC32));
var e,y=[],f=[];for(e in k)k.hasOwnProperty(e)&&(p[e]?k[e]!=p[e]&&"2."==String(k[e]).substr(0,2)&&y.push(e):f.push(e));for(e in p)p.hasOwnProperty(e)&&(k[e]||y.push(e));s(y,"updated");s(f,"deleted")}},25)}function s(a,b){a=[].concat(a||[]);if("flushed"==b){a=[];for(var c in j)j.hasOwnProperty(c)&&a.push(c);b="deleted"}c=0;for(var p=a.length;c<p;c++){if(j[a[c]])for(var e=0,d=j[a[c]].length;e<d;e++)j[a[c]][e](a[c],b);if(j["*"]){e=0;for(d=j["*"].length;e<d;e++)j["*"][e](a[c],b)}}}function v(){var a=
(+new Date).toString();"localStorage"==h||"globalStorage"==h?g.jStorage_update=a:"userDataBehavior"==h&&(d.setAttribute("jStorage_update",a),d.save("jStorage"));u()}function D(){if(g.jStorage)try{c=l.parse(String(g.jStorage))}catch(a){g.jStorage="{}"}else g.jStorage="{}";z=g.jStorage?String(g.jStorage).length:0;c.__jstorage_meta||(c.__jstorage_meta={});c.__jstorage_meta.CRC32||(c.__jstorage_meta.CRC32={})}function w(){if(c.__jstorage_meta.PubSub){for(var a=+new Date-2E3,b=0,k=c.__jstorage_meta.PubSub.length;b<
k;b++)if(c.__jstorage_meta.PubSub[b][0]<=a){c.__jstorage_meta.PubSub.splice(b,c.__jstorage_meta.PubSub.length-b);break}c.__jstorage_meta.PubSub.length||delete c.__jstorage_meta.PubSub}try{g.jStorage=l.stringify(c),d&&(d.setAttribute("jStorage",g.jStorage),d.save("jStorage")),z=g.jStorage?String(g.jStorage).length:0}catch(p){}}function q(a){if(!a||"string"!=typeof a&&"number"!=typeof a)throw new TypeError("Key name must be string or numeric");if("__jstorage_meta"==a)throw new TypeError("Reserved key name");
return!0}function x(){var a,b,k,d,e=Infinity,g=!1,f=[];clearTimeout(G);if(c.__jstorage_meta&&"object"==typeof c.__jstorage_meta.TTL){a=+new Date;k=c.__jstorage_meta.TTL;d=c.__jstorage_meta.CRC32;for(b in k)k.hasOwnProperty(b)&&(k[b]<=a?(delete k[b],delete d[b],delete c[b],g=!0,f.push(b)):k[b]<e&&(e=k[b]));Infinity!=e&&(G=setTimeout(x,e-a));g&&(w(),v(),s(f,"deleted"))}}function E(){var a;if(c.__jstorage_meta.PubSub){var b,k=A;for(a=c.__jstorage_meta.PubSub.length-1;0<=a;a--)if(b=c.__jstorage_meta.PubSub[a],
b[0]>A){var k=b[0],d=b[1];b=b[2];if(t[d])for(var e=0,g=t[d].length;e<g;e++)t[d][e](d,l.parse(l.stringify(b)))}A=k}}var n=window.jQuery||window.$||(window.$={}),l={parse:window.JSON&&(window.JSON.parse||window.JSON.decode)||String.prototype.evalJSON&&function(a){return String(a).evalJSON()}||n.parseJSON||n.evalJSON,stringify:Object.toJSON||window.JSON&&(window.JSON.stringify||window.JSON.encode)||n.toJSON};if(!l.parse||!l.stringify)throw Error("No JSON support found, include //cdnjs.cloudflare.com/ajax/libs/json2/20110223/json2.js to page");
var c={__jstorage_meta:{CRC32:{}}},g={jStorage:"{}"},d=null,z=0,h=!1,j={},F=!1,r=0,t={},A=+new Date,G,B={isXML:function(a){return(a=(a?a.ownerDocument||a:0).documentElement)?"HTML"!==a.nodeName:!1},encode:function(a){if(!this.isXML(a))return!1;try{return(new XMLSerializer).serializeToString(a)}catch(b){try{return a.xml}catch(c){}}return!1},decode:function(a){var b="DOMParser"in window&&(new DOMParser).parseFromString||window.ActiveXObject&&function(a){var b=new ActiveXObject("Microsoft.XMLDOM");b.async=
"false";b.loadXML(a);return b};if(!b)return!1;a=b.call("DOMParser"in window&&new DOMParser||window,a,"text/xml");return this.isXML(a)?a:!1}};n.jStorage={version:"0.4.3",set:function(a,b,d){q(a);d=d||{};if("undefined"==typeof b)return this.deleteKey(a),b;if(B.isXML(b))b={_is_xml:!0,xml:B.encode(b)};else{if("function"==typeof b)return;b&&"object"==typeof b&&(b=l.parse(l.stringify(b)))}c[a]=b;for(var g=c.__jstorage_meta.CRC32,e=l.stringify(b),j=e.length,f=2538058380^j,h=0,m;4<=j;)m=e.charCodeAt(h)&255|
(e.charCodeAt(++h)&255)<<8|(e.charCodeAt(++h)&255)<<16|(e.charCodeAt(++h)&255)<<24,m=1540483477*(m&65535)+((1540483477*(m>>>16)&65535)<<16),m^=m>>>24,m=1540483477*(m&65535)+((1540483477*(m>>>16)&65535)<<16),f=1540483477*(f&65535)+((1540483477*(f>>>16)&65535)<<16)^m,j-=4,++h;switch(j){case 3:f^=(e.charCodeAt(h+2)&255)<<16;case 2:f^=(e.charCodeAt(h+1)&255)<<8;case 1:f^=e.charCodeAt(h)&255,f=1540483477*(f&65535)+((1540483477*(f>>>16)&65535)<<16)}f^=f>>>13;f=1540483477*(f&65535)+((1540483477*(f>>>16)&
65535)<<16);g[a]="2."+((f^f>>>15)>>>0);this.setTTL(a,d.TTL||0);s(a,"updated");return b},get:function(a,b){q(a);return a in c?c[a]&&"object"==typeof c[a]&&c[a]._is_xml?B.decode(c[a].xml):c[a]:"undefined"==typeof b?null:b},deleteKey:function(a){q(a);return a in c?(delete c[a],"object"==typeof c.__jstorage_meta.TTL&&a in c.__jstorage_meta.TTL&&delete c.__jstorage_meta.TTL[a],delete c.__jstorage_meta.CRC32[a],w(),v(),s(a,"deleted"),!0):!1},setTTL:function(a,b){var d=+new Date;q(a);b=Number(b)||0;return a in
c?(c.__jstorage_meta.TTL||(c.__jstorage_meta.TTL={}),0<b?c.__jstorage_meta.TTL[a]=d+b:delete c.__jstorage_meta.TTL[a],w(),x(),v(),!0):!1},getTTL:function(a){var b=+new Date;q(a);return a in c&&c.__jstorage_meta.TTL&&c.__jstorage_meta.TTL[a]?(a=c.__jstorage_meta.TTL[a]-b)||0:0},flush:function(){c={__jstorage_meta:{CRC32:{}}};w();v();s(null,"flushed");return!0},storageObj:function(){function a(){}a.prototype=c;return new a},index:function(){var a=[],b;for(b in c)c.hasOwnProperty(b)&&"__jstorage_meta"!=
b&&a.push(b);return a},storageSize:function(){return z},currentBackend:function(){return h},storageAvailable:function(){return!!h},listenKeyChange:function(a,b){q(a);j[a]||(j[a]=[]);j[a].push(b)},stopListening:function(a,b){q(a);if(j[a])if(b)for(var c=j[a].length-1;0<=c;c--)j[a][c]==b&&j[a].splice(c,1);else delete j[a]},subscribe:function(a,b){a=(a||"").toString();if(!a)throw new TypeError("Channel not defined");t[a]||(t[a]=[]);t[a].push(b)},publish:function(a,b){a=(a||"").toString();if(!a)throw new TypeError("Channel not defined");
c.__jstorage_meta||(c.__jstorage_meta={});c.__jstorage_meta.PubSub||(c.__jstorage_meta.PubSub=[]);c.__jstorage_meta.PubSub.unshift([+new Date,a,b]);w();v()},reInit:function(){C()}};a:{n=!1;if("localStorage"in window)try{window.localStorage.setItem("_tmptest","tmpval"),n=!0,window.localStorage.removeItem("_tmptest")}catch(H){}if(n)try{window.localStorage&&(g=window.localStorage,h="localStorage",r=g.jStorage_update)}catch(I){}else if("globalStorage"in window)try{window.globalStorage&&(g=window.globalStorage[window.location.hostname],
h="globalStorage",r=g.jStorage_update)}catch(J){}else if(d=document.createElement("link"),d.addBehavior){d.style.behavior="url(#default#userData)";document.getElementsByTagName("head")[0].appendChild(d);try{d.load("jStorage")}catch(K){d.setAttribute("jStorage","{}"),d.save("jStorage"),d.load("jStorage")}n="{}";try{n=d.getAttribute("jStorage")}catch(L){}try{r=d.getAttribute("jStorage_update")}catch(M){}g.jStorage=n;h="userDataBehavior"}else{d=null;break a}D();x();"localStorage"==h||"globalStorage"==
h?"addEventListener"in window?window.addEventListener("storage",u,!1):document.attachEvent("onstorage",u):"userDataBehavior"==h&&setInterval(u,1E3);E();"addEventListener"in window&&window.addEventListener("pageshow",function(a){a.persisted&&u()},!1)}})();
;
jQuery(function($) {
  var vendorLinksStatus = false;
  // Alfred vendor links dropdown

  // Open/Close when Buy Now tab is clicked
  $('.buy-now-tab').click( function(ev) {
    ev.preventDefault();
    ev.stopPropagation();
    if ($(this).hasClass('active')) {
      // Close dropdown
      vendorLinksStatus = false;
      closeVendorLinks();
    }
    else {
      // Open dropdown
      vendorLinksStatus = true;
      $(this).addClass('active');
      $(this).parent().next('.vendor-links').show();

      // Show first vendor-list by default, hide others
      $('.vendor-links .vendor-tab').removeClass('active');
      $('.vendor-links .vendor-tab:first-child').addClass('active');
      var activeTab = $('.vendor-links .vendor-tab.active').attr('data-format');
      if (!activeTab) {
        activeTab = 'other';
      }
      $('.vendor-links .vendor-list').each(function() {
        if($(this).attr('data-format') === activeTab) {
          $(this).show();
        }
        else {
          $(this).hide();
        }
      });
    }
  });
  $('.buy-container').click( function(ev) {
    ev.stopPropagation();
  });

  // Close dropdown on click outside
  $(document).click( function(ev) {
    if (vendorLinksStatus) {
      ev.preventDefault();
      vendorLinksStatus = false;
      closeVendorLinks();
    }
  });

  // Close dropdown
  function closeVendorLinks() {
    $('.buy-now-tab').removeClass('active');
    $('.vendor-links').hide();
  }

  // Change tabs
  $('.vendor-tab').click( function(ev) {
    ev.preventDefault();
    $('.vendor-tab').removeClass('active');
    $(this).addClass('active');
    var tabName = $(this).attr('data-format');
    $('.vendor-list').hide();
    $('#vendor-list-'+tabName).show();
  });
});

// Open the .buy-now modal upon navigating to the #printpurchase or #digitalpurchase version of the page.
jQuery(function($) {
  if(window.location.hash == "#printpurchase") {
    $('body .buy-now-tab').click();
    window.location.hash = "";
    // add in print <id> active
    $('.vendor-tab').removeClass('active');
    $('.vendor-list').hide();
    $('a#vendor-tab-print').addClass('active');
    $('#vendor-list-print').show();

  }
  if(window.location.hash == "#digitalpurchase") {
    $('body .buy-now-tab').click();
    window.location.hash = "";
    // add in digital <id> active
    $('.vendor-tab').removeClass('active');
    $('.vendor-list').hide();
    $('a#vendor-tab-digital').addClass('active');
    $('#vendor-list-digital').show();
  }
});
;
/*

	Supersized - Fullscreen Slideshow jQuery Plugin
	Version : 3.2.7
	Site	: www.buildinternet.com/project/supersized
	Author	: Sam Dunn
	Company : One Mighty Roar (www.onemightyroar.com)
	License : MIT License / GPL License

*/

(function($){

	/* Place Supersized Elements
	----------------------------*/
	$(document).ready(function() {
		$('body').append('<div id="supersized-loader"></div><ul id="supersized"></ul>');
	});


	$.supersized = function(options){

		/* Variables
	----------------------------*/
		var el = '#supersized',
			base = this,
			uniqueCounter = 0;
			// Access to jQuery and DOM versions of element
			base.$el = $(el);
			base.el = el;
			vars = $.supersized.vars;
			// Add a reverse reference to the DOM object
			base.$el.data("supersized", base);
			api = base.$el.data('supersized');


		base.init = function(){
			// Combine options and vars
			$.supersized.vars = $.extend($.supersized.vars, $.supersized.themeVars);
			$.supersized.vars.options = $.extend({},$.supersized.defaultOptions, $.supersized.themeOptions, options);
			base.options = $.supersized.vars.options;

			base._build();
		};


		/* Build Elements
		----------------------------*/
		base._slideCreator = function (options){

			// If links should open in new window
			var linkTarget = base.options.new_window ? ' target="_blank"' : '';

			var slideData = options.slideData,
				targetList = options.targetList,
				loadedCallback = options.loadedCallback;

			targetList.attr("data-slidetype",slideData.type);


			switch(slideData.type){

				case 'VIMEO':
					if(!$f) alert("You must include froogaloops.js to use vimeo slides");

					var d = new Date();
					var uid = "vimeo-"+ d.getTime() + '_' + uniqueCounter++;
					var html = '<iframe src="http://player.vimeo.com/video/'+slideData.video_id+'?api=1&player_id=' + uid + '"';
					html += ' id="'+uid+'"';
					html += ' width="100%" height="100%" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>';
					targetList.html(html);
					var iframe=targetList.find('iframe')[0];
					$f(iframe).addEvent('ready', function() {
						console.log("ready called");
						base.resizeNow();	// Resize background image
						if(loadedCallback) loadedCallback($(this));
					});
				break;

				case 'YOUTUBE':
					var d = new Date();
					var html = '<iframe src="http://www.youtube.com/embed/' + slideData.video_id + '?autoplay=1&hd=1&rel=0&autohide=1&showinfo=0&enablejsapi=1" frameborder="0" allowfullscreen></iframe>';
					targetList.html(html);
					if(loadedCallback) loadedCallback();
				break;

				case 'IMAGE':
				default:
					var slideLink = (slideData.url) ? "href='" + slideData.url + "'" : "";

					var img = $('<img src="'+slideData.image+'"/>');
					img.appendTo(targetList).wrap('<a ' + slideLink + linkTarget + '></a>');

					img.load(function(){
						base._origDim($(this));
						base.resizeNow();	// Resize background image
						if(loadedCallback) loadedCallback($(this)); //
					});	// End  IMAGE
				break;

			}
		}

		base._build = function(){
			// Add in slide markers
			var thisSlide = 0,
			slideSet = '',
			markers = '',
			markerContent,
			thumbMarkers = '',
			thumbImage;

			while(thisSlide <= base.options.slides.length-1){
				//Determine slide link content
				switch(base.options.slide_links){
					case 'num':
						markerContent = thisSlide;
						break;
					case 'name':
						markerContent = base.options.slides[thisSlide].title;
						break;
					case 'blank':
						markerContent = '';
						break;
				}

				slideSet = slideSet+'<li class="slide-'+thisSlide+'"></li>';

				if(thisSlide == base.options.start_slide-1){
					// Slide links
					if (base.options.slide_links)markers = markers+'<li class="slide-link-'+thisSlide+' current-slide"><a>'+markerContent+'</a></li>';
					// Slide Thumbnail Links
					if (base.options.thumb_links){
						base.options.slides[thisSlide].thumb ? thumbImage = base.options.slides[thisSlide].thumb : thumbImage = base.options.slides[thisSlide].image;
						thumbMarkers = thumbMarkers+'<li class="thumb'+thisSlide+' current-thumb"><img src="'+thumbImage+'"/></li>';
					};
				}else{
					// Slide links
					if (base.options.slide_links) markers = markers+'<li class="slide-link-'+thisSlide+'" ><a>'+markerContent+'</a></li>';
					// Slide Thumbnail Links
					if (base.options.thumb_links){
						base.options.slides[thisSlide].thumb ? thumbImage = base.options.slides[thisSlide].thumb : thumbImage = base.options.slides[thisSlide].image;
						thumbMarkers = thumbMarkers+'<li class="thumb'+thisSlide+'"><img src="'+thumbImage+'"/></li>';
					};
				}
				thisSlide++;
			}

			if (base.options.slide_links) $(vars.slide_list).html(markers);
			if (base.options.thumb_links && vars.thumb_tray.length){
				$(vars.thumb_tray).append('<ul id="'+vars.thumb_list.replace('#','')+'">'+thumbMarkers+'</ul>');
			}

			$(base.el).append(slideSet);

			// Add in thumbnails
			if (base.options.thumbnail_navigation){
				// Load previous thumbnail
				vars.current_slide - 1 < 0  ? prevThumb = base.options.slides.length - 1 : prevThumb = vars.current_slide - 1;
				$(vars.prev_thumb).show().html($("<img/>").attr("src", base.options.slides[prevThumb].image));

				// Load next thumbnail
				vars.current_slide == base.options.slides.length - 1 ? nextThumb = 0 : nextThumb = vars.current_slide + 1;
				$(vars.next_thumb).show().html($("<img/>").attr("src", base.options.slides[nextThumb].image));
			}

			base._start(); // Get things started
		};


		/* Initialize
		----------------------------*/
		base._start = function(){

			// Determine if starting slide random
			if (base.options.start_slide){
				vars.current_slide = base.options.start_slide - 1;
			}else{
				vars.current_slide = Math.floor(Math.random()*base.options.slides.length);	// Generate random slide number
			}

			// Set slideshow quality (Supported only in FF and IE, no Webkit)
			if (base.options.performance == 3){
				base.$el.addClass('speed'); 		// Faster transitions
			} else if ((base.options.performance == 1) || (base.options.performance == 2)){
				base.$el.addClass('quality');	// Higher image quality
			}

			// Shuffle slide order if needed
			if (base.options.random){
				arr = base.options.slides;
				for(var j, x, i = arr.length; i; j = parseInt(Math.random() * i), x = arr[--i], arr[i] = arr[j], arr[j] = x);	// Fisher-Yates shuffle algorithm (jsfromhell.com/array/shuffle)
					base.options.slides = arr;
			}

			/*-----Load initial set of images-----*/

			if (base.options.slides.length > 1){
				if(base.options.slides.length > 2){
					// Set previous image
					vars.current_slide - 1 < 0  ? loadPrev = base.options.slides.length - 1 : loadPrev = vars.current_slide - 1;	// If slide is 1, load last slide as previous

					var prevTargetList = $(base.el+' li:eq('+loadPrev+')').addClass('image-loading prevslide');
					base._slideCreator({
						slideData:base.options.slides[loadPrev],
						targetList : prevTargetList,
						loadedCallback : null
					});
				}
			} else {
				// Slideshow turned off if there is only one slide
				base.options.slideshow = 0;
			}

			//  Hide elements to be faded in
			base.$el.css('visibility','hidden');
			$('.load-item').hide();

			// Set current image
			var currentTargetList = $(base.el+' li:eq('+vars.current_slide+')').addClass('image-loading activeslide');
			base._slideCreator({
				slideData:base.options.slides[vars.current_slide],
				targetList : currentTargetList,
				loadedCallback :function(imgElm){
					base.launch();
					if( typeof theme != 'undefined' && typeof theme._init == "function" ) theme._init();	// Load Theme
				}
			});

			if (base.options.slides.length > 1){

				// Set next image
				vars.current_slide == base.options.slides.length - 1 ? loadNext = 0 : loadNext = vars.current_slide + 1;	// If slide is last, load first slide as next

				var nextTargetList = $(base.el+' li:eq('+loadNext+')').addClass('image-loading');
				base._slideCreator({
					slideData:base.options.slides[loadNext],
					targetList : nextTargetList,
					loadedCallback :null
				});

			}
			/*-----End load initial images-----*/

			};


		/* Launch Supersized
		----------------------------*/
		base.launch = function(){

			base.$el.css('visibility','visible');
			$('#supersized-loader').remove();		//Hide loading animation

			// Call theme function for before slide transition
			if( typeof theme != 'undefined' && typeof theme.beforeAnimation == "function" ) theme.beforeAnimation('next');
			$('.load-item').show();

			// Keyboard Navigation
			if (base.options.keyboard_nav){
				$(document.documentElement).keyup(function (event) {

					if(vars.in_animation) return false;		// Abort if currently animating

					// Left Arrow or Down Arrow
					if ((event.keyCode == 37) || (event.keyCode == 40)) {
						clearInterval(vars.slideshow_interval);	// Stop slideshow, prevent buildup
						base.prevSlide();

					// Right Arrow or Up Arrow
					} else if ((event.keyCode == 39) || (event.keyCode == 38)) {
						clearInterval(vars.slideshow_interval);	// Stop slideshow, prevent buildup
						base.nextSlide();

					// Spacebar
					} else if (event.keyCode == 32 && !vars.hover_pause) {
						clearInterval(vars.slideshow_interval);	// Stop slideshow, prevent buildup
						base.playToggle();
					}

				});
			}

			// Pause when hover on image
			if (base.options.slideshow && base.options.pause_hover){
				$(base.el).hover(function() {
					if(vars.in_animation) return false;		// Abort if currently animating
							vars.hover_pause = true;	// Mark slideshow paused from hover
							if(!vars.is_paused){
								vars.hover_pause = 'resume';	// It needs to resume afterwards
								base.playToggle();
							}
					}, function() {
					if(vars.hover_pause == 'resume'){
						base.playToggle();
						vars.hover_pause = false;
					}
					});
			}

			if (base.options.slide_links){
				// Slide marker clicked
				$(vars.slide_list+'> li').click(function(){

					index = $(vars.slide_list+'> li').index(this);
					targetSlide = index + 1;

					base.goTo(targetSlide);
					return false;

				});
			}

			// Thumb marker clicked
			if (base.options.thumb_links){
				$(vars.thumb_list+'> li').click(function(){

					index = $(vars.thumb_list+'> li').index(this);
					targetSlide = index + 1;

					api.goTo(targetSlide);
					return false;

				});
			}

			// Start slideshow if enabled
			if (base.options.slideshow && base.options.slides.length > 1){

					// Start slideshow if autoplay enabled
					if (base.options.autoplay && base.options.slides.length > 1){
						vars.slideshow_interval = setInterval(base.nextSlide, base.options.slide_interval);	// Initiate slide interval
				}else{
					vars.is_paused = true;	// Mark as paused
				}

				//Prevent navigation items from being dragged
				$('.load-item img').bind("contextmenu mousedown",function(){
					return false;
				});

			}

			// Adjust image when browser is resized
			$(window).resize(function(){
					base.resizeNow();
			});

		};


			/* Resize Images
		----------------------------*/
		base.resizeNow = function(){

			return base.$el.each(function() {
					//  Resize each image seperately
					$('img', base.el).each(function(){

					thisSlide = $(this);
					var ratio = (thisSlide.data('origHeight')/thisSlide.data('origWidth')).toFixed(2);	// Define image ratio

					// Gather browser size
					var browserwidth = base.$el.width(),
						browserheight = base.$el.height(),
						offset;

					/*-----Resize Image-----*/
					if (base.options.fit_always){	// Fit always is enabled
						if ((browserheight/browserwidth) > ratio){
							resizeWidth();
						} else {
							resizeHeight();
						}
					}else{	// Normal Resize
						if ((browserheight <= base.options.min_height) && (browserwidth <= base.options.min_width)){	// If window smaller than minimum width and height

							if ((browserheight/browserwidth) > ratio){
								base.options.fit_landscape && ratio < 1 ? resizeWidth(true) : resizeHeight(true);	// If landscapes are set to fit
							} else {
								base.options.fit_portrait && ratio >= 1 ? resizeHeight(true) : resizeWidth(true);		// If portraits are set to fit
							}

						} else if (browserwidth <= base.options.min_width){		// If window only smaller than minimum width

							if ((browserheight/browserwidth) > ratio){
								base.options.fit_landscape && ratio < 1 ? resizeWidth(true) : resizeHeight();	// If landscapes are set to fit
							} else {
								base.options.fit_portrait && ratio >= 1 ? resizeHeight() : resizeWidth(true);		// If portraits are set to fit
							}

						} else if (browserheight <= base.options.min_height){	// If window only smaller than minimum height

							if ((browserheight/browserwidth) > ratio){
								base.options.fit_landscape && ratio < 1 ? resizeWidth() : resizeHeight(true);	// If landscapes are set to fit
							} else {
								base.options.fit_portrait && ratio >= 1 ? resizeHeight(true) : resizeWidth();		// If portraits are set to fit
							}

						} else {	// If larger than minimums

							if ((browserheight/browserwidth) > ratio){
								base.options.fit_landscape && ratio < 1 ? resizeWidth() : resizeHeight();	// If landscapes are set to fit
							} else {
								base.options.fit_portrait && ratio >= 1 ? resizeHeight() : resizeWidth();		// If portraits are set to fit
							}

						}
					}
					/*-----End Image Resize-----*/


					/*-----Resize Functions-----*/

					function resizeWidth(minimum){
						if (minimum){	// If minimum height needs to be considered
							if(thisSlide.width() < browserwidth || thisSlide.width() < base.options.min_width ){
								if (thisSlide.width() * ratio >= base.options.min_height){
									thisSlide.width(base.options.min_width);
										thisSlide.height(thisSlide.width() * ratio);
									}else{
										resizeHeight();
									}
								}
						}else{
							if (base.options.min_height >= browserheight && !base.options.fit_landscape){	// If minimum height needs to be considered
								if (browserwidth * ratio >= base.options.min_height || (browserwidth * ratio >= base.options.min_height && ratio <= 1)){	// If resizing would push below minimum height or image is a landscape
									thisSlide.width(browserwidth);
									thisSlide.height(browserwidth * ratio);
								} else if (ratio > 1){		// Else the image is portrait
									thisSlide.height(base.options.min_height);
									thisSlide.width(thisSlide.height() / ratio);
								} else if (thisSlide.width() < browserwidth) {
									thisSlide.width(browserwidth);
										thisSlide.height(thisSlide.width() * ratio);
								}
							}else{	// Otherwise, resize as normal
								thisSlide.width(browserwidth);
								thisSlide.height(browserwidth * ratio);
							}
						}
					};

					function resizeHeight(minimum){
						if (minimum){	// If minimum height needs to be considered
							if(thisSlide.height() < browserheight){
								if (thisSlide.height() / ratio >= base.options.min_width){
									thisSlide.height(base.options.min_height);
									thisSlide.width(thisSlide.height() / ratio);
								}else{
									resizeWidth(true);
								}
							}
						}else{	// Otherwise, resized as normal
							if (base.options.min_width >= browserwidth){	// If minimum width needs to be considered
								if (browserheight / ratio >= base.options.min_width || ratio > 1){	// If resizing would push below minimum width or image is a portrait
									thisSlide.height(browserheight);
									thisSlide.width(browserheight / ratio);
								} else if (ratio <= 1){		// Else the image is landscape
									thisSlide.width(base.options.min_width);
										thisSlide.height(thisSlide.width() * ratio);
								}
							}else{	// Otherwise, resize as normal
								thisSlide.height(browserheight);
								thisSlide.width(browserheight / ratio);
							}
						}
					};

					/*-----End Resize Functions-----*/

					if (thisSlide.parents('li').hasClass('image-loading')){
						$('.image-loading').removeClass('image-loading');
					}

					// Horizontally Center
					if (base.options.horizontal_center){
						$(this).css('left', (browserwidth - $(this).width())/2);
					}

					// Vertically Center
					if (base.options.vertical_center){
						$(this).css('top', (browserheight - $(this).height())/2);
					}

				});

				// Basic image drag and right click protection
				if (base.options.image_protect){

					$('img', base.el).bind("contextmenu mousedown",function(){
						return false;
					});

				}

				return false;

			});

		};


				/* Next Slide
		----------------------------*/
		base.nextSlide = function(){

			if(vars.in_animation || !api.options.slideshow) return false;		// Abort if currently animating
				else vars.in_animation = true;		// Otherwise set animation marker

				clearInterval(vars.slideshow_interval);	// Stop slideshow

				var slides = base.options.slides,					// Pull in slides array
				liveslide = base.$el.find('.activeslide');		// Find active slide
				$('.prevslide').removeClass('prevslide');
				liveslide.removeClass('activeslide').addClass('prevslide');	// Remove active class & update previous slide

				//save current_slide to last slide
				vars.last_slide = vars.current_slide;

				// Get the slide number of new slide
				vars.current_slide + 1 == base.options.slides.length ? vars.current_slide = 0 : vars.current_slide++;

				var nextslide = $(base.el+' li:eq('+vars.current_slide+')'),
					prevslide = base.$el.find('.prevslide');

			// If hybrid mode is on drop quality for transition
			if (base.options.performance == 1) base.$el.removeClass('quality').addClass('speed');


			/*-----Load Image-----*/

			loadSlide = false;

			vars.current_slide == base.options.slides.length - 1 ? loadSlide = 0 : loadSlide = vars.current_slide + 1;	// Determine next slide

			var targetList = $(base.el+' li:eq('+loadSlide+')');
			if (!targetList.html()){
				targetList.addClass('image-loading').css('visibility','hidden');
				base._slideCreator({
					slideData:base.options.slides[loadSlide],
					targetList : targetList,
					loadedCallback :null
				});

			};

			// Update thumbnails (if enabled)
			if (base.options.thumbnail_navigation == 1){

				// Load previous thumbnail
				vars.current_slide - 1 < 0  ? prevThumb = base.options.slides.length - 1 : prevThumb = vars.current_slide - 1;
				$(vars.prev_thumb).html($("<img/>").attr("src", base.options.slides[prevThumb].image));

				// Load next thumbnail
				nextThumb = loadSlide;
				$(vars.next_thumb).html($("<img/>").attr("src", base.options.slides[nextThumb].image));

			}



			/*-----End Load Image-----*/


			// Call theme function for before slide transition
			if( typeof theme != 'undefined' && typeof theme.beforeAnimation == "function" ) theme.beforeAnimation('next');

			//Update slide markers
			if (base.options.slide_links){
				$('.current-slide').removeClass('current-slide');
				$(vars.slide_list +'> li' ).eq(vars.current_slide).addClass('current-slide');
			}

				nextslide.css('visibility','hidden').addClass('activeslide');	// Update active slide

				switch(base.options.transition){
					case 0: case 'none':	// No transition
							nextslide.css('visibility','visible'); vars.in_animation = false; base.afterAnimation();
							break;
					case 1: case 'fade':	// Fade
							nextslide.animate({opacity : 0},0).css('visibility','visible').animate({opacity : 1, avoidTransforms : false}, base.options.transition_speed, function(){ base.afterAnimation(); });
							break;
					case 2: case 'slideTop':	// Slide Top
							nextslide.animate({top : -base.$el.height()}, 0 ).css('visibility','visible').animate({ top:0, avoidTransforms : false }, base.options.transition_speed, function(){ base.afterAnimation(); });
							break;
					case 3: case 'slideRight':	// Slide Right
						nextslide.animate({left : base.$el.width()}, 0 ).css('visibility','visible').animate({ left:0, avoidTransforms : false }, base.options.transition_speed, function(){ base.afterAnimation(); });
						break;
					case 4: case 'slideBottom': // Slide Bottom
						nextslide.animate({top : base.$el.height()}, 0 ).css('visibility','visible').animate({ top:0, avoidTransforms : false }, base.options.transition_speed, function(){ base.afterAnimation(); });
						break;
					case 5: case 'slideLeft':  // Slide Left
						nextslide.animate({left : -base.$el.width()}, 0 ).css('visibility','visible').animate({ left:0, avoidTransforms : false }, base.options.transition_speed, function(){ base.afterAnimation(); });
						break;
					case 6: case 'carouselRight':	// Carousel Right
						nextslide.animate({left : base.$el.width()}, 0 ).css('visibility','visible').animate({ left:0, avoidTransforms : false }, base.options.transition_speed, function(){ base.afterAnimation(); });
					liveslide.animate({ left: -base.$el.width(), avoidTransforms : false }, base.options.transition_speed );
						break;
					case 7: case 'carouselLeft':   // Carousel Left
						nextslide.animate({left : -base.$el.width()}, 0 ).css('visibility','visible').animate({ left:0, avoidTransforms : false }, base.options.transition_speed, function(){ base.afterAnimation(); });
					liveslide.animate({ left: base.$el.width(), avoidTransforms : false }, base.options.transition_speed );
						break;
				}
				return false;
		};


		/* Previous Slide
		----------------------------*/
		base.prevSlide = function(){

			if(vars.in_animation || !api.options.slideshow) return false;		// Abort if currently animating
				else vars.in_animation = true;		// Otherwise set animation marker

			clearInterval(vars.slideshow_interval);	// Stop slideshow

			var slides = base.options.slides,					// Pull in slides array
			liveslide = base.$el.find('.activeslide');		// Find active slide
			$('.prevslide').removeClass('prevslide');
			liveslide.removeClass('activeslide').addClass('prevslide');		// Remove active class & update previous slide

			//save current_slide to last slide
			vars.last_slide = vars.current_slide;

			// Get current slide number
			vars.current_slide == 0 ?  vars.current_slide = base.options.slides.length - 1 : vars.current_slide-- ;

			var nextslide =  $(base.el+' li:eq('+vars.current_slide+')'),
				prevslide =  base.$el.find('.prevslide');

			// If hybrid mode is on drop quality for transition
			if (base.options.performance == 1) base.$el.removeClass('quality').addClass('speed');


			/*-----Load Image-----*/

			loadSlide = vars.current_slide;

			var targetList = $(base.el+' li:eq('+loadSlide+')');
			if (!targetList.html()){

				targetList.addClass('image-loading').css('visibility','hidden');

				base._slideCreator({
					slideData:base.options.slides[loadSlide],
					targetList : targetList,
					loadedCallback :null
				});

			};

			// Update thumbnails (if enabled)
			if (base.options.thumbnail_navigation == 1){

				// Load previous thumbnail
				//prevThumb = loadSlide;
				loadSlide == 0 ? prevThumb = base.options.slides.length - 1 : prevThumb = loadSlide - 1;
				$(vars.prev_thumb).html($("<img/>").attr("src", base.options.slides[prevThumb].image));

				// Load next thumbnail
				vars.current_slide == base.options.slides.length - 1 ? nextThumb = 0 : nextThumb = vars.current_slide + 1;
				$(vars.next_thumb).html($("<img/>").attr("src", base.options.slides[nextThumb].image));
			}

			/*-----End Load Image-----*/


			// Call theme function for before slide transition
			if( typeof theme != 'undefined' && typeof theme.beforeAnimation == "function" ) theme.beforeAnimation('prev');

			//Update slide markers
			if (base.options.slide_links){
				$('.current-slide').removeClass('current-slide');
				$(vars.slide_list +'> li' ).eq(vars.current_slide).addClass('current-slide');
			}

				nextslide.css('visibility','hidden').addClass('activeslide');	// Update active slide

				switch(base.options.transition){
					case 0: case 'none':	// No transition
							nextslide.css('visibility','visible'); vars.in_animation = false; base.afterAnimation();
							break;
					case 1: case 'fade':	// Fade
							nextslide.animate({opacity : 0},0).css('visibility','visible').animate({opacity : 1, avoidTransforms : false}, base.options.transition_speed, function(){ base.afterAnimation(); });
							break;
					case 2: case 'slideTop':	// Slide Top (reverse)
							nextslide.animate({top : base.$el.height()}, 0 ).css('visibility','visible').animate({ top:0, avoidTransforms : false }, base.options.transition_speed, function(){ base.afterAnimation(); });
							break;
					case 3: case 'slideRight':	// Slide Right (reverse)
						nextslide.animate({left : -base.$el.width()}, 0 ).css('visibility','visible').animate({ left:0, avoidTransforms : false }, base.options.transition_speed, function(){ base.afterAnimation(); });
						break;
					case 4: case 'slideBottom': // Slide Bottom (reverse)
						nextslide.animate({top : -base.$el.height()}, 0 ).css('visibility','visible').animate({ top:0, avoidTransforms : false }, base.options.transition_speed, function(){ base.afterAnimation(); });
						break;
					case 5: case 'slideLeft':  // Slide Left (reverse)
						nextslide.animate({left : base.$el.width()}, 0 ).css('visibility','visible').animate({ left:0, avoidTransforms : false }, base.options.transition_speed, function(){ base.afterAnimation(); });
						break;
					case 6: case 'carouselRight':	// Carousel Right (reverse)
						nextslide.animate({left : -base.$el.width()}, 0 ).css('visibility','visible').animate({ left:0, avoidTransforms : false }, base.options.transition_speed, function(){ base.afterAnimation(); });
					liveslide.animate({left : 0}, 0 ).animate({ left: base.$el.width(), avoidTransforms : false}, base.options.transition_speed );
						break;
					case 7: case 'carouselLeft':   // Carousel Left (reverse)
						nextslide.animate({left : base.$el.width()}, 0 ).css('visibility','visible').animate({ left:0, avoidTransforms : false }, base.options.transition_speed, function(){ base.afterAnimation(); });
					liveslide.animate({left : 0}, 0 ).animate({ left: -base.$el.width(), avoidTransforms : false }, base.options.transition_speed );
						break;
				}
				return false;
		};


		/* Play/Pause Toggle
		----------------------------*/
		base.playToggle = function(){

			if (vars.in_animation || !api.options.slideshow) return false;		// Abort if currently animating

			if (vars.is_paused){

				vars.is_paused = false;

				// Call theme function for play
				if( typeof theme != 'undefined' && typeof theme.playToggle == "function" ) theme.playToggle('play');

				// Resume slideshow
						vars.slideshow_interval = setInterval(base.nextSlide, base.options.slide_interval);

					}else{

						vars.is_paused = true;

						// Call theme function for pause
						if( typeof theme != 'undefined' && typeof theme.playToggle == "function" ) theme.playToggle('pause');

						// Stop slideshow
						clearInterval(vars.slideshow_interval);

					}

				return false;

			};


			/* Go to specific slide
		----------------------------*/
		base.goTo = function(targetSlide){
			if (vars.in_animation || !api.options.slideshow) return false;		// Abort if currently animating

			var totalSlides = base.options.slides.length;

			// If target outside range
			if(targetSlide < 0){
				targetSlide = totalSlides;
			}else if(targetSlide > totalSlides){
				targetSlide = 1;
			}
			targetSlide = totalSlides - targetSlide + 1;

			clearInterval(vars.slideshow_interval);	// Stop slideshow, prevent buildup

			//save current_slide to last slide
			vars.last_slide = vars.current_slide;
			base._cleanOldSlide();

			// Call theme function for goTo trigger
			if (typeof theme != 'undefined' && typeof theme.goTo == "function" ) theme.goTo();

			if (vars.current_slide == totalSlides - targetSlide){
				if(!(vars.is_paused)){
					vars.slideshow_interval = setInterval(base.nextSlide, base.options.slide_interval);
				}
				return false;
			}

			// If ahead of current position
			if(totalSlides - targetSlide > vars.current_slide ){

				// Adjust for new next slide
				vars.current_slide = totalSlides-targetSlide-1;
				vars.update_images = 'next';
				base._placeSlide(vars.update_images);

			//Otherwise it's before current position
			}else if(totalSlides - targetSlide < vars.current_slide){

				// Adjust for new prev slide
				vars.current_slide = totalSlides-targetSlide+1;
				vars.update_images = 'prev';
					base._placeSlide(vars.update_images);

			}

			// set active markers
			if (base.options.slide_links){
				$(vars.slide_list +'> .current-slide').removeClass('current-slide');
				$(vars.slide_list +'> li').eq((totalSlides-targetSlide)).addClass('current-slide');
			}

			if (base.options.thumb_links){
				$(vars.thumb_list +'> .current-thumb').removeClass('current-thumb');
				$(vars.thumb_list +'> li').eq((totalSlides-targetSlide)).addClass('current-thumb');
			}

		};


		/* Place Slide
		----------------------------*/
		base._placeSlide = function(place){
			loadSlide = false;

			if (place == 'next'){

				vars.current_slide == base.options.slides.length - 1 ? loadSlide = 0 : loadSlide = vars.current_slide + 1;	// Determine next slide

				var targetList = $(base.el+' li:eq('+loadSlide+')');

				if (!targetList.html()){

					targetList.addClass('image-loading').css('visibility','hidden');
					base._slideCreator({
						slideData:base.options.slides[loadSlide],
						targetList : targetList,
						loadedCallback :null
					});

				};

				base.nextSlide();

			}else if (place == 'prev'){

				vars.current_slide - 1 < 0  ? loadSlide = base.options.slides.length - 1 : loadSlide = vars.current_slide - 1;	// Determine next slide

				var targetList = $(base.el+' li:eq('+loadSlide+')');

				if (!targetList.html()){

					targetList.addClass('image-loading').css('visibility','hidden');
					base._slideCreator({
						slideData:base.options.slides[loadSlide],
						targetList : targetList,
						loadedCallback :null
					});
				};

				base.prevSlide();
			}

		};

		/* stop any video playing in the slide about to animate off */
		base._cleanOldSlide = function (){

			//neg 1 is the default value when there is no last slide
			if(vars.last_slide == -1) return;

			var listItem = $(base.el+' li:eq('+vars.last_slide+')');

			switch(listItem.attr("data-slidetype")){
				case 'VIMEO':
					try{
						var iframe = listItem.find("iframe")[0];
						$f(iframe).api("unload");
					}catch(e){
						//the vimeo video is probably not yet loaded
					}

					break;
			}
		};


		/* Get Original Dimensions
		----------------------------*/
		base._origDim = function(targetSlide){
			targetSlide.data('origWidth', targetSlide.width()).data('origHeight', targetSlide.height());
		};


		/* After Slide Animation
		----------------------------*/
		base.afterAnimation = function(){

			base._cleanOldSlide();

			// If hybrid mode is on swap back to higher image quality
			if (base.options.performance == 1){
					base.$el.removeClass('speed').addClass('quality');
			}

			// Update previous slide
			if (vars.update_images){
				vars.current_slide - 1 < 0  ? setPrev = base.options.slides.length - 1 : setPrev = vars.current_slide-1;
				vars.update_images = false;
				$('.prevslide').removeClass('prevslide');
				$(base.el+' li:eq('+setPrev+')').addClass('prevslide');
			}

			vars.in_animation = false;

			// Resume slideshow
			if (!vars.is_paused && base.options.slideshow){
				vars.slideshow_interval = setInterval(base.nextSlide, base.options.slide_interval);
				if (base.options.stop_loop && vars.current_slide == base.options.slides.length - 1 ) base.playToggle();
			}

			// Call theme function for after slide transition
			if (typeof theme != 'undefined' && typeof theme.afterAnimation == "function" ) theme.afterAnimation();

			return false;

		};

		base.getField = function(field){
			return base.options.slides[vars.current_slide][field];
		};

				// Make it go!
				base.init();
	};


	/* Global Variables
	----------------------------*/
	$.supersized.vars = {

		// Elements
		thumb_tray			:	'#thumb-tray',	// Thumbnail tray
		thumb_list			:	'#thumb-list',	// Thumbnail list
		slide_list          :   '#slide-list',	// Slide link list

		// Internal variables
		current_slide			:	0,			// Current slide number
		last_slide				:	-1,			// Current slide number
		in_animation 			:	false,		// Prevents animations from stacking
		is_paused 				: 	false,		// Tracks paused on/off
		hover_pause				:	false,		// If slideshow is paused from hover
		slideshow_interval		:	false,		// Stores slideshow timer
		update_images 			: 	false,		// Trigger to update images after slide jump
		options					:	{}			// Stores assembled options list

	};


	/* Default Options
	----------------------------*/
	$.supersized.defaultOptions = {

			// Functionality
		slideshow               :   1,			// Slideshow on/off
		autoplay				:	0,			// Slideshow starts playing automatically
		start_slide             :   1,			// Start slide (0 is random)
		stop_loop				:	0,			// Stops slideshow on last slide
		random					: 	0,			// Randomize slide order (Ignores start slide)
		slide_interval          :   5000,		// Length between transitions
		transition              :   1, 			// 0-None, 1-Fade, 2-Slide Top, 3-Slide Right, 4-Slide Bottom, 5-Slide Left, 6-Carousel Right, 7-Carousel Left
		transition_speed		:	750,		// Speed of transition
		new_window				:	1,			// Image links open in new window/tab
		pause_hover             :   0,			// Pause slideshow on hover
		keyboard_nav            :   1,			// Keyboard navigation on/off
		performance				:	1,			// 0-Normal, 1-Hybrid speed/quality, 2-Optimizes image quality, 3-Optimizes transition speed //  (Only works for Firefox/IE, not Webkit)
		image_protect			:	1,			// Disables image dragging and right click with Javascript

		// Size & Position
		fit_always				:	0,			// Image will never exceed browser width or height (Ignores min. dimensions)
		fit_landscape			:   0,			// Landscape images will not exceed browser width
		fit_portrait         	:   1,			// Portrait images will not exceed browser height
		min_width		        :   0,			// Min width allowed (in pixels)
		min_height		        :   0,			// Min height allowed (in pixels)
		horizontal_center       :   1,			// Horizontally center background
		vertical_center         :   1,			// Vertically center background


		// Components
		slide_links				:	1,			// Individual links for each slide (Options: false, 'num', 'name', 'blank')
		thumb_links				:	1,			// Individual thumb links for each slide
		thumbnail_navigation    :   0			// Thumbnail navigation

		};

		$.fn.supersized = function(options){
				return this.each(function(){
						(new $.supersized(options));
				});
		};

})(jQuery);
;
/*

	Supersized - Fullscreen Slideshow jQuery Plugin
	Version : 3.2.7
	Theme 	: Shutter 1.1

	Site	: www.buildinternet.com/project/supersized
	Author	: Sam Dunn
	Company : One Mighty Roar (www.onemightyroar.com)
	License : MIT License / GPL License

*/

(function($){

	theme = {


	 	/* Initial Placement
		----------------------------*/
	 	_init : function(){

	 		// Center Slide Links
	 		if (api.options.slide_links) $(vars.slide_list).css('margin-left', -$(vars.slide_list).width()/2);

			// Start progressbar if autoplay enabled
    		if (api.options.autoplay){
    			if (api.options.progress_bar) theme.progressBar();
			}else{
				if ($(vars.play_button).attr('src')) $(vars.play_button).attr("src", vars.image_path + "play.png");	// If pause play button is image, swap src
				if (api.options.progress_bar) $(vars.progress_bar).stop().css({left : -$(window).width()});	//  Place progress bar
			}


			/* Thumbnail Tray
			----------------------------*/
			// Hide tray off screen
			$(vars.thumb_tray).css({bottom : -$(vars.thumb_tray).height()});

			// Thumbnail Tray Toggle
			$(vars.tray_button).toggle(function(){
				$(vars.thumb_tray).stop().animate({bottom : 0, avoidTransforms : true}, 300 );
				if ($(vars.tray_arrow).attr('src')) $(vars.tray_arrow).attr("src", vars.image_path + "button-tray-down.png");
				return false;
			}, function() {
				$(vars.thumb_tray).stop().animate({bottom : -$(vars.thumb_tray).height(), avoidTransforms : true}, 300 );
				if ($(vars.tray_arrow).attr('src')) $(vars.tray_arrow).attr("src", vars.image_path + "button-tray-up.png");
				return false;
			});

			// Make thumb tray proper size
			$(vars.thumb_list).width($('> li', vars.thumb_list).length * $('> li', vars.thumb_list).outerWidth(true));	//Adjust to true width of thumb markers

			// Display total slides
			if ($(vars.slide_total).length){
				$(vars.slide_total).html(api.options.slides.length);
			}


			/* Thumbnail Tray Navigation
			----------------------------*/
			if (api.options.thumb_links){
				//Hide thumb arrows if not needed
				if ($(vars.thumb_list).width() <= $(vars.thumb_tray).width()){
					$(vars.thumb_back +','+vars.thumb_forward).fadeOut(0);
				}

				// Thumb Intervals
        		vars.thumb_interval = Math.floor($(vars.thumb_tray).width() / $('> li', vars.thumb_list).outerWidth(true)) * $('> li', vars.thumb_list).outerWidth(true);
        		vars.thumb_page = 0;

        		// Cycle thumbs forward
        		$(vars.thumb_forward).click(function(){
        			if (vars.thumb_page - vars.thumb_interval <= -$(vars.thumb_list).width()){
        				vars.thumb_page = 0;
        				$(vars.thumb_list).stop().animate({'left': vars.thumb_page}, {duration:500, easing:'easeOutExpo'});
        			}else{
        				vars.thumb_page = vars.thumb_page - vars.thumb_interval;
        				$(vars.thumb_list).stop().animate({'left': vars.thumb_page}, {duration:500, easing:'easeOutExpo'});
        			}
        		});

        		// Cycle thumbs backwards
        		$(vars.thumb_back).click(function(){
        			if (vars.thumb_page + vars.thumb_interval > 0){
        				vars.thumb_page = Math.floor($(vars.thumb_list).width() / vars.thumb_interval) * -vars.thumb_interval;
        				if ($(vars.thumb_list).width() <= -vars.thumb_page) vars.thumb_page = vars.thumb_page + vars.thumb_interval;
        				$(vars.thumb_list).stop().animate({'left': vars.thumb_page}, {duration:500, easing:'easeOutExpo'});
					}else{
        				vars.thumb_page = vars.thumb_page + vars.thumb_interval;
        				$(vars.thumb_list).stop().animate({'left': vars.thumb_page}, {duration:500, easing:'easeOutExpo'});
        			}
        		});

			}


			/* Navigation Items
			----------------------------*/
		    $(vars.next_slide).click(function() {
		    	api.nextSlide();
		    });

		    $(vars.prev_slide).click(function() {
		    	api.prevSlide();
		    });

		    $("#topnextslide").click(function() {
		    	api.nextSlide();
		    });

		    $("#topprevslide").click(function() {
		    	api.prevSlide();
		    });

		    	// Full Opacity on Hover
		   //  	if(jQuery.support.opacity){
			  //   	$(vars.prev_slide +','+vars.next_slide).mouseover(function() {
					//    $(this).stop().animate({opacity:1},100);
					// }).mouseout(function(){
					//    $(this).stop().animate({opacity:0.6},100);
					// });
				// }

			if (api.options.thumbnail_navigation){
				// Next thumbnail clicked
				$(vars.next_thumb).click(function() {
			    	api.nextSlide();
			    });
			    // Previous thumbnail clicked
			    $(vars.prev_thumb).click(function() {
			    	api.prevSlide();
			    });
			}

		    $(vars.play_button).click(function() {
				api.playToggle();
		    });


			/* Thumbnail Mouse Scrub
			----------------------------*/
    		if (api.options.mouse_scrub){
				$(vars.thumb_tray).mousemove(function(e) {
					var containerWidth = $(vars.thumb_tray).width(),
						listWidth = $(vars.thumb_list).width();
					if (listWidth > containerWidth){
						var mousePos = 1,
							diff = e.pageX - mousePos;
						if (diff > 10 || diff < -10) {
						    mousePos = e.pageX;
						    newX = (containerWidth - listWidth) * (e.pageX/containerWidth);
						    diff = parseInt(Math.abs(parseInt($(vars.thumb_list).css('left'))-newX )).toFixed(0);
						    $(vars.thumb_list).stop().animate({'left':newX}, {duration:diff*3, easing:'easeOutExpo'});
						}
					}
				});
			}


			/* Window Resize
			----------------------------*/
			$(window).resize(function(){

				// Delay progress bar on resize
				if (api.options.progress_bar && !vars.in_animation){
					if (vars.slideshow_interval) clearInterval(vars.slideshow_interval);
					if (api.options.slides.length - 1 > 0) clearInterval(vars.slideshow_interval);

					$(vars.progress_bar).stop().css({left : -$(window).width()});

					if (!vars.progressDelay && api.options.slideshow){
						// Delay slideshow from resuming so Chrome can refocus images
						vars.progressDelay = setTimeout(function() {
								if (!vars.is_paused){
									theme.progressBar();
									vars.slideshow_interval = setInterval(api.nextSlide, api.options.slide_interval);
								}
								vars.progressDelay = false;
						}, 1000);
					}
				}

				// Thumb Links
				if (api.options.thumb_links && vars.thumb_tray.length){
					// Update Thumb Interval & Page
					vars.thumb_page = 0;
					vars.thumb_interval = Math.floor($(vars.thumb_tray).width() / $('> li', vars.thumb_list).outerWidth(true)) * $('> li', vars.thumb_list).outerWidth(true);

					// Adjust thumbnail markers
					if ($(vars.thumb_list).width() > $(vars.thumb_tray).width()){
						$(vars.thumb_back +','+vars.thumb_forward).fadeIn('fast');
						$(vars.thumb_list).stop().animate({'left':0}, 200);
					}else{
						$(vars.thumb_back +','+vars.thumb_forward).fadeOut('fast');
					}

				}
			});


	 	},


	 	/* Go To Slide
		----------------------------*/
	 	goTo : function(){
	 		if (api.options.progress_bar && !vars.is_paused){
				$(vars.progress_bar).stop().css({left : -$(window).width()});
				theme.progressBar();
			}
		},

	 	/* Play & Pause Toggle
		----------------------------*/
	 	playToggle : function(state){

	 		if (state =='play'){
	 			// If image, swap to pause
	 			if ($(vars.play_button).attr('src')) $(vars.play_button).attr("src", vars.image_path + "pause.png");
				if (api.options.progress_bar && !vars.is_paused) theme.progressBar();
	 		}else if (state == 'pause'){
	 			// If image, swap to play
	 			if ($(vars.play_button).attr('src')) $(vars.play_button).attr("src", vars.image_path + "play.png");
        		if (api.options.progress_bar && vars.is_paused)$(vars.progress_bar).stop().css({left : -$(window).width()});
	 		}

	 	},


	 	/* Before Slide Transition
		----------------------------*/
	 	beforeAnimation : function(direction){
		    if (api.options.progress_bar && !vars.is_paused) $(vars.progress_bar).stop().css({left : -$(window).width()});

		  	/* Update Fields
		  	----------------------------*/
		  	// Update slide caption
		   	if ($(vars.slide_caption).length){
		   		(api.getField('title')) ? $(vars.slide_caption).html(api.getField('title')) : $(vars.slide_caption).html('');
		   	}
		    // Update slide number
			if (vars.slide_current.length){
			    $(vars.slide_current).html(vars.current_slide + 1);
			}


		    // Highlight current thumbnail and adjust row position
		    if (api.options.thumb_links){

				$('.current-thumb').removeClass('current-thumb');
				$('li', vars.thumb_list).eq(vars.current_slide).addClass('current-thumb');

				// If thumb out of view
				if ($(vars.thumb_list).width() > $(vars.thumb_tray).width()){
					// If next slide direction
					if (direction == 'next'){
						if (vars.current_slide == 0){
							vars.thumb_page = 0;
							$(vars.thumb_list).stop().animate({'left': vars.thumb_page}, {duration:500, easing:'easeOutExpo'});
						} else if ($('.current-thumb').offset().left - $(vars.thumb_tray).offset().left >= vars.thumb_interval){
	        				vars.thumb_page = vars.thumb_page - vars.thumb_interval;
	        				$(vars.thumb_list).stop().animate({'left': vars.thumb_page}, {duration:500, easing:'easeOutExpo'});
						}
					// If previous slide direction
					}else if(direction == 'prev'){
						if (vars.current_slide == api.options.slides.length - 1){
							vars.thumb_page = Math.floor($(vars.thumb_list).width() / vars.thumb_interval) * -vars.thumb_interval;
							if ($(vars.thumb_list).width() <= -vars.thumb_page) vars.thumb_page = vars.thumb_page + vars.thumb_interval;
							$(vars.thumb_list).stop().animate({'left': vars.thumb_page}, {duration:500, easing:'easeOutExpo'});
						} else if ($('.current-thumb').offset().left - $(vars.thumb_tray).offset().left < 0){
							if (vars.thumb_page + vars.thumb_interval > 0) return false;
	        				vars.thumb_page = vars.thumb_page + vars.thumb_interval;
	        				$(vars.thumb_list).stop().animate({'left': vars.thumb_page}, {duration:500, easing:'easeOutExpo'});
						}
					}
				}


			}

	 	},


	 	/* After Slide Transition
		----------------------------*/
	 	afterAnimation : function(){
	 		if (api.options.progress_bar && !vars.is_paused) theme.progressBar();	//  Start progress bar
	 	},


	 	/* Progress Bar
		----------------------------*/
		progressBar : function(){
    		$(vars.progress_bar).stop().css({left : -$(window).width()}).animate({ left:0 }, api.options.slide_interval);
    	}


	 };


	 /* Theme Specific Variables
	 ----------------------------*/
	 $.supersized.themeVars = {

	 	// Internal Variables
		progress_delay		:	false,				// Delay after resize before resuming slideshow
		thumb_page 			: 	false,				// Thumbnail page
		thumb_interval 		: 	false,				// Thumbnail interval
		image_path			:	'img/',				// Default image path

		// General Elements
		play_button			:	'#pauseplay',		// Play/Pause button
		next_slide			:	'#nextslide',		// Next slide button
		prev_slide			:	'#prevslide',		// Prev slide button
		next_thumb			:	'#nextthumb',		// Next slide thumb button
		prev_thumb			:	'#prevthumb',		// Prev slide thumb button

		slide_caption		:	'#slidecaption',	// Slide caption
		slide_current		:	'.slidenumber',		// Current slide number
		slide_total			:	'.totalslides',		// Total Slides
		slide_list			:	'#slide-list',		// Slide jump list

		thumb_tray			:	'#thumb-tray',		// Thumbnail tray
		thumb_list			:	'#thumb-list',		// Thumbnail list
		thumb_forward		:	'#thumb-forward',	// Cycles forward through thumbnail list
		thumb_back			:	'#thumb-back',		// Cycles backwards through thumbnail list
		tray_arrow			:	'#tray-arrow',		// Thumbnail tray button arrow
		tray_button			:	'#tray-button',		// Thumbnail tray button

		progress_bar		:	'#progress-bar'		// Progress bar

	 };

	 /* Theme Specific Options
	 ----------------------------*/
	 $.supersized.themeOptions = {

		progress_bar		:	1,		// Timer for each slide
		mouse_scrub			:	0		// Thumbnails move with mouse

	 };


})(jQuery);
;
/**
 * @file
 * Some basic behaviors and utility functions for Views.
 */
(function ($) {

  Drupal.Views = {};

  /**
   * JQuery UI tabs, Views integration component.
   */
  Drupal.behaviors.viewsTabs = {
    attach: function (context) {
      if ($.viewsUi && $.viewsUi.tabs) {
        $('#views-tabset').once('views-processed').viewsTabs({
          selectedClass: 'active'
        });
      }

      $('a.views-remove-link').once('views-processed').click(function(event) {
        var id = $(this).attr('id').replace('views-remove-link-', '');
        $('#views-row-' + id).hide();
        $('#views-removed-' + id).attr('checked', true);
        event.preventDefault();
      });
      /**
    * Here is to handle display deletion
    * (checking in the hidden checkbox and hiding out the row).
    */
      $('a.display-remove-link')
        .addClass('display-processed')
        .click(function() {
          var id = $(this).attr('id').replace('display-remove-link-', '');
          $('#display-row-' + id).hide();
          $('#display-removed-' + id).attr('checked', true);
          return false;
        });
    }
  };

  /**
 * Helper function to parse a querystring.
 */
  Drupal.Views.parseQueryString = function (query) {
    var args = {};
    var pos = query.indexOf('?');
    if (pos != -1) {
      query = query.substring(pos + 1);
    }
    var pairs = query.split('&');
    for (var i in pairs) {
      if (typeof(pairs[i]) == 'string') {
        var pair = pairs[i].split('=');
        // Ignore the 'q' path argument, if present.
        if (pair[0] != 'q' && pair[1]) {
          args[decodeURIComponent(pair[0].replace(/\+/g, ' '))] = decodeURIComponent(pair[1].replace(/\+/g, ' '));
        }
      }
    }
    return args;
  };

  /**
 * Helper function to return a view's arguments based on a path.
 */
  Drupal.Views.parseViewArgs = function (href, viewPath) {

    // Provide language prefix.
    if (Drupal.settings.pathPrefix) {
      var viewPath = Drupal.settings.pathPrefix + viewPath;
    }
    var returnObj = {};
    var path = Drupal.Views.getPath(href);
    // Ensure we have a correct path.
    if (viewPath && path.substring(0, viewPath.length + 1) == viewPath + '/') {
      var args = decodeURIComponent(path.substring(viewPath.length + 1, path.length));
      returnObj.view_args = args;
      returnObj.view_path = path;
    }
    return returnObj;
  };

  /**
 * Strip off the protocol plus domain from an href.
 */
  Drupal.Views.pathPortion = function (href) {
    // Remove e.g. http://example.com if present.
    var protocol = window.location.protocol;
    if (href.substring(0, protocol.length) == protocol) {
      // 2 is the length of the '//' that normally follows the protocol.
      href = href.substring(href.indexOf('/', protocol.length + 2));
    }
    return href;
  };

  /**
 * Return the Drupal path portion of an href.
 */
  Drupal.Views.getPath = function (href) {
    href = Drupal.Views.pathPortion(href);
    href = href.substring(Drupal.settings.basePath.length, href.length);
    // 3 is the length of the '?q=' added to the url without clean urls.
    if (href.substring(0, 3) == '?q=') {
      href = href.substring(3, href.length);
    }
    var chars = ['#', '?', '&'];
    for (var i in chars) {
      if (href.indexOf(chars[i]) > -1) {
        href = href.substr(0, href.indexOf(chars[i]));
      }
    }
    return href;
  };

})(jQuery);
;
(function ($) {

/**
 * A progressbar object. Initialized with the given id. Must be inserted into
 * the DOM afterwards through progressBar.element.
 *
 * method is the function which will perform the HTTP request to get the
 * progress bar state. Either "GET" or "POST".
 *
 * e.g. pb = new progressBar('myProgressBar');
 *      some_element.appendChild(pb.element);
 */
Drupal.progressBar = function (id, updateCallback, method, errorCallback) {
  var pb = this;
  this.id = id;
  this.method = method || 'GET';
  this.updateCallback = updateCallback;
  this.errorCallback = errorCallback;

  // The WAI-ARIA setting aria-live="polite" will announce changes after users
  // have completed their current activity and not interrupt the screen reader.
  this.element = $('<div class="progress" aria-live="polite"></div>').attr('id', id);
  this.element.html('<div class="bar"><div class="filled"></div></div>' +
                    '<div class="percentage"></div>' +
                    '<div class="message">&nbsp;</div>');
};

/**
 * Set the percentage and status message for the progressbar.
 */
Drupal.progressBar.prototype.setProgress = function (percentage, message) {
  if (percentage >= 0 && percentage <= 100) {
    $('div.filled', this.element).css('width', percentage + '%');
    $('div.percentage', this.element).html(percentage + '%');
  }
  $('div.message', this.element).html(message);
  if (this.updateCallback) {
    this.updateCallback(percentage, message, this);
  }
};

/**
 * Start monitoring progress via Ajax.
 */
Drupal.progressBar.prototype.startMonitoring = function (uri, delay) {
  this.delay = delay;
  this.uri = uri;
  this.sendPing();
};

/**
 * Stop monitoring progress via Ajax.
 */
Drupal.progressBar.prototype.stopMonitoring = function () {
  clearTimeout(this.timer);
  // This allows monitoring to be stopped from within the callback.
  this.uri = null;
};

/**
 * Request progress data from server.
 */
Drupal.progressBar.prototype.sendPing = function () {
  if (this.timer) {
    clearTimeout(this.timer);
  }
  if (this.uri) {
    var pb = this;
    // When doing a post request, you need non-null data. Otherwise a
    // HTTP 411 or HTTP 406 (with Apache mod_security) error may result.
    $.ajax({
      type: this.method,
      url: this.uri,
      data: '',
      dataType: 'json',
      success: function (progress) {
        // Display errors.
        if (progress.status == 0) {
          pb.displayError(progress.data);
          return;
        }
        // Update display.
        pb.setProgress(progress.percentage, progress.message);
        // Schedule next timer.
        pb.timer = setTimeout(function () { pb.sendPing(); }, pb.delay);
      },
      error: function (xmlhttp) {
        pb.displayError(Drupal.ajaxError(xmlhttp, pb.uri));
      }
    });
  }
};

/**
 * Display errors on the page.
 */
Drupal.progressBar.prototype.displayError = function (string) {
  var error = $('<div class="messages error"></div>').html(string);
  $(this.element).before(error).hide();

  if (this.errorCallback) {
    this.errorCallback(this);
  }
};

})(jQuery);
;
/*!
 * enquire.js v2.1.0 - Awesome Media Queries in JavaScript
 * Copyright (c) 2014 Nick Williams - http://wicky.nillia.ms/enquire.js
 * License: MIT (http://www.opensource.org/licenses/mit-license.php)
 */

!function(a,b,c){var d=window.matchMedia;"undefined"!=typeof module&&module.exports?module.exports=c(d):"function"==typeof define&&define.amd?define(function(){return b[a]=c(d)}):b[a]=c(d)}("enquire",this,function(a){"use strict";function b(a,b){var c,d=0,e=a.length;for(d;e>d&&(c=b(a[d],d),c!==!1);d++);}function c(a){return"[object Array]"===Object.prototype.toString.apply(a)}function d(a){return"function"==typeof a}function e(a){this.options=a,!a.deferSetup&&this.setup()}function f(b,c){this.query=b,this.isUnconditional=c,this.handlers=[],this.mql=a(b);var d=this;this.listener=function(a){d.mql=a,d.assess()},this.mql.addListener(this.listener)}function g(){if(!a)throw new Error("matchMedia not present, legacy browsers require a polyfill");this.queries={},this.browserIsIncapable=!a("only all").matches}return e.prototype={setup:function(){this.options.setup&&this.options.setup(),this.initialised=!0},on:function(){!this.initialised&&this.setup(),this.options.match&&this.options.match()},off:function(){this.options.unmatch&&this.options.unmatch()},destroy:function(){this.options.destroy?this.options.destroy():this.off()},equals:function(a){return this.options===a||this.options.match===a}},f.prototype={addHandler:function(a){var b=new e(a);this.handlers.push(b),this.matches()&&b.on()},removeHandler:function(a){var c=this.handlers;b(c,function(b,d){return b.equals(a)?(b.destroy(),!c.splice(d,1)):void 0})},matches:function(){return this.mql.matches||this.isUnconditional},clear:function(){b(this.handlers,function(a){a.destroy()}),this.mql.removeListener(this.listener),this.handlers.length=0},assess:function(){var a=this.matches()?"on":"off";b(this.handlers,function(b){b[a]()})}},g.prototype={register:function(a,e,g){var h=this.queries,i=g&&this.browserIsIncapable;return h[a]||(h[a]=new f(a,i)),d(e)&&(e={match:e}),c(e)||(e=[e]),b(e,function(b){h[a].addHandler(b)}),this},unregister:function(a,b){var c=this.queries[a];return c&&(b?c.removeHandler(b):(c.clear(),delete this.queries[a])),this}},new g});;
!function(a,b){"use strict";b.behaviors.slick={attach:function(b,c){var d=this;a(".slick",b).once("slick",function(){var e,b=this,f=a("> .slick__slider",b).length?a("> .slick__slider",b):a(b),g=a("> .slick__arrow",b),h=a.extend({},c.slick,f.data("slick"));if("array"===a.type(h.responsive)&&h.responsive.length)for(e in h.responsive)h.responsive.hasOwnProperty(e)&&"unslick"!==h.responsive[e].settings&&(h.responsive[e].settings=a.extend({},c.slick,d.globals(f,g,h),h.responsive[e].settings));f.data("slick",h),h=f.data("slick")||{},d.beforeSlick(f,g,h),f.slick(d.globals(f,g,h)),d.afterSlick(f,h),f.hasClass("unslick")?(f.slick("unslick"),a(".slide",f).removeClass("slide--loading")):a(b).addClass("slick--initialized")})},beforeSlick:function(b,c,d){var e=this,f=a(".slide--0 .media--ratio",b);e.randomize(b,d),f.length&&f.is(":hidden")&&f.removeClass("media--ratio").addClass("js-media--ratio"),b.on("setPosition.slick",function(a,f){e.setPosition(b,c,d,f)}),a(".media--loading",b).closest(".slide").addClass("slide--loading"),b.on("lazyLoaded lazyLoadError",function(a,b,c,d){e.setBackground(c)})},afterSlick:function(b,c){var d=this,e=b.slick("getSlick"),f=a(".js-media--ratio",b);b.parent().on("click.slick.load",".slick-down",function(b){b.preventDefault();var d=a(this);a("html, body").stop().animate({scrollTop:a(d.data("target")).offset().top-(d.data("offset")||0)},800,c.easing)}),c.mousewheel&&b.on("mousewheel.slick.load",function(a,c){return a.preventDefault(),c<0?b.slick("slickNext"):b.slick("slickPrev")}),f.length&&(b.trigger("resize"),f.addClass("media--ratio").removeClass("js-media--ratio")),b.trigger("afterSlick",[d,e,e.currentSlide])},setBackground:function(b,c){var d=a(b),e=d.closest(".media--background");d.closest(".media").removeClass("media--loading").addClass("media--loaded"),d.closest(".slide--loading").removeClass("slide--loading"),e.length&&(e.css("background-image","url("+d.attr("src")+")"),e.find("> img").remove(),e.removeAttr("data-lazy"))},randomize:function(a,b){b.randomize&&!a.hasClass("slick-initiliazed")&&a.children().sort(function(){return.5-Math.random()}).each(function(){a.append(this)})},setPosition:function(a,b,c,d){var e=d.slideCount<=c.slidesToShow;if(a.attr("id")===d.$slider.attr("id"))return c.centerPadding&&"0"!==c.centerPadding||d.$list.css("padding",""),e&&d.$slideTrack.width()<=d.$slider.width()&&d.$slideTrack.css({left:"",transform:""}),e||c.arrows===!1?b.addClass("element-hidden"):b.removeClass("element-hidden")},globals:function(c,d,e){return{slide:e.slide,lazyLoad:e.lazyLoad,dotsClass:e.dotsClass,rtl:e.rtl,appendDots:".slick__arrow"===e.appendDots?d:e.appendDots||a(c),prevArrow:a(".slick-prev",d),nextArrow:a(".slick-next",d),appendArrows:d,customPaging:function(a,c){var d=a.$slides.eq(c).find("[data-thumb]")||null,f=b.t(d.attr("alt"))||"",g="<img alt='"+f+"' src='"+d.data("thumb")+"'>",h=d.length&&e.dotsClass.indexOf("thumbnail")>0?"<div class='slick-dots__thumbnail'>"+g+"</div>":"";return a.defaults.customPaging(a,c).add(h)}}}}}(jQuery,Drupal);
;
(function ($) {
  Drupal.behaviors.breakpoint_panels = {

    attach: function (context) {
      /**
       * Initializes breakpoint panels listeners and handling.
       */

      // If no breakpoints found, then these are not the droids you're looking for, move along.
      if (
        Drupal.settings.breakpoint_panels_breakpoint['breakpoints'] == 'undefined'
        || Drupal.settings.breakpoint_panels_breakpoint['breakpoints']['hasEnquire'] == false
      ) {
        return;
      }
      var settings = Drupal.settings.breakpoint_panels_breakpoint;
      var breakpoints = settings['breakpoints'];

      var that = this;

      // Setup the toggle responsive handlers for use in enquire.js.
      // These are required or an unregister call will blow away handles that are still needed.
      for (var breakpoint in breakpoints) {
        var css = breakpoints[breakpoint]['css'];
        Drupal.settings.breakpoint_panels_breakpoint['breakpoints'][breakpoint]['toggle_handler'] = {
          match: function () {
            if($('.panels-ipe-editing').length < 1) {
              $('.hide-' + css).hide();
            }
          },
          unmatch: function () {
            if($('.panels-ipe-editing').length < 1) {
              $('.hide-' + css).show();
            }
          }
        };
      }

      // Check to see if an admin is using the IPE.
      $('#panels-ipe-customize-page').click(function (context) {
        that.checkForEditing();
      });

      // Update the window dimensions on each resize.
      $(window).resize(function () {
        that.onResize();
      });

      // Do a first manual update to catch the current window dimensions.
      this.onResize();

      // For each AJAX pane check if it should be loaded and register enquire match.
      $('.bp-ajax-pane').each(function () {
        var element = $(this);

        // Kick the hide-* styles up the the .panel-pane to make sure any styles applied to the pane
        // do not still show even if the contents are just a placeholder.
        var parent_classes = element.parent().attr('class').split(/\s+/);
        var pane_ancestor = element.closest('.panel-pane');
        var ipe_ancestor = element.closest('.panels-ipe-portlet-wrapper');
        if (parent_classes.length) {
          for (var style in parent_classes) {
            element.removeClass(parent_classes[style]);
            pane_ancestor.addClass(parent_classes[style]);
            ipe_ancestor.addClass('ipe-' + parent_classes[style]);
          }
        }

        // Setup the enquire.js AJAX loading based on breakpoints.
        var url = element.attr('data-src');
        that.checkForLoad(url, element);
      });

    },

    onResize: function () {
      /**
       * Updates the objects height/width and checks if reloading of the page is required.
       */

      if (this.width && this.height) {
        this.checkForReload();
      }
      var $window = $(window);
      this.width = $window.width();
      this.height = $window.height()

    },

    checkForReload: function () {
      /**
       * If auto loading is enabled in the Breakpoint Panels configuration, then this
       * method will check if the page needs to be reloaded on a resize.
       * This is generally for development purposes.
       */

      var settings = Drupal.settings.breakpoint_panels_breakpoint;
      var breakpoints = settings['breakpoints'];

      if (!(settings['autoload'])) {
        return;
      }

      var $window = $(window);
      for (var breakpoint in breakpoints) {
        for (var key in breakpoints[breakpoint]) {
          // Skip any non-dimensional properties.
          if (key == 'bp' || key == 'css' || key == 'toggle_handler') {
            continue;
          }

          var value = breakpoints[breakpoint][key];

          // If the result changes, the condition has changed, so we need
          // to reload.
          var now = this.checkCondition(key, value, $window.width(), $window.height());
          var before = this.checkCondition(key, value, this.width, this.height);

          if (now !== before) {
            window.location.reload(true);

            // FF prevents reload in onRsize event, so we need to do it
            // in a timeout. See issue #1859058
            if ('mozilla' in $.browser) {
              setTimeout(function () {
                window.location.reload(true);
              }, 10);
            }
            return;
          }
        }
      }

    },

    checkCondition: function (condition, value, width, height) {
      /**
       * Used to check if a media query condition is met.
       */

      var flag = null;

      switch (condition) {
        case 'width':
          flag = width === value;
          break;

        case 'min-width':
          flag = width >= value;
          break;

        case 'max-width':
          flag = width <= value;
          break;

        case 'height':
          flag = height === value;
          break;

        case 'min-height':
          flag = height >= value;
          break;

        case 'max-height':
          flag = height <= value;
          break;

        case 'aspect-ratio':
          flag = width / height === value;
          break;

        case 'min-aspect-ratio':
          flag = width / height >= value;
          break;

        case 'max-aspect-ratio':
          flag = width / height <= value;
          break;

        default:
          break;
      }

      return flag;

    },

    checkForLoad: function (url, element) {
      /**
       * Checks if a pane should be loaded given the current screen size.
       */

      var settings = Drupal.settings.breakpoint_panels_breakpoint;
      var breakpoints = settings['breakpoints'];

      var parent_el = element.parent();
      // var this_shown = false;
      for (var breakpoint in breakpoints) {
       // var cur_bp = settings['breakpoints'][key];
        if (
          !parent_el.hasClass('hide-' + breakpoints[breakpoint]['css'])
          || settings['loadhidden']
          || (settings['adminload'] && settings['isloggedin'])
        ) {
          if (settings['hasEnquire']) {
            var that = this;
            // If at any point the media query is met, make sure the pane contents are loaded via AJAX.
            enquire.register(breakpoints[breakpoint]['bp'], {
              match: function () {
                that.fetch_pane(url, element);
              }
            });
          }
          else {
            // Fallback pseudo-gracefully if enquire.js was not found.
            this.fetch_pane(url, element);
          }
        }
      }

    },

    checkForEditing: function (x) {
      /**
       * Set up the breakpoint panels editing within IPE.
       */

      // Check if the IPE save button is there.
      x = (x) ? x : 0;
      var that = this;
      if ($('#panels-ipe-save').length < 1) {
        // Nope, wait more and try a few more times for good measure.
        x++;
        if (x < 10) {
          setTimeout(function () {
            that.checkForEditing(x);
          }, 500);
        }
        return;
      }

      var settings = Drupal.settings.breakpoint_panels_breakpoint;
      var breakpoints = settings['breakpoints'];

      // Setup the toggle responsive button.
      if ($('.toggleResponsive').length < 1) {
        $('#panels-ipe-edit-control-form div').prepend("<div class='toggleResponsive icon-large icon-eye-open'>Toggle Responsive</div>");
        $('.toggleResponsive').click(function () {
          if (!$(this).hasClass('active')) {

            for (var breakpoint_r in breakpoints) {
              if (settings['hasEnquire'] == true) {
                enquire.register(breakpoints[breakpoint_r]['bp'], breakpoints[breakpoint_r]['toggle_handler']);
              }
            }

            $(this).addClass('active icon-eye-close');
            $(this).removeClass('icon-eye-open');
            $('.panels-ipe-editing').addClass('hide-responsive');
          }
          else {
            for (var breakpoint_u in breakpoints) {
              // $('.hide-' + breakpoints[breakpoint_u]['css']).show();
              if (settings['hasEnquire'] == true) {
                enquire.unregister(breakpoints[breakpoint_u]['bp'], breakpoints[breakpoint_u]['toggle_handler']);
              }
            }

            $(this).removeClass('active icon-eye-close');
            $(this).addClass('icon-eye-open');
            $('.panels-ipe-editing').removeClass('hide-responsive');
          }
        });
      }

    },

    fetch_pane: function (url, element) {
      /**
       * Does an AJAX request for the pane contents if it has not yet been loaded.
       */
      if (!element.hasClass('processed')) {
        var element_settings = {};
        element_settings.progress = {};
        element_settings.url = url + '/' + element.attr('id');
        element_settings.event = 'click';
        var base = element.attr('id');
        var ajax = new Drupal.ajax(base, element, element_settings);
        ajax.eventResponse(element, 'click');
        element.addClass('processed');
      }

    }

  };

})(jQuery);
;
/*! matchMedia() polyfill addListener/removeListener extension. Author & copyright (c) 2012: Scott Jehl. Dual MIT/BSD license */
(function(){
    // Bail out for browsers that have addListener support
    if (window.matchMedia && window.matchMedia('all').addListener) {
        return false;
    }

    var localMatchMedia = window.matchMedia,
        hasMediaQueries = localMatchMedia('only all').matches,
        isListening     = false,
        timeoutID       = 0,    // setTimeout for debouncing 'handleChange'
        queries         = [],   // Contains each 'mql' and associated 'listeners' if 'addListener' is used
        handleChange    = function(evt) {
            // Debounce
            clearTimeout(timeoutID);

            timeoutID = setTimeout(function() {
                for (var i = 0, il = queries.length; i < il; i++) {
                    var mql         = queries[i].mql,
                        listeners   = queries[i].listeners || [],
                        matches     = localMatchMedia(mql.media).matches;

                    // Update mql.matches value and call listeners
                    // Fire listeners only if transitioning to or from matched state
                    if (matches !== mql.matches) {
                        mql.matches = matches;

                        for (var j = 0, jl = listeners.length; j < jl; j++) {
                            listeners[j].call(window, mql);
                        }
                    }
                }
            }, 30);
        };

    window.matchMedia = function(media) {
        var mql         = localMatchMedia(media),
            listeners   = [],
            index       = 0;

        mql.addListener = function(listener) {
            // Changes would not occur to css media type so return now (Affects IE <= 8)
            if (!hasMediaQueries) {
                return;
            }

            // Set up 'resize' listener for browsers that support CSS3 media queries (Not for IE <= 8)
            // There should only ever be 1 resize listener running for performance
            if (!isListening) {
                isListening = true;
                window.addEventListener('resize', handleChange, true);
            }

            // Push object only if it has not been pushed already
            if (index === 0) {
                index = queries.push({
                    mql         : mql,
                    listeners   : listeners
                });
            }

            listeners.push(listener);
        };

        mql.removeListener = function(listener) {
            for (var i = 0, il = listeners.length; i < il; i++){
                if (listeners[i] === listener){
                    listeners.splice(i, 1);
                }
            }
        };

        return mql;
    };
}());
;
/*! matchMedia() polyfill - Test a CSS media type/query in JS. Authors & copyright (c) 2012: Scott Jehl, Paul Irish, Nicholas Zakas, David Knight. Dual MIT/BSD license */

window.matchMedia || (window.matchMedia = function() {
    "use strict";

    // For browsers that support matchMedium api such as IE 9 and webkit
    var styleMedia = (window.styleMedia || window.media);

    // For those that don't support matchMedium
    if (!styleMedia) {
        var style       = document.createElement('style'),
            script      = document.getElementsByTagName('script')[0],
            info        = null;

        style.type  = 'text/css';
        style.id    = 'matchmediajs-test';

        script.parentNode.insertBefore(style, script);

        // 'style.currentStyle' is used by IE <= 8 and 'window.getComputedStyle' for all other browsers
        info = ('getComputedStyle' in window) && window.getComputedStyle(style, null) || style.currentStyle;

        styleMedia = {
            matchMedium: function(media) {
                var text = '@media ' + media + '{ #matchmediajs-test { width: 1px; } }';

                // 'style.styleSheet' is used by IE <= 8 and 'style.textContent' for all other browsers
                if (style.styleSheet) {
                    style.styleSheet.cssText = text;
                } else {
                    style.textContent = text;
                }

                // Test if media query is true or false
                return info.width === '1px';
            }
        };
    }

    return function(media) {
        return {
            matches: styleMedia.matchMedium(media || 'all'),
            media: media || 'all'
        };
    };
}());
;
/**
 * @file
 * Handles AJAX fetching of views, including filter submission and response.
 */
(function ($) {

  /**
   * Attaches the AJAX behavior to exposed filter forms and key views links.
   */
  Drupal.behaviors.ViewsAjaxView = {};
  Drupal.behaviors.ViewsAjaxView.attach = function() {
    if (Drupal.settings && Drupal.settings.views && Drupal.settings.views.ajaxViews) {
      $.each(Drupal.settings.views.ajaxViews, function(i, settings) {
        Drupal.views.instances[i] = new Drupal.views.ajaxView(settings);
      });
    }
  };

  Drupal.views = {};
  Drupal.views.instances = {};

  /**
   * Javascript object for a certain view.
   */
  Drupal.views.ajaxView = function(settings) {
    var selector = '.view-dom-id-' + settings.view_dom_id;
    this.$view = $(selector);

    // Retrieve the path to use for views' ajax.
    var ajax_path = Drupal.settings.views.ajax_path;

    // If there are multiple views this might've ended up showing up multiple
    // times.
    if (ajax_path.constructor.toString().indexOf("Array") != -1) {
      ajax_path = ajax_path[0];
    }

    // Check if there are any GET parameters to send to views.
    var queryString = window.location.search || '';
    if (queryString !== '') {
      // Remove the question mark and Drupal path component if any.
      var queryString = queryString.slice(1).replace(/q=[^&]+&?|&?render=[^&]+/, '');
      if (queryString !== '') {
        // If there is a '?' in ajax_path, clean url are on and & should be
        // used to add parameters.
        queryString = ((/\?/.test(ajax_path)) ? '&' : '?') + queryString;
      }
    }

    this.element_settings = {
      url: ajax_path + queryString,
      submit: settings,
      setClick: true,
      event: 'click',
      selector: selector,
      progress: {
        type: 'throbber'
      }
    };

    this.settings = settings;

    // Add the ajax to exposed forms.
    this.$exposed_form = $('#views-exposed-form-' + settings.view_name.replace(/_/g, '-') + '-' + settings.view_display_id.replace(/_/g, '-'));
    this.$exposed_form.once(jQuery.proxy(this.attachExposedFormAjax, this));

    // Store Drupal.ajax objects here for all pager links.
    this.links = [];

    // Add the ajax to pagers.
    this.$view
    // Don't attach to nested views. Doing so would attach multiple behaviors
    // to a given element.
      .filter(jQuery.proxy(this.filterNestedViews, this))
      .once(jQuery.proxy(this.attachPagerAjax, this));

    // Add a trigger to update this view specifically. In order to trigger a
    // refresh use the following code.
    //
    // @code
    // jQuery('.view-name').trigger('RefreshView');
    // @endcode
    // Add a trigger to update this view specifically.
    var self_settings = this.element_settings;
    self_settings.event = 'RefreshView';
    this.refreshViewAjax = new Drupal.ajax(this.selector, this.$view, self_settings);
  };

  Drupal.views.ajaxView.prototype.attachExposedFormAjax = function() {
    var button = $('input[type=submit], button[type=submit], input[type=image]', this.$exposed_form);
    button = button[0];

    // Call the autocomplete submit before doing AJAX.
    $(button).click(function () {
      if (Drupal.autocompleteSubmit) {
        Drupal.autocompleteSubmit();
      }
    });

    this.exposedFormAjax = new Drupal.ajax($(button).attr('id'), button, this.element_settings);
  };

  Drupal.views.ajaxView.prototype.filterNestedViews = function() {
    // If there is at least one parent with a view class, this view
    // is nested (e.g., an attachment). Bail.
    return !this.$view.parents('.view').length;
  };

  /**
   * Attach the ajax behavior to each link.
   */
  Drupal.views.ajaxView.prototype.attachPagerAjax = function() {
    this.$view.find('ul.pager > li > a, th.views-field a, .attachment .views-summary a')
      .each(jQuery.proxy(this.attachPagerLinkAjax, this));
  };

  /**
   * Attach the ajax behavior to a singe link.
   */
  Drupal.views.ajaxView.prototype.attachPagerLinkAjax = function(id, link) {
    var $link = $(link);
    var viewData = {};
    var href = $link.attr('href');
    // Construct an object using the settings defaults and then overriding
    // with data specific to the link.
    $.extend(
    viewData,
    this.settings,
    Drupal.Views.parseQueryString(href),
    // Extract argument data from the URL.
    Drupal.Views.parseViewArgs(href, this.settings.view_base_path)
    );

    // For anchor tags, these will go to the target of the anchor rather
    // than the usual location.
    $.extend(viewData, Drupal.Views.parseViewArgs(href, this.settings.view_base_path));

    this.element_settings.submit = viewData;
    this.pagerAjax = new Drupal.ajax(false, $link, this.element_settings);
    this.links.push(this.pagerAjax);
  };

  Drupal.ajax.prototype.commands.viewsScrollTop = function (ajax, response, status) {
    // Scroll to the top of the view. This will allow users
    // to browse newly loaded content after e.g. clicking a pager
    // link.
    var offset = $(response.selector).offset();
    // We can't guarantee that the scrollable object should be
    // the body, as the view could be embedded in something
    // more complex such as a modal popup. Recurse up the DOM
    // and scroll the first element that has a non-zero top.
    var scrollTarget = response.selector;
    while ($(scrollTarget).scrollTop() == 0 && $(scrollTarget).parent()) {
      scrollTarget = $(scrollTarget).parent();
    }
    // Only scroll upward.
    if (offset.top - 10 < $(scrollTarget).scrollTop()) {
      $(scrollTarget).animate({scrollTop: (offset.top - 10)}, 500);
    }
  };

})(jQuery);
;
