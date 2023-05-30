(function ($) {
	
	"use strict";

	$(function() {
        $("#tabs").tabs();
    });

	$(window).scroll(function() {
	  var scroll = $(window).scrollTop();
	  var box = $('.header-text').height();
	  var header = $('header').height();

	  if (scroll >= box - header) {
	    $("header").addClass("background-header");
	  } else {
	    $("header").removeClass("background-header");
	  }
	});
	

	$('.schedule-filter li').on('click', function() {
        var tsfilter = $(this).data('tsfilter');
        $('.schedule-filter li').removeClass('active');
        $(this).addClass('active');
        if (tsfilter == 'all') {
            $('.schedule-table').removeClass('filtering');
            $('.ts-item').removeClass('show');
        } else {
            $('.schedule-table').addClass('filtering');
        }
        $('.ts-item').each(function() {
            $(this).removeClass('show');
            if ($(this).data('tsmeta') == tsfilter) {
                $(this).addClass('show');
            }
        });
    });


	// Window Resize Mobile Menu Fix
	mobileNav();


	// Scroll animation init
	window.sr = new scrollReveal();
	

	// Menu Dropdown Toggle
	if($('.menu-trigger').length){
		$(".menu-trigger").on('click', function() {	
			$(this).toggleClass('active');
			$('.header-area .nav').slideToggle(200);
		});
	}


	$(document).ready(function () {
	    $(document).on("scroll", onScroll);
	    
	    //smoothscroll
	    $('.scroll-to-section a[href^="#"]').on('click', function (e) {
	        e.preventDefault();
	        $(document).off("scroll");
	        
	        $('a').each(function () {
	            $(this).removeClass('active');
	        })
	        $(this).addClass('active');
	      
	        var target = this.hash,
	        menu = target;
	       	var target = $(this.hash);
	        $('html, body').stop().animate({
	            scrollTop: (target.offset().top) + 1
	        }, 500, 'swing', function () {
	            window.location.hash = target;
	            $(document).on("scroll", onScroll);
	        });
	    });
	});

	function onScroll(event){
	    var scrollPos = $(document).scrollTop();
	    $('.nav a').each(function () {
	        var currLink = $(this);
	        var refElement = $(currLink.attr("href"));
	        if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
	            $('.nav ul li a').removeClass("active");
	            currLink.addClass("active");
	        }
	        else{
	            currLink.removeClass("active");
	        }
	    });
	}


	// Page loading animation
	 $(window).on('load', function() {

        $('#js-preloader').addClass('loaded');

    });


	// Window Resize Mobile Menu Fix
	$(window).on('resize', function() {
		mobileNav();
	});


	// Window Resize Mobile Menu Fix
	function mobileNav() {
		var width = $(window).width();
		$('.submenu').on('click', function() {
			if(width < 767) {
				$('.submenu ul').removeClass('active');
				$(this).find('ul').toggleClass('active');
			}
		});
	}


})(window.jQuery);

$(document).ready(function() {
	
	// If the comparison slider is present on the page lets initialise it, this is good you will include this in the main js to prevent the code from running when not needed
	if ($(".comparison-slider")[0]) {
		let compSlider = $(".comparison-slider");
	
		//let's loop through the sliders and initialise each of them
		compSlider.each(function() {
			let compSliderWidth = $(this).width() + "px";
			$(this).find(".resize img").css({ width: compSliderWidth });
			drags($(this).find(".divider"), $(this).find(".resize"), $(this));
		});

		//if the user resizes the windows lets update our variables and resize our images
		$(window).on("resize", function() {
			let compSliderWidth = compSlider.width() + "px";
			compSlider.find(".resize img").css({ width: compSliderWidth });
		});
	}
});

