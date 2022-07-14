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
(function ($) {

  /**
   * Recent Activity Panes Initialization
   *
   * Add an attach method for the module in the Drupal behaviors. Initialize each recent
   * activity pane found on the page.
   */
  Drupal.behaviors.recent_activity = {
    attach: function(context, settings) {
      $('.recent-activity-pane').each(function() {

        var pane_section = $(this);

        var rc_pane = new RecentAcivityPane(pane_section);

        rc_pane.register_filters();

        rc_pane.register_load_more();

        // todo: look into why filter clicks fire twice after you edit the page in IPE,
        // doesn't happen for visitors or before you click customize page as admin.
        $(this).attr('data-init', 1);

      });
    }
  };

  /**
   * Recent Activity Pane Object
   *
   * Custom object constructor for the recent activity panes. Controls the functionality of
   * the panes including filtering and loading more.
   *
   * @param pane_section
   * @constructor
   */
  function RecentAcivityPane(pane_section) {
    this.id = pane_section.attr('id');
    this.uid = pane_section.attr('data-uid');
    this.conf = Drupal.settings['recent_activity-' + this.uid];
    this.request_url = Drupal.settings.basePath + 'recent_activity_fetch';
    this.filters = {};
    this.load_more_orig_html = '';

    // Setup the AJAX request queue. This will allow for ordered delayed processing of requests if
    // they are requested before another request has finished.
    this.queue = new RecentActivityRequestQueue(RecentActivityRequestHandler);

    /**
     * Register Filters
     *
     * Checks for any filters and stores data on them with the object for easy access.
     * Also sets up the button click events.
     */
    this.register_filters = function() {
      if (this.filters) {
        var that = this;
        $('#' + that.id).find('.filter-wrapper ul').each(function() {
          var type = $(this).attr('data-filter');
          var filter_info = {
            'id': $(this).attr('id'),
            'type': type,
            'filter_data': $(this).attr('data-filter-data'),
            'cur_value': ''
          };
          that.filters[type] = filter_info;
          $(this).find('li').each(function() {
            $(this).bind('click touchend', function() {
              that.set_filters(filter_info, $(this).attr('data-opt'));
            });
          });
        });
      }
      else {
        $('#' + this.id).find('.filter-wrapper').hide();
      }
    };

    /**
     * Register Load More
     *
     * Sets up the load more click event.
     */
    this.register_load_more = function() {
      if (this.conf['allow_load_more']) {
        var that = this;
        $('#' + that.id).find('.load-more-wrap button:not(.processed)').bind('click touchend', function(e) {
          e.preventDefault();
          e.stopPropagation();
          that.load_more();
        });
        $('#' + that.id).find('.load-more-wrap button:not(.processed)').addClass('processed');
      }
      else {
        $('#' + this.id).find('.load-more-wrap').hide();
      }
    };

    /**
     * Load More
     *
     * Lines up an ajax request for additional nodes.
     */
    this.load_more = function() {
      // Set the loading indicator in the load more button.
      var load_more_btn = $('#' + this.id).find('.load-more-wrap button');
      this.load_more_orig_html = load_more_btn.html();
      if (load_more_btn.html() == 'Loading...') {
        return;
      }
      load_more_btn.html('Loading...');

      var data = {
        action: 'load_more',
        filters: this.filters,
        uid: this.uid,
        conf: this.conf,
        offset: this.conf['offset']
      };

      // Queue a request.
      var load_more_request = new RecentActivityRequest(
        this.request_url,
        data,
        this.load_more_callback,      // Set the callback to execute after the AJAX completes.
        this                           // The object creating the request for use as the context.
      );

      this.queue.append(load_more_request);
    }

    /**
     * Load More Callback
     *
     * After a load more AJAX call is complete, this code should be executed.
     *
     * @param response
     * @param calling_obj
     */
    this.load_more_callback = function(response, calling_obj) {
      calling_obj.conf['offset'] += response.nodes.length;

      calling_obj.update_display(response.nodes, 'append', calling_obj);

      // Set the load more button back to normal.
      var load_more_btn = $('#' + calling_obj.id).find('.load-more-wrap button');
      load_more_btn.html(calling_obj.load_more_orig_html);

      recent_activity_init_slideshows();
    }

    /**
     * Set Active Filter
     *
     * Finds the associated ul for a filter, clears the active class, then adds it for the
     * value that is currently selected.
     *
     * @param filter_info
     * @param value
     */
    this.set_active_filter = function(filter_info, value) {
      $('#' + filter_info['id'] + ' li').removeClass('active');
      $('#' + filter_info['id'] + " li[data-opt='" + value + "']").addClass('active');
      if (value == 'not_set') {
        value = '';
      }
      this.filters[filter_info['type']]['cur_value'] = value;
    }

    /**
     * Set Filters
     *
     * Checks for any filtering that has been set/unset and updates the results
     * to reflect any changes.
     *
     * @param filter_info
     * @param value
     */
    this.set_filters = function(filter_info, value) {
      this.set_active_filter(filter_info, value);

      // Set the loading indicator in the filter.
      $('#' + filter_info['id']).addClass('loading');

      var data = {
        action: 'filter',
        filters: this.filters,
        uid: this.uid,
        conf: this.conf,
        offset: 0
      };

      // Queue a request. Telling it to clear the current offset.
      var filter_request = new RecentActivityRequest(
        this.request_url,
        data,
        this.set_filters_callback,      // Set the callback to execute after the AJAX completes.
        this                           // The object creating the request for use as the context.
      );

      this.queue.append(filter_request);
    };

    /**
     * Set Filters Callback
     *
     * After a set filter AJAX call is complete, this code should be executed.
     *
     * @param response
     * @param calling_obj
     */
    this.set_filters_callback = function(response, calling_obj) {
      calling_obj.conf['offset'] = response.nodes.length;
      calling_obj.conf['total'] = response['total_rows'];

      calling_obj.update_display(response.nodes, 'reset', calling_obj);

      // Turn off the loading indicator in the filters.
      $('#' + calling_obj.id + ' .filter-wrapper ul').removeClass('loading');

      recent_activity_init_slideshows();
    }

    /**
     * Update Display
     *
     * After an ajax call this will update the display of the pane by either swapping
     * out the nodes, or appending them to across each column.
     *
     * @param nodes
     * @param action
     * @param calling_obj
     */
    this.update_display = function(nodes, action, calling_obj) {
      // When filters are set, clear out all of the old nodes.
      var target = $('#ajax-area-wrapper-' + calling_obj['uid']);
      var load_more_btn = $('#load-more-' + calling_obj['uid']);

      // Initialize the columns.
      var cur_ix = 0;
      var cols = new Array();
      for (var i = 0; i < calling_obj.conf['num_columns']; i++) {
        cols[i] = '';
      }

      // Loop through all nodes assigning them to a column.
      for (var node_ix in nodes) {
        if (cur_ix >= calling_obj.conf['num_columns']) {
          cur_ix = 0;
        }
        cols[cur_ix] += nodes[node_ix];
        cur_ix++;
      }

      // Loop through each column and either replace it's content or append the new nodes depending on if it was a
      // filter or a load more click.
      var col_count = 0;
      // if mobile display, append to last column only
      if (target.find('ul:first').css('float') == 'none') {
        if (action == 'append') {
          target.find('ul.last').append(cols[0] + cols[1]);
        }
      }
      else { // add to both columns
        target.find('ul').each(function() {
          if (action == 'reset') {
            $(this).html(cols[col_count]);
          }
          else if (action == 'append') {
            $(this).html($(this).html() + cols[col_count]);
          }
          col_count += 1;
        });
      }

      // Show or hide the load more button as needed.
      if (calling_obj.conf['allow_load_more'] && load_more_btn && (calling_obj.conf['total'] > calling_obj.conf['offset'])) {
        load_more_btn.show();
      }
      else {
        load_more_btn.hide();
      }

    }
  }


  /**
   * Request Object
   *
   * Instantiated and passed by the RecentActivityPane to its RecentActivityRequestHandler object.
   * These objects can be queued for processing AJAX requests allowing for ordered delayed processing
   * of requests if an existing request has not yet completed.
   *
   * @param data
   * @param success_callback
   * @param calling_obj
   * @constructor
   */
  function RecentActivityRequest(url, data, success_callback, calling_obj) {

    // Translate the arguments into properties.
    this.url = url;
    this.data = data;
    this.calling_obj = calling_obj;

    // Set the optional callback to use upon success if provided.
    this.success_callback = false;
    if (typeof success_callback === 'function') {
      this.success_callback = success_callback;
    }

  }

  /**
   * Request Handler
   *
   * Does an AJAX request for additional or filtered results.
   *
   * Will call a callback upon success if defined in the request argument, this will typically be
   * the processing of the results returned from the AJAX call.
   *
   * Will call a callback after completion if passed as the callback argument, this will typically
   * be a request that was requested before a previous one had finished.
   *
   * @param request
   * @param callback
   * @constructor
   */
  function RecentActivityRequestHandler(request, callback) {
    // Do the AJAX call and call the success callback if set.
    $.ajax({
      type: 'POST',
      url: request.url,
      context: request.calling_obj,
      dataType: 'json',
      data: request.data,
      success: function(response) {
        // If a success callback was defined, call it now.
        if (request.success_callback) {
          request.success_callback(response, this);
        }
      }
    }).done(function() {
        // If another request is queued, run again.
        if (callback) {
          callback();
        }
      });

  }

  /**
   * Request Queue
   *
   * Used to place AJAX requests into an ordered queue for processing in the case where
   * requests come in before a previous one has completed.
   *
   * @param handler
   * @constructor
   */
  function RecentActivityRequestQueue(handler) {

    // Initiate an empty queue.
    this.queue = [];

    // Define a function that can call itself as a callback.
    function run(that) {
      // Callback is itself if the queue is not empty.
      var callback = function () {
        // Ditch the previous oldest request, no longer needed.
        that.queue.shift();
        if (that.queue.length > 0) {
          run(that);
        }
      };

      // Send the oldest request in the queue to the handler.
      // Do not shift it here or it will get out of order after waiting for AJAX load times.
      handler(that.queue[0], callback);
    }

    // Method for pushing new requests into the queue.
    this.append = function(request) {
      this.queue.push(request);
      // If this is the only item in the queue, then run.
      if (this.queue.length === 1) {
        var that = this;
        run(that);
      }
    }

  }


  /**
   * Re-Initialize all slideshows. Needs to happen to content loaded via ajax.
   *
   * This pulled from the old dc_latest_blocks/dc_latest_blocks.js
   */
  function recent_activity_init_slideshows() {
    //Re-init slideshows on ajax load
    var slideshowNum = 1;
    $('.field-slideshow').each(function() {
      $caro = $('.field-slideshow-carousel', $(this).parent());
      $caro.attr('id','field-slideshow-' + slideshowNum + '-carousel').parent()
        .attr('id','field-slideshow-' + slideshowNum + '-carousel-wrapper');
      $(this).parent().attr('id','field-slideshow-' + slideshowNum + '-wrapper');
      $main = $(this);
      var tmp = $main.attr("class").split(" ");
      var l = tmp.length;
      var classes = new Array();
      for (var i = 0; i < l; i++) {
        if (tmp[i].indexOf("field-slideshow-") == -1) {
          classes.push(tmp[i]);
        }
      }
      $main.removeClass();
      $main.attr("class", classes.join(" "));

      $main.addClass('field-slideshow-' + slideshowNum);

      $('.field-slideshow-pager',$(this).parent()).attr('id','field-slideshow-' + slideshowNum + '-pager');
      slideshowNum++;
    });
    var slideshowNum = 1;
    $('.field-slideshow').each(function() {
      var i = 'field-slideshow-' + slideshowNum;
      var settings = "";
      // if(Drupal.settings.field_slideshow) {
      //   if (Drupal.settings.field_slideshow[slideshowNum-1]) {
      //     settings = Drupal.settings.field_slideshow[slideshowNum-1];
      //   } else if(Drupal.settings.field_slideshow[0]) {
      //     settings = Drupal.settings.field_slideshow[0];
      //   }
      // }
      if (settings=="") {
        settings = {"fx":"fade","speed":"1000","timeout":"10000","pause":1,"start_on_hover":0,"carousel_visible":"6","carousel_scroll":"6","carousel_speed":"500","carousel_vertical":0,"carousel_circular":0,"carousel_follow":1,"carousel_skin":"","pager":"carousel","controls":[]};
      }
      // var settings = Drupal.settings.field_slideshow[slideshowNum-1],
      slideshow = $('div.' + i),
        num_slides = slideshow.children().length,
        $this = false;


      if (!slideshow.hasClass('field-slideshow-processed')) {
        slideshow.addClass('field-slideshow-processed');

        // Add padding if needed
        var max_outerWidth = 0;
        var max_outerHeight = 0;
        $('.field-slideshow-slide img', slideshow).each(function() {
          $this = $(this);
          max_outerWidth = Math.max(max_outerWidth, $this.outerWidth(true));
          max_outerHeight = Math.max(max_outerHeight, $this.outerHeight(true));
        });
        $('.field-slideshow-slide a', slideshow).each(function() {
          $this = $(this);
          max_outerWidth = Math.max(max_outerWidth, $this.outerWidth(true));
          max_outerHeight = Math.max(max_outerHeight, $this.outerHeight(true));
        });
        $('.field-slideshow-slide', slideshow).each(function() {
          $this = $(this);
          max_outerWidth = Math.max(max_outerWidth, $this.outerWidth(true));
          max_outerHeight = Math.max(max_outerHeight, $this.outerHeight(true));
        });
        slideshow.css({
          'padding-right': (max_outerWidth - parseInt(slideshow.css('width'))) + 'px',
          'padding-bottom': (max_outerHeight - parseInt(slideshow.css('height'))) + 'px'
        });

        // Add options
        var options = {
          resizing: 0,
          fx: settings.fx,
          speed: settings.speed,
          timeout: parseInt(settings.timeout),
          index: i,
          settings: settings
        }

        if (settings.speed == "0" && settings.timeout == "0") options.fastOnEvent = true;
        if (settings.controls) {
          options.prev = "#" + i + "-controls .prev";
          options.next = "#" + i + "-controls .next";
        }
        if (settings.pause) options.pause = true;

        if (settings.pager != '') {
          if (settings.pager == 'number' || settings.pager == 'image') options.pager = "#" + i + "-pager";
          if ((settings.pager == 'image' || settings.pager == 'carousel') && num_slides > 1) {
            options.pagerAnchorBuilder = function(idx, slide) {
              return '#' + i + '-pager li:eq(' + idx + ') a';
            };
            if (settings.pager == 'carousel') {
              var carouselops = {
                visible: parseInt(settings.carousel_visible),
                scroll: parseInt(settings.carousel_scroll),
                animation: parseInt(settings.carousel_speed),
                vertical: settings.carousel_vertical,
                initCallback: function(carousel) {
                  $(".jcarousel-prev").addClass('carousel-prev');
                  $(".jcarousel-next").addClass('carousel-next');
                  if (carousel.options.visible && num_slides <= carousel.options.visible) {
                    // hide the carousel next and prev if all slide thumbs are displayed
                    $(".carousel-prev, .carousel-next", carousel.container.parent()).addClass("hidden");
                    return false;
                  }
                  $(".carousel-next", carousel.container.parent()).bind('click', function() {
                    carousel.next();
                    return false;
                  });
                  $(".carousel-prev", carousel.container.parent()).bind('click', function() {
                    carousel.prev();
                    return false;
                  });
                }
              };
              if (!settings.carousel_skin) {
                carouselops.buttonNextHTML = null;
                carouselops.buttonPrevHTML = null;
              }
              if (parseInt(settings.carousel_circular)) carouselops.wrap = 'circular';
              $("#" + i + "-carousel").jcarousel(carouselops);
              // the pager is the direct item's parent element
              options.pager = "#" + i + "-carousel .field-slideshow-pager";
            }
          }
        }

        // Configure the cycle.before callback, it's called each time the slide change
        options.before = function(currSlideElement, nextSlideElement, options, forwardFlag) {
          // In this function we access the settins with options.settings
          // since the settings variable will be equal to the last slideshow settings
          // Acessing directly settings may cause issues if there are more than 1 slideshow

          // The options.nextSlide sometimes starts with 1 instead of 0, this is safer
          var nextIndex = $(nextSlideElement).index();

          // Add activeSlide manually for image pager
          if (options.settings.pager == 'image') {
            $('li', options.pager).removeClass("activeSlide");
            $('li:eq(' + nextIndex + ')', options.pager).addClass("activeSlide");
          }

          // If we are using the carousel make it follow the activeSlide
          // This will not work correctly with circular carousel until the version 0.3 of jcarousel
          // is released so we disble this until then
          if (options.settings.pager == 'carousel' && parseInt(options.settings.carousel_follow) && parseInt(options.settings.carousel_circular) == 0) {
            var carousel = $("#" + options.index + "-carousel").data("jcarousel");
            carousel.scroll(nextIndex, true);
          }
        }

        if (num_slides > 1) {

          if (settings.start_on_hover) {
            //If start_on_hover is set, stop cycling onload, and only activate
            //on hover
            slideshow.cycle(options).cycle("pause").hover(function() {
              $(this).cycle('resume');
            },function(){
              $(this).cycle('pause');
            });
          }
          else {
            // Cycle!
            slideshow.cycle(options);
          }

          // After the numeric pager has been built by Cycle, add some classes for theming
          if (settings.pager == 'number') {
            $('.field-slideshow-pager a').each(function(){
              $this = $(this);
              $this.addClass('slide-' + $this.html());
            });
          }
          // Keep a reference to the slideshow in the buttons since the slideshow variable
          // becomes invalid if there are multiple slideshows (equal to the last slideshow)
          $("#" + i + "-controls .play, #" + i + "-controls .pause").data("slideshow", slideshow);
          // if the play/pause button is enabled link the events
          $("#" + i + "-controls .play").click(function(e) {
            e.preventDefault();
            var target_slideshow = $(this).data("slideshow");
            target_slideshow.cycle("resume", true);
            $(this).hide();
            $(this).parent().find(".pause").show();
          });
          $("#" + i + "-controls .pause").click(function(e) {
            e.preventDefault();
            var target_slideshow = $(this).data("slideshow");
            target_slideshow.cycle("pause");
            $(this).hide();
            $(this).parent().find(".play").show();
          });
        }

      }

      slideshowNum++;

    });
  }

})(jQuery);
;
/**
 * Owl Carousel v2.3.4
 * Copyright 2013-2018 David Deutsch
 * Licensed under: SEE LICENSE IN https://github.com/OwlCarousel2/OwlCarousel2/blob/master/LICENSE
 */
