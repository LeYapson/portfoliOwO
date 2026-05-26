// mascot-sound.js - Petit "chirp" kawaii quand on clique sur la mascotte,
// et bouton dans le dock pour activer / couper le son.
(() => {
    const KEY = 'mascotSound';
    let enabled = localStorage.getItem(KEY) === 'true';

    // AudioContext lazy : créé au premier clic utilisateur (les navigateurs
    // exigent une interaction avant tout son).
    let audioCtx = null;
    function getCtx() {
        if (!audioCtx) {
            const Ctor = window.AudioContext || window.webkitAudioContext;
            if (Ctor) audioCtx = new Ctor();
        }
        return audioCtx;
    }

    function chirp() {
        if (!enabled) return;
        const ctx = getCtx();
        if (!ctx) return;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(880, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1320, ctx.currentTime + 0.12);
        gain.gain.setValueAtTime(0.0001, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.15, ctx.currentTime + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.18);
        osc.connect(gain).connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.2);
    }

    // Brancher le chirp sur la mascotte dès qu'elle existe dans le DOM.
    function bindMascot() {
        const m = document.querySelector('.kawaii-mascot');
        if (!m) { setTimeout(bindMascot, 300); return; }
        // pointer-events est "none" sur .kawaii-mascot ; on capture donc
        // les clics au niveau du document et filtre par position.
        document.addEventListener('click', (e) => {
            const rect = m.getBoundingClientRect();
            if (e.clientX >= rect.left && e.clientX <= rect.right &&
                e.clientY >= rect.top && e.clientY <= rect.bottom) {
                chirp();
            }
        });
    }
    bindMascot();

    // Bouton dans le dock
    function waitForToolsDock(cb) {
        if (window.addToolToDock) cb();
        else setTimeout(() => waitForToolsDock(cb), 100);
    }
    waitForToolsDock(() => {
        const btn = window.addToolToDock(enabled ? '🔊' : '🔇', 'Son mascotte', () => {
            enabled = !enabled;
            localStorage.setItem(KEY, enabled);
            btn.innerHTML = enabled ? '🔊' : '🔇';
            if (enabled) chirp();
        }, 'mascot-sound-toggle');
    });
})();
