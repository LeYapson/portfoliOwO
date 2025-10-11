// pixel-hearts.js - Effet de pluie de cœurs pixelisés lors du défilement
(() => {
    // Dernier défilement enregistré
    let lastScrollY = window.scrollY || window.pageYOffset;
    let scrollDirection = 0;
    let lastScrollTime = Date.now();
    let isRaining = false;
    
    // Couleurs pastel pour les cœurs
    const heartColors = [
        "#ffb6c1", // rose pastel
        "#b5ead7", // menthe pastel
        "#e2d1f9", // lavande pastel
        "#ffdac1", // pêche pastel
        "#ff9aa2", // corail pastel
        "#c7ceea"  // bleu pastel
    ];
    
    // Types d'émojis kawaii
    const kawaiiEmojis = [
        "♥", "💕", "✨", "⭐", "🌸", "✿"
    ];
    
    // Créer un cœur et l'ajouter au DOM
    function createHeart() {
        const emoji = document.createElement('div');
        emoji.className = 'floating-heart';
        emoji.textContent = kawaiiEmojis[Math.floor(Math.random() * kawaiiEmojis.length)];
        
        // Position aléatoire en X (largeur de la fenêtre)
        const posX = Math.random() * window.innerWidth;
        
        // Toujours partir du haut de l'écran visible
        const posY = 0;
        
        // Styles du cœur
        emoji.style.left = `${posX}px`;
        emoji.style.top = `${posY}px`;
        emoji.style.color = heartColors[Math.floor(Math.random() * heartColors.length)];
        emoji.style.fontSize = `${12 + Math.random() * 14}px`; // Taille entre 12px et 26px
        emoji.style.opacity = `${0.5 + Math.random() * 0.5}`; // Opacité entre 0.5 et 1
        
        // Ajouter au body
        document.body.appendChild(emoji);
        
        // Animation de descente
        const animDuration = 3 + Math.random() * 4; // entre 3 et 7 secondes
        emoji.style.animation = `heartFall ${animDuration}s ease-in forwards`;
        
        // Supprimer après l'animation
        setTimeout(() => {
            emoji.remove();
        }, animDuration * 1000);
    }
    
    // Gérer le défilement pour déclencher les cœurs
    function handleScroll() {
        const currentScrollY = window.scrollY || window.pageYOffset;
        const now = Date.now();
        
        // Déterminer la direction du défilement
        if (currentScrollY > lastScrollY) {
            scrollDirection = 1; // vers le bas
        } else if (currentScrollY < lastScrollY) {
            scrollDirection = -1; // vers le haut
        }
        
        // Calculer la vitesse de défilement (pixels par milliseconde)
        const timeDiff = now - lastScrollTime;
        const scrollSpeed = timeDiff > 0 ? Math.abs(currentScrollY - lastScrollY) / timeDiff : 0;
        
        // Si on défile assez rapidement et qu'il ne pleut pas encore
        if (scrollSpeed > 0.5 && !isRaining) {
            startHeartRain();
        } else if (scrollSpeed < 0.1 && isRaining) {
            stopHeartRain();
        }
        
        lastScrollY = currentScrollY;
        lastScrollTime = now;
    }
    
    let rainInterval;
    
    // Commencer la pluie de cœurs
    function startHeartRain() {
        if (isRaining) return;
        
        isRaining = true;
        rainInterval = setInterval(() => {
            // Créer 1 à 3 cœurs aléatoirement
            const count = 1 + Math.floor(Math.random() * 3);
            for (let i = 0; i < count; i++) {
                createHeart();
            }
        }, 200);
    }
    
    // Arrêter la pluie de cœurs
    function stopHeartRain() {
        isRaining = false;
        clearInterval(rainInterval);
    }
    
    // Ajouter les règles CSS pour l'animation de chute
    const styleSheet = document.createElement('style');
    styleSheet.innerHTML = `
        .floating-heart {
            position: fixed;
            pointer-events: none;
            z-index: 9999;
            filter: drop-shadow(0 0 2px rgba(255, 255, 255, 0.5));
        }
        
        @keyframes heartFall {
            0% { transform: translateY(0) rotate(0deg); opacity: var(--initial-opacity, 0.7); }
            50% { opacity: var(--initial-opacity, 0.7); }
            100% { transform: translateY(${window.innerHeight}px) rotate(360deg); opacity: 0; }
        }
    `;
    document.head.appendChild(styleSheet);
    
    // Événement de défilement
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Easter egg : double-clic pour déclencher une pluie de cœurs
    document.addEventListener('dblclick', (e) => {
        // Création de plusieurs cœurs en cercle autour du point de clic
        for (let i = 0; i < 12; i++) {
            const emoji = document.createElement('div');
            emoji.className = 'floating-heart';
            emoji.textContent = kawaiiEmojis[Math.floor(Math.random() * kawaiiEmojis.length)];
            
            // Position initiale au point de clic
            emoji.style.left = `${e.clientX}px`;
            emoji.style.top = `${e.clientY}px`;
            emoji.style.color = heartColors[Math.floor(Math.random() * heartColors.length)];
            emoji.style.fontSize = `${12 + Math.random() * 14}px`;
            emoji.style.opacity = `${0.5 + Math.random() * 0.5}`;
            
            // Ajouter au body
            document.body.appendChild(emoji);
            
            // Animation pour s'éloigner du point de clic dans toutes les directions
            const angle = (i / 12) * Math.PI * 2;
            const distance = 100 + Math.random() * 50;
            const targetX = e.clientX + Math.cos(angle) * distance;
            const targetY = e.clientY + Math.sin(angle) * distance;
            
            // Appliquer l'animation personnalisée
            emoji.animate([
                { transform: 'translate(0, 0) scale(0.5)', opacity: 0 },
                { transform: `translate(${Math.cos(angle) * distance / 2}px, ${Math.sin(angle) * distance / 2}px) scale(1)`, opacity: 1 },
                { transform: `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) scale(0.5)`, opacity: 0 }
            ], {
                duration: 1500,
                easing: 'ease-out',
                fill: 'forwards'
            });
            
            // Supprimer après l'animation
            setTimeout(() => {
                emoji.remove();
            }, 1500);
        }
    });
})();
