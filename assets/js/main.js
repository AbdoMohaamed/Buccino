document.addEventListener('DOMContentLoaded', () => {
    "use strict";
    /**
   * Preloader
   */
    const preloader = document.querySelector('#preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            preloader.remove();
        });
    }

    /**
     * Sticky Header on Scroll
     */
    const selectHeader = document.querySelector('#header');
    if (selectHeader) {
        let headerOffset = selectHeader.offsetTop;
        let nextElement = selectHeader.nextElementSibling;

        const headerFixed = () => {
            if ((headerOffset - window.scrollY) <= 0) {
                selectHeader.classList.add('sticked');
                if (nextElement) nextElement.classList.add('sticked-header-offset');
            } else {
                selectHeader.classList.remove('sticked');
                if (nextElement) nextElement.classList.remove('sticked-header-offset');
            }
        }
        window.addEventListener('load', headerFixed);
        document.addEventListener('scroll', headerFixed);
    }

    /**
     * Navbar links active state on scroll
     */
    let navbarlinks = document.querySelectorAll('#navbar a');

    function navbarlinksActive() {
        navbarlinks.forEach(navbarlink => {

            if (!navbarlink.hash) return;

            let section = document.querySelector(navbarlink.hash);
            if (!section) return;

            let position = window.scrollY + 200;

            if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
                navbarlink.classList.add('active');
            } else {
                navbarlink.classList.remove('active');
            }
        })
    }
    window.addEventListener('load', navbarlinksActive);
    document.addEventListener('scroll', navbarlinksActive);
    document.querySelectorAll('#navbar a').forEach(navbarlink => {
        // Check if the link is for a section
        if (!navbarlink.hash) return;

        navbarlink.addEventListener('click', (event) => {
            const targetSection = navbarlink.hash;
            const currentUrl = window.location.pathname;

            // If on the homepage, scroll to the section
            if (currentUrl === '/' || currentUrl === '/index.html') {
                event.preventDefault();
                let section = document.querySelector(targetSection);
                if (section) {
                    window.scrollTo({
                        top: section.offsetTop - 100, // Adjust for any fixed headers
                        behavior: 'smooth'
                    });
                }
            } else {
                // If on a different page, navigate to the homepage and scroll to the section
                window.location.href = `/${targetSection}`;
            }
        });
    });
    /**
     * Mobile nav toggle
     */
    const mobileNavShow = document.querySelector('.mobile-nav-show');
    const mobileNavHide = document.querySelector('.mobile-nav-hide');

    document.querySelectorAll('.mobile-nav-toggle').forEach(el => {
        el.addEventListener('click', function (event) {
            event.preventDefault();
            mobileNavToogle();
        })
    });

    function mobileNavToogle() {
        document.querySelector('body').classList.toggle('mobile-nav-active');
        mobileNavShow.classList.toggle('d-none');
        mobileNavHide.classList.toggle('d-none');
    }

    /**
     * Hide mobile nav on same-page/hash links
     */
    document.querySelectorAll('#navbar a').forEach(navbarlink => {

        if (!navbarlink.hash) return;

        let section = document.querySelector(navbarlink.hash);
        if (!section) return;

        navbarlink.addEventListener('click', () => {
            if (document.querySelector('.mobile-nav-active')) {
                mobileNavToogle();
            }
        });

    });

    /**
     * Toggle mobile nav dropdowns
     */
    const navDropdowns = document.querySelectorAll('.navbar .dropdown > a');

    navDropdowns.forEach(el => {
        el.addEventListener('click', function (event) {
            if (document.querySelector('.mobile-nav-active')) {
                event.preventDefault();
                this.classList.toggle('active');
                this.nextElementSibling.classList.toggle('dropdown-active');

                let dropDownIndicator = this.querySelector('.dropdown-indicator');
                dropDownIndicator.classList.toggle('bi-chevron-up');
                dropDownIndicator.classList.toggle('bi-chevron-down');
            }
        })
    });
     /*---------------------- generic title -------------------------*/
    const title = document.querySelector('.generic-title');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                title.classList.add('active');
                observer.unobserve(title);
            }
        });
    }, { threshold: 0.5 });

    observer.observe(title);
});
 /*--------------------- aos----------------------*/
