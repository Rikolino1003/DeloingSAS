(function() {
  function switchTab(tabIndex) {
    const tabs = document.querySelectorAll('.service-tab');
    const panels = document.querySelectorAll('.service-panels > div');
    if (!tabs.length || !panels.length) return;

    tabs.forEach(tab => tab.classList.remove('active'));
    panels.forEach(panel => panel.classList.remove('active'));

    const targetTab = tabs[tabIndex] || tabs[0];
    const targetPanel = panels[tabIndex] || panels[0];

    targetTab.classList.add('active');
    targetPanel.classList.add('active');
  }

  window.switchTab = switchTab;

  document.addEventListener('click', function(e) {
    const tab = e.target.closest('.service-tab');
    if (!tab) return;
    const tabs = Array.from(document.querySelectorAll('.service-tab'));
    const index = tabs.indexOf(tab);
    if (index >= 0) {
      switchTab(index);
    }
  });

  if (document.querySelectorAll('.service-tab').length > 0) {
    switchTab(0);
  }
})();
