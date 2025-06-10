function toggleMenu() {
    const navLinks = document.getElementById('navLinks');
    const hamburger = document.querySelector('.hamburger');
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('open');
  }
  

  let scrollAmount = 0;
const carouselContainer = document.querySelector('.carousel-container');
const productCards = document.querySelectorAll('.product-card');
const totalCards = productCards.length;
const visibleCards = 2; // Number of visible cards at a time
const cardWidth = 330; // Width of each card including gap



function updateCardPreviews() {
  const startIndex = Math.floor(scrollAmount / cardWidth);
  const endIndex = startIndex + 1;

  // Reset opacity for all cards
  productCards.forEach(card => {
    card.classList.remove('preview');
  });

  // Add 'preview' class to the cards that are on the left and right of the center
  if (startIndex >= 0 && startIndex < totalCards) {
    productCards[startIndex].classList.add('preview');
  }

  if (endIndex >= 0 && endIndex < totalCards) {
    productCards[endIndex].classList.add('preview');
  }
}

function flipCard(card) {
  card.classList.toggle('flipped'); // Toggle the 'flipped' class to flip the card
}

document.addEventListener("DOMContentLoaded", () => {
    const products = document.querySelectorAll(".product-highlight");
  
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      {
        threshold: 0.1, // Trigger when 10% of the product is visible
      }
    );
  
    products.forEach((product) => observer.observe(product));
  });

  document.addEventListener("DOMContentLoaded", () => {
    const serviceItems = document.querySelectorAll(".service-content");
  
    // Create an Intersection Observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      {
        threshold: 0.5, // Trigger when 10% of the element is visible
      }
    );
  
    // Observe each service content
    serviceItems.forEach((item) => observer.observe(item));
  });
  
  


  document.addEventListener('DOMContentLoaded', function() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.uk-navbar-nav li a');

    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath.split('/').pop()) {
            link.classList.add('active');
        }
    });
});



document.addEventListener("DOMContentLoaded", function () {
  const mobileMenu = document.getElementById("mobile-menu");
  const menuToggle = document.querySelector(".uk-navbar-toggle");
  const closeButton = document.querySelector(".close-menu");

  function toggleMenu() {
      if (mobileMenu.classList.contains("active")) {
          mobileMenu.classList.remove("active");
          document.body.style.overflow = "auto"; // Enable scrolling when closed
      } else {
          mobileMenu.classList.add("active");
          document.body.style.overflow = "hidden"; // Disable scrolling when open
      }
  }

  // Ensure the button is found before attaching event listener
  if (menuToggle) {
      menuToggle.addEventListener("click", toggleMenu);
  }

  if (closeButton) {
      closeButton.addEventListener("click", toggleMenu);
  }

  // Hide menu on window resize to avoid showing it by default
  window.addEventListener("resize", function () {
      if (window.innerWidth > 960) {
          mobileMenu.classList.remove("active");
          document.body.style.overflow = "auto";
      }
  });

  // Ensure menu is hidden on page load
  mobileMenu.classList.remove("active");
});

