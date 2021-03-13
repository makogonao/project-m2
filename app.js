const zone = document.querySelector('.zone');
const label = document.querySelector('.label');

zone.addEventListener('mousemove', (e) => {
    label.style.top = e.pageY + "px";
    label.style.left = e.pageX + "px";
    console.log(e.pageY, e.pageY);
});

zone.addEventListener('mousemove', () => {
  label.style.display = 'block';
});

zone.addEventListener('mouseout', () => {
  label.style.display = 'none';
});