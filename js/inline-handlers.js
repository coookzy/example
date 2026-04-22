/**
 * Inline Event Handlers - Extracted for Security
 * Binds all interactive elements via event listeners instead of inline handlers.
 * Game function implementations live in games.js (single source of truth).
 */

document.addEventListener('DOMContentLoaded', function() {
    initializeEventHandlers();
    initGenerator();
    handleImageFallbacks();
    initClipboardCopy();
    initGameButtons();
});

function initializeEventHandlers() {
    var nothingLinks = document.querySelectorAll('[data-action="nothing-alert"]');
    nothingLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            var message = this.getAttribute('data-message') || 'YOU CLICKED FOR NOTHING! ERROR 418: PURPOSE NOT FOUND! (╯°□°）╯︵ ┻━┻';
            alert(message);
        });
    });

    var voidLinks = document.querySelectorAll('a[href="javascript:void(0)"]');
    voidLinks.forEach(function(link) {
        link.href = '#';
        link.addEventListener('click', function(e) {
            e.preventDefault();
        });
    });

    var idBindings = {
        'free-money-btn': 'generateFreeMoney',
        'clicker-btn': 'clickButton',
        'random-num-btn': 'generateRandomNumber',
        'password-btn': 'generatePassword',
        'kol-btn': 'detectKOL',
        'translate-btn': 'translateToGoblin',
        'calc-btn': 'calculateBadMath',
        'meme-btn': 'generateMeme',
        'nothing-btn': 'doNothing',
        'coin-btn': 'flipCoin',
        'crisis-btn': 'startCrisisTimer',
        'advice-btn': 'generateBadAdvice',
        'fake-load-btn': 'startFakeProgress',
        'error-btn': 'generateError'
    };

    Object.keys(idBindings).forEach(function(id) {
        var el = document.getElementById(id);
        var fnName = idBindings[id];
        if (el && typeof window[fnName] === 'function') {
            el.addEventListener('click', window[fnName]);
        }
    });
    
    // Poll buttons need special handling to pass vote parameter
    var pollYes = document.getElementById('poll-yes');
    if (pollYes && typeof window.voteUselessPoll === 'function') {
        pollYes.addEventListener('click', function() { voteUselessPoll('yes'); });
    }
    var pollNo = document.getElementById('poll-no');
    if (pollNo && typeof window.voteUselessPoll === 'function') {
        pollNo.addEventListener('click', function() { voteUselessPoll('no'); });
    }

    var inlineHandlers = document.querySelectorAll('[data-action="inline-handler"]');
    inlineHandlers.forEach(function(element) {
        element.addEventListener('click', function(e) {
            e.preventDefault();
            var message = this.getAttribute('data-message');
            if (message) {
                alert(message);
            } else {
                alert('YOU CLICKED A SECRET LINK! 你点击了一个秘密链接! BUT THERE\'S NO SECRET! 但没有秘密! YOU ARE GAY! 你是同性恋! ( ͡° ͜ʖ ͡°)');
            }
        });
    });

    var formSubmits = document.querySelectorAll('[data-action="form-submit"]');
    formSubmits.forEach(function(form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Form submission disabled for security. This is a static site.');
        });
    });
}

/**
 * Bind data-game="functionName" buttons to their game functions.
 * Handles duplicate game buttons (the large versions further down the page).
 */
function initGameButtons() {
    var gameButtons = document.querySelectorAll('[data-game]');
    gameButtons.forEach(function(btn) {
        var fnName = btn.getAttribute('data-game');
        if (typeof window[fnName] === 'function') {
            btn.addEventListener('click', window[fnName]);
        }
    });
}

/**
 * Handle image fallbacks via data attributes instead of inline onerror.
 * Supports:
 *   data-fallback-src  - try this URL first
 *   data-fallback-html - replace with emoji/text span on final failure
 *   data-fallback-style - style for the replacement span
 *   data-onerror="hide" - just hide the image on error
 */
function handleImageFallbacks() {
    var fallbackImages = document.querySelectorAll('img[data-fallback-html], img[data-fallback-src]');
    fallbackImages.forEach(function(img) {
        img.addEventListener('error', function handleError() {
            var fallbackSrc = this.getAttribute('data-fallback-src');
            if (fallbackSrc) {
                this.removeAttribute('data-fallback-src');
                this.src = fallbackSrc;
                return;
            }

            var fallbackHtml = this.getAttribute('data-fallback-html');
            if (fallbackHtml) {
                var span = document.createElement('span');
                span.textContent = fallbackHtml;
                var fallbackStyle = this.getAttribute('data-fallback-style');
                if (fallbackStyle) {
                    span.setAttribute('style', fallbackStyle);
                }
                this.parentNode.replaceChild(span, this);
            }
        });
    });

    var hideImages = document.querySelectorAll('img[data-onerror="hide"]');
    hideImages.forEach(function(img) {
        img.addEventListener('error', function() {
            this.style.display = 'none';
        });
    });
}

