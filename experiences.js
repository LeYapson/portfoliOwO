document.addEventListener('DOMContentLoaded', () => {
    // Charger les expériences depuis le fichier JSON
    fetch('experiences.json')
        .then(response => response.json())
        .then(data => {
            // Ajouter un peu de délai pour l'effet UwU
            setTimeout(() => {
                enhanceExperiences(data.experiences);
            }, 500);
        })
        .catch(error => console.error('Erreur lors du chargement des expériences:', error));

    // Fonction pour améliorer l'affichage des expériences
    function enhanceExperiences(experiences) {
        const experiencesSection = document.getElementById('experiences');
        const timeline = experiencesSection.querySelector('.experience-timeline');
        
        // Vérifier si le timeline existe déjà
        if (!timeline) return;
        
        // Créer un mapping entre les titres et les types
        const experienceMapping = {
            // Professionnels
            'Ingénieur Études et Développement': 'professional',
            'Mentor Junior Informatique': 'professional',
            'Développeur Web Front-end': 'professional',
            
            // Formations
            'Licence Informatique': 'education',
            'Licence en Électronique, Électrotechnique et Automatisation': 'education',
            
            // Projets
            'Fondateur & Organisateur': 'project',
            'Développeur Indépendant': 'project'
        };
        
        // Parcourir chaque expérience et ajouter des éléments interactifs
        const experienceItems = document.querySelectorAll('.experience-item');
        
        experienceItems.forEach((item, index) => {
            const content = item.querySelector('.experience-content');
            const title = content.querySelector('h3');
            
            if (!title) return;
            
            // Déterminer le type d'expérience en fonction du titre
            const expTitle = title.textContent.trim();
            const type = experienceMapping[expTitle] || 'professional';
            
            // Trouver les compétences correspondantes dans le JSON
            let skills = [];
            let matchingExp = experiences.find(exp => exp.title === expTitle);
            if (matchingExp) {
                skills = matchingExp.skills || [];
            }
            
            // Ajouter un badge pour le type d'expérience
            const typeDiv = document.createElement('div');
            typeDiv.className = `experience-type ${type}`;
            
            let typeText = "";
            switch (type) {
                case "professional":
                    typeText = "Professionnel";
                    break;
                case "project":
                    typeText = "Projet Personnel";
                    break;
                case "education":
                    typeText = "Formation";
                    break;
            }
            
            typeDiv.textContent = typeText;
            content.prepend(typeDiv);
            
            // Ajouter les compétences si disponibles
            if (skills.length > 0) {
                const skillsDiv = document.createElement('div');
                skillsDiv.className = 'experience-skills';
                skillsDiv.innerHTML = `
                    <div class="skills-wrapper">
                        ${skills.map(skill => `<span class="skill-badge">${skill}</span>`).join('')}
                    </div>
                `;
                content.appendChild(skillsDiv);
            }
            
            // Ajouter des émojis en fonction du type d'expérience
            let emoji = "";
            switch (type) {
                case "professional":
                    emoji = "👨‍💻 ";
                    break;
                case "project":
                    emoji = "🚀 ";
                    break;
                case "education":
                    emoji = "🎓 ";
                    break;
            }
            
            title.innerHTML = emoji + expTitle;
            
            // Ajouter une animation d'apparition
            item.style.opacity = '0';
            item.style.transform = 'translateX(-20px)';
            
            setTimeout(() => {
                item.style.transition = 'all 0.5s ease';
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            }, 100 + index * 200);
        });
        
        // Ajouter des petites étoiles kawaii sur la timeline
        const starColors = ['#ffb6c1', '#b5ead7', '#e2d1f9'];
        for (let i = 0; i < 5; i++) {
            const star = document.createElement('span');
            star.className = 'timeline-star';
            star.innerHTML = '✦';
            star.style.top = `${15 + i * 20}%`;
            star.style.left = `${-5 + Math.random() * 10}px`;
            star.style.color = starColors[Math.floor(Math.random() * starColors.length)];
            star.style.opacity = '0.6';
            star.style.fontSize = `${0.5 + Math.random() * 0.3}rem`;
            star.style.animationDuration = `${2 + Math.random() * 3}s`;
            timeline.appendChild(star);
        }
    }
});