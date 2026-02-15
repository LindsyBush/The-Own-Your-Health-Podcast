// Mobile Menu Toggle
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenu.classList.toggle('hidden');
}

// Modal Functions
function openModal() {
    const modal = document.getElementById('consultation-modal');
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden'; // Prevent scrolling
    lucide.createIcons(); // Refresh icons in modal
    
    // Add entrance animation
    const modalContent = modal.querySelector('.modal-enter');
    modalContent.style.animation = 'none';
    setTimeout(() => {
        modalContent.style.animation = 'modalEnter 0.3s ease-out forwards';
    }, 10);
}

function closeModal() {
    const modal = document.getElementById('consultation-modal');
    modal.classList.add('hidden');
    document.body.style.overflow = ''; // Restore scrolling
    
    // Reset form after a delay if it was successful
    setTimeout(() => {
        const form = document.getElementById('consultation-form');
        const successMsg = document.getElementById('success-message');
        const formContent = form.parentElement.querySelector('.sm\\:flex');
        
        if (!successMsg.classList.contains('hidden')) {
            successMsg.classList.add('hidden');
            form.classList.remove('hidden');
            form.reset();
        }
    }, 300);
}

// Close modal on Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// Form Handling with Formspree
document.getElementById('consultation-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const form = this;
    const submitBtn = document.getElementById('submit-btn');
    const originalBtnContent = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="animate-spin inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"></span>Sending...';
    
    try {
        const response = await fetch(form.action, {
            method: 'POST',
            body: new FormData(form),
            headers: {
                'Accept': 'application/json'
            }
        });
        
        if (response.ok) {
            // Show success message
            form.classList.add('hidden');
            const successMsg = document.getElementById('success-message');
            successMsg.classList.remove('hidden');
            lucide.createIcons();
            
            // Track conversion (optional - you can add Google Analytics here)
            console.log('Form submitted successfully');
        } else {
            throw new Error('Form submission failed');
        }
    } catch (error) {
        // Show error but still allow retry
        alert('Oops! There was a problem submitting your form. Please try again or email me directly at lindabiomdo@gmail.com');
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnContent;
        lucide.createIcons();
    }
});

// Navbar Scroll Effect
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('shadow-md');
        navbar.classList.add('bg-warm-50/95');
    } else {
        navbar.classList.remove('shadow-md');
        navbar.classList.remove('bg-warm-50/95');
    }
});

// Intersection Observer for Scroll Animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all slide-up elements
document.addEventListener('DOMContentLoaded', function() {
    const slideElements = document.querySelectorAll('.slide-up');
    slideElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
    
    // Initialize Lucide icons
    lucide.createIcons();
});

// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            document.getElementById('mobile-menu').classList.add('hidden');
        }
    });
});

// Form Validation Enhancement
const inputs = document.querySelectorAll('#consultation-form input, #consultation-form select, #consultation-form textarea');
inputs.forEach(input => {
    input.addEventListener('blur', function() {
        if (this.hasAttribute('required') && !this.value.trim()) {
            this.classList.add('border-red-500');
            this.classList.remove('border-warm-300');
        } else {
            this.classList.remove('border-red-500');
            this.classList.add('border-warm-300');
        }
    });
    
    input.addEventListener('input', function() {
        if (this.value.trim()) {
            this.classList.remove('border-red-500');
            this.classList.add('border-warm-300');
        }
    });
});
