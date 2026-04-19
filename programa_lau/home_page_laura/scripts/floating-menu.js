// Floating Menu Handler for Modules
(function() {
  // Esperar a que el DOM esté listo y el header se cargue
  function initFloatingMenu() {
    const floatingBtn = document.getElementById('floating-index-btn');
    const floatingMenu = document.getElementById('floating-menu');
    const floatingMenuClose = document.getElementById('floating-menu-close');
    const floatingMenuLinks = document.querySelectorAll('.floating-menu-link');
    
    // Si el botón no existe aún, esperar
    if (!floatingBtn || !floatingMenu) {
      setTimeout(initFloatingMenu, 100);
      return;
    }

    // Open/close floating menu
    floatingBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      floatingBtn.classList.toggle('active');
      floatingMenu.classList.toggle('active');
      document.body.classList.toggle('floating-menu-open');
    });

    // Close with X button
    if (floatingMenuClose) {
      floatingMenuClose.addEventListener('click', function(e) {
        e.stopPropagation();
        floatingBtn.classList.remove('active');
        floatingMenu.classList.remove('active');
        document.body.classList.remove('floating-menu-open');
      });
    }

    // Close when clicking outside
    document.addEventListener('click', function(e) {
      if (floatingBtn.classList.contains('active') && 
          !floatingMenu.contains(e.target) && 
          !floatingBtn.contains(e.target)) {
        floatingBtn.classList.remove('active');
        floatingMenu.classList.remove('active');
        document.body.classList.remove('floating-menu-open');
      }
    });

    // Handle link clicks - navigation only (no scroll)
    floatingMenuLinks.forEach(link => {
      link.addEventListener('click', function() {
        // Close menu
        floatingBtn.classList.remove('active');
        floatingMenu.classList.remove('active');
        document.body.classList.remove('floating-menu-open');
      });
    });

    // Close on escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        floatingBtn.classList.remove('active');
        floatingMenu.classList.remove('active');
        document.body.classList.remove('floating-menu-open');
      }
    });
  }

  // Iniciar cuando el DOM esté listo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFloatingMenu);
  } else {
    initFloatingMenu();
  }
})();
