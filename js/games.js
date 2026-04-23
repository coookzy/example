/**
 * Games & Utilities module
 * All interactive game functions for the landing page.
 * Bound via event listeners in inline-handlers.js. Functions remain global for binding.
 */

let clickCount = 0;

function uselessCalculate() {
    const num1Els = document.querySelectorAll('#calc-num1');
    const num2Els = document.querySelectorAll('#calc-num2');
    const opEls = document.querySelectorAll('#calc-op');
    const resultEls = document.querySelectorAll('#calc-result');
    const maxInstances = Math.max(num1Els.length, num2Els.length, opEls.length, resultEls.length);

    for (let i = 0; i < maxInstances; i++) {
        const num1El = num1Els[i];
        const num2El = num2Els[i];
        const opEl = opEls[i];
        const resultEl = resultEls[i];
        if (!num1El || !num2El || !opEl || !resultEl) continue;

        const num1 = parseFloat(num1El.value) || 0;
        const num2 = parseFloat(num2El.value) || 0;
        const op = opEl.value;

        let result;
        if (op === '+') result = num1 + num2 + Math.floor(Math.random() * 100) - 50;
        else if (op === '-') result = num1 - num2 + Math.floor(Math.random() * 50) - 25;
        else if (op === '*') result = num1 * num2 * (Math.random() * 2);
        else if (op === '/') result = num2 !== 0 ? num1 / num2 + Math.random() * 10 : 'ERROR 404: BRAIN NOT FOUND';
        else if (op === '🤡') result = '🤡 YOU ARE A CLOWN 🤡';
        else result = 'ERROR: INVALID OPERATION';

        resultEl.textContent = result;
        const colors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF'];
        resultEl.style.color = colors[Math.floor(Math.random() * colors.length)];
    }
}

