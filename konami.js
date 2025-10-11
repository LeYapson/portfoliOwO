// konami.js - Détection du code Konami (↑↑↓↓←→←→BA) pour lancer Space Invaders
(() => {
    // Séquence du code Konami
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    
    // Variable pour suivre la progression dans la séquence
    let konamiCodePosition = 0;
    
    // Écouteur d'événement pour détecter les touches pressées
    document.addEventListener('keydown', function(e) {
        // Récupérer la touche pressée
        const key = e.key;
        
        // Vérifier si la touche pressée est correcte
        const requiredKey = konamiCode[konamiCodePosition];
        
        if (key.toLowerCase() === requiredKey.toLowerCase()) {
            // Avancer dans la séquence
            konamiCodePosition++;
            
            // Créer un petit effet visuel pour montrer la progression
            const indicator = document.createElement('div');
            indicator.className = 'konami-indicator';
            indicator.style.position = 'fixed';
            indicator.style.top = '10px';
            indicator.style.right = `${10 + (konamiCodePosition * 20)}px`;
            indicator.style.width = '15px';
            indicator.style.height = '15px';
            indicator.style.borderRadius = '50%';
            indicator.style.backgroundColor = 'var(--accent-color)';
            indicator.style.boxShadow = '0 0 10px rgba(255, 182, 193, 0.8)';
            indicator.style.zIndex = '9999';
            indicator.style.opacity = '0';
            indicator.style.transition = 'opacity 0.3s ease';
            document.body.appendChild(indicator);
            
            // Afficher l'indicateur puis le faire disparaître
            setTimeout(() => {
                indicator.style.opacity = '1';
                setTimeout(() => {
                    indicator.style.opacity = '0';
                    setTimeout(() => {
                        indicator.remove();
                    }, 300);
                }, 500);
            }, 10);
            
            // Vérifier si le code complet a été entré
            if (konamiCodePosition === konamiCode.length) {
                // Réinitialiser la position
                konamiCodePosition = 0;
                
                // Lancer Space Invaders
                launchSpaceInvaders();
            }
        } else {
            // Réinitialiser en cas d'erreur
            konamiCodePosition = 0;
        }
    });
    
    // Fonction pour lancer Space Invaders
    function launchSpaceInvaders() {
        // Vérifier si le fichier space-invaders.js est déjà chargé
        if (typeof launchSpaceInvadersGame !== 'function') {
            // Charger le script dynamiquement
            const script = document.createElement('script');
            script.src = 'space-invaders.js';
            script.onload = function() {
                // Une fois chargé, lancer le jeu
                launchSpaceInvadersGame();
            };
            document.head.appendChild(script);
        } else {
            // Si le script est déjà chargé, lancer directement le jeu
            launchSpaceInvadersGame();
        }
    }
})();