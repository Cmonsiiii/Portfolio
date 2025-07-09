// Mobile menu functionality
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Close mobile menu when clicking on a link
    const mobileMenuLinks = mobileMenu?.querySelectorAll('a');
    if (mobileMenuLinks) {
        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.add('hidden');
            });
        });
    }

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 64; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active navigation highlighting
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('nav a[href^="#"]');

    window.addEventListener('scroll', function() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('text-primary');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('text-primary');
            }
        });
    });

    // Form submission handling
    const contactForm = document.querySelector('form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const message = this.querySelector('textarea').value;

            // Basic validation
            if (!name || !email || !message) {
                alert('Please fill in all fields');
                return;
            }

            // Here you would typically send the form data to your backend
            // For now, we'll just show a success message
            alert('Thank you for your message! I\'ll get back to you soon.');
            this.reset();
        });
    }

    // Add some animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe sections for animation
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    // Project Tabs Filtering
    const tabCode = document.getElementById('tab-code');
    const tabUIUX = document.getElementById('tab-uiux');
    const projectCards = document.querySelectorAll('.project-card');

    function setActiveTab(tab) {
        tabCode.classList.remove('bg-white', 'text-[#161616]');
        tabCode.classList.add('bg-[#232323]', 'text-white');
        tabUIUX.classList.remove('bg-white', 'text-[#161616]');
        tabUIUX.classList.add('bg-[#232323]', 'text-white');
        tab.classList.add('bg-white', 'text-[#161616]');
        tab.classList.remove('bg-[#232323]', 'text-white');
    }

    tabCode.addEventListener('click', () => {
        setActiveTab(tabCode);
        projectCards.forEach(card => {
            card.style.display = card.getAttribute('data-type') === 'code' ? '' : 'none';
        });
    });
    tabUIUX.addEventListener('click', () => {
        setActiveTab(tabUIUX);
        projectCards.forEach(card => {
            card.style.display = card.getAttribute('data-type') === 'uiux' ? '' : 'none';
        });
    });
    // Set default tab
    setActiveTab(tabCode);
    projectCards.forEach(card => {
        card.style.display = card.getAttribute('data-type') === 'code' ? '' : 'none';
    });
}); 