document.querySelector('#hamburger').addEventListener('click', (e) => {
    const navbar = document.querySelector('.left');
    const pos = navbar.offsetLeft;

    if (pos < 0) {
        e.target.style.transform = `rotate(90deg)`;
        navbar.style.left = '0px';
    } else {
        e.target.style.transform = `rotate(360deg)`;
        navbar.style.left = '-100%';
    }
});
