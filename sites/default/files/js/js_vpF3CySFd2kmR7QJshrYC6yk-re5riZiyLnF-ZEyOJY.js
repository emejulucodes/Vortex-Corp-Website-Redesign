(function($) {
  // Vars
  var mobileStatus = false;

  $(document).ready(function() {
    mobileStatus = mobileChecker();
    blogTitleVisibility();
  });

  $(window).resize(function() {
    mobileStatus = mobileChecker();
  });

  function mobileChecker() {
    return $(window).width() <= 780;
  }

  // If on a blog node and blog marquee view is empty, display title view immediately
  function blogTitleVisibility() {
    if ($('body').hasClass('node-type-article')) {
      if ($('.view-blog-detail-marquee').length < 1) {
        $('.view-blog-detail-title').show();
        $('body').addClass('blog-marquee-false');
      }
    }
  }

  // Sticky sub-header functionality
  Drupal.behaviors.stickySubHeader = {
    attach: function () {
      // To use: Add an array that contains the unique body class for the page that should
      // have a sticky sub-header and the div that should become sticky
      var acceptedPages = [
        ['node-type-article', '.view-blog-detail-title']
      ];
      var pageClass, subHeaderElement, subHeaderElTopOffset, subHeaderElHeight, scrollPos, targetPos;
      var pageAccepted = false;
      var stickyStatus = false;
      var savedMobileStatus = mobileStatus;
      var windowContext = $(window);
      var body = $('body');
      // Wait til content is loaded to get proper top offset of sub-header div
      windowContext.load(function() {
        // Check if on any of the acceptedPages
        for (var i = 0; i < acceptedPages.length; i++) {
          pageClass = acceptedPages[i][0];
          if (body.hasClass(pageClass)) {
            pageAccepted = true;
            subHeaderElement = $(acceptedPages[i][1]);
            break;
          }
        }
        // Enable sticky sub-header functionality
        // Do not enable on mobile
        if (pageAccepted) {
          // If not mobile, enable sticky functionality
          if (!mobileStatus && subHeaderElement.length > 0) {
           prepSticky();
          }
          // Check window resize in case mobile status changes
          windowContext.resize(function() {
            // If changing from mobile to desktop, enable sticky
            if (savedMobileStatus && !mobileStatus && subHeaderElement.length > 0) {
              savedMobileStatus = mobileStatus;
              // Wait for elements to load to offsetTop will be correct
              windowContext.setTimeout(function() {
                prepSticky();
              }, 2000);
            }
            // If changing from desktop to mobile, disable sticky
            else if (!savedMobileStatus && mobileStatus) {
              savedMobileStatus = mobileStatus;
              // Reset sticky
              disableSticky();
            }
          });
        }
      });

      function prepSticky() {
        // Save original position of target before making sticky
        subHeaderElTopOffset = subHeaderElement.offset().top;
        subHeaderElHeight = subHeaderElement.outerHeight();
        scrollPos = windowContext.scrollTop();
        // Adjust when target should become sticky
        targetPos = subHeaderElTopOffset + 140 + subHeaderElHeight;
        // Determine scroll position and call sticky sub-header
        windowContext.scroll(function() {
          scrollPos = windowContext.scrollTop();
          toggleSticky();
          if (scrollPos === 0) {
            subHeaderElTopOffset = subHeaderElement.offset().top;
            targetPos = subHeaderElTopOffset + 140 + subHeaderElHeight;
          }
        });
      }

      function disableSticky() {
        // Special behavior for blog nodes
        if (pageClass === 'node-type-article') {
          if (body.hasClass('blog-marquee-false')) {
            subHeaderElement.parent().height('auto');
          }
          subHeaderElement.find('.page-title').show();
          subHeaderElement.find('.page-title-sticky').hide();
        }
        body.removeClass('sticky-sub-header');
        subHeaderElement.css('margin-top', 0);
      }

      function toggleSticky() {
        if (!mobileStatus && scrollPos >= targetPos && stickyStatus === false) {
          // Enable sticky header
          // Special behavior for blog nodes
          if (pageClass === 'node-type-article') {
            // If marquee does not have an image, set height of marquee area
            // so the page height doesn't jump when .view-blog-detail-title is set to fixed position
            if (body.hasClass('blog-marquee-false')) {
              subHeaderElement.parent().height(subHeaderElHeight);
            }
            subHeaderElement.find('.page-title').hide();
            subHeaderElement.find('.page-title-sticky').show();
            chromeHoverBug();
          }
          // Set margin-top to sub-header element, animate downward from top
          subHeaderElement.css('margin-top', '-' + subHeaderElHeight + 'px');
          body.addClass('sticky-sub-header');
          subHeaderElement.animate({marginTop: 0}, 300, function() {
          });
          stickyStatus = true;
        }
        else if (scrollPos < targetPos && stickyStatus === true) {
          // Disable sticky header
          subHeaderElement.animate({marginTop: '-' + subHeaderElHeight}, 200, function() {
            disableSticky();
          });
          stickyStatus = false;
        }
      }
      // This is a awful hack that semi-resolves a bug in Chrome where, when the header is sticky (position:fixed),
      // the share-buttons pop-up inside that is positioned relative and absolute will not appear
      // on :hover until the window is scrolled.
      function chromeHoverBug() {
        $('.content-share-wrapper').hover(
          function() {
            windowContext.scrollTop(scrollPos - 1);
            windowContext.scrollTop(scrollPos + 1);
          }, function() {
            windowContext.scrollTop(scrollPos + 1);
            windowContext.scrollTop(scrollPos - 1);
          }
        );
      }
    }
  };

  // Blog image gallery modifications to aid in creating large active image centered Flexslider.
  Drupal.behaviors.blogImageGallery = {
    attach: function (context, settings) {
      if ($('body').hasClass('node-type-article')) {
        // If there is an image gallery
        if ($('.blog-gallery-2015').length > 0) {
          $('.blog-gallery-2015').each(function(index) {
            if ($(this).children().length > 0) {
              var windowContext = $(window);
              var windowWidth = windowContext.width();

              // Create gallery obj
              var gallery = new galleryConstructor(index, $(this), settings);

              // Once images are loaded: Calc and set dimensions, margins for slide images
              windowContext.load(function() {
                gallery = slidesSetup(gallery);
                initElevateZoom(gallery);
              });

              // On window resize: Recalc image dimensions, margins
              windowContext.on('resize', function() {
                if (gallery.slideshowInitialized && windowWidth !== undefined) {
                  if (windowContext.width !== windowWidth) {
                    windowWidth = windowContext.width();
                    gallery = slidesSetup(gallery);
                    gallery = resetZoom(gallery);
                  }
                }
              });

              // On Flexslider load: Initiate click on slide to jump to that slide
              gallery.flexSliderEl.bind('start', function(e, slider) {
                gallery.currentSlide = slider.currentSlide + 1;
                gallery.slideshowContainer.find('ul.slides').children('li').each(function(index) {
                  $(this).click(function() {
                    slider.flexAnimate(index);
                  });
                });
              });

              // On Flexslider slide change: Position slide images, update pager counter, update caption
              gallery.flexSliderEl.bind('before', function(e, slider) {
                gallery.currentSlide = slider.animatingTo + 1; // Flexslider is zero indexed
                updatePagerCounter(gallery.slideshowContainer, gallery.currentSlide, gallery.totalSlides);
                changeCaption(gallery.slideshowContainer, gallery.currentSlide);
                markFloatLeftSlides(gallery.slideshowContainer, gallery.currentSlide, gallery.animationDuration);
                positionSlides(gallery);
                initElevateZoom(gallery);
              });
            }
          });
        }
      }

      // Gallery object constructor
      function galleryConstructor(galIndex, slideshowContainer, behaviorSettings) {
        this.galIndex = galIndex;
        this.slideshowContainer = slideshowContainer;
        this.flexSliderEl = slideshowContainer.find('.flexslider_views_slideshow_main');
        this.flexSliderElID = '#' + this.flexSliderEl.attr('id');
        var flexSliderOpts = behaviorSettings.flexslider_views_slideshow[this.flexSliderElID].opts;
        this.animationDuration = flexSliderOpts.animationSpeed;
        this.currentSlide = 1;
        this.totalSlides = 0;
        this.zoomStatus = {};
        this.zoomLoaded = {};
        this.zoomedClass = 'zoomContainer-gallery-' + galIndex;
        this.slideDimensions = {};
        this.captionContainerHeight = 0;
        this.slideshowInitialized = false;
        // Misc setup, only run once on page load
        (function miscSetup(context) {
          // Mark slides that should be floated left
          markFloatLeftSlides(context.slideshowContainer, context.currentSlide, context.animationDuration);
          // Create container div for captions
          context.slideshowContainer.find('.views-slideshow-controls-bottom').prepend('<div class="captions-container"></div>');
          // Count slides, add thumbnail pager images, move captions to bottom of slideshow
          context.slideshowContainer.find('ul.slides > li:not(.clone)').each(function () {
            var slideEl = $(this);
            context.totalSlides++;
            // Move caption fields
            slideEl.find('.views-field-field-caption').appendTo(context.slideshowContainer.find('.captions-container'));
            // // Add images to thumbnail pager because Flexslider module is dumb and won't add any image src's
            // var imageSrc = slideEl.find('.views-field-field-uploaded-image img').attr('src');
            // // Give image a smaller image style
            // imageSrc = imageSrc.replace('/578x_post_detail/','/thumbnail/');
            // context.slideshowContainer.find('.flex-control-thumbs li:eq(' + index + ')').find('img').attr('src', imageSrc);
          });
          // Set height of caption container
          context.slideshowContainer.find('.views-field-field-caption').each(function () {
            var captionHeight = $(this).outerHeight(true);
            if (context.captionContainerHeight < captionHeight) {
              context.captionContainerHeight = captionHeight;
            }
          });
          context.slideshowContainer.find('.captions-container').height(context.captionContainerHeight);
          // Make active slide caption visible
          context.slideshowContainer.find('.views-field-field-caption:nth-child(' + context.currentSlide + ')').addClass('active-caption');
          context.slideshowContainer.find('.views-field-field-caption:not(.active-caption)').addClass('non-active-caption');

          // Pager setup
          // Remove pause button
          context.slideshowContainer.find('.views_slideshow_controls_text_pause').remove();
          // Setup pager counter
          context.slideshowContainer.find('.views-slideshow-controls-text-previous').after('<span class="pager-counter"></span>');
          updatePagerCounter(context.slideshowContainer, context.currentSlide, context.totalSlides);
          // Add thumbnail trigger
          // @temporary @todo - Hide thumbnail functionality for now until it can be completed in future sprints.
          context.slideshowContainer.find('.flex-control-thumbs').remove();
          // context.slideshowContainer.find('.views-slideshow-controls-text-next').after('<span class="thumbnails-trigger"></span>');
          // Thumbnail pager functionality
          context.slideshowContainer.find('.flex-control-thumbs li').each(function() {
            $(context).click(function() {
              markFloatLeftSlides(context.slideshowContainer, context.currentSlide, context.animationDuration);
              positionSlides(context);
            });
          });

          // Mobile tweaks
          if (mobileStatus) {
            // Move pager above captions container
            var controlsContainerEl = context.slideshowContainer.find('.views-slideshow-controls-bottom');
            context.slideshowContainer.find('.views-slideshow-controls-text').prependTo(controlsContainerEl);
          }
        })(this);
      }

      // Call all necessary functions to position and resize slide images
      // Called once on page load and again on window resize
      function slidesSetup(galleryObj) {
        // Set slide dimensions
        // Desktop
        if (!mobileStatus) {
          // Configurable options:
          // Max height and width dimensions
          // slideContainerWidth is actually set via CSS
          galleryObj.activeSlideMaxWidth = 700;
          galleryObj.activeSlideMaxHeight = 600;
          galleryObj.nonActiveSlideMaxHeight = 497;
          galleryObj.defaultSlideXMargin = 70;
          galleryObj.slideContainerWidth = 390;
        }
        // Mobile
        else {
          galleryObj.activeSlideMaxWidth = 300;
          galleryObj.activeSlideMaxHeight = 334;
          galleryObj.nonActiveSlideMaxHeight = 97;
          galleryObj.defaultSlideXMargin = 70;
          galleryObj.slideContainerWidth = 250;
        }
        galleryObj.nonActiveSlideMaxWidth = galleryObj.slideContainerWidth - galleryObj.defaultSlideXMargin;
        // Calculate all slide dimensions
        galleryObj = calcSlideDimensions(galleryObj);
        // Determine height of slideshow
        galleryObj = setSlideshowHeight(galleryObj);
        // Calculate margin-tops of slides
        galleryObj = calcSlidesMargins(galleryObj);
        // Position slides, set width and height
        positionSlides(galleryObj);

        // Reveal gallery if it's not already revealed
        if (!galleryObj.slideshowInitialized) {
          galleryObj.slideshowContainer.addClass('gallery-initialized');
        }
        galleryObj.slideshowInitialized = true;
        return galleryObj;
      }

      // elevateZoom functionality, called on slide change
      function initElevateZoom(galleryObj) {
        // Set all zoom variables to false
        for (var i = 1; i <= galleryObj.totalSlides; i++) {
          galleryObj.zoomStatus[i] = false;
          galleryObj.zoomLoaded[i] = false;
        }
        // Remove all zoomed images
        $('.' + galleryObj.zoomedClass).remove();
        // Disable zoom click events for all images
        galleryObj.slideshowContainer.find('ul.slides > li').off('click.zoom tap.zoom touch.zoom');

        // After slide transition, initiate elevateZoom
        setTimeout(function() {
          galleryObj.slideshowContainer.find('ul.slides > li').each(function(index) {
            var nonZeroIndex = index + 1;
            var imageEl = $(this).find('img');
            // If active slide, load zoomed image but keep hidden until click
            // Note: It's necessary to initiate elevateZoom before click to show event. elevateZoom cannot
            // be triggered by click event because of bug where the zoomed image will not appear until after cursor is moved.
            if (nonZeroIndex === galleryObj.currentSlide) {
              var data = {};
              data.galleryObj = galleryObj;
              data.zoomedID = 'gallery-' + data.galleryObj.galIndex + '-zoom-slide-' + galleryObj.currentSlide;
              data.imageEl = imageEl;
              data.zoomSlideElID =  '#' + data.zoomedID;
              loadZoomedImage(data, false);
              enableZoomClick(data);
            }
            else {
              imageEl.off('click.zoom tap.zoom touch.zoom touchstart.zoom');
            }
          });
        }, galleryObj.animationDuration + 100);
      }

      // Initiates elevateZoom for active slide
      function loadZoomedImage(data, showZoom) {
        var currentSlide = data.galleryObj.currentSlide;
        // If image already has elevateZoom initiated, remove and reinitiate
        if (data.galleryObj.zoomLoaded[currentSlide]) {
          $(data.zoomSlideElID).remove();
        }
        data.imageEl.elevateZoom({
          zoomType: "inner",
          cursor: "crosshair",
          easing: true,
          easingDuration: 100,
          loadingIcon: true,
          onZoomedImageLoaded: function() {
            // Add classes and unique ID
            $('.zoomContainer').each(function() {
              if (!($(this).hasClass('zoom-processed'))) {
                $(this).css('-webkit-transform', '').addClass('zoom-processed ' + data.galleryObj.zoomedClass).attr('id', data.zoomedID);
              }
            });
            data.galleryObj.zoomLoaded[currentSlide] = true;
            // Show zoomed image
            if (showZoom) {
              data.galleryObj.zoomStatus[currentSlide] = true;
              $(data.zoomSlideElID).addClass('show-zoom');
            }
          }
        });
        return data;
      }

      // Callback to enable zoom click
      function enableZoomClick(data) {
        data.imageEl.attr('onClick', '');
        data.imageEl.on('click.zoom tap.zoom touch.zoom touchstart.zoom', data, function(e) {
          // Click event
          e.preventDefault();
          var currentSlide = e.data.galleryObj.currentSlide;
          // If image is not zoomed, show
          if (e.data.galleryObj.zoomStatus[currentSlide] === false) {
            // If image is already loaded, show
            if (e.data.galleryObj.zoomLoaded[currentSlide]) {
              e.data.galleryObj.zoomStatus[currentSlide] = true;
              $(e.data.zoomSlideElID).addClass('show-zoom');
            }
            // Else load image then show
            else {
              e.data = loadZoomedImage(e.data, true);
            }
          }
          // If image is zoomed, hide
          else {
            $(e.data.zoomSlideElID).removeClass('show-zoom');
            e.data.galleryObj.zoomStatus[currentSlide] = false;
          }
        });
      }

      // Completely reset elevateZoom
      function resetZoom(galleryObj) {
        $('.zoomContainer').remove();
        for (var i = 1; i <= galleryObj.totalSlides; i++) {
          galleryObj.zoomStatus[i] = false;
          galleryObj.zoomLoaded[i] = false;
        }
        initElevateZoom(galleryObj);
        return galleryObj;
      }

      // Give class to slides whose images should be floated left, called on slide change
      function markFloatLeftSlides(slideshowContainer, currentSlide, animationDuration) {
        var activeSlideEl = slideshowContainer.find('ul.slides > li:nth-child(' + currentSlide + ')');
        activeSlideEl.addClass('transition-left-slide').removeClass('float-left-slide');
        activeSlideEl.nextAll('li:not(.zoomed-slide)').addClass('float-left-slide');
        setTimeout(function() {
          activeSlideEl.removeClass('transition-left-slide');
          activeSlideEl.prevAll('li').removeClass('transition-left-slide');
          activeSlideEl.nextAll('li').addClass('float-left-slide');
        }, animationDuration);
      }

      // Calc dimensions for each slide image, called on page load or resize
      function calcSlideDimensions(galleryObj) {
        var slideCount = 1;
        galleryObj.slideshowContainer.find('ul.slides').children('li').find('img').one('load', function() {
          var slideImageEl = $(this);
          var slideHeight = slideImageEl.height();
          var slideWidth = slideImageEl.width();
          var activeSlideHeight, activeSlideWidth;
          galleryObj.slideDimensions[slideCount] = {};
          // If this is the active slide
          if (slideImageEl.parents('.flex-active-slide').length > 0) {
            // Determine non-active height
            slideHeight = (galleryObj.nonActiveSlideMaxWidth * slideHeight) / slideWidth;
            slideWidth = galleryObj.nonActiveSlideMaxWidth;
          }
          // Make sure the slideHeight !> non-active max-height
          if (slideHeight > galleryObj.nonActiveSlideMaxHeight) {
            slideWidth = (galleryObj.nonActiveSlideMaxHeight * slideWidth) / slideHeight;
            slideHeight = galleryObj.nonActiveSlideMaxHeight;
          }
          // Based on max-height, calc activeSlideWidth
          activeSlideWidth = (galleryObj.activeSlideMaxHeight * slideWidth) / slideHeight;
          // If activeSlideWidth > max-width, calc activeSlideHeight based on max-width
          if (activeSlideWidth > galleryObj.activeSlideMaxWidth) {
            activeSlideWidth = galleryObj.activeSlideMaxWidth;
          }
          activeSlideHeight = (activeSlideWidth * slideHeight) / slideWidth;
          // Save slide dimensions
          galleryObj.slideDimensions[slideCount].slideWidth = slideWidth;
          galleryObj.slideDimensions[slideCount].slideHeight = slideHeight;
          galleryObj.slideDimensions[slideCount].activeSlideWidth = activeSlideWidth;
          galleryObj.slideDimensions[slideCount].activeSlideHeight = activeSlideHeight;
          slideCount++;
        }).each(function() {
          if (this.complete) {
            $(this).load();
          }
        });
        return galleryObj;
      }

      // Calc and set height of slideshow based on tallest slide, called on page load or resize
      function setSlideshowHeight(galleryObj) {
        var tallestSlide = 0;
        for (var i in galleryObj.slideDimensions) {
          var activeSlideHeight = galleryObj.slideDimensions[i].activeSlideHeight;
          // If slide is tallest, update tallestSlide
          if (activeSlideHeight > tallestSlide) {
            tallestSlide = Math.ceil(activeSlideHeight);
          }
        }
        // Set height of slideshow
        galleryObj.slideshowContainer.find('.flexslider').css('height', tallestSlide);
        galleryObj.slideshowHeight = tallestSlide;
        return galleryObj;
      }

      // Calc margins for each slide image, called on page load or resize
      function calcSlidesMargins(galleryObj) {
        for (var i in galleryObj.slideDimensions) {
          var marginTop = 0;
          var activeMarginTop = 0;
          var activeMarginRight = 0;
          var nonActiveXmargin = galleryObj.defaultSlideXMargin;
          var defaultSlideXMargin = galleryObj.defaultSlideXMargin;
          var nonActiveXmargin2 = 0;
          var slideHeight = galleryObj.slideDimensions[i].slideHeight;
          var slideWidth = galleryObj.slideDimensions[i].slideWidth;
          var activeSlideHeight = galleryObj.slideDimensions[i].activeSlideHeight;
          var activeSlideWidth = galleryObj.slideDimensions[i].activeSlideWidth;
          // Calc margin-top
          if (slideHeight < galleryObj.slideshowHeight) {
            marginTop = calcMarginTop(galleryObj.slideshowHeight, slideHeight);
          }
          // Calc active margin-top
          if (activeSlideHeight < galleryObj.slideshowHeight) {
            activeMarginTop = calcMarginTop(galleryObj.slideshowHeight, activeSlideHeight);
          }
          // Calc active margin-right
          if (activeSlideWidth > galleryObj.slideContainerWidth) {
            activeMarginRight = (activeSlideWidth - galleryObj.slideContainerWidth) / 2;
            galleryObj.slideDimensions[i].centerActive = false;
          }
          else {
            activeMarginRight = (galleryObj.slideContainerWidth - activeSlideWidth) / 2;
            galleryObj.slideDimensions[i].centerActive = true;
          }
          // Calc non-active x margins if necessary
          // If image width is smaller than usual, center image
          if (slideWidth < galleryObj.nonActiveSlideMaxWidth) {
            nonActiveXmargin = (galleryObj.nonActiveSlideMaxWidth - slideWidth) / 2;
            nonActiveXmargin2 = nonActiveXmargin + defaultSlideXMargin;
            galleryObj.slideDimensions[i].centerNonActive = true;
          }
          else {
            galleryObj.slideDimensions[i].centerNonActive = false;
          }
          // Save margins
          galleryObj.slideDimensions[i].marginTop = marginTop;
          galleryObj.slideDimensions[i].activeMarginTop = activeMarginTop;
          galleryObj.slideDimensions[i].activeMarginRight = activeMarginRight;
          galleryObj.slideDimensions[i].nonActiveXmargin = nonActiveXmargin;
          galleryObj.slideDimensions[i].nonActiveXmargin2 = nonActiveXmargin2;
        }
        return galleryObj;
      }

      function calcMarginTop(slideshowHeight, slideHeight) {
        var marginTop = slideshowHeight / 2;
        marginTop = marginTop - (slideHeight / 2);
        return marginTop;
      }

      // Set slide image dimensions, margins, called on slide change
      function positionSlides(galleryObj) {
        var slideshowContainer = galleryObj.slideshowContainer;
        var slideContainerWidth = galleryObj.slideContainerWidth;
        var slideDimensions = galleryObj.slideDimensions;
        var currentSlide = galleryObj.currentSlide;
        var slideCount = 1;
        var activeSlideFound = false;
        slideshowContainer.find('ul.slides').children('li').find('img').one('load', function() {
          var slideImageEl = $(this);
          var marginTop = 0;
          // If this is the active slide
          if (slideCount === currentSlide) {
            marginTop = slideDimensions[slideCount].activeMarginTop;
            var activeSlideWidth = slideDimensions[slideCount].activeSlideWidth;
            // Set slide dimensions
            slideImageEl.width(activeSlideWidth);
            slideImageEl.height(slideDimensions[slideCount].activeSlideHeight);
            // Set x margins
            slideImageEl.css({marginLeft: 0});
            var activeMarginRight = slideDimensions[slideCount].activeMarginRight;
            // If image exands beyond it's container
            if (activeSlideWidth > slideContainerWidth) {
              slideImageEl.css({marginRight: '-' + activeMarginRight + 'px'});
              slideImageEl.parents('li').addClass('active-slide-expanded');
            }
            else {
              slideImageEl.css({marginRight: + activeMarginRight});
            }
            // If image should be centered in slide
            if (slideDimensions[slideCount].centerActive) {
              slideImageEl.css({marginLeft: + activeMarginRight});
            }
            activeSlideFound = true;
          }
          // If not the active slide
          else {
            marginTop = slideDimensions[slideCount].marginTop;
            var nonActiveXmargin = slideDimensions[slideCount].nonActiveXmargin;
            var nonActiveXmargin2 = slideDimensions[slideCount].nonActiveXmargin2;
            // Set slide dimensions
            slideImageEl.width(slideDimensions[slideCount].slideWidth);
            slideImageEl.height(slideDimensions[slideCount].slideHeight);
            // If image should not be centered in slide
            if (!slideDimensions[slideCount].centerNonActive) {
              // If slide is before active slide
              if (!activeSlideFound) {
                slideImageEl.css({marginLeft: 0});
                slideImageEl.css({marginRight: + nonActiveXmargin});
              }
              // If after
              else {
                slideImageEl.css({marginRight: 0});
                slideImageEl.css({marginLeft: + nonActiveXmargin});
              }
            }
            // If image should be centered
            else {
              // If slide is before active slide
              if (!activeSlideFound) {
                slideImageEl.css({marginRight: + nonActiveXmargin2});
                slideImageEl.css({marginLeft: + nonActiveXmargin});
              }
              // If slide is after active slide
              else {
                slideImageEl.css({marginRight: + nonActiveXmargin});
                slideImageEl.css({marginLeft: + nonActiveXmargin2});
              }
            }
            setTimeout(function() {
              slideImageEl.parents('li').removeClass('active-slide-expanded');
            }, galleryObj.animationDuration);
          }
          // Set margin-top
          slideImageEl.css('marginTop', marginTop);
          slideCount++;
        }).each(function() {
          if (this.complete) {
            $(this).load();
          }
        });
      }

      // Updates the pager counter, called on slide change
      function updatePagerCounter(slideshowContainer, currentSlide, totalSlides) {
        slideshowContainer.find('.pager-counter').text(currentSlide + ' of ' + totalSlides);
      }

      // Changes the visible slide caption, called on slide change
      function changeCaption(slideshowContainer, currentSlide) {
        slideshowContainer.find('.views-field-field-caption').removeClass('active-caption non-active-caption');
        slideshowContainer.find('.views-field-field-caption:nth-child(' + currentSlide + ')').addClass('active-caption');
        slideshowContainer.find('.views-field-field-caption:not(active-caption)').addClass('non-active-caption');
      }
    }
  };
  // Blog Related Content/Featured Content Carousel
  Drupal.behaviors.blogContentCarousel = {
    attach: function() {
      if ($('body').hasClass('node-type-article')) {
        // If there is a related or featured content carousel
        if ($('.content-carousel').length > 0) {
          $('.content-carousel').each(function() {
            if ($(this).children().length > 0) {
              var carouselContainer = $(this);
              var pagerPrevEl = carouselContainer.find('.views-slideshow-controls-text-previous a');
              var pagerNextEl = carouselContainer.find('.views-slideshow-controls-text-next a');
              var flexSliderEl = carouselContainer.find('.flexslider_views_slideshow_main');
              var currentSlide = 1;
              var slideCount = 0;
              var atEnd = false;
              var carouselContainerWidth = carouselContainer.find('.view-content').width();
              var displayPagers = false;
              var displayPrevPager = false;
              var displayNextPager = true;

              // Remove pause button
              carouselContainer.find('.views_slideshow_controls_text_pause').remove();
              // Remove extra pagers
              carouselContainer.find('.flex-direction-nav').remove();

              // On flexslider load
              flexSliderEl.bind('start', function(e, slider) {
                // Determine whether to show pagers ever
                slideCount = slider.count;
                displayPagers = displayAsCarousel(carouselContainer, carouselContainerWidth, slideCount);
                // Show and hide pagers on hover over carousel, don't show on mobile
                if (displayPagers && !mobileStatus) {
                  carouselContainer.hover(
                    function() {
                      if (displayPrevPager) {
                        pagerPrevEl.addClass('pager-hovered').removeClass('pager-not-hovered');
                      }
                      if (displayNextPager) {
                        pagerNextEl.addClass('pager-hovered').removeClass('pager-not-hovered');
                      }
                    },
                    function() {
                      pagerPrevEl.addClass('pager-not-hovered').removeClass('pager-hovered');
                      pagerNextEl.addClass('pager-not-hovered').removeClass('pager-hovered');
                    }
                  );
                  // Hide and show pagers if at start or end
                  flexSliderEl.bind('after', function(e, slider) {
                    currentSlide = slider.animatingTo + 1; // Flexslider is zero indexed
                    atEnd = slider.atEnd;
                    if (atEnd) {
                      if (currentSlide === 1) {
                        displayPrevPager = false;
                        displayNextPager = true;
                        pagerPrevEl.removeClass('show-pager pager-hovered');
                        pagerNextEl.addClass('show-pager pager-hovered').removeClass('pager-not-hovered');
                      }
                      else {
                        displayNextPager = false;
                        displayPrevPager = true;
                        pagerNextEl.removeClass('show-pager pager-hovered');
                        pagerPrevEl.addClass('show-pager pager-hovered').removeClass('pager-not-hovered');
                      }
                    }
                    else {
                      displayPrevPager = true;
                      displayNextPager = true;
                      pagerPrevEl.addClass('show-pager pager-hovered').removeClass('pager-not-hovered');
                      pagerNextEl.addClass('show-pager pager-hovered').removeClass('pager-not-hovered');
                    }
                  });
                }
              });
            }
            else {
              $(this).remove();
            }
          });
        }
      }
      // Determine whether to show pagers based on combined width of slides
      function displayAsCarousel(carouselContainer, carouselContainerWidth, slideCount) {
        var slidesWidth = carouselContainer.find('ul.slides').children('li').first().outerWidth(true);
        slidesWidth = slidesWidth * slideCount;
        return slidesWidth > carouselContainerWidth;
      }
    }
  };
  // If the content top area is empty, hide empty panes so that margins and padding are gone
  Drupal.behaviors.blogContentTop = {
    attach: function() {
      if ($('body').hasClass('node-type-article')) {
        var hasChildren = false;
        $('.blog-content-top').find('.panel-display').each(function() {
          if ($(this).children().length > 0) {
            hasChildren = true;
          }
        });
        if (!hasChildren) {
          $('.blog-content-top').hide().next().addClass('no-blog-content-top');
        }
      }
    }
  };
  // Scroll to window pos to top of WooBox iframes after quiz is submitted. This solves an issue where
  // when a quiz is submitted, the iframe decreases in height leaving scroll position far below the quiz results.
  Drupal.behaviors.scrollWooBox = {
    attach: function(context, settings) {
      if ($('body').hasClass('node-type-article')) {
        // @TODO setTimeout is hacky but not sure this is worth the time to fix properly
        setTimeout(function() {
          if ($('.woobox-offer')) {
            $('.woobox-offer').each(function() {
              var headerH = $('#header-persistent').outerHeight();
              var subHeaderH = $('.view-blog-detail-title').outerHeight();
              var vertPos = $(this).find('iframe').offset().top - (headerH + subHeaderH + 25);
              $(this).find('iframe').attr('onLoad', 'window.parent.parent.scrollTo(0 ,' + vertPos + ')');
            });
          }
        }, 7000);
      }
    }
  };
})(jQuery);;
/* Author: Metal Toad:  Dan Linn, Tom Martin, Aaron Amstutz, Alex Laughnan */

