// Data
const servicesData = [
  {
    title: "I will create beautiful posters for your company.",
    reviews: "2 reviews",
    price: "from $90",
    subscription: false,
    description: "Professional poster designs with bold colors and creative concepts. Perfect for marketing campaigns, events, and brand promotion.",
    deliveryTime: "3-5 days",
    revisions: "2 revisions included"
  },
  {
    title: "I will create 3D designs for your brand.",
    reviews: "4 reviews",
    price: "from $120/mo",
    subscription: true,
    description: "Modern 3D brand designs including product visualization, packaging mockups, and promotional materials. Subscription includes monthly updates.",
    deliveryTime: "5-7 days",
    revisions: "Unlimited revisions"
  }
];

// State management
let currentPage = 'services';

// DOM Elements
const navLinks = document.querySelectorAll('.nav-link');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
const serviceCards = document.querySelectorAll('.service-card');
const serviceModal = document.getElementById('serviceModal');
const contactModal = document.getElementById('contactModal');
const modalContent = document.getElementById('modalContent');
const closeModalBtn = document.getElementById('closeModal');
const closeContactModalBtn = document.getElementById('closeContactModal');
const workBtn = document.getElementById('workBtn');
const payBtn = document.getElementById('payBtn');
const socialIcons = document.querySelectorAll('.social-icon');
const menuBtn = document.querySelector('.menu-btn');
const mobileMenu = document.getElementById('mobileMenu');
const closeMenuBtn = document.getElementById('closeMenu');
const contactForm = document.getElementById('contactForm');
const contactModalTitle = document.getElementById('contactModalTitle');

// Navigation handling
function switchPage(pageName) {
  currentPage = pageName;
  
  // Hide all pages
  document.querySelectorAll('.page-content').forEach(page => {
    page.classList.add('hidden');
  });
  
  // Show selected page
  const pageMap = {
    'services': 'servicesPage',
    'products': 'productsPage',
    'portfolio': 'portfolioPage',
    'about': 'aboutPage'
  };
  
  const pageElement = document.getElementById(pageMap[pageName]);
  if (pageElement) {
    pageElement.classList.remove('hidden');
  }
  
  // Update active states
  navLinks.forEach(link => {
    if (link.dataset.page === pageName) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
  
  mobileNavLinks.forEach(link => {
    if (link.dataset.page === pageName) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
  
  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Event listeners for navigation
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const page = link.dataset.page;
    switchPage(page);
  });
});

mobileNavLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const page = link.dataset.page;
    switchPage(page);
    mobileMenu.classList.remove('active');
  });
});

// Service card modal
serviceCards.forEach(card => {
  card.addEventListener('click', () => {
    const serviceIndex = parseInt(card.dataset.service);
    const service = servicesData[serviceIndex];
    
    modalContent.innerHTML = `
      <h2>${service.title}</h2>
      ${service.subscription ? '<span class="subscription-badge">Subscription</span>' : ''}
      <div style="margin: 24px 0;">
        <p style="font-size: 24px; font-weight: 700; margin-bottom: 8px;">${service.price}</p>
        <p style="color: var(--color-text-secondary); margin-bottom: 16px;">${service.reviews}</p>
      </div>
      <h3>About this service</h3>
      <p>${service.description}</p>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-top: 24px; padding: 16px; background: var(--color-secondary); border-radius: var(--radius-base);">
        <div>
          <p style="font-size: 12px; color: var(--color-text-secondary); margin-bottom: 4px;">Delivery Time</p>
          <p style="font-weight: 600;">${service.deliveryTime}</p>
        </div>
        <div>
          <p style="font-size: 12px; color: var(--color-text-secondary); margin-bottom: 4px;">Revisions</p>
          <p style="font-weight: 600;">${service.revisions}</p>
        </div>
      </div>
      <button class="btn btn-filled btn-full-width" style="margin-top: 24px;" onclick="openContactModal('Order Service')">Order Now</button>
    `;
    
    serviceModal.classList.add('active');
  });
});

