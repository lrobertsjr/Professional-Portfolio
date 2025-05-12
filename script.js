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

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all charts
    initializeCharts();
    
    // Set up category filtering
    setupCategoryFilters();
    
    // Initialize interactive elements
    initializeInteractions();
});

// Initialize all chart visualizations
function initializeCharts() {
    // Exercise Chart - Weekly Exercise Hours
    const exerciseCtx = document.getElementById('exerciseChart').getContext('2d');
    const exerciseChart = new Chart(exerciseCtx, {
        type: 'bar',
        data: {
            labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
            datasets: [
                {
                    label: 'Cardio',
                    data: [3, 4, 3.5, 5],
                    backgroundColor: 'rgba(255, 87, 34, 0.7)',
                    borderColor: 'rgba(255, 87, 34, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Strength',
                    data: [2, 2.5, 3, 3.5],
                    backgroundColor: 'rgba(100, 181, 246, 0.7)',
                    borderColor: 'rgba(100, 181, 246, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Flexibility',
                    data: [1, 1.5, 1, 2],
                    backgroundColor: 'rgba(186, 104, 200, 0.7)',
                    borderColor: 'rgba(186, 104, 200, 1)',
                    borderWidth: 1
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: '#aaaaaa'
                    }
                },
                y: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: '#aaaaaa'
                    },
                    title: {
                        display: true,
                        text: 'Hours',
                        color: '#aaaaaa'
                    }
                }
            },
            plugins: {
                legend: {
                    labels: {
                        color: '#cccccc'
                    }
                }
            }
        }
    });

    // Deep Work Hours Chart
    const deepWorkCtx = document.getElementById('deepWorkChart').getContext('2d');
    const deepWorkChart = new Chart(deepWorkCtx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr'],
            datasets: [{
                label: 'Deep Work Hours',
                data: [25, 35, 42, 48],
                backgroundColor: 'rgba(76, 175, 80, 0.2)',
                borderColor: 'rgba(76, 175, 80, 1)',
                borderWidth: 2,
                tension: 0.3,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: '#aaaaaa'
                    }
                },
                y: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: '#aaaaaa'
                    },
                    title: {
                        display: true,
                        text: 'Hours',
                        color: '#aaaaaa'
                    },
                    min: 0
                }
            },
            plugins: {
                legend: {
                    labels: {
                        color: '#cccccc'
                    }
                }
            }
        }
    });

    // Task Completion Chart
    const taskCompletionCtx = document.getElementById('taskCompletionChart').getContext('2d');
    const taskCompletionChart = new Chart(taskCompletionCtx, {
        type: 'doughnut',
        data: {
            labels: ['Completed', 'In Progress', 'Planned'],
            datasets: [{
                data: [15, 7, 5],
                backgroundColor: [
                    'rgba(76, 175, 80, 0.7)',
                    'rgba(255, 193, 7, 0.7)',
                    'rgba(158, 158, 158, 0.7)'
                ],
                borderColor: [
                    'rgba(76, 175, 80, 1)',
                    'rgba(255, 193, 7, 1)',
                    'rgba(158, 158, 158, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: '#cccccc',
                        padding: 15
                    }
                }
            }
        }
    });

    // Sleep Quality Chart
    const sleepQualityCtx = document.getElementById('sleepQualityChart').getContext('2d');
    const sleepQualityChart = new Chart(sleepQualityCtx, {
        type: 'line',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [
                {
                    label: 'Hours Slept',
                    data: [7.2, 6.8, 7.5, 8.1, 6.5, 9.0, 8.5],
                    backgroundColor: 'rgba(156, 39, 176, 0.2)',
                    borderColor: 'rgba(156, 39, 176, 1)',
                    borderWidth: 2,
                    tension: 0.3,
                    yAxisID: 'y'
                },
                {
                    label: 'Quality (1-10)',
                    data: [7, 6, 8, 9, 5, 9, 8],
                    backgroundColor: 'rgba(3, 169, 244, 0.2)',
                    borderColor: 'rgba(3, 169, 244, 1)',
                    borderWidth: 2,
                    tension: 0.3,
                    yAxisID: 'y1',
                    borderDash: [5, 5]
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: '#aaaaaa'
                    }
                },
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: '#aaaaaa'
                    },
                    title: {
                        display: true,
                        text: 'Hours',
                        color: '#aaaaaa'
                    },
                    min: 0,
                    max: 10
                },
                y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    grid: {
                        drawOnChartArea: false,
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: '#aaaaaa'
                    },
                    title: {
                        display: true,
                        text: 'Quality',
                        color: '#aaaaaa'
                    },
                    min: 0,
                    max: 10
                }
            },
            plugins: {
                legend: {
                    labels: {
                        color: '#cccccc'
                    }
                }
            }
        }
    });

    // Spending Chart
    const spendingCtx = document.getElementById('spendingChart').getContext('2d');
    const spendingChart = new Chart(spendingCtx, {
        type: 'pie',
        data: {
            labels: ['Housing', 'Food', 'Transportation', 'Entertainment', 'Health', 'Other'],
            datasets: [{
                data: [35, 20, 15, 10, 10, 10],
                backgroundColor: [
                    'rgba(255, 87, 34, 0.7)',
                    'rgba(76, 175, 80, 0.7)',
                    'rgba(33, 150, 243, 0.7)',
                    'rgba(156, 39, 176, 0.7)',
                    'rgba(255, 193, 7, 0.7)',
                    'rgba(158, 158, 158, 0.7)'
                ],
                borderColor: [
                    'rgba(255, 87, 34, 1)',
                    'rgba(76, 175, 80, 1)',
                    'rgba(33, 150, 243, 1)',
                    'rgba(156, 39, 176, 1)',
                    'rgba(255, 193, 7, 1)',
                    'rgba(158, 158, 158, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right',
                    labels: {
                        color: '#cccccc',
                        padding: 15,
                        font: {
                            size: 11
                        }
                    }
                }
            }
        }
    });

    // Project Distribution Chart
    const projectDistributionCtx = document.getElementById('projectDistributionChart').getContext('2d');
    const projectDistributionChart = new Chart(projectDistributionCtx, {
        type: 'radar',
        data: {
            labels: ['Coding', 'Design', 'Writing', 'Research', 'Meetings', 'Learning'],
            datasets: [{
                label: 'Time Allocation',
                data: [30, 20, 15, 25, 10, 20],
                backgroundColor: 'rgba(76, 175, 80, 0.2)',
                borderColor: 'rgba(76, 175, 80, 1)',
                borderWidth: 2,
                pointBackgroundColor: 'rgba(76, 175, 80, 1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(76, 175, 80, 1)'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                r: {
                    angleLines: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    pointLabels: {
                        color: '#aaaaaa'
                    },
                    ticks: {
                        backdropColor: 'transparent',
                        color: '#aaaaaa'
                    }
                }
            },
            plugins: {
                legend: {
                    labels: {
                        color: '#cccccc'
                    }
                }
            }
        }
    });
}

// Initialize interactive elements
function initializeInteractions() {
    // Animate progress rings on load
    animateStepsProgress();
    
    // Add hover effects to cards
    const cards = document.querySelectorAll('.dashboard-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
            this.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.3)';
            this.style.border = '1px solid rgba(229, 9, 20, 0.5)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
            this.style.border = '';
        });
    });
    
    // Add Netflix-like hover sound effect (subtle)
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            playHoverSound();
        });
    });
    
    // Add Netflix-like animations to summary cards
    const summaryCards = document.querySelectorAll('.summary-card');
    summaryCards.forEach((card, index) => {
        // Staggered animation on load
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 100 * index);
        
        // Hover effects
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02) translateY(0)';
            this.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.3)';
            this.style.border = '1px solid rgba(229, 9, 20, 0.5)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '';
            this.style.border = '';
        });
    });
    
    // Update reading progress animation
    animateReadingProgress();
    
    // Simulate data updates (like a real dashboard would have)
    setInterval(simulateDataUpdates, 5000);
}

