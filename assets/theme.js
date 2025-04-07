// Theme initialization
document.addEventListener('DOMContentLoaded', () => {
  initializeSearchDrawer();
  initializeStickyHeader();
  initializeQuantityInputs();
  initializeVariantSelectors();
});

// Search drawer functionality
function initializeSearchDrawer() {
  const searchToggle = document.querySelector('.search-toggle');
  const searchDrawer = document.querySelector('.search-drawer');
  const searchOverlay = document.querySelector('.search-overlay');
  const searchClose = document.querySelector('.search-close');
  const searchInput = document.querySelector('.search-drawer input[type="search"]');

  if (!searchToggle || !searchDrawer) return;

  searchToggle.addEventListener('click', () => {
    searchDrawer.hidden = false;
    searchOverlay.hidden = false;
    searchInput.focus();
  });

  searchClose.addEventListener('click', () => {
    searchDrawer.hidden = true;
    searchOverlay.hidden = true;
  });

  searchOverlay.addEventListener('click', () => {
    searchDrawer.hidden = true;
    searchOverlay.hidden = true;
  });

  // Close on escape key
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !searchDrawer.hidden) {
      searchDrawer.hidden = true;
      searchOverlay.hidden = true;
    }
  });
}

// Sticky header functionality
function initializeStickyHeader() {
  const header = document.querySelector('.header--sticky');
  if (!header) return;

  let lastScroll = 0;
  
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
      header.classList.remove('header--hidden');
      return;
    }
    
    if (currentScroll > lastScroll && !header.classList.contains('header--hidden')) {
      header.classList.add('header--hidden');
    } else if (currentScroll < lastScroll && header.classList.contains('header--hidden')) {
      header.classList.remove('header--hidden');
    }
    
    lastScroll = currentScroll;
  });
}

// Quantity input functionality
function initializeQuantityInputs() {
  document.querySelectorAll('.quantity-controls').forEach(container => {
    const input = container.querySelector('input[type="number"]');
    const decreaseBtn = container.querySelector('button:first-child');
    const increaseBtn = container.querySelector('button:last-child');

    if (!input || !decreaseBtn || !increaseBtn) return;

    decreaseBtn.addEventListener('click', () => {
      const newValue = Math.max(1, parseInt(input.value) - 1);
      input.value = newValue;
      input.dispatchEvent(new Event('change'));
    });

    increaseBtn.addEventListener('click', () => {
      const newValue = parseInt(input.value) + 1;
      input.value = newValue;
      input.dispatchEvent(new Event('change'));
    });

    input.addEventListener('change', () => {
      if (input.value < 1) input.value = 1;
    });
  });
}

// Variant selector functionality
function initializeVariantSelectors() {
  document.querySelectorAll('.option-buttons').forEach(container => {
    const buttons = container.querySelectorAll('.option-btn');
    
    buttons.forEach(button => {
      button.addEventListener('click', () => {
        // Remove active class from all buttons in this group
        buttons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        button.classList.add('active');
        
        // Update hidden variant selector if it exists
        const optionIndex = container.dataset.optionIndex;
        const value = button.dataset.value;
        const selector = document.querySelector(`#SingleOptionSelector-${optionIndex}`);
        
        if (selector) {
          selector.value = value;
          selector.dispatchEvent(new Event('change'));
        }
      });
    });
  });
} 