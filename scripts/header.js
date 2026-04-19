// Script para Header: Dropdown dinámico y saltos suaves a secciones
(function(){
  
  // ===== TOGGLE DROPDOWN =====
  window.toggleDropdown = function(event) {
    event.stopPropagation();
    const btn = event.currentTarget;
    const dropdown = btn.parentElement;
    const menu = dropdown.querySelector('.nav-dropdown-menu');
    
    if (!menu) return;
    
    // Cerrar otros dropdowns
    document.querySelectorAll('.nav-dropdown-menu.active').forEach(m => {
      if (m !== menu) m.classList.remove('active');
    });
    
    // Toggle este dropdown
    menu.classList.toggle('active');
    btn.classList.toggle('active');
  };

  // ===== CERRAR DROPDOWN AL HACER CLICK FUERA =====
  document.addEventListener('click', function(e) {
    if (!e.target.closest('.nav-dropdown')) {
      document.querySelectorAll('.nav-dropdown-menu.active').forEach(menu => {
        menu.classList.remove('active');
      });
      document.querySelectorAll('.nav-dropdown-btn.active').forEach(btn => {
        btn.classList.remove('active');
      });
    }
  });

  // ===== CERRAR DROPDOWN AL SELECCIONAR UN ENLACE =====
  document.querySelectorAll('.nav-jump').forEach(link => {
    link.addEventListener('click', function() {
      const menu = this.closest('.nav-dropdown-menu');
      const btn = menu?.previousElementSibling;
      if (menu) menu.classList.remove('active');
      if (btn) btn.classList.remove('active');
    });
  });

  // ===== BOTÓN FLOTANTE (SOLO INDEX) =====
  function initFloatingMenu() {
    const floatingBtn = document.getElementById('floating-index-btn');
    const floatingMenu = document.getElementById('floating-menu');
    
    if (!floatingBtn || !floatingMenu) {
      return; // No existe en esta página
    }
    
    const floatingMenuClose = document.getElementById('floating-menu-close');
    const floatingMenuLinks = document.querySelectorAll('.floating-menu-link');

    // Abrir/cerrar menú
    floatingBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      floatingBtn.classList.toggle('active');
      floatingMenu.classList.toggle('active');
      document.body.classList.toggle('floating-menu-open');
    });

    // Cerrar con X
    if (floatingMenuClose) {
      floatingMenuClose.addEventListener('click', function() {
        floatingBtn.classList.remove('active');
        floatingMenu.classList.remove('active');
        document.body.classList.remove('floating-menu-open');
      });
    }

    // Cerrar al click fuera
    document.addEventListener('click', function(e) {
      if (!floatingMenu.contains(e.target) && !floatingBtn.contains(e.target)) {
        floatingBtn.classList.remove('active');
        floatingMenu.classList.remove('active');
        document.body.classList.remove('floating-menu-open');
      }
    });

    // Manejar clicks en links
    floatingMenuLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        const targetId = this.getAttribute('data-scroll');
        
        if (targetId) {
          e.preventDefault();
          const el = document.getElementById(targetId);
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        
        floatingBtn.classList.remove('active');
        floatingMenu.classList.remove('active');
        document.body.classList.remove('floating-menu-open');
      });
    });
  }

  // Iniciar cuando el DOM esté listo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFloatingMenu);
  } else {
    initFloatingMenu();
  }
})();