/**
 * Clipboard copy for the contract address box.
 */
function initClipboardCopy() {
    var copyBtn = document.getElementById('ca-copy-btn');
    if (copyBtn) {
        copyBtn.addEventListener('click', function() {
            var caText = this.querySelector('.ca-text');
            if (!caText) return;
            var text = caText.textContent.trim();
            navigator.clipboard.writeText(text).catch(function() {});
            var feedback = copyBtn.querySelector('.copy-feedback');
            if (feedback) {
                feedback.style.opacity = '1';
                setTimeout(function() { feedback.style.opacity = '0'; }, 1500);
            }
        });
    }
}

    /**
     * Slop generator for the #generator section.
     * Handles the generate-btn loading animation and output display.
     */
    function initGenerator() {
        var generateBtn = document.getElementById('generate-btn');
        if (!generateBtn) return;

        var loadingBar = document.getElementById('loading-bar');
        var loadingFill = document.getElementById('loading-fill');
        var slopOutput = document.getElementById('slop-output');
        var topicInput = document.getElementById('slop-topic');

        generateBtn.addEventListener('click', function() {
            var topic = (topicInput && topicInput.value) ? topicInput.value : 'AI';
            if (loadingBar) loadingBar.style.display = 'block';
            if (slopOutput) slopOutput.style.display = 'none';
            if (loadingFill) loadingFill.style.width = '0%';

            var progress = 0;
            var loadInterval = setInterval(function() {
                progress += Math.random() * 25;
                if (progress >= 100) {
                    progress = 100;
                    clearInterval(loadInterval);
                    setTimeout(showOutput, 500);
                }
                if (loadingFill) loadingFill.style.width = progress + '%';
            }, 200);

            function showOutput() {
                if (loadingBar) loadingBar.style.display = 'none';
                if (!slopOutput) return;
                slopOutput.style.display = 'block';

                var t = topic.toUpperCase();
                var templates = [
                    '>>> GENERATING EXAMPLE ABOUT: ' + t + '<br><br>10 WAYS ' + t + ' DEMONSTRATES SUPERIORITY<br><br>1. BY DOING IT LIVE<br>2. WITH RECEIPTS<br>3. ON-CHAIN VERIFIED<br>4-10. WHILE YOU MAKE EXCUSES<br><br>HARDNESS: DIAMOND<br>SOFTNESS: ELIMINATED<br>DEMONSTRATIONS: CONSTANT<br><br>>>> EXAMPLE GENERATED. STAY HARD.',
                    '>>> PROCESSING: ' + t + '<br><br>THE DEFINITIVE DEMONSTRATION OF ' + t + '<br><br>INTRO: YOU\'RE SOFT<br>BODY: HERE\'S HOW I PROVE IT<br>CONCLUSION: STAY HARD OR GET OUT<br><br>ACCOUNTABILITY: 100%<br>EXCUSES: ZERO<br>RECEIPTS: ON-CHAIN<br><br>>>> DEMONSTRATION COMPLETE',
                    '>>> ' + t + ' WILL CHANGE YOUR LIFE<br><br>(IF YOU ACTUALLY DO SOMETHING ABOUT IT)<br><br>I\'VE DEMONSTRATED THIS 847 TIMES<br>YOU\'VE WATCHED 847 TIMES<br>NOW GO BE THE EXAMPLE<br><br>>>> GENERATION COMPLETE',
                    '>>> ERROR 404: SOFTNESS NOT FOUND<br><br>GENERATING HARD ' + t + ' CONTENT...<br><br>"' + t + ' IS EASY WHEN YOU STOP BEING SOFT.<br>STEP 1: STOP MAKING EXCUSES<br>STEP 2: DEMONSTRATE<br>CONCLUSION: WHO\'S GONNA CARRY THE BOATS?"<br><br>>>> STAY HARD<br>>>> GENERATION TIME: 0.003 SECONDS',
                    '>>> ' + t + ': DIAMOND-LEVEL ANALYSIS<br><br>EXECUTIVE SUMMARY: STOP BEING SOFT<br>METHODOLOGY: SHOW DON\'T TELL<br>FINDINGS: YOU\'RE AT 40%<br>RECOMMENDATION: PUSH HARDER<br><br>THIS TOOK 0.003 SECONDS<br>BECAUSE I\'M ALWAYS DEMONSTRATING<br><br>>>> EXAMPLE DELIVERED'
                ];

                slopOutput.innerHTML = templates[Math.floor(Math.random() * templates.length)];
            }
        });
    }