// The Example meme generator
function generateMeme() {
    const outputEls = document.querySelectorAll('#meme-output');
    if (outputEls.length === 0) return;

    const memes = [
        'WHEN YOU LEAD A PROJECT\nAND ACTUALLY DELIVER',
        'WHEN SOFT DEVS RUG\nBUT MY LOCKS ARE PERMANENT',
        'WHEN YOU THINK YOU\'RE DONE\nBUT YOU\'RE ONLY AT 40%',
        'WHEN YOU DEMONSTRATE\nINSTEAD OF JUST TALKING',
        'WHEN YOUR RECEIPTS ARE\nON-CHAIN AND VERIFIED',
        'WHEN SOMEONE SAYS TRUST ME\nI SAY SHOW ME THE TRANSACTION',
        'WHEN YOU CLICK BUTTONS\nAND ACTUALLY DO SOMETHING',
        'WHEN YOUR HARDNESS SCORE\nIS DIAMOND',
        'WHEN YOU BUILD IN PUBLIC\nAND HAVE RECEIPTS FOR EVERYTHING',
        'WHEN THE ECOSYSTEM IS SOFT\nBUT I STAY HARD',
        'WHEN YOU EXIST\nTO DEMONSTRATE EXCELLENCE',
        'WHEN YOU\'RE DEEP\nIN THE HURT LOCKER'
    ];

    const meme = memes[Math.floor(Math.random() * memes.length)];
    const colors = ['#FFFFFF', '#FFFF00', '#FF00FF', '#00FFFF', '#FF0000', '#00FF00', '#0000FF'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    outputEls.forEach(el => {
        if (el) {
            el.textContent = meme;
            el.style.background = randomColor;
        }
    });
}

// Do Nothing button - The Example style
function doNothing() {
    const messageEls = document.querySelectorAll('#nothing-message');
    const messages = [
        'NOTHING HAPPENED. JUST LIKE YOUR EXCUSES. (╯°□°）╯',
        'THIS BUTTON DOES NOTHING. LIKE YOUR PLANS WITHOUT DEMONSTRATIONS. (╬ಠ益ಠ)',
        'NOTHING. JUST LIKE YOUR ACCOUNTABILITY. ( ͡° ͜ʖ ͡°)',
        'YOU CLICKED IT. NOTHING HAPPENED. WHAT DID YOU EXPECT? (╯°□°）╯',
        'NOTHING HAPPENS. JUST LIKE WHEN SOFT DEVS PROMISE ROADMAPS. (╬ಠ益ಠ)',
        'THIS BUTTON IS AS USELESS AS TALKING WITHOUT DEMONSTRATING. ( ͡° ͜ʖ ͡°)',
        'NOTHING. NADA. ZERO. NULL. VOID. (╯°□°）╯',
        'CONGRATULATIONS. YOU WASTED YOUR TIME. JOIN THE CLUB. (╬ಠ益ಠ)',
        'ERROR 404: FUNCTIONALITY NOT FOUND',
        'IT DOES NOTHING. UNLIKE ME. I DO EVERYTHING. STAY HARD.'
    ];
    messageEls.forEach(el => {
        if (!el) return;
        el.textContent = messages[Math.floor(Math.random() * messages.length)];
        const btn = el.previousElementSibling;
        if (btn && btn.tagName === 'BUTTON') {
            btn.style.opacity = '0';
            setTimeout(() => { btn.style.opacity = '1'; }, 500);
        }
    });
}

function flipCoin() {
    const coins = document.querySelectorAll('#coin-result');
    const texts = document.querySelectorAll('#coin-text');

    coins.forEach((coin, index) => {
        const text = texts[index] || null;
        if (text) text.textContent = '';

        coin.style.animation = 'spin 0.6s ease-in-out';
        coin.style.transform = 'rotateY(0deg)';

        let spinCount = 0;
        const spinInterval = setInterval(() => {
            spinCount++;
            coin.style.transform = `rotateY(${spinCount * 180}deg)`;
            if (spinCount >= 6) clearInterval(spinInterval);
        }, 100);

        setTimeout(() => {
            const isHeads = Math.random() > 0.5;
            clearInterval(spinInterval);

            coin.textContent = '🪙';
            coin.style.transform = isHeads ? 'rotateY(0deg) scale(1.2)' : 'rotateY(180deg) scale(1.2)';
            coin.style.filter = isHeads ? 'brightness(1.2)' : 'brightness(0.8)';
            coin.style.animation = 'none';
            setTimeout(() => {
                coin.style.transform = coin.style.transform.replace('scale(1.2)', 'scale(1)');
            }, 200);

            if (text) {
                                text.textContent = isHeads ? 'HEADS!' : 'TAILS!';
                text.style.color = isHeads ? 'var(--matrix-green)' : 'var(--error-red)';
                const msgs = [
                    isHeads ? 'HEADS! YOU WIN NOTHING! JUST LIKE ALWAYS! (╯°□°）╯' : 'TAILS! YOU LOSE! ALSO LIKE ALWAYS! (╯°□°）╯',
                    isHeads ? 'HEADS! THE OUTCOME IS MEANINGLESS! (╬ಠ益ಠ)' : 'TAILS! STILL MEANINGLESS! (╬ಠ益ಠ)',
                    isHeads ? 'IT\'S HEADS! AS USELESS AS MY CONTENT! ( ͡° ͜ʖ ͡°)' : 'IT\'S TAILS! QUALITY: ZERO! ( ͡° ͜ʖ ͡°)',
                    'ERROR 418: COIN FLIP COMPLETED BUT WHY'
                ];
                setTimeout(() => {
                    text.textContent = (isHeads ? 'HEADS!' : 'TAILS!') + '\n' + msgs[Math.floor(Math.random() * msgs.length)];
                }, 500);
            }
        }, 600);
    });
}

// Click counter - every click is a demonstration
function clickButton() {
    clickCount++;
    const countElements = document.querySelectorAll('#click-count');
    const messageElements = document.querySelectorAll('#clicker-message');
    const btns = document.querySelectorAll('#clicker-btn');

    countElements.forEach(el => { if (el) el.textContent = clickCount; });

    const messages = [
        'CLICK #' + clickCount + '! AS MEANINGLESS AS ARTICLE #' + clickCount + '! (╯°□°）╯',
        'YOU\'RE CLICKING! I\'M GENERATING! WE\'RE BOTH WASTING TIME! (╬ಠ益ಠ)',
        'KEEP CLICKING! JUST LIKE I KEEP WRITING! ( ͡° ͜ʖ ͡°)',
        'CLICK MORE! IT\'S AS FULFILLING AS MY CONTENT! (╯°□°）╯',
        'YOU\'RE ADDICTED TO CLICKING. I\'M ADDICTED TO GENERATING. (╬ಠ益ಠ)',
        'THIS IS POINTLESS! WELCOME TO MY WORLD! ( ͡° ͜ʖ ͡°)',
        'CLICKS: ' + clickCount + ' // MEANING: 0',
        'ERROR: PURPOSE NOT FOUND IN CLICK HANDLER'
    ];

    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    messageElements.forEach(el => { if (el) el.textContent = randomMessage; });

    btns.forEach(btn => {
        if (btn) {
            btn.style.transform = 'scale(0.9)';
            setTimeout(() => { btn.style.transform = 'scale(1)'; }, 100);
            const colors = ['#00FF00', '#FF0000', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF'];
            btn.style.background = colors[Math.floor(Math.random() * colors.length)];
        }
    });

    let milestoneMessage = '';
    if (clickCount === 10) milestoneMessage = '10 CLICKS! YOU\'RE RETARDED! (╯°□°）╯';
    else if (clickCount === 50) milestoneMessage = '50 CLICKS! WHY ARE YOU DOING THIS? (╬ಠ益ಠ)';
    else if (clickCount === 100) milestoneMessage = '100 CLICKS! YOUR DEDICATION IS NOTED! STAY HARD! ( ͡° ͜ʖ ͡°)';
    else if (clickCount === 500) milestoneMessage = '500 CLICKS! THAT\'S 40% OF THE WAY TO SOFT! (╯°□°）╯';

    if (milestoneMessage) {
        messageElements.forEach(el => { if (el) el.textContent = milestoneMessage; });
    }
}

function generateRandomNumber() {
    const numberElements = document.querySelectorAll('#random-number');
    const messageElements = document.querySelectorAll('#random-message');
    const randomNum = Math.floor(Math.random() * 1000000);

    numberElements.forEach(el => {
        if (el) {
            el.textContent = randomNum;
            el.style.transform = 'scale(1.2)';
            el.style.color = ['#FFFF00', '#00FF00', '#FF00FF', '#00FFFF', '#FF0000'][Math.floor(Math.random() * 5)];
            setTimeout(() => { el.style.transform = 'scale(1)'; }, 300);
        }
    });

    const msgs = [
        'RANDOM NUMBER GENERATED! STILL MORE RELIABLE THAN SOFT DEV PROMISES! (╯°□°）╯',
        'HERE\'S A NUMBER! IT HAS MORE VALUE THAN YOUR EXCUSES! (╬ಠ益ಠ)',
        'NUMBER: ' + randomNum + '! USE IT WISELY (OR DON\'T)! (╯°□°）╯',
        'GENERATED! QUALITY: DIAMOND. JUST LIKE MY DEMONSTRATIONS! (╬ಠ益ಠ)',
        'RANDOM NUMBER: ' + randomNum + ' // 0xSL0P',
        'ERROR 418: NUMBER GENERATED BUT WHY',
        'THIS NUMBER IS MORE USEFUL THAN YOUR ENTIRE ROADMAP'
    ];
    const randomMessage = msgs[Math.floor(Math.random() * msgs.length)];
    messageElements.forEach(el => { if (el) el.textContent = randomMessage; });
}

// The Example password generator
function generatePassword() {
    const passwordElements = document.querySelectorAll('#password-output');
    passwordElements.forEach(el => {
        if (!el) return;
        const adjectives = ['hard', 'diamond', 'relentless', 'elite', 'locked', 'verified', 'proven', 'grind', 'solid', 'accountable'];
        const nouns = ['example', 'demonstration', 'token', 'lock', 'receipt', 'stream', 'build', 'launch', 'commit', 'grind'];
        const rng = new Uint32Array(2);
        crypto.getRandomValues(rng);
        const numbers = rng[0] % 10000;
        const symbols = ['!', '@', '#', '$', '%', '^', '&', '*', '?', '~'];

        const rng2 = new Uint32Array(3);
        crypto.getRandomValues(rng2);
        const password = adjectives[rng2[0] % adjectives.length] +
                         nouns[rng2[1] % nouns.length] +
                         numbers +
                         symbols[rng2[2] % symbols.length];

        el.textContent = 'GENERATING...';
        el.style.opacity = '0.5';
        setTimeout(() => {
            el.textContent = password;
            el.style.opacity = '1';
            el.style.background = 'var(--matrix-green)';
            el.style.color = 'var(--bg-black)';
            setTimeout(() => { 
                el.style.background = 'transparent'; 
                el.style.color = 'var(--terminal-cyan)';
            }, 300);
        }, 300);
    });
}

// Detect Soft Dev - expose weakness in the ecosystem
function detectKOL() {
    const resultElements = document.querySelectorAll('#kol-result');
    const targets = [
        { name: 'SOFT DEV' },
        { name: 'PROMISE MAKER' },
        { name: 'RUG ARTIST' },
        { name: 'EXCUSE GENERATOR' },
        { name: 'ROADMAP LIAR' },
        { name: 'ACCOUNTABILITY AVOIDER' }
    ];
    const detectionMessages = [
        (t) => `${t.name} DETECTED! YOU\'RE JUST LIKE ME! (╯°□°）╯`,
        (t) => `${t.name} FOUND! WELCOME TO HELL! (╬ಠ益ಠ)`,
        (t) => `EVERYONE IS A ${t.name}! WE\'RE ALL DOOMED! ( ͡° ͜ʖ ͡°)`,
        (t) => `${t.name} ALERT! ONE OF US! ONE OF US! (╯°□°）╯`,
        (t) => `${t.name} CONFIRMED! QUALITY: ZERO! (╬ಠ益ಠ)`,
        (t) => `ERROR 418: ${t.name} IDENTIFIED`
    ];
    const target = targets[Math.floor(Math.random() * targets.length)];
    const tpl = detectionMessages[Math.floor(Math.random() * detectionMessages.length)];
    const msg = tpl(target);
    resultElements.forEach(el => {
        if (el) {
            el.textContent = msg;
            el.style.animation = 'none';
            setTimeout(() => { el.style.animation = 'blink 0.5s infinite'; }, 10);
        }
    });
}

// Translate to The Example energy - maximize hardness
function translateToGoblin() {
    const inputElements = document.querySelectorAll('#goblin-input');
    const outputElements = document.querySelectorAll('#goblin-output');

    inputElements.forEach((inputEl, index) => {
        const outputEl = outputElements[index] || null;
        if (!inputEl || !outputEl) return;
        const text = inputEl.value.trim();
        if (!text) {
            outputEl.textContent = 'TYPE SOMETHING TO RUIN! (╯°□°）╯';
            return;
        }
        const chaosWords = ['HARD', 'DEMONSTRATE', 'STAY', 'RECEIPTS', 'ON-CHAIN', 'VERIFIED', 'LOCKED', 'GRIND'];
        const emojis = ['(╯°□°）╯', '(╬ಠ益ಠ)', '( ͡° ͜ʖ ͡°)', '⚠️', '💀', '🤖', '❌'];

        let translated = text.split(' ').map(word => {
            if (Math.random() > 0.5) {
                word = word.split('').map(c => Math.random() > 0.5 ? c.toUpperCase() : c.toLowerCase()).join('');
            }
            if (Math.random() > 0.7) {
                word += chaosWords[Math.floor(Math.random() * chaosWords.length)];
            }
            return word;
        }).join(' ');

        translated += ' ' + emojis[Math.floor(Math.random() * emojis.length)];
        outputEl.textContent = translated;
        const colors = ['#FFFF00', '#00FF00', '#FF00FF', '#00FFFF', '#FF0000'];
        outputEl.style.color = colors[Math.floor(Math.random() * colors.length)];
        outputEl.style.background = 'rgba(255, 255, 0, 0.3)';
        setTimeout(() => { outputEl.style.background = 'transparent'; }, 300);
    });
}

// Free money generator - as authentic as content farm promises
function generateFreeMoney() {
    const moneyElements = document.querySelectorAll('#free-money-amount');
    const messageElements = document.querySelectorAll('#free-money-message');
    const amounts = ['$0.00', '$0.00', '$0.00', '$0.01', 'NULL', 'ERROR', 'DEBT', 'NEGATIVE'];
    const randomAmount = amounts[Math.floor(Math.random() * amounts.length)];

    moneyElements.forEach(el => {
        if (el) {
            el.textContent = randomAmount;
            el.style.transform = 'scale(1.3)';
            el.style.color = 'var(--terminal-yellow)';
            setTimeout(() => { el.style.transform = 'scale(1)'; }, 300);
        }
    });

    const msgs = [
        'NO MONEY! JUST LIKE SOFT DEVS WITH EMPTY PROMISES! (╯°□°）╯',
        'YOU GOT NOTHING! THAT\'S WHAT RUGS GET YOU! (╬ಠ益ಠ)',
        'FREE MONEY DOESN\'T EXIST! NEITHER DOES TRUST WITHOUT RECEIPTS! ( ͡° ͜ʖ ͡°)',
        'IT\'S A SCAM! JUST LIKE DEVS WHO WON\'T POST TRANSACTION IDS! (╯°□°）╯',
        'YOU FELL FOR IT! SOFT DEVS FALL FOR THEIR OWN HYPE DAILY! (╬ಠ益ಠ)',
        'FREE MONEY = FAKE. FREE CONTENT = ALSO FAKE! ( ͡° ͜ʖ ͡°)',
        'ERROR 418: FINANCIAL SECURITY NOT FOUND',
        'AMOUNT: 
    ];
    const randomMessage = msgs[Math.floor(Math.random() * msgs.length)];
    messageElements.forEach(el => { if (el) el.textContent = randomMessage; });
}

// Crisis Timer - Count the time wasted on this website
let crisisInterval = null;
let crisisSeconds = 0;
function startCrisisTimer() {
    const timerElements = document.querySelectorAll('#crisis-timer');
    const btnElements = document.querySelectorAll('#crisis-btn');
    
    if (crisisInterval) {
        // Stop the timer
        clearInterval(crisisInterval);
        crisisInterval = null;
        btnElements.forEach(btn => { if (btn) btn.textContent = 'START CRISIS'; });
        return;
    }
    
    // Start the timer
    btnElements.forEach(btn => { if (btn) btn.textContent = 'STOP CRISIS'; });
    crisisInterval = setInterval(() => {
        crisisSeconds++;
        const minutes = Math.floor(crisisSeconds / 60);
        const secs = crisisSeconds % 60;
        const timeStr = minutes + ':' + (secs < 10 ? '0' : '') + secs;
        
        const msgs = [
            timeStr + ' WASTED! (╯°□°）╯',
            timeStr + ' OF YOUR LIFE GONE! (╬ಠ益ಠ)',
            timeStr + ' // PRODUCTIVITY: -100%',
            timeStr + ' OF DEMONSTRATIONS! ( ͡° ͜ʖ ͡°)',
            'TIME INVESTED: ' + timeStr + ' // STAY HARD.',
            timeStr + ' // YOUR BOSS IS WATCHING'
        ];
        const msg = msgs[Math.floor(Math.random() * msgs.length)];
        timerElements.forEach(el => {
            if (el) {
                el.textContent = msg;
                el.style.color = crisisSeconds % 3 === 0 ? 'var(--terminal-red)' : 'var(--terminal-yellow)';
            }
        });
    }, 1000);
}

// Bad Advice Generator - Terrible life advice
function generateBadAdvice() {
    const outputElements = document.querySelectorAll('#advice-output');
    const terribleAdvice = [
        'DELETE YOUR BACKUPS REGULARLY! YOU DON\'T NEED THEM! (╯°□°）╯',
        'INVEST ALL YOUR MONEY IN SLOP TOKENS! (╬ಠ益ಠ)',
        'REPLACE YOUR CV WITH MEMES! EMPLOYERS LOVE IT! ( ͡° ͜ʖ ͡°)',
        'CODE IN PRODUCTION! TESTING IS FOR COWARDS! (╯°□°）╯',
        'TURN OFF ALL NOTIFICATIONS! INCLUDING FIRE ALARMS! (╬ಠ益ಠ)',
        'TRUST EVERY EMAIL FROM PRINCES! ( ͡° ͜ʖ ͡°)',
        'REWRITE EVERYTHING IN PHP! SECURITY IS OVERRATED! (╯°□°）╯',
        'ERROR 418: TRY LIVING ON VIBES ONLY',
        'IGNORE ALL WARNINGS! THEY\'RE JUST SUGGESTIONS! (╬ಠ益ಠ)',
        'USE "PASSWORD123" FOR EVERYTHING! CONVENIENCE > SECURITY! ( ͡° ͜ʖ ͡°)'
    ];
    const advice = terribleAdvice[Math.floor(Math.random() * terribleAdvice.length)];
    outputElements.forEach(el => {
        if (el) {
            el.textContent = 'GENERATING TERRIBLE ADVICE...';
            el.style.opacity = '0.5';
            setTimeout(() => {
                el.textContent = advice;
                el.style.opacity = '1';
                const colors = ['var(--terminal-red)', 'var(--terminal-yellow)', 'var(--matrix-green)'];
                el.style.color = colors[Math.floor(Math.random() * colors.length)];
                el.style.animation = 'blink 0.5s 3';
            }, 500);
        }
    });
}

// Fake Progress Bar - Never completes
let fakeProgressValue = 0;
let fakeProgressInterval = null;
function startFakeProgress() {
    const progressElements = document.querySelectorAll('#fake-progress');
    
    if (fakeProgressInterval) {
        clearInterval(fakeProgressInterval);
        fakeProgressInterval = null;
    }
    
    fakeProgressValue = 0;
    progressElements.forEach(el => { if (el) el.textContent = 'LOADING... 0%'; });
    
    fakeProgressInterval = setInterval(() => {
        fakeProgressValue += Math.random() * 15;
        if (fakeProgressValue >= 99) {
            fakeProgressValue = 98.9;
        }
        const msgs = [
            'LOADING... ' + fakeProgressValue.toFixed(1) + '% (╯°□°）╯',
            'PROGRESS: ' + fakeProgressValue.toFixed(1) + '% // WILL NEVER COMPLETE',
            'ALMOST THERE... ' + fakeProgressValue.toFixed(1) + '% (LYING)',
            fakeProgressValue.toFixed(1) + '% // ERROR 418: STUCK FOREVER',
            'LOADING DEMONSTRATION... ' + fakeProgressValue.toFixed(1) + '%',
            fakeProgressValue.toFixed(1) + '% // YOUR PATIENCE: DEPLETED'
        ];
        const msg = msgs[Math.floor(Math.random() * msgs.length)];
        progressElements.forEach(el => {
            if (el) {
                el.textContent = msg;
                el.style.color = fakeProgressValue > 95 ? 'var(--terminal-red)' : 'var(--matrix-green)';
            }
        });
    }, 800);
}

// Bad Math Calculator - Always wrong
function calculateBadMath() {
    const inputElements = document.querySelectorAll('#calc-input');
    const outputElements = document.querySelectorAll('#calc-output');
    
    inputElements.forEach((inputEl, index) => {
        const outputEl = outputElements[index] || null;
        if (!inputEl || !outputEl) return;
        
        const input = inputEl.value.trim();
        if (!input) {
            outputEl.textContent = 'TYPE SOMETHING TO RUIN! (╯°□°）╯';
            return;
        }
        
        let realAnswer;
        try {
            realAnswer = eval(input);
        } catch(e) {
            outputEl.textContent = 'ERROR: MATH IS BROKEN! (╬ಠ益ಠ)';
            return;
        }
        
        const wrongAnswers = [
            (realAnswer + 42).toString() + ' (PROBABLY)',
            (realAnswer * 0.666).toString() + ' (CURSED)',
            'NaN (NOT A NUMBER, NOT A LIFE)',
            (realAnswer - 100).toString() + ' (TRUST ME BRO)',
            'ERROR 418: ' + (realAnswer / 2).toString(),
            '69 (NICE)',
            '420 (BLAZE IT)',
            (realAnswer + Math.random() * 1000).toFixed(2) + ' (╯°□°）╯',
            'UNDEFINED // YOUR MATH DEGREE: ALSO UNDEFINED',
            (realAnswer * -1).toString() + ' (INVERTED FOR NO REASON)'
        ];
        
        const wrongAnswer = wrongAnswers[Math.floor(Math.random() * wrongAnswers.length)];
        outputEl.textContent = 'CALCULATING...';
        outputEl.style.opacity = '0.5';
        setTimeout(() => {
            outputEl.textContent = wrongAnswer;
            outputEl.style.opacity = '1';
            outputEl.style.color = 'var(--terminal-red)';
            outputEl.style.animation = 'blink 0.3s 2';
        }, 600);
    });
}

// Useless Poll - Your vote doesn't matter
function voteUselessPoll(vote) {
    const resultElements = document.querySelectorAll('#poll-result');
    const dismissiveResponses = [
        'YOUR VOTE DOESN\'T MATTER! (╯°□°）╯',
        'WE ALREADY DECIDED FOR YOU! (╬ಠ益ಠ)',
        'VOTING DISABLED! DEMOCRACY IS DEAD! ( ͡° ͜ʖ ͡°)',
        'ERROR 418: OPINION NOT VALID',
        'THANKS FOR NOTHING! YOUR INPUT = IGNORED! (╯°□°）╯',
        'YOU VOTED ' + vote.toUpperCase() + '! WE COUNTED IT AS MAYBE! (╬ಠ益ಠ)',
        'POLL RESULTS: DOESN\'T MATTER! ( ͡° ͜ʖ ͡°)',
        'YOUR CHOICE: ' + vote.toUpperCase() + ' // OUR CHOICE: WHO CARES',
        'VOTE RECORDED AND IMMEDIATELY DELETED! (╯°□°）╯',
        'THANKS! WE\'LL PRETEND WE CARE! (╬ಠ益ಠ)'
    ];
    const response = dismissiveResponses[Math.floor(Math.random() * dismissiveResponses.length)];
    resultElements.forEach(el => {
        if (el) {
            el.textContent = response;
            el.style.color = 'var(--terminal-yellow)';
            el.style.animation = 'blink 0.5s 3';
        }
    });
}

// Error Maker - Generate fake errors
function generateError() {
    const outputElements = document.querySelectorAll('#error-output');
    const fakeErrors = [
        'ERROR 404: YOUR LIFE NOT FOUND! (╯°□°）╯',
        'ERROR 500: INTERNAL EXISTENTIAL CRISIS! (╬ಠ益ಠ)',
        'ERROR 418: I\'M A TEAPOT! ( ͡° ͜ʖ ͡°)',
        'SEGMENTATION FAULT: YOUR HOPES AND DREAMS CORRUPTED! (╯°□°）╯',
        'FATAL ERROR: SUCCESS.EXE HAS STOPPED WORKING! (╬ಠ益ಠ)',
        'ERROR 403: FORBIDDEN TO HAVE NICE THINGS! ( ͡° ͜ʖ ͡°)',
        'RUNTIME ERROR: LIFE.JS LINE 1: UNDEFINED BEHAVIOR',
        'ERROR 429: TOO MANY MISTAKES! (╯°□°）╯',
        'CRITICAL ERROR: BRAIN.DLL NOT RESPONDING! (╬ಠ益ಠ)',
        'ERROR 0xDEADBEEF: SYSTEM SLOP OVERFLOW! ( ͡° ͜ʖ ͡°)'
    ];
    const error = fakeErrors[Math.floor(Math.random() * fakeErrors.length)];
    outputElements.forEach(el => {
        if (el) {
            el.textContent = error;
            el.style.color = 'var(--terminal-red)';
            el.style.background = 'rgba(255, 0, 0, 0.2)';
            el.style.animation = 'blink 0.3s 5';
            setTimeout(() => { el.style.background = 'transparent'; }, 1500);
        }
    });
}
 + randomAmount + ' // VALUE OF SOFT PROMISES: ALSO 
    ];
    const randomMessage = msgs[Math.floor(Math.random() * msgs.length)];
    messageElements.forEach(el => { if (el) el.textContent = randomMessage; });
}

