// parallax.js - Simplifié sans l'effet de parallaxe
(() => {
    // Référence aux éléments du fond, mais sans effet de parallaxe
    const sky = document.getElementById('layer-sky');
    const clouds = document.getElementById('layer-clouds');
    const ground = document.getElementById('layer-ground');
    const groundSection = document.getElementById('ground-section');

    // Pas de vitesse de parallaxe puisqu'on n'utilise plus cet effet
    let latestScrollY = 0;
    let ticking = false;

    function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }

    function update() {
        // Aucun effet de parallaxe - les éléments restent fixes
        if (sky) sky.style.transform = 'none';
        if (clouds) clouds.style.transform = 'none';

        // Le sol est toujours visible mais sans effet de mouvement
        if (ground) {
            ground.style.backgroundPosition = 'center bottom';
            ground.classList.add('ground-visible');
        }
        
        // Optionnel : si on veut toujours animer le sol au survol
        if (groundSection) {
            groundSection.style.opacity = '1';
        }

        // optional fade for ground section
        if (groundSection) {
            const rect = groundSection.getBoundingClientRect();
            const visible = clamp((window.innerHeight - rect.top) / window.innerHeight, 0, 1);
            groundSection.style.opacity = String(visible);
        }

        ticking = false;
    }

    window.addEventListener('scroll', () => {
        latestScrollY = window.scrollY || window.pageYOffset;
        if (!ticking) {
            window.requestAnimationFrame(update);
            ticking = true;
        }
    }, { passive: true });

    // Initial update in case page loads scrolled
    latestScrollY = window.scrollY || window.pageYOffset;
    window.requestAnimationFrame(update);
})();
