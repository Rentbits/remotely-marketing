// main.js
// @codekit-prepend "_plugins.js"

(function(window, document, $) { // put the vars you need and match them at the bottom

    // All 4 vars are localized in here - makes them read faster b/c they are in local scope
    // $ works as alias for jQuery in here - ensures no conflict with other libs
    // R works as alias for Response in here - R.band(320) instead of Response.band(320)
    // window and document minify down to single letter vars

    $.extend(verge);

    var $window = $(window);
    var list = $('#showcase-list').children('li');
    var activeListItem = list.first();

    var page = {
      cycleSlider : function (argument) {
        // body...
        var slider = $('#slider');

        if ( $.inY(slider) === true ) {
          window.mySwipe = new Swipe(slider[0], {
            startSlide: 0,
            auto: 4000,
            transitionEnd: function(index, elem) {
              page.showAside(index);
            }
          });
          console.log('cycling');
          $window.off('scroll');
        }

      },
      showcase: function (argument) {
        // body...
        console.log('showcase func operational');

        // var list = $('#showcase-list').children('li');

        list.each(function(index, el) {
          var $this = $(this);
          $this.on('mouseenter', function() {
            // event.preventDefault();
            console.log(index);

            window.mySwipe.slide(index, 400);

            activeListItem = $this;
            list.removeClass('active');
            $this.addClass('active');
          });
        });

      },
      showAside: function (current) {
        // body...
        console.log(current);

        var currentScreen = current;
        var asideGroup = $('.showcase-aside ul');

        asideGroup.each(function() {
          var $this = $(this);
          // var match = x;
          if (currentScreen === $this.data('screen')) {
            $this.addClass('show');
          } else {
            $this.removeClass('show');
          }
        });

        activeListItem = list.eq(current);
        list.removeClass('active');
        activeListItem.addClass('active');
      }
    };
    // ====

    window.mySwipe = new Swipe(document.getElementById('slider'), {
      startSlide: 0,
      speed: 400,
      // auto: 3000,
      continuous: true,
      disableScroll: false,
      stopPropagation: false,
      callback: page.showcase(),
    });

    window.mySwipe = new Swipe(document.getElementById('slider-2'), {
      startSlide: 0,
      speed: 400,
      auto: 3000,
      continuous: true,
      disableScroll: false,
      stopPropagation: false,
      callback: function(pos) {

        var i = bullets.length;
        while (i--) {
          bullets[i].className = ' ';
        }
        bullets[pos].className = 'on';

      }
    });

    var bullets = document.getElementById('position').getElementsByTagName('li');


    $window.on('scroll load', function(event) {
      // event.preventDefault();
      /* Act on the event */
      page.cycleSlider();

    });

    $('a[href*=#]:not([href=#])').click(function() {
      if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
        if (target.length) {
          $('html,body').animate({
            scrollTop: target.offset().top
          }, 800);
          return false;
        }
      }
    });

    // var formSuccessFunc = function (argument) {
    //   // body...
    //   var target = $('.call-to-action');

    //   $('.thank-you-message').addClass('show');
    //   $('html,body').animate({
    //     scrollTop: target.offset().top
    //   }, 300);
    // };

    // site.showcase();

}(this, this.document, this.jQuery)); // in global scope, this === window