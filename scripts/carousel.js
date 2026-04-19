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

      // Establecer posición inicial
      this.updateCarousel();
    }

    updateCarousel() {
      // Actualizar posición del track
      const offset = -this.currentIndex * 100;
      this.track.style.transform = `translateX(${offset}%)`;

      // Actualizar indicadores
      this.indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === this.currentIndex);
      });
    }

    nextSlide() {
      if (this.isTransitioning) return;
      this.isTransitioning = true;

      this.currentIndex = (this.currentIndex + 1) % this.totalSlides;
      this.updateCarousel();

      setTimeout(() => {
        this.isTransitioning = false;
      }, 600);

      this.resetAutoplay();
    }

    prevSlide() {
      if (this.isTransitioning) return;
      this.isTransitioning = true;

      this.currentIndex = (this.currentIndex - 1 + this.totalSlides) % this.totalSlides;
      this.updateCarousel();

      setTimeout(() => {
        this.isTransitioning = false;
      }, 600);

      this.resetAutoplay();
    }

    goToSlide(index) {
      if (this.isTransitioning || index === this.currentIndex) return;
      this.isTransitioning = true;

      this.currentIndex = index;
      this.updateCarousel();

      setTimeout(() => {
        this.isTransitioning = false;
      }, 600);

      this.resetAutoplay();
    }

    startAutoplay() {
      this.autoplayInterval = setInterval(() => {
        this.currentIndex = (this.currentIndex + 1) % this.totalSlides;
        this.updateCarousel();
      }, this.autoplayDelay);
    }

    stopAutoplay() {
      if (this.autoplayInterval) {
        clearInterval(this.autoplayInterval);
        this.autoplayInterval = null;
      }
    }

    resetAutoplay() {
      this.stopAutoplay();
      this.startAutoplay();
    }
  }

  // Inicializar cuando el DOM esté listo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      new CarouselSlider();
    });
  } else {
    new CarouselSlider();
  }
})();
