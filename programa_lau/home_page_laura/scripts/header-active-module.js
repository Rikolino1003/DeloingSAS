// Script para marcar el módulo activo en el navbar
(function() {
  function highlightActiveModule() {
    // Obtener la URL actual
    const url = window.location.pathname;
    
    // Detectar si estamos en index o en un módulo
    const isIndex = url.includes('index.html') || 
                    url.endsWith('home_page_laura/') || 
                    url.endsWith('/');
    const isContactanos = url.includes('contactanos.html');
    const isNosotros = url.includes('modulos/nosotros.html');
    const isIndicadores = url.includes('indicadores-financieros.html');
    const isTrabaja = url.includes('trabaja-con-nosotros.html');
    
    // Obtener elementos
    const dropdownInicio = document.getElementById('nav-dropdown-inicio');
    const moduleLinks = document.querySelectorAll('.nav-module-link');
    
    // Limpiar todas las clases active
    moduleLinks.forEach(link => link.classList.remove('active'));
    
    if (isIndex) {
      // En index: mostrar dropdown
      if (dropdownInicio) dropdownInicio.style.display = 'block';
    } else {
      // En módulo: ocultar dropdown y resaltar módulo activo
      if (dropdownInicio) dropdownInicio.style.display = 'none';
      
      moduleLinks.forEach(link => {
        if ((isContactanos && link.href.includes('contactanos')) ||
            (isNosotros && link.href.includes('modulos/nosotros')) ||
            (isIndicadores && link.href.includes('indicadores')) ||
            (isTrabaja && link.href.includes('trabaja-con-nosotros'))) {
          link.classList.add('active');
        }
      });
    }
  }
  
  // Ejecutar cuando el DOM esté listo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', highlightActiveModule);
  } else {
    highlightActiveModule();
  }
})();
