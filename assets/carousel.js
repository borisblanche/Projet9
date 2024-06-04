document.addEventListener("DOMContentLoaded", function() {
    const carousel = document.querySelector('.carousel');
    const carouselImages = document.querySelector('.carousel-images');
    const images = document.querySelectorAll('.carousel img');
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');
    let counter = 0;
    const size = images[0].clientWidth;

    // Initialize the first image position
    carouselImages.style.transform = 'translateX(' + (-size * counter) + 'px)';

    // Next button
    nextButton.addEventListener('click', () => {
        if (counter >= images.length - 1) return;
        carouselImages.style.transition = 'transform 0.5s ease-in-out';
        counter++;
        carouselImages.style.transform = 'translateX(' + (-size * counter) + 'px)';
    });

    // Previous button
    prevButton.addEventListener('click', () => {
        if (counter <= 0) return;
        carouselImages.style.transition = 'transform 0.5s ease-in-out';
        counter--;
        carouselImages.style.transform = 'translateX(' + (-size * counter) + 'px)';
    });

    // Automatic slide
    setInterval(() => {
        if (counter >= images.length - 1) {
            counter = -1;
        }
        carouselImages.style.transition = 'transform 0.5s ease-in-out';
        counter++;
        carouselImages.style.transform = 'translateX(' + (-size * counter) + 'px)';
    }, 3000);
});
