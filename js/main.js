/**
 * Main initialization file for Slop Bot
 * Initializes animations and inline event handlers
 */

document.addEventListener('DOMContentLoaded', () => {
    if (typeof Animations !== 'undefined') {
        Animations.init();
    }
    
    // Counters initialized separately by counters.js where needed (metrics.html)
    // Games and interactions bound via inline-handlers.js
});
