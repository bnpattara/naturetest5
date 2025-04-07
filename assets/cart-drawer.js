class CartDrawer {
  constructor() {
    this.cartLink = document.querySelector('.cart-link');
    this.cartCount = document.querySelector('[data-cart-count]');
    this.setupEventListeners();
  }

  setupEventListeners() {
    // Listen for add to cart events
    document.addEventListener('submit', (event) => {
      if (event.target.matches('form[action="/cart/add"]')) {
        event.preventDefault();
        this.addToCart(event.target);
      }
    });

    // Update cart count when cart is updated
    document.addEventListener('cart:updated', (event) => {
      this.updateCartCount(event.detail.cart.item_count);
    });
  }

  async addToCart(form) {
    try {
      const response = await fetch('/cart/add.js', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.formDataToJSON(form)),
      });

      if (!response.ok) throw new Error('Network response was not ok');

      const cart = await this.getCart();
      this.updateCartCount(cart.item_count);
      this.showAddToCartNotification();

    } catch (error) {
      console.error('Error:', error);
      this.showErrorNotification();
    }
  }

  async getCart() {
    const response = await fetch('/cart.js');
    return response.json();
  }

  updateCartCount(count) {
    this.cartCount.textContent = count;
    this.cartCount.classList.toggle('hidden', count === 0);
  }

  formDataToJSON(form) {
    const formData = new FormData(form);
    const data = {};
    
    for (let [key, value] of formData.entries()) {
      if (data[key] !== undefined) {
        if (!Array.isArray(data[key])) {
          data[key] = [data[key]];
        }
        data[key].push(value);
      } else {
        data[key] = value;
      }
    }
    
    return data;
  }

  showAddToCartNotification() {
    // Implement your notification UI here
    console.log('Item added to cart');
  }

  showErrorNotification() {
    // Implement your error notification UI here
    console.error('Error adding item to cart');
  }
}

// Initialize cart drawer when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new CartDrawer();
}); 