/* global Drupal, YT, onPlayerReady */

if (!Array.indexOf) {
  Array.prototype.indexOf = function (obj) {
    'use strict';

    for (var i = 0; i < this.length; i++) {
      if (this[i] == obj) {
        return i;
      }
    }
    return -1;
  };
}

// This is used in docroot/sites/all/modules/custom/new_marquee_2013/ajax_video.js
// but defined in this file.
var resizeMarquee;

(function ($) {
  'use strict';

  // Vars
  var gtkTrigger;
  var init = false;
  var marqueeTimer;
  var mobileStatus = false;

  $(document).ready(function () {
    mobileChecker();
    insertionChecker();
  });

  $(window).resize(function () {
    mobileChecker();
  });

  var mobileChecker = function () {
    if ($(window).width() <= 780) {
      mobileStatus = true;
    }
    else {
      mobileStatus = false;
    }
  };

  //display loader
  var insertionChecker = function () {
    var interval = null;
    if ($(".insertion").length) {
      $(".insertion").addClass("loading-indicator-gallery-white");
      $(".view-dc-blog-gallery-2015").css({opacity: 0}); //hide blue container
      function displayLoader() {
        if ($(".gallery-initialized").length) {
          $(".insertion").removeClass("loading-indicator-gallery-white");
          $(".view-dc-blog-gallery-2015").css({opacity: 1}); //show blue container
          clearInterval(interval); // stop the interval
        }
      }
      interval = setInterval(displayLoader, 6000);
    }
  };

  var resizeCharMarquee = function (targetView) {
    var windowHeightOpen = Math.round($(window).width() * 9 / 16);
    var windowHeightClosed = 450;
    var imageHeight = $('#supersized-container #supersized img').height();
    var videoHeight = $('#supersized-container #supersized .fluid-width-video-wrapper iframe').height();
    var thumbsHeight = 0;

    if (targetView === '.view-character-marquee') {
      thumbsHeight = $('#main ' + targetView).height();
    }

    // Increased minimum margin to allow the default height to be 450 for smaller screens per DCCOMICSMA-189
    var marginMin = 140; // Minimum top margin between the gallery thumbnail and the top of the marquee
    var buffer = 60; // Triggers the very short state a little earlier to avoid complications
    // Make sure we have a height, whether it's an image or video
    imageHeight = (imageHeight !== null) ? imageHeight : videoHeight;
    if ($('#supersized-container').length > 0) {
      // Force videos to be the right height
      $('#supersized-container .fluid-width-video-wrapper').css('padding-top', '56.25%');
      // If the marquee gallery is open
      if ($('#supersized-container').hasClass('open')) {
        if (windowHeightOpen <= thumbsHeight + marginMin + buffer) {
          // If the window is very very short
          $('#supersized-container').css('height', (thumbsHeight + $(targetView + ' #controls-wrapper').height()));
          $('#supersized-container + #main').css('margin-top', (marginMin + $(targetView + ' #controls-wrapper').height()));
        } else {
          $('#supersized-container').css('height', windowHeightOpen);
          $('#supersized-container + #main').css('margin-top', (windowHeightOpen - thumbsHeight));
        }
        // If the marquee gallery is closed
      } else {
        // If the image height is less than 60% of the window height, set the marquee height to the image height
        if (windowHeightClosed > imageHeight) {
          $('#supersized-container').css('height', imageHeight);
          $('#supersized-container + #main').css('margin-top', marginMin);
          // If image height is greater than 60% of the window height, constrain marquee height there
        } else {
          if (windowHeightClosed <= thumbsHeight + marginMin + buffer) {
            // If the window is very very short
            $('#supersized-container').css('height', (thumbsHeight + marginMin));
            $('#supersized-container + #main').css('margin-top', marginMin);
          } else {
            $('#supersized-container').css('height', windowHeightClosed);
            $('#supersized-container + #main').css('margin-top', (windowHeightClosed - thumbsHeight));
          }
        }
      }
      $(targetView).addClass('processed');
      $(targetView + '.view-display-id-attachment_1').addClass('processed');
      $('body').fitVids();
    }
  };

  resizeMarquee = function () {
    if ($('.view-three-image-marquee').length > 0) {

      // if ($('.view-three-image-marquee').hasClass('mad-marquee')) {
      //   return;
      // }

      $('.view-three-image-marquee .view-footer .views-row').height($('.view-three-image-marquee .views-row-first.views-row-last').height() / 2 - 5);
      if ($('.faded').length > 0) {
        if ($('.view-three-image-marquee .views-row-first.views-row-last').height() > 300) {
          if ($('.lt-ie9').length > 0) {
            $('.panel-display > .pane-three-image-marquee').animate({opacity: 1}, 1000, function () {
              $('.faded').removeClass('faded');
            });
          } else {
            $('.faded').removeClass('faded');
          }
        } else {
          window.clearTimeout(marqueeTimer);
          marqueeTimer = setTimeout(resizeMarquee, 100);
        }
      }
    }
  };

  var resizeAllMarquees = function () {
    var targetView;
    if (!$('body').hasClass('node-type-article')) {
      targetView = '.view-character-marquee';
    }
    else if ($('body').hasClass('node-type-article')) {
      targetView = '.view-blog-detail-marquee';
    }
    resizeMarquee();
    resizeCharMarquee(targetView);
  };

  // Resize various marquees
  $(window).on('resize', function () {
    resizeAllMarquees();
    if (init) {
      clearTimeout(gtkTrigger);
      gtkTrigger = setTimeout(function () {
        resetGTKmarquee();
      }, 500);
    }
    init = true;
  }).on('load', function () {
    resizeAllMarquees();
  });

  function resetGTKmarquee() {
    if ($('.gtk .views-slideshow-cycle2-main-frame').length > 0) {
      var marqueeID = '#' + $('.gtk .views-slideshow-cycle2-main-frame').attr('id');
      var optionsID = '#' + $('.gtk .views_slideshow_cycle2_main').attr('id');
      var cyclesettings = Drupal.settings.viewsSlideshowCycle2[optionsID].opts;
      $(".gtk .views_slideshow_cycle2_main, .gtk .views-slideshow-cycle2-main-frame, .gtk .views-slideshow-cycle2-main-frame-row").css("height", "auto");
      $(marqueeID).cycle(cyclesettings);
    }
  }

  // Playlist Marker Animating
  Drupal.moveMarker = function (slide) {
    if ($('#playlist-marker').length > 0) {
      var $playlistItems = $('.playlist-menu a');
      if ($playlistItems.length < 1) {
        $playlistItems = $('.comic-menu a');
      }
      var item = $($playlistItems[slide]);
      var pos = item.position();
      var padL = parseInt(item.css('padding-left'), 10);
      var padR = parseInt(item.css('padding-right'), 10);
      var pad = padL + padR;
      var newWidth = parseInt(item.width(), 10) + pad;
      var leftPos = parseInt(pos['left'], 10);
      $('#playlist-marker').css('left', leftPos).css('width', newWidth);
    }
  };

  window.carouselScrolled = false;

  $('.view-id-comic_carousel .jcarousel').touchwipe({
    wipeLeft: function () {
      $(this).jcarousel('next');
    },
    wipeRight: function () {
      $(this).jcarousel('prev');
    }
  });

  Drupal.behaviors.emptyPanelRemove = {
    attach: function (context) {
      /**
       * Skipping this action for the collectibles page.
       */
      if ($('.full2col-mid:last').parents('page-collectibles')) {
        return;
      }
      /* jshint unused: vars */
      var panel = $('.full2col-mid:last .panel-pane').length;
      if (panel < 1) {
        $('.full2col-mid:last').remove();
      }
    }
  };

  Drupal.behaviors.dc_misc = {
    attach: function (context, settings) {
      $('.view-comic-carousel.this-week .view-content').addClass('active');
      var element = $('.view-three-image-marquee video');
      if (element.length > 0) {
        element.each(function () {
          this.muted = "muted";
        });
      }
      $('.comic-menu a').each(function () {
        $(this).click(function (e) {
          e.preventDefault();
          var check = $(this).parent().index();
          Drupal.moveMarker(check);
          $('.comic-menu a').removeClass('flex-active');
          $(this).addClass('flex-active');
          var position = $('.comic-menu li').index($(this).parent());
          if (position === 0 || position === 2) {
            window.carouselScrolled = false;
            $('.view-comic-carousel.this-week .view-content').addClass('active');
            $('.view-comic-carousel.next-week .view-content').removeClass('active');
            $('.view-comic-carousel .browse-next-period').hide();
            $('.view-comic-carousel .browse-this-period').show();
          } else {
            $('.view-comic-carousel.this-week .view-content').removeClass('active');
            $('.view-comic-carousel.next-week .view-content').addClass('active');
            $('.view-comic-carousel .browse-this-period').hide();
            $('.view-comic-carousel .browse-next-period').show();
          }
        });
      });

      // Add You are here marker
      var currentNode = $('.view-comic-carousel').find('.comic-title a.active');

      if (currentNode) {
        currentNode.parent().append('<div class="comic-details-marker">YOU ARE HERE</div>');
      }

      $('.node-type-comic .view-vendor-links .available a').click(function (e) {
        e.preventDefault();
      });

      // Supersized marquee

      // @TODO Fix this.  Isn't there a reliable way to find if an image is loaded in JS?
      // Setup supersized object containing settings
      var supersizedSettings = {
        // Functionality
        slideshow: 1,      // Slideshow on/off
        autoplay: 0,      // Slideshow starts playing automatically
        start_slide: 1,      // Start slide (0 is random)
        stop_loop: 0,      // Pauses slideshow on last slide
        random: 0,      // Randomize slide order (Ignores start slide)
        slide_interval: 3000,   // Length between transitions
        transition: 6,      // 0-None, 1-Fade, 2-Slide Top, 3-Slide Right, 4-Slide Bottom, 5-Slide Left, 6-Carousel Right, 7-Carousel Left
        transition_speed: 1000,   // Speed of transition
        new_window: 0,      // Image links open in new window/tab
        pause_hover: 1,      // Pause slideshow on hover
        keyboard_nav: 1,      // Keyboard navigation on/off
        performance: 1,      // 0-Normal, 1-Hybrid speed/quality, 2-Optimizes image quality, 3-Optimizes transition speed // (Only works for Firefox/IE, not Webkit)
        image_protect: 0,      // Disables image dragging and right click with Javascript

        // Size & Position
        min_width: 0,      // Min width allowed (in pixels)
        min_height: 0,      // Min height allowed (in pixels)
        vertical_center: 0,      // Vertically center background
        horizontal_center: 1,      // Horizontally center background
        fit_always: 0,      // Image will never exceed browser width or height (Ignores min. dimensions)
        fit_portrait: 1,      // Portrait images will not exceed browser height
        fit_landscape: 1,      // Landscape images will not exceed browser width

        // Components
        slide_links: 'num',  // Individual links for each slide (Options: false, 'num', 'name', 'blank')
        thumb_links: 1,      // Individual thumb links for each slide
        thumbnail_navigation: 0,      // Thumbnail navigation

        // Theme Options
        progress_bar: 0,      // Timer for each slide
        mouse_scrub: 0
      };

      // If page is not a Blog node, load Supersized with default settings
      if (!$('body').hasClass('node-type-article')) {
        setTimeout(function () {
          superSizeSetup(function (slideImages) {
            // Add images to settings
            supersizedSettings.slides = slideImages;
            $.supersized(supersizedSettings);
          }, '.view-character-marquee');
        }, 1000);
      }
      // If on a Blog node, load Supersized with different settings
      else if ($('body').hasClass('node-type-article')) {
        setTimeout(function () {
          superSizeSetup(function (slideImages) {
            // Add images to settings
            supersizedSettings.slides = slideImages;
            // Remove slideshow functionality
            supersizedSettings.slideshow = 0;
            $.supersized(supersizedSettings);
          }, '.view-blog-detail-marquee');
        }, 1000);
      }

      function superSizeSetup(callback, targetView) {
        var blogHero;
        if ($(targetView).length > 0) {
          if ($('#supersized').hasClass('processed')) {
            return;
          }

          $('#supersized').addClass('processed');
          $('#supersized-loader').css('display', 'block');
          var slideImages = [];

          // For all pages except Blog nodes
          // Find and add images/video fields
          if (targetView === '.view-character-marquee') {
            $(".view-character-marquee .entity-field-collection-item").each(function () {
              var obj = {};
              if ($(this).find('.field-name-field-embedded-video').length > 0) {
                obj.type = 'YOUTUBE';
                obj.video_id = $(this).find('.field-name-field-embedded-video .field-item').text();
              } else {
                obj.type = "IMAGE";
                obj.image = $(this).find('.field-name-field-uploaded-image img').attr('src');
              }

              // Slide title & caption
              // Do we have both?
              if ($(this).find('.field-name-field-title .field-item').text() && $(this).find('.field-name-field-caption .field-item').text()) {
                obj.title = $(this).find('.field-name-field-title .field-item').html() + ': ' + $(this).find('.field-name-field-caption .field-item').html();
              } else if ($(this).find('.field-name-field-caption .field-item').text()) {
                obj.title = $(this).find('.field-name-field-caption .field-item').html();
              } else {
                obj.title = $(this).find('.field-name-field-title .field-item').html();
              }

              slideImages.push(obj);
            });
          }
          // If Blog node
          // Find and add images/video fields
          else if (targetView === '.view-blog-detail-marquee') {
            var obj = {};
            // If there's a video and site is not mobile, use video
            if (($('.view-blog-detail-marquee .views-field-field-youtube-link').length > 0) && !mobileStatus) {
              obj.type = 'YOUTUBE';
              obj.video_id = $('.view-blog-detail-marquee .views-field-field-youtube-link').text().replace(/ /g, '');
              blogHero = 'video';
              $('body').addClass('blog-marquee-video');
              // If there's an image, use image
            }
            else if ($('.view-blog-detail-marquee .views-field-field-hero-image').length > 0) {
              obj.type = "IMAGE";
              obj.image = $('.view-blog-detail-marquee .views-field-field-hero-image img').attr('src');
              blogHero = 'image';
              $('body').addClass('blog-marquee-image');
            }
            slideImages.push(obj);
          }

          // Load Supersized
          if (slideImages.length > 0) {
            callback(slideImages);

            // Mute Blog marquee videos
            if (targetView === '.view-blog-detail-marquee') {
              var tag = document.createElement('script');
              tag.src = "//www.youtube-nocookie.com/iframe_api";
              var firstScriptTag = document.getElementsByTagName('script')[0];
              firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
              var player;

              window.onYouTubeIframeAPIReady = function () {
                var iframe_id = $('#supersized').find('iframe').attr('id');
                player = new YT.Player(iframe_id, {
                  events: {
                    'onReady': onPlayerReady
                  }
                });
              };

              window.onPlayerReady = function () {
                player.playVideo();
                // Mute!
                player.mute();
              };
            }

            // Load the fitVids after the superSize
            $('body').fitVids();
          }

          // Rearrange dom so that supersized-container is outside #main
          var cont = document.createElement("div");
          $(cont).attr('id', 'supersized-container');
          $(cont).append($('#supersized'));
          if (targetView === '.view-character-marquee') {
            $(cont).append($(targetView));
          }
          else if (targetView === '.view-blog-detail-marquee') {
            $(targetView).remove();
          }

          $('#main').before(cont);

          // Additional setup for non-blog nodes
          if (targetView === '.view-character-marquee') {
            if (slideImages.length > 0) {
              var $next = $('#nextslide').clone(true);
              $next.attr('id', 'topnextslide');
              var $prev = $('#prevslide').clone(true);
              $prev.attr('id', 'topprevslide');
              $('#slidecounter').before($prev).after($next);
            }

            // Add thumb, promos, & title to marquees
            // character
            if ($('.view-character-marquee.character-thumb').children().length > 0) {
              $('#main').prepend($('.view-character-marquee.view-display-id-attachment_1'));
              $('.view-character-marquee.view-display-id-attachment_1 .views-field-title').after($('.view-character-marquee.marquee-promos'));
              // video
            } else if ($('.view-character-marquee.video-thumb').children().length > 0) {
              $('#main').prepend($('.view-character-marquee.view-display-id-attachment_3'));
              $('.view-character-marquee.view-display-id-attachment_3 .view-content').append($('.view-character-marquee.marquee-promos'));
              // comic
            } else if ($('.view-character-marquee.comic-thumb').children().length > 0) {
              $('#main').prepend($('.view-character-marquee.view-display-id-attachment_4'));
              $('.view-character-marquee.view-display-id-attachment_4 .view-content').append($('.view-character-marquee.marquee-promos'));
              // movie
            } else if ($('.view-character-marquee.movie-thumb').children().length > 0) {
              $('#main').prepend($('.view-character-marquee.view-display-id-attachment_5'));
              $('.view-character-marquee.view-display-id-attachment_5 .view-content').append($('.view-character-marquee.marquee-promos'));
              // tv
            } else if ($('.view-character-marquee.tv-thumb').children().length > 0) {
              $('#main').prepend($('.view-character-marquee.view-display-id-attachment_7'));
              $('.view-character-marquee.view-display-id-attachment_7 .view-content').append($('.view-character-marquee.marquee-promos'));
              // game
            } else if ($('.view-character-marquee.game-thumb').children().length > 0) {
              $('#main').prepend($('.view-character-marquee.view-display-id-attachment_6'));
              $('.view-character-marquee.view-display-id-attachment_6 .view-content').append($('.view-character-marquee.marquee-promos'));
              // issue
            } else if ($('.view-character-marquee.issue-thumb').children().length > 0) {
              $('#main').prepend($('.view-character-marquee.issue-thumb'));
              $('.view-character-marquee.issue-thumb .views-field-title').after($('.view-character-marquee.marquee-promos'));
              // talent
            } else if ($('.view-character-marquee.talent-thumb').children().length > 0) {
              $('#main').prepend($('.view-character-marquee.view-display-id-attachment_10'));
              $('.view-character-marquee.view-display-id-attachment_10 .view-content').append($('.view-character-marquee.marquee-promos'));
              // collectibles
            } else if ($('.view-character-marquee.collectible-thumb').children().length > 0) {
              $('#main').prepend($('.view-character-marquee.view-display-id-attachment_11'));
              $('.view-character-marquee.view-display-id-attachment_11 .view-content').append($('.view-character-marquee.marquee-promos'));
            }
            // If promos have no content, don't display them
            if ($('.view-character-marquee.marquee-promos .views-row-1').children().length === 0) {
              $('.view-character-marquee.marquee-promos').css('display', 'none');
            }

            resizeCharMarquee(targetView);

            if (slideImages.length > 0 && $(window).width() >= 781) {
              $('.thumb-trigger, .closebutton').click(function () {
                $('#supersized-container').toggleClass('open');
                resizeCharMarquee(targetView);
                var button = $('.thumb-trigger-label');
                if ($('#supersized-container').hasClass('open')) {
                  button.text('CLOSE GALLERY');
                } else {
                  button.text('VIEW GALLERY');
                }
              });
            } else {
              // If there are no slides, remove the "View Gallery" label.
              $('.thumb-trigger-label').css('display', 'none');
              // And don't pretend to be clickable.
              $('.thumb-trigger').css('cursor', 'auto');
            }
          }
          // Additional setup for Blog nodes
          else if (targetView === '.view-blog-detail-marquee') {
            if ($('#supersized-container').length > 0) {
              $('body').addClass('blog-marquee-true');
            }
            // Move Drupal messages to avoid blog title View overlapping
            $('.full2col-mid').prepend($('.messages'));

            resizeCharMarquee(targetView);
            // Make title area view visible
            $('.view-blog-detail-title').show();
          }
          $('#supersized-loader').css('display', 'none');
        } else {
          $('#supersized').remove();
          $('#supersized-loader').remove();
        }
      }

      // Starring thumbnail tooltips
      $('.subpage-callout.tooltip').each(function () {
        $(this).css('left', -($(this).width() / 2));
      });

      // adding some logic to have this only affect non dc_comics_bp themes
      // dc_comics_bp's script.js handles allsitesMenu
      if (!$('body').hasClass('domain-adev-dccomics-com') && !$('body').hasClass('domain-www-dccomics-com')) {
        // Adds a logowrap div for styling purposes
        $('#header-persistent').once(function () {
          $(this).prepend("<div class='logowrap'></div>");
          // Change the search button text
          $('#block-search-form .form-submit').attr("value", "go");

          // Add All Sites text
          $('#block-search-form').prepend('<a href="#">search</a>');
          $('#block-system-main-menu').prepend('<div class="title droparrow all-sites"><a href="#">all sites</a></div>');

          $('.social-trigger').prepend('<a href="#" class="fake-link">&nbsp;</a>');

          // This is a hack to allow 'hover' on mobile
          $('#block-search-form a, .all-sites a, .fake-link').click(function (event) {
            event.preventDefault();
          });
        });
      }

      var mustListPre = "dcml";
      var heroPre = "dchero";
      var factoidPre;

      if ($('.front').length > 0) {
        factoidPre = "dchpff";
      } else if ($('.page-videos').length > 0) {
        factoidPre = "dcvmff";
      } else if ($('.node-type-video').length > 0) {
        factoidPre = "dcvdff";
      } else {
        factoidPre = "dcff";
      }

      // Adds the Omniture tags but checks for existing querystrings first
      function addQuery(link, query) {
        var newLink = (link.split('?').length > 1) ? link + "&" + query : link + "?" + query;
        return newLink;
      }

      // Add omniture tags to must list links
      $('.view-must-list').once(function () {
        var rows = $('.view-must-list .views-row .must-list-link a');
        for (var i = 0, len = rows.length; i < len; i++) {
          var newLink = mustListPre + (i + 1) + "_" + $($('.view-must-list .cover')[i]).find('img').attr('title');
          $($('.view-must-list .cover a')[i]).attr('href', addQuery($(rows[i]).attr('href'), "adid=" + newLink));
          $(rows[i]).attr('href', addQuery($(rows[i]).attr('href'), "adid=" + newLink));
        }
      });

      // Placeholder - Oh how I long for the days when the placeholder attribute is fully supported.
      $('#edit-search-block-form--2').attr('value', 'Search').focus(function () {
        if ($(this).attr('value') == 'Search') {
          $(this).attr('value', '');
        }
      }).blur(function () {
        if ($(this).attr('value') === '') {
          $(this).attr('value', 'Search');
        }
      });

      $('.search-filter.browse-filter input').attr('value', 'Search').focus(function () {
        if ($(this).attr('value') == 'Search') {
          $(this).attr('value', '');
        }
      }).blur(function () {
        if ($(this).attr('value') === '') {
          $(this).attr('value', 'Search');
        }
      });

      $('.date_range-filter.browse-filter input').attr('value', 'mm/dd/yyyy').focus(function () {
        if ($(this).attr('value') == 'mm/dd/yyyy') {
          $(this).attr('value', '');
        }
      }).blur(function () {
        if ($(this).attr('value') === '') {
          $(this).attr('value', 'mm/dd/yyyy');
        }
      });

      $('.content-share a').on('touchstart', function (event, elem) {
        /* jshint unused: vars */
        if ($(this).attr('href') !== "" && $(this).attr('href') != "#") {
        }
      });

      var shareHoverStatus = false;
      // Content Social Share hover effect
      $('.content-share-wrapper').hover(
        function () {
          shareHoverStatus = true;
          $(this).addClass('hover');
        }, function () {
          var thisEl = $(this);
          shareHoverStatus = false;
          setTimeout(function () {
            if (!shareHoverStatus) {
              thisEl.removeClass('hover');
            }
          }, 200);
        }
      );

      // Content Social Share hover effects for News and Video content types
      $('.social-trigger, .field-name-social').hover(
        function () {
          $(this).children('.pane-content, .field-items').addClass('hover');
        }, function () {
          $(this).children('.pane-content, .field-items').removeClass('hover');
        }
      );

      // Fixed header
      // With added parralax for Char marquee
      if ($('#header-persistent').length > 0) {
        var top = $('#header-persistent').offset().top - parseFloat($('#header-persistent').css('margin-top').replace(/auto/, 0));

        $(window).scroll(function (event) {
          /* jshint unused: vars */
          var y = $(this).scrollTop();
          var z = $("html").scrollTop();
          var d = $("#header-persistent");
          var s = $('#supersized-container');
          var m = $('#main');
          var l = $('#logo');

          if (y >= top || z >= top) {
            d.addClass('persisting');
            if (s.length > 0) {
              s.addClass('fixie');
              m.addClass('fixie');
            }
            // scroll small logo into place
            l.addClass('logo-small');
          } else {
            d.removeClass('persisting');
            s.removeClass('fixie');
            m.removeClass('fixie');
            l.removeClass('logo-small');
          }
        });
      }
      // if they've click "load more" on the Comic Series (all) section, remove pager
      if (settings.loadAllComicSeries) {
        // remove the "load more"
        $('.pager-load-more').hide();
      }
    }
  };

  Drupal.behaviors.recentActivity = {
    attach: function (context) {
      var menu = $('.detail-recent-activity .filter-wrapper ul'),
        target = '<div class="drop-trigger">ALL</div>';
      if ($('.detail-recent-activity .filter-wrapper .drop-trigger').length === 0) {
        menu.before(target);
      }
      $('.detail-recent-activity .filter-wrapper li', context).on('click touchend', function (e) {
        e.preventDefault(); // prevent additional click event from touchend events.
        $('.detail-recent-activity .drop-trigger').html($(this).text());
        $(this).parent('ul').removeClass('open');
      });
      $('.filter-wrapper .drop-trigger', context).on('click touchend', function (e) {
        e.preventDefault(); // prevent additional click event from touchend events.
        $(this).parent().siblings().next('ul').removeClass('open');
        $(this).next('ul').addClass('open');
      });

    }
  };

  Drupal.behaviors.browseFilter = {
    attach: function (context) {
      /* jshint unused: vars */

      $('.browse .filter-wrapper li').click(function () {
        $(this).parent().siblings('.drop-trigger').html($(this).text());
        $(this).parent('ul').removeClass('open');
      });
      $('.browse .filter-wrapper li.active').each(function () {
        $(this).parent().siblings('.drop-trigger').html($(this).text());
      });
      $('.browse .drop-trigger').click(function () {
        $('.browse-filter ul').removeClass('open');
        $(this).next('ul').addClass('open');
      });

    }
  };

  Drupal.behaviors.talentCredits = {
    attach: function (context) {
      // Open and close the list sections
      // $('.pane-talent-related-content-credits-pane .pane-content').hide();
      $('.talent-section').first().addClass('open').children('table').slideToggle(0);
      $('.talent-section h2', context).on('click touchend', function () {
        // If section is closed, open it
        if (!$(this).parent().hasClass('open')) {
          $('.talent-section.open table').slideToggle('fast');
          $('.talent-section').removeClass('open');
          $(this).parent().addClass('open');
          $(this).next().slideToggle('fast');
        }
        // If section is open, close it
        else {
          $('.talent-section.open table').slideToggle('fast');
          $('.talent-section').removeClass('open');
        }
      });
    }
  };

  Drupal.behaviors.resetMarquees = {
    attach: function (context) {
      /* jshint unused: vars */
      resizeAllMarquees();
      clearTimeout(gtkTrigger);
      gtkTrigger = setTimeout(function () {
        resetGTKmarquee();
      }, 500);
    }
  };

  Drupal.behaviors.resetCurrentSeries = {
    attach: function (context, settings) {
      /* jshint unused: vars */
      if ($('.current-series').hasClass('resetProcessed')) {
        return;
      }
      $('.current-series').addClass('resetProcessed');
      var button = '<ul class="pager"><li><a href="#" class="series-toggle open">see less</a></li></ul>',
        sections = $('.current-series .views-row-first'),
        cache;
      if (sections.length > 1) {
        cache = $('.current-series .views-row-first:eq(1)').nextAll().andSelf();
        $('.current-series .item-list').append(button);
        $('.current-series a.series-toggle').on('click touchend', function (e) {
          e.preventDefault();
          $(cache).toggle();
          if (!$('.series-toggle')) {
            $('.current-series .item-list .pager').replace(button);
          } else {
            $('.series-toggle').text(function (i, text) {
              return text === 'see less' ? 'load all current series' : 'see less';
            }).toggleClass('open');
          }
        });
      }
    }
  };
})(jQuery);
;
/* jQuery elevateZoom 3.0.8 - Demo's and documentation: - www.elevateweb.co.uk/image-zoom - Copyright (c) 2013 Andrew Eades - www.elevateweb.co.uk - Dual licensed under the LGPL licenses. - http://en.wikipedia.org/wiki/MIT_License - http://en.wikipedia.org/wiki/GNU_General_Public_License */
"function"!==typeof Object.create&&(Object.create=function(d){function h(){}h.prototype=d;return new h});
(function(d,h,l,m){var k={init:function(b,a){var c=this;c.elem=a;c.$elem=d(a);c.imageSrc=c.$elem.data("zoom-image")?c.$elem.data("zoom-image"):c.$elem.attr("src");c.options=d.extend({},d.fn.elevateZoom.options,b);c.options.tint&&(c.options.lensColour="none",c.options.lensOpacity="1");"inner"==c.options.zoomType&&(c.options.showLens=!1);c.$elem.parent().removeAttr("title").removeAttr("alt");c.zoomImage=c.imageSrc;c.refresh(1);d("#"+c.options.gallery+" a").click(function(a){c.options.galleryActiveClass&&
(d("#"+c.options.gallery+" a").removeClass(c.options.galleryActiveClass),d(this).addClass(c.options.galleryActiveClass));a.preventDefault();d(this).data("zoom-image")?c.zoomImagePre=d(this).data("zoom-image"):c.zoomImagePre=d(this).data("image");c.swaptheimage(d(this).data("image"),c.zoomImagePre);return!1})},refresh:function(b){var a=this;setTimeout(function(){a.fetch(a.imageSrc)},b||a.options.refresh)},fetch:function(b){var a=this,c=new Image;c.onload=function(){a.largeWidth=c.width;a.largeHeight=
c.height;a.startZoom();a.currentImage=a.imageSrc;a.options.onZoomedImageLoaded(a.$elem)};c.src=b},startZoom:function(){var b=this;b.nzWidth=b.$elem.width();b.nzHeight=b.$elem.height();b.isWindowActive=!1;b.isLensActive=!1;b.isTintActive=!1;b.overWindow=!1;b.options.imageCrossfade&&(b.zoomWrap=b.$elem.wrap('<div style="height:'+b.nzHeight+"px;width:"+b.nzWidth+'px;" class="zoomWrapper" />'),b.$elem.css("position","absolute"));b.zoomLock=1;b.scrollingLock=!1;b.changeBgSize=!1;b.currentZoomLevel=b.options.zoomLevel;
b.nzOffset=b.$elem.offset();b.widthRatio=b.largeWidth/b.currentZoomLevel/b.nzWidth;b.heightRatio=b.largeHeight/b.currentZoomLevel/b.nzHeight;"window"==b.options.zoomType&&(b.zoomWindowStyle="overflow: hidden;background-position: 0px 0px;text-align:center;background-color: "+String(b.options.zoomWindowBgColour)+";width: "+String(b.options.zoomWindowWidth)+"px;height: "+String(b.options.zoomWindowHeight)+"px;float: left;background-size: "+b.largeWidth/b.currentZoomLevel+"px "+b.largeHeight/b.currentZoomLevel+
"px;display: none;z-index:100;border: "+String(b.options.borderSize)+"px solid "+b.options.borderColour+";background-repeat: no-repeat;position: absolute;");if("inner"==b.options.zoomType){var a=b.$elem.css("border-left-width");b.zoomWindowStyle="overflow: hidden;margin-left: "+String(a)+";margin-top: "+String(a)+";background-position: 0px 0px;width: "+String(b.nzWidth)+"px;height: "+String(b.nzHeight)+"px;float: left;display: none;cursor:"+b.options.cursor+";px solid "+b.options.borderColour+";background-repeat: no-repeat;position: absolute;"}"window"==
b.options.zoomType&&(lensHeight=b.nzHeight<b.options.zoomWindowWidth/b.widthRatio?b.nzHeight:String(b.options.zoomWindowHeight/b.heightRatio),lensWidth=b.largeWidth<b.options.zoomWindowWidth?b.nzWidth:b.options.zoomWindowWidth/b.widthRatio,b.lensStyle="background-position: 0px 0px;width: "+String(b.options.zoomWindowWidth/b.widthRatio)+"px;height: "+String(b.options.zoomWindowHeight/b.heightRatio)+"px;float: right;display: none;overflow: hidden;z-index: 999;-webkit-transform: translateZ(0);opacity:"+
b.options.lensOpacity+";filter: alpha(opacity = "+100*b.options.lensOpacity+"); zoom:1;width:"+lensWidth+"px;height:"+lensHeight+"px;background-color:"+b.options.lensColour+";cursor:"+b.options.cursor+";border: "+b.options.lensBorderSize+"px solid "+b.options.lensBorderColour+";background-repeat: no-repeat;position: absolute;");b.tintStyle="display: block;position: absolute;background-color: "+b.options.tintColour+";filter:alpha(opacity=0);opacity: 0;width: "+b.nzWidth+"px;height: "+b.nzHeight+"px;";
b.lensRound="";"lens"==b.options.zoomType&&(b.lensStyle="background-position: 0px 0px;float: left;display: none;border: "+String(b.options.borderSize)+"px solid "+b.options.borderColour+";width:"+String(b.options.lensSize)+"px;height:"+String(b.options.lensSize)+"px;background-repeat: no-repeat;position: absolute;");"round"==b.options.lensShape&&(b.lensRound="border-top-left-radius: "+String(b.options.lensSize/2+b.options.borderSize)+"px;border-top-right-radius: "+String(b.options.lensSize/2+b.options.borderSize)+
"px;border-bottom-left-radius: "+String(b.options.lensSize/2+b.options.borderSize)+"px;border-bottom-right-radius: "+String(b.options.lensSize/2+b.options.borderSize)+"px;");b.zoomContainer=d('<div class="zoomContainer" style="-webkit-transform: translateZ(0);position:absolute;left:'+b.nzOffset.left+"px;top:"+b.nzOffset.top+"px;height:"+b.nzHeight+"px;width:"+b.nzWidth+'px;"></div>');d("body").append(b.zoomContainer);b.options.containLensZoom&&"lens"==b.options.zoomType&&b.zoomContainer.css("overflow",
"hidden");"inner"!=b.options.zoomType&&(b.zoomLens=d("<div class='zoomLens' style='"+b.lensStyle+b.lensRound+"'>&nbsp;</div>").appendTo(b.zoomContainer).click(function(){b.$elem.trigger("click")}),b.options.tint&&(b.tintContainer=d("<div/>").addClass("tintContainer"),b.zoomTint=d("<div class='zoomTint' style='"+b.tintStyle+"'></div>"),b.zoomLens.wrap(b.tintContainer),b.zoomTintcss=b.zoomLens.after(b.zoomTint),b.zoomTintImage=d('<img style="position: absolute; left: 0px; top: 0px; max-width: none; width: '+
b.nzWidth+"px; height: "+b.nzHeight+'px;" src="'+b.imageSrc+'">').appendTo(b.zoomLens).click(function(){b.$elem.trigger("click")})));isNaN(b.options.zoomWindowPosition)?b.zoomWindow=d("<div style='z-index:999;left:"+b.windowOffsetLeft+"px;top:"+b.windowOffsetTop+"px;"+b.zoomWindowStyle+"' class='zoomWindow'>&nbsp;</div>").appendTo("body").click(function(){b.$elem.trigger("click")}):b.zoomWindow=d("<div style='z-index:999;left:"+b.windowOffsetLeft+"px;top:"+b.windowOffsetTop+"px;"+b.zoomWindowStyle+
"' class='zoomWindow'>&nbsp;</div>").appendTo(b.zoomContainer).click(function(){b.$elem.trigger("click")});b.zoomWindowContainer=d("<div/>").addClass("zoomWindowContainer").css("width",b.options.zoomWindowWidth);b.zoomWindow.wrap(b.zoomWindowContainer);"lens"==b.options.zoomType&&b.zoomLens.css({backgroundImage:"url('"+b.imageSrc+"')"});"window"==b.options.zoomType&&b.zoomWindow.css({backgroundImage:"url('"+b.imageSrc+"')"});"inner"==b.options.zoomType&&b.zoomWindow.css({backgroundImage:"url('"+b.imageSrc+
"')"});b.$elem.bind("touchmove",function(a){a.preventDefault();b.setPosition(a.originalEvent.touches[0]||a.originalEvent.changedTouches[0])});b.zoomContainer.bind("touchmove",function(a){"inner"==b.options.zoomType&&b.showHideWindow("show");a.preventDefault();b.setPosition(a.originalEvent.touches[0]||a.originalEvent.changedTouches[0])});b.zoomContainer.bind("touchend",function(a){b.showHideWindow("hide");b.options.showLens&&b.showHideLens("hide");b.options.tint&&"inner"!=b.options.zoomType&&b.showHideTint("hide")});
b.$elem.bind("touchend",function(a){b.showHideWindow("hide");b.options.showLens&&b.showHideLens("hide");b.options.tint&&"inner"!=b.options.zoomType&&b.showHideTint("hide")});b.options.showLens&&(b.zoomLens.bind("touchmove",function(a){a.preventDefault();b.setPosition(a.originalEvent.touches[0]||a.originalEvent.changedTouches[0])}),b.zoomLens.bind("touchend",function(a){b.showHideWindow("hide");b.options.showLens&&b.showHideLens("hide");b.options.tint&&"inner"!=b.options.zoomType&&b.showHideTint("hide")}));
b.$elem.bind("mousemove",function(a){!1==b.overWindow&&b.setElements("show");if(b.lastX!==a.clientX||b.lastY!==a.clientY)b.setPosition(a),b.currentLoc=a;b.lastX=a.clientX;b.lastY=a.clientY});b.zoomContainer.bind("mousemove",function(a){!1==b.overWindow&&b.setElements("show");if(b.lastX!==a.clientX||b.lastY!==a.clientY)b.setPosition(a),b.currentLoc=a;b.lastX=a.clientX;b.lastY=a.clientY});"inner"!=b.options.zoomType&&b.zoomLens.bind("mousemove",function(a){if(b.lastX!==a.clientX||b.lastY!==a.clientY)b.setPosition(a),
b.currentLoc=a;b.lastX=a.clientX;b.lastY=a.clientY});b.options.tint&&"inner"!=b.options.zoomType&&b.zoomTint.bind("mousemove",function(a){if(b.lastX!==a.clientX||b.lastY!==a.clientY)b.setPosition(a),b.currentLoc=a;b.lastX=a.clientX;b.lastY=a.clientY});"inner"==b.options.zoomType&&b.zoomWindow.bind("mousemove",function(a){if(b.lastX!==a.clientX||b.lastY!==a.clientY)b.setPosition(a),b.currentLoc=a;b.lastX=a.clientX;b.lastY=a.clientY});b.zoomContainer.add(b.$elem).mouseenter(function(){!1==b.overWindow&&
b.setElements("show")}).mouseleave(function(){b.scrollLock||b.setElements("hide")});"inner"!=b.options.zoomType&&b.zoomWindow.mouseenter(function(){b.overWindow=!0;b.setElements("hide")}).mouseleave(function(){b.overWindow=!1});b.minZoomLevel=b.options.minZoomLevel?b.options.minZoomLevel:2*b.options.scrollZoomIncrement;b.options.scrollZoom&&b.zoomContainer.add(b.$elem).bind("mousewheel DOMMouseScroll MozMousePixelScroll",function(a){b.scrollLock=!0;clearTimeout(d.data(this,"timer"));d.data(this,"timer",
setTimeout(function(){b.scrollLock=!1},250));var e=a.originalEvent.wheelDelta||-1*a.originalEvent.detail;a.stopImmediatePropagation();a.stopPropagation();a.preventDefault();0<e/120?b.currentZoomLevel>=b.minZoomLevel&&b.changeZoomLevel(b.currentZoomLevel-b.options.scrollZoomIncrement):b.options.maxZoomLevel?b.currentZoomLevel<=b.options.maxZoomLevel&&b.changeZoomLevel(parseFloat(b.currentZoomLevel)+b.options.scrollZoomIncrement):b.changeZoomLevel(parseFloat(b.currentZoomLevel)+b.options.scrollZoomIncrement);
return!1})},setElements:function(b){if(!this.options.zoomEnabled)return!1;"show"==b&&this.isWindowSet&&("inner"==this.options.zoomType&&this.showHideWindow("show"),"window"==this.options.zoomType&&this.showHideWindow("show"),this.options.showLens&&this.showHideLens("show"),this.options.tint&&"inner"!=this.options.zoomType&&this.showHideTint("show"));"hide"==b&&("window"==this.options.zoomType&&this.showHideWindow("hide"),this.options.tint||this.showHideWindow("hide"),this.options.showLens&&this.showHideLens("hide"),
this.options.tint&&this.showHideTint("hide"))},setPosition:function(b){if(!this.options.zoomEnabled)return!1;this.nzHeight=this.$elem.height();this.nzWidth=this.$elem.width();this.nzOffset=this.$elem.offset();this.options.tint&&"inner"!=this.options.zoomType&&(this.zoomTint.css({top:0}),this.zoomTint.css({left:0}));this.options.responsive&&!this.options.scrollZoom&&this.options.showLens&&(lensHeight=this.nzHeight<this.options.zoomWindowWidth/this.widthRatio?this.nzHeight:String(this.options.zoomWindowHeight/
this.heightRatio),lensWidth=this.largeWidth<this.options.zoomWindowWidth?this.nzWidth:this.options.zoomWindowWidth/this.widthRatio,this.widthRatio=this.largeWidth/this.nzWidth,this.heightRatio=this.largeHeight/this.nzHeight,"lens"!=this.options.zoomType&&(lensHeight=this.nzHeight<this.options.zoomWindowWidth/this.widthRatio?this.nzHeight:String(this.options.zoomWindowHeight/this.heightRatio),lensWidth=this.options.zoomWindowWidth<this.options.zoomWindowWidth?this.nzWidth:this.options.zoomWindowWidth/
this.widthRatio,this.zoomLens.css("width",lensWidth),this.zoomLens.css("height",lensHeight),this.options.tint&&(this.zoomTintImage.css("width",this.nzWidth),this.zoomTintImage.css("height",this.nzHeight))),"lens"==this.options.zoomType&&this.zoomLens.css({width:String(this.options.lensSize)+"px",height:String(this.options.lensSize)+"px"}));this.zoomContainer.css({top:this.nzOffset.top});this.zoomContainer.css({left:this.nzOffset.left});this.mouseLeft=parseInt(b.pageX-this.nzOffset.left);this.mouseTop=
parseInt(b.pageY-this.nzOffset.top);"window"==this.options.zoomType&&(this.Etoppos=this.mouseTop<this.zoomLens.height()/2,this.Eboppos=this.mouseTop>this.nzHeight-this.zoomLens.height()/2-2*this.options.lensBorderSize,this.Eloppos=this.mouseLeft<0+this.zoomLens.width()/2,this.Eroppos=this.mouseLeft>this.nzWidth-this.zoomLens.width()/2-2*this.options.lensBorderSize);"inner"==this.options.zoomType&&(this.Etoppos=this.mouseTop<this.nzHeight/2/this.heightRatio,this.Eboppos=this.mouseTop>this.nzHeight-
this.nzHeight/2/this.heightRatio,this.Eloppos=this.mouseLeft<0+this.nzWidth/2/this.widthRatio,this.Eroppos=this.mouseLeft>this.nzWidth-this.nzWidth/2/this.widthRatio-2*this.options.lensBorderSize);0>=this.mouseLeft||0>this.mouseTop||this.mouseLeft>this.nzWidth||this.mouseTop>this.nzHeight?this.setElements("hide"):(this.options.showLens&&(this.lensLeftPos=String(this.mouseLeft-this.zoomLens.width()/2),this.lensTopPos=String(this.mouseTop-this.zoomLens.height()/2)),this.Etoppos&&(this.lensTopPos=0),
this.Eloppos&&(this.tintpos=this.lensLeftPos=this.windowLeftPos=0),"window"==this.options.zoomType&&(this.Eboppos&&(this.lensTopPos=Math.max(this.nzHeight-this.zoomLens.height()-2*this.options.lensBorderSize,0)),this.Eroppos&&(this.lensLeftPos=this.nzWidth-this.zoomLens.width()-2*this.options.lensBorderSize)),"inner"==this.options.zoomType&&(this.Eboppos&&(this.lensTopPos=Math.max(this.nzHeight-2*this.options.lensBorderSize,0)),this.Eroppos&&(this.lensLeftPos=this.nzWidth-this.nzWidth-2*this.options.lensBorderSize)),
"lens"==this.options.zoomType&&(this.windowLeftPos=String(-1*((b.pageX-this.nzOffset.left)*this.widthRatio-this.zoomLens.width()/2)),this.windowTopPos=String(-1*((b.pageY-this.nzOffset.top)*this.heightRatio-this.zoomLens.height()/2)),this.zoomLens.css({backgroundPosition:this.windowLeftPos+"px "+this.windowTopPos+"px"}),this.changeBgSize&&(this.nzHeight>this.nzWidth?("lens"==this.options.zoomType&&this.zoomLens.css({"background-size":this.largeWidth/this.newvalueheight+"px "+this.largeHeight/this.newvalueheight+
"px"}),this.zoomWindow.css({"background-size":this.largeWidth/this.newvalueheight+"px "+this.largeHeight/this.newvalueheight+"px"})):("lens"==this.options.zoomType&&this.zoomLens.css({"background-size":this.largeWidth/this.newvaluewidth+"px "+this.largeHeight/this.newvaluewidth+"px"}),this.zoomWindow.css({"background-size":this.largeWidth/this.newvaluewidth+"px "+this.largeHeight/this.newvaluewidth+"px"})),this.changeBgSize=!1),this.setWindowPostition(b)),this.options.tint&&"inner"!=this.options.zoomType&&
this.setTintPosition(b),"window"==this.options.zoomType&&this.setWindowPostition(b),"inner"==this.options.zoomType&&this.setWindowPostition(b),this.options.showLens&&(this.fullwidth&&"lens"!=this.options.zoomType&&(this.lensLeftPos=0),this.zoomLens.css({left:this.lensLeftPos+"px",top:this.lensTopPos+"px"})))},showHideWindow:function(b){"show"!=b||this.isWindowActive||(this.options.zoomWindowFadeIn?this.zoomWindow.stop(!0,!0,!1).fadeIn(this.options.zoomWindowFadeIn):this.zoomWindow.show(),this.isWindowActive=
!0);"hide"==b&&this.isWindowActive&&(this.options.zoomWindowFadeOut?this.zoomWindow.stop(!0,!0).fadeOut(this.options.zoomWindowFadeOut):this.zoomWindow.hide(),this.isWindowActive=!1)},showHideLens:function(b){"show"!=b||this.isLensActive||(this.options.lensFadeIn?this.zoomLens.stop(!0,!0,!1).fadeIn(this.options.lensFadeIn):this.zoomLens.show(),this.isLensActive=!0);"hide"==b&&this.isLensActive&&(this.options.lensFadeOut?this.zoomLens.stop(!0,!0).fadeOut(this.options.lensFadeOut):this.zoomLens.hide(),
this.isLensActive=!1)},showHideTint:function(b){"show"!=b||this.isTintActive||(this.options.zoomTintFadeIn?this.zoomTint.css({opacity:this.options.tintOpacity}).animate().stop(!0,!0).fadeIn("slow"):(this.zoomTint.css({opacity:this.options.tintOpacity}).animate(),this.zoomTint.show()),this.isTintActive=!0);"hide"==b&&this.isTintActive&&(this.options.zoomTintFadeOut?this.zoomTint.stop(!0,!0).fadeOut(this.options.zoomTintFadeOut):this.zoomTint.hide(),this.isTintActive=!1)},setLensPostition:function(b){},
setWindowPostition:function(b){var a=this;if(isNaN(a.options.zoomWindowPosition))a.externalContainer=d("#"+a.options.zoomWindowPosition),a.externalContainerWidth=a.externalContainer.width(),a.externalContainerHeight=a.externalContainer.height(),a.externalContainerOffset=a.externalContainer.offset(),a.windowOffsetTop=a.externalContainerOffset.top,a.windowOffsetLeft=a.externalContainerOffset.left;else switch(a.options.zoomWindowPosition){case 1:a.windowOffsetTop=a.options.zoomWindowOffety;a.windowOffsetLeft=
+a.nzWidth;break;case 2:a.options.zoomWindowHeight>a.nzHeight&&(a.windowOffsetTop=-1*(a.options.zoomWindowHeight/2-a.nzHeight/2),a.windowOffsetLeft=a.nzWidth);break;case 3:a.windowOffsetTop=a.nzHeight-a.zoomWindow.height()-2*a.options.borderSize;a.windowOffsetLeft=a.nzWidth;break;case 4:a.windowOffsetTop=a.nzHeight;a.windowOffsetLeft=a.nzWidth;break;case 5:a.windowOffsetTop=a.nzHeight;a.windowOffsetLeft=a.nzWidth-a.zoomWindow.width()-2*a.options.borderSize;break;case 6:a.options.zoomWindowHeight>
a.nzHeight&&(a.windowOffsetTop=a.nzHeight,a.windowOffsetLeft=-1*(a.options.zoomWindowWidth/2-a.nzWidth/2+2*a.options.borderSize));break;case 7:a.windowOffsetTop=a.nzHeight;a.windowOffsetLeft=0;break;case 8:a.windowOffsetTop=a.nzHeight;a.windowOffsetLeft=-1*(a.zoomWindow.width()+2*a.options.borderSize);break;case 9:a.windowOffsetTop=a.nzHeight-a.zoomWindow.height()-2*a.options.borderSize;a.windowOffsetLeft=-1*(a.zoomWindow.width()+2*a.options.borderSize);break;case 10:a.options.zoomWindowHeight>a.nzHeight&&
(a.windowOffsetTop=-1*(a.options.zoomWindowHeight/2-a.nzHeight/2),a.windowOffsetLeft=-1*(a.zoomWindow.width()+2*a.options.borderSize));break;case 11:a.windowOffsetTop=a.options.zoomWindowOffety;a.windowOffsetLeft=-1*(a.zoomWindow.width()+2*a.options.borderSize);break;case 12:a.windowOffsetTop=-1*(a.zoomWindow.height()+2*a.options.borderSize);a.windowOffsetLeft=-1*(a.zoomWindow.width()+2*a.options.borderSize);break;case 13:a.windowOffsetTop=-1*(a.zoomWindow.height()+2*a.options.borderSize);a.windowOffsetLeft=
0;break;case 14:a.options.zoomWindowHeight>a.nzHeight&&(a.windowOffsetTop=-1*(a.zoomWindow.height()+2*a.options.borderSize),a.windowOffsetLeft=-1*(a.options.zoomWindowWidth/2-a.nzWidth/2+2*a.options.borderSize));break;case 15:a.windowOffsetTop=-1*(a.zoomWindow.height()+2*a.options.borderSize);a.windowOffsetLeft=a.nzWidth-a.zoomWindow.width()-2*a.options.borderSize;break;case 16:a.windowOffsetTop=-1*(a.zoomWindow.height()+2*a.options.borderSize);a.windowOffsetLeft=a.nzWidth;break;default:a.windowOffsetTop=
a.options.zoomWindowOffety,a.windowOffsetLeft=a.nzWidth}a.isWindowSet=!0;a.windowOffsetTop+=a.options.zoomWindowOffety;a.windowOffsetLeft+=a.options.zoomWindowOffetx;a.zoomWindow.css({top:a.windowOffsetTop});a.zoomWindow.css({left:a.windowOffsetLeft});"inner"==a.options.zoomType&&(a.zoomWindow.css({top:0}),a.zoomWindow.css({left:0}));a.windowLeftPos=String(-1*((b.pageX-a.nzOffset.left)*a.widthRatio-a.zoomWindow.width()/2));a.windowTopPos=String(-1*((b.pageY-a.nzOffset.top)*a.heightRatio-a.zoomWindow.height()/
2));a.Etoppos&&(a.windowTopPos=0);a.Eloppos&&(a.windowLeftPos=0);a.Eboppos&&(a.windowTopPos=-1*(a.largeHeight/a.currentZoomLevel-a.zoomWindow.height()));a.Eroppos&&(a.windowLeftPos=-1*(a.largeWidth/a.currentZoomLevel-a.zoomWindow.width()));a.fullheight&&(a.windowTopPos=0);a.fullwidth&&(a.windowLeftPos=0);if("window"==a.options.zoomType||"inner"==a.options.zoomType)1==a.zoomLock&&(1>=a.widthRatio&&(a.windowLeftPos=0),1>=a.heightRatio&&(a.windowTopPos=0)),a.largeHeight<a.options.zoomWindowHeight&&(a.windowTopPos=
0),a.largeWidth<a.options.zoomWindowWidth&&(a.windowLeftPos=0),a.options.easing?(a.xp||(a.xp=0),a.yp||(a.yp=0),a.loop||(a.loop=setInterval(function(){a.xp+=(a.windowLeftPos-a.xp)/a.options.easingAmount;a.yp+=(a.windowTopPos-a.yp)/a.options.easingAmount;a.scrollingLock?(clearInterval(a.loop),a.xp=a.windowLeftPos,a.yp=a.windowTopPos,a.xp=-1*((b.pageX-a.nzOffset.left)*a.widthRatio-a.zoomWindow.width()/2),a.yp=-1*((b.pageY-a.nzOffset.top)*a.heightRatio-a.zoomWindow.height()/2),a.changeBgSize&&(a.nzHeight>
a.nzWidth?("lens"==a.options.zoomType&&a.zoomLens.css({"background-size":a.largeWidth/a.newvalueheight+"px "+a.largeHeight/a.newvalueheight+"px"}),a.zoomWindow.css({"background-size":a.largeWidth/a.newvalueheight+"px "+a.largeHeight/a.newvalueheight+"px"})):("lens"!=a.options.zoomType&&a.zoomLens.css({"background-size":a.largeWidth/a.newvaluewidth+"px "+a.largeHeight/a.newvalueheight+"px"}),a.zoomWindow.css({"background-size":a.largeWidth/a.newvaluewidth+"px "+a.largeHeight/a.newvaluewidth+"px"})),
a.changeBgSize=!1),a.zoomWindow.css({backgroundPosition:a.windowLeftPos+"px "+a.windowTopPos+"px"}),a.scrollingLock=!1,a.loop=!1):(a.changeBgSize&&(a.nzHeight>a.nzWidth?("lens"==a.options.zoomType&&a.zoomLens.css({"background-size":a.largeWidth/a.newvalueheight+"px "+a.largeHeight/a.newvalueheight+"px"}),a.zoomWindow.css({"background-size":a.largeWidth/a.newvalueheight+"px "+a.largeHeight/a.newvalueheight+"px"})):("lens"!=a.options.zoomType&&a.zoomLens.css({"background-size":a.largeWidth/a.newvaluewidth+
"px "+a.largeHeight/a.newvaluewidth+"px"}),a.zoomWindow.css({"background-size":a.largeWidth/a.newvaluewidth+"px "+a.largeHeight/a.newvaluewidth+"px"})),a.changeBgSize=!1),a.zoomWindow.css({backgroundPosition:a.xp+"px "+a.yp+"px"}))},16))):(a.changeBgSize&&(a.nzHeight>a.nzWidth?("lens"==a.options.zoomType&&a.zoomLens.css({"background-size":a.largeWidth/a.newvalueheight+"px "+a.largeHeight/a.newvalueheight+"px"}),a.zoomWindow.css({"background-size":a.largeWidth/a.newvalueheight+"px "+a.largeHeight/
a.newvalueheight+"px"})):("lens"==a.options.zoomType&&a.zoomLens.css({"background-size":a.largeWidth/a.newvaluewidth+"px "+a.largeHeight/a.newvaluewidth+"px"}),a.largeHeight/a.newvaluewidth<a.options.zoomWindowHeight?a.zoomWindow.css({"background-size":a.largeWidth/a.newvaluewidth+"px "+a.largeHeight/a.newvaluewidth+"px"}):a.zoomWindow.css({"background-size":a.largeWidth/a.newvalueheight+"px "+a.largeHeight/a.newvalueheight+"px"})),a.changeBgSize=!1),a.zoomWindow.css({backgroundPosition:a.windowLeftPos+
"px "+a.windowTopPos+"px"}))},setTintPosition:function(b){this.nzOffset=this.$elem.offset();this.tintpos=String(-1*(b.pageX-this.nzOffset.left-this.zoomLens.width()/2));this.tintposy=String(-1*(b.pageY-this.nzOffset.top-this.zoomLens.height()/2));this.Etoppos&&(this.tintposy=0);this.Eloppos&&(this.tintpos=0);this.Eboppos&&(this.tintposy=-1*(this.nzHeight-this.zoomLens.height()-2*this.options.lensBorderSize));this.Eroppos&&(this.tintpos=-1*(this.nzWidth-this.zoomLens.width()-2*this.options.lensBorderSize));
this.options.tint&&(this.fullheight&&(this.tintposy=0),this.fullwidth&&(this.tintpos=0),this.zoomTintImage.css({left:this.tintpos+"px"}),this.zoomTintImage.css({top:this.tintposy+"px"}))},swaptheimage:function(b,a){var c=this,e=new Image;c.options.loadingIcon&&(c.spinner=d("<div style=\"background: url('"+c.options.loadingIcon+"') no-repeat center;height:"+c.nzHeight+"px;width:"+c.nzWidth+'px;z-index: 2000;position: absolute; background-position: center center;"></div>'),c.$elem.after(c.spinner));
c.options.onImageSwap(c.$elem);e.onload=function(){c.largeWidth=e.width;c.largeHeight=e.height;c.zoomImage=a;c.zoomWindow.css({"background-size":c.largeWidth+"px "+c.largeHeight+"px"});c.zoomWindow.css({"background-size":c.largeWidth+"px "+c.largeHeight+"px"});c.swapAction(b,a)};e.src=a},swapAction:function(b,a){var c=this,e=new Image;e.onload=function(){c.nzHeight=e.height;c.nzWidth=e.width;c.options.onImageSwapComplete(c.$elem);c.doneCallback()};e.src=b;c.currentZoomLevel=c.options.zoomLevel;c.options.maxZoomLevel=
!1;"lens"==c.options.zoomType&&c.zoomLens.css({backgroundImage:"url('"+a+"')"});"window"==c.options.zoomType&&c.zoomWindow.css({backgroundImage:"url('"+a+"')"});"inner"==c.options.zoomType&&c.zoomWindow.css({backgroundImage:"url('"+a+"')"});c.currentImage=a;if(c.options.imageCrossfade){var f=c.$elem,g=f.clone();c.$elem.attr("src",b);c.$elem.after(g);g.stop(!0).fadeOut(c.options.imageCrossfade,function(){d(this).remove()});c.$elem.width("auto").removeAttr("width");c.$elem.height("auto").removeAttr("height");
f.fadeIn(c.options.imageCrossfade);c.options.tint&&"inner"!=c.options.zoomType&&(f=c.zoomTintImage,g=f.clone(),c.zoomTintImage.attr("src",a),c.zoomTintImage.after(g),g.stop(!0).fadeOut(c.options.imageCrossfade,function(){d(this).remove()}),f.fadeIn(c.options.imageCrossfade),c.zoomTint.css({height:c.$elem.height()}),c.zoomTint.css({width:c.$elem.width()}));c.zoomContainer.css("height",c.$elem.height());c.zoomContainer.css("width",c.$elem.width());"inner"!=c.options.zoomType||c.options.constrainType||
(c.zoomWrap.parent().css("height",c.$elem.height()),c.zoomWrap.parent().css("width",c.$elem.width()),c.zoomWindow.css("height",c.$elem.height()),c.zoomWindow.css("width",c.$elem.width()))}else c.$elem.attr("src",b),c.options.tint&&(c.zoomTintImage.attr("src",a),c.zoomTintImage.attr("height",c.$elem.height()),c.zoomTintImage.css({height:c.$elem.height()}),c.zoomTint.css({height:c.$elem.height()})),c.zoomContainer.css("height",c.$elem.height()),c.zoomContainer.css("width",c.$elem.width());c.options.imageCrossfade&&
(c.zoomWrap.css("height",c.$elem.height()),c.zoomWrap.css("width",c.$elem.width()));c.options.constrainType&&("height"==c.options.constrainType&&(c.zoomContainer.css("height",c.options.constrainSize),c.zoomContainer.css("width","auto"),c.options.imageCrossfade?(c.zoomWrap.css("height",c.options.constrainSize),c.zoomWrap.css("width","auto"),c.constwidth=c.zoomWrap.width()):(c.$elem.css("height",c.options.constrainSize),c.$elem.css("width","auto"),c.constwidth=c.$elem.width()),"inner"==c.options.zoomType&&
(c.zoomWrap.parent().css("height",c.options.constrainSize),c.zoomWrap.parent().css("width",c.constwidth),c.zoomWindow.css("height",c.options.constrainSize),c.zoomWindow.css("width",c.constwidth)),c.options.tint&&(c.tintContainer.css("height",c.options.constrainSize),c.tintContainer.css("width",c.constwidth),c.zoomTint.css("height",c.options.constrainSize),c.zoomTint.css("width",c.constwidth),c.zoomTintImage.css("height",c.options.constrainSize),c.zoomTintImage.css("width",c.constwidth))),"width"==
c.options.constrainType&&(c.zoomContainer.css("height","auto"),c.zoomContainer.css("width",c.options.constrainSize),c.options.imageCrossfade?(c.zoomWrap.css("height","auto"),c.zoomWrap.css("width",c.options.constrainSize),c.constheight=c.zoomWrap.height()):(c.$elem.css("height","auto"),c.$elem.css("width",c.options.constrainSize),c.constheight=c.$elem.height()),"inner"==c.options.zoomType&&(c.zoomWrap.parent().css("height",c.constheight),c.zoomWrap.parent().css("width",c.options.constrainSize),c.zoomWindow.css("height",
c.constheight),c.zoomWindow.css("width",c.options.constrainSize)),c.options.tint&&(c.tintContainer.css("height",c.constheight),c.tintContainer.css("width",c.options.constrainSize),c.zoomTint.css("height",c.constheight),c.zoomTint.css("width",c.options.constrainSize),c.zoomTintImage.css("height",c.constheight),c.zoomTintImage.css("width",c.options.constrainSize))))},doneCallback:function(){this.options.loadingIcon&&this.spinner.hide();this.nzOffset=this.$elem.offset();this.nzWidth=this.$elem.width();
this.nzHeight=this.$elem.height();this.currentZoomLevel=this.options.zoomLevel;this.widthRatio=this.largeWidth/this.nzWidth;this.heightRatio=this.largeHeight/this.nzHeight;"window"==this.options.zoomType&&(lensHeight=this.nzHeight<this.options.zoomWindowWidth/this.widthRatio?this.nzHeight:String(this.options.zoomWindowHeight/this.heightRatio),lensWidth=this.options.zoomWindowWidth<this.options.zoomWindowWidth?this.nzWidth:this.options.zoomWindowWidth/this.widthRatio,this.zoomLens&&(this.zoomLens.css("width",
lensWidth),this.zoomLens.css("height",lensHeight)))},getCurrentImage:function(){return this.zoomImage},getGalleryList:function(){var b=this;b.gallerylist=[];b.options.gallery?d("#"+b.options.gallery+" a").each(function(){var a="";d(this).data("zoom-image")?a=d(this).data("zoom-image"):d(this).data("image")&&(a=d(this).data("image"));a==b.zoomImage?b.gallerylist.unshift({href:""+a+"",title:d(this).find("img").attr("title")}):b.gallerylist.push({href:""+a+"",title:d(this).find("img").attr("title")})}):
b.gallerylist.push({href:""+b.zoomImage+"",title:d(this).find("img").attr("title")});return b.gallerylist},changeZoomLevel:function(b){this.scrollingLock=!0;this.newvalue=parseFloat(b).toFixed(2);newvalue=parseFloat(b).toFixed(2);maxheightnewvalue=this.largeHeight/(this.options.zoomWindowHeight/this.nzHeight*this.nzHeight);maxwidthtnewvalue=this.largeWidth/(this.options.zoomWindowWidth/this.nzWidth*this.nzWidth);"inner"!=this.options.zoomType&&(maxheightnewvalue<=newvalue?(this.heightRatio=this.largeHeight/
maxheightnewvalue/this.nzHeight,this.newvalueheight=maxheightnewvalue,this.fullheight=!0):(this.heightRatio=this.largeHeight/newvalue/this.nzHeight,this.newvalueheight=newvalue,this.fullheight=!1),maxwidthtnewvalue<=newvalue?(this.widthRatio=this.largeWidth/maxwidthtnewvalue/this.nzWidth,this.newvaluewidth=maxwidthtnewvalue,this.fullwidth=!0):(this.widthRatio=this.largeWidth/newvalue/this.nzWidth,this.newvaluewidth=newvalue,this.fullwidth=!1),"lens"==this.options.zoomType&&(maxheightnewvalue<=newvalue?
(this.fullwidth=!0,this.newvaluewidth=maxheightnewvalue):(this.widthRatio=this.largeWidth/newvalue/this.nzWidth,this.newvaluewidth=newvalue,this.fullwidth=!1)));"inner"==this.options.zoomType&&(maxheightnewvalue=parseFloat(this.largeHeight/this.nzHeight).toFixed(2),maxwidthtnewvalue=parseFloat(this.largeWidth/this.nzWidth).toFixed(2),newvalue>maxheightnewvalue&&(newvalue=maxheightnewvalue),newvalue>maxwidthtnewvalue&&(newvalue=maxwidthtnewvalue),maxheightnewvalue<=newvalue?(this.heightRatio=this.largeHeight/
newvalue/this.nzHeight,this.newvalueheight=newvalue>maxheightnewvalue?maxheightnewvalue:newvalue,this.fullheight=!0):(this.heightRatio=this.largeHeight/newvalue/this.nzHeight,this.newvalueheight=newvalue>maxheightnewvalue?maxheightnewvalue:newvalue,this.fullheight=!1),maxwidthtnewvalue<=newvalue?(this.widthRatio=this.largeWidth/newvalue/this.nzWidth,this.newvaluewidth=newvalue>maxwidthtnewvalue?maxwidthtnewvalue:newvalue,this.fullwidth=!0):(this.widthRatio=this.largeWidth/newvalue/this.nzWidth,this.newvaluewidth=
newvalue,this.fullwidth=!1));scrcontinue=!1;"inner"==this.options.zoomType&&(this.nzWidth>this.nzHeight&&(this.newvaluewidth<=maxwidthtnewvalue?scrcontinue=!0:(scrcontinue=!1,this.fullwidth=this.fullheight=!0)),this.nzHeight>this.nzWidth&&(this.newvaluewidth<=maxwidthtnewvalue?scrcontinue=!0:(scrcontinue=!1,this.fullwidth=this.fullheight=!0)));"inner"!=this.options.zoomType&&(scrcontinue=!0);scrcontinue&&(this.zoomLock=0,this.changeZoom=!0,this.options.zoomWindowHeight/this.heightRatio<=this.nzHeight&&
(this.currentZoomLevel=this.newvalueheight,"lens"!=this.options.zoomType&&"inner"!=this.options.zoomType&&(this.changeBgSize=!0,this.zoomLens.css({height:String(this.options.zoomWindowHeight/this.heightRatio)+"px"})),"lens"==this.options.zoomType||"inner"==this.options.zoomType)&&(this.changeBgSize=!0),this.options.zoomWindowWidth/this.widthRatio<=this.nzWidth&&("inner"!=this.options.zoomType&&this.newvaluewidth>this.newvalueheight&&(this.currentZoomLevel=this.newvaluewidth),"lens"!=this.options.zoomType&&
"inner"!=this.options.zoomType&&(this.changeBgSize=!0,this.zoomLens.css({width:String(this.options.zoomWindowWidth/this.widthRatio)+"px"})),"lens"==this.options.zoomType||"inner"==this.options.zoomType)&&(this.changeBgSize=!0),"inner"==this.options.zoomType&&(this.changeBgSize=!0,this.nzWidth>this.nzHeight&&(this.currentZoomLevel=this.newvaluewidth),this.nzHeight>this.nzWidth&&(this.currentZoomLevel=this.newvaluewidth)));this.setPosition(this.currentLoc)},closeAll:function(){self.zoomWindow&&self.zoomWindow.hide();
self.zoomLens&&self.zoomLens.hide();self.zoomTint&&self.zoomTint.hide()},changeState:function(b){"enable"==b&&(this.options.zoomEnabled=!0);"disable"==b&&(this.options.zoomEnabled=!1)}};d.fn.elevateZoom=function(b){return this.each(function(){var a=Object.create(k);a.init(b,this);d.data(this,"elevateZoom",a)})};d.fn.elevateZoom.options={zoomActivation:"hover",zoomEnabled:!0,preloading:1,zoomLevel:1,scrollZoom:!1,scrollZoomIncrement:0.1,minZoomLevel:!1,maxZoomLevel:!1,easing:!1,easingAmount:12,lensSize:200,
zoomWindowWidth:400,zoomWindowHeight:400,zoomWindowOffetx:0,zoomWindowOffety:0,zoomWindowPosition:1,zoomWindowBgColour:"#fff",lensFadeIn:!1,lensFadeOut:!1,debug:!1,zoomWindowFadeIn:!1,zoomWindowFadeOut:!1,zoomWindowAlwaysShow:!1,zoomTintFadeIn:!1,zoomTintFadeOut:!1,borderSize:4,showLens:!0,borderColour:"#888",lensBorderSize:1,lensBorderColour:"#000",lensShape:"square",zoomType:"window",containLensZoom:!1,lensColour:"white",lensOpacity:0.4,lenszoom:!1,tint:!1,tintColour:"#333",tintOpacity:0.4,gallery:!1,
galleryActiveClass:"zoomGalleryActive",imageCrossfade:!1,constrainType:!1,constrainSize:!1,loadingIcon:!1,cursor:"default",responsive:!0,onComplete:d.noop,onZoomedImageLoaded:function(){},onImageSwap:d.noop,onImageSwapComplete:d.noop}})(jQuery,window,document);;
