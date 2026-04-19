// Script para adaptar el header cuando se visualiza en módulos
(function() {
  
  function isInModule() {
    return window.location.pathname.includes('/modulos/');
  }

  function adaptHeaderForModule() {
    if (!isInModule()) return; // Solo adaptar si estamos en un módulo

    // Esperar a que el header se cargue (máximo 5 segundos)
    let attempts = 0;
    const maxAttempts = 50;
    
    const checkHeader = setInterval(() => {
      attempts++;
      const logoLink = document.querySelector('a.logo');
      const navDropdown = document.querySelector('.nav-dropdown');
      const navCenter = document.querySelector('.nav-center');
      
      if (logoLink && navDropdown && navCenter) {
        clearInterval(checkHeader);

        // 1. Cambiar ruta del logo a ../index.html
        logoLink.href = '../index.html';
        const logoImg = logoLink.querySelector('img');
        if (logoImg) {
          logoImg.src = '../img/logo.png';
        }
        const logoText = logoLink.querySelector('strong');
        if (logoText) {
          logoText.textContent = 'Deloing S.A.S';
        }

        // 2. Reemplazar el dropdown "Soluciones" por un link "Inicio" simple
        const inicioLink = document.createElement('a');
        inicioLink.href = '../index.html';
        inicioLink.textContent = 'Inicio';
        inicioLink.className = 'nav-link-simple';
        inicioLink.style.cssText = `
          color: white;
          background: linear-gradient(135deg, #1E6FA3 0%, #154a7a 100%);
          text-decoration: none;
          font-weight: 700;
          padding: 0.6rem 1.5rem;
          border-radius: 6px;
          transition: all 0.3s ease;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          box-shadow: 0 2px 8px rgba(30, 111, 163, 0.3);
          border: 2px solid #1E6FA3;
        `;
        inicioLink.innerHTML = '<i class="fas fa-home"></i> Inicio';
        inicioLink.style.fontSize = '1rem';
        
        inicioLink.onmouseover = function() {
          this.style.background = 'linear-gradient(135deg, #154a7a 0%, #0f3555 100%)';
          this.style.boxShadow = '0 4px 12px rgba(30, 111, 163, 0.5)';
          this.style.transform = 'translateY(-2px)';
        };
        inicioLink.onmouseout = function() {
          this.style.background = 'linear-gradient(135deg, #1E6FA3 0%, #154a7a 100%)';
          this.style.boxShadow = '0 2px 8px rgba(30, 111, 163, 0.3)';
          this.style.transform = 'translateY(0)';
        };

        // Reemplazar el dropdown completo por el nuevo link
        navDropdown.replaceWith(inicioLink);

        // 3. Cambiar rutas de módulos a relativas (./archivo.html)
        const moduleLinks = document.querySelectorAll('.nav-module-link');
        moduleLinks.forEach(link => {
          const href = link.getAttribute('href');
          if (href && href.startsWith('modulos/')) {
            const filename = href.replace('modulos/', '');
            link.href = `./${filename}`;
          }
        });

        console.log('✓ Header adaptado para vista de módulo - Botón "Inicio" creado');
      } else if (attempts >= maxAttempts) {
        clearInterval(checkHeader);
        console.warn('⚠ Header no se cargó completamente');
      }
    }, 100);
  }

  // Ejecutar cuando el DOM esté listo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', adaptHeaderForModule);
  } else {
    adaptHeaderForModule();
  }
})();
