// Services Toggle
let servicesExpanded = false;

function toggleServices() {
    const servicesGrid = document.getElementById('servicesGrid');
    const toggleBtn = document.getElementById('toggleBtn');
    const hiddenCards = document.querySelectorAll('.services-hidden');
    
    servicesExpanded = !servicesExpanded;
    
    hiddenCards.forEach(card => {
        if (servicesExpanded) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
    
    if (servicesExpanded) {
        toggleBtn.innerHTML = '<i class="ri-arrow-up-s-line"></i> Show Less Services';
    } else {
        toggleBtn.innerHTML = '<i class="ri-arrow-down-s-line"></i> Show More Services';
    }
}

// FAQ Toggle Function - Enhanced with smooth animations
function toggleFAQ(button) {
    const faqItem = button.closest('.faq-item');
    
    if (!faqItem) {
        console.warn('FAQ Item not found');
        return;
    }
    
    const isActive = faqItem.classList.contains('active');
    
    // Close all other FAQs
    document.querySelectorAll('.faq-item').forEach(item => {
        if (item !== faqItem) {
            item.classList.remove('active');
        }
    });
    
    // Toggle current FAQ
    faqItem.classList.toggle('active');
    
    // Optional: scroll into view
    if (!isActive) {
        button.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}

// Initialize all event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Gallery Modal Functions
    const modal = document.getElementById('galleryModal');
    const closeBtn = document.querySelector('.gallery-close');
    
    if (modal && closeBtn) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeGalleryModal();
            }
        });
        
        closeBtn.addEventListener('click', closeGalleryModal);
        
        // Close with Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                closeGalleryModal();
            }
        });
    }
    
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('nav ul');

    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Animate hamburger menu
            const spans = menuToggle.querySelectorAll('span');
            spans.forEach((span, index) => {
                if (navMenu.classList.contains('active')) {
                    if (index === 0) span.style.transform = 'rotate(45deg) translateY(10px)';
                    if (index === 1) span.style.opacity = '0';
                    if (index === 2) span.style.transform = 'rotate(-45deg) translateY(-10px)';
                } else {
                    span.style.transform = 'none';
                    span.style.opacity = '1';
                }
            });
        });

        // Close menu when link is clicked
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                const spans = menuToggle.querySelectorAll('span');
                spans.forEach(span => {
                    span.style.transform = 'none';
                    span.style.opacity = '1';
                });
            });
        });
    }

    // Smooth scroll for navigation links
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
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
    
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe service cards and other elements
    const cards = document.querySelectorAll('.service-card');
    cards.forEach(card => {
        if (!card.classList.contains('services-hidden')) {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(card);
        }
    });
});

// Gallery Modal Functions
function openGalleryModal(element) {
    const modal = document.getElementById('galleryModal');
    const modalImg = document.getElementById('modalImage');
    const img = element.querySelector('img');
    const caption = element.querySelector('h3').textContent;
    
    modalImg.src = img.src;
    modalImg.alt = img.alt;
    document.querySelector('.gallery-caption').textContent = caption;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeGalleryModal() {
    const modal = document.getElementById('galleryModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}
