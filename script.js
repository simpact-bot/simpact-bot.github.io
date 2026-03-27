document.addEventListener("DOMContentLoaded", function () {

    // Initialize all carousels
    document.querySelectorAll('[data-carousel]').forEach(initCarousel);

    // Attempt autoplay on all videos (handles browser autoplay policy)
    document.querySelectorAll('video').forEach(video => {
        const p = video.play();
        if (p !== undefined) {
            p.catch(() => console.log("Autoplay prevented for video:", video));
        }
    });

});

function initCarousel(carousel) {
    const track = carousel.querySelector('.carousel-track');
    const slides = carousel.querySelectorAll('.carousel-slide');
    const prevBtn = carousel.querySelector('.carousel-btn.prev');
    const nextBtn = carousel.querySelector('.carousel-btn.next');
    const dots = carousel.querySelectorAll('.carousel-dot');
    const counter = carousel.querySelector('.carousel-counter');
    const total = slides.length;
    let current = 0;

    function goTo(index) {
        current = (index + total) % total;
        track.style.transform = `translateX(-${current * 100}%)`;
        dots.forEach((dot, i) => dot.classList.toggle('active', i === current));
        if (counter) counter.textContent = `${current + 1} / ${total}`;
    }

    prevBtn.addEventListener('click', () => goTo(current - 1));
    nextBtn.addEventListener('click', () => goTo(current + 1));
    dots.forEach((dot, i) => dot.addEventListener('click', () => goTo(i)));

    // Keyboard navigation when carousel is focused
    carousel.setAttribute('tabindex', '0');
    carousel.addEventListener('keydown', e => {
        if (e.key === 'ArrowLeft') goTo(current - 1);
        if (e.key === 'ArrowRight') goTo(current + 1);
    });

    // Touch / swipe support
    let startX = 0;
    const container = carousel.querySelector('.carousel-track-container');
    container.addEventListener('touchstart', e => {
        startX = e.touches[0].clientX;
    }, { passive: true });
    container.addEventListener('touchend', e => {
        const delta = startX - e.changedTouches[0].clientX;
        if (Math.abs(delta) > 40) goTo(delta > 0 ? current + 1 : current - 1);
    });

    goTo(0);
}
