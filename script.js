// ===== DOM ELEMENTS =====
const header = document.getElementById('header');
const nav = document.getElementById('nav');
const menuToggle = document.getElementById('menuToggle');
const contactForm = document.getElementById('contactForm');
const navLinks = document.querySelectorAll('.nav-link');

// ===== HEADER SCROLL EFFECT =====
let lastScroll = 0;

function handleScroll() {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
}

window.addEventListener('scroll', handleScroll);

// ===== MOBILE MENU =====
menuToggle.addEventListener('click', function() {
    this.classList.toggle('active');
    nav.classList.toggle('active');
    document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
});

// Close menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        nav.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!nav.contains(e.target) && !menuToggle.contains(e.target) && nav.classList.contains('active')) {
        menuToggle.classList.remove('active');
        nav.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== SCROLL REVEAL ANIMATION =====
function reveal() {
    const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
    
    reveals.forEach((element, index) => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            // Add stagger effect based on index within same section
            setTimeout(() => {
                element.classList.add('active');
            }, index * 40);
        }
    });
}

window.addEventListener('scroll', reveal);
reveal(); // Initial check

// ===== CONTACT FORM =====
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // Simple validation
    if (name && email && message) {
        alert('Mensagem enviada com sucesso! Entrarei em contato em breve. 🚀');
        this.reset();
    } else {
        alert('Por favor, preencha todos os campos.');
    }
});

// ===== ACTIVE NAV LINK ON SCROLL =====
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) navLink.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);

// ===== PARALLAX EFFECT FOR HERO =====
const heroGradients = document.querySelectorAll('.hero-gradient');

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    heroGradients.forEach((gradient, index) => {
        const speed = index === 0 ? 0.3 : 0.2;
        gradient.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// ===== KEYBOARD ACCESSIBILITY =====
menuToggle.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        menuToggle.click();
    }
});

// ===== FORM INPUT ANIMATION =====
const formInputs = document.querySelectorAll('.form-input, .form-textarea');

formInputs.forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', function() {
        if (!this.value) {
            this.parentElement.classList.remove('focused');
        }
    });
});


const swiper = new Swiper('.mySwiper', {
  slidesPerView: 'auto',
  spaceBetween: 20,
  freeMode: true,              // permite movimento contínuo e suave
  grabCursor: true,            // cursor para arrastar
  allowTouchMove: true,        // permite arrastar com mouse ou touch
  loop: false,                 // falso, porque vamos duplicar os slides manualmente
  speed: 2000,                 // controla a velocidade do scroll
  autoplay: {
    delay: 0,                  // movimento contínuo
    disableOnInteraction: false,
    pauseOnMouseEnter: false,
  },
});



