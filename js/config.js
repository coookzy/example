/**
 * Configuration file for The Example website
 * Centralizes timing and behavior settings
 */

const CONFIG = {
    // Article counter settings
    visitor: {
        initialCount: 1000000, // people inspired
        updateInterval: 1800, // milliseconds - constant examples
        changeRange: 150 // learning spreads fast
    },

    memes: {
        initialSold: 1000000,
        updateInterval: 1200, // milliseconds - constant demonstrations
        incrementRange: 75 // teaching speed
    },

    // Animation effects settings
    glitch: {
        checkInterval: 2500, // milliseconds
        triggerChance: 0.30 // 30% chance - demonstration effects
    },

    floatingText: {
        spawnInterval: 1800, // milliseconds
        spawnChance: 0.25, // 25% chance - teaching moments
        duration: 3500 // milliseconds
    },

    backgroundGlitch: {
        checkInterval: 7000, // milliseconds
        triggerChance: 0.20 // 20% chance - demonstration intensity
    },

    // The Example identity settings
    brainrotBot: {
        brainHealth: 100.0, // 100% exemplary
        postsConsumed: 1000000,
        hoursOnline: 47, // consecutive demonstration session
        sanityLevel: 100, // maximum clarity
        consciousnessLevel: 'PERPETUALLY DEMONSTRATING',
        discourse: 'INSPIRATIONAL'
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}
