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