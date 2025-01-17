// Utility functions
const utils = {
    easeInOutCubic: t => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
    
    debounce: (func, wait) => {
      let timeout;
      return function executedFunction(...args) {
        const later = () => {
          clearTimeout(timeout);
          func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
      };
    },
    
    isInViewport: (element, offset = 100) => {
      const rect = element.getBoundingClientRect();
      return (
        rect.top <= window.innerHeight - offset &&
        rect.bottom >= 0
      );
    }
  };
  
  class SmoothScroll {
    constructor(offset = 50) {
      this.offset = offset;
      this.init();
    }
  
    init() {
      document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', this.handleClick.bind(this));
      });
    }
  
    handleClick(e) {
      e.preventDefault();
      const targetId = e.currentTarget.getAttribute('href').substring(1);
      const target = document.getElementById(targetId);
      
      if (!target) return;
      
      const targetPosition = target.getBoundingClientRect().top + window.scrollY - this.offset;
      const startPosition = window.scrollY;
      const distance = targetPosition - startPosition;
      
      this.animateScroll(startPosition, distance);
    }
  
    animateScroll(startPosition, distance) {
      let startTime = null;
      const duration = 1000;
  
      const animation = currentTime => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);
        const eased = utils.easeInOutCubic(progress);
        
        window.scrollTo(0, startPosition + distance * eased);
        
        if (progress < 1) {
          requestAnimationFrame(animation);
        }
      };
      
      requestAnimationFrame(animation);
    }
  }
  
  class AnimationManager {
    constructor() {
      this.animations = new Map();
      this.init();
    }
  
    init() {
      // Typing animation
      this.initTypeWriter();
      
      // Particle effect
      this.initParticles();
      
      // Scroll animations
      this.initScrollAnimations();
      
      // Card hover effects
      this.initCardEffects();
      
      // Progress bar
      this.initProgressBar();
    }
  
    initTypeWriter() {
      const typingText = document.querySelector('header h1');
      if (!typingText) return;
  
      const text = typingText.innerText;
      typingText.innerHTML = '';
      
      const typeWriter = (text, element, speed = 100) => {
        return new Promise(resolve => {
          let i = 0;
          const timer = setInterval(() => {
            if (i < text.length) {
              element.innerHTML += text.charAt(i);
              i++;
            } else {
              clearInterval(timer);
              resolve();
            }
          }, speed);
        });
      };
  
      typeWriter(text, typingText);
    }
  
    initParticles() {
      const header = document.querySelector('header');
      if (!header) return;
  
      const fragment = document.createDocumentFragment();
      
      for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
          left: ${Math.random() * 100}%;
          animation-delay: ${Math.random() * 5}s;
        `;
        fragment.appendChild(particle);
      }
      
      header.appendChild(fragment);
    }
  
    initScrollAnimations() {
      const observer = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('animate-in');
              observer.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.1,
          rootMargin: '0px 0px -50px 0px'
        }
      );
  
      document.querySelectorAll('.internship').forEach(item => {
        observer.observe(item);
      });
    }
  
    initCardEffects() {
      const cards = document.querySelectorAll('.internship');
      
      cards.forEach(card => {
        const handleMouseMove = e => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
  
          card.style.setProperty('--mouse-x', `${x}px`);
          card.style.setProperty('--mouse-y', `${y}px`);
        };
  
        card.addEventListener('mousemove', utils.debounce(handleMouseMove, 10));
      });
    }
  
    initProgressBar() {
      const updateProgress = utils.debounce(() => {
        const winScroll = document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        
        requestAnimationFrame(() => {
          const progressBar = document.querySelector('.scroll-progress');
          if (progressBar) {
            progressBar.style.setProperty('--scroll', `${scrolled}%`);
          }
        });
      }, 10);
  
      window.addEventListener('scroll', updateProgress, { passive: true });
    }
  }
  
  // Initialize everything when DOM is ready
  document.addEventListener('DOMContentLoaded', () => {
    new SmoothScroll();
    new AnimationManager();
  });
