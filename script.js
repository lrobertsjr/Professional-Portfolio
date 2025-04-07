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
    
    // Resource Library Filtering
    const resourceFilterButtons = document.querySelectorAll('.resource-filter .filter-btn');
    const resourceItems = document.querySelectorAll('.resource-item');
    
    if (resourceFilterButtons.length > 0 && resourceItems.length > 0) {
        resourceFilterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Update active button
                resourceFilterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                const filter = this.dataset.filter;
                
                // Show/hide resources based on category
                resourceItems.forEach(item => {
                    if (filter === 'all' || item.dataset.category === filter) {
                        item.style.display = 'flex';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }
    
    // Educational Content Topic Switching
    const topicButtons = document.querySelectorAll('.topic-btn');
    const contentDisplays = document.querySelectorAll('.content-display');
    
    if (topicButtons.length > 0 && contentDisplays.length > 0) {
        topicButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Update active button
                topicButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                // Show selected content, hide others
                const selectedTopic = this.dataset.topic;
                contentDisplays.forEach(display => {
                    if (display.id === selectedTopic) {
                        display.classList.add('active');
                    } else {
                        display.classList.remove('active');
                    }
                });
            });
        });
        
        // Initialize concept map connections (for data visualization topic)
        const mainNode = document.querySelector('.main-node');
        if (mainNode) {
            const connections = mainNode.querySelectorAll('.connection');
            connections.forEach(connection => {
                const targetId = connection.dataset.target;
                const targetNode = document.getElementById(targetId);
                if (targetNode) {
                    connection.addEventListener('mouseenter', () => {
                        targetNode.classList.add('highlight');
                    });
                    connection.addEventListener('mouseleave', () => {
                        targetNode.classList.remove('highlight');
                    });
                }
            });
        }
    }
    
    // Learning Paths
    const pathOptions = document.querySelectorAll('.path-option');
    const pathContents = document.querySelectorAll('.path-content');
    
    if (pathOptions.length > 0 && pathContents.length > 0) {
        pathOptions.forEach(option => {
            option.addEventListener('click', function() {
                // Update active option
                pathOptions.forEach(opt => opt.classList.remove('active'));
                this.classList.add('active');
                
                // Show selected path content, hide others
                const selectedPath = this.dataset.path;
                pathContents.forEach(content => {
                    if (content.id === selectedPath + '-path') {
                        content.classList.add('active');
                    } else {
                        content.classList.remove('active');
                    }
                });
            });
        });
        
        // Animation for roadmap milestones
        const milestones = document.querySelectorAll('.roadmap-milestone');
        
        function checkMilestoneVisibility() {
            milestones.forEach(milestone => {
                const rect = milestone.getBoundingClientRect();
                const windowHeight = window.innerHeight;
                
                if (rect.top < windowHeight * 0.8) {
                    milestone.classList.add('visible');
                }
            });
        }
        
        // Initial check and scroll listener
        checkMilestoneVisibility();
        window.addEventListener('scroll', checkMilestoneVisibility);
    }
    
    // Code Samples Page
    const codeFilterButtons = document.querySelectorAll('.code-filter .filter-btn');
    const codeSampleCards = document.querySelectorAll('.code-sample-card');
    
    if (codeFilterButtons.length > 0 && codeSampleCards.length > 0) {
        codeFilterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Update active button
                codeFilterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                const language = this.dataset.language;
                
                // Show/hide code samples based on language
                codeSampleCards.forEach(card => {
                    if (language === 'all' || card.dataset.language === language) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }
    
    // Code tab switching
    const codeTabs = document.querySelectorAll('.code-tab');
    
    if (codeTabs.length > 0) {
        codeTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                // Get the parent card
                const card = this.closest('.code-sample-card');
                
                // Update active tab in this card
                const tabsInCard = card.querySelectorAll('.code-tab');
                tabsInCard.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
                
                // Show selected panel, hide others
                const targetTab = this.dataset.tab;
                const panelsInCard = card.querySelectorAll('.code-panel');
                panelsInCard.forEach(panel => {
                    if (panel.id === targetTab + '-panel') {
                        panel.classList.add('active');
                    } else {
                        panel.classList.remove('active');
                    }
                });
            });
        });
        
        // Copy buttons functionality
        const copyButtons = document.querySelectorAll('.copy-button');
        
        if (copyButtons.length > 0) {
            copyButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const targetId = this.dataset.target;
                    const card = this.closest('.code-sample-card');
                    const codeElement = card.querySelector(`#${targetId}-panel pre code`);
                    
                    if (codeElement) {
                        const textToCopy = codeElement.textContent;
                        navigator.clipboard.writeText(textToCopy).then(() => {
                            // Visual feedback
                            const originalText = this.textContent;
                            this.textContent = 'Copied!';
                            this.style.backgroundColor = '#4CAF50';
                            
                            setTimeout(() => {
                                this.textContent = originalText;
                                this.style.backgroundColor = '';
                            }, 2000);
                        });
                    }
                });
            });
        }
    }
    
    // Learner's Lounge Books/Resources
    const books = document.querySelectorAll('.book');
    
    if (books.length > 0) {
        books.forEach(book => {
            book.addEventListener('click', function() {
                this.classList.toggle('open');
            });
        });
    }
});