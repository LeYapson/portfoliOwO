document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('projects-grid');
    if (!grid) return;
    let projects = [];

    const text = (key, fallback) => (window.i18n && window.i18n.t(key)) || fallback;

    function render() {
        const githubLabel = text('projects.viewGithub', 'GitHub');
        const siteLabel = text('projects.viewSite', 'Voir le site');
        const zoomLabel = text('projects.zoom', "Agrandir l'image");

        grid.innerHTML = projects.map(project => {
            const description = project.i18nKey
                ? text(`projects.${project.i18nKey}`, project.description)
                : project.description;
            const status = project.status
                ? `<span class="status status-${project.status}">${text(`projects.status.${project.status}`, project.status)}</span>`
                : '';
            const lang = (window.i18n && window.i18n.currentLang()) || 'fr';
            const shots = project.images
                ? `<div class="shots">${project.images.map(img => `<button type="button" class="shot" aria-label="${zoomLabel}"><img src="${img.src}" alt="${img.alt[lang] || img.alt.fr}" loading="lazy"></button>`).join('')}</div>`
                : '';
            const links = [
                project.site && `<a href="${project.site}" target="_blank" rel="noopener">${siteLabel}</a>`,
                project.github && `<a href="${project.github}" target="_blank" rel="noopener">${githubLabel}</a>`,
            ].filter(Boolean).join('');

            return `
                <article class="project${project.featured ? ' featured' : ''}">
                    ${shots}
                    <div class="project-head">
                        <h3>${project.title}</h3>
                        ${status}
                    </div>
                    <p>${description}</p>
                    <div class="tags">${project.technologies.map(t => `<span class="tag">${t}</span>`).join('')}</div>
                    ${links ? `<div class="project-links">${links}</div>` : ''}
                </article>`;
        }).join('');
    }

    // Lightbox : clic sur une image pour l'agrandir
    const box = document.createElement('dialog');
    box.className = 'lightbox';
    box.innerHTML = '<button type="button" class="lightbox-close" aria-label="Fermer">✕</button><img alt="">';
    document.body.appendChild(box);
    const boxImg = box.querySelector('img');

    grid.addEventListener('click', e => {
        const img = e.target.closest('.shot img');
        if (!img) return;
        boxImg.src = img.src;
        boxImg.alt = img.alt;
        box.showModal();
    });
    box.addEventListener('click', () => box.close());

    fetch('projects.json')
        .then(res => res.json())
        .then(data => { projects = data.projects; render(); })
        .catch(err => console.error('Erreur lors du chargement des projets:', err));

    document.addEventListener('langchange', render);
});