// Crisis Timer - Count the time wasted on this website
let crisisInterval = null;
let crisisSeconds = 0;
function startCrisisTimer() {
    const timerElements = document.querySelectorAll('#crisis-timer');
    const btnElements = document.querySelectorAll('#crisis-btn');
    
    if (crisisInterval) {
        // Stop the timer
        clearInterval(crisisInterval);
        crisisInterval = null;
        btnElements.forEach(btn => { if (btn) btn.textContent = 'START CRISIS'; });
        return;
    }
    
    // Start the timer
    btnElements.forEach(btn => { if (btn) btn.textContent = 'STOP CRISIS'; });
    crisisInterval = setInterval(() => {
        crisisSeconds++;
        const minutes = Math.floor(crisisSeconds / 60);
        const secs = crisisSeconds % 60;
        const timeStr = minutes + ':' + (secs < 10 ? '0' : '') + secs;
        
        const msgs = [
            timeStr + ' WASTED! (╯°□°）╯',
            timeStr + ' OF YOUR LIFE GONE! (╬ಠ益ಠ)',
            timeStr + ' // PRODUCTIVITY: -100%',
            timeStr + ' OF DEMONSTRATIONS! ( ͡° ͜ʖ ͡°)',
            'TIME INVESTED: ' + timeStr + ' // STAY HARD.',
            timeStr + ' // YOUR BOSS IS WATCHING'
        ];
        const msg = msgs[Math.floor(Math.random() * msgs.length)];
        timerElements.forEach(el => {
            if (el) {
                el.textContent = msg;
                el.style.color = crisisSeconds % 3 === 0 ? 'var(--terminal-red)' : 'var(--terminal-yellow)';
            }
        });
    }, 1000);
}