// Close service modal
closeModalBtn.addEventListener('click', () => {
  serviceModal.classList.remove('active');
});

serviceModal.addEventListener('click', (e) => {
  if (e.target === serviceModal) {
    serviceModal.classList.remove('active');
  }
});

// Contact modal functions
function openContactModal(title) {
  contactModalTitle.textContent = title;
  contactModal.classList.add('active');
  serviceModal.classList.remove('active');
  contactForm.reset();
}

window.openContactModal = openContactModal;

workBtn.addEventListener('click', () => {
  openContactModal('Work with Miles');
});

payBtn.addEventListener('click', () => {
  openContactModal('Pay Miles');
});

closeContactModalBtn.addEventListener('click', () => {
  contactModal.classList.remove('active');
});

contactModal.addEventListener('click', (e) => {
  if (e.target === contactModal) {
    contactModal.classList.remove('active');
  }
});

// Contact form submission
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const formData = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    message: document.getElementById('message').value
  };
  
  // Show success message
  contactModal.classList.remove('active');
  
  // Create temporary success notification
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed;
    top: 80px;
    right: 24px;
    background: var(--color-success);
    color: white;
    padding: 16px 24px;
    border-radius: 8px;
    box-shadow: var(--shadow-lg);
    z-index: 1001;
    font-weight: 600;
    animation: slideIn 0.3s ease;
  `;
  notification.textContent = 'Message sent successfully! Miles will get back to you soon.';
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 3000);
  
  // Add animations
  if (!document.getElementById('notificationStyles')) {
    const style = document.createElement('style');
    style.id = 'notificationStyles';
    style.textContent = `
      @keyframes slideIn {
        from {
          transform: translateX(400px);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }
      @keyframes slideOut {
        from {
          transform: translateX(0);
          opacity: 1;
        }
        to {
          transform: translateX(400px);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
  }
});

// Social media handling
socialIcons.forEach(icon => {
  icon.addEventListener('click', (e) => {
    e.preventDefault();
    const social = icon.dataset.social;
    const socialNames = {
      'instagram': 'Instagram',
      'pinterest': 'Pinterest',
      'linkedin': 'LinkedIn'
    };
    
    // Create temporary notification
    const notification = document.createElement('div');
    notification.style.cssText = `
      position: fixed;
      top: 80px;
      right: 24px;
      background: var(--color-text);
      color: var(--color-surface);
      padding: 16px 24px;
      border-radius: 8px;
      box-shadow: var(--shadow-lg);
      z-index: 1001;
      font-weight: 600;
      animation: slideIn 0.3s ease;
    `;
    notification.textContent = `Visit Miles on ${socialNames[social]}`;
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.style.animation = 'slideOut 0.3s ease';
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 2000);
  });
});

// Mobile menu
menuBtn.addEventListener('click', () => {
  mobileMenu.classList.add('active');
});

closeMenuBtn.addEventListener('click', () => {
  mobileMenu.classList.remove('active');
});

// Search button
document.querySelector('.search-btn').addEventListener('click', () => {
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed;
    top: 80px;
    right: 24px;
    background: var(--color-text);
    color: var(--color-surface);
    padding: 16px 24px;
    border-radius: 8px;
    box-shadow: var(--shadow-lg);
    z-index: 1001;
    font-weight: 600;
    animation: slideIn 0.3s ease;
  `;
  notification.textContent = 'Search functionality coming soon!';
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 2000);
});

// Portfolio thumbnails click
document.querySelectorAll('.thumbnail').forEach(thumbnail => {
  thumbnail.addEventListener('click', () => {
    switchPage('portfolio');
  });
});

// Keyboard accessibility
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    serviceModal.classList.remove('active');
    contactModal.classList.remove('active');
    mobileMenu.classList.remove('active');
  }
});

// Initialize
console.log('Miles Becker Portfolio loaded successfully!');