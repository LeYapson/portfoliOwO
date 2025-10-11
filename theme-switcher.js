// theme-switcher.js - Sélecteur de thèmes kawaii
(() => {
    // Définir les thèmes disponibles
    const themes = [
        {
            name: "Pastel",
            colors: {
                bgColor: "#6692af",
                textColor: "#5e3023",
                accentColor: "#ffb6c1",
                secondaryColor: "#b5ead7",
                tertiaryColor: "#e2d1f9",
                borderColor: "#ffd1dc"
            },
            emoji: "🌸"
        },
        {
            name: "Pastel Nuit",
            colors: {
                bgColor: "#2a2d45",
                textColor: "#e8e6f0",
                accentColor: "#c79fe6",
                secondaryColor: "#84a9c0",
                tertiaryColor: "#9c89b8",
                borderColor: "#a6c7ff"
            },
            emoji: "🌙"
        },
        {
            name: "Bonbon",
            colors: {
                bgColor: "#ff9fb1",
                textColor: "#4f2222",
                accentColor: "#90d1ff",
                secondaryColor: "#f9ff8b",
                tertiaryColor: "#c5ff9b",
                borderColor: "#ffcbf2"
            },
            emoji: "🍭"
        },
        {
            name: "Pixel Rétro",
            colors: {
                bgColor: "#5f574f",
                textColor: "#fff9e0",
                accentColor: "#83c458",
                secondaryColor: "#e7879a",
                tertiaryColor: "#8b9bb4",
                borderColor: "#f9c22e"
            },
            emoji: "👾"
        }
    ];
    
    // Créer le sélecteur de thèmes
    const themeSwitcher = document.createElement('div');
    themeSwitcher.className = 'theme-switcher';
    themeSwitcher.innerHTML = '🎨';
    
    const themeOptions = document.createElement('div');
    themeOptions.className = 'theme-options';
    
    // Ajouter les options de thèmes
    themes.forEach(theme => {
        const option = document.createElement('div');
        option.className = 'theme-option';
        option.innerHTML = `
            <span class="color-sample" style="background-color: ${theme.colors.accentColor};"></span>
            <span>${theme.emoji} ${theme.name}</span>
        `;
        
        // Événement de clic pour changer de thème
        option.addEventListener('click', (e) => {
            e.stopPropagation(); // Empêcher la propagation du clic
            applyTheme(theme.colors);
            saveTheme(theme.name);
            // Fermer le menu après la sélection
            themeSwitcher.classList.remove('theme-show');
            console.log('Theme applied:', theme.name);
        });
        
        themeOptions.appendChild(option);
    });
    
    themeSwitcher.appendChild(themeOptions);
    document.body.appendChild(themeSwitcher);
    
    // S'assurer que le sélecteur de thème est cliquable
    themeSwitcher.style.pointerEvents = 'auto';
    themeOptions.style.pointerEvents = 'auto';
    themeSwitcher.style.cursor = 'pointer';
    
    // Ouvrir/fermer le menu de thèmes (encore optimisé)
    themeSwitcher.addEventListener('click', (e) => {
        e.stopPropagation(); // Empêche la propagation du clic
        
        // Si le clic est sur le bouton principal et pas sur le menu des options
        if (e.target === themeSwitcher || e.target.tagName === 'SPAN' && e.target.parentNode === themeSwitcher) {
            themeSwitcher.classList.toggle('theme-show');
            console.log('Theme switcher clicked, toggling menu');
        }
    });
    
    // Fermer le menu si on clique ailleurs
    document.addEventListener('click', (e) => {
        if (!themeSwitcher.contains(e.target)) {
            themeSwitcher.classList.remove('theme-show');
        }
    });
    
    // Appliquer un thème
    function applyTheme(colors) {
        Object.entries(colors).forEach(([key, value]) => {
            document.documentElement.style.setProperty(`--${key}`, value);
        });
    }
    
    // Sauvegarder le thème choisi
    function saveTheme(themeName) {
        localStorage.setItem('uwuTheme', themeName);
    }
    
    // Charger le thème sauvegardé
    function loadSavedTheme() {
        const savedTheme = localStorage.getItem('uwuTheme');
        if (savedTheme) {
            const theme = themes.find(t => t.name === savedTheme);
            if (theme) {
                applyTheme(theme.colors);
            }
        }
    }
    
    // Charger le thème sauvegardé au chargement de la page
    loadSavedTheme();
    
    // Animation au survol
    themeSwitcher.addEventListener('mouseover', () => {
        themeSwitcher.style.transform = `rotate(${Math.random() * 20 - 10}deg)`;
    });
    
    themeSwitcher.addEventListener('mouseout', () => {
        themeSwitcher.style.transform = 'rotate(0)';
    });
})();
