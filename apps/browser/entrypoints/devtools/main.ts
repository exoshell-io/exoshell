browser.devtools.panels.create(
  'Exoshell',
  'icons/128.png',
  'devtools-panel.html',
);

browser.devtools.panels.elements.createSidebarPane(
  'Example Pane',
  (sidebar) => {
    sidebar.setObject({ some_data: 'Some data to show' });
  },
);
