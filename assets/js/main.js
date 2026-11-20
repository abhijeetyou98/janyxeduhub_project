/**
 * JANYX EDU HUB - Interactive Scripts
 * Phone: 9082315311 | Email: janyxeduhub@gmail.com
 * Founders: JANGLESHWAR SAROJ & ABHIJEET CHAUHAN
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Sticky Navigation Bar & Shadow
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }
  });

  // 2. Mobile Menu Toggle
  const mobileToggle = document.querySelector('.mobile-menu-btn');
  const navMenu = document.querySelector('.nav-menu');
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const icon = mobileToggle.querySelector('i');
      if (icon) {
        if (navMenu.classList.contains('open')) {
          icon.classList.remove('fa-bars');
          icon.classList.add('fa-times');
        } else {
          icon.classList.remove('fa-times');
          icon.classList.add('fa-bars');
        }
      }
    });

    // Close menu when clicking on a link
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        const icon = mobileToggle.querySelector('i');
        if (icon) {
          icon.classList.remove('fa-times');
          icon.classList.add('fa-bars');
        }
      });
    });
  }

  // 3. FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    if (questionBtn && answer) {
      questionBtn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Close other items
        faqItems.forEach(otherItem => {
          if (otherItem !== item) {
            otherItem.classList.remove('active');
            const otherAns = otherItem.querySelector('.faq-answer');
            if (otherAns) otherAns.style.maxHeight = null;
          }
        });

        // Toggle current item
        if (isActive) {
          item.classList.remove('active');
          answer.style.maxHeight = null;
        } else {
          item.classList.add('active');
          answer.style.maxHeight = answer.scrollHeight + 'px';
        }
      });
    }
  });

  // 4. Modal Popup Handling
  const demoModal = document.getElementById('demoModal');
  const openModalBtns = document.querySelectorAll('.open-demo-modal');
  const closeModalBtn = document.querySelector('.modal-close');

  openModalBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (demoModal) {
        demoModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  const closeModal = () => {
    if (demoModal) {
      demoModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  closeModalBtn?.addEventListener('click', closeModal);
  demoModal?.addEventListener('click', (e) => {
    if (e.target === demoModal) closeModal();
  });

  // 5. Booking Form Submissions with Direct WhatsApp Integration
  const handleBookingSubmit = (e, formType) => {
    e.preventDefault();
    const form = e.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn ? submitBtn.innerHTML : 'Submit';

    const name = form.querySelector('[name="name"]')?.value || 'Student/Parent';
    const phone = form.querySelector('[name="phone"]')?.value || '';
    const grade = form.querySelector('[name="grade"]')?.value || 'Not specified';
    const board = form.querySelector('[name="curriculum"]')?.value || 'Not specified';
    const mode = form.querySelector('[name="mode"]')?.value || 'Home Tuition / Online';
    const message = form.querySelector('[name="message"]')?.value || '';

    if (!phone) {
      alert('Please enter your phone number so we can contact you.');
      return;
    }

    if (submitBtn) {
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
      submitBtn.disabled = true;
    }

    // Construct WhatsApp message
    const waText = encodeURIComponent(
      `Hello JANYX EDU HUB!\n\nI want to book a Free 1-on-1 Trial Class / Consultation.\n\n*Name:* ${name}\n*Phone:* ${phone}\n*Grade/Class:* ${grade}\n*Board/Curriculum:* ${board}\n*Preferred Mode:* ${mode}\n*Note:* ${message || 'Please connect with me.'}`
    );
    const waUrl = `https://wa.me/919082315311?text=${waText}`;

    setTimeout(() => {
      // Show confirmation dialog / banner
      const successNotice = document.createElement('div');
      successNotice.style.cssText = `
        background-color: #ECFDF5;
        border: 1px solid #10B981;
        color: #065F46;
        padding: 1rem;
        border-radius: 8px;
        margin-top: 1rem;
        font-size: 0.95rem;
        text-align: center;
      `;
      successNotice.innerHTML = `
        <strong>Thank you, ${name}!</strong><br>
        Your inquiry has been received. Redirecting you to WhatsApp to connect directly with our academic advisor...
      `;
      form.appendChild(successNotice);

      if (submitBtn) {
        submitBtn.innerHTML = '<i class="fas fa-check"></i> Inquiry Sent!';
      }

      setTimeout(() => {
        window.open(waUrl, '_blank');
        form.reset();
        closeModal();
      }, 1500);
    }, 600);
  };

  const heroForm = document.getElementById('heroBookingForm');
  heroForm?.addEventListener('submit', (e) => handleBookingSubmit(e, 'hero'));

  const contactForm = document.getElementById('contactBookingForm');
  contactForm?.addEventListener('submit', (e) => handleBookingSubmit(e, 'contact'));

  const modalForm = document.getElementById('modalBookingForm');
  modalForm?.addEventListener('submit', (e) => handleBookingSubmit(e, 'modal'));

  // 6. Dynamic Year in Footer
  const yearEl = document.getElementById('currentYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
});
