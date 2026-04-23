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
                    <video class="motivation-video" controls preload="metadata" playsinline>
                        <source src="${VIDEO_SRC}" type="video/mp4">
                        Your browser does not support the video tag.
                    </video>
                </div>

                <div class="motivation-toolbar">
                    <span class="motivation-btn">&lt;</span>
                    <span class="motivation-btn">&gt;</span>
                    <span class="motivation-btn">||</span>
                    <span class="motivation-btn">&gt;</span>
                    <span class="motivation-volume">VOL</span>
                </div>
            </div>
        `;

        const closeBtn = overlay.querySelector('.motivation-close');
        closeBtn.addEventListener('click', () => hidePopup(overlay));

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

        const video = overlay.querySelector('video');
        if (video) {
            const playPromise = video.play();
            if (playPromise && typeof playPromise.catch === 'function') {
                playPromise.catch(() => {
                    // Ignore autoplay restrictions; user can press play.
                });
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