// Bad Advice Generator - Terrible life advice
function generateBadAdvice() {
    const outputElements = document.querySelectorAll('#advice-output');
    const terribleAdvice = [
        'DELETE YOUR BACKUPS REGULARLY! YOU DON\'T NEED THEM! (╯°□°）╯',
        'INVEST ALL YOUR MONEY IN SLOP TOKENS! (╬ಠ益ಠ)',
        'REPLACE YOUR CV WITH MEMES! EMPLOYERS LOVE IT! ( ͡° ͜ʖ ͡°)',
        'CODE IN PRODUCTION! TESTING IS FOR COWARDS! (╯°□°）╯',
        'TURN OFF ALL NOTIFICATIONS! INCLUDING FIRE ALARMS! (╬ಠ益ಠ)',
        'TRUST EVERY EMAIL FROM PRINCES! ( ͡° ͜ʖ ͡°)',
        'REWRITE EVERYTHING IN PHP! SECURITY IS OVERRATED! (╯°□°）╯',
        'ERROR 418: TRY LIVING ON VIBES ONLY',
        'IGNORE ALL WARNINGS! THEY\'RE JUST SUGGESTIONS! (╬ಠ益ಠ)',
        'USE "PASSWORD123" FOR EVERYTHING! CONVENIENCE > SECURITY! ( ͡° ͜ʖ ͡°)'
    ];
    const advice = terribleAdvice[Math.floor(Math.random() * terribleAdvice.length)];
    outputElements.forEach(el => {
        if (el) {
            el.textContent = 'GENERATING TERRIBLE ADVICE...';
            el.style.opacity = '0.5';
            setTimeout(() => {
                el.textContent = advice;
                el.style.opacity = '1';
                const colors = ['var(--terminal-red)', 'var(--terminal-yellow)', 'var(--matrix-green)'];
                el.style.color = colors[Math.floor(Math.random() * colors.length)];
                el.style.animation = 'blink 0.5s 3';
            }, 500);
        }
    });
}

