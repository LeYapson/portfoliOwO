document.addEventListener('DOMContentLoaded', () => {
    // Charger les projets depuis le fichier JSON
    fetch('projects.json')
        .then(response => response.json())
        .then(data => {
            // Ajouter un peu de délai pour l'effet UwU
            setTimeout(() => {
                loadProjects(data.projects);
            }, 500);
        })
        .catch(error => console.error('Erreur lors du chargement des projets:', error));

    // Fonction pour charger les projets dans le DOM
    function loadProjects(projects) {
        const projectsSection = document.getElementById('projects');
        const projectsTitle = projectsSection.querySelector('h2');
        
        // Supprimer les projets existants pour éviter les doublons
        const existingProjects = projectsSection.querySelectorAll('.project');
        existingProjects.forEach(project => project.remove());
        
        // Ajouter chaque projet du JSON
        projects.forEach((project, index) => {
            const projectElement = document.createElement('div');
            projectElement.className = 'project';
            projectElement.style.animationDelay = `${index * 0.2}s`;
            
            // Contenu du projet
            projectElement.innerHTML = `
                <h3>${project.emoji} ${project.title}</h3>
                <p>${project.description}</p>
                <div class="project-tags">
                    ${project.technologies.map(tech => `<span class="tag">${tech}</span>`).join('')}
                </div>
                <a href="${project.github}" target="_blank" class="project-link">Voir sur GitHub</a>
            `;
            
            // Ajouter après le titre
            projectsTitle.after(projectElement);
        });
        
        // Ajouter un effet d'animation aux projets
        const projectElements = document.querySelectorAll('.project');
        projectElements.forEach((elem, index) => {
            elem.style.opacity = '0';
            elem.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                elem.style.transition = 'all 0.5s ease';
                elem.style.opacity = '1';
                elem.style.transform = 'translateY(0)';
            }, 100 + index * 200);
        });
    }
});