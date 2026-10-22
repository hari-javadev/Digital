/**
 * BrightMark - Digital Marketing Agency
 * Vanilla JavaScript Functionality
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Dynamic copyright year in footer
  initCurrentYear();

  // 2. Navigation, mobile collapse, and smooth scrolling
  initNavigation();

  // 3. Animated statistics counters
  initStatCounters();

  // 4. Client trust logos pause / resume control
  initTrustControls();

  // 5. Portfolio project filtering
  initPortfolioFilter();

  // 6. Testimonials carousel controls
  initTestimonialCarousel();

  // 7. Blog search, filter, and load-more
  initBlogFeatures();

  // 8. Contact form validation & demo feedback
  initContactForm();

  // 9. Newsletter form demo
  initNewsletterForm();

  // 10. Article share / copy link helper
  initArticleShare();

  // 11. Back-to-top floating button
  initBackToTop();
});

/**
 * 1. Dynamic Copyright Year
 */
function initCurrentYear() {
  const currentYear = new Date().getFullYear();
  const yearEls = document.querySelectorAll('.current-year');
  yearEls.forEach(el => {
    el.textContent = currentYear;
  });
}

/**
 * 2. Navigation & Mobile Menu Behavior
 */
function initNavigation() {
  const navbarCollapse = document.getElementById('navbarNav');
  const navLinks = document.querySelectorAll('.site-navbar .nav-link:not(.dropdown-toggle), .site-navbar .dropdown-item');

  // Close mobile navbar when clicking any navigable link
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');

      // If it's an internal hash on the same page, smooth scroll
      if (href && href.startsWith('#') && href.length > 1) {
        const targetElement = document.querySelector(href);
        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
      }

      // Close mobile collapse if open
      if (navbarCollapse && navbarCollapse.classList.contains('show')) {
        const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse) || new bootstrap.Collapse(navbarCollapse, { toggle: false });
        if (bsCollapse) {
          bsCollapse.hide();
        }
      }
    });
  });

  // Track active state on scroll for homepage anchor sections
  const sections = document.querySelectorAll('section[id], header[id]');
  const mainNavLinks = document.querySelectorAll('.site-navbar .nav-link-custom[href^="#"]');

  if (sections.length && mainNavLinks.length) {
    window.addEventListener('scroll', () => {
      let current = '';
      const scrollPosition = window.pageYOffset + 140;

      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          current = section.getAttribute('id');
        }
      });

      mainNavLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === `#${current}`) {
          mainNavLinks.forEach(l => l.classList.remove('active'));
          link.classList.add('active');
        }
      });

      if (window.scrollY < 120) {
        mainNavLinks.forEach(l => l.classList.remove('active'));
        const homeLink = document.querySelector('.site-navbar .nav-link-custom[href="#home"], .site-navbar .nav-link-custom[href="index.html"]');
        if (homeLink) homeLink.classList.add('active');
      }
    });
  }
}

/**
 * 3. Animated Statistics Counters
 */
function initStatCounters() {
  const statNumbers = document.querySelectorAll('.stat-number');
  if (!statNumbers.length) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    statNumbers.forEach(stat => {
      const target = stat.getAttribute('data-target');
      const suffix = stat.getAttribute('data-suffix') || '';
      stat.textContent = target + suffix;
    });
    return;
  }

  const statsStrip = document.querySelector('.stats-card-container');
  if (!statsStrip) return;

  let hasAnimated = false;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasAnimated) {
        hasAnimated = true;
        observer.disconnect();

        statNumbers.forEach(stat => {
          const target = parseInt(stat.getAttribute('data-target'), 10);
          const suffix = stat.getAttribute('data-suffix') || '';
          const duration = 800; // ms
          const startTime = performance.now();

          function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const currentVal = Math.round(target * easeOut);

            stat.textContent = currentVal + suffix;

            if (progress < 1) {
              requestAnimationFrame(updateCounter);
            } else {
              stat.textContent = target + suffix;
            }
          }

          requestAnimationFrame(updateCounter);
        });
      }
    });
  }, { threshold: 0.2 });

  observer.observe(statsStrip);
}

/**
 * 4. Client Trust Logos Pause / Play
 */
