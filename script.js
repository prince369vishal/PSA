// Navbar scroll effect
const navbar = document.querySelector(".navbar");
const mobileMenu = document.querySelector(".mobile-menu");
const navLinks = document.querySelector(".nav-links");

window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// Mobile menu toggle
mobileMenu.addEventListener("click", () => {
  mobileMenu.classList.toggle("active");
  navLinks.classList.toggle("active");
});

// Close mobile menu when clicking outside
document.addEventListener("click", (e) => {
  if (!navbar.contains(e.target) && navLinks.classList.contains("active")) {
    mobileMenu.classList.remove("active");
    navLinks.classList.remove("active");
  }
});

function animateProgressBars() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.width = entry.target.getAttribute("data-width");
        }
      });
    },
    { threshold: 0.5 }
  );

  document.querySelectorAll(".skill-progress").forEach((bar) => {
    bar.style.width = "0";
    bar.setAttribute("data-width", bar.style.width);
    observer.observe(bar);
  });
}

// Call the function when the document is loaded
document.addEventListener("DOMContentLoaded", animateProgressBars);

function initPortfolioFilters() {
  const filterBtns = document.querySelectorAll(".filter-btn");
  const portfolioItems = document.querySelectorAll(".portfolio-item");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Remove active class from all buttons
      filterBtns.forEach((b) => b.classList.remove("active"));
      // Add active class to clicked button
      btn.classList.add("active");

      const filter = btn.getAttribute("data-filter");

      portfolioItems.forEach((item) => {
        if (filter === "all" || item.getAttribute("data-category") === filter) {
          item.style.opacity = "1";
          item.style.transform = "scale(1)";
          item.style.display = "block";
        } else {
          item.style.opacity = "0";
          item.style.transform = "scale(0.8)";
          setTimeout(() => {
            item.style.display = "none";
          }, 300);
        }
      });
    });
  });
}

// Call the function when the document is loaded
document.addEventListener("DOMContentLoaded", initPortfolioFilters);

function initTestimonialSlider() {
  const slider = document.querySelector(".testimonials-slider");
  const dots = document.querySelectorAll(".slider-dot");
  const cards = document.querySelectorAll(".testimonial-card");
  let currentSlide = 0;

  function updateSlider(index) {
    slider.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach((dot) => dot.classList.remove("active"));
    dots[index].classList.add("active");
    currentSlide = index;
  }

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      updateSlider(index);
    });
  });

  // Auto slide every 5 seconds
  setInterval(() => {
    currentSlide = (currentSlide + 1) % cards.length;
    updateSlider(currentSlide);
  }, 5000);

  // Add touch support for mobile
  let touchStartX = 0;
  let touchEndX = 0;

  slider.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });

  slider.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });

  function handleSwipe() {
    const difference = touchStartX - touchEndX;
    if (Math.abs(difference) > 50) {
      // Minimum swipe distance
      if (difference > 0 && currentSlide < cards.length - 1) {
        // Swipe left
        updateSlider(currentSlide + 1);
      } else if (difference < 0 && currentSlide > 0) {
        // Swipe right
        updateSlider(currentSlide - 1);
      }
    }
  }
}

// Call the function when the document is loaded
document.addEventListener("DOMContentLoaded", initTestimonialSlider);

function initSmoothScroll() {
  const navLinks = document.querySelectorAll(".nav-links a");

  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      // Remove active class from all links
      navLinks.forEach((link) => link.classList.remove("active"));
      // Add active class to clicked link
      link.classList.add("active");

      // Scroll to section
      targetSection.scrollIntoView({
        behavior: "smooth",
      });

      // Close mobile menu if open
      if (navLinks.classList.contains("active")) {
        mobileMenu.classList.remove("active");
        navLinks.classList.remove("active");
      }
    });
  });

  // Update active link on scroll
  window.addEventListener("scroll", () => {
    let current = "";
    const sections = document.querySelectorAll("section");

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= sectionTop - sectionHeight / 3) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });
}

// Call the function when the document is loaded
document.addEventListener("DOMContentLoaded", initSmoothScroll);
