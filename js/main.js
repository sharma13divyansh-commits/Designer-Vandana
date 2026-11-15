/**
 * DESIGNER VANDANA – LEARNING STUDIO
 * Main JavaScript Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // ==========================================================================
  // 1. STICKY HEADER & SCROLL BEHAVIOR
  // ==========================================================================
  const header = document.querySelector('.site-header');
  const backToTopBtn = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY;

    if (header) {
      if (scrollPos > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    if (backToTopBtn) {
      if (scrollPos > 350) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // ==========================================================================
  // 2. MOBILE NAVIGATION DRAWER
  // ==========================================================================
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      const isActive = navMenu.classList.toggle('active');
      mobileToggle.innerHTML = isActive 
        ? '<i class="fa-solid fa-xmark"></i>' 
        : '<i class="fa-solid fa-bars"></i>';
      mobileToggle.setAttribute('aria-expanded', isActive ? 'true' : 'false');
    });

    // Close menu when clicking any nav link
    const navLinks = navMenu.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ==========================================================================
  // 3. STUDENT GALLERY & FILTER TABS
  // ==========================================================================
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      galleryItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        if (filterValue === 'all' || itemCategory === filterValue) {
          item.style.display = 'block';
          item.style.animation = 'fadeIn 0.4s ease forwards';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // Lightbox Modal
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxBadge = document.getElementById('lightboxBadge');
  const lightboxClose = document.getElementById('lightboxClose');

  if (lightboxModal && lightboxImg) {
    galleryItems.forEach(item => {
      item.addEventListener('click', () => {
        const imgElem = item.querySelector('img');
        const titleElem = item.querySelector('.gallery-overlay-title');
        const badgeElem = item.querySelector('.gallery-overlay-badge');

        if (imgElem) {
          lightboxImg.src = imgElem.src;
          lightboxImg.alt = imgElem.alt || 'Student Project';
        }
        if (titleElem && lightboxTitle) {
          lightboxTitle.textContent = titleElem.textContent;
        }
        if (badgeElem && lightboxBadge) {
          lightboxBadge.textContent = badgeElem.textContent;
        }

        lightboxModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    });

    const closeLightbox = () => {
      lightboxModal.classList.remove('active');
      document.body.style.overflow = '';
      lightboxImg.src = '';
    };

    if (lightboxClose) {
      lightboxClose.addEventListener('click', closeLightbox);
    }

    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) {
        closeLightbox();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightboxModal.classList.contains('active')) {
        closeLightbox();
      }
    });
  }

  // ==========================================================================
  // 4. FORMSPREE LEAD GENERATION FORM INTEGRATION
  // ==========================================================================
  const enquiryForm = document.getElementById('leadEnquiryForm');
  const formSuccessAlert = document.getElementById('formSuccessAlert');
  const formErrorAlert = document.getElementById('formErrorAlert');
  const submitBtn = document.getElementById('submitBtn');
  const submitText = document.getElementById('submitText');
  const submitSpinner = document.getElementById('submitSpinner');

  const nameInput = document.getElementById('fullName');
  const phoneInput = document.getElementById('mobileNumber');
  const emailInput = document.getElementById('emailAddress');

  const nameError = document.getElementById('nameError');
  const phoneError = document.getElementById('phoneError');
  const emailError = document.getElementById('emailError');

  // Input validation regex & helper functions
  const validateName = (name) => {
    return name.trim().length >= 2;
  };

  const validatePhone = (phone) => {
    // Accepts clean 10-digit Indian numbers or with optional +91 / 0 prefix
    const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
    const indianMobileRegex = /^(?:\+91|91|0)?[6-9]\d{9}$/;
    return indianMobileRegex.test(cleanPhone);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email.trim());
  };

  const clearValidationErrors = () => {
    [nameInput, phoneInput, emailInput].forEach(input => {
      if (input) {
        input.classList.remove('is-invalid', 'is-valid');
      }
    });
    [nameError, phoneError, emailError].forEach(err => {
      if (err) {
        err.classList.remove('visible');
        err.textContent = '';
      }
    });
  };

  // Realtime blur / input feedback
  if (nameInput) {
    nameInput.addEventListener('blur', () => {
      if (nameInput.value.trim() && !validateName(nameInput.value)) {
        nameInput.classList.add('is-invalid');
        nameError.textContent = 'Please enter your full name (at least 2 letters).';
        nameError.classList.add('visible');
      } else if (nameInput.value.trim()) {
        nameInput.classList.remove('is-invalid');
        nameInput.classList.add('is-valid');
        nameError.classList.remove('visible');
      }
    });
    nameInput.addEventListener('input', () => {
      if (nameInput.classList.contains('is-invalid') && validateName(nameInput.value)) {
        nameInput.classList.remove('is-invalid');
        nameError.classList.remove('visible');
      }
    });
  }

  if (phoneInput) {
    phoneInput.addEventListener('blur', () => {
      if (phoneInput.value.trim() && !validatePhone(phoneInput.value)) {
        phoneInput.classList.add('is-invalid');
        phoneError.textContent = 'Please enter a valid 10-digit mobile number.';
        phoneError.classList.add('visible');
      } else if (phoneInput.value.trim()) {
        phoneInput.classList.remove('is-invalid');
        phoneInput.classList.add('is-valid');
        phoneError.classList.remove('visible');
      }
    });
    phoneInput.addEventListener('input', () => {
      if (phoneInput.classList.contains('is-invalid') && validatePhone(phoneInput.value)) {
        phoneInput.classList.remove('is-invalid');
        phoneError.classList.remove('visible');
      }
    });
  }

  if (emailInput) {
    emailInput.addEventListener('blur', () => {
      if (emailInput.value.trim() && !validateEmail(emailInput.value)) {
        emailInput.classList.add('is-invalid');
        emailError.textContent = 'Please enter a valid email address.';
        emailError.classList.add('visible');
      } else if (emailInput.value.trim()) {
        emailInput.classList.remove('is-invalid');
        emailInput.classList.add('is-valid');
        emailError.classList.remove('visible');
      }
    });
    emailInput.addEventListener('input', () => {
      if (emailInput.classList.contains('is-invalid') && validateEmail(emailInput.value)) {
        emailInput.classList.remove('is-invalid');
        emailError.classList.remove('visible');
      }
    });
  }

  // Handle Formspree AJAX Submission
  if (enquiryForm) {
    enquiryForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      // Reset alert states
      if (formSuccessAlert) formSuccessAlert.style.display = 'none';
      if (formErrorAlert) formErrorAlert.style.display = 'none';

      // Honeypot spam check
      const honeypot = enquiryForm.querySelector('input[name="_gotcha"]');
      if (honeypot && honeypot.value.trim() !== '') {
        console.warn('Spam detected via honeypot field.');
        return false;
      }

      // Validate all fields
      let isValid = true;
      let firstInvalidInput = null;

      // Validate Name
      if (!validateName(nameInput.value)) {
        nameInput.classList.add('is-invalid');
        nameError.textContent = 'Full Name is required (minimum 2 characters).';
        nameError.classList.add('visible');
        isValid = false;
        if (!firstInvalidInput) firstInvalidInput = nameInput;
      } else {
        nameInput.classList.remove('is-invalid');
        nameInput.classList.add('is-valid');
        nameError.classList.remove('visible');
      }

      // Validate Phone
      if (!validatePhone(phoneInput.value)) {
        phoneInput.classList.add('is-invalid');
        phoneError.textContent = 'Please enter a valid 10-digit mobile number.';
        phoneError.classList.add('visible');
        isValid = false;
        if (!firstInvalidInput) firstInvalidInput = phoneInput;
      } else {
        phoneInput.classList.remove('is-invalid');
        phoneInput.classList.add('is-valid');
        phoneError.classList.remove('visible');
      }

      // Validate Email
      if (!validateEmail(emailInput.value)) {
        emailInput.classList.add('is-invalid');
        emailError.textContent = 'Please enter a valid email address.';
        emailError.classList.add('visible');
        isValid = false;
        if (!firstInvalidInput) firstInvalidInput = emailInput;
      } else {
        emailInput.classList.remove('is-invalid');
        emailInput.classList.add('is-valid');
        emailError.classList.remove('visible');
      }

      if (!isValid) {
        if (firstInvalidInput) {
          firstInvalidInput.focus();
        }
        return false;
      }

      // Lock button to prevent multiple accidental submissions
      submitBtn.disabled = true;
      if (submitSpinner) submitSpinner.style.display = 'inline-block';
      if (submitText) submitText.textContent = 'Submitting Enquiry...';

      try {
        const formData = new FormData(enquiryForm);

        // Submit via POST to Formspree endpoint
        const response = await fetch(enquiryForm.action, {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });

        if (response.ok) {
          // Success Response
          if (formSuccessAlert) {
            formSuccessAlert.style.display = 'flex';
          }
          if (formErrorAlert) {
            formErrorAlert.style.display = 'none';
          }

          // Clear form fields
          enquiryForm.reset();
          clearValidationErrors();

          // Smoothly scroll to success alert
          formSuccessAlert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        } else {
          // Formspree returned non-200 error
          const errorData = await response.json().catch(() => ({}));
          console.error('Formspree error response:', errorData);

          if (formErrorAlert) {
            const errorMsgSpan = formErrorAlert.querySelector('.error-text');
            if (errorMsgSpan && errorData.errors && errorData.errors.length > 0) {
              errorMsgSpan.textContent = errorData.errors.map(err => err.message).join(', ');
            } else if (errorMsgSpan) {
              errorMsgSpan.textContent = 'There was a problem submitting your enquiry. Please check your details or call us directly at +91 9582315625.';
            }
            formErrorAlert.style.display = 'flex';
            formErrorAlert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }
        }
      } catch (networkError) {
        console.error('Network or submission failure:', networkError);
        if (formErrorAlert) {
          const errorMsgSpan = formErrorAlert.querySelector('.error-text');
          if (errorMsgSpan) {
            errorMsgSpan.textContent = 'Network error: Unable to connect. Please check your internet connection or reach us directly at +91 9582315625.';
          }
          formErrorAlert.style.display = 'flex';
          formErrorAlert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      } finally {
        // Re-enable submit button
        submitBtn.disabled = false;
        if (submitSpinner) submitSpinner.style.display = 'none';
        if (submitText) submitText.textContent = 'SUBMIT FORM';
      }
    });
  }

  // ==========================================================================
  // 5. ENQUIRE NOW BUTTONS SMOOTH SCROLL & FOCUS
  // ==========================================================================
  const enquireBtns = document.querySelectorAll('.btn-card-enquire, .btn-enquire-cta, a[href="#enquiry"]');
  enquireBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const enquirySection = document.getElementById('enquiry');
      if (enquirySection) {
        e.preventDefault();
        enquirySection.scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => {
          if (nameInput) {
            nameInput.focus();
          }
        }, 600);
      }
    });
  });
});
