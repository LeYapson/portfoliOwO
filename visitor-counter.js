// visitor-counter.js - Compteur de visiteurs kawaii
(() => {
    // Variables pour l'Easter egg
    const emojis = ['🐱', '🐰', '🦊', '🐹', '🐻', '🐼', '🐨', '🐯', '🦁', '🐶'];
    let currentEmojiIndex = 0;
    
    // Créer un popup pour le compteur de visiteurs
    const counterPopup = document.createElement('div');
    counterPopup.className = 'visitor-counter-popup';
    counterPopup.style.position = 'fixed';
    counterPopup.style.top = '80px';
    counterPopup.style.right = '20px';
    // Utilise la variable CSS définie dans night-mode.css pour s'adapter
    // automatiquement au mode jour/nuit.
    counterPopup.style.backgroundColor = 'var(--panel-bg, rgba(255, 255, 255, 0.95))';
    counterPopup.style.color = 'var(--text-color)';
    counterPopup.style.padding = '15px';
    counterPopup.style.borderRadius = '15px';
    counterPopup.style.boxShadow = '0 0 20px rgba(0, 0, 0, 0.2)';
    counterPopup.style.zIndex = '1020';
    counterPopup.style.display = 'none';
    counterPopup.style.fontFamily = "'Comic Neue', cursive";
    counterPopup.style.minWidth = '180px';
    counterPopup.style.textAlign = 'center';
    counterPopup.style.opacity = '0';
    counterPopup.style.transform = 'translateY(-10px)';
    counterPopup.style.transition = 'opacity 0.3s, transform 0.3s';
    
    // HTML interne du popup
    counterPopup.innerHTML = `
        <div class="counter-icon" style="margin-bottom: 10px; font-size: 2rem; animation: bounce 2s infinite;">🐱</div>
        <div class="counter-text">
            <div style="font-size: 0.9rem; margin-bottom: 5px;">Tu es le visiteur n°</div>
            <div class="counter-number" style="font-weight: bold; font-family: 'Press Start 2P', monospace; font-size: 1.2rem; margin: 5px 0;">0</div>
            <div style="font-size: 0.8rem; margin-top: 5px;">Merci de ta visite! ✨</div>
        </div>
    `;
    
    document.body.appendChild(counterPopup);
    
    // Fonction pour montrer/cacher le popup
    function toggleCounterPopup() {
        const isVisible = counterPopup.style.display === 'block';
        
        if (!isVisible) {
            counterPopup.style.display = 'block';
            setTimeout(() => {
                counterPopup.style.opacity = '1';
                counterPopup.style.transform = 'translateY(0)';
            }, 10);
        } else {
            counterPopup.style.opacity = '0';
            counterPopup.style.transform = 'translateY(-10px)';
            setTimeout(() => {
                counterPopup.style.display = 'none';
            }, 300);
        }
    }
    
    // Attendre que le dock soit prêt
    function waitForToolsDock(callback) {
        if (window.addToolToDock) {
            callback();
        } else {
            setTimeout(() => waitForToolsDock(callback), 100);
        }
    }
    
    // Ajouter le bouton au dock
    waitForToolsDock(() => {
        window.addToolToDock('📊', 'Statistiques', toggleCounterPopup, 'visitor-counter-btn');
    });
    
    // Fonction pour simuler l'incrémentation du nombre
    function animateCounterTo(targetNumber) {
        const counterNumber = counterPopup.querySelector('.counter-number');
        let currentNumber = 0;
        
        // Déterminer la vitesse d'incrémentation en fonction de la taille du nombre
        const speed = targetNumber > 1000 ? 50 : (targetNumber > 100 ? 30 : 10);
        
        // Définir la valeur de départ
        counterNumber.textContent = currentNumber;
        
        // Fonction d'animation
        const incrementCounter = () => {
            // Calculer l'incrément
            const increment = Math.ceil(targetNumber / 100);
            
            // Incrémenter
            currentNumber = Math.min(currentNumber + increment, targetNumber);
            
            // Mettre à jour l'affichage
            counterNumber.textContent = currentNumber;
            
            // Continuer jusqu'à atteindre la cible
            if (currentNumber < targetNumber) {
                setTimeout(incrementCounter, speed);
            }
        };
        
        // Commencer l'animation
        incrementCounter();
    }
    
    // Fonction pour obtenir le nombre de visiteurs
    function getVisitorCount() {
        // Dans un vrai site, vous utiliseriez une API ou un service de comptage
        // Pour l'exemple, nous allons simuler avec localStorage et générer un nombre aléatoire initial
        
        let count = parseInt(localStorage.getItem('visitorCount'), 10);

        if (!count || Number.isNaN(count)) {
            // Premier visiteur, générer un nombre aléatoire entre 1000 et 5000
            count = Math.floor(Math.random() * 4001) + 1000;
        }

        // N'incrémenter qu'une fois par session : sinon un simple F5
        // ferait grimper le compteur indéfiniment pour le même visiteur.
        if (!sessionStorage.getItem('visitorCounted')) {
            count += 1;
            localStorage.setItem('visitorCount', count.toString());
            sessionStorage.setItem('visitorCounted', '1');
        }

        return count;
    }
    
    // Récupérer et animer le compteur après un court délai
    setTimeout(() => {
        const visitorCount = getVisitorCount();
        animateCounterTo(visitorCount);
    }, 1500);
    
    // Ajouter des styles d'animation si nécessaire
    if (!document.querySelector('style[data-id="visitor-counter-styles"]')) {
        const styleEl = document.createElement('style');
        styleEl.setAttribute('data-id', 'visitor-counter-styles');
        styleEl.innerHTML = `
            @keyframes bounce {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-5px); }
            }
        `;
        document.head.appendChild(styleEl);
    }
    
    // Easter egg: en cliquant sur l'icône, changer l'émoji
    counterPopup.querySelector('.counter-icon').addEventListener('click', () => {
        currentEmojiIndex = (currentEmojiIndex + 1) % emojis.length;
        const counterIcon = counterPopup.querySelector('.counter-icon');
        
        // Effet de rotation lors du changement
        counterIcon.style.transition = 'transform 0.3s';
        counterIcon.style.transform = 'rotateY(90deg)';
        
        setTimeout(() => {
            counterIcon.textContent = emojis[currentEmojiIndex];
            counterIcon.style.transform = 'rotateY(0deg)';
        }, 150);
    });
})();