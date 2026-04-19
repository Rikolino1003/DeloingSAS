// Script para navegación entre módulos
(function(){
  // ===== NAVEGACIÓN ENTRE MÓDULOS =====
  const moduleNav = {
    nosotros: {
      name: 'Nosotros',
      next: 'contactanos',
      prev: null
    },
    contactanos: {
      name: 'Contáctanos',
      next: 'trabaja-con-nosotros',
      prev: 'nosotros'
    },
    'trabaja-con-nosotros': {
      name: 'Trabaja con Nosotros',
      next: 'indicadores-financieros',
      prev: 'contactanos'
    },
    'indicadores-financieros': {
      name: 'Indicadores Financieros',
      next: 'diapositiva',
      prev: 'trabaja-con-nosotros'
    },
    diapositiva: {
      name: 'Nuestro Negocio',
      next: null,
      prev: 'indicadores-financieros'
    }
  };

  // Obtener módulo actual del pathname
  function getCurrentModule() {
    const path = window.location.pathname;
    const filename = path.split('/').pop().replace('.html', '');
    console.log('Current module:', filename); // Debug
    return filename;
  }

  // Construir botones de navegación
  function setupModuleNavigation() {
    const currentModule = getCurrentModule();
    const navContainer = document.querySelector('.nav-buttons');
    
    if (!navContainer) {
      console.warn('Nav container not found');
      return;
    }

    // Limpiar contenedor anterior
    navContainer.innerHTML = '';

    // Botón para volver al inicio
    const homeBtn = document.createElement('a');
    homeBtn.href = '../index.html';
    homeBtn.className = 'btn-back-home';
    homeBtn.innerHTML = '<i class="fas fa-arrow-left"></i> Volver al inicio';
    homeBtn.title = 'Volver a la página principal';
    navContainer.appendChild(homeBtn);

    // Botones de navegación entre módulos
    const moduleInfo = moduleNav[currentModule];
    
    if (!moduleInfo) {
      console.warn('Module not found in navigation map:', currentModule);
      return;
    }

    if (moduleInfo.prev) {
      const prevBtn = document.createElement('a');
      prevBtn.href = `./${moduleInfo.prev}.html`;
      prevBtn.className = 'btn-nav-module btn-prev';
      prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i> Anterior';
      prevBtn.title = `Ir a ${moduleNav[moduleInfo.prev].name}`;
      navContainer.appendChild(prevBtn);
    }

    if (moduleInfo.next) {
      const nextBtn = document.createElement('a');
      nextBtn.href = `./${moduleInfo.next}.html`;
      nextBtn.className = 'btn-nav-module btn-next';
      nextBtn.innerHTML = 'Siguiente <i class="fas fa-chevron-right"></i>';
      nextBtn.title = `Ir a ${moduleNav[moduleInfo.next].name}`;
      navContainer.appendChild(nextBtn);
    }
    
    console.log('Navigation buttons created for:', currentModule); // Debug
  }

  // Ejecutar cuando el DOM esté listo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupModuleNavigation);
  } else {
    setupModuleNavigation();
  }
})();