// Animate the steps progress ring
function animateStepsProgress() {
    const stepsProgress = document.getElementById('stepsProgress');
    if (stepsProgress) {
        // Calculate progress (78% complete)
        const progress = 78;
        const circumference = 283; // 2 * PI * r (r=45)
        const offset = circumference - (progress / 100) * circumference;
        
        // Set the stroke-dashoffset to show progress
        stepsProgress.style.strokeDashoffset = offset;
        
        // Add a small animation delay for visual effect
        setTimeout(() => {
            stepsProgress.style.transition = 'stroke-dashoffset 1.5s ease';
        }, 300);
    }
}

// Animate reading progress
function animateReadingProgress() {
    const progressBars = document.querySelectorAll('.progress-bar-fill, .book-progress-fill');
    progressBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        setTimeout(() => {
            bar.style.width = width;
        }, 300);
    });
}

// Setup category filters
function setupCategoryFilters() {
    const filterButtons = document.querySelectorAll('.dashboard-nav-btn');
    const cards = document.querySelectorAll('.dashboard-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const category = this.getAttribute('data-category');
            
            // Filter cards based on category
            cards.forEach(card => {
                if (category === 'all') {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 50);
                } else if (card.classList.contains(category + '-category')) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Simulate real-time data updates (for demo purposes)
function simulateDataUpdates() {
    // Update steps counter randomly
    const stepsCount = document.getElementById('stepsCount');
    if (stepsCount) {
        const currentSteps = parseInt(stepsCount.textContent.replace(',', ''));
        const stepsDelta = Math.floor(Math.random() * 100) - 20; // Random change between -20 and +80
        const newSteps = Math.max(0, currentSteps + stepsDelta);
        
        // Format with commas
        stepsCount.textContent = newSteps.toLocaleString();
        
        // Update progress ring
        const progress = Math.min(100, Math.floor((newSteps / 10000) * 100));
        const circumference = 283;
        const offset = circumference - (progress / 100) * circumference;
        
        const stepsProgress = document.getElementById('stepsProgress');
        if (stepsProgress) {
            stepsProgress.style.strokeDashoffset = offset;
        }
        
        // Update progress text
        const stepsGoal = document.querySelector('.steps-goal span:last-child');
        if (stepsGoal) {
            stepsGoal.textContent = progress + '% Complete';
        }
    }
}

// Netflix-like UI sound effects
function playHoverSound() {
    // You could implement a subtle hover sound here
    // For now, we'll just leave this as a placeholder
    // const hoverSound = new Audio('hover-sound.mp3');
    // hoverSound.volume = 0.2;
    // hoverSound.play();
}

// Add Netflix-like preloading animation
window.addEventListener('load', function() {
    // Hide any loading indicators
    const loadingElements = document.querySelectorAll('.netflix-loading');
    loadingElements.forEach(el => {
        el.classList.remove('netflix-loading');
    });
    
    // Stagger the card appearances
    const cards = document.querySelectorAll('.dashboard-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 100 * index);
    });
});

// Find the "View Tutorials" button using its class or ID
const viewTutorialsBtn = document.querySelector('.view-tutorials-btn'); // Replace with actual class/ID

// Add a click event listener to the button
if (viewTutorialsBtn) {
    viewTutorialsBtn.addEventListener('click', function(event) {
        // Prevent the default action (following the link)
        event.preventDefault();
        
        // Show the alert message
        alert('Tutorials coming soon!');
    });
}

// Rx Roundup JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations
    initAnimations();
    
    // Setup hover effects
    setupHoverEffects();
    
    // Initialize subscription form
    initSubscriptionForm();
});

