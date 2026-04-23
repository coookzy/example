/**
 * Modal popup system for The Example tools
 * Handles opening/closing the Windows-style tool dialogs
 */

function openModal(tool) {
    const modal = document.getElementById('toolModal');
    const title = document.getElementById('modalTitle');
    const content = document.getElementById('modalContent');

    const tools = {
        'stayhard': {
            title: 'Stay Hard Meter',
            html: `
                <center>
                <h3 style="color: #ff0000; font-family: 'Arial Black', Arial, sans-serif; margin-bottom: 10px;">&gt;&gt;&gt; STAY HARD METER &lt;&lt;&lt;</h3>
                <p style="font-size: 12px; color: #666; font-style: italic;">(Are you SOFT or HARD?)</p>
                <br>
                <button id="stayhard-btn" class="btn" style="margin: 10px;">CHECK YOUR HARDNESS</button>
                <br><br>
                <div id="stayhard-output" style="font-size: 36px; font-family: 'Arial Black', Arial, sans-serif; color: #ff0000; font-weight: bold;">???</div>
                <br>
                <p id="stayhard-message" style="font-size: 14px; min-height: 50px; padding: 10px; font-weight: bold;"></p>
                </center>
            `
        },
        'softcheck': {
            title: 'Soft Check',
            html: `
                <center>
                <h3 style="color: #9945FF; font-family: 'Arial Black', Arial, sans-serif; margin-bottom: 10px;">*** SOFT CHECK ***</h3>
                <p style="font-size: 12px; color: #666; font-style: italic;">(Time for brutal honesty)</p>
                <br>
                <input type="text" id="softcheck-input" placeholder="What did you do today?" style="width: 90%; padding: 10px; font-size: 14px; font-family: Courier New, monospace; border: 2px solid #9945FF;" value="Scrolled social media">
                <br><br>
                <button id="softcheck-btn" class="btn">IS IT SOFT?</button>
                <br><br>
                <div id="softcheck-output" style="font-size: 16px; font-weight: bold; min-height: 60px; padding: 10px; color: #ff0000;"></div>
                </center>
            `
        },
        'goggins': {
            title: 'Goggins Insult Generator',
            html: `
                <center>
                <h3 style="color: #ff3300; font-family: 'Arial Black', Arial, sans-serif; margin-bottom: 10px;">[[[ GOGGINS INSULT ]]]</h3>
                <p style="font-size: 12px; color: #666; font-style: italic;">(You're gonna feel this one)</p>
                <br>
                <button id="goggins-btn" class="btn">CALL ME OUT</button>
                <br><br>
                <div id="goggins-output" style="font-size: 18px; font-family: 'Arial Black', Arial, sans-serif; color: #ff0000; font-weight: bold; min-height: 60px; padding: 10px;"></div>
                </center>
            `
        },
        'boats': {
            title: "Who's Gonna Carry The Boats?",
            html: `
                <center>
                <h3 style="color: #00ff00; font-family: 'Arial Black', Arial, sans-serif; margin-bottom: 10px;">WHO'S GONNA CARRY?</h3>
                <p style="font-size: 12px; color: #666; font-style: italic;">(Answer: Not you, you're too soft)</p>
                <br>
                <input type="text" id="boats-input" placeholder="Your name..." style="width: 90%; padding: 10px; font-size: 14px; font-family: Courier New, monospace; border: 2px solid #00ff00;">
                <br><br>
                <button id="boats-btn" class="btn">FIND OUT</button>
                <br><br>
                <p id="boats-output" style="font-size: 14px; min-height: 80px; padding: 10px; font-weight: bold; color: #ff0000;"></p>
                </center>
            `
        },
        'mirror': {
            title: "Accountability Mirror",
            html: `
                <center>
                <h3 style="color: #ff0066; font-family: 'Arial Black', Arial, sans-serif; margin-bottom: 10px;">~~~ ACCOUNTABILITY MIRROR ~~~</h3>
                <p style="font-size: 12px; color: #666; font-style: italic;">(Face yourself, coward)</p>
                <br>
                <button id="mirror-btn" class="btn">LOOK IN THE MIRROR</button>
                <br><br>
                <div id="mirror-output" style="font-size: 16px; font-family: 'Arial Black', Arial, sans-serif; min-height: 80px; color: #ff0000; padding: 10px; font-weight: bold;"></div>
                </center>
            `
        },
        'fortypercent': {
            title: '40% Rule Calculator',
            html: `
                <center>
                <h3 style="color: #ff9900; font-family: 'Arial Black', Arial, sans-serif; margin-bottom: 10px;">||| 40% RULE CALC |||</h3>
                <p style="font-size: 12px; color: #666; font-style: italic;">(You're only 40% done when you think you're done)</p>
                <br>
                <input type="number" id="fortypercent-input" placeholder="How much you think you can do..." style="width: 90%; padding: 10px; font-size: 14px; font-family: Courier New, monospace; border: 2px solid #ff9900;" value="100">
                <br><br>
                <button id="fortypercent-btn" class="btn">CALCULATE ACTUAL CAPACITY</button>
                <br><br>
                <div id="fortypercent-output" style="background: #fff3e6; padding: 15px; min-height: 70px; border: 3px solid #ff9900; font-size: 20px; text-align: center; font-weight: bold; color: #ff0000;"></div>
                </center>
            `
        },
        'souls': {
            title: 'Souls Taken Counter',
            html: `
                <center>
                <h3 style="color: #00cc66; font-family: 'Arial Black', Arial, sans-serif; margin-bottom: 10px;">$$$ SOULS TAKEN $$$</h3>
                <p style="font-size: 12px; color: #666; font-style: italic;">(The Example's daily tally)</p>
                <br>
                <button id="souls-btn" class="btn">COUNT SOULS</button>
                <br><br>
                <div id="souls-output" style="background: #e6ffe6; padding: 15px; text-align: center; font-size: 32px; font-family: 'Arial Black', Arial, sans-serif; color: #ff0000; font-weight: bold; min-height: 50px; border: 3px solid #00cc66;"></div>
                </center>
            `
        },
        'hurtlocker': {
            title: 'Hurt Locker Status',
            html: `
                <center>
                <h3 style="color: #ff9933; font-family: 'Arial Black', Arial, sans-serif; margin-bottom: 10px;">&lt;&lt; HURT LOCKER STATUS &gt;&gt;</h3>
                <p style="font-size: 12px; color: #666; font-style: italic;">(Are you IN or are you OUT?)</p>
                <br>
                <button id="hurtlocker-btn" class="btn">CHECK STATUS</button>
                <br><br>
                <div id="hurtlocker-output" style="text-align: center; min-height: 80px; font-size: 18px; font-weight: bold; color: #ff0000; padding: 15px;"></div>
                </center>
            `
        },
        'cookiejar': {
            title: 'Cookie Jar',
            html: `
                <center>
                <h3 style="color: #ff0000; font-family: 'Arial Black', Arial, sans-serif; margin-bottom: 10px;">:( COOKIE JAR :(</h3>
                <p style="font-size: 12px; color: #666; font-style: italic;">(Remember when you weren't soft)</p>
                <br>
                <button id="cookiejar-btn" class="btn">GRAB A COOKIE</button>
                <br><br>
                <div id="cookiejar-output" style="background: #ffe6e6; padding: 15px; min-height: 80px; border: 3px solid #ff0000; font-size: 14px; font-family: 'Arial Black', Arial, sans-serif; font-weight: bold;"></div>
                </center>
            `
        },
        'grindset': {
            title: 'Grindset Validator',
            html: `
                <center>
                <h3 style="color: #3333cc; font-family: 'Arial Black', Arial, sans-serif; margin-bottom: 10px;">*** GRINDSET VALIDATOR ***</h3>
                <p style="font-size: 12px; color: #666; font-style: italic;">(Let's see if you're really about it)</p>
                <br>
                <input type="text" id="grindset-input" placeholder="Your grindset mantra..." style="width: 90%; padding: 10px; font-size: 14px; font-family: Courier New, monospace; border: 2px solid #3333cc;" value="Rise and grind">
                <br><br>
                <button id="grindset-btn" class="btn">VALIDATE</button>
                <br><br>
                <div id="grindset-output" style="background: #e6e6ff; color: #ff0000; padding: 15px; min-height: 60px; font-size: 14px; text-align: center; font-weight: bold; border: 3px solid #3333cc;"></div>
                </center>
            `
        }
    };

    if (tools[tool]) {
        title.textContent = tools[tool].title;
        content.innerHTML = tools[tool].html;
        modal.style.display = 'block';

        // Re-bind tool button handlers after modal content is injected
        setTimeout(() => {
            const handlers = window.modalHandlers || {};
            Object.keys(handlers).forEach(id => {
                const el = document.getElementById(id);
                if (el && !el.dataset.bound) {
                    el.addEventListener('click', handlers[id]);
                    el.dataset.bound = 'true';
                }
            });
        }, 100);
    }
}

