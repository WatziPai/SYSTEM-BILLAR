// ============================================
// UTILIDADES DE PERFORMANCE
// ============================================

/**
 * Debounce function - retrasa la ejecución hasta que pasen X ms sin llamadas
 * Perfecto para búsquedas y inputs
 */
export function debounce(func, wait = 300) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Throttle function - limita la frecuencia de ejecución
 * Perfecto para eventos de scroll y resize
 */
export function throttle(func, limit = 100) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

/**
 * Lazy load images - carga imágenes cuando están visibles
 */
export function lazyLoadImages() {
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove('lazy');
          imageObserver.unobserve(img);
        }
      });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  }
}

/**
 * RequestAnimationFrame wrapper para animaciones optimizadas
 */
export function rafThrottle(callback) {
  let rafId = null;
  return function(...args) {
    if (rafId === null) {
      rafId = requestAnimationFrame(() => {
        callback.apply(this, args);
        rafId = null;
      });
    }
  };
}

/**
 * Memoización simple para funciones puras
 */
export function memoize(fn) {
  const cache = new Map();
  return function(...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}
