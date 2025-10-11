// virtual-pets.js - Collection de petits animaux virtuels kawaii
(() => {
    // Définitions des animaux
    const pets = [
        {
            name: "Mochi",
            type: "chat",
            icon: "🐱",
            color: "#ffb6c1",
            traits: ["curieux", "joueur", "câlin"],
            sounds: ["meow~", "purr purr~", "nya~"],
            foods: ["poisson", "lait", "croquettes"]
        },
        {
            name: "Boba",
            type: "chien",
            icon: "🐶",
            color: "#b5ead7",
            traits: ["loyal", "énergique", "affectueux"],
            sounds: ["woof~", "arf arf~", "awoo~"],
            foods: ["os", "croquettes", "friandises"]
        },
        {
            name: "Mochi",
            type: "lapin",
            icon: "🐰",
            color: "#e2d1f9",
            traits: ["timide", "doux", "rapide"],
            sounds: ["sniff sniff~", "*silence*", "squeak~"],
            foods: ["carottes", "salade", "pommes"]
        },
        {
            name: "Donut",
            type: "hamster",
            icon: "🐹",
            color: "#ffdac1",
            traits: ["actif la nuit", "collectionneur", "mignon"],
            sounds: ["squeak~", "*grignotement*", "pip pip~"],
            foods: ["graines", "légumes", "fruits"]
        },
        {
            name: "Pixel",
            type: "renard",
            icon: "🦊",
            color: "#ff9aa2",
            traits: ["rusé", "élégant", "mystérieux"],
            sounds: ["yip~", "ding ding~", "*reniflement*"],
            foods: ["baies", "œufs", "souris"]
        }
    ];
    
    // Niveau d'humeur et de faim (initialement à 50%)
    const petStats = {};
    
    // Fonction pour initialiser la section des animaux virtuels
    function initVirtualPets() {
        const container = document.getElementById('virtual-pets');
        if (!container) return;
        
        // Création des cartes d'animaux
        pets.forEach(pet => {
            // Initialisation des statistiques pour cet animal
            petStats[pet.name] = {
                mood: 50 + Math.floor(Math.random() * 30),
                hunger: 50 + Math.floor(Math.random() * 30),
                lastInteraction: Date.now()
            };
            
            // Création de la carte
            const petCard = document.createElement('div');
            petCard.className = 'pet-card';
            petCard.style.borderColor = pet.color;
            
            petCard.innerHTML = `
                <div class="pet-icon" style="background-color: ${pet.color}20;">
                    <span>${pet.icon}</span>
                </div>
                <div class="pet-info">
                    <h3>${pet.name}</h3>
                    <p class="pet-type">${pet.type}</p>
                    <div class="pet-stats">
                        <div class="stat">
                            <span>humeur</span>
                            <div class="progress-bar">
                                <div class="progress mood" style="width: ${petStats[pet.name].mood}%;"></div>
                            </div>
                        </div>
                        <div class="stat">
                            <span>faim</span>
                            <div class="progress-bar">
                                <div class="progress hunger" style="width: ${petStats[pet.name].hunger}%;"></div>
                            </div>
                        </div>
                    </div>
                    <div class="pet-actions">
                        <button class="pet-btn pet-btn-play" data-pet="${pet.name}">jouer</button>
                        <button class="pet-btn pet-btn-feed" data-pet="${pet.name}">nourrir</button>
                        <button class="pet-btn pet-btn-pet" data-pet="${pet.name}">caresser</button>
                    </div>
                    <div class="pet-message"></div>
                </div>
            `;
            
            container.appendChild(petCard);
            
            // Ajout des écouteurs d'événements pour les boutons
            const playBtn = petCard.querySelector('.pet-btn-play');
            const feedBtn = petCard.querySelector('.pet-btn-feed');
            const petBtn = petCard.querySelector('.pet-btn-pet');
            const petMessage = petCard.querySelector('.pet-message');
            
            // Événements d'interaction
            playBtn.addEventListener('click', () => {
                const stats = petStats[pet.name];
                stats.mood = Math.min(100, stats.mood + 15);
                stats.hunger = Math.max(0, stats.hunger - 10);
                stats.lastInteraction = Date.now();
                updatePetStats(petCard, pet.name);
                
                // Afficher un message aléatoire
                showPetMessage(petMessage, `${pet.sounds[Math.floor(Math.random() * pet.sounds.length)]} On s'amuse!`);
                
                // Animation
                const icon = petCard.querySelector('.pet-icon span');
                icon.classList.add('bounce');
                setTimeout(() => icon.classList.remove('bounce'), 1000);
            });
            
            feedBtn.addEventListener('click', () => {
                const stats = petStats[pet.name];
                stats.hunger = Math.min(100, stats.hunger + 20);
                stats.mood = Math.min(100, stats.mood + 5);
                stats.lastInteraction = Date.now();
                updatePetStats(petCard, pet.name);
                
                // Afficher un message aléatoire avec une nourriture favorite
                const food = pet.foods[Math.floor(Math.random() * pet.foods.length)];
                showPetMessage(petMessage, `Miam, ${food}! Délicieux~`);
                
                // Animation
                const icon = petCard.querySelector('.pet-icon span');
                icon.classList.add('wiggle');
                setTimeout(() => icon.classList.remove('wiggle'), 1000);
            });
            
            petBtn.addEventListener('click', () => {
                const stats = petStats[pet.name];
                stats.mood = Math.min(100, stats.mood + 10);
                stats.lastInteraction = Date.now();
                updatePetStats(petCard, pet.name);
                
                // Afficher un message aléatoire
                showPetMessage(petMessage, `${pet.sounds[Math.floor(Math.random() * pet.sounds.length)]} Ronron~`);
                
                // Animation
                const icon = petCard.querySelector('.pet-icon span');
                icon.classList.add('pulse');
                setTimeout(() => icon.classList.remove('pulse'), 1000);
            });
            
            // Mise à jour périodique des statistiques (diminution naturelle)
            setInterval(() => {
                const stats = petStats[pet.name];
                // Diminution plus rapide si cela fait longtemps qu'on n'a pas interagi
                const timeFactor = Math.min(3, (Date.now() - stats.lastInteraction) / (1000 * 60 * 60) + 1);
                
                stats.mood = Math.max(0, stats.mood - 0.2 * timeFactor);
                stats.hunger = Math.max(0, stats.hunger - 0.15 * timeFactor);
                updatePetStats(petCard, pet.name);
            }, 30000); // Mise à jour toutes les 30 secondes
        });
    }
    
    // Fonction pour mettre à jour les barres de progression des statistiques
    function updatePetStats(petCard, petName) {
        const stats = petStats[petName];
        const moodBar = petCard.querySelector('.mood');
        const hungerBar = petCard.querySelector('.hunger');
        
        moodBar.style.width = `${stats.mood}%`;
        hungerBar.style.width = `${stats.hunger}%`;
        
        // Changer la couleur selon le niveau
        if (stats.mood < 30) {
            moodBar.style.backgroundColor = '#ff9aa2'; // Rouge pastel pour mauvaise humeur
        } else if (stats.mood > 70) {
            moodBar.style.backgroundColor = '#b5ead7'; // Vert pastel pour bonne humeur
        } else {
            moodBar.style.backgroundColor = '#fdfd96'; // Jaune pastel pour humeur moyenne
        }
        
        if (stats.hunger < 30) {
            hungerBar.style.backgroundColor = '#ff9aa2'; // Rouge pastel pour très faim
        } else if (stats.hunger > 70) {
            hungerBar.style.backgroundColor = '#b5ead7'; // Vert pastel pour bien nourri
        } else {
            hungerBar.style.backgroundColor = '#fdfd96'; // Jaune pastel pour faim moyenne
        }
    }
    
    // Fonction pour afficher un message temporaire
    function showPetMessage(element, message) {
        element.textContent = message;
        element.classList.add('show');
        
        setTimeout(() => {
            element.classList.remove('show');
        }, 3000);
    }
    
    // Initialisation une fois que le DOM est chargé
    document.addEventListener('DOMContentLoaded', initVirtualPets);
})();