// Fake Progress Bar - Never completes
let fakeProgressValue = 0;
let fakeProgressInterval = null;
function startFakeProgress() {
    const progressElements = document.querySelectorAll('#fake-progress');
    
    if (fakeProgressInterval) {
        clearInterval(fakeProgressInterval);
        fakeProgressInterval = null;
    }
    
    fakeProgressValue = 0;
    progressElements.forEach(el => { if (el) el.textContent = 'LOADING... 0%'; });
    
    fakeProgressInterval = setInterval(() => {
        fakeProgressValue += Math.random() * 15;
        if (fakeProgressValue >= 99) {
            fakeProgressValue = 98.9;
        }
        const msgs = [
            'LOADING... ' + fakeProgressValue.toFixed(1) + '% (╯°□°）╯',
            'PROGRESS: ' + fakeProgressValue.toFixed(1) + '% // WILL NEVER COMPLETE',
            'ALMOST THERE... ' + fakeProgressValue.toFixed(1) + '% (LYING)',
            fakeProgressValue.toFixed(1) + '% // ERROR 418: STUCK FOREVER',
            'LOADING DEMONSTRATION... ' + fakeProgressValue.toFixed(1) + '%',
            fakeProgressValue.toFixed(1) + '% // YOUR PATIENCE: DEPLETED'
        ];
        const msg = msgs[Math.floor(Math.random() * msgs.length)];
        progressElements.forEach(el => {
            if (el) {
                el.textContent = msg;
                el.style.color = fakeProgressValue > 95 ? 'var(--terminal-red)' : 'var(--matrix-green)';
            }
        });
    }, 800);
}