!function(a,b,c,d){function e(b,c){this.settings=null,this.options=a.extend({},e.Defaults,c),this.$element=a(b),this._handlers={},this._plugins={},this._supress={},this._current=null,this._speed=null,this._coordinates=[],this._breakpoint=null,this._width=null,this._items=[],this._clones=[],this._mergers=[],this._widths=[],this._invalidated={},this._pipe=[],this._drag={time:null,target:null,pointer:null,stage:{start:null,current:null},direction:null},this._states={current:{},tags:{initializing:["busy"],animating:["busy"],dragging:["interacting"]}},a.each(["onResize","onThrottledResize"],a.proxy(function(b,c){this._handlers[c]=a.proxy(this[c],this)},this)),a.each(e.Plugins,a.proxy(function(a,b){this._plugins[a.charAt(0).toLowerCase()+a.slice(1)]=new b(this)},this)),a.each(e.Workers,a.proxy(function(b,c){this._pipe.push({filter:c.filter,run:a.proxy(c.run,this)})},this)),this.setup(),this.initialize()}e.Defaults={items:3,loop:!1,center:!1,rewind:!1,checkVisibility:!0,mouseDrag:!0,touchDrag:!0,pullDrag:!0,freeDrag:!1,margin:0,stagePadding:0,merge:!1,mergeFit:!0,autoWidth:!1,startPosition:0,rtl:!1,smartSpeed:250,fluidSpeed:!1,dragEndSpeed:!1,responsive:{},responsiveRefreshRate:200,responsiveBaseElement:b,fallbackEasing:"swing",slideTransition:"",info:!1,nestedItemSelector:!1,itemElement:"div",stageElement:"div",refreshClass:"owl-refresh",loadedClass:"owl-loaded",loadingClass:"owl-loading",rtlClass:"owl-rtl",responsiveClass:"owl-responsive",dragClass:"owl-drag",itemClass:"owl-item",stageClass:"owl-stage",stageOuterClass:"owl-stage-outer",grabClass:"owl-grab"},e.Width={Default:"default",Inner:"inner",Outer:"outer"},e.Type={Event:"event",State:"state"},e.Plugins={},e.Workers=[{filter:["width","settings"],run:function(){this._width=this.$element.width()}},{filter:["width","items","settings"],run:function(a){a.current=this._items&&this._items[this.relative(this._current)]}},{filter:["items","settings"],run:function(){this.$stage.children(".cloned").remove()}},{filter:["width","items","settings"],run:function(a){var b=this.settings.margin||"",c=!this.settings.autoWidth,d=this.settings.rtl,e={width:"auto","margin-left":d?b:"","margin-right":d?"":b};!c&&this.$stage.children().css(e),a.css=e}},{filter:["width","items","settings"],run:function(a){var b=(this.width()/this.settings.items).toFixed(3)-this.settings.margin,c=null,d=this._items.length,e=!this.settings.autoWidth,f=[];for(a.items={merge:!1,width:b};d--;)c=this._mergers[d],c=this.settings.mergeFit&&Math.min(c,this.settings.items)||c,a.items.merge=c>1||a.items.merge,f[d]=e?b*c:this._items[d].width();this._widths=f}},{filter:["items","settings"],run:function(){var b=[],c=this._items,d=this.settings,e=Math.max(2*d.items,4),f=2*Math.ceil(c.length/2),g=d.loop&&c.length?d.rewind?e:Math.max(e,f):0,h="",i="";for(g/=2;g>0;)b.push(this.normalize(b.length/2,!0)),h+=c[b[b.length-1]][0].outerHTML,b.push(this.normalize(c.length-1-(b.length-1)/2,!0)),i=c[b[b.length-1]][0].outerHTML+i,g-=1;this._clones=b,a(h).addClass("cloned").appendTo(this.$stage),a(i).addClass("cloned").prependTo(this.$stage)}},{filter:["width","items","settings"],run:function(){for(var a=this.settings.rtl?1:-1,b=this._clones.length+this._items.length,c=-1,d=0,e=0,f=[];++c<b;)d=f[c-1]||0,e=this._widths[this.relative(c)]+this.settings.margin,f.push(d+e*a);this._coordinates=f}},{filter:["width","items","settings"],run:function(){var a=this.settings.stagePadding,b=this._coordinates,c={width:Math.ceil(Math.abs(b[b.length-1]))+2*a,"padding-left":a||"","padding-right":a||""};this.$stage.css(c)}},{filter:["width","items","settings"],run:function(a){var b=this._coordinates.length,c=!this.settings.autoWidth,d=this.$stage.children();if(c&&a.items.merge)for(;b--;)a.css.width=this._widths[this.relative(b)],d.eq(b).css(a.css);else c&&(a.css.width=a.items.width,d.css(a.css))}},{filter:["items"],run:function(){this._coordinates.length<1&&this.$stage.removeAttr("style")}},{filter:["width","items","settings"],run:function(a){a.current=a.current?this.$stage.children().index(a.current):0,a.current=Math.max(this.minimum(),Math.min(this.maximum(),a.current)),this.reset(a.current)}},{filter:["position"],run:function(){this.animate(this.coordinates(this._current))}},{filter:["width","position","items","settings"],run:function(){var a,b,c,d,e=this.settings.rtl?1:-1,f=2*this.settings.stagePadding,g=this.coordinates(this.current())+f,h=g+this.width()*e,i=[];for(c=0,d=this._coordinates.length;c<d;c++)a=this._coordinates[c-1]||0,b=Math.abs(this._coordinates[c])+f*e,(this.op(a,"<=",g)&&this.op(a,">",h)||this.op(b,"<",g)&&this.op(b,">",h))&&i.push(c);this.$stage.children(".active").removeClass("active"),this.$stage.children(":eq("+i.join("), :eq(")+")").addClass("active"),this.$stage.children(".center").removeClass("center"),this.settings.center&&this.$stage.children().eq(this.current()).addClass("center")}}],e.prototype.initializeStage=function(){this.$stage=this.$element.find("."+this.settings.stageClass),this.$stage.length||(this.$element.addClass(this.options.loadingClass),this.$stage=a("<"+this.settings.stageElement+">",{class:this.settings.stageClass}).wrap(a("<div/>",{class:this.settings.stageOuterClass})),this.$element.append(this.$stage.parent()))},e.prototype.initializeItems=function(){var b=this.$element.find(".owl-item");if(b.length)return this._items=b.get().map(function(b){return a(b)}),this._mergers=this._items.map(function(){return 1}),void this.refresh();this.replace(this.$element.children().not(this.$stage.parent())),this.isVisible()?this.refresh():this.invalidate("width"),this.$element.removeClass(this.options.loadingClass).addClass(this.options.loadedClass)},e.prototype.initialize=function(){if(this.enter("initializing"),this.trigger("initialize"),this.$element.toggleClass(this.settings.rtlClass,this.settings.rtl),this.settings.autoWidth&&!this.is("pre-loading")){var a,b,c;a=this.$element.find("img"),b=this.settings.nestedItemSelector?"."+this.settings.nestedItemSelector:d,c=this.$element.children(b).width(),a.length&&c<=0&&this.preloadAutoWidthImages(a)}this.initializeStage(),this.initializeItems(),this.registerEventHandlers(),this.leave("initializing"),this.trigger("initialized")},e.prototype.isVisible=function(){return!this.settings.checkVisibility||this.$element.is(":visible")},e.prototype.setup=function(){var b=this.viewport(),c=this.options.responsive,d=-1,e=null;c?(a.each(c,function(a){a<=b&&a>d&&(d=Number(a))}),e=a.extend({},this.options,c[d]),"function"==typeof e.stagePadding&&(e.stagePadding=e.stagePadding()),delete e.responsive,e.responsiveClass&&this.$element.attr("class",this.$element.attr("class").replace(new RegExp("("+this.options.responsiveClass+"-)\\S+\\s","g"),"$1"+d))):e=a.extend({},this.options),this.trigger("change",{property:{name:"settings",value:e}}),this._breakpoint=d,this.settings=e,this.invalidate("settings"),this.trigger("changed",{property:{name:"settings",value:this.settings}})},e.prototype.optionsLogic=function(){this.settings.autoWidth&&(this.settings.stagePadding=!1,this.settings.merge=!1)},e.prototype.prepare=function(b){var c=this.trigger("prepare",{content:b});return c.data||(c.data=a("<"+this.settings.itemElement+"/>").addClass(this.options.itemClass).append(b)),this.trigger("prepared",{content:c.data}),c.data},e.prototype.update=function(){for(var b=0,c=this._pipe.length,d=a.proxy(function(a){return this[a]},this._invalidated),e={};b<c;)(this._invalidated.all||a.grep(this._pipe[b].filter,d).length>0)&&this._pipe[b].run(e),b++;this._invalidated={},!this.is("valid")&&this.enter("valid")},e.prototype.width=function(a){switch(a=a||e.Width.Default){case e.Width.Inner:case e.Width.Outer:return this._width;default:return this._width-2*this.settings.stagePadding+this.settings.margin}},e.prototype.refresh=function(){this.enter("refreshing"),this.trigger("refresh"),this.setup(),this.optionsLogic(),this.$element.addClass(this.options.refreshClass),this.update(),this.$element.removeClass(this.options.refreshClass),this.leave("refreshing"),this.trigger("refreshed")},e.prototype.onThrottledResize=function(){b.clearTimeout(this.resizeTimer),this.resizeTimer=b.setTimeout(this._handlers.onResize,this.settings.responsiveRefreshRate)},e.prototype.onResize=function(){return!!this._items.length&&(this._width!==this.$element.width()&&(!!this.isVisible()&&(this.enter("resizing"),this.trigger("resize").isDefaultPrevented()?(this.leave("resizing"),!1):(this.invalidate("width"),this.refresh(),this.leave("resizing"),void this.trigger("resized")))))},e.prototype.registerEventHandlers=function(){a.support.transition&&this.$stage.on(a.support.transition.end+".owl.core",a.proxy(this.onTransitionEnd,this)),!1!==this.settings.responsive&&this.on(b,"resize",this._handlers.onThrottledResize),this.settings.mouseDrag&&(this.$element.addClass(this.options.dragClass),this.$stage.on("mousedown.owl.core",a.proxy(this.onDragStart,this)),this.$stage.on("dragstart.owl.core selectstart.owl.core",function(){return!1})),this.settings.touchDrag&&(this.$stage.on("touchstart.owl.core",a.proxy(this.onDragStart,this)),this.$stage.on("touchcancel.owl.core",a.proxy(this.onDragEnd,this)))},e.prototype.onDragStart=function(b){var d=null;3!==b.which&&(a.support.transform?(d=this.$stage.css("transform").replace(/.*\(|\)| /g,"").split(","),d={x:d[16===d.length?12:4],y:d[16===d.length?13:5]}):(d=this.$stage.position(),d={x:this.settings.rtl?d.left+this.$stage.width()-this.width()+this.settings.margin:d.left,y:d.top}),this.is("animating")&&(a.support.transform?this.animate(d.x):this.$stage.stop(),this.invalidate("position")),this.$element.toggleClass(this.options.grabClass,"mousedown"===b.type),this.speed(0),this._drag.time=(new Date).getTime(),this._drag.target=a(b.target),this._drag.stage.start=d,this._drag.stage.current=d,this._drag.pointer=this.pointer(b),a(c).on("mouseup.owl.core touchend.owl.core",a.proxy(this.onDragEnd,this)),a(c).one("mousemove.owl.core touchmove.owl.core",a.proxy(function(b){var d=this.difference(this._drag.pointer,this.pointer(b));a(c).on("mousemove.owl.core touchmove.owl.core",a.proxy(this.onDragMove,this)),Math.abs(d.x)<Math.abs(d.y)&&this.is("valid")||(b.preventDefault(),this.enter("dragging"),this.trigger("drag"))},this)))},e.prototype.onDragMove=function(a){var b=null,c=null,d=null,e=this.difference(this._drag.pointer,this.pointer(a)),f=this.difference(this._drag.stage.start,e);this.is("dragging")&&(a.preventDefault(),this.settings.loop?(b=this.coordinates(this.minimum()),c=this.coordinates(this.maximum()+1)-b,f.x=((f.x-b)%c+c)%c+b):(b=this.settings.rtl?this.coordinates(this.maximum()):this.coordinates(this.minimum()),c=this.settings.rtl?this.coordinates(this.minimum()):this.coordinates(this.maximum()),d=this.settings.pullDrag?-1*e.x/5:0,f.x=Math.max(Math.min(f.x,b+d),c+d)),this._drag.stage.current=f,this.animate(f.x))},e.prototype.onDragEnd=function(b){var d=this.difference(this._drag.pointer,this.pointer(b)),e=this._drag.stage.current,f=d.x>0^this.settings.rtl?"left":"right";a(c).off(".owl.core"),this.$element.removeClass(this.options.grabClass),(0!==d.x&&this.is("dragging")||!this.is("valid"))&&(this.speed(this.settings.dragEndSpeed||this.settings.smartSpeed),this.current(this.closest(e.x,0!==d.x?f:this._drag.direction)),this.invalidate("position"),this.update(),this._drag.direction=f,(Math.abs(d.x)>3||(new Date).getTime()-this._drag.time>300)&&this._drag.target.one("click.owl.core",function(){return!1})),this.is("dragging")&&(this.leave("dragging"),this.trigger("dragged"))},e.prototype.closest=function(b,c){var e=-1,f=30,g=this.width(),h=this.coordinates();return this.settings.freeDrag||a.each(h,a.proxy(function(a,i){return"left"===c&&b>i-f&&b<i+f?e=a:"right"===c&&b>i-g-f&&b<i-g+f?e=a+1:this.op(b,"<",i)&&this.op(b,">",h[a+1]!==d?h[a+1]:i-g)&&(e="left"===c?a+1:a),-1===e},this)),this.settings.loop||(this.op(b,">",h[this.minimum()])?e=b=this.minimum():this.op(b,"<",h[this.maximum()])&&(e=b=this.maximum())),e},e.prototype.animate=function(b){var c=this.speed()>0;this.is("animating")&&this.onTransitionEnd(),c&&(this.enter("animating"),this.trigger("translate")),a.support.transform3d&&a.support.transition?this.$stage.css({transform:"translate3d("+b+"px,0px,0px)",transition:this.speed()/1e3+"s"+(this.settings.slideTransition?" "+this.settings.slideTransition:"")}):c?this.$stage.animate({left:b+"px"},this.speed(),this.settings.fallbackEasing,a.proxy(this.onTransitionEnd,this)):this.$stage.css({left:b+"px"})},e.prototype.is=function(a){return this._states.current[a]&&this._states.current[a]>0},e.prototype.current=function(a){if(a===d)return this._current;if(0===this._items.length)return d;if(a=this.normalize(a),this._current!==a){var b=this.trigger("change",{property:{name:"position",value:a}});b.data!==d&&(a=this.normalize(b.data)),this._current=a,this.invalidate("position"),this.trigger("changed",{property:{name:"position",value:this._current}})}return this._current},e.prototype.invalidate=function(b){return"string"===a.type(b)&&(this._invalidated[b]=!0,this.is("valid")&&this.leave("valid")),a.map(this._invalidated,function(a,b){return b})},e.prototype.reset=function(a){(a=this.normalize(a))!==d&&(this._speed=0,this._current=a,this.suppress(["translate","translated"]),this.animate(this.coordinates(a)),this.release(["translate","translated"]))},e.prototype.normalize=function(a,b){var c=this._items.length,e=b?0:this._clones.length;return!this.isNumeric(a)||c<1?a=d:(a<0||a>=c+e)&&(a=((a-e/2)%c+c)%c+e/2),a},e.prototype.relative=function(a){return a-=this._clones.length/2,this.normalize(a,!0)},e.prototype.maximum=function(a){var b,c,d,e=this.settings,f=this._coordinates.length;if(e.loop)f=this._clones.length/2+this._items.length-1;else if(e.autoWidth||e.merge){if(b=this._items.length)for(c=this._items[--b].width(),d=this.$element.width();b--&&!((c+=this._items[b].width()+this.settings.margin)>d););f=b+1}else f=e.center?this._items.length-1:this._items.length-e.items;return a&&(f-=this._clones.length/2),Math.max(f,0)},e.prototype.minimum=function(a){return a?0:this._clones.length/2},e.prototype.items=function(a){return a===d?this._items.slice():(a=this.normalize(a,!0),this._items[a])},e.prototype.mergers=function(a){return a===d?this._mergers.slice():(a=this.normalize(a,!0),this._mergers[a])},e.prototype.clones=function(b){var c=this._clones.length/2,e=c+this._items.length,f=function(a){return a%2==0?e+a/2:c-(a+1)/2};return b===d?a.map(this._clones,function(a,b){return f(b)}):a.map(this._clones,function(a,c){return a===b?f(c):null})},e.prototype.speed=function(a){return a!==d&&(this._speed=a),this._speed},e.prototype.coordinates=function(b){var c,e=1,f=b-1;return b===d?a.map(this._coordinates,a.proxy(function(a,b){return this.coordinates(b)},this)):(this.settings.center?(this.settings.rtl&&(e=-1,f=b+1),c=this._coordinates[b],c+=(this.width()-c+(this._coordinates[f]||0))/2*e):c=this._coordinates[f]||0,c=Math.ceil(c))},e.prototype.duration=function(a,b,c){return 0===c?0:Math.min(Math.max(Math.abs(b-a),1),6)*Math.abs(c||this.settings.smartSpeed)},e.prototype.to=function(a,b){var c=this.current(),d=null,e=a-this.relative(c),f=(e>0)-(e<0),g=this._items.length,h=this.minimum(),i=this.maximum();this.settings.loop?(!this.settings.rewind&&Math.abs(e)>g/2&&(e+=-1*f*g),a=c+e,(d=((a-h)%g+g)%g+h)!==a&&d-e<=i&&d-e>0&&(c=d-e,a=d,this.reset(c))):this.settings.rewind?(i+=1,a=(a%i+i)%i):a=Math.max(h,Math.min(i,a)),this.speed(this.duration(c,a,b)),this.current(a),this.isVisible()&&this.update()},e.prototype.next=function(a){a=a||!1,this.to(this.relative(this.current())+1,a)},e.prototype.prev=function(a){a=a||!1,this.to(this.relative(this.current())-1,a)},e.prototype.onTransitionEnd=function(a){if(a!==d&&(a.stopPropagation(),(a.target||a.srcElement||a.originalTarget)!==this.$stage.get(0)))return!1;this.leave("animating"),this.trigger("translated")},e.prototype.viewport=function(){var d;return this.options.responsiveBaseElement!==b?d=a(this.options.responsiveBaseElement).width():b.innerWidth?d=b.innerWidth:c.documentElement&&c.documentElement.clientWidth?d=c.documentElement.clientWidth:console.warn("Can not detect viewport width."),d},e.prototype.replace=function(b){this.$stage.empty(),this._items=[],b&&(b=b instanceof jQuery?b:a(b)),this.settings.nestedItemSelector&&(b=b.find("."+this.settings.nestedItemSelector)),b.filter(function(){return 1===this.nodeType}).each(a.proxy(function(a,b){b=this.prepare(b),this.$stage.append(b),this._items.push(b),this._mergers.push(1*b.find("[data-merge]").addBack("[data-merge]").attr("data-merge")||1)},this)),this.reset(this.isNumeric(this.settings.startPosition)?this.settings.startPosition:0),this.invalidate("items")},e.prototype.add=function(b,c){var e=this.relative(this._current);c=c===d?this._items.length:this.normalize(c,!0),b=b instanceof jQuery?b:a(b),this.trigger("add",{content:b,position:c}),b=this.prepare(b),0===this._items.length||c===this._items.length?(0===this._items.length&&this.$stage.append(b),0!==this._items.length&&this._items[c-1].after(b),this._items.push(b),this._mergers.push(1*b.find("[data-merge]").addBack("[data-merge]").attr("data-merge")||1)):(this._items[c].before(b),this._items.splice(c,0,b),this._mergers.splice(c,0,1*b.find("[data-merge]").addBack("[data-merge]").attr("data-merge")||1)),this._items[e]&&this.reset(this._items[e].index()),this.invalidate("items"),this.trigger("added",{content:b,position:c})},e.prototype.remove=function(a){(a=this.normalize(a,!0))!==d&&(this.trigger("remove",{content:this._items[a],position:a}),this._items[a].remove(),this._items.splice(a,1),this._mergers.splice(a,1),this.invalidate("items"),this.trigger("removed",{content:null,position:a}))},e.prototype.preloadAutoWidthImages=function(b){b.each(a.proxy(function(b,c){this.enter("pre-loading"),c=a(c),a(new Image).one("load",a.proxy(function(a){c.attr("src",a.target.src),c.css("opacity",1),this.leave("pre-loading"),!this.is("pre-loading")&&!this.is("initializing")&&this.refresh()},this)).attr("src",c.attr("src")||c.attr("data-src")||c.attr("data-src-retina"))},this))},e.prototype.destroy=function(){this.$element.off(".owl.core"),this.$stage.off(".owl.core"),a(c).off(".owl.core"),!1!==this.settings.responsive&&(b.clearTimeout(this.resizeTimer),this.off(b,"resize",this._handlers.onThrottledResize));for(var d in this._plugins)this._plugins[d].destroy();this.$stage.children(".cloned").remove(),this.$stage.unwrap(),this.$stage.children().contents().unwrap(),this.$stage.children().unwrap(),this.$stage.remove(),this.$element.removeClass(this.options.refreshClass).removeClass(this.options.loadingClass).removeClass(this.options.loadedClass).removeClass(this.options.rtlClass).removeClass(this.options.dragClass).removeClass(this.options.grabClass).attr("class",this.$element.attr("class").replace(new RegExp(this.options.responsiveClass+"-\\S+\\s","g"),"")).removeData("owl.carousel")},e.prototype.op=function(a,b,c){var d=this.settings.rtl;switch(b){case"<":return d?a>c:a<c;case">":return d?a<c:a>c;case">=":return d?a<=c:a>=c;case"<=":return d?a>=c:a<=c}},e.prototype.on=function(a,b,c,d){a.addEventListener?a.addEventListener(b,c,d):a.attachEvent&&a.attachEvent("on"+b,c)},e.prototype.off=function(a,b,c,d){a.removeEventListener?a.removeEventListener(b,c,d):a.detachEvent&&a.detachEvent("on"+b,c)},e.prototype.trigger=function(b,c,d,f,g){var h={item:{count:this._items.length,index:this.current()}},i=a.camelCase(a.grep(["on",b,d],function(a){return a}).join("-").toLowerCase()),j=a.Event([b,"owl",d||"carousel"].join(".").toLowerCase(),a.extend({relatedTarget:this},h,c));return this._supress[b]||(a.each(this._plugins,function(a,b){b.onTrigger&&b.onTrigger(j)}),this.register({type:e.Type.Event,name:b}),this.$element.trigger(j),this.settings&&"function"==typeof this.settings[i]&&this.settings[i].call(this,j)),j},e.prototype.enter=function(b){a.each([b].concat(this._states.tags[b]||[]),a.proxy(function(a,b){this._states.current[b]===d&&(this._states.current[b]=0),this._states.current[b]++},this))},e.prototype.leave=function(b){a.each([b].concat(this._states.tags[b]||[]),a.proxy(function(a,b){this._states.current[b]--},this))},e.prototype.register=function(b){if(b.type===e.Type.Event){if(a.event.special[b.name]||(a.event.special[b.name]={}),!a.event.special[b.name].owl){var c=a.event.special[b.name]._default;a.event.special[b.name]._default=function(a){return!c||!c.apply||a.namespace&&-1!==a.namespace.indexOf("owl")?a.namespace&&a.namespace.indexOf("owl")>-1:c.apply(this,arguments)},a.event.special[b.name].owl=!0}}else b.type===e.Type.State&&(this._states.tags[b.name]?this._states.tags[b.name]=this._states.tags[b.name].concat(b.tags):this._states.tags[b.name]=b.tags,this._states.tags[b.name]=a.grep(this._states.tags[b.name],a.proxy(function(c,d){return a.inArray(c,this._states.tags[b.name])===d},this)))},e.prototype.suppress=function(b){a.each(b,a.proxy(function(a,b){this._supress[b]=!0},this))},e.prototype.release=function(b){a.each(b,a.proxy(function(a,b){delete this._supress[b]},this))},e.prototype.pointer=function(a){var c={x:null,y:null};return a=a.originalEvent||a||b.event,a=a.touches&&a.touches.length?a.touches[0]:a.changedTouches&&a.changedTouches.length?a.changedTouches[0]:a,a.pageX?(c.x=a.pageX,c.y=a.pageY):(c.x=a.clientX,c.y=a.clientY),c},e.prototype.isNumeric=function(a){return!isNaN(parseFloat(a))},e.prototype.difference=function(a,b){return{x:a.x-b.x,y:a.y-b.y}},a.fn.owlCarousel=function(b){var c=Array.prototype.slice.call(arguments,1);return this.each(function(){var d=a(this),f=d.data("owl.carousel");f||(f=new e(this,"object"==typeof b&&b),d.data("owl.carousel",f),a.each(["next","prev","to","destroy","refresh","replace","add","remove"],function(b,c){f.register({type:e.Type.Event,name:c}),f.$element.on(c+".owl.carousel.core",a.proxy(function(a){a.namespace&&a.relatedTarget!==this&&(this.suppress([c]),f[c].apply(this,[].slice.call(arguments,1)),this.release([c]))},f))})),"string"==typeof b&&"_"!==b.charAt(0)&&f[b].apply(f,c)})},a.fn.owlCarousel.Constructor=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){var e=function(b){this._core=b,this._interval=null,this._visible=null,this._handlers={"initialized.owl.carousel":a.proxy(function(a){a.namespace&&this._core.settings.autoRefresh&&this.watch()},this)},this._core.options=a.extend({},e.Defaults,this._core.options),this._core.$element.on(this._handlers)};e.Defaults={autoRefresh:!0,autoRefreshInterval:500},e.prototype.watch=function(){this._interval||(this._visible=this._core.isVisible(),this._interval=b.setInterval(a.proxy(this.refresh,this),this._core.settings.autoRefreshInterval))},e.prototype.refresh=function(){this._core.isVisible()!==this._visible&&(this._visible=!this._visible,this._core.$element.toggleClass("owl-hidden",!this._visible),this._visible&&this._core.invalidate("width")&&this._core.refresh())},e.prototype.destroy=function(){var a,c;b.clearInterval(this._interval);for(a in this._handlers)this._core.$element.off(a,this._handlers[a]);for(c in Object.getOwnPropertyNames(this))"function"!=typeof this[c]&&(this[c]=null)},a.fn.owlCarousel.Constructor.Plugins.AutoRefresh=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){var e=function(b){this._core=b,this._loaded=[],this._handlers={"initialized.owl.carousel change.owl.carousel resized.owl.carousel":a.proxy(function(b){if(b.namespace&&this._core.settings&&this._core.settings.lazyLoad&&(b.property&&"position"==b.property.name||"initialized"==b.type)){var c=this._core.settings,e=c.center&&Math.ceil(c.items/2)||c.items,f=c.center&&-1*e||0,g=(b.property&&b.property.value!==d?b.property.value:this._core.current())+f,h=this._core.clones().length,i=a.proxy(function(a,b){this.load(b)},this);for(c.lazyLoadEager>0&&(e+=c.lazyLoadEager,c.loop&&(g-=c.lazyLoadEager,e++));f++<e;)this.load(h/2+this._core.relative(g)),h&&a.each(this._core.clones(this._core.relative(g)),i),g++}},this)},this._core.options=a.extend({},e.Defaults,this._core.options),this._core.$element.on(this._handlers)};e.Defaults={lazyLoad:!1,lazyLoadEager:0},e.prototype.load=function(c){var d=this._core.$stage.children().eq(c),e=d&&d.find(".owl-lazy");!e||a.inArray(d.get(0),this._loaded)>-1||(e.each(a.proxy(function(c,d){var e,f=a(d),g=b.devicePixelRatio>1&&f.attr("data-src-retina")||f.attr("data-src")||f.attr("data-srcset");this._core.trigger("load",{element:f,url:g},"lazy"),f.is("img")?f.one("load.owl.lazy",a.proxy(function(){f.css("opacity",1),this._core.trigger("loaded",{element:f,url:g},"lazy")},this)).attr("src",g):f.is("source")?f.one("load.owl.lazy",a.proxy(function(){this._core.trigger("loaded",{element:f,url:g},"lazy")},this)).attr("srcset",g):(e=new Image,e.onload=a.proxy(function(){f.css({"background-image":'url("'+g+'")',opacity:"1"}),this._core.trigger("loaded",{element:f,url:g},"lazy")},this),e.src=g)},this)),this._loaded.push(d.get(0)))},e.prototype.destroy=function(){var a,b;for(a in this.handlers)this._core.$element.off(a,this.handlers[a]);for(b in Object.getOwnPropertyNames(this))"function"!=typeof this[b]&&(this[b]=null)},a.fn.owlCarousel.Constructor.Plugins.Lazy=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){var e=function(c){this._core=c,this._previousHeight=null,this._handlers={"initialized.owl.carousel refreshed.owl.carousel":a.proxy(function(a){a.namespace&&this._core.settings.autoHeight&&this.update()},this),"changed.owl.carousel":a.proxy(function(a){a.namespace&&this._core.settings.autoHeight&&"position"===a.property.name&&this.update()},this),"loaded.owl.lazy":a.proxy(function(a){a.namespace&&this._core.settings.autoHeight&&a.element.closest("."+this._core.settings.itemClass).index()===this._core.current()&&this.update()},this)},this._core.options=a.extend({},e.Defaults,this._core.options),this._core.$element.on(this._handlers),this._intervalId=null;var d=this;a(b).on("load",function(){d._core.settings.autoHeight&&d.update()}),a(b).resize(function(){d._core.settings.autoHeight&&(null!=d._intervalId&&clearTimeout(d._intervalId),d._intervalId=setTimeout(function(){d.update()},250))})};e.Defaults={autoHeight:!1,autoHeightClass:"owl-height"},e.prototype.update=function(){var b=this._core._current,c=b+this._core.settings.items,d=this._core.settings.lazyLoad,e=this._core.$stage.children().toArray().slice(b,c),f=[],g=0;a.each(e,function(b,c){f.push(a(c).height())}),g=Math.max.apply(null,f),g<=1&&d&&this._previousHeight&&(g=this._previousHeight),this._previousHeight=g,this._core.$stage.parent().height(g).addClass(this._core.settings.autoHeightClass)},e.prototype.destroy=function(){var a,b;for(a in this._handlers)this._core.$element.off(a,this._handlers[a]);for(b in Object.getOwnPropertyNames(this))"function"!=typeof this[b]&&(this[b]=null)},a.fn.owlCarousel.Constructor.Plugins.AutoHeight=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){var e=function(b){this._core=b,this._videos={},this._playing=null,this._handlers={"initialized.owl.carousel":a.proxy(function(a){a.namespace&&this._core.register({type:"state",name:"playing",tags:["interacting"]})},this),"resize.owl.carousel":a.proxy(function(a){a.namespace&&this._core.settings.video&&this.isInFullScreen()&&a.preventDefault()},this),"refreshed.owl.carousel":a.proxy(function(a){a.namespace&&this._core.is("resizing")&&this._core.$stage.find(".cloned .owl-video-frame").remove()},this),"changed.owl.carousel":a.proxy(function(a){a.namespace&&"position"===a.property.name&&this._playing&&this.stop()},this),"prepared.owl.carousel":a.proxy(function(b){if(b.namespace){var c=a(b.content).find(".owl-video");c.length&&(c.css("display","none"),this.fetch(c,a(b.content)))}},this)},this._core.options=a.extend({},e.Defaults,this._core.options),this._core.$element.on(this._handlers),this._core.$element.on("click.owl.video",".owl-video-play-icon",a.proxy(function(a){this.play(a)},this))};e.Defaults={video:!1,videoHeight:!1,videoWidth:!1},e.prototype.fetch=function(a,b){var c=function(){return a.attr("data-vimeo-id")?"vimeo":a.attr("data-vzaar-id")?"vzaar":"youtube"}(),d=a.attr("data-vimeo-id")||a.attr("data-youtube-id")||a.attr("data-vzaar-id"),e=a.attr("data-width")||this._core.settings.videoWidth,f=a.attr("data-height")||this._core.settings.videoHeight,g=a.attr("href");if(!g)throw new Error("Missing video URL.");if(d=g.match(/(http:|https:|)\/\/(player.|www.|app.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com|be\-nocookie\.com)|vzaar\.com)\/(video\/|videos\/|embed\/|channels\/.+\/|groups\/.+\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/),d[3].indexOf("youtu")>-1)c="youtube";else if(d[3].indexOf("vimeo")>-1)c="vimeo";else{if(!(d[3].indexOf("vzaar")>-1))throw new Error("Video URL not supported.");c="vzaar"}d=d[6],this._videos[g]={type:c,id:d,width:e,height:f},b.attr("data-video",g),this.thumbnail(a,this._videos[g])},e.prototype.thumbnail=function(b,c){var d,e,f,g=c.width&&c.height?"width:"+c.width+"px;height:"+c.height+"px;":"",h=b.find("img"),i="src",j="",k=this._core.settings,l=function(c){e='<div class="owl-video-play-icon"></div>',d=k.lazyLoad?a("<div/>",{class:"owl-video-tn "+j,srcType:c}):a("<div/>",{class:"owl-video-tn",style:"opacity:1;background-image:url("+c+")"}),b.after(d),b.after(e)};if(b.wrap(a("<div/>",{class:"owl-video-wrapper",style:g})),this._core.settings.lazyLoad&&(i="data-src",j="owl-lazy"),h.length)return l(h.attr(i)),h.remove(),!1;"youtube"===c.type?(f="//img.youtube.com/vi/"+c.id+"/hqdefault.jpg",l(f)):"vimeo"===c.type?a.ajax({type:"GET",url:"//vimeo.com/api/v2/video/"+c.id+".json",jsonp:"callback",dataType:"jsonp",success:function(a){f=a[0].thumbnail_large,l(f)}}):"vzaar"===c.type&&a.ajax({type:"GET",url:"//vzaar.com/api/videos/"+c.id+".json",jsonp:"callback",dataType:"jsonp",success:function(a){f=a.framegrab_url,l(f)}})},e.prototype.stop=function(){this._core.trigger("stop",null,"video"),this._playing.find(".owl-video-frame").remove(),this._playing.removeClass("owl-video-playing"),this._playing=null,this._core.leave("playing"),this._core.trigger("stopped",null,"video")},e.prototype.play=function(b){var c,d=a(b.target),e=d.closest("."+this._core.settings.itemClass),f=this._videos[e.attr("data-video")],g=f.width||"100%",h=f.height||this._core.$stage.height();this._playing||(this._core.enter("playing"),this._core.trigger("play",null,"video"),e=this._core.items(this._core.relative(e.index())),this._core.reset(e.index()),c=a('<iframe frameborder="0" allowfullscreen mozallowfullscreen webkitAllowFullScreen ></iframe>'),c.attr("height",h),c.attr("width",g),"youtube"===f.type?c.attr("src","//www.youtube.com/embed/"+f.id+"?autoplay=1&rel=0&v="+f.id):"vimeo"===f.type?c.attr("src","//player.vimeo.com/video/"+f.id+"?autoplay=1"):"vzaar"===f.type&&c.attr("src","//view.vzaar.com/"+f.id+"/player?autoplay=true"),a(c).wrap('<div class="owl-video-frame" />').insertAfter(e.find(".owl-video")),this._playing=e.addClass("owl-video-playing"))},e.prototype.isInFullScreen=function(){var b=c.fullscreenElement||c.mozFullScreenElement||c.webkitFullscreenElement;return b&&a(b).parent().hasClass("owl-video-frame")},e.prototype.destroy=function(){var a,b;this._core.$element.off("click.owl.video");for(a in this._handlers)this._core.$element.off(a,this._handlers[a]);for(b in Object.getOwnPropertyNames(this))"function"!=typeof this[b]&&(this[b]=null)},a.fn.owlCarousel.Constructor.Plugins.Video=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){var e=function(b){this.core=b,this.core.options=a.extend({},e.Defaults,this.core.options),this.swapping=!0,this.previous=d,this.next=d,this.handlers={"change.owl.carousel":a.proxy(function(a){a.namespace&&"position"==a.property.name&&(this.previous=this.core.current(),this.next=a.property.value)},this),"drag.owl.carousel dragged.owl.carousel translated.owl.carousel":a.proxy(function(a){a.namespace&&(this.swapping="translated"==a.type)},this),"translate.owl.carousel":a.proxy(function(a){a.namespace&&this.swapping&&(this.core.options.animateOut||this.core.options.animateIn)&&this.swap()},this)},this.core.$element.on(this.handlers)};e.Defaults={animateOut:!1,
animateIn:!1},e.prototype.swap=function(){if(1===this.core.settings.items&&a.support.animation&&a.support.transition){this.core.speed(0);var b,c=a.proxy(this.clear,this),d=this.core.$stage.children().eq(this.previous),e=this.core.$stage.children().eq(this.next),f=this.core.settings.animateIn,g=this.core.settings.animateOut;this.core.current()!==this.previous&&(g&&(b=this.core.coordinates(this.previous)-this.core.coordinates(this.next),d.one(a.support.animation.end,c).css({left:b+"px"}).addClass("animated owl-animated-out").addClass(g)),f&&e.one(a.support.animation.end,c).addClass("animated owl-animated-in").addClass(f))}},e.prototype.clear=function(b){a(b.target).css({left:""}).removeClass("animated owl-animated-out owl-animated-in").removeClass(this.core.settings.animateIn).removeClass(this.core.settings.animateOut),this.core.onTransitionEnd()},e.prototype.destroy=function(){var a,b;for(a in this.handlers)this.core.$element.off(a,this.handlers[a]);for(b in Object.getOwnPropertyNames(this))"function"!=typeof this[b]&&(this[b]=null)},a.fn.owlCarousel.Constructor.Plugins.Animate=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){var e=function(b){this._core=b,this._call=null,this._time=0,this._timeout=0,this._paused=!0,this._handlers={"changed.owl.carousel":a.proxy(function(a){a.namespace&&"settings"===a.property.name?this._core.settings.autoplay?this.play():this.stop():a.namespace&&"position"===a.property.name&&this._paused&&(this._time=0)},this),"initialized.owl.carousel":a.proxy(function(a){a.namespace&&this._core.settings.autoplay&&this.play()},this),"play.owl.autoplay":a.proxy(function(a,b,c){a.namespace&&this.play(b,c)},this),"stop.owl.autoplay":a.proxy(function(a){a.namespace&&this.stop()},this),"mouseover.owl.autoplay":a.proxy(function(){this._core.settings.autoplayHoverPause&&this._core.is("rotating")&&this.pause()},this),"mouseleave.owl.autoplay":a.proxy(function(){this._core.settings.autoplayHoverPause&&this._core.is("rotating")&&this.play()},this),"touchstart.owl.core":a.proxy(function(){this._core.settings.autoplayHoverPause&&this._core.is("rotating")&&this.pause()},this),"touchend.owl.core":a.proxy(function(){this._core.settings.autoplayHoverPause&&this.play()},this)},this._core.$element.on(this._handlers),this._core.options=a.extend({},e.Defaults,this._core.options)};e.Defaults={autoplay:!1,autoplayTimeout:5e3,autoplayHoverPause:!1,autoplaySpeed:!1},e.prototype._next=function(d){this._call=b.setTimeout(a.proxy(this._next,this,d),this._timeout*(Math.round(this.read()/this._timeout)+1)-this.read()),this._core.is("interacting")||c.hidden||this._core.next(d||this._core.settings.autoplaySpeed)},e.prototype.read=function(){return(new Date).getTime()-this._time},e.prototype.play=function(c,d){var e;this._core.is("rotating")||this._core.enter("rotating"),c=c||this._core.settings.autoplayTimeout,e=Math.min(this._time%(this._timeout||c),c),this._paused?(this._time=this.read(),this._paused=!1):b.clearTimeout(this._call),this._time+=this.read()%c-e,this._timeout=c,this._call=b.setTimeout(a.proxy(this._next,this,d),c-e)},e.prototype.stop=function(){this._core.is("rotating")&&(this._time=0,this._paused=!0,b.clearTimeout(this._call),this._core.leave("rotating"))},e.prototype.pause=function(){this._core.is("rotating")&&!this._paused&&(this._time=this.read(),this._paused=!0,b.clearTimeout(this._call))},e.prototype.destroy=function(){var a,b;this.stop();for(a in this._handlers)this._core.$element.off(a,this._handlers[a]);for(b in Object.getOwnPropertyNames(this))"function"!=typeof this[b]&&(this[b]=null)},a.fn.owlCarousel.Constructor.Plugins.autoplay=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){"use strict";var e=function(b){this._core=b,this._initialized=!1,this._pages=[],this._controls={},this._templates=[],this.$element=this._core.$element,this._overrides={next:this._core.next,prev:this._core.prev,to:this._core.to},this._handlers={"prepared.owl.carousel":a.proxy(function(b){b.namespace&&this._core.settings.dotsData&&this._templates.push('<div class="'+this._core.settings.dotClass+'">'+a(b.content).find("[data-dot]").addBack("[data-dot]").attr("data-dot")+"</div>")},this),"added.owl.carousel":a.proxy(function(a){a.namespace&&this._core.settings.dotsData&&this._templates.splice(a.position,0,this._templates.pop())},this),"remove.owl.carousel":a.proxy(function(a){a.namespace&&this._core.settings.dotsData&&this._templates.splice(a.position,1)},this),"changed.owl.carousel":a.proxy(function(a){a.namespace&&"position"==a.property.name&&this.draw()},this),"initialized.owl.carousel":a.proxy(function(a){a.namespace&&!this._initialized&&(this._core.trigger("initialize",null,"navigation"),this.initialize(),this.update(),this.draw(),this._initialized=!0,this._core.trigger("initialized",null,"navigation"))},this),"refreshed.owl.carousel":a.proxy(function(a){a.namespace&&this._initialized&&(this._core.trigger("refresh",null,"navigation"),this.update(),this.draw(),this._core.trigger("refreshed",null,"navigation"))},this)},this._core.options=a.extend({},e.Defaults,this._core.options),this.$element.on(this._handlers)};e.Defaults={nav:!1,navText:['<span aria-label="Previous">&#x2039;</span>','<span aria-label="Next">&#x203a;</span>'],navSpeed:!1,navElement:'button type="button" role="presentation"',navContainer:!1,navContainerClass:"owl-nav",navClass:["owl-prev","owl-next"],slideBy:1,dotClass:"owl-dot",dotsClass:"owl-dots",dots:!0,dotsEach:!1,dotsData:!1,dotsSpeed:!1,dotsContainer:!1},e.prototype.initialize=function(){var b,c=this._core.settings;this._controls.$relative=(c.navContainer?a(c.navContainer):a("<div>").addClass(c.navContainerClass).appendTo(this.$element)).addClass("disabled"),this._controls.$previous=a("<"+c.navElement+">").addClass(c.navClass[0]).html(c.navText[0]).prependTo(this._controls.$relative).on("click",a.proxy(function(a){this.prev(c.navSpeed)},this)),this._controls.$next=a("<"+c.navElement+">").addClass(c.navClass[1]).html(c.navText[1]).appendTo(this._controls.$relative).on("click",a.proxy(function(a){this.next(c.navSpeed)},this)),c.dotsData||(this._templates=[a('<button role="button">').addClass(c.dotClass).append(a("<span>")).prop("outerHTML")]),this._controls.$absolute=(c.dotsContainer?a(c.dotsContainer):a("<div>").addClass(c.dotsClass).appendTo(this.$element)).addClass("disabled"),this._controls.$absolute.on("click","button",a.proxy(function(b){var d=a(b.target).parent().is(this._controls.$absolute)?a(b.target).index():a(b.target).parent().index();b.preventDefault(),this.to(d,c.dotsSpeed)},this));for(b in this._overrides)this._core[b]=a.proxy(this[b],this)},e.prototype.destroy=function(){var a,b,c,d,e;e=this._core.settings;for(a in this._handlers)this.$element.off(a,this._handlers[a]);for(b in this._controls)"$relative"===b&&e.navContainer?this._controls[b].html(""):this._controls[b].remove();for(d in this.overides)this._core[d]=this._overrides[d];for(c in Object.getOwnPropertyNames(this))"function"!=typeof this[c]&&(this[c]=null)},e.prototype.update=function(){var a,b,c,d=this._core.clones().length/2,e=d+this._core.items().length,f=this._core.maximum(!0),g=this._core.settings,h=g.center||g.autoWidth||g.dotsData?1:g.dotsEach||g.items;if("page"!==g.slideBy&&(g.slideBy=Math.min(g.slideBy,g.items)),g.dots||"page"==g.slideBy)for(this._pages=[],a=d,b=0,c=0;a<e;a++){if(b>=h||0===b){if(this._pages.push({start:Math.min(f,a-d),end:a-d+h-1}),Math.min(f,a-d)===f)break;b=0,++c}b+=this._core.mergers(this._core.relative(a))}},e.prototype.draw=function(){var b,c=this._core.settings,d=this._core.items().length<=c.items,e=this._core.relative(this._core.current()),f=c.loop||c.rewind;this._controls.$relative.toggleClass("disabled",!c.nav||d),c.nav&&(this._controls.$previous.toggleClass("disabled",!f&&e<=this._core.minimum(!0)),this._controls.$next.toggleClass("disabled",!f&&e>=this._core.maximum(!0))),this._controls.$absolute.toggleClass("disabled",!c.dots||d),c.dots&&(b=this._pages.length-this._controls.$absolute.children().length,c.dotsData&&0!==b?this._controls.$absolute.html(this._templates.join("")):b>0?this._controls.$absolute.append(new Array(b+1).join(this._templates[0])):b<0&&this._controls.$absolute.children().slice(b).remove(),this._controls.$absolute.find(".active").removeClass("active"),this._controls.$absolute.children().eq(a.inArray(this.current(),this._pages)).addClass("active"))},e.prototype.onTrigger=function(b){var c=this._core.settings;b.page={index:a.inArray(this.current(),this._pages),count:this._pages.length,size:c&&(c.center||c.autoWidth||c.dotsData?1:c.dotsEach||c.items)}},e.prototype.current=function(){var b=this._core.relative(this._core.current());return a.grep(this._pages,a.proxy(function(a,c){return a.start<=b&&a.end>=b},this)).pop()},e.prototype.getPosition=function(b){var c,d,e=this._core.settings;return"page"==e.slideBy?(c=a.inArray(this.current(),this._pages),d=this._pages.length,b?++c:--c,c=this._pages[(c%d+d)%d].start):(c=this._core.relative(this._core.current()),d=this._core.items().length,b?c+=e.slideBy:c-=e.slideBy),c},e.prototype.next=function(b){a.proxy(this._overrides.to,this._core)(this.getPosition(!0),b)},e.prototype.prev=function(b){a.proxy(this._overrides.to,this._core)(this.getPosition(!1),b)},e.prototype.to=function(b,c,d){var e;!d&&this._pages.length?(e=this._pages.length,a.proxy(this._overrides.to,this._core)(this._pages[(b%e+e)%e].start,c)):a.proxy(this._overrides.to,this._core)(b,c)},a.fn.owlCarousel.Constructor.Plugins.Navigation=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){"use strict";var e=function(c){this._core=c,this._hashes={},this.$element=this._core.$element,this._handlers={"initialized.owl.carousel":a.proxy(function(c){c.namespace&&"URLHash"===this._core.settings.startPosition&&a(b).trigger("hashchange.owl.navigation")},this),"prepared.owl.carousel":a.proxy(function(b){if(b.namespace){var c=a(b.content).find("[data-hash]").addBack("[data-hash]").attr("data-hash");if(!c)return;this._hashes[c]=b.content}},this),"changed.owl.carousel":a.proxy(function(c){if(c.namespace&&"position"===c.property.name){var d=this._core.items(this._core.relative(this._core.current())),e=a.map(this._hashes,function(a,b){return a===d?b:null}).join();if(!e||b.location.hash.slice(1)===e)return;b.location.hash=e}},this)},this._core.options=a.extend({},e.Defaults,this._core.options),this.$element.on(this._handlers),a(b).on("hashchange.owl.navigation",a.proxy(function(a){var c=b.location.hash.substring(1),e=this._core.$stage.children(),f=this._hashes[c]&&e.index(this._hashes[c]);f!==d&&f!==this._core.current()&&this._core.to(this._core.relative(f),!1,!0)},this))};e.Defaults={URLhashListener:!1},e.prototype.destroy=function(){var c,d;a(b).off("hashchange.owl.navigation");for(c in this._handlers)this._core.$element.off(c,this._handlers[c]);for(d in Object.getOwnPropertyNames(this))"function"!=typeof this[d]&&(this[d]=null)},a.fn.owlCarousel.Constructor.Plugins.Hash=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){function e(b,c){var e=!1,f=b.charAt(0).toUpperCase()+b.slice(1);return a.each((b+" "+h.join(f+" ")+f).split(" "),function(a,b){if(g[b]!==d)return e=!c||b,!1}),e}function f(a){return e(a,!0)}var g=a("<support>").get(0).style,h="Webkit Moz O ms".split(" "),i={transition:{end:{WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd",transition:"transitionend"}},animation:{end:{WebkitAnimation:"webkitAnimationEnd",MozAnimation:"animationend",OAnimation:"oAnimationEnd",animation:"animationend"}}},j={csstransforms:function(){return!!e("transform")},csstransforms3d:function(){return!!e("perspective")},csstransitions:function(){return!!e("transition")},cssanimations:function(){return!!e("animation")}};j.csstransitions()&&(a.support.transition=new String(f("transition")),a.support.transition.end=i.transition.end[a.support.transition]),j.cssanimations()&&(a.support.animation=new String(f("animation")),a.support.animation.end=i.animation.end[a.support.animation]),j.csstransforms()&&(a.support.transform=new String(f("transform")),a.support.transform3d=j.csstransforms3d())}(window.Zepto||window.jQuery,window,document);;
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
/*!
 * enquire.js v2.1.0 - Awesome Media Queries in JavaScript
 * Copyright (c) 2014 Nick Williams - http://wicky.nillia.ms/enquire.js
 * License: MIT (http://www.opensource.org/licenses/mit-license.php)
 */

!function(a,b,c){var d=window.matchMedia;"undefined"!=typeof module&&module.exports?module.exports=c(d):"function"==typeof define&&define.amd?define(function(){return b[a]=c(d)}):b[a]=c(d)}("enquire",this,function(a){"use strict";function b(a,b){var c,d=0,e=a.length;for(d;e>d&&(c=b(a[d],d),c!==!1);d++);}function c(a){return"[object Array]"===Object.prototype.toString.apply(a)}function d(a){return"function"==typeof a}function e(a){this.options=a,!a.deferSetup&&this.setup()}function f(b,c){this.query=b,this.isUnconditional=c,this.handlers=[],this.mql=a(b);var d=this;this.listener=function(a){d.mql=a,d.assess()},this.mql.addListener(this.listener)}function g(){if(!a)throw new Error("matchMedia not present, legacy browsers require a polyfill");this.queries={},this.browserIsIncapable=!a("only all").matches}return e.prototype={setup:function(){this.options.setup&&this.options.setup(),this.initialised=!0},on:function(){!this.initialised&&this.setup(),this.options.match&&this.options.match()},off:function(){this.options.unmatch&&this.options.unmatch()},destroy:function(){this.options.destroy?this.options.destroy():this.off()},equals:function(a){return this.options===a||this.options.match===a}},f.prototype={addHandler:function(a){var b=new e(a);this.handlers.push(b),this.matches()&&b.on()},removeHandler:function(a){var c=this.handlers;b(c,function(b,d){return b.equals(a)?(b.destroy(),!c.splice(d,1)):void 0})},matches:function(){return this.mql.matches||this.isUnconditional},clear:function(){b(this.handlers,function(a){a.destroy()}),this.mql.removeListener(this.listener),this.handlers.length=0},assess:function(){var a=this.matches()?"on":"off";b(this.handlers,function(b){b[a]()})}},g.prototype={register:function(a,e,g){var h=this.queries,i=g&&this.browserIsIncapable;return h[a]||(h[a]=new f(a,i)),d(e)&&(e={match:e}),c(e)||(e=[e]),b(e,function(b){h[a].addHandler(b)}),this},unregister:function(a,b){var c=this.queries[a];return c&&(b?c.removeHandler(b):(c.clear(),delete this.queries[a])),this}},new g});;
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
!function(a,b){"use strict";b.behaviors.slick={attach:function(b,c){var d=this;a(".slick",b).once("slick",function(){var e,b=this,f=a("> .slick__slider",b).length?a("> .slick__slider",b):a(b),g=a("> .slick__arrow",b),h=a.extend({},c.slick,f.data("slick"));if("array"===a.type(h.responsive)&&h.responsive.length)for(e in h.responsive)h.responsive.hasOwnProperty(e)&&"unslick"!==h.responsive[e].settings&&(h.responsive[e].settings=a.extend({},c.slick,d.globals(f,g,h),h.responsive[e].settings));f.data("slick",h),h=f.data("slick")||{},d.beforeSlick(f,g,h),f.slick(d.globals(f,g,h)),d.afterSlick(f,h),f.hasClass("unslick")?(f.slick("unslick"),a(".slide",f).removeClass("slide--loading")):a(b).addClass("slick--initialized")})},beforeSlick:function(b,c,d){var e=this,f=a(".slide--0 .media--ratio",b);e.randomize(b,d),f.length&&f.is(":hidden")&&f.removeClass("media--ratio").addClass("js-media--ratio"),b.on("setPosition.slick",function(a,f){e.setPosition(b,c,d,f)}),a(".media--loading",b).closest(".slide").addClass("slide--loading"),b.on("lazyLoaded lazyLoadError",function(a,b,c,d){e.setBackground(c)})},afterSlick:function(b,c){var d=this,e=b.slick("getSlick"),f=a(".js-media--ratio",b);b.parent().on("click.slick.load",".slick-down",function(b){b.preventDefault();var d=a(this);a("html, body").stop().animate({scrollTop:a(d.data("target")).offset().top-(d.data("offset")||0)},800,c.easing)}),c.mousewheel&&b.on("mousewheel.slick.load",function(a,c){return a.preventDefault(),c<0?b.slick("slickNext"):b.slick("slickPrev")}),f.length&&(b.trigger("resize"),f.addClass("media--ratio").removeClass("js-media--ratio")),b.trigger("afterSlick",[d,e,e.currentSlide])},setBackground:function(b,c){var d=a(b),e=d.closest(".media--background");d.closest(".media").removeClass("media--loading").addClass("media--loaded"),d.closest(".slide--loading").removeClass("slide--loading"),e.length&&(e.css("background-image","url("+d.attr("src")+")"),e.find("> img").remove(),e.removeAttr("data-lazy"))},randomize:function(a,b){b.randomize&&!a.hasClass("slick-initiliazed")&&a.children().sort(function(){return.5-Math.random()}).each(function(){a.append(this)})},setPosition:function(a,b,c,d){var e=d.slideCount<=c.slidesToShow;if(a.attr("id")===d.$slider.attr("id"))return c.centerPadding&&"0"!==c.centerPadding||d.$list.css("padding",""),e&&d.$slideTrack.width()<=d.$slider.width()&&d.$slideTrack.css({left:"",transform:""}),e||c.arrows===!1?b.addClass("element-hidden"):b.removeClass("element-hidden")},globals:function(c,d,e){return{slide:e.slide,lazyLoad:e.lazyLoad,dotsClass:e.dotsClass,rtl:e.rtl,appendDots:".slick__arrow"===e.appendDots?d:e.appendDots||a(c),prevArrow:a(".slick-prev",d),nextArrow:a(".slick-next",d),appendArrows:d,customPaging:function(a,c){var d=a.$slides.eq(c).find("[data-thumb]")||null,f=b.t(d.attr("alt"))||"",g="<img alt='"+f+"' src='"+d.data("thumb")+"'>",h=d.length&&e.dotsClass.indexOf("thumbnail")>0?"<div class='slick-dots__thumbnail'>"+g+"</div>":"";return a.defaults.customPaging(a,c).add(h)}}}}}(jQuery,Drupal);
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
