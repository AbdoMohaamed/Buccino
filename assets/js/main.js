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

    // نستخدم Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                title.classList.add('active');
                observer.unobserve(title);
            }
        });
    }, { threshold: 0.5 });

    observer.observe(title);
    /*------------ active partners------------------------*/
    const items = document.querySelectorAll('.partners-logo .item');
let currentIndex = 0;

items[currentIndex].classList.add('active');

setInterval(() => {
  items[currentIndex].classList.remove('active');

  currentIndex = (currentIndex + 1) % items.length;

  items[currentIndex].classList.add('active');
}, 4000); 


});

