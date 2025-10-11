// mascot.js - Petit compagnon kawaii qui suit le curseur
(() => {
    // Créer l'élément mascotte
    const mascot = document.createElement('div');
    mascot.className = 'kawaii-mascot';
    // Positionner la mascotte en bas à gauche de l'écran
    mascot.style.left = '20px';
    mascot.style.right = 'auto';
    mascot.style.bottom = '180px'; // Au-dessus du sol pour être bien visible
    
    // États de la mascotte - version simplifiée pour éviter les débordements
    const states = {
        normal: '(◕ᴗ◕✿)',
        happy: '(≧◡≦)',
        excited: '(づ◕◡◕)づ',
        surprised: '(⊙.⊙)',
        sleeping: '(ᴗ.ᴗ)zzz'
    };
    
    // État actuel
    let currentState = 'normal';
    let isResting = false;
    let lastMoved = Date.now();
    let position = { x: 0, y: 0 };
    let target = { x: 0, y: 0 };
    let isPointing = false;
    let lastStateChange = Date.now();
    
    // Initialiser la mascotte
    mascot.innerHTML = `
        <div class="mascot-speech-bubble">Coucou !</div>
        <div class="mascot-face">${states[currentState]}</div>
    `;
    document.body.appendChild(mascot);
    
    const speechBubble = mascot.querySelector('.mascot-speech-bubble');
    const mascotFace = mascot.querySelector('.mascot-face');
    
    // Messages aléatoires que la mascotte peut dire
    const randomMessages = [
        "Bienvenue sur mon portfolio! (◕‿◕✿)",
        "Tu aimes les couleurs? Moi aussi! ♥",
        "Clique sur mes projets, ils sont kawaii!",
        "J'adore les pixels et le pastel! ✨",
        "Tu veux être mon ami? ♡( ◡‿◡ )",
        "Merci d'être passé! (ノ◕ヮ◕)ノ*:･ﾟ✧",
        "Explore mon petit monde! ⭐",
        "Ce portfolio est fait avec amour! 💕"
    ];
    
    // Montrer un message aléatoire toutes les 20-30 secondes
    function showRandomMessage() {
        if (Math.random() > 0.7 && Date.now() - lastStateChange > 5000) {
            speechBubble.textContent = randomMessages[Math.floor(Math.random() * randomMessages.length)];
            speechBubble.classList.add('visible');
            
            // Changer l'état à excité quand parle
            changeState('excited');
            
            setTimeout(() => {
                speechBubble.classList.remove('visible');
                changeState('normal');
            }, 5000);
        }
    }
    
    // Changer l'état de la mascotte
    function changeState(state) {
        if (state !== currentState) {
            currentState = state;
            mascotFace.textContent = states[currentState];
            lastStateChange = Date.now();
        }
    }
    
    // Animation de suivi fluide
    function updatePosition() {
        // Calculer la distance entre la position actuelle et la cible
        const dx = target.x - position.x;
        const dy = target.y - position.y;
        
        // Si la mascotte n'a pas bougé depuis un moment, elle s'endort
        if (Date.now() - lastMoved > 10000 && !isResting) {
            changeState('sleeping');
            isResting = true;
        }
        
        // Si la distance est significative, déplacer la mascotte
        if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
            position.x += dx * 0.05; // Mouvement plus lent pour plus de fluidité
            position.y += dy * 0.05;
            lastMoved = Date.now();
            
            // Réveiller la mascotte si elle dormait
            if (isResting) {
                isResting = false;
                changeState('surprised');
                setTimeout(() => changeState('normal'), 1000);
            }
        }
        
        // Limiter la position verticale pour ne pas descendre trop bas
        position.y = Math.min(position.y, window.innerHeight - 250);
        
        // Appliquer la position - enlève la translation en Y pour garder la mascotte à position fixe verticalement
        mascot.style.transform = `translateX(${position.x - 50}px)`;
        
        // Planifier la prochaine mise à jour
        requestAnimationFrame(updatePosition);
    }
    
    // Démarrer l'animation
    updatePosition();
    
    // Suivre le curseur
    document.addEventListener('mousemove', (e) => {
        target.x = e.clientX;
        target.y = e.clientY;
        
        // Si la souris s'approche du bord de l'écran, la mascotte pointe dans cette direction
        const edgeDistance = 100;
        if (e.clientX < edgeDistance) {
            if (!isPointing) {
                speechBubble.textContent = "Par ici !";
                speechBubble.classList.add('visible');
                isPointing = true;
            }
        } else if (e.clientX > window.innerWidth - edgeDistance) {
            if (!isPointing) {
                speechBubble.textContent = "Regarde par là !";
                speechBubble.classList.add('visible');
                isPointing = true;
            }
        } else if (isPointing) {
            speechBubble.classList.remove('visible');
            isPointing = false;
        }
    });
    
    // Réactions aux clics
    document.addEventListener('click', (e) => {
        const element = document.elementFromPoint(e.clientX, e.clientY);
        
        // Si l'utilisateur clique sur un lien ou bouton
        if (element.tagName === 'A' || element.tagName === 'BUTTON') {
            speechBubble.textContent = "Bonne exploration! ✨";
            changeState('happy');
        } else if (element === mascot || mascot.contains(element)) {
            // Si l'utilisateur clique sur la mascotte
            speechBubble.textContent = "Hihi, ça chatouille! (≧◡≦)";
            changeState('happy');
        } else {
            // Réaction aléatoire aux autres clics
            const reactions = ["Ooh!", "Intéressant!", "Clicky clicky~", "Ooo, qu'est-ce que c'est?"];
            speechBubble.textContent = reactions[Math.floor(Math.random() * reactions.length)];
            changeState('surprised');
        }
        
        speechBubble.classList.add('visible');
        setTimeout(() => {
            speechBubble.classList.remove('visible');
            changeState('normal');
        }, 3000);
    });
    
    // Afficher des messages aléatoires périodiquement
    setInterval(showRandomMessage, 25000);
    
    // Easter egg : quand l'utilisateur tape "uwu"
    let keyBuffer = "";
    document.addEventListener('keydown', (e) => {
        keyBuffer += e.key.toLowerCase();
        keyBuffer = keyBuffer.slice(-3); // Garde uniquement les 3 dernières touches
        
        if (keyBuffer === "uwu") {
            speechBubble.textContent = "UwU intensifies! 💕✨";
            speechBubble.classList.add('visible');
            changeState('excited');
            
            // Faire apparaître des étoiles et coeurs partout
            for (let i = 0; i < 20; i++) {
                const emoji = document.createElement('div');
                emoji.className = 'floating-emoji';
                emoji.textContent = ["✨", "💕", "💖", "🌟", "⭐", "🌸", "✿"][Math.floor(Math.random() * 7)];
                emoji.style.left = `${Math.random() * 100}%`;
                emoji.style.top = `${Math.random() * 100}%`;
                document.body.appendChild(emoji);
                
                setTimeout(() => {
                    emoji.remove();
                }, 3000 + Math.random() * 2000);
            }
            
            setTimeout(() => {
                speechBubble.classList.remove('visible');
                changeState('normal');
            }, 5000);
        }
    });
})();