// This is where all the magic happens
// This is a modified version of the pen from Ege Görgülü - https://codepen.io/bamf/pen/jEpxOX - and you should check it out too.
function drags(dragElement, resizeElement, container) {
	
	// This creates a variable that detects if the user is using touch input insted of the mouse.
	let touched = false;
	window.addEventListener('touchstart', function() {
		touched = true;
	});
	window.addEventListener('touchend', function() {
		touched = false;
	});
	
	// clicp the image and move the slider on interaction with the mouse or the touch input
	dragElement.on("mousedown touchstart", function(e) {
			
			//add classes to the emelents - good for css animations if you need it to
			dragElement.addClass("draggable");
			resizeElement.addClass("resizable");
			//create vars
			let startX = e.pageX ? e.pageX : e.originalEvent.touches[0].pageX;
			let dragWidth = dragElement.outerWidth();
			let posX = dragElement.offset().left + dragWidth - startX;
			let containerOffset = container.offset().left;
			let containerWidth = container.outerWidth();
			let minLeft = containerOffset + 10;
			let maxLeft = containerOffset + containerWidth - dragWidth - 10;
			
			//add event listner on the divider emelent
			dragElement.parents().on("mousemove touchmove", function(e) {
				
				// if the user is not using touch input let do preventDefault to prevent the user from slecting the images as he moves the silder arround.
				if ( touched === false ) {
					e.preventDefault();
				}
				
				let moveX = e.pageX ? e.pageX : e.originalEvent.touches[0].pageX;
				let leftValue = moveX + posX - dragWidth;

				// stop the divider from going over the limits of the container
				if (leftValue < minLeft) {
					leftValue = minLeft;
				} else if (leftValue > maxLeft) {
					leftValue = maxLeft;
				}

				let widthValue = (leftValue + dragWidth / 2 - containerOffset) * 100 / containerWidth + "%";

				$(".draggable").css("left", widthValue).on("mouseup touchend touchcancel", function() {
					$(this).removeClass("draggable");
					resizeElement.removeClass("resizable");
				});
				
				$(".resizable").css("width", widthValue);
				
			}).on("mouseup touchend touchcancel", function() {
				dragElement.removeClass("draggable");
				resizeElement.removeClass("resizable");
				
			});
		
		}).on("mouseup touchend touchcancel", function(e) {
			// stop clicping the image and move the slider
			dragElement.removeClass("draggable");
			resizeElement.removeClass("resizable");
		
		});
	
}

/// ** ADDING SOUNDS TO MOUSE OVER EFFECT ON WHAT-WE-DO SECTION **
var c1 = document.getElementById('card1')
var c2 = document.getElementById('card2')
var c3 = document.getElementById('card3')
var c4 = document.getElementById('card4'),
    hardtypewriter = document.getElementById('hard-type-writer')
	audios = document.querySelectorAll('#hard-type-writer');
console.log(audios);

// ** BTN sound for Social **
c1.addEventListener('mouseover', function() {
[].forEach.call(audios, function(audio) {
  // do whatever
  audio.play();
});
}, false);

c1.addEventListener('mouseleave', function() {
  hardtypewriter.pause();
  hardtypewriter.currentTime = 0;
}, false);
// ** BTN sound for Web **
c2.addEventListener('mouseover', function() {
[].forEach.call(audios, function(audio) {
  // do whatever
  audio.play();
});
}, false);
	
c2.addEventListener('mouseleave', function() {
   hardtypewriter.pause();
   hardtypewriter.currentTime = 0;
}, false);
// ** BTN sound for Studio **
c3.addEventListener('mouseover', function() {
[].forEach.call(audios, function(audio) {
   // do whatever
   audio.play();
});
}, false);
		
c3.addEventListener('mouseleave', function() {
    hardtypewriter.pause();
	hardtypewriter.currentTime = 0;
}, false);
// ** BTN sound for Branding **
c4.addEventListener('mouseover', function() {
[].forEach.call(audios, function(audio) {
    // do whatever
    audio.play();
});
}, false);
		
c4.addEventListener('mouseleave', function() {
    hardtypewriter.pause();
	hardtypewriter.currentTime = 0;
}, false);
	
/// ** ADDING SOUNDS TO MOUSE OVER EFFECT ON WHAT-WE-DO SECTION **
// Divider1
var divider = document.getElementById('divider1'),
    hardtypewriter = document.getElementById('drag-sound')
	audios = document.querySelectorAll('audio');
console.log(audios);


divider.addEventListener('click', function() {
[].forEach.call(audios, function(audio) {
  // do whatever
  audio.play();
});
}, false);
// Divider2
var divider = document.getElementById('divider2'),
    hardtypewriter = document.getElementById('drag-sound')
	audios = document.querySelectorAll('audio');
console.log(audios);


divider.addEventListener('click', function() {
[].forEach.call(audios, function(audio) {
  // do whatever
  audio.play();
});
}, false);
// Divider3
var divider = document.getElementById('divider3'),
    hardtypewriter = document.getElementById('drag-sound')
	audios = document.querySelectorAll('audio');
console.log(audios);


divider.addEventListener('click', function() {
[].forEach.call(audios, function(audio) {
  // do whatever
  audio.play();
});
}, false);
// Divider4
var divider = document.getElementById('divider4'),
    hardtypewriter = document.getElementById('drag-sound')
	audios = document.querySelectorAll('audio');
console.log(audios);


divider.addEventListener('click', function() {
[].forEach.call(audios, function(audio) {
  // do whatever
  audio.play();
});
}, false);
// Divider5
var divider = document.getElementById('divider5'),
    hardtypewriter = document.getElementById('drag-sound')
	audios = document.querySelectorAll('audio');
console.log(audios);


divider.addEventListener('click', function() {
[].forEach.call(audios, function(audio) {
  // do whatever
  audio.play();
});
}, false);
