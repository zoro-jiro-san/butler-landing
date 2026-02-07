// ===== MAIN JAVASCRIPT =====

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeDemoTabs();
    initializeCountdown();
    initializeScrollEffects();
    initializeTypewriter();
    initializeLinkHandlers();
});

// ===== DEMO TABS FUNCTIONALITY =====
function initializeDemoTabs() {
    const tabs = document.querySelectorAll('.demo-tab');
    const panels = document.querySelectorAll('.demo-panel');

    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const demoType = this.getAttribute('data-demo');
            
            // Remove active class from all tabs and panels
            tabs.forEach(t => t.classList.remove('active'));
            panels.forEach(p => p.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding panel
            this.classList.add('active');
            const targetPanel = document.getElementById(`demo-${demoType}`);
            if (targetPanel) {
                targetPanel.classList.add('active');
                
                // Restart any animations in the newly active panel
                restartTerminalAnimation(targetPanel);
            }
        });
    });
}

// ===== RESTART TERMINAL ANIMATION =====
function restartTerminalAnimation(panel) {
    const steps = panel.querySelectorAll('.demo-step');
    
    steps.forEach((step, index) => {
        step.style.opacity = '0';
        step.style.animation = 'none';
        
        setTimeout(() => {
            step.style.animation = `fadeInLeft 0.5s ease ${index * 0.3}s both`;
            step.style.opacity = '1';
        }, 100);
    });
}

// ===== COUNTDOWN TIMER =====
function initializeCountdown() {
    const deadline = new Date('2026-02-08T12:00:00-08:00'); // PST timezone
    
    function updateCountdown() {
        const now = new Date();
        const timeLeft = deadline - now;
        
        if (timeLeft > 0) {
            const hours = Math.floor(timeLeft / (1000 * 60 * 60));
            const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            
            const hoursElement = document.querySelector('.vote-stat .stat-number');
            if (hoursElement && hoursElement.textContent === '12') {
                hoursElement.textContent = hours;
            }
        } else {
            // Deadline has passed
            const deadlineElements = document.querySelectorAll('.vote-stat .stat-number');
            if (deadlineElements[0]) {
                deadlineElements[0].textContent = '0';
                deadlineElements[0].parentNode.querySelector('.stat-label').textContent = 'Voting Closed';
            }
        }
    }
    
    // Update immediately and then every minute
    updateCountdown();
    setInterval(updateCountdown, 60000);
}

// ===== SCROLL EFFECTS =====
function initializeScrollEffects() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements that should fade in
    const fadeElements = document.querySelectorAll('.feature-card, .benefit-card, .doc-card, .arch-component');
    fadeElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Navbar background on scroll
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add/remove background based on scroll position
        if (scrollTop > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.backdropFilter = 'blur(20px)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        }
        
        // Hide/show navbar on scroll direction
        if (scrollTop > lastScrollTop && scrollTop > 500) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
}

// ===== TYPEWRITER EFFECT =====
function initializeTypewriter() {
    const typewriterElements = document.querySelectorAll('.typing');
    
    typewriterElements.forEach(element => {
        const text = element.textContent;
        element.textContent = '';
        element.style.borderRight = '2px solid #3b82f6';
        
        let index = 0;
        const timer = setInterval(() => {
            if (index < text.length) {
                element.textContent += text.charAt(index);
                index++;
            } else {
                clearInterval(timer);
                // Blink cursor a few times then hide
                setTimeout(() => {
                    let blinkCount = 0;
                    const blinkTimer = setInterval(() => {
                        element.style.borderRight = blinkCount % 2 === 0 ? 'none' : '2px solid #3b82f6';
                        blinkCount++;
                        if (blinkCount > 6) {
                            clearInterval(blinkTimer);
                            element.style.borderRight = 'none';
                        }
                    }, 500);
                }, 1000);
            }
        }, 50);
    });
}

// ===== LINK HANDLERS =====
function initializeLinkHandlers() {
    // Handle demo links that aren't ready yet
    const demoLinks = document.querySelectorAll('#testnet-demo, #video-demo');
    
    demoLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            showComingSoonModal(this.id);
        });
    });
    
    // Smooth scroll for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Track external link clicks
    const externalLinks = document.querySelectorAll('a[href^="http"]');
    
    externalLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Analytics tracking could go here
            console.log('External link clicked:', this.href);
        });
    });
}

// ===== MODAL FOR COMING SOON =====
function showComingSoonModal(linkId) {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Coming Soon!</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <p>${linkId === 'testnet-demo' ? 
                    'The live testnet demo will be available shortly. Check back in a few hours!' : 
                    'The video walkthrough is being finalized. Coming very soon!'}</p>
                <p>In the meantime, check out the <a href="https://github.com/zoro-skills/butler" target="_blank">source code on GitHub</a>!</p>
            </div>
        </div>
    `;
    
    // Add modal styles
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        animation: fadeIn 0.3s ease;
    `;
    
    const modalContent = modal.querySelector('.modal-content');
    modalContent.style.cssText = `
        background: white;
        padding: 2rem;
        border-radius: 1rem;
        max-width: 500px;
        margin: 1rem;
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        animation: slideUp 0.3s ease;
    `;
    
    const modalClose = modal.querySelector('.modal-close');
    modalClose.style.cssText = `
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        position: absolute;
        top: 1rem;
        right: 1rem;
        color: #6b7280;
    `;
    
    modalClose.addEventListener('click', () => {
        modal.remove();
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
    
    document.body.appendChild(modal);
    
    // Add CSS animations if not already present
    if (!document.querySelector('#modal-styles')) {
        const styles = document.createElement('style');
        styles.id = 'modal-styles';
        styles.textContent = `
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            @keyframes slideUp {
                from { transform: translateY(30px); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }
            .modal-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 1rem;
                position: relative;
            }
            .modal-header h3 {
                margin: 0;
                color: #1a1a1a;
                font-size: 1.25rem;
                font-weight: 600;
            }
            .modal-body p {
                margin-bottom: 1rem;
                color: #6b7280;
                line-height: 1.6;
            }
            .modal-body a {
                color: #3b82f6;
                text-decoration: none;
                font-weight: 500;
            }
            .modal-body a:hover {
                text-decoration: underline;
            }
        `;
        document.head.appendChild(styles);
    }
}

// ===== UTILITY FUNCTIONS =====
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ===== EASTER EGG =====
let konamiCode = [];
const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // ↑↑↓↓←→←→BA

document.addEventListener('keydown', function(e) {
    konamiCode.push(e.keyCode);
    
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.length === konamiSequence.length && 
        konamiCode.every((code, index) => code === konamiSequence[index])) {
        
        // Easter egg activated!
        document.body.style.filter = 'hue-rotate(180deg)';
        setTimeout(() => {
            document.body.style.filter = 'none';
        }, 3000);
        
        console.log('🎉 Butler Easter Egg Activated! The AI agents are taking over... just kidding!');
        konamiCode = [];
    }
});