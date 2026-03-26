// ============================================
// ANIMATIONS AU SCROLL
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    
    // Animation reveal
    const revealElements = () => {
        const elements = document.querySelectorAll('.reveal');
        const windowHeight = window.innerHeight;
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    };
    
    window.addEventListener('scroll', revealElements);
    revealElements(); // Initial check
    
    // ============================================
    // FILTRAGE DES PROJETS
    // ============================================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');
    
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                this.classList.add('active');
                
                const filterValue = this.getAttribute('data-filter');
                
                // Filter projects
                projectItems.forEach(item => {
                    if (filterValue === 'all' || item.classList.contains(filterValue)) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 100);
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
    }
    
    // ============================================
    // ANIMATION PROGRESS BARS
    // ============================================
    const animateProgressBars = () => {
        const progressBars = document.querySelectorAll('.progress-bar');
        
        progressBars.forEach(bar => {
            const width = bar.getAttribute('style').match(/width:\s*(\d+)%/);
            if (width) {
                bar.style.width = '0%';
                setTimeout(() => {
                    bar.style.width = width[1] + '%';
                }, 300);
            }
        });
    };
    
    // Animate progress bars when they come into view
    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateProgressBars();
                progressObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    document.querySelectorAll('.skill-category').forEach(el => {
        progressObserver.observe(el);
    });
    
    // ============================================
    // NAVBAR SCROLL EFFECT
    // ============================================
    let lastScrollTop = 0;
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.92)';
            navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.05)';
        }
        
        // Hide/show navbar on scroll
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // ============================================
    // SMOOTH SCROLL
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const navbarCollapse = document.querySelector('.navbar-collapse.show');
                if (navbarCollapse) {
                    const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                    bsCollapse.hide();
                }
            }
        });
    });
    
    // ============================================
    // FORMULAIRE DE CONTACT
    // ============================================
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            // Show loading state
            submitBtn.innerHTML = '<span class="loading"></span> Envoi en cours...';
            submitBtn.disabled = true;
            
            // Simulate form submission (remplace avec ton backend)
            setTimeout(() => {
                // Success message
                const successAlert = `
                    <div class="alert alert-success alert-dismissible fade show" role="alert">
                        Message n'a pas été envoyé🤦‍♂️. Veuillez copier le mail m'envoyer le message en privé
                        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                    </div>
                `;
                
                contactForm.insertAdjacentHTML('beforebegin', successAlert);
                contactForm.reset();
                
                // Reset button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                
                // Scroll to alert
                document.querySelector('.alert').scrollIntoView({ behavior: 'smooth' });
                
            }, 2000);
        });
    }
    
    // ============================================
    // ANIMATION STATISTIQUES
    // ============================================
    const animateStats = () => {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        statNumbers.forEach(stat => {
            const finalValue = parseInt(stat.textContent);
            let currentValue = 0;
            const increment = finalValue / 50;
            const timer = setInterval(() => {
                currentValue += increment;
                if (currentValue >= finalValue) {
                    stat.textContent = finalValue + (stat.textContent.includes('+') ? '+' : '');
                    clearInterval(timer);
                } else {
                    stat.textContent = Math.floor(currentValue) + (stat.textContent.includes('+') ? '+' : '');
                }
            }, 30);
        });
    };
    
    // Animate stats when they come into view
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    document.querySelectorAll('.hero-stats').forEach(el => {
        statsObserver.observe(el);
    });
    
    // ============================================
    // DARK MODE TOGGLE (Optionnel)
    // ============================================
    const darkModeToggle = document.getElementById('darkModeToggle');
    
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
            localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
            
            // Change icon
            const icon = this.querySelector('i');
            if (document.body.classList.contains('dark-mode')) {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
            } else {
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
            }
        });
        
        // Check for saved preference
        if (localStorage.getItem('darkMode') === 'true') {
            document.body.classList.add('dark-mode');
            const icon = darkModeToggle.querySelector('i');
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        }
    }
    
    // ============================================
    // COPY EMAIL TO CLIPBOARD
    // ============================================
    document.querySelectorAll('.copy-email').forEach(button => {
        button.addEventListener('click', function() {
            const email = 'kozgregoire@gmail.com';
            
            navigator.clipboard.writeText(email).then(() => {
                const originalText = this.innerHTML;
                this.innerHTML = '<i class="fas fa-check me-2"></i> Copié !';
                
                setTimeout(() => {
                    this.innerHTML = originalText;
                }, 2000);
            });
        });
    });
    
    // ============================================
    // INITIALISATION
    // ============================================
    console.log('Portfolio KIDINA.ARCHI initialisé avec succès 🏗️');
});
// ============================================
// FONCTION PLEINE POUR LE FORMULAIRE DE CONTACT
// ============================================
const contactFormPage = document.getElementById('contactFormPage');

if (contactFormPage) {
    contactFormPage.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.innerHTML = '<span class="loading"></span> Envoi en cours...';
        submitBtn.disabled = true;
        
        // Collect form data
        const formData = {
            name: this.querySelector('input[type="text"]').value,
            email: this.querySelector('input[type="email"]').value,
            subject: this.querySelector('select').value,
            message: this.querySelector('textarea').value,
            newsletter: this.querySelector('#newsletter').checked
        };
        
        // Simulate form submission
        setTimeout(() => {
            // Success message
            const successAlert = `
                <div class="alert alert-success alert-dismissible fade show mt-4" role="alert">
                    <i class="fas fa-check-circle me-2"></i>
                    <strong>Message envoyé avec succès !</strong> 
                    Je vous répondrai dans les plus brefs délais.
                    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                </div>
            `;
            
            // Insert alert before form
            contactFormPage.insertAdjacentHTML('beforebegin', successAlert);
            
            // Reset form
            contactFormPage.reset();
            
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            // Scroll to alert
            document.querySelector('.alert').scrollIntoView({ 
                behavior: 'smooth',
                block: 'center'
            });
            
            // Log to console (pour debug)
            console.log('Form submitted:', formData);
            
        }, 1500);
    });
}