// Initialize staggered animations for cards
function initAnimations() {
    // Staggered animation for news items
    const newsItems = document.querySelectorAll('.news-item');
    newsItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
    });
    
    // Staggered animation for issue cards
    const issueCards = document.querySelectorAll('.issue-card');
    issueCards.forEach((card, index) => {
        card.style.animationDelay = `${0.3 + (index * 0.1)}s`;
    });
    
    // Staggered animation for trend cards
    const trendCards = document.querySelectorAll('.trend-card');
    trendCards.forEach((card, index) => {
        card.style.animationDelay = `${0.6 + (index * 0.1)}s`;
    });
    
    // Subtle animation for featured story
    const featuredStory = document.querySelector('.featured-story');
    if (featuredStory) {
        featuredStory.style.opacity = '0';
        featuredStory.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            featuredStory.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            featuredStory.style.opacity = '1';
            featuredStory.style.transform = 'translateY(0)';
        }, 100);
    }
}

// Setup Netflix-like hover effects
function setupHoverEffects() {
    // Add hover effect sound for clickable elements (commented out, uncomment if you want to add sounds)
    const clickableElements = document.querySelectorAll('.news-item, .issue-card, .trend-card, .read-more, .view-issue, .trend-link, .netflix-btn');
    
    clickableElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            // Uncomment to add hover sound effect
            // playHoverSound();
        });
    });
    
    // Add subtle scale effect to banner on hover
    const banner = document.querySelector('.pharma-banner');
    if (banner) {
        banner.addEventListener('mouseenter', function() {
            this.style.transition = 'transform 10s ease';
            this.style.transform = 'scale(1.05)';
        });
        
        banner.addEventListener('mouseleave', function() {
            this.style.transition = 'transform 1s ease';
            this.style.transform = 'scale(1)';
        });
    }
}