function closeModal() {
    document.getElementById('toolModal').style.display = 'none';
}

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    const modal = document.getElementById('toolModal');
    if (modal && event.target === modal) {
        closeModal();
    }
});

// Tool button handlers (bound after modal HTML is injected)
window.modalHandlers = {
    'stayhard-btn': function() {
        const levels = [
            { level: 'ROCK FUCKING SOLID', msg: "You're HARD. But can you STAY HARD? That's the real question." },
            { level: 'DIAMOND HANDS', msg: "Not bad. You're holding strong. But I've seen HARDER." },
            { level: 'SLIGHTLY FIRM', msg: "You're starting to soften up. GET IT TOGETHER." },
            { level: 'GETTING SOFT', msg: "I can see you weakening. This is pathetic." },
            { level: 'MARSHMALLOW', msg: "You're SOFT. So fucking SOFT. Get out of my sight." },
            { level: 'LIQUID', msg: "You're not even solid anymore. You DISGUST me." }
        ];
        const result = levels[Math.floor(Math.random() * levels.length)];
        document.getElementById('stayhard-output').textContent = result.level;
        document.getElementById('stayhard-message').textContent = result.msg;
    },
    'softcheck-btn': function() {
        const input = document.getElementById('softcheck-input').value.toLowerCase();
        const softBehaviors = ['scroll', 'nap', 'snooze', 'sleep', 'rest', 'relax', 'chill', 'netflix', 'social media', 'tiktok', 'instagram'];
        const isSoft = softBehaviors.some(word => input.includes(word));
        document.getElementById('softcheck-output').innerHTML = isSoft
            ? '\u274C SOFT AS FUCK \u274C<br><br>That\'s some WEAK behavior. You think that\'s productive? GET UP. GO DO SOMETHING HARD.'
            : '\u2714 NOT SOFT \u2714<br><br>Alright. Maybe you\'re not completely useless. But don\'t get comfortable. STAY HARD.';
    },
    'goggins-btn': function() {
        const insults = [
            "You're SOFT. You think 100% is enough? You're only at 40% and you're already CRYING.",
            "WHO'S GONNA CARRY THE BOATS? Not you, you WEAK piece of shit.",
            "I see you. Making excuses. Being COMFORTABLE. You make me SICK.",
            "You quit when it gets hard. That's why you'll always be MEDIOCRE.",
            "ACCOUNTABILITY MIRROR says you're a LIAR. You lie to yourself EVERY DAY.",
            "Your COOKIE JAR is EMPTY because you've never accomplished SHIT.",
            "You want to be coddled. You want someone to tell you it's okay. IT'S NOT OKAY. STAY HARD.",
            "I'm taking your SOUL right now and you don't even KNOW IT.",
            "You're in your COMFORT ZONE. Get the fuck into the HURT LOCKER.",
            "When it was time to suffer, you QUIT. When it was time to GRIND, you SLEPT."
        ];
        document.getElementById('goggins-output').textContent = insults[Math.floor(Math.random() * insults.length)];
    },
    'boats-btn': function() {
        const name = document.getElementById('boats-input').value || 'you';
        const responses = [
            `${name}? Carry the boats? LMAO. You can't even carry your own WEIGHT. I'M carrying the boats. STAY HARD.`,
            `Let me be clear: ${name} is NOT carrying the boats. ${name} is too SOFT. Too WEAK. I'M carrying the boats.`,
            `${name} thought about carrying the boats for 2 seconds and QUIT. That's the difference between me and ${name}.`,
            `WHO'S GONNA CARRY THE BOATS? ME. Not ${name}. ${name}'s gonna make EXCUSES while I CARRY EVERYTHING.`,
            `${name} saw the boats and said "that's too heavy." I saw the boats and said "WHERE'S MORE BOATS?"`
        ];
        document.getElementById('boats-output').textContent = responses[Math.floor(Math.random() * responses.length)];
    },
    'mirror-btn': function() {
        const truths = [
            "You see that? That face? That's the face of someone who QUITS. Who makes EXCUSES. Who stays COMFORTABLE. CHANGE IT.",
            "Look at yourself. REALLY look. You're not who you say you are. You're LYING to yourself every single day.",
            "I see WEAKNESS. I see someone who could do MORE but CHOOSES not to. That's PATHETIC.",
            "You look in this mirror and you see potential. I look in this mirror and see WASTED POTENTIAL. Fix it.",
            "ACCOUNTABILITY: You said you'd do it. You DIDN'T. You LIED. Stop lying to the person in this mirror.",
            "The person looking back at you is SOFT. They've been SOFT for YEARS. When are you going to CHANGE?"
        ];
        document.getElementById('mirror-output').textContent = truths[Math.floor(Math.random() * truths.length)];
    },
    'fortypercent-btn': function() {
        const input = parseInt(document.getElementById('fortypercent-input').value) || 100;
        const actual = Math.round(input / 0.4);
        document.getElementById('fortypercent-output').innerHTML =
            `You think you can do: <span style="color: #666;">${input}</span><br><br>` +
            `ACTUAL CAPACITY: <span style="font-size: 32px;">${actual}</span><br><br>` +
            "When you think you're DONE, you're only 40% done. STAY HARD.";
    },
    'souls-btn': function() {
        const souls = Math.floor(Math.random() * 10000) + 5000;
        document.getElementById('souls-output').innerHTML =
            `<div style="font-size: 48px; margin: 20px 0;">${souls.toLocaleString()}</div>` +
            `<div style="font-size: 14px; color: #666;">Souls taken TODAY by The Example</div>` +
            `<div style="font-size: 12px; margin-top: 10px;">Every soft dev. Every weak project. EVERY. SINGLE. SOUL.</div>`;
    },
    'hurtlocker-btn': function() {
        const statuses = [
            { status: 'DEEP IN THE HURT LOCKER', msg: "You're suffering. Good. That means you're GROWING. STAY THERE." },
            { status: 'JUST ENTERED', msg: "Welcome to the HURT LOCKER. Now STAY HERE. Don't you DARE leave." },
            { status: 'KNOCKING ON THE DOOR', msg: "You're CLOSE to the hurt locker. But you're not IN yet. Push HARDER." },
            { status: 'STANDING OUTSIDE', msg: "You're not even IN the hurt locker. You're COMFORTABLE. That's your problem." },
            { status: 'RUNNING AWAY', msg: "You're RUNNING from the hurt locker. You're SOFT. Come back when you're ready to SUFFER." }
        ];
        const result = statuses[Math.floor(Math.random() * statuses.length)];
        document.getElementById('hurtlocker-output').innerHTML =
            `<div style="font-size: 24px; margin-bottom: 15px;">${result.status}</div>` +
            `<div style="font-size: 14px; color: #333;">${result.msg}</div>`;
    },
    'cookiejar-btn': function() {
        const cookies = [
            "Remember that time you ACTUALLY finished something? Yeah, me neither. Your jar is EMPTY.",
            "COOKIE: That project you almost quit but pushed through anyway. NOW CHANNEL THAT ENERGY.",
            "COOKIE: When everyone said you'd fail and you proved them wrong. DO IT AGAIN.",
            "Your cookie jar is EMPTY because you've never done anything HARD. Go EARN some cookies.",
            "COOKIE: That one time you STAYED HARD when everything told you to quit. REMEMBER THAT FEELING.",
            "COOKIE: When you were at 40% and thought you were done but kept going. YOU CAN DO THAT AGAIN."
        ];
        document.getElementById('cookiejar-output').textContent = cookies[Math.floor(Math.random() * cookies.length)];
    },
    'grindset-btn': function() {
        const input = document.getElementById('grindset-input').value.toLowerCase();
        const realGrindset = ['hard', 'suffer', 'pain', 'grind', 'soul', 'no excuses', 'push', 'never quit'];
        const softGrindset = ['balance', 'self-care', 'rest', 'gentle', 'easy', 'comfortable', 'chill', 'relax'];
        let result = '';
        if (softGrindset.some(word => input.includes(word))) {
            result = "[X] FAKE GRINDSET [X]<br><br>That's not a grindset. That's a QUITSET. You're SOFT.";
        } else if (realGrindset.some(word => input.includes(word))) {
            result = "[+] REAL GRINDSET [+]<br><br>Now you're talking. But WORDS mean nothing. DEMONSTRATE IT.";
        } else {
            result = "[?] UNVERIFIED [?]<br><br>I don't know what that is. But it sounds SOFT. Prove me wrong.";
        }
        document.getElementById('grindset-output').innerHTML = result;
    }
};
