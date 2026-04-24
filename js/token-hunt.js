(function () {
    const widget = document.getElementById('contract-hunt-widget');
    if (!widget) {
        return;
    }

    const expectedKeys = {
        a: 'HX-47-BOATS',
        b: 'ARCH-40-RULE',
        c: 'REC-CHAIN-13'
    };

    // XOR-obfuscated contract payload decoded only after all keys are valid.
    const obfuscatedAddressBytes = [
        124, 106, 87, 93, 85, 69, 23, 62, 39, 60, 52, 41, 57, 37,
        46, 44, 91, 6, 73, 73, 59, 3, 60, 52, 36, 1, 16, 23,
        25, 2, 57, 115, 3, 38, 27, 86, 10, 12, 110, 89, 68, 66,
        64, 50
    ];

    const solvedStorageKey = 'token-hunt-solved-address';

    const sigilA = document.getElementById('hunt-sigil-a');
    const sigilB = document.getElementById('hunt-sigil-b');
    const sigilC = document.getElementById('hunt-sigil-c');
    const decodeBtn = document.getElementById('hunt-decode-btn');
    const status = document.getElementById('hunt-status');
    const resultWrap = document.getElementById('hunt-result-wrap');
    const result = document.getElementById('hunt-result');
    const copyBtn = document.getElementById('hunt-copy-btn');

    function normalize(value) {
        return (value || '').trim().toUpperCase();
    }

    function decodeAddress(keyA, keyB, keyC) {
        const keySeed = keyA + '|' + keyB + '|' + keyC;
        return obfuscatedAddressBytes
            .map((byte, index) => String.fromCharCode(byte ^ keySeed.charCodeAt(index % keySeed.length)))
            .join('');
    }

    function encodeAddress(address, keyA, keyB, keyC) {
        const keySeed = keyA + '|' + keyB + '|' + keyC;
        return Array.from(address).map((character, index) => (
            character.charCodeAt(0) ^ keySeed.charCodeAt(index % keySeed.length)
        ));
    }

    function revealAddress(address) {
        result.textContent = address;
        resultWrap.hidden = false;
        status.textContent = '[UNLOCKED] Contract decoded. Copy and verify on-chain.';
        localStorage.setItem(solvedStorageKey, address);
    }

    function getSigils() {
        return {
            a: normalize(sigilA.value),
            b: normalize(sigilB.value),
            c: normalize(sigilC.value)
        };
    }

    function validateSigils(sigils) {
        return sigils.a === expectedKeys.a && sigils.b === expectedKeys.b && sigils.c === expectedKeys.c;
    }

    decodeBtn.addEventListener('click', function () {
        const sigils = getSigils();

        if (!sigils.a || !sigils.b || !sigils.c) {
            status.textContent = '[ERROR] Missing key fragment. Hunt all 3 pages.';
            return;
        }

        if (!validateSigils(sigils)) {
            status.textContent = '[ERROR] Bad keys. Keep searching the site cache.';
            return;
        }

        const decodedAddress = decodeAddress(sigils.a, sigils.b, sigils.c);
        revealAddress(decodedAddress);
    });

    copyBtn.addEventListener('click', async function () {
        const address = result.textContent;
        if (!address) {
            return;
        }

        try {
            await navigator.clipboard.writeText(address);
            status.textContent = '[COPIED] Contract copied to clipboard.';
        } catch (error) {
            status.textContent = '[WARN] Clipboard blocked. Copy manually from the field.';
        }
    });

    const solved = localStorage.getItem(solvedStorageKey);
    if (solved) {
        revealAddress(solved);
    }

    window.TokenHuntEncoder = {
        encodeAddress: function (address) {
            return encodeAddress(address, expectedKeys.a, expectedKeys.b, expectedKeys.c);
        }
    };
})();
