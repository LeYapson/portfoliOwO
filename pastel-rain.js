// pastel-rain.js - Effet de pluie pastel déclenché par la touche "P"
(() => {
    // Configuration
    const elements = ['✨', '💕', '🌟', '⭐', '🌸', '✿', '🎀', '🧁'];
    const colors = ['#ffb6c1', '#b5ead7', '#e2d1f9', '#ffd1dc', '#c5a3ff', '#fdffb6'];
    
    // Créer la pluie
    function createRain() {
        // Conteneur pour toute la pluie
        const rainContainer = document.createElement('div');
        rainContainer.className = 'pastel-rain-container';
        rainContainer.style.position = 'fixed';
        rainContainer.style.top = '0';
        rainContainer.style.left = '0';
        rainContainer.style.width = '100%';
        rainContainer.style.height = '100%';
        rainContainer.style.overflow = 'hidden';
        rainContainer.style.pointerEvents = 'none';
        rainContainer.style.zIndex = '9998';
        document.body.appendChild(rainContainer);
        
        // Créer entre 50 et 100 éléments
        const elementCount = Math.floor(Math.random() * 51) + 50;
        
        // Créer l'animation de base
        const style = document.createElement('style');
        style.innerHTML = `
            @keyframes fall {
                from { transform: translateY(-20px); opacity: 0; }
                10% { opacity: 1; }
                to { transform: translateY(100vh); opacity: 0; }
            }
            
            .pastel-element {
                position: absolute;
                will-change: transform;
                user-select: none;
                pointer-events: none;
            }
        `;
        document.head.appendChild(style);
        
        // Créer les éléments de pluie
        for (let i = 0; i < elementCount; i++) {
            setTimeout(() => {
                // Créer un élément aléatoire
                const element = document.createElement('div');
                element.className = 'pastel-element';
                
                // Positionner aléatoirement
                const leftPos = Math.random() * 100;
                const size = Math.random() * 20 + 10;
                const duration = Math.random() * 5 + 3;
                const delay = Math.random() * 5;
                
                // Choisir un élément et une couleur aléatoires
                const elementText = elements[Math.floor(Math.random() * elements.length)];
                const color = colors[Math.floor(Math.random() * colors.length)];
                
                // Appliquer les styles
                element.style.left = `${leftPos}%`;
                element.style.fontSize = `${size}px`;
                element.style.color = color;
                element.style.animation = `fall ${duration}s linear ${delay}s`;
                element.style.opacity = '0';
                element.style.textShadow = `0 0 10px ${color}50`;
                
                // Contenu
                element.textContent = elementText;
                
                // Ajouter au conteneur
                rainContainer.appendChild(element);
                
                // Supprimer après l'animation
                setTimeout(() => {
                    element.remove();
                }, (duration + delay) * 1000);
                
            }, Math.random() * 2000); // Répartir les créations sur 2 secondes
        }
        
        // Supprimer le conteneur après un certain temps
        setTimeout(() => {
            rainContainer.style.transition = 'opacity 1s ease';
            rainContainer.style.opacity = '0';
            
            setTimeout(() => {
                rainContainer.remove();
                style.remove();
            }, 1000);
            
        }, 10000); // Durée totale de l'effet: 10 secondes
    }
    
    // Écouteur d'événement pour la touche "P"
    document.addEventListener('keydown', function(e) {
        if (e.key.toLowerCase() === 'p') {
            // Éviter les déclenchements multiples rapprochés
            const lastRain = document.querySelector('.pastel-rain-container');
            if (!lastRain) {
                createRain();
            }
        }
    });
})();