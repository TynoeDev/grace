/**
 * Grace Couture - Interactive Sliding Animations
 * This script adds interactivity to the sliding PNG images
 */
document.addEventListener('DOMContentLoaded', function() {
    // Custom cursor functionality
    const cursor = document.createElement('div');
    cursor.className = 'cursor-dot';
    const cursorCircle = document.createElement('div');
    cursorCircle.className = 'cursor-circle';
    
    document.body.appendChild(cursor);
    document.body.appendChild(cursorCircle);
    
    // Track mouse position
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let circleX = 0, circleY = 0;
    
    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    // Smooth cursor animation
    function animateCursor() {
        // Smooth follow effect
        cursorX += (mouseX - cursorX) * 0.2;
        cursorY += (mouseY - cursorY) * 0.2;
        
        circleX += (mouseX - circleX) * 0.1;
        circleY += (mouseY - circleY) * 0.1;
        
        cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`;
        cursorCircle.style.transform = `translate3d(${circleX}px, ${circleY}px, 0)`;
        
        requestAnimationFrame(animateCursor);
    }
    
    animateCursor();
    
    // Select all sliding images
    const slidingImages = document.querySelectorAll('.sliding-image');
    
    // Apply interaction effects for each image
    slidingImages.forEach(image => {
        // Pause animation on hover/touch
        image.addEventListener('mouseenter', function() {
            // Change to gold cursor on hover
            cursor.style.background = 'rgba(212, 175, 55, 0.8)';
            cursorCircle.style.borderColor = 'rgba(212, 175, 55, 0.6)';
            cursorCircle.style.width = '60px';
            cursorCircle.style.height = '60px';
            
            // Pause the animation
            this.style.animationPlayState = 'paused';
            
            // Create gold dust particles
            createGoldDustEffect(this);
        });
        
        image.addEventListener('mouseleave', function() {
            // Restore cursor
            cursor.style.background = 'rgba(237, 30, 121, 0.8)';
            cursorCircle.style.borderColor = 'rgba(237, 30, 121, 0.4)';
            cursorCircle.style.width = '40px';
            cursorCircle.style.height = '40px';
            
            // Resume the animation
            this.style.animationPlayState = 'running';
        });
        
        // Mouse move within image for parallax effect
        image.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const mouseXRelative = (e.clientX - rect.left) / rect.width;
            const mouseYRelative = (e.clientY - rect.top) / rect.height;
            
            // Calculate movement amount (subtle shift based on mouse position)
            const moveX = (mouseXRelative - 0.5) * 15; // -7.5px to +7.5px
            const moveY = (mouseYRelative - 0.5) * 15; // -7.5px to +7.5px
            
            // Apply parallax effect
            const img = this.querySelector('img');
            img.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.08)`;
        });
        
        // Click interaction
        image.addEventListener('click', function(e) {
            // Create burst of particles
            createParticleBurst(e.clientX, e.clientY);
            
            // Center the image
            centerImage(this);
            
            // Prevent propagation
            e.stopPropagation();
        });
    });
    
    // Add event listener to resume all animations when clicking elsewhere
    document.addEventListener('click', function() {
        slidingImages.forEach(image => {
            image.style.animationPlayState = 'running';
            image.classList.remove('centered');
        });
    });
    
    // Function to create gold dust particles
    function createGoldDustEffect(element) {
        const rect = element.getBoundingClientRect();
        const particleCount = 8; // Number of particles
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'gold-particle';
            
            // Random position around the element
            const x = Math.random() * rect.width;
            const y = Math.random() * rect.height;
            
            // Random movement
            const tx = (Math.random() - 0.5) * 100;
            const ty = (Math.random() - 0.5) * 100;
            const tr = (Math.random() - 0.5) * 360;
            
            particle.style.setProperty('--tx', `${tx}px`);
            particle.style.setProperty('--ty', `${ty}px`);
            particle.style.setProperty('--tr', `${tr}deg`);
            
            // Position particle
            particle.style.left = `${rect.left + x}px`;
            particle.style.top = `${rect.top + y}px`;
            
            // Add to document and remove after animation
            document.body.appendChild(particle);
            setTimeout(() => {
                particle.remove();
            }, 3000);
        }
    }
    
    // Function to create particle burst on click
    function createParticleBurst(x, y) {
        const burstCount = 20;
        
        for (let i = 0; i < burstCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'gold-particle';
            
            // Random movement - more dramatic than hover effect
            const tx = (Math.random() - 0.5) * 200;
            const ty = (Math.random() - 0.5) * 200;
            const tr = (Math.random() - 0.5) * 720;
            
            particle.style.setProperty('--tx', `${tx}px`);
            particle.style.setProperty('--ty', `${ty}px`);
            particle.style.setProperty('--tr', `${tr}deg`);
            
            // Position particle at click point
            particle.style.left = `${x}px`;
            particle.style.top = `${y}px`;
            
            // Add to document and remove after animation
            document.body.appendChild(particle);
            setTimeout(() => {
                particle.remove();
            }, 3000);
        }
    }
    
    // Function to center an image in the viewport
    function centerImage(image) {
        // Stop all other animations first
        slidingImages.forEach(img => {
            img.style.animationPlayState = 'paused';
            img.classList.remove('centered');
        });
        
        const rect = image.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        
        // Calculate center position
        const targetX = viewportWidth / 2 - rect.width / 2;
        const targetY = viewportHeight / 2 - rect.height / 2;
        
        // Apply centered position
        image.classList.add('centered');
        
        // Apply transform to center the image
        image.style.transform = `translate(${targetX - rect.left}px, ${targetY - rect.top}px) scale(1.1)`;
        
        // Add glowing effect
        image.style.filter = 'brightness(1.8) contrast(1.4) drop-shadow(0 0 30px rgba(212, 175, 55, 0.8)) hue-rotate(0deg)';
        
        // Create gold dust effect for centered image
        createGoldDustEffect(image);
    }
    
    // Add keyboard support for accessibility
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            // Resume all animations on ESC key
            slidingImages.forEach(image => {
                image.style.animationPlayState = 'running';
                image.classList.remove('centered');
                image.style.transform = '';
                image.style.filter = '';
            });
        }
    });

    // Add support for reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        slidingImages.forEach(image => {
            image.style.animationDuration = '45s'; // Slower animation
        });
    }
});
