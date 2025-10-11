// mood-meter.js - Pèse-émotion kawaii pour recueillir les sentiments des visiteurs
(() => {
    // Configuration
    const moods = [
        { emoji: '😊', name: 'Heureux', color: '#ffb6c1', bgColor: '#ffe8ec' },
        { emoji: '🥰', name: 'Amoureux', color: '#ff8fab', bgColor: '#ffe0e9' },
        { emoji: '😴', name: 'Fatigué', color: '#a0c4ff', bgColor: '#e0eaff' },
        { emoji: '🤔', name: 'Pensif', color: '#9bf6ff', bgColor: '#e0fcff' },
        { emoji: '😭', name: 'Triste', color: '#caffbf', bgColor: '#eafde6' }
    ];
    
    let currentMood = null;
    let isOpen = false;
    let moodButton;
    
    // Créer le conteneur du pèse-émotion
    const moodContainer = document.createElement('div');
    moodContainer.className = 'mood-meter-container';
    moodContainer.style.position = 'fixed';
    moodContainer.style.top = '80px';
    moodContainer.style.right = '20px';
    moodContainer.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
    moodContainer.style.padding = '15px';
    moodContainer.style.borderRadius = '15px';
    moodContainer.style.boxShadow = '0 0 20px rgba(0, 0, 0, 0.15)';
    moodContainer.style.width = '250px';
    moodContainer.style.fontFamily = "'Comic Neue', cursive";
    moodContainer.style.zIndex = '1021';
    moodContainer.style.display = 'none';
    moodContainer.style.opacity = '0';
    moodContainer.style.transform = 'translateY(-10px)';
    moodContainer.style.transition = 'opacity 0.3s, transform 0.3s';
    
    // Contenu du pèse-émotion
    moodContainer.innerHTML = `
        <div style="text-align: center; margin-bottom: 15px; color: var(--text-color);">
            <h3 style="margin: 0 0 8px; font-family: 'Press Start 2P', monospace; font-size: 0.9rem;">Comment te sens-tu ?</h3>
            <p style="margin: 0; font-size: 0.85rem;">Choisis ton humeur du moment !</p>
        </div>
        <div class="mood-options" style="display: flex; flex-wrap: wrap; justify-content: center; gap: 8px;"></div>
        <div class="mood-message" style="text-align: center; margin-top: 15px; min-height: 40px; font-size: 0.85rem; color: var(--text-color);"></div>
    `;
    
    document.body.appendChild(moodContainer);
    
    // Récupérer les éléments d'interface
    const moodOptions = moodContainer.querySelector('.mood-options');
    const moodMessage = moodContainer.querySelector('.mood-message');
    
    // Fonction pour ouvrir/fermer le pèse-émotion
    function toggleMoodMeter() {
        isOpen = !isOpen;
        
        if (isOpen) {
            moodContainer.style.display = 'block';
            setTimeout(() => {
                moodContainer.style.opacity = '1';
                moodContainer.style.transform = 'translateY(0)';
            }, 10);
        } else {
            moodContainer.style.opacity = '0';
            moodContainer.style.transform = 'translateY(-10px)';
            setTimeout(() => {
                moodContainer.style.display = 'none';
            }, 300);
        }
    }
    
    // Fonction pour sélectionner une humeur
    function selectMood(mood) {
        currentMood = mood;
        
        // Sauvegarder l'humeur dans localStorage
        localStorage.setItem('selectedMood', JSON.stringify(mood));
        
        // Mettre à jour l'interface
        if (moodButton) {
            const tooltipElement = moodButton.querySelector('.tool-tooltip');
            if (tooltipElement) tooltipElement.textContent = mood.name;
            
            // Changer l'emoji du bouton dans le dock
            const moodButtonInner = moodButton.childNodes[0];
            if (moodButtonInner && moodButtonInner.nodeType === 3) { // 3 = TEXT_NODE
                moodButtonInner.nodeValue = mood.emoji;
            } else {
                moodButton.innerHTML = mood.emoji + moodButton.innerHTML.substring(moodButton.innerHTML.indexOf('<'));
            }
        }
        
        moodMessage.innerHTML = `
            <div style="font-weight: bold; color: ${mood.color};">Tu te sens ${mood.name} !</div>
            <p style="margin: 5px 0 0;">Merci pour ton retour ! 💖</p>
        `;
        
        // Appliquer un léger changement de style à la page en fonction de l'humeur
        const content = document.querySelector('.content');
        if (content) {
            content.style.boxShadow = `0 5px 25px ${mood.color}30`;
            content.style.borderColor = mood.color;
        }
        
        // Fermer le pèse-émotion après un moment
        setTimeout(() => {
            toggleMoodMeter();
        }, 2000);
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
        // On utilise l'emoji actuel si disponible, sinon l'emoji par défaut
        const savedMood = localStorage.getItem('selectedMood');
        const initialEmoji = savedMood ? JSON.parse(savedMood).emoji : '💭';
        moodButton = window.addToolToDock(initialEmoji, 'Humeur', toggleMoodMeter, 'mood-meter-btn');
    });
    
    // Remplir les options d'humeur
    moods.forEach(mood => {
        const option = document.createElement('div');
        option.className = 'mood-option';
        option.setAttribute('data-mood', mood.name);
        option.style.width = '45px';
        option.style.height = '45px';
        option.style.borderRadius = '50%';
        option.style.backgroundColor = mood.bgColor;
        option.style.color = mood.color;
        option.style.display = 'flex';
        option.style.alignItems = 'center';
        option.style.justifyContent = 'center';
        option.style.fontSize = '1.8rem';
        option.style.cursor = 'pointer';
        option.style.transition = 'transform 0.2s';
        option.style.boxShadow = `0 0 5px ${mood.color}80`;
        option.innerHTML = mood.emoji;
        
        // Effet au survol
        option.addEventListener('mouseover', () => {
            option.style.transform = 'scale(1.1)';
        });
        
        option.addEventListener('mouseout', () => {
            option.style.transform = 'scale(1)';
        });
        
        // Sélection de l'humeur
        option.addEventListener('click', () => {
            selectMood(mood);
        });
        
        moodOptions.appendChild(option);
    });
    
    // Vérifier si une humeur a déjà été sélectionnée
    document.addEventListener('DOMContentLoaded', () => {
        const savedMood = localStorage.getItem('selectedMood');
        if (savedMood) {
            const mood = JSON.parse(savedMood);
            currentMood = mood;
            
            // Appliquer le style correspondant
            const content = document.querySelector('.content');
            if (content) {
                content.style.boxShadow = `0 5px 25px ${mood.color}30`;
                content.style.borderColor = mood.color;
            }
        }
    });
})();