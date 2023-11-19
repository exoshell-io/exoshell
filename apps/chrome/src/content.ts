console.log('Loaded');

document.addEventListener('readystatechange', () => {
  console.log('Ready state changed');
  document.querySelectorAll('a').forEach((a) => {
    a.setAttribute('color', 'pink');
  });
});
