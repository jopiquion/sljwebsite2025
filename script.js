// Navigation & Hamburger Menu Toggle
function toggleMenu() {
  const navLinks = document.getElementById('navLinks');
  const hamburger = document.querySelector('.hamburger');
  navLinks.classList.toggle('active');
  hamburger.classList.toggle('open');
}

// Carousel preview (if used)
let scrollAmount = 0;
const carouselContainer = document.querySelector('.carousel-container');
const productCards = document.querySelectorAll('.product-card');
const totalCards = productCards.length;
const visibleCards = 2; // Number of visible cards at a time
const cardWidth = 330; // Width of each card including gap

function updateCardPreviews() {
  const startIndex = Math.floor(scrollAmount / cardWidth);
  const endIndex = startIndex + 1;

  // Reset preview classes
  productCards.forEach(card => card.classList.remove('preview'));

  if (startIndex >= 0 && startIndex < totalCards) {
    productCards[startIndex].classList.add('preview');
  }
  if (endIndex >= 0 && endIndex < totalCards) {
    productCards[endIndex].classList.add('preview');
  }
}

function flipCard(card) {
  card.classList.toggle('flipped');
}

// Intersection Observer for product highlights
document.addEventListener("DOMContentLoaded", () => {
  const products = document.querySelectorAll(".product-highlight");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, { threshold: 0.1 });
  products.forEach((product) => observer.observe(product));
});

// Intersection Observer for service content
document.addEventListener("DOMContentLoaded", () => {
  const serviceItems = document.querySelectorAll(".service-content");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, { threshold: 0.5 });
  serviceItems.forEach((item) => observer.observe(item));
});

// Highlight current navigation link based on URL
document.addEventListener('DOMContentLoaded', function() {
  const currentPath = window.location.pathname.split('/').pop();
  const navLinks = document.querySelectorAll('.uk-navbar-nav li a');
  navLinks.forEach(link => {
    if (link.getAttribute('href') === currentPath) {
      link.classList.add('active');
    }
  });
});

// Mobile Menu Toggle for Off-Canvas Menu
document.addEventListener("DOMContentLoaded", function () {
  const mobileMenu = document.getElementById("mobile-menu");
  const menuToggle = document.querySelector(".uk-navbar-toggle");
  const closeButton = document.querySelector(".close-menu");

  function toggleMobileMenu() {
      if (mobileMenu.classList.contains("active")) {
          mobileMenu.classList.remove("active");
          document.body.style.overflow = "auto";
      } else {
          mobileMenu.classList.add("active");
          document.body.style.overflow = "hidden";
      }
  }

  if (menuToggle) {
      menuToggle.addEventListener("click", toggleMobileMenu);
  }
  if (closeButton) {
      closeButton.addEventListener("click", toggleMobileMenu);
  }
  window.addEventListener("resize", function () {
      if (window.innerWidth > 960) {
          mobileMenu.classList.remove("active");
          document.body.style.overflow = "auto";
      }
  });
  mobileMenu.classList.remove("active");
});










// Pause all other videos when one starts playing
function togglePlayPause(videoId, iconId) {
  const selectedVideo = document.getElementById(videoId);
  const selectedIcon = document.getElementById(iconId);

  document.querySelectorAll('video').forEach((video) => {
      const btnIcon = video.parentElement.querySelector('.fa');
      if (video.id !== videoId) {
          video.pause();
          if (btnIcon) {
              btnIcon.classList.remove('fa-pause');
              btnIcon.classList.add('fa-play');
          }
      }
  });

  if (selectedVideo.paused || selectedVideo.ended) {
      selectedVideo.play();
      selectedIcon.classList.remove('fa-play');
      selectedIcon.classList.add('fa-pause');
  } else {
      selectedVideo.pause();
      selectedIcon.classList.remove('fa-pause');
      selectedIcon.classList.add('fa-play');
  }
}

function updateSeekBar(videoId, sliderId) {
  const video = document.getElementById(videoId);
  const slider = document.getElementById(sliderId);
  const value = (100 / video.duration) * video.currentTime;
  slider.value = value;
}

function seekVideo(videoId, slider) {
  const video = document.getElementById(videoId);
  const seekTo = video.duration * (slider.value / 100);
  video.currentTime = seekTo;
}

function toggleFullScreen(videoId) {
  const video = document.getElementById(videoId);
  if (!document.fullscreenElement) {
      video.requestFullscreen();
  } else {
      document.exitFullscreen();
  }
}

// Update seek bar and mute all videos by default
document.querySelectorAll('video').forEach((video, index) => {
  const sliderId = `seekSlider${index + 1}`;
  video.muted = true;
  video.addEventListener('timeupdate', () => updateSeekBar(video.id, sliderId));
});
