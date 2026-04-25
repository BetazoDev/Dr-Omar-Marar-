document.addEventListener("DOMContentLoaded", () => {
  // Setup reveal elements
  const revealElements = document.querySelectorAll('.hero-content, .service-card, .about-content, .process-card, .testi-card, .blog-card');
  revealElements.forEach(el => el.classList.add('reveal-hidden'));

  // Scroll reveal animation
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Add a slight stagger delay based on DOM order for grid items
        setTimeout(() => {
          entry.target.classList.add('reveal-visible');
        }, 100); // Simple fixed delay, can be enhanced for sibling staggering
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach(el => observer.observe(el));

  // Mobile Menu Toggle
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }

  // Form submission handling
  const apptForm = document.getElementById('quickApptForm');
  if(apptForm) {
    apptForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = apptForm.querySelector('button[type="submit"]');
      const originalText = btn.textContent;
      btn.textContent = 'Sending...';
      btn.disabled = true;
      
      // Simulate API call
      setTimeout(() => {
        btn.textContent = 'Request Sent!';
        btn.style.backgroundColor = '#22C55E'; // Success green
        apptForm.reset();
        
        setTimeout(() => {
          btn.textContent = originalText;
          btn.style.backgroundColor = '';
          btn.disabled = false;
        }, 3000);
      }, 1500);
    });
  }
});
