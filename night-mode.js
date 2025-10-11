// night-mode.js - Basculer entre le mode jour et nuit
(() => {
    // Ajouter la feuille de style pour le mode nuit
    if (!document.querySelector('link[href="night-mode.css"]')) {
        const linkElement = document.createElement('link');
        linkElement.rel = 'stylesheet';
        linkElement.href = 'night-mode.css';
        document.head.appendChild(linkElement);
    }
    
    // Attendre que la fonction addToolToDock soit disponible
    function waitForToolsDock(callback) {
        if (window.addToolToDock) {
            callback();
        } else {
            setTimeout(() => waitForToolsDock(callback), 100);
        }
    }
    
    // Créer l'icône du mode nuit et l'ajouter au dock
    let nightModeIcon;
    
    waitForToolsDock(() => {
        nightModeIcon = window.addToolToDock('🌙', 'Mode nuit', toggleNightMode, 'night-mode-toggle');
    });
    
    // Variables pour suivre l'état du mode
    let isNightMode = false;
    
    // Définir les couleurs pour le mode jour (variables CSS par défaut)
    const dayColors = {
        '--bg-color': '#6692af',
        '--text-color': '#5e3023',
        '--accent-color': '#ffb6c1',
        '--secondary-color': '#b5ead7',
        '--tertiary-color': '#e2d1f9',
        '--border-color': '#ffd1dc'
    };
    
    // Définir les couleurs pour le mode nuit
    const nightColors = {
        '--bg-color': '#1e2a38',
        '--text-color': '#e6c2b9',
        '--accent-color': '#de89a1',
        '--secondary-color': '#7cc2b1',
        '--tertiary-color': '#af97cc',
        '--border-color': '#de89a1'
    };
    
    // Fonction pour basculer le mode
    function toggleNightMode() {
        isNightMode = !isNightMode;
        
        // Mettre à jour l'icône
        nightModeIcon.innerHTML = isNightMode ? '☀️' : '🌙';
        
        // Appliquer les variables CSS appropriées
        const colors = isNightMode ? nightColors : dayColors;
        
        Object.entries(colors).forEach(([variable, value]) => {
            document.documentElement.style.setProperty(variable, value);
        });
        
        // Ajouter ou supprimer une classe pour d'autres ajustements CSS
        if (isNightMode) {
            document.body.classList.add('night-mode');
            
            // Changer l'image d'arrière-plan du ciel si disponible
            const skyLayer = document.getElementById('layer-sky');
            if (skyLayer) {
                // Ajouter une transition douce pour le changement d'image
                skyLayer.style.transition = 'background-image 1.5s ease-in-out';
                skyLayer.style.backgroundImage = 'url("assets/img/ciel_night.png")';
                // Sauvegarder l'ancienne image pour pouvoir revenir en arrière
                skyLayer.dataset.dayImage = 'url("assets/img/ciel.png")';
            }
            
            // Ajuster l'opacité des nuages pour le mode nuit
            const cloudsLayer = document.getElementById('layer-clouds');
            if (cloudsLayer) {
                cloudsLayer.style.transition = 'opacity 1.5s ease-in-out';
                cloudsLayer.style.opacity = '0.6'; // Nuages plus discrets la nuit
            }
            
            // Ajouter des étoiles scintillantes
            createStars();
            
        } else {
            document.body.classList.remove('night-mode');
            
            // Restaurer l'image d'arrière-plan du jour
            const skyLayer = document.getElementById('layer-sky');
            if (skyLayer && skyLayer.dataset.dayImage) {
                skyLayer.style.backgroundImage = skyLayer.dataset.dayImage;
            }
            
            // Restaurer l'opacité normale des nuages pour le mode jour
            const cloudsLayer = document.getElementById('layer-clouds');
            if (cloudsLayer) {
                cloudsLayer.style.opacity = '0.9'; // Valeur originale du CSS
            }
            
            // Supprimer les étoiles
            removeStars();
        }
        
        // Stocker la préférence dans localStorage
        localStorage.setItem('nightMode', isNightMode ? 'true' : 'false');
        
        // Annoncer le changement pour l'accessibilité
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.style.position = 'absolute';
        announcement.style.width = '1px';
        announcement.style.height = '1px';
        announcement.style.overflow = 'hidden';
        announcement.textContent = isNightMode ? 'Mode nuit activé' : 'Mode jour activé';
        document.body.appendChild(announcement);
        
        setTimeout(() => {
            announcement.remove();
        }, 1000);
    }
    
    // Fonction pour créer des étoiles scintillantes
    function createStars() {
        // Supprimer les étoiles existantes
        removeStars();
        
        const skyLayer = document.getElementById('layer-sky');
        if (!skyLayer) return;
        
        // Créer entre 30 et 50 étoiles
        const starCount = Math.floor(Math.random() * 20) + 30;
        
        for (let i = 0; i < starCount; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            
            // Positionner aléatoirement
            const top = Math.random() * 100;
            const left = Math.random() * 100;
            
            // Taille aléatoire
            const size = Math.random() * 3 + 1;
            
            // Délai d'animation aléatoire
            const delay = Math.random() * 5;
            
            star.style.top = `${top}%`;
            star.style.left = `${left}%`;
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;
            star.style.animationDelay = `${delay}s`;
            
            skyLayer.appendChild(star);
        }
    }
    
    // Fonction pour supprimer toutes les étoiles
    function removeStars() {
        const stars = document.querySelectorAll('.star');
        stars.forEach(star => star.remove());
    }
    
    // Attacher l'événement au clic
    nightModeIcon.addEventListener('click', toggleNightMode);
    
    // Vérifier et appliquer la préférence stockée
    document.addEventListener('DOMContentLoaded', () => {
        const storedPreference = localStorage.getItem('nightMode');
        if (storedPreference === 'true') {
            // Déjà en mode nuit, donc on doit basculer pour appliquer
            toggleNightMode();
        }
    });
})();