function initTrustControls() {
  const pauseBtn = document.getElementById('trust-pause-btn');
  const logosContainer = document.getElementById('trust-logos-wrap');

  if (!pauseBtn || !logosContainer) return;

  let isPaused = false;
  pauseBtn.addEventListener('click', () => {
    isPaused = !isPaused;
    if (isPaused) {
      logosContainer.style.animationPlayState = 'paused';
      pauseBtn.innerHTML = '<i class="bi bi-play-fill"></i> Resume Motion';
      pauseBtn.setAttribute('aria-pressed', 'true');
    } else {
      logosContainer.style.animationPlayState = 'running';
      pauseBtn.innerHTML = '<i class="bi bi-pause-fill"></i> Pause Motion';
      pauseBtn.setAttribute('aria-pressed', 'false');
    }
  });
}

/**
 * 5. Portfolio Category Filter
 */
function initPortfolioFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');
  const emptyState = document.getElementById('portfolioEmpty');

  if (!filterBtns.length || !portfolioItems.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');
      let visibleCount = 0;

      portfolioItems.forEach(item => {
        const category = item.getAttribute('data-category');
        const matches = (filterValue === 'all' || category === filterValue || (category && category.includes(filterValue)));

        if (matches) {
          visibleCount++;
          item.classList.remove('d-none');
          item.style.opacity = '0';
          item.style.transform = 'scale(0.96)';
          setTimeout(() => {
            item.style.transition = 'all 0.35s ease';
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, 30);
        } else {
          item.classList.add('d-none');
        }
      });

      if (emptyState) {
        if (visibleCount === 0) {
          emptyState.classList.remove('d-none');
        } else {
          emptyState.classList.add('d-none');
        }
      }
    });
  });
}

/**
 * 6. Testimonials Carousel Controls
 */
function initTestimonialCarousel() {
  const carouselEl = document.getElementById('testimonialCarousel');
  if (!carouselEl) return;

  // Initialize Bootstrap Carousel if present
  let bsCarousel = null;
  if (window.bootstrap && bootstrap.Carousel) {
    bsCarousel = bootstrap.Carousel.getOrCreateInstance(carouselEl, {
      interval: 6000,
      ride: 'carousel',
      pause: 'hover'
    });
  }

  const prevBtn = document.getElementById('testimonialPrev');
  const nextBtn = document.getElementById('testimonialNext');

  if (prevBtn && bsCarousel) {
    prevBtn.addEventListener('click', () => bsCarousel.prev());
  }
  if (nextBtn && bsCarousel) {
    nextBtn.addEventListener('click', () => bsCarousel.next());
  }
}

/**
 * 7. Blog Search, Filtering & Load More
 */
function initBlogFeatures() {
  const searchInput = document.getElementById('blogSearchInput');
  const filterBtns = document.querySelectorAll('.blog-filter-btn');
  const blogCards = document.querySelectorAll('.blog-card-item');
  const loadMoreBtn = document.getElementById('blogLoadMoreBtn');
  const emptyMessage = document.getElementById('blogEmptyMessage');

  if (!blogCards.length) return;

  let currentCategory = 'all';
  let searchQuery = '';

  function applyFilters() {
    let matchCount = 0;

    blogCards.forEach(card => {
      const category = card.getAttribute('data-category') || '';
      const title = (card.querySelector('.blog-title') ? card.querySelector('.blog-title').textContent : '').toLowerCase();
      const excerpt = (card.querySelector('.blog-excerpt') ? card.querySelector('.blog-excerpt').textContent : '').toLowerCase();

      const matchesCategory = (currentCategory === 'all' || category === currentCategory);
      const matchesSearch = !searchQuery || title.includes(searchQuery) || excerpt.includes(searchQuery);

      if (matchesCategory && matchesSearch) {
        card.classList.remove('d-none');
        matchCount++;
      } else {
        card.classList.add('d-none');
      }
    });

    if (emptyMessage) {
      if (matchCount === 0) {
        emptyMessage.classList.remove('d-none');
      } else {
        emptyMessage.classList.add('d-none');
      }
    }
  }

  // Category filter clicks
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCategory = btn.getAttribute('data-category') || 'all';
      applyFilters();
    });
  });

  // Search input typing
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.trim().toLowerCase();
      applyFilters();
    });
  }

  // Load More button demo
  if (loadMoreBtn) {
    let loadCount = 0;
    loadMoreBtn.addEventListener('click', () => {
      loadCount++;
      const originalText = loadMoreBtn.innerHTML;
      loadMoreBtn.disabled = true;
      loadMoreBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status"></span>Loading articles...';

      setTimeout(() => {
        // Reveal any hidden articles or display notice
        const hiddenArticles = document.querySelectorAll('.blog-card-item.extra-article');
        hiddenArticles.forEach(card => card.classList.remove('d-none'));

        loadMoreBtn.disabled = false;
        loadMoreBtn.innerHTML = 'All Current Articles Loaded';
        loadMoreBtn.classList.add('disabled');
      }, 700);
    });
  }
}