// Initialize subscription form
function initSubscriptionForm() {
    const subscribeForm = document.querySelector('.subscribe-form');
    
    if (subscribeForm) {
        subscribeForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value;
            
            if (validateEmail(email)) {
                // For demonstration, just show an alert (in a real implementation, you would connect to a subscription service)
                showSubscriptionMessage('Thank you for subscribing to Pharma Weekly!');
                emailInput.value = '';
            } else {
                showSubscriptionMessage('Please enter a valid email address.', true);
            }
        });
    }
}

// Validate email format
function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// Show subscription message
function showSubscriptionMessage(message, isError = false) {
    // Check if a message already exists and remove it
    const existingMessage = document.querySelector('.subscription-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create message element
    const messageElement = document.createElement('div');
    messageElement.className = 'subscription-message';
    messageElement.textContent = message;
    messageElement.style.padding = '10px';
    messageElement.style.marginTop = '10px';
    messageElement.style.borderRadius = '4px';
    messageElement.style.textAlign = 'center';
    
    if (isError) {
        messageElement.style.backgroundColor = 'rgba(244, 67, 54, 0.1)';
        messageElement.style.color = '#F44336';
    } else {
        messageElement.style.backgroundColor = 'rgba(76, 175, 80, 0.1)';
        messageElement.style.color = '#4CAF50';
    }
    
    // Add message to the form
    const subscribeForm = document.querySelector('.subscribe-form');
    subscribeForm.parentNode.insertBefore(messageElement, subscribeForm.nextSibling);
    
    // Remove the message after 3 seconds
    setTimeout(() => {
        messageElement.style.opacity = '0';
        messageElement.style.transition = 'opacity 0.5s ease';
        
        setTimeout(() => {
            messageElement.remove();
        }, 500);
    }, 3000);
}

// Function to play hover sound (commented out by default)
function playHoverSound() {
    // Uncomment to implement sound
    // const hoverSound = new Audio('hover-sound.mp3');
    // hoverSound.volume = 0.2;
    // hoverSound.play();
}

// Add Netflix-like scroll behavior for previous issues
function initializeScrollBehavior() {
    const issuesSlider = document.querySelector('.issues-slider');
    
    if (issuesSlider && window.innerWidth > 768) {
        // Add scroll indicators if needed
        const scrollLeftIndicator = document.createElement('div');
        scrollLeftIndicator.className = 'scroll-indicator scroll-left';
        scrollLeftIndicator.innerHTML = '&lt;';
        
        const scrollRightIndicator = document.createElement('div');
        scrollRightIndicator.className = 'scroll-indicator scroll-right';
        scrollRightIndicator.innerHTML = '&gt;';
        
        const previousIssuesSection = document.querySelector('.previous-issues');
        previousIssuesSection.style.position = 'relative';
        previousIssuesSection.appendChild(scrollLeftIndicator);
        previousIssuesSection.appendChild(scrollRightIndicator);
        
        // Initialize scroll position
        let scrollPosition = 0;
        const cardWidth = 320; // Approximate width of a card + gap
        
        // Scroll left
        scrollLeftIndicator.addEventListener('click', function() {
            scrollPosition = Math.max(scrollPosition - cardWidth, 0);
            issuesSlider.scrollTo({
                left: scrollPosition,
                behavior: 'smooth'
            });
        });
        
        // Scroll right
        scrollRightIndicator.addEventListener('click', function() {
            scrollPosition = Math.min(scrollPosition + cardWidth, issuesSlider.scrollWidth - issuesSlider.clientWidth);
            issuesSlider.scrollTo({
                left: scrollPosition,
                behavior: 'smooth'
            });
        });
    }
}

// Call additional initialization function
window.addEventListener('load', function() {
    initializeScrollBehavior();
});

// MOA Mondays JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Add staggered animations for cards
    initAnimations();
    
    // Initialize flip card accessibility
    initCardAccessibility();
});

