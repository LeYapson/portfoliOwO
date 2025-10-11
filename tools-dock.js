// tools-dock.js - Crée un dock pour les outils interactifs
(() => {
    // Créer le conteneur du dock
    const toolsDock = document.createElement('div');
    toolsDock.className = 'tools-dock';
    toolsDock.style.position = 'fixed';
    toolsDock.style.top = '20px';
    toolsDock.style.right = '20px';
    toolsDock.style.zIndex = '1010';
    toolsDock.style.display = 'flex';
    toolsDock.style.flexDirection = 'row';
    toolsDock.style.gap = '10px';
    toolsDock.style.padding = '8px';
    toolsDock.style.backgroundColor = 'rgba(255, 255, 255, 0.7)';
    toolsDock.style.borderRadius = '30px';
    toolsDock.style.boxShadow = '0 0 15px rgba(0, 0, 0, 0.1)';
    toolsDock.style.backdropFilter = 'blur(5px)';
    toolsDock.style.webkitBackdropFilter = 'blur(5px)';
    toolsDock.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
    
    // Ajouter le dock au document
    document.body.appendChild(toolsDock);
    
    // Fonction pour ajouter un outil au dock
    window.addToolToDock = function(icon, tooltip, onClick, id = null) {
        const toolButton = document.createElement('div');
        toolButton.className = 'tool-button';
        if (id) toolButton.id = id;
        
        toolButton.style.width = '40px';
        toolButton.style.height = '40px';
        toolButton.style.borderRadius = '50%';
        toolButton.style.backgroundColor = 'white';
        toolButton.style.display = 'flex';
        toolButton.style.alignItems = 'center';
        toolButton.style.justifyContent = 'center';
        toolButton.style.cursor = 'pointer';
        toolButton.style.fontSize = '1.5rem';
        toolButton.style.boxShadow = '0 0 5px rgba(0, 0, 0, 0.1)';
        toolButton.style.transition = 'transform 0.2s, box-shadow 0.2s';
        toolButton.style.position = 'relative';
        toolButton.innerHTML = icon;
        
        // Infobulle
        const tooltipElement = document.createElement('div');
        tooltipElement.className = 'tool-tooltip';
        tooltipElement.textContent = tooltip;
        tooltipElement.style.position = 'absolute';
        tooltipElement.style.top = 'calc(100% + 5px)';
        tooltipElement.style.left = '50%';
        tooltipElement.style.transform = 'translateX(-50%)';
        tooltipElement.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
        tooltipElement.style.color = 'white';
        tooltipElement.style.padding = '4px 8px';
        tooltipElement.style.borderRadius = '4px';
        tooltipElement.style.fontSize = '0.7rem';
        tooltipElement.style.whiteSpace = 'nowrap';
        tooltipElement.style.opacity = '0';
        tooltipElement.style.visibility = 'hidden';
        tooltipElement.style.transition = 'opacity 0.2s, visibility 0.2s';
        tooltipElement.style.zIndex = '1011';
        
        toolButton.appendChild(tooltipElement);
        
        // Effet au survol
        toolButton.addEventListener('mouseover', () => {
            toolButton.style.transform = 'scale(1.1)';
            toolButton.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.2)';
            tooltipElement.style.opacity = '1';
            tooltipElement.style.visibility = 'visible';
        });
        
        toolButton.addEventListener('mouseout', () => {
            toolButton.style.transform = 'scale(1)';
            toolButton.style.boxShadow = '0 0 5px rgba(0, 0, 0, 0.1)';
            tooltipElement.style.opacity = '0';
            tooltipElement.style.visibility = 'hidden';
        });
        
        // Clic
        if (onClick) {
            toolButton.addEventListener('click', onClick);
        }
        
        // Ajouter au dock
        toolsDock.appendChild(toolButton);
        return toolButton;
    };
    
    // Effet d'animation pour le dock au chargement
    toolsDock.style.opacity = '0';
    toolsDock.style.transform = 'translateY(-20px)';
    
    setTimeout(() => {
        toolsDock.style.opacity = '1';
        toolsDock.style.transform = 'translateY(0)';
    }, 500);
    
    // Effet pour masquer/afficher le dock lors du défilement
    let lastScrollPosition = 0;
    let isHidden = false;
    
    window.addEventListener('scroll', () => {
        const currentScrollPosition = window.pageYOffset;
        
        // Si on défile vers le bas et que le dock est visible
        if (currentScrollPosition > lastScrollPosition && !isHidden && currentScrollPosition > 100) {
            toolsDock.style.transform = 'translateY(-100px)';
            isHidden = true;
        } 
        // Si on défile vers le haut et que le dock est caché
        else if (currentScrollPosition < lastScrollPosition && isHidden) {
            toolsDock.style.transform = 'translateY(0)';
            isHidden = false;
        }
        
        lastScrollPosition = currentScrollPosition;
    });
})();