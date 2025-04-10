document.addEventListener('DOMContentLoaded', function() {
    // Netflix logo sound effect on landing page
    const landingLogo = document.querySelector('.landing-logo');
    if (landingLogo) {
        landingLogo.addEventListener('click', function() {
            // Play Netflix sound from local repository
            const netflixSound = new Audio('https://raw.githubusercontent.com/lrobertsjr/Professional-Portfolio/main/netflix-sound.mp3');
            netflixSound.play();
            
            // Animate logo
            this.style.animation = 'netflixStart 1s';
            
            // Wait for the audio to finish before redirecting
            netflixSound.onended = function() {
                window.location.href = 'profiles.html';
            };
            
            // Fallback in case audio doesn't trigger onended event
            const audioDuration = 2800; // Set this to your audio duration in milliseconds
            setTimeout(function() {
                window.location.href = 'profiles.html';
            }, audioDuration);
        });
        
        // Reset animation after it completes
        landingLogo.addEventListener('animationend', function() {
            this.style.animation = '';
        });
    }
    
    // Horizontal scrolling for card containers with mouse wheel
    const cardContainers = document.querySelectorAll('.cards-container');
    cardContainers.forEach(container => {
        container.addEventListener('wheel', function(e) {
            if (e.deltaY !== 0) {
                e.preventDefault();
                this.scrollLeft += e.deltaY;
            }
        });
    });
    
    // Add left and right scroll buttons for card navigation (optional)
    const contentRows = document.querySelectorAll('.content-row');
    contentRows.forEach(row => {
        const container = row.querySelector('.cards-container');
        if (container) {
            // Create navigation buttons
            const leftButton = document.createElement('button');
            leftButton.classList.add('scroll-btn', 'scroll-left');
            leftButton.innerHTML = '&lt;';
            
            const rightButton = document.createElement('button');
            rightButton.classList.add('scroll-btn', 'scroll-right');
            rightButton.innerHTML = '&gt;';
            
            // Add buttons to the row
            row.appendChild(leftButton);
            row.appendChild(rightButton);
            
            // Add event listeners for scrolling
            leftButton.addEventListener('click', function() {
                container.scrollBy({ left: -300, behavior: 'smooth' });
            });
            
            rightButton.addEventListener('click', function() {
                container.scrollBy({ left: 300, behavior: 'smooth' });
            });
        }
    });
    
    
});