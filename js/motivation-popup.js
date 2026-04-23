/**
 * Motivation popup video player
 * Displays a retro-styled media player 2 seconds after page load.
 */
(function () {
    const POPUP_ID = 'motivation-popup-overlay';
    const VIDEO_SRC = 'assets/motivation.mp4';

    function buildPopup() {
        const overlay = document.createElement('div');
        overlay.id = POPUP_ID;
        overlay.className = 'motivation-popup-overlay';
        overlay.setAttribute('aria-hidden', 'true');

        overlay.innerHTML = `
            <div class="motivation-player-window" role="dialog" aria-modal="true" aria-label="Motivation video player">
                <div class="motivation-titlebar">
                    <span class="motivation-title">Windows Media Player</span>
                    <button class="motivation-close" type="button" aria-label="Close">X</button>
                </div>

                <div class="motivation-menubar">File&nbsp;&nbsp;View&nbsp;&nbsp;Play&nbsp;&nbsp;Favorites&nbsp;&nbsp;Go&nbsp;&nbsp;Help</div>

                <div class="motivation-screen">
                    <video class="motivation-video" preload="metadata" playsinline autoplay>
                        <source src="${VIDEO_SRC}" type="video/mp4">
                        Your browser does not support the video tag.
                    </video>
                    <button class="motivation-sound-prompt" type="button" aria-label="Enable sound" hidden>
                        CLICK TO ENABLE SOUND
                    </button>
                </div>

                <div class="motivation-toolbar">
                    <button class="motivation-btn motivation-back" type="button" aria-label="Back 5 seconds">&lt;&lt;</button>
                    <button class="motivation-btn motivation-play" type="button" aria-label="Play or pause">PAUSE</button>
                    <button class="motivation-btn motivation-forward" type="button" aria-label="Forward 5 seconds">&gt;&gt;</button>
                    <input class="motivation-seek" type="range" min="0" max="100" value="0" step="0.1" aria-label="Seek video timeline">
                    <span class="motivation-time">0:00 / 0:00</span>
                    <button class="motivation-volume" type="button" aria-label="Mute or unmute">SOUND ON</button>
                </div>
            </div>
        `;

        const closeBtn = overlay.querySelector('.motivation-close');
        const video = overlay.querySelector('.motivation-video');
        const backBtn = overlay.querySelector('.motivation-back');
        const playBtn = overlay.querySelector('.motivation-play');
        const forwardBtn = overlay.querySelector('.motivation-forward');
        const seek = overlay.querySelector('.motivation-seek');
        const time = overlay.querySelector('.motivation-time');
        const volumeBtn = overlay.querySelector('.motivation-volume');
        const soundPrompt = overlay.querySelector('.motivation-sound-prompt');

        let isSeeking = false;

        function formatTime(totalSeconds) {
            if (!Number.isFinite(totalSeconds) || totalSeconds < 0) {
                return '0:00';
            }
            const minutes = Math.floor(totalSeconds / 60);
            const seconds = Math.floor(totalSeconds % 60);
            return `${minutes}:${String(seconds).padStart(2, '0')}`;
        }

        function updateTimeDisplay() {
            if (!video || !time) {
                return;
            }
            const current = formatTime(video.currentTime || 0);
            const duration = formatTime(video.duration || 0);
            time.textContent = `${current} / ${duration}`;
        }

        function updatePlayButton() {
            if (!playBtn || !video) {
                return;
            }
            playBtn.textContent = video.paused ? 'PLAY' : 'PAUSE';
        }

        function updateVolumeButton() {
            if (!volumeBtn || !video) {
                return;
            }
            volumeBtn.textContent = video.muted ? 'SOUND OFF' : 'SOUND ON';
            volumeBtn.classList.toggle('is-muted', video.muted);
        }

        function updateSoundPrompt() {
            if (!soundPrompt || !video) {
                return;
            }
            const showPrompt = video.muted;
            soundPrompt.hidden = !showPrompt;
            soundPrompt.classList.toggle('is-visible', showPrompt);
        }

        closeBtn.addEventListener('click', () => hidePopup(overlay));

        backBtn.addEventListener('click', () => {
            video.currentTime = Math.max(0, video.currentTime - 5);
        });

        playBtn.addEventListener('click', () => {
            if (video.paused) {
                video.play().catch(() => {});
            } else {
                video.pause();
            }
        });

        forwardBtn.addEventListener('click', () => {
            const maxTime = Number.isFinite(video.duration) ? video.duration : video.currentTime + 5;
            video.currentTime = Math.min(maxTime, video.currentTime + 5);
        });

        seek.addEventListener('mousedown', () => {
            isSeeking = true;
        });

        seek.addEventListener('touchstart', () => {
            isSeeking = true;
        }, { passive: true });

        seek.addEventListener('input', () => {
            const target = Number(seek.value);
            if (Number.isFinite(target)) {
                video.currentTime = target;
                updateTimeDisplay();
            }
        });

        seek.addEventListener('change', () => {
            isSeeking = false;
        });

        volumeBtn.addEventListener('click', () => {
            video.muted = !video.muted;
            updateVolumeButton();
            updateSoundPrompt();
        });

        soundPrompt.addEventListener('click', () => {
            video.muted = false;
            video.volume = 1;
            updateVolumeButton();
            updateSoundPrompt();
            video.play().catch(() => {});
        });

        video.addEventListener('loadedmetadata', () => {
            seek.max = String(Number.isFinite(video.duration) ? video.duration : 100);
            updateTimeDisplay();
        });

        video.addEventListener('timeupdate', () => {
            if (!isSeeking) {
                seek.value = String(video.currentTime || 0);
            }
            updateTimeDisplay();
        });

        video.addEventListener('play', updatePlayButton);
        video.addEventListener('pause', updatePlayButton);
        video.addEventListener('ended', updatePlayButton);
        video.addEventListener('volumechange', () => {
            updateVolumeButton();
            updateSoundPrompt();
        });

        overlay.addEventListener('mouseup', () => {
            isSeeking = false;
        });

        updateTimeDisplay();
        updatePlayButton();
        updateVolumeButton();
        updateSoundPrompt();

        overlay.addEventListener('click', (event) => {
            if (event.target === overlay) {
                hidePopup(overlay);
            }
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && overlay.classList.contains('is-open')) {
                hidePopup(overlay);
            }
        });

        return overlay;
    }

    function hidePopup(overlay) {
        const video = overlay.querySelector('video');
        if (video) {
            video.pause();
        }
        overlay.classList.remove('is-open');
        overlay.setAttribute('aria-hidden', 'true');
    }

    function showPopup(overlay) {
        overlay.classList.add('is-open');
        overlay.setAttribute('aria-hidden', 'false');

        const video = overlay.querySelector('.motivation-video');
        const volumeBtn = overlay.querySelector('.motivation-volume');
        const playBtn = overlay.querySelector('.motivation-play');

        if (video) {
            video.muted = false;
            video.volume = 1;

            const playWithAudio = video.play();
            if (playWithAudio && typeof playWithAudio.catch === 'function') {
                playWithAudio.catch(() => {
                    // Browser blocked autoplay with audio; fallback to muted autoplay.
                    video.muted = true;
                    if (volumeBtn) {
                        volumeBtn.textContent = 'SOUND OFF';
                    }
                    if (soundPrompt) {
                        soundPrompt.hidden = false;
                        soundPrompt.classList.add('is-visible');
                    }
                    const playMuted = video.play();
                    if (playMuted && typeof playMuted.catch === 'function') {
                        playMuted.catch(() => {
                            // Ignore autoplay restrictions; user can press play.
                        });
                    }
                });
            }

            if (volumeBtn) {
                volumeBtn.textContent = video.muted ? 'SOUND OFF' : 'SOUND ON';
                volumeBtn.classList.toggle('is-muted', video.muted);
            }
            if (soundPrompt) {
                soundPrompt.hidden = !video.muted;
                soundPrompt.classList.toggle('is-visible', video.muted);
            }
            if (playBtn) {
                playBtn.textContent = video.paused ? 'PLAY' : 'PAUSE';
            }
        }
    }

    function initMotivationPopup() {
        if (document.getElementById(POPUP_ID)) {
            return;
        }

        const popup = buildPopup();
        document.body.appendChild(popup);

        window.setTimeout(() => {
            showPopup(popup);
        }, 2000);
    }

    document.addEventListener('DOMContentLoaded', initMotivationPopup);
})();
