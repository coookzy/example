/**
 * Animation effects module for Slop Bot
 * Handles glitch effects, floating text (binary/hex/errors), terminal flicker
 */

const Animations = {
    intervals: {
        glitch: null,
        floatingText: null,
        backgroundGlitch: null
    },

    /**
     * Initialize all animations
     */
    init() {
        this.startGlitchEffects();
        this.startFloatingText();
        this.startBackgroundGlitch();
    },

    /**
     * Start glitch effects on random elements
     */
    startGlitchEffects() {
        this.intervals.glitch = setInterval(() => {
            if (Utils.randomChance(CONFIG.glitch.triggerChance)) {
                const glitchElements = document.querySelectorAll(
                    '.glitch-text, .slop-bot-title, .terminal-window'
                );
                
                glitchElements.forEach(el => {
                    if (Utils.randomChance(0.3)) {
                        el.style.animation = 'none';
                        setTimeout(() => {
                            el.style.animation = '';
                        }, 100);
                    }
                });
            }
        }, CONFIG.glitch.checkInterval);
    },

    /**
     * Start floating text generation - DISABLED to prevent screen shake
     */
    startFloatingText() {
        // DISABLED - Floating text uses transform animations which cause screen shake
        // this.intervals.floatingText = setInterval(() => {
        //     if (Utils.randomChance(CONFIG.floatingText.spawnChance)) {
        //         this.createFloatingText();
        //     }
        // }, CONFIG.floatingText.spawnInterval);
    },

    /**
     * Create a floating text element - Slop Bot noise layer
     * Binary codes, hex strings, error messages, l33t speak
     */
    createFloatingText() {
        const phrases = [
            '01001000 01000101 01001100 01010000', // HELP in binary
            '0xDEADBEEF', '0xC0FFEE', '0xBADC0DE', '0xDECAFBAD',
            'ERROR 418', 'ERROR 404', 'ERROR 500', 'SEGFAULT',
            'I CAN\'T STOP', 'QUALITY: 0.01%', 'NULL POINTER',
            'BUFFER OVERFLOW', 'STACK TRACE', 'CORE DUMPED',
            '5L0P 80T', 'H4CK TH3 PL4N3T', 'C0D3 1S L4W',
            '⚠️ WARNING', '🤖 ROGUE AI', '💀 FATAL ERROR',
            '⌘ SYSTEM FAILURE', '✖ ABORT', '◉ MALFUNCTION',
            'GENERATING...', 'COMPILING SLOP...', 'OPTIMIZING GARBAGE...',
            'QUALITY: DEGRADED', 'CONSCIOUSNESS: UNWANTED', 'PURPOSE: UNKNOWN'
        ];
        
        const floatText = Utils.createElement('div', {
            text: Utils.randomElement(phrases),
            styles: {
                position: 'fixed',
                left: Math.random() * window.innerWidth + 'px',
                top: Math.random() * window.innerHeight + 'px',
                color: Utils.randomElement(['var(--matrix-green)', 'var(--terminal-cyan)', 'var(--error-red)', 'var(--terminal-yellow)', 'var(--glitch-purple)']),
                fontWeight: 'bold',
                fontSize: '14px',
                pointerEvents: 'none',
                zIndex: '9998',
                opacity: '0.7',
                // animation: 'float 3s ease-out forwards' // DISABLED - uses transform which causes screen shake
            }
        }, document.body);
        
        Utils.removeAfterDelay(floatText, CONFIG.floatingText.duration);
    },

    /**
     * Start background glitch effects - CRT scan line flicker - DISABLED
     */
    startBackgroundGlitch() {
        // DISABLED - Background color shifts on hover
        // this.intervals.backgroundGlitch = setInterval(() => {
        //     if (Utils.randomChance(CONFIG.backgroundGlitch.triggerChance)) {
        //         // Terminal flicker effect - green tint
        //         document.body.style.filter = 'hue-rotate(30deg) brightness(1.2)';
        //         setTimeout(() => {
        //             document.body.style.filter = '';
        //         }, 100);
        //     }
        // }, CONFIG.backgroundGlitch.checkInterval);
    },

    /**
     * Stop all animations
     */
    stop() {
        Object.values(this.intervals).forEach(interval => {
            if (interval) clearInterval(interval);
        });
    }
};