/**
 * 8. Contact Form Validation & Friendly Demo Alert
 */
function initContactForm() {
  const forms = document.querySelectorAll('#projectContactForm, #pageContactForm');

  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = form.querySelector('[id*="contactName"], [name="name"]');
      const emailInput = form.querySelector('[id*="contactEmail"], [name="email"]');
      const serviceInput = form.querySelector('[id*="contactService"], [name="service"]');
      const messageInput = form.querySelector('[id*="contactMessage"], [name="message"]');
      const alertBox = form.closest('.contact-form-card') ? form.closest('.contact-form-card').querySelector('.contact-feedback-alert') : document.getElementById('contactFeedback');

      let isValid = true;

      // Reset errors
      [nameInput, emailInput, serviceInput, messageInput].forEach(input => {
        if (input) input.classList.remove('is-invalid');
      });

      if (nameInput && !nameInput.value.trim()) {
        nameInput.classList.add('is-invalid');
        isValid = false;
      }

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (emailInput && (!emailInput.value.trim() || !emailPattern.test(emailInput.value.trim()))) {
        emailInput.classList.add('is-invalid');
        isValid = false;
      }

      if (serviceInput && !serviceInput.value) {
        serviceInput.classList.add('is-invalid');
        isValid = false;
      }

      if (messageInput && !messageInput.value.trim()) {
        messageInput.classList.add('is-invalid');
        isValid = false;
      }

      if (!isValid) return;

      const clientName = nameInput ? nameInput.value.trim() : 'Guest';

      if (alertBox) {
        alertBox.className = 'alert alert-success contact-feedback-alert d-block';
        alertBox.innerHTML = `
          <div class="d-flex align-items-center gap-2 mb-1">
            <i class="bi bi-check-circle-fill fs-5 text-success"></i>
            <strong>Inquiry Received (Demo Mode)</strong>
          </div>
          <p class="mb-0 small">
            Thank you, <strong>${escapeHtml(clientName)}</strong>. Your project details have been validated successfully.
            <br><span class="text-muted"><i class="bi bi-info-circle"></i> Note: This website is currently running in frontend demo mode. Messages are validated in-browser without sending data to an external backend.</span>
          </p>
        `;
        alertBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }

      form.reset();
    });
  });
}

/**
 * 9. Newsletter Form Demo Validation
 */
function initNewsletterForm() {
  const forms = document.querySelectorAll('.newsletter-form-wrap, #newsletterForm');

  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('.newsletter-input, input[type="email"]');
      if (!input) return;

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!input.value.trim() || !emailPattern.test(input.value.trim())) {
        input.classList.add('is-invalid');
        return;
      }

      input.classList.remove('is-invalid');
      const submitBtn = form.querySelector('button');
      const originalText = submitBtn ? submitBtn.innerHTML : '';

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="bi bi-check2"></i> Subscribed!';
      }

      setTimeout(() => {
        input.value = '';
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
        }
      }, 3000);
    });
  });
}

/**
 * 10. Article Share & Copy Link Toast
 */
function initArticleShare() {
  const copyBtns = document.querySelectorAll('.share-btn-copy');

  copyBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      navigator.clipboard.writeText(window.location.href).then(() => {
        const originalHtml = btn.innerHTML;
        btn.innerHTML = '<i class="bi bi-check2"></i>';
        btn.setAttribute('title', 'Copied to clipboard!');

        setTimeout(() => {
          btn.innerHTML = originalHtml;
        }, 2000);
      }).catch(() => {
        prompt('Copy this article link:', window.location.href);
      });
    });
  });
}

/**
 * 11. Back to Top Button
 */
function initBackToTop() {
  const backToTopBtn = document.getElementById('btn-back-to-top');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 350) {
      backToTopBtn.style.display = 'flex';
    } else {
      backToTopBtn.style.display = 'none';
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/**
 * Helper to escape HTML characters
 */
function escapeHtml(str) {
  return str.replace(/[&<>"']/g, (m) => {
    switch (m) {
      case '&': return '&amp;';
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '"': return '&quot;';
      case "'": return '&#039;';
      default: return m;
    }
  });
}
