/* 
    Sayed The Event Factory - Modern Overhaul JS
    Features: GSAP ScrollTrigger, Custom Mouse, Counters
*/

window.addEventListener("load", () => {
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger);

    // 1. Mobile Menu
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-links a');

    function toggleMenu() {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    }

    hamburger.addEventListener('click', toggleMenu);
    mobileLinks.forEach(link => link.addEventListener('click', toggleMenu));

    // 2. Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 3. Custom Mouse Glow Tracker
    const mouseGlow = document.querySelector('.mouse-glow');
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    if (!isTouchDevice && mouseGlow) {
        window.addEventListener('mousemove', (e) => {
            gsap.to(mouseGlow, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.6,
                ease: "power2.out"
            });
        });

        const interactables = document.querySelectorAll('a, button, .bento-box');
        interactables.forEach(el => {
            el.addEventListener('mouseenter', () => {
                gsap.to(mouseGlow, { scale: 1.5, opacity: 0.8, duration: 0.3 });
            });
            el.addEventListener('mouseleave', () => {
                gsap.to(mouseGlow, { scale: 1, opacity: 1, duration: 0.3 });
            });
        });
    } else if (mouseGlow) {
        mouseGlow.style.display = 'none';
    }

    // 4. Hero Animations (On Load)
    const heroTl = gsap.timeline();
    heroTl.from(".gs-title", {
        y: 150,
        skewY: 10,
        duration: 1.2,
        stagger: 0.2,
        ease: "power4.out",
        delay: 0.2
    })
    .from(".hero-label, .hero-subtitle, .hero-btns", {
        opacity: 0,
        y: 20,
        duration: 1,
        stagger: 0.1,
        ease: "power2.out"
    }, "-=0.8");

    // 5. Scroll Animations for Generic Reveals
    gsap.utils.toArray('.gs-reveal').forEach(elem => {
        gsap.from(elem, {
            scrollTrigger: {
                trigger: elem,
                start: "top 85%",
            },
            y: 40,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        });
    });

    // 6. Bento Box Reveal - Triggered individually to prevent layout bugs
    gsap.utils.toArray(".gs-box").forEach((box, i) => {
        gsap.from(box, {
            scrollTrigger: {
                trigger: box,
                start: "top 90%",
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            ease: "back.out(1.5)"
        });
    });

    // 7. Portfolio Items Slide In
    gsap.from(".gs-port", {
        scrollTrigger: {
            trigger: ".portfolio-slider",
            start: "top 80%",
        },
        x: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out"
    });

    // 8. Image Parallax Inside Containers
    gsap.utils.toArray('.parallax-img').forEach(img => {
        gsap.to(img, {
            scrollTrigger: {
                trigger: img.parentElement,
                start: "top bottom",
                end: "bottom top",
                scrub: true
            },
            y: 50,
            ease: "none"
        });
    });

    // 9. Number Counters
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        ScrollTrigger.create({
            trigger: counter,
            start: "top 90%",
            once: true,
            onEnter: () => {
                const target = +counter.getAttribute('data-target');
                gsap.to(counter, {
                    innerHTML: target,
                    duration: 2,
                    snap: { innerHTML: 1 },
                    ease: "power2.out"
                });
            }
        });
    });

    // Refresh ScrollTrigger after dynamic content loads
    ScrollTrigger.refresh();
});