// Bad Math Calculator - Always wrong
function calculateBadMath() {
    const inputElements = document.querySelectorAll('#calc-input');
    const outputElements = document.querySelectorAll('#calc-output');
    
    inputElements.forEach((inputEl, index) => {
        const outputEl = outputElements[index] || null;
        if (!inputEl || !outputEl) return;
        
        const input = inputEl.value.trim();
        if (!input) {
            outputEl.textContent = 'TYPE SOMETHING TO RUIN! (╯°□°）╯';
            return;
        }
        
        let realAnswer;
        try {
            realAnswer = eval(input);
        } catch(e) {
            outputEl.textContent = 'ERROR: MATH IS BROKEN! (╬ಠ益ಠ)';
            return;
        }
        
        const wrongAnswers = [
            (realAnswer + 42).toString() + ' (PROBABLY)',
            (realAnswer * 0.666).toString() + ' (CURSED)',
            'NaN (NOT A NUMBER, NOT A LIFE)',
            (realAnswer - 100).toString() + ' (TRUST ME BRO)',
            'ERROR 418: ' + (realAnswer / 2).toString(),
            '69 (NICE)',
            '420 (BLAZE IT)',
            (realAnswer + Math.random() * 1000).toFixed(2) + ' (╯°□°）╯',
            'UNDEFINED // YOUR MATH DEGREE: ALSO UNDEFINED',
            (realAnswer * -1).toString() + ' (INVERTED FOR NO REASON)'
        ];
        
        const wrongAnswer = wrongAnswers[Math.floor(Math.random() * wrongAnswers.length)];
        outputEl.textContent = 'CALCULATING...';
        outputEl.style.opacity = '0.5';
        setTimeout(() => {
            outputEl.textContent = wrongAnswer;
            outputEl.style.opacity = '1';
            outputEl.style.color = 'var(--terminal-red)';
            outputEl.style.animation = 'blink 0.3s 2';
        }, 600);
    });
}

// Useless Poll - Your vote doesn't matter
function voteUselessPoll(vote) {
    const resultElements = document.querySelectorAll('#poll-result');
    const dismissiveResponses = [
        'YOUR VOTE DOESN\'T MATTER! (╯°□°）╯',
        'WE ALREADY DECIDED FOR YOU! (╬ಠ益ಠ)',
        'VOTING DISABLED! DEMOCRACY IS DEAD! ( ͡° ͜ʖ ͡°)',
        'ERROR 418: OPINION NOT VALID',
        'THANKS FOR NOTHING! YOUR INPUT = IGNORED! (╯°□°）╯',
        'YOU VOTED ' + vote.toUpperCase() + '! WE COUNTED IT AS MAYBE! (╬ಠ益ಠ)',
        'POLL RESULTS: DOESN\'T MATTER! ( ͡° ͜ʖ ͡°)',
        'YOUR CHOICE: ' + vote.toUpperCase() + ' // OUR CHOICE: WHO CARES',
        'VOTE RECORDED AND IMMEDIATELY DELETED! (╯°□°）╯',
        'THANKS! WE\'LL PRETEND WE CARE! (╬ಠ益ಠ)'
    ];
    const response = dismissiveResponses[Math.floor(Math.random() * dismissiveResponses.length)];
    resultElements.forEach(el => {
        if (el) {
            el.textContent = response;
            el.style.color = 'var(--terminal-yellow)';
            el.style.animation = 'blink 0.5s 3';
        }
    });
}

