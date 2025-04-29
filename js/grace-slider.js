// Custom slider for Grace Couture
// This script centers model images and adds custom navigation

document.addEventListener('DOMContentLoaded', function() {
    const models = document.querySelectorAll('.model-image');
    if (!models.length) return;
    let currentIndex = 0;

    // Hide all models except the first one
    models.forEach((model, index) => {
        if (index !== 0) {
            model.style.opacity = '0';
            model.style.transform = 'translateX(-150%) scale(0.9)';
            model.style.zIndex = '0';
        } else {
            model.style.opacity = '1';
            model.style.transform = 'translateX(-50%) scale(1)';
            model.style.zIndex = '1';
        }
    });

    // Create custom navigation
    const navContainer = document.createElement('div');
    navContainer.className = 'custom-slider-nav';
    navContainer.innerHTML = `
    <button class="prev-btn"><i class="fa fa-chevron-left"></i></button>
    <div class="slider-indicators"></div>
    <button class="next-btn"><i class="fa fa-chevron-right"></i></button>
  `;
    document.body.appendChild(navContainer);

    // Create indicator dots
    const indicatorsContainer = navContainer.querySelector('.slider-indicators');
    models.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.className = 'slider-dot';
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        indicatorsContainer.appendChild(dot);
    });

    navContainer.querySelector('.prev-btn').addEventListener('click', prevSlide);
    navContainer.querySelector('.next-btn').addEventListener('click', nextSlide);

    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') prevSlide();
        if (e.key === 'ArrowRight') nextSlide();
    });

    function nextSlide() {
        goToSlide((currentIndex + 1) % models.length);
    }

    function prevSlide() {
        goToSlide((currentIndex - 1 + models.length) % models.length);
    }

    function goToSlide(index) {
        // Hide current slide
        models[currentIndex].style.opacity = '0';
        models[currentIndex].style.transform = 'translateX(-150%) scale(0.9)';
        models[currentIndex].style.zIndex = '0';

        // Update indicators
        document.querySelectorAll('.slider-dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });

        // Show new slide with animation from side
        setTimeout(() => {
            models[index].style.transform = 'translateX(50%) scale(0.9)';
            models[index].style.opacity = '0.5';
            models[index].style.zIndex = '1';
            setTimeout(() => {
                models[index].style.opacity = '1';
                models[index].style.transform = 'translateX(-50%) scale(1)';
            }, 50);
        }, 400);

        currentIndex = index;
    }
});