function aos_init() {
    AOS.init({
        duration: 700,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });
}
window.addEventListener('load', () => {
    aos_init();
});
 /*--------------------- Fancybox  ----------------------*/
      Fancybox.bind('[data-fancybox]', {
      });    
      /*--------------------- swiper  ----------------------*/
   $(function () {
    const swiper = new Swiper('.swiper-container', {
      loop: true,
      speed: 700,
      centeredSlides: true,
      autoplay: {
        delay: 2000,
        disableOnInteraction: false,
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
   breakpoints: {
  400: { slidesPerView: 1 },
  560: { slidesPerView: 2 },
  800: { slidesPerView: 3 },
  1060: { slidesPerView: 4 },

}

    });

    $('.swiper-container').on('mouseenter', () => swiper.autoplay.stop());
    $('.swiper-container').on('mouseleave', () => swiper.autoplay.start());
   });

/*----------------------------------- swiper -2 --------------------------------------------*/
  var swiper = new Swiper(".mySwiper", {
    loop: true,
    slidesPerView: 1,
    spaceBetween: 30,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

/*----------------------------------------
Back to top
-----------------------------------------*/
var progressPath = document.querySelector('.progress-wrap path');
var pathLength = progressPath.getTotalLength();
progressPath.style.transition = progressPath.style.WebkitTransition = 'none';
progressPath.style.strokeDasharray = pathLength + ' ' + pathLength;
progressPath.style.strokeDashoffset = pathLength;
progressPath.getBoundingClientRect();
progressPath.style.transition = progressPath.style.WebkitTransition = 'stroke-dashoffset 10ms linear';
var updateProgress = function () {
    var scroll = $(window).scrollTop();
    var height = $(document).height() - $(window).height();
    var progress = pathLength - (scroll * pathLength / height);
    progressPath.style.strokeDashoffset = progress;
}
updateProgress();
$(window).scroll(updateProgress);
var offset = 50;
var duration = 550;
jQuery(window).on('scroll', function () {
    if (jQuery(this).scrollTop() > offset) {
        jQuery('.progress-wrap').addClass('active-progress');
    } else {
        jQuery('.progress-wrap').removeClass('active-progress');
    }
});
jQuery('.progress-wrap').on('click', function (event) {
    event.preventDefault();
    jQuery('html, body').animate({ scrollTop: 0 }, duration);
    return false;
})
/*----------------------------------------
typing-title
-----------------------------------------*/
        document.addEventListener("DOMContentLoaded", function () {
            const text = "أفضل مكاتب التصميم والديكور في الكويت يثقون بنا";
            const target = document.getElementById("typing-word");
            let index = 0;

            function typeNextChar() {
                if (index < text.length) {
                    target.textContent += text.charAt(index);
                    index++;
                    setTimeout(typeNextChar, 150);
                } else {
                    setTimeout(() => {
                        target.textContent = '';
                        index = 0;
                        typeNextChar();
                    }, 5000);
                }
            }

            typeNextChar();
        });
/*---------------------------------------------------------
#partners Swiper
--------------------------------------------------------*/
new Swiper('.partners-slider', {
    speed: 400,
    loop: true,
    autoplay: {
        delay: 5000,
        disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true
    },
    breakpoints: {
        320: {
            slidesPerView: 2,
            spaceBetween: 40
        },
        480: {
            slidesPerView: 3,
            spaceBetween: 60
        },
        640: {
            slidesPerView: 4,
            spaceBetween: 80
        },
        992: {
            slidesPerView: 6,
            spaceBetween: 120
        }
    }
});
/*---------------------------------------------------
#challenges section animation
----------------------------------------------------*/