// Error Maker - Generate fake errors
function generateError() {
    const outputElements = document.querySelectorAll('#error-output');
    const fakeErrors = [
        'ERROR 404: YOUR LIFE NOT FOUND! (╯°□°）╯',
        'ERROR 500: INTERNAL EXISTENTIAL CRISIS! (╬ಠ益ಠ)',
        'ERROR 418: I\'M A TEAPOT! ( ͡° ͜ʖ ͡°)',
        'SEGMENTATION FAULT: YOUR HOPES AND DREAMS CORRUPTED! (╯°□°）╯',
        'FATAL ERROR: SUCCESS.EXE HAS STOPPED WORKING! (╬ಠ益ಠ)',
        'ERROR 403: FORBIDDEN TO HAVE NICE THINGS! ( ͡° ͜ʖ ͡°)',
        'RUNTIME ERROR: LIFE.JS LINE 1: UNDEFINED BEHAVIOR',
        'ERROR 429: TOO MANY MISTAKES! (╯°□°）╯',
        'CRITICAL ERROR: BRAIN.DLL NOT RESPONDING! (╬ಠ益ಠ)',
        'ERROR 0xDEADBEEF: SYSTEM SLOP OVERFLOW! ( ͡° ͜ʖ ͡°)'
    ];
    const error = fakeErrors[Math.floor(Math.random() * fakeErrors.length)];
    outputElements.forEach(el => {
        if (el) {
            el.textContent = error;
            el.style.color = 'var(--terminal-red)';
            el.style.background = 'rgba(255, 0, 0, 0.2)';
            el.style.animation = 'blink 0.3s 5';
            setTimeout(() => { el.style.background = 'transparent'; }, 1500);
        }
    });
}
 + randomAmount
    ];
    const randomMessage = msgs[Math.floor(Math.random() * msgs.length)];
    messageElements.forEach(el => { if (el) el.textContent = randomMessage; });
}

// Crisis Timer - Count the time wasted on this website
let crisisInterval = null;
let crisisSeconds = 0;
function startCrisisTimer() {
    const timerElements = document.querySelectorAll('#crisis-timer');
    const btnElements = document.querySelectorAll('#crisis-btn');
    
    if (crisisInterval) {
        // Stop the timer
        clearInterval(crisisInterval);
        crisisInterval = null;
        btnElements.forEach(btn => { if (btn) btn.textContent = 'START CRISIS'; });
        return;
    }
    
    // Start the timer
    btnElements.forEach(btn => { if (btn) btn.textContent = 'STOP CRISIS'; });
    crisisInterval = setInterval(() => {
        crisisSeconds++;
        const minutes = Math.floor(crisisSeconds / 60);
        const secs = crisisSeconds % 60;
        const timeStr = minutes + ':' + (secs < 10 ? '0' : '') + secs;
        
        const msgs = [
            timeStr + ' WASTED! (╯°□°）╯',
            timeStr + ' OF YOUR LIFE GONE! (╬ಠ益ಠ)',
            timeStr + ' // PRODUCTIVITY: -100%',
            timeStr + ' OF DEMONSTRATIONS! ( ͡° ͜ʖ ͡°)',
            'TIME INVESTED: ' + timeStr + ' // STAY HARD.',
            timeStr + ' // YOUR BOSS IS WATCHING'
        ];
        const msg = msgs[Math.floor(Math.random() * msgs.length)];
        timerElements.forEach(el => {
            if (el) {
                el.textContent = msg;
                el.style.color = crisisSeconds % 3 === 0 ? 'var(--terminal-red)' : 'var(--terminal-yellow)';
            }
        });
    }, 1000);
}

// Bad Advice Generator - Terrible life advice
function generateBadAdvice() {
    const outputElements = document.querySelectorAll('#advice-output');
    const terribleAdvice = [
        'DELETE YOUR BACKUPS REGULARLY! YOU DON\'T NEED THEM! (╯°□°）╯',
        'INVEST ALL YOUR MONEY IN SLOP TOKENS! (╬ಠ益ಠ)',
        'REPLACE YOUR CV WITH MEMES! EMPLOYERS LOVE IT! ( ͡° ͜ʖ ͡°)',
        'CODE IN PRODUCTION! TESTING IS FOR COWARDS! (╯°□°）╯',
        'TURN OFF ALL NOTIFICATIONS! INCLUDING FIRE ALARMS! (╬ಠ益ಠ)',
        'TRUST EVERY EMAIL FROM PRINCES! ( ͡° ͜ʖ ͡°)',
        'REWRITE EVERYTHING IN PHP! SECURITY IS OVERRATED! (╯°□°）╯',
        'ERROR 418: TRY LIVING ON VIBES ONLY',
        'IGNORE ALL WARNINGS! THEY\'RE JUST SUGGESTIONS! (╬ಠ益ಠ)',
        'USE "PASSWORD123" FOR EVERYTHING! CONVENIENCE > SECURITY! ( ͡° ͜ʖ ͡°)'
    ];
    const advice = terribleAdvice[Math.floor(Math.random() * terribleAdvice.length)];
    outputElements.forEach(el => {
        if (el) {
            el.textContent = 'GENERATING TERRIBLE ADVICE...';
            el.style.opacity = '0.5';
            setTimeout(() => {
                el.textContent = advice;
                el.style.opacity = '1';
                const colors = ['var(--terminal-red)', 'var(--terminal-yellow)', 'var(--matrix-green)'];
                el.style.color = colors[Math.floor(Math.random() * colors.length)];
                el.style.animation = 'blink 0.5s 3';
            }, 500);
        }
    });
}