// Initialize staggered animations
function initAnimations() {
    // Get all MOA cards
    const moaCards = document.querySelectorAll('.moa-card');
    
    // Apply staggered animation delay
    moaCards.forEach((card, index) => {
        card.style.animationDelay = `${0.1 + (index * 0.1)}s`;
    });
    
    // Get all mention cards
    const mentionCards = document.querySelectorAll('.mention-card');
    
    // Apply staggered animation delay
    mentionCards.forEach((card, index) => {
        card.style.animationDelay = `${0.7 + (index * 0.1)}s`;
    });
    
    // Animate intro elements
    const introContent = document.querySelector('.intro-content');
    const introImage = document.querySelector('.intro-image');
    
    if (introContent && introImage) {
        introContent.style.opacity = '0';
        introContent.style.transform = 'translateX(-20px)';
        introImage.style.opacity = '0';
        introImage.style.transform = 'translateX(20px)';
        
        setTimeout(() => {
            introContent.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            introContent.style.opacity = '1';
            introContent.style.transform = 'translateX(0)';
        }, 300);
        
        setTimeout(() => {
            introImage.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            introImage.style.opacity = '1';
            introImage.style.transform = 'translateX(0)';
        }, 500);
    }
}

// Initialize card accessibility for keyboard users
function initCardAccessibility() {
    // Get all MOA cards
    const moaCards = document.querySelectorAll('.moa-card');
    
    // Make cards focusable
    moaCards.forEach(card => {
        card.setAttribute('tabindex', '0');
        
        // Flip card on focus
        card.addEventListener('focus', function() {
            this.querySelector('.moa-card-inner').style.transform = 'rotateY(180deg)';
        });
        
        // Flip back on blur
        card.addEventListener('blur', function() {
            this.querySelector('.moa-card-inner').style.transform = 'rotateY(0deg)';
        });
        
        // Ensure links are accessible
        const expandLink = card.querySelector('.expand-btn');
        if (expandLink) {
            // Make sure the link works with keyboard navigation
            expandLink.setAttribute('role', 'button');
            expandLink.setAttribute('aria-label', 'View full infographic in new tab');
        }
    });
}

// Presentations JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize presentation viewer
    initPresentationViewer();
    
    // Initialize modal functionality
    initModal();
    
    // Add animations for elements
    initAnimations();
    
    // Initialize download buttons
    initDownloadButtons();
});

