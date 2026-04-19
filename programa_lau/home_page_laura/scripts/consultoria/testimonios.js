(function() {
  const container = document.querySelector('.testimonios-scroll');
  if (!container) return;

  // Agregar un ligero auto-scroll para movimiento suave
  let offset = 0;
  const step = 220;
  function autoScroll() {
    if (!container) return;
    offset += step;
    if (offset > container.scrollWidth - container.clientWidth) {
      offset = 0;
    }
    container.scrollTo({ left: offset, behavior: 'smooth' });
  }

  const timer = setInterval(autoScroll, 6000);

  container.addEventListener('mouseenter', () => clearInterval(timer));
})();
// Testimonios Slider
let currentTestimonioSlide = 0;
const testimonioSlides = document.querySelectorAll('.testimonio-slide');
const testimoniosDots = document.querySelector('.testimonios-dots');
const prevTestimonioBtn = document.querySelector('.prev-testimonio');
const nextTestimonioBtn = document.querySelector('.next-testimonio');

function createTestimoniosDots() {
    testimonioSlides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToTestimonioSlide(index));
        testimoniosDots.appendChild(dot);
    });
}

function showTestimonioSlide(index) {
    testimonioSlides.forEach(slide => slide.classList.remove('active'));
    document.querySelectorAll('.testimonios-dots .dot').forEach(dot => dot.classList.remove('active'));

    testimonioSlides[index].classList.add('active');
    document.querySelectorAll('.testimonios-dots .dot')[index].classList.add('active');
}

function nextTestimonioSlide() {
    currentTestimonioSlide = (currentTestimonioSlide + 1) % testimonioSlides.length;
    showTestimonioSlide(currentTestimonioSlide);
}

function prevTestimonioSlide() {
    currentTestimonioSlide = (currentTestimonioSlide - 1 + testimonioSlides.length) % testimonioSlides.length;
    showTestimonioSlide(currentTestimonioSlide);
}

function goToTestimonioSlide(index) {
    currentTestimonioSlide = index;
    showTestimonioSlide(currentTestimonioSlide);
}

if (testimonioSlides.length > 0) {
    createTestimoniosDots();
    prevTestimonioBtn.addEventListener('click', prevTestimonioSlide);
    nextTestimonioBtn.addEventListener('click', nextTestimonioSlide);
}
