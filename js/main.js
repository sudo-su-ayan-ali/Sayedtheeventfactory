/* 
    Sayed The Event Factory - Main JS
    Features: Custom Cursor, Parallax, 3D Tilt, Scroll Animations, Stats Counter
*/

document.addEventListener('DOMContentLoaded', () => {
    // 1. Custom Cursor
    const cursor = document.querySelector('.custom-cursor');
    const cursorTrail = document.querySelector('.cursor-trail');
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        // Slight delay for trail
        setTimeout(() => {
            cursorTrail.style.left = e.clientX - 15 + 'px';
            cursorTrail.style.top = e.clientY - 15 + 'px';
        }, 50);
    });

    // Expand cursor on hover
    const interactables = document.querySelectorAll('a, button, .service-card, .portfolio-item');
    interactables.forEach(item => {
        item.addEventListener('mouseenter', () => {
            cursorTrail.style.transform = 'scale(1.5)';
            cursorTrail.style.borderColor = 'rgba(201, 168, 76, 0.8)';
            cursorTrail.style.backgroundColor = 'rgba(201, 168, 76, 0.1)';
        });
        item.addEventListener('mouseleave', () => {
            cursorTrail.style.transform = 'scale(1)';
            cursorTrail.style.borderColor = '#C9A84C';
            cursorTrail.style.backgroundColor = 'transparent';
        });
    });

    // 2. Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 3. Hero Parallax & Initial Animation
    const hero = document.querySelector('.hero');
    const heroParallax = document.querySelector('.hero-parallax-layer');
    
    // Trigger initial hero animation
    setTimeout(() => {
        hero.classList.add('active');
    }, 100);

    window.addEventListener('mousemove', (e) => {
        const speed = heroParallax.getAttribute('data-speed');
        const x = (window.innerWidth - e.clientX * speed) / 100;
        const y = (window.innerHeight - e.clientY * speed) / 100;
        
        heroParallax.style.transform = `translateX(${x}px) translateY(${y}px)`;
    });

    // 4. 3D Tilt Effect for Service Cards
    const cards = document.querySelectorAll('.service-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (centerY - y) / 10;
            const rotateY = (x - centerX) / 10;
            
            card.querySelector('.card-inner').style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.querySelector('.card-inner').style.transform = 'rotateX(0) rotateY(0)';
        });
    });

    // 5. Scroll Reveal Animations
    const observerOptions = {
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal');
                
                // If it's the stats section, trigger counter
                if (entry.target.classList.contains('stats')) {
                    startCounters();
                }
            }
        });
    }, observerOptions);

    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });

    // 6. Stats Counter Logic
    function startCounters() {
        const counters = document.querySelectorAll('.stat-number');
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const increment = target / 50; // Adjust for speed
            
            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(startCounters, 40);
            } else {
                counter.innerText = target;
            }
        });
    }

    // 7. Portfolio Filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.getAttribute('data-filter');
            
            portfolioItems.forEach(item => {
                if (filter === 'all' || item.classList.contains(filter)) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // 8. Particle Background for Hero (Simple Version)
    const particleContainer = document.getElementById('hero-particles');
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const size = Math.random() * 5 + 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        
        particle.style.opacity = Math.random();
        
        // CSS Animation for floating
        particle.style.position = 'absolute';
        particle.style.backgroundColor = 'rgba(201, 168, 76, 0.3)';
        particle.style.borderRadius = '50%';
        particle.style.animation = `float ${Math.random() * 10 + 10}s linear infinite`;
        particle.style.animationDelay = `${Math.random() * 5}s`;
        
        particleContainer.appendChild(particle);
    }
});

// Add floating animation dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0% { transform: translateY(0) rotate(0deg); opacity: 0; }
        50% { opacity: 0.5; }
        100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
    }
    
    section {
        opacity: 0;
        transform: translateY(30px);
        transition: all 1s ease-out;
    }
    
    section.reveal {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);