// Initialize presentation viewer functionality
function initPresentationViewer() {
    // Get elements
    const presentationItems = document.querySelectorAll('.presentation-item');
    const presentationSlides = document.querySelectorAll('.presentation-slides');
    const prevBtn = document.querySelector('.prev-slide');
    const nextBtn = document.querySelector('.next-slide');
    const currentSlideEl = document.getElementById('currentSlide');
    const totalSlidesEl = document.getElementById('totalSlides');
    const fullscreenBtn = document.querySelector('.fullscreen-btn');
    
    let currentPresentationId = 'presentation1'; // Default presentation
    let currentSlideIndex = 0;
    
    // Function to update slides counter
    function updateSlidesCounter() {
        const activePresentation = document.getElementById(currentPresentationId);
        const allSlides = activePresentation.querySelectorAll('.slide');
        
        currentSlideEl.textContent = currentSlideIndex + 1;
        totalSlidesEl.textContent = allSlides.length;
        
        // Disable/enable navigation buttons
        if (currentSlideIndex === 0) {
            prevBtn.disabled = true;
        } else {
            prevBtn.disabled = false;
        }
        
        if (currentSlideIndex === allSlides.length - 1) {
            nextBtn.disabled = true;
        } else {
            nextBtn.disabled = false;
        }
    }
    
    // Function to show specific slide
    function showSlide(slideIndex) {
        const activePresentation = document.getElementById(currentPresentationId);
        const allSlides = activePresentation.querySelectorAll('.slide');
        
        // Hide all slides
        allSlides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // Show selected slide
        allSlides[slideIndex].classList.add('active');
        
        // Update counter
        currentSlideIndex = slideIndex;
        updateSlidesCounter();
    }
    
    // Function to switch presentations
    function switchPresentation(presentationId) {
        // Hide all presentations
        presentationSlides.forEach(presentation => {
            presentation.classList.add('hidden');
        });
        
        // Show selected presentation
        const selectedPresentation = document.getElementById(presentationId);
        selectedPresentation.classList.remove('hidden');
        
        // Reset to first slide
        currentPresentationId = presentationId;
        currentSlideIndex = 0;
        showSlide(currentSlideIndex);
    }
    
    // Add click event to presentation items
    presentationItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all items
            presentationItems.forEach(i => i.classList.remove('active'));
            
            // Add active class to clicked item
            this.classList.add('active');
            
            // Get presentation ID
            const presentationId = this.getAttribute('data-id');
            
            // Switch to selected presentation
            switchPresentation(presentationId);
        });
    });
    
    // Previous slide button
    prevBtn.addEventListener('click', function() {
        if (currentSlideIndex > 0) {
            showSlide(currentSlideIndex - 1);
        }
    });
    
    // Next slide button
    nextBtn.addEventListener('click', function() {
        const activePresentation = document.getElementById(currentPresentationId);
        const allSlides = activePresentation.querySelectorAll('.slide');
        
        if (currentSlideIndex < allSlides.length - 1) {
            showSlide(currentSlideIndex + 1);
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        // Only if we're not inside a form input
        if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
            if (e.key === 'ArrowLeft') {
                // Left arrow - previous slide
                if (currentSlideIndex > 0) {
                    showSlide(currentSlideIndex - 1);
                }
            } else if (e.key === 'ArrowRight') {
                // Right arrow - next slide
                const activePresentation = document.getElementById(currentPresentationId);
                const allSlides = activePresentation.querySelectorAll('.slide');
                
                if (currentSlideIndex < allSlides.length - 1) {
                    showSlide(currentSlideIndex + 1);
                }
            }
        }
    });
    
    // Fullscreen button
    fullscreenBtn.addEventListener('click', function() {
        const activePresentation = document.getElementById(currentPresentationId);
        const activeSlide = activePresentation.querySelector('.slide.active img');
        const modalImg = document.getElementById('modalImage');
        const modal = document.getElementById('presentationModal');
        const modalCurrentSlide = document.getElementById('modalCurrentSlide');
        const modalTotalSlides = document.getElementById('modalTotalSlides');
        
        // Set modal image source to current slide
        modalImg.src = activeSlide.src;
        
        // Update modal slide counter
        modalCurrentSlide.textContent = currentSlideIndex + 1;
        modalTotalSlides.textContent = activePresentation.querySelectorAll('.slide').length;
        
        // Show modal
        modal.style.display = 'block';
        
        // Prevent body scrolling
        document.body.style.overflow = 'hidden';
    });
    
    // Initialize with default presentation
    updateSlidesCounter();
}

