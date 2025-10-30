// Main JavaScript file
document.addEventListener('DOMContentLoaded', function() {
    // Элементы гамбургер-меню
    const hamburgerMenu = document.getElementById('hamburgerMenu');
    const navOverlay = document.getElementById('navOverlay');
    const navMenu = document.getElementById('navMenu');
    const navClose = document.getElementById('navClose');
    const navLinks = document.querySelectorAll('.nav-link');

    // Функция открытия меню
    function openMenu() {
        hamburgerMenu.classList.add('active');
        navOverlay.classList.add('active');
        navMenu.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // Функция закрытия меню
    function closeMenu() {
        hamburgerMenu.classList.remove('active');
        navOverlay.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    // Открытие меню
    if (hamburgerMenu) {
        hamburgerMenu.addEventListener('click', function(e) {
            e.stopPropagation();
            if (navMenu.classList.contains('active')) {
                closeMenu();
            } else {
                openMenu();
            }
        });
    }

    // Закрытие меню
    if (navClose) {
        navClose.addEventListener('click', function(e) {
            e.stopPropagation();
            closeMenu();
        });
    }

    if (navOverlay) {
        navOverlay.addEventListener('click', function(e) {
            e.stopPropagation();
            closeMenu();
        });
    }

    // Закрытие меню при клике на ссылку
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Закрываем меню сразу при переходе
            closeMenu();
        });
    });

    // Закрытие меню при нажатии Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            closeMenu();
        }
    });

    // Автоматическое определение активной страницы
    function setActivePage() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        navLinks.forEach(link => {
            const linkPage = link.getAttribute('href');
            if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    // Header scroll effect
    const header = document.querySelector('.header');
    
    function updateHeader() {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }
    }

    // Menu category filtering
    const categoryBtns = document.querySelectorAll('.category-btn');
    const menuSections = document.querySelectorAll('.menu-section');
    
    if (categoryBtns.length > 0) {
        categoryBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const category = this.dataset.category;
                
                // Update active button
                categoryBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                
                // Show/hide sections
                menuSections.forEach(section => {
                    if (section.id === category) {
                        section.style.display = 'block';
                        section.classList.add('fade-in');
                    } else {
                        section.style.display = 'none';
                    }
                });
            });
        });
    }

    // Smooth scrolling for anchor links
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

    // Lazy loading images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // Form validation
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const requiredFields = this.querySelectorAll('[required]');
            let isValid = true;

            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                } else {
                    field.classList.remove('error');
                }
            });

            if (!isValid) {
                e.preventDefault();
                alert('Пожалуйста, заполните все обязательные поля');
            }
        });
    });

    // Add loading states to buttons
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', function() {
            if (this.type === 'submit' || this.href) {
                this.classList.add('loading');
                setTimeout(() => {
                    this.classList.remove('loading');
                }, 2000);
            }
        });
    });

    // Create lavender petals animation
    function createPetals() {
        const petalsContainer = document.createElement('div');
        petalsContainer.className = 'lavender-petals';
        document.body.appendChild(petalsContainer);

        for (let i = 0; i < 15; i++) {
            setTimeout(() => {
                const petal = document.createElement('div');
                petal.className = 'petal';
                
                const size = Math.random() * 10 + 5;
                petal.style.width = `${size}px`;
                petal.style.height = `${size}px`;
                petal.style.left = `${Math.random() * 100}vw`;
                petal.style.animationDuration = `${Math.random() * 3 + 5}s`;
                petal.style.animationDelay = `${Math.random() * 2}s`;
                petal.style.opacity = Math.random() * 0.5 + 0.3;
                
                petalsContainer.appendChild(petal);
                
                // Remove petal after animation
                setTimeout(() => {
                    petal.remove();
                }, 8000);
            }, i * 300);
        }
    }

    // Initialize
    setActivePage();
    window.addEventListener('scroll', updateHeader);
    updateHeader();

    // Initialize petals on hero section
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        createPetals();
        setInterval(createPetals, 8000);
    }

    console.log('Лавандовая ветвь - сайт загружен успешно!');
});

// Функция для скролла к разделу "Наша история"
function scrollToAbout() {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
        aboutSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Гарантированное закрытие меню при загрузке страницы
window.addEventListener('load', function() {
    const hamburgerMenu = document.getElementById('hamburgerMenu');
    const navOverlay = document.getElementById('navOverlay');
    const navMenu = document.getElementById('navMenu');
    
    if (hamburgerMenu) hamburgerMenu.classList.remove('active');
    if (navOverlay) navOverlay.classList.remove('active');
    if (navMenu) navMenu.classList.remove('active');
    document.body.style.overflow = 'auto';
});