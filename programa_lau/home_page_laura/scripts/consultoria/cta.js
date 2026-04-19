// Carousel Slider - Profesional y Moderno
(function() {
  
  class CarouselSlider {
    constructor() {
      this.track = document.querySelector('.carousel-track');
      this.slides = document.querySelectorAll('.carousel-slide');
      this.indicators = document.querySelectorAll('.indicator');
      this.prevBtn = document.querySelector('.carousel-btn-prev');
      this.nextBtn = document.querySelector('.carousel-btn-next');
      
      if (!this.track || this.slides.length === 0) {
        console.warn('Carousel elements not found');
        return;
      }

      this.currentIndex = 0;
      this.totalSlides = this.slides.length;
      this.autoplayInterval = null;
      this.autoplayDelay = 5000; // 5 segundos
      this.isTransitioning = false;

      this.init();
    }

    init() {
      // Eventos de navegación
      if (this.prevBtn) {
        this.prevBtn.addEventListener('click', () => this.prevSlide());
      }
      if (this.nextBtn) {
        this.nextBtn.addEventListener('click', () => this.nextSlide());
      }

      // Eventos de indicadores
      this.indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => this.goToSlide(index));
      });

      // Autoplay
      this.startAutoplay();

      // Pausar autoplay al pasar el mouse
      const container = document.querySelector('.carousel-container');
      if (container) {
        container.addEventListener('mouseenter', () => this.stopAutoplay());
        container.addEventListener('mouseleave', () => this.startAutoplay());
      }

      // Teclado
      document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') this.prevSlide();
        if (e.key === 'ArrowRight') this.nextSlide();
      });
    }

    updateSlide() {
      if (!this.track) return;
      const offset = -this.currentIndex * 100;
      this.track.style.transform = `translateX(${offset}%)`;

      this.indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === this.currentIndex);
      });
    }

    nextSlide() {
      if (this.isTransitioning) return;
      this.isTransitioning = true;
      this.currentIndex = (this.currentIndex + 1) % this.totalSlides;
      this.updateSlide();
      this.resetAutoplay();
      setTimeout(() => { this.isTransitioning = false; }, 500);
    }

    prevSlide() {
      if (this.isTransitioning) return;
      this.isTransitioning = true;
      this.currentIndex = (this.currentIndex - 1 + this.totalSlides) % this.totalSlides;
      this.updateSlide();
      this.resetAutoplay();
      setTimeout(() => { this.isTransitioning = false; }, 500);
    }

    goToSlide(index) {
      if (this.isTransitioning) return;
      this.isTransitioning = true;
      this.currentIndex = index;
      this.updateSlide();
      this.resetAutoplay();
      setTimeout(() => { this.isTransitioning = false; }, 500);
    }

    startAutoplay() {
      this.autoplayInterval = setInterval(() => this.nextSlide(), this.autoplayDelay);
    }

    stopAutoplay() {
      clearInterval(this.autoplayInterval);
    }

    resetAutoplay() {
      this.stopAutoplay();
      this.startAutoplay();
    }
  }

  // Inicializar cuando el DOM está listo
  document.addEventListener('DOMContentLoaded', () => {
    new CarouselSlider();
  });

  // También intentar inicializar si el documento ya está cargado
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      new CarouselSlider();
    });
  } else {
    new CarouselSlider();
  }
})();
