// parallax.js - Version simplifiée et optimisée
(() => {
    // Référence aux éléments du fond
    const sky = document.getElementById('layer-sky');
    const clouds = document.getElementById('layer-clouds');

    // Différentes vitesses pour chaque calque pour créer l'effet parallaxe
    const skySpeed = 0.05;    // Le ciel bouge très lentement
    const cloudsSpeed = 0.15; // Les nuages bougent un peu plus rapidement

    let latestScrollY = 0;
    let ticking = false;

    function update() {
        // Calcul des transformations pour l'effet parallaxe
        if (sky) sky.style.transform = `translateY(${latestScrollY * skySpeed}px)`;
        
        // Les nuages déjà animés par la fonction animateClouds
        
        ticking = false;
    }

    // Animation des nuages indépendante du scroll
    let cloudPosition = 0;
    function animateClouds() {
        if (clouds) {
            cloudPosition -= 0.2; // Déplacement lent des nuages vers la gauche
            if (cloudPosition < -window.innerWidth) {
                cloudPosition = 0; // Revient au début lorsque les nuages sont hors écran
            }
            
            // Combine l'animation automatique avec l'effet parallaxe du scroll
            const scrollOffset = latestScrollY * cloudsSpeed;
            clouds.style.transform = `translateX(${cloudPosition + scrollOffset}px)`;
        }
        requestAnimationFrame(animateClouds);
    }

    // Démarre l'animation des nuages
    animateClouds();

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
