// Enhanced Typed Animation
if (typeof Typed !== 'undefined') {
    new Typed("#typewriter", {
        strings: [
            "Frontend Development",
            "Full Stack Applications",
            "Modern UI/UX Designs",
            "Java Backend Systems",
            "Responsive Websites",
            "Interactive Experiences"
        ],
        typeSpeed: 80,
        backSpeed: 60,
        backDelay: 1500,
        loop: true,
        loopCount: Infinity,
        showCursor: true,
        cursorChar: "|"
    });
} else {
    const typewriter = document.getElementById('typewriter');
    if (typewriter) {
        typewriter.textContent = 'Frontend Development';
    }
}

// Mobile menu toggle
const menuIcon = document.getElementById('menu-icon');
const navbar = document.querySelector('.navbar');

if (menuIcon && navbar) {
    menuIcon.addEventListener('click', () => {
        const navMenu = navbar.querySelector('.nav-menu');
        if (navMenu) {
            navMenu.classList.toggle('active');
        }
        menuIcon.classList.toggle('bx-x');
    });
}

// Close menu when clicking on a link
if (navbar) {
    navbar.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            const navMenu = navbar.querySelector('.nav-menu');
            if (navMenu) {
                navMenu.classList.remove('active');
            }
            if (menuIcon) {
                menuIcon.classList.remove('bx-x');
            }
        });
    });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(13, 13, 65, 0.95)';
        navbar.style.backdropFilter = 'blur(20px)';
    } else {
        navbar.style.background = 'rgba(var(--color-bg-primary), 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    }
});

// Particle System for Hero Section
function initParticles() {
    const canvas = document.querySelector('.particles-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particlesArray = [];
    const numberOfParticles = 100;

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 5 + 1;
            this.baseX = this.x;
            this.baseY = this.y;
            this.density = (Math.random() * 40) + 5;
        }

        draw() {
            ctx.fillStyle = 'rgba(0, 255, 255, 0.8)';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }

        update() {
            const dx = mouse.x - this.x;
            const dy = mouse.y - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const forceDirectionX = dx / distance;
            const forceDirectionY = dy / distance;
            const maxDistance = 100;
            const force = (maxDistance - distance) / maxDistance;
            const directionX = forceDirectionX * force * this.density;
            const directionY = forceDirectionY * force * this.density;

            this.x = this.baseX + directionX;
            this.y = this.baseY + directionY;
        }
    }

    const mouse = {
        x: undefined,
        y: undefined,
        updatePosition(x, y) {
            this.x = x;
            this.y = y;
        }
    };

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].draw();
            particlesArray[i].update();
        }
        connectParticles();
        requestAnimationFrame(animateParticles);
    }

    function connectParticles() {
        for (let a = 0; a < particlesArray.length; a++) {
            for (let b = a; b < particlesArray.length; b++) {
                const dx = particlesArray[a].x - particlesArray[b].x;
                const dy = particlesArray[a].y - particlesArray[b].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    ctx.strokeStyle = 'rgba(0, 255, 255,' + (1 - distance / 100) + ')';
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                    ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                    ctx.stroke();
                }
            }
        }
    }

    init();
    function init() {
        canvas.addEventListener('mousemove', (event) => {
            mouse.updatePosition(event.clientX, event.clientY);
        });

        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });

        for (let i = 0; i < numberOfParticles; i++) {
            particlesArray.push(new Particle());
        }
        animateParticles();
    }
}

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections for scroll animations
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Theme Toggle Functionality
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle ? themeToggle.querySelector('i') : null;
const html = document.documentElement;

function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    html.setAttribute('data-theme', savedTheme);
    if (themeIcon) {
        themeIcon.className = savedTheme === 'dark' ? 'bx bx-sun theme-icon' : 'bx bx-moon theme-icon';
    }
}

function toggleTheme() {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    if (themeIcon) {
        themeIcon.className = newTheme === 'dark' ? 'bx bx-sun theme-icon' : 'bx bx-moon theme-icon';
    }
}

if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
}
initTheme();

// Project cards and filters
const projectCards = document.querySelectorAll('.project-card');
const filterButtons = document.querySelectorAll('.filter-btn');

function revealProjects(filter = 'all') {
    projectCards.forEach((card, index) => {
        const matches = filter === 'all' || card.dataset.category === filter;
        card.style.display = matches ? '' : 'none';

        if (matches) {
            requestAnimationFrame(() => {
                setTimeout(() => {
                    card.classList.add('animate');
                }, index * 80);
            });
        } else {
            card.classList.remove('animate');
        }
    });
}

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        revealProjects(button.dataset.filter || 'all');
    });
});

revealProjects();

// Initialize particles when DOM loads
document.addEventListener('DOMContentLoaded', initParticles);

// Update TODO progress after fixes
console.log('Debug fix 2/4: Navbar scroll selector fixed. Check console in browser.');

// Button micro-interactions
document.querySelectorAll('.btn-primary, .btn-btn, .read, .send').forEach(btn => {
    btn.addEventListener('mouseenter', function(e) {
        this.style.transform = 'translateY(-3px) scale(1.05)';
    });
    
    btn.addEventListener('mouseleave', function(e) {
        this.style.transform = 'translateY(0) scale(1)';
    });
});






