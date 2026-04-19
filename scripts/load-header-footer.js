// Script para cargar header y footer dinámicamente en módulos
// NOTA: El footer es el MISMO en todas partes - si cambias sections/consultoria/footer.html, se actualiza en todo
(function() {
  
  function isInModule() {
    return window.location.pathname.includes('/modulos/');
  }

  function adjustPaths(html) {
    if (isInModule()) {
      // Si estamos en un módulo, convertir rutas relativas a la carpeta principal
      html = html.replace(/href="modulos\//g, 'href="./');
      html = html.replace(/src="img\//g, 'src="../img/');
      html = html.replace(/href="index.html"/g, 'href="../index.html"');
      html = html.replace(/href="styles\//g, 'href="../styles/');
    }
    return html;
  }

  // Cargar HEADER
  const headerPlaceholder = document.getElementById('header-placeholder');
  if (headerPlaceholder) {
    const headerPath = isInModule() ? '../sections/header.html' : 'sections/header.html';
    fetch(headerPath)
      .then(response => response.text())
      .then(html => {
        html = adjustPaths(html);
        headerPlaceholder.innerHTML = html;
        console.log('✓ Header cargado desde:', headerPath);
      })
      .catch(err => console.warn('✗ Error al cargar header:', err));
  }

  // Cargar FOOTER (EL MISMO para todos los módulos y el index)
  const footerPlaceholder = document.getElementById('footer-placeholder');
  if (footerPlaceholder) {
    const footerPath = isInModule() ? '../sections/consultoria/footer.html' : 'sections/consultoria/footer.html';
    fetch(footerPath)
      .then(response => response.text())
      .then(html => {
        html = adjustPaths(html);
        footerPlaceholder.innerHTML = html;
        console.log('✓ Footer cargado desde:', footerPath);
      })
      .catch(err => console.warn('✗ Error al cargar footer:', err));
  }
})();
