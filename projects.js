document.addEventListener('DOMContentLoaded', () => {
    let loadedProjects = null;

    // Charger les projets depuis le fichier JSON
    fetch('projects.json')
        .then(response => response.json())
        .then(data => {
            loadedProjects = data.projects;
            // Ajouter un peu de délai pour l'effet UwU
            setTimeout(() => {
                loadProjects(loadedProjects, { animate: true });
            }, 500);
        })
        .catch(error => console.error('Erreur lors du chargement des projets:', error));

    // Re-rendre les projets dans la langue courante quand elle change
    document.addEventListener('langchange', () => {
        if (loadedProjects) loadProjects(loadedProjects, { animate: false });
    });

    function text(key, fallback) {
        return (window.i18n && window.i18n.t(key)) || fallback;
    }

    // Fonction pour charger les projets dans le DOM
    function loadProjects(projects, { animate }) {
        const projectsSection = document.getElementById('projects');
        const projectsTitle = projectsSection.querySelector('h2');

        // Supprimer les projets existants pour éviter les doublons
        const existingProjects = projectsSection.querySelectorAll('.project');
        existingProjects.forEach(project => project.remove());

        const githubLabel = text('projects.viewGithub', 'Voir sur GitHub');
        const siteLabel = text('projects.viewSite', 'Voir le site');

        // Ajouter chaque projet du JSON, dans l'ordre du JSON
        let previousElement = projectsTitle;
        projects.forEach((project, index) => {
            const projectElement = document.createElement('div');
            projectElement.className = 'project';
            projectElement.style.animationDelay = `${index * 0.2}s`;

            const description = project.i18nKey
                ? text(`projects.${project.i18nKey}`, project.description)
                : project.description;

            // Contenu du projet
            projectElement.innerHTML = `
                <h3>${project.emoji} ${project.title}</h3>
                <p>${description}</p>
                <div class="project-tags">
                    ${project.technologies.map(tech => `<span class="tag">${tech}</span>`).join('')}
                </div>
                ${project.site ? `<a href="${project.site}" target="_blank" class="project-link">${siteLabel}</a>` : ''}
                <a href="${project.github}" target="_blank" class="project-link">${githubLabel}</a>
            `;

            previousElement.after(projectElement);
            previousElement = projectElement;
        });

        if (!animate) return;

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