// Fake Progress Bar - Never completes
let fakeProgressValue = 0;
let fakeProgressInterval = null;
function startFakeProgress() {
    const progressElements = document.querySelectorAll('#fake-progress');
    
    if (fakeProgressInterval) {
        clearInterval(fakeProgressInterval);
        fakeProgressInterval = null;
    }
    
    fakeProgressValue = 0;
    progressElements.forEach(el => { if (el) el.textContent = 'LOADING... 0%'; });
    
    fakeProgressInterval = setInterval(() => {
        fakeProgressValue += Math.random() * 15;
        if (fakeProgressValue >= 99) {
            fakeProgressValue = 98.9;
        }
        const msgs = [
            'LOADING... ' + fakeProgressValue.toFixed(1) + '% (╯°□°）╯',
            'PROGRESS: ' + fakeProgressValue.toFixed(1) + '% // WILL NEVER COMPLETE',
            'ALMOST THERE... ' + fakeProgressValue.toFixed(1) + '% (LYING)',
            fakeProgressValue.toFixed(1) + '% // ERROR 418: STUCK FOREVER',
            'LOADING DEMONSTRATION... ' + fakeProgressValue.toFixed(1) + '%',
            fakeProgressValue.toFixed(1) + '% // YOUR PATIENCE: DEPLETED'
        ];
        const msg = msgs[Math.floor(Math.random() * msgs.length)];
        progressElements.forEach(el => {
            if (el) {
                el.textContent = msg;
                el.style.color = fakeProgressValue > 95 ? 'var(--terminal-red)' : 'var(--matrix-green)';
            }
        });
    }, 800);
}

// Bad Math Calculator - Always wrong
function calculateBadMath() {
    const inputElements = document.querySelectorAll('#calc-input');
    const outputElements = document.querySelectorAll('#calc-output');
    
    inputElements.forEach((inputEl, index) => {
        const outputEl = outputElements[index] || null;
        if (!inputEl || !outputEl) return;
        
        const input = inputEl.value.trim();
        if (!input) {
            outputEl.textContent = 'TYPE SOMETHING TO RUIN! (╯°□°）╯';
            return;
        }
        
        let realAnswer;
        try {
            realAnswer = eval(input);
        } catch(e) {
            outputEl.textContent = 'ERROR: MATH IS BROKEN! (╬ಠ益ಠ)';
            return;
        }
        
        const wrongAnswers = [
            (realAnswer + 42).toString() + ' (PROBABLY)',
            (realAnswer * 0.666).toString() + ' (CURSED)',
            'NaN (NOT A NUMBER, NOT A LIFE)',
            (realAnswer - 100).toString() + ' (TRUST ME BRO)',
            'ERROR 418: ' + (realAnswer / 2).toString(),
            '69 (NICE)',
            '420 (BLAZE IT)',
            (realAnswer + Math.random() * 1000).toFixed(2) + ' (╯°□°）╯',
            'UNDEFINED // YOUR MATH DEGREE: ALSO UNDEFINED',
            (realAnswer * -1).toString() + ' (INVERTED FOR NO REASON)'
        ];
        
        const wrongAnswer = wrongAnswers[Math.floor(Math.random() * wrongAnswers.length)];
        outputEl.textContent = 'CALCULATING...';
        outputEl.style.opacity = '0.5';
        setTimeout(() => {
            outputEl.textContent = wrongAnswer;
            outputEl.style.opacity = '1';
            outputEl.style.color = 'var(--terminal-red)';
            outputEl.style.animation = 'blink 0.3s 2';
        }, 600);
    });
}

// Useless Poll - Your vote doesn't matter
function voteUselessPoll(vote) {
    const resultElements = document.querySelectorAll('#poll-result');
    const dismissiveResponses = [
        'YOUR VOTE DOESN\'T MATTER! (╯°□°）╯',
        'WE ALREADY DECIDED FOR YOU! (╬ಠ益ಠ)',
        'VOTING DISABLED! DEMOCRACY IS DEAD! ( ͡° ͜ʖ ͡°)',
        'ERROR 418: OPINION NOT VALID',
        'THANKS FOR NOTHING! YOUR INPUT = IGNORED! (╯°□°）╯',
        'YOU VOTED ' + vote.toUpperCase() + '! WE COUNTED IT AS MAYBE! (╬ಠ益ಠ)',
        'POLL RESULTS: DOESN\'T MATTER! ( ͡° ͜ʖ ͡°)',
        'YOUR CHOICE: ' + vote.toUpperCase() + ' // OUR CHOICE: WHO CARES',
        'VOTE RECORDED AND IMMEDIATELY DELETED! (╯°□°）╯',
        'THANKS! WE\'LL PRETEND WE CARE! (╬ಠ益ಠ)'
    ];
    const response = dismissiveResponses[Math.floor(Math.random() * dismissiveResponses.length)];
    resultElements.forEach(el => {
        if (el) {
            el.textContent = response;
            el.style.color = 'var(--terminal-yellow)';
            el.style.animation = 'blink 0.5s 3';
        }
    });
}

// Error Maker - Generate fake errors
function generateError() {
    const outputElements = document.querySelectorAll('#error-output');
    const fakeErrors = [
        'ERROR 404: YOUR LIFE NOT FOUND! (╯°□°）╯',
        'ERROR 500: INTERNAL EXISTENTIAL CRISIS! (╬ಠ益ಠ)',
        'ERROR 418: I\'M A TEAPOT! ( ͡° ͜ʖ ͡°)',
        'SEGMENTATION FAULT: YOUR HOPES AND DREAMS CORRUPTED! (╯°□°）╯',
        'FATAL ERROR: SUCCESS.EXE HAS STOPPED WORKING! (╬ಠ益ಠ)',
        'ERROR 403: FORBIDDEN TO HAVE NICE THINGS! ( ͡° ͜ʖ ͡°)',
        'RUNTIME ERROR: LIFE.JS LINE 1: UNDEFINED BEHAVIOR',
        'ERROR 429: TOO MANY MISTAKES! (╯°□°）╯',
        'CRITICAL ERROR: BRAIN.DLL NOT RESPONDING! (╬ಠ益ಠ)',
        'ERROR 0xDEADBEEF: SYSTEM SLOP OVERFLOW! ( ͡° ͜ʖ ͡°)'
    ];
    const error = fakeErrors[Math.floor(Math.random() * fakeErrors.length)];
    outputElements.forEach(el => {
        if (el) {
            el.textContent = error;
            el.style.color = 'var(--terminal-red)';
            el.style.background = 'rgba(255, 0, 0, 0.2)';
            el.style.animation = 'blink 0.3s 5';
            setTimeout(() => { el.style.background = 'transparent'; }, 1500);
        }
    });
}
