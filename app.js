document.addEventListener('DOMContentLoaded', () => {
    // Sticky Nav when scrolling
    const headerNav = document.querySelector('.header-nav');
    const headerTopHeight = document.querySelector('.header').offsetHeight - headerNav.offsetHeight;

    let lastScrollY = window.scrollY;
    let ticking = false;

    window.addEventListener('scroll', () => {
        lastScrollY = window.scrollY;
        if (!ticking) {
            window.requestAnimationFrame(() => {
                if (window.innerWidth <= 768) {
                    // Disable sticky behavior on mobile and clear inline styles
                    headerNav.style.position = '';
                    headerNav.style.top = '';
                    headerNav.style.left = '';
                    headerNav.style.right = '';
                    headerNav.style.boxShadow = '';
                    headerNav.style.zIndex = '';
                    document.body.style.paddingTop = '';
                    ticking = false;
                    return;
                }

                if (lastScrollY > headerTopHeight) {
                    headerNav.style.position = 'fixed';
                    headerNav.style.top = '0';
                    headerNav.style.left = '0';
                    headerNav.style.right = '0';
                    headerNav.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
                    headerNav.style.zIndex = '1000';
                    document.body.style.paddingTop = headerNav.offsetHeight + 'px';
                } else {
                    headerNav.style.position = 'relative';
                    headerNav.style.boxShadow = 'none';
                    document.body.style.paddingTop = '0';
                }
                ticking = false;
            });
            ticking = true;
        }
    });

    // Mobile Menu Toggle
    const menuBtn = document.createElement('button');
    menuBtn.className = 'mobile-menu-btn';
    menuBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
    document.querySelector('.header-main-container').appendChild(menuBtn);

    const nav = document.querySelector('.header-nav');
    const navLinks = document.querySelector('.nav-links');

    menuBtn.addEventListener('click', () => {
        nav.classList.toggle('mobile-open');
        menuBtn.innerHTML = nav.classList.contains('mobile-open') ?
            '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>';
        document.body.classList.toggle('no-scroll');
    });

    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('mobile-open');
            menuBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
            document.body.classList.remove('no-scroll');
        });
    });

    // Search Bar Functionality
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');

    const performSearch = () => {
        const query = searchInput.value.trim().toLowerCase();
        if (!query) return;

        // Try to find a matching category
        const categories = Array.from(document.querySelectorAll('.category-card h3'));
        const matchedCategory = categories.find(cat => cat.innerText.toLowerCase().includes(query));

        if (matchedCategory) {
            // Scroll to categories section
            const categoriesSection = document.getElementById('categories');
            categoriesSection.scrollIntoView({ behavior: 'smooth' });

            // Visual feedback for the matched card
            const card = matchedCategory.closest('.category-card');
            card.style.transform = 'scale(1.1)';
            card.style.borderColor = 'var(--secondary-yellow)';
            setTimeout(() => {
                card.style.transform = '';
                card.style.borderColor = 'var(--border-color)';
            }, 2000);
        } else {
            // Redirect to WhatsApp with the query
            const whatsappUrl = `https://wa.me/5511981868182?text=Olá, estou procurando por: ${encodeURIComponent(query)}`;
            window.open(whatsappUrl, '_blank');
        }
    };

    if (searchBtn && searchInput) {
        searchBtn.addEventListener('click', performSearch);
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') performSearch();
        });
    }

    // Close Hero Slide Content
    document.querySelectorAll('.close-hero-slide').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const slideContent = btn.closest('.slide-content');
            if (slideContent) {
                slideContent.style.display = 'none';
            }
        });
    });

    // Hero Carousel
    const track = document.querySelector('.carousel-track');
    const slides = Array.from(document.querySelectorAll('.hero-slide'));
    const nextBtn = document.querySelector('.next-btn');
    const prevBtn = document.querySelector('.prev-btn');

    if (track && slides.length > 0) {
        let currentSlideIndex = 0;

        const updateSlidePosition = () => {
            track.style.transform = `translateX(-${currentSlideIndex * 100}%)`;
            // Update active class for animations
            slides.forEach((slide, index) => {
                if (index === currentSlideIndex) {
                    slide.classList.add('active');
                } else {
                    slide.classList.remove('active');
                }
            });
        };

        const moveToNextSlide = () => {
            currentSlideIndex = (currentSlideIndex + 1) % slides.length;
            updateSlidePosition();
        };

        const moveToPrevSlide = () => {
            currentSlideIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
            updateSlidePosition();
        };

        if (nextBtn) nextBtn.addEventListener('click', moveToNextSlide);
        if (prevBtn) prevBtn.addEventListener('click', moveToPrevSlide);

        // Auto slide every 5 seconds
        setInterval(moveToNextSlide, 5000);
    }
});