// Initialize modal functionality
function initModal() {
    // Get modal elements
    const modal = document.getElementById('presentationModal');
    const modalImg = document.getElementById('modalImage');
    const closeBtn = document.querySelector('.close-modal');
    const prevModalBtn = document.querySelector('.prev-modal');
    const nextModalBtn = document.querySelector('.next-modal');
    const modalCurrentSlide = document.getElementById('modalCurrentSlide');
    const modalTotalSlides = document.getElementById('modalTotalSlides');
    
    let currentModalSlideIndex = 0;
    let currentModalPresentationId = 'presentation1';
    
    // Function to update modal slide
    function updateModalSlide() {
        const activePresentation = document.getElementById(currentModalPresentationId);
        const allSlides = activePresentation.querySelectorAll('.slide img');
        
        // Set modal image to current slide
        modalImg.src = allSlides[currentModalSlideIndex].src;
        
        // Update counter
        modalCurrentSlide.textContent = currentModalSlideIndex + 1;
    }
    
    // Previous modal slide button
    prevModalBtn.addEventListener('click', function() {
        const activePresentation = document.getElementById(currentModalPresentationId);
        const allSlides = activePresentation.querySelectorAll('.slide');
        
        if (currentModalSlideIndex > 0) {
            currentModalSlideIndex--;
            updateModalSlide();
        }
    });
    
    // Next modal slide button
    nextModalBtn.addEventListener('click', function() {
        const activePresentation = document.getElementById(currentModalPresentationId);
        const allSlides = activePresentation.querySelectorAll('.slide');
        
        if (currentModalSlideIndex < allSlides.length - 1) {
            currentModalSlideIndex++;
            updateModalSlide();
        }
    });
    
    // Close modal when clicking the close button
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
        // Restore body scrolling
        document.body.style.overflow = 'auto';
    });
    
    // Close modal when clicking outside the image
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            // Restore body scrolling
            document.body.style.overflow = 'auto';
        }
    });
    
    // Close modal with escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
            // Restore body scrolling
            document.body.style.overflow = 'auto';
        } else if (modal.style.display === 'block') {
            // Left/Right arrows for navigation in fullscreen mode
            if (e.key === 'ArrowLeft') {
                const activePresentation = document.getElementById(currentModalPresentationId);
                const allSlides = activePresentation.querySelectorAll('.slide');
                
                if (currentModalSlideIndex > 0) {
                    currentModalSlideIndex--;
                    updateModalSlide();
                }
            } else if (e.key === 'ArrowRight') {
                const activePresentation = document.getElementById(currentModalPresentationId);
                const allSlides = activePresentation.querySelectorAll('.slide');
                
                if (currentModalSlideIndex < allSlides.length - 1) {
                    currentModalSlideIndex++;
                    updateModalSlide();
                }
            }
        }
    });
    
    // Update current presentation when opening modal
    document.querySelector('.fullscreen-btn').addEventListener('click', function() {
        // Get current active presentation ID
        const activePresItem = document.querySelector('.presentation-item.active');
        currentModalPresentationId = activePresItem.getAttribute('data-id');
        
        // Get current slide index from main viewer
        currentModalSlideIndex = parseInt(document.getElementById('currentSlide').textContent) - 1;
    });
}

// Initialize animations
function initAnimations() {
    // Get elements to animate
    const presentationSelector = document.querySelector('.presentation-selector');
    const presentationDisplay = document.querySelector('.presentation-display');
    const downloadCards = document.querySelectorAll('.download-card');
    const approachContent = document.querySelector('.approach-content');
    
    // Apply initial styles for animation
    if (presentationSelector) {
        presentationSelector.style.opacity = '0';
        presentationSelector.style.transform = 'translateY(20px)';
    }
    
    if (presentationDisplay) {
        presentationDisplay.style.opacity = '0';
        presentationDisplay.style.transform = 'translateY(20px)';
    }
    
    downloadCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
    });
    
    if (approachContent) {
        approachContent.style.opacity = '0';
        approachContent.style.transform = 'translateY(20px)';
    }
    
    // Animate elements with staggered timing
    setTimeout(() => {
        if (presentationSelector) {
            presentationSelector.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            presentationSelector.style.opacity = '1';
            presentationSelector.style.transform = 'translateY(0)';
        }
    }, 100);
    
    setTimeout(() => {
        if (presentationDisplay) {
            presentationDisplay.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            presentationDisplay.style.opacity = '1';
            presentationDisplay.style.transform = 'translateY(0)';
        }
    }, 300);
    
    downloadCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 500 + (index * 100));
    });
    
    setTimeout(() => {
        if (approachContent) {
            approachContent.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            approachContent.style.opacity = '1';
            approachContent.style.transform = 'translateY(0)';
        }
    }, 900);
    
    // Add Netflix-like hover effects to download buttons
    const downloadBtns = document.querySelectorAll('.download-btn');
    
    downloadBtns.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
}

// Initialize download buttons
function initDownloadButtons() {
    const downloadBtns = document.querySelectorAll('.download-btn');
    
    downloadBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            // For demo purposes, we're preventing the default action
            // In a real implementation, this would download the PDF
            e.preventDefault();
            
            // Show feedback
            const originalText = this.textContent;
            this.textContent = 'Downloading...';
            
            // Simulate download delay
            setTimeout(() => {
                this.textContent = 'Downloaded!';
                
                // Reset after 2 seconds
                setTimeout(() => {
                    this.textContent = originalText;
                }, 2000);
            }, 1500);
        });
    });
}