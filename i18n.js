// i18n.js - Bascule FR / EN.
// data-i18n="<clé>"              -> innerHTML
// data-i18n-title="<clé>"        -> attribut title
// data-i18n-content="<clé>"      -> attribut content (meta)
(() => {
    const dict = {
        fr: {
            'meta.title': 'Théau Yapi | Portfolio',
            'meta.description': "Portfolio de Théau Yapi — développeur, streamer et organisateur d'événements.",
            'header.links': 'Tous mes liens',
            'tagline': "développeur · streamer · organisateur d'événements",
            'now': "Je développe NomadIDE, un IDE dédié à l'IoT, sur PC et mobile.",

            'available': 'CDI · dès oct. 2027',
            'cta.contact': 'ME CONTACTER',
            'nav.about': 'à propos',
            'nav.projects': 'projets',
            'nav.skills': 'compétences',
            'nav.experiences': 'expériences',
            'nav.contact': 'contact',

            'about.title': 'À PROPOS',
            'about.photo': 'Portrait de Théau Yapi',
            'about.body': "J'ai toujours été passionné par l'informatique et les jeux vidéo. Au collège, j'ai découvert la mécanique et l'automobile ; dans le supérieur, l'IoT et la programmation de microcontrôleurs.<br><br>Je cherche un CDI à partir d'octobre 2027.",

            'projects.title': 'PROJETS',
            'projects.viewGithub': 'GitHub',
            'projects.viewSite': 'Voir le site',
            'projects.zoom': "Agrandir l'image",
            'projects.status.wip': 'EN COURS',
            'projects.status.archived': 'ARCHIVÉ',
            'projects.nomadide': "Un IDE dédié à l'IoT, conçu et développé seul, qui regroupe en un seul outil ce que Thonny et Arduino IDE font séparément. Écriture en MicroPython et flash des cartes RP2040, ESP32 et ESP32-S3, sur PC et mobile.",
            'projects.aniquiz': "Blindtest anime multijoueur en temps réel : identifie les openings et endings avant tout le monde. Backend Go + WebSocket, frontend Vue 3.",
            'projects.cwag': "Jeu arcade multijoueur et solo développé avec Godot Engine, où les joueurs contrôlent des voitures armées dans des arènes de combat.",
            'projects.codedex': "Site web à thème de pêche avec un design inspiré des années 90, créé pour le hackathon d'hiver de Codedex.",

            'skills.title': 'COMPÉTENCES',
            'skills.mobile': 'Mobile & IoT',
            'skills.backend': 'Backend',
            'skills.web': 'Web',
            'skills.game': 'Jeu vidéo',
            'skills.ai': 'IA',

            'experiences.title': 'EXPÉRIENCES',
            'exp.ivalua.date': 'Oct 2024 - Présent',
            'exp.ivalua.title': 'Ingénieur Études et Développement',
            'exp.ivalua.body': 'Développement spécialisé en C#, .NET, et SQL Server.',
            'exp.mentor.date': 'Fév 2024 - Juin 2024',
            'exp.mentor.title': 'Mentor Junior Informatique',
            'exp.mentor.body': 'Accompagnement et mentorat auprès des étudiants en informatique.',
            'exp.els.date': 'Août 2023 - Sep 2023',
            'exp.els.title': 'Développeur Web Front-end',
            'exp.els.body': "Développement d'interfaces web et intégration front-end.",
            'exp.ynov.date': 'Sep 2022 - Présent',
            'exp.ynov.title': 'Mastère Informatique (M2) · Expert en développement logiciel',
            'exp.ynov.body': 'Titre RNCP niveau 7 (RNCP39583) en préparation. Spécialisation en développement logiciel, mobile et IoT.',
            'exp.eea.date': 'Sep 2020 - Juil 2022',
            'exp.eea.title': 'Licence en Électronique, Électrotechnique et Automatisation',
            'exp.eea.body': 'Formation en systèmes électroniques et automatisés.',

            'contact.title': 'CONTACT',
            'contact.intro': "Envie de discuter d'un projet, d'une collaboration ou juste de dire bonjour ?",
            'contact.name': 'Nom',
            'contact.email': 'Email',
            'contact.message': 'Message',
            'contact.send': 'ENVOYER',
            'contact.cv': 'TÉLÉCHARGER MON CV',
            'contact.fallback': 'Ou par mail : <a href="mailto:yapsonstudio@gmail.com">yapsonstudio@gmail.com</a>',
            'contact.sending': 'Envoi en cours…',
            'contact.success': 'Merci ! Ton message est envoyé.',
            'contact.errorGeneric': "Oups, erreur lors de l'envoi.",
            'contact.errorNetwork': 'Erreur réseau, réessaie plus tard.',
            'contact.errorUnconfigured': '⚠ Formulaire non configuré.',
        },

        en: {
            'meta.title': 'Théau Yapi | Portfolio',
            'meta.description': 'Portfolio of Théau Yapi — developer, streamer and event organizer.',
            'header.links': 'All my links',
            'tagline': 'developer · streamer · event organizer',
            'now': 'Building NomadIDE, an IoT-focused IDE for desktop and mobile.',

            'available': 'Open to work · permanent role from Oct 2027',
            'cta.contact': 'CONTACT ME',
            'nav.about': 'about',
            'nav.projects': 'projects',
            'nav.skills': 'skills',
            'nav.experiences': 'experience',
            'nav.contact': 'contact',

            'about.title': 'ABOUT',
            'about.photo': 'Portrait of Théau Yapi',
            'about.body': "I've always been passionate about computers and video games. In middle school I discovered mechanics and cars; in higher education, IoT and microcontroller programming.<br><br>I'm looking for a permanent position starting October 2027.",

            'projects.title': 'PROJECTS',
            'projects.viewGithub': 'GitHub',
            'projects.viewSite': 'View site',
            'projects.zoom': 'Enlarge image',
            'projects.status.wip': 'IN PROGRESS',
            'projects.status.archived': 'ARCHIVED',
            'projects.nomadide': "An IoT-focused IDE, designed and built solo, that combines in one tool what Thonny and Arduino IDE do separately. MicroPython editing and board flashing for RP2040, ESP32 and ESP32-S3, on desktop and mobile.",
            'projects.aniquiz': 'Real-time multiplayer anime blind-test: name the opening and ending themes before everyone else. Go + WebSocket backend, Vue 3 frontend.',
            'projects.cwag': 'Solo & multiplayer arcade game built with Godot Engine, where players drive armed cars in combat arenas.',
            'projects.codedex': 'Fishing-themed website with a 90s-inspired design, built for the Codedex winter hackathon.',

            'skills.title': 'SKILLS',
            'skills.mobile': 'Mobile & IoT',
            'skills.backend': 'Backend',
            'skills.web': 'Web',
            'skills.game': 'Game dev',
            'skills.ai': 'AI',

            'experiences.title': 'EXPERIENCE',
            'exp.ivalua.date': 'Oct 2024 - Present',
            'exp.ivalua.title': 'Software Engineer',
            'exp.ivalua.body': 'Specialized development in C#, .NET and SQL Server.',
            'exp.mentor.date': 'Feb 2024 - Jun 2024',
            'exp.mentor.title': 'Junior CS Mentor',
            'exp.mentor.body': 'Supporting and mentoring computer science students.',
            'exp.els.date': 'Aug 2023 - Sep 2023',
            'exp.els.title': 'Frontend Web Developer',
            'exp.els.body': 'Web interface development and frontend integration.',
            'exp.ynov.date': 'Sep 2022 - Present',
            'exp.ynov.title': "Master's in Computer Science (M2) · Software Development Expert",
            'exp.ynov.body': 'Preparing the RNCP level 7 title (RNCP39583). Specializing in software, mobile and IoT development.',
            'exp.eea.date': 'Sep 2020 - Jul 2022',
            'exp.eea.title': "Bachelor's in Electronics, Electrical Engineering & Automation",
            'exp.eea.body': 'Training in electronic and automated systems.',

            'contact.title': 'CONTACT',
            'contact.intro': 'Want to chat about a project, a collab, or just say hi?',
            'contact.name': 'Name',
            'contact.email': 'Email',
            'contact.message': 'Message',
            'contact.send': 'SEND',
            'contact.cv': 'DOWNLOAD MY CV',
            'contact.fallback': 'Or by email: <a href="mailto:yapsonstudio@gmail.com">yapsonstudio@gmail.com</a>',
            'contact.sending': 'Sending…',
            'contact.success': 'Thanks! Your message has been sent.',
            'contact.errorGeneric': 'Oops, something went wrong.',
            'contact.errorNetwork': 'Network error, please try again later.',
            'contact.errorUnconfigured': '⚠ Form not configured.',
        },
    };

    function read() {
        try { return localStorage.getItem('lang'); } catch { return null; }
    }

    function currentLang() {
        return read() || (navigator.language && navigator.language.startsWith('en') ? 'en' : 'fr');
    }

    function t(key, lang) {
        lang = lang || currentLang();
        return (dict[lang] && dict[lang][key] !== undefined) ? dict[lang][key] : null;
    }

    function applyLang(lang) {
        document.documentElement.lang = lang;

        document.querySelectorAll('[data-i18n]').forEach(el => {
            const v = t(el.getAttribute('data-i18n'), lang);
            if (v !== null) el.innerHTML = v;
        });
        document.querySelectorAll('[data-i18n-title]').forEach(el => {
            const v = t(el.getAttribute('data-i18n-title'), lang);
            if (v !== null) el.setAttribute('title', v);
        });
        document.querySelectorAll('[data-i18n-alt]').forEach(el => {
            const v = t(el.getAttribute('data-i18n-alt'), lang);
            if (v !== null) el.setAttribute('alt', v);
        });
        document.querySelectorAll('[data-i18n-content]').forEach(el => {
            const v = t(el.getAttribute('data-i18n-content'), lang);
            if (v !== null) el.setAttribute('content', v);
        });

        const btn = document.getElementById('lang-toggle');
        if (btn) btn.textContent = lang === 'fr' ? 'EN' : 'FR';

        try { localStorage.setItem('lang', lang); } catch {}

        // Les scripts qui génèrent du DOM (projects.js) re-rendent leur contenu.
        document.dispatchEvent(new CustomEvent('langchange', { detail: { lang } }));
    }

    window.i18n = { t, currentLang, applyLang };

    applyLang(currentLang());

    const btn = document.getElementById('lang-toggle');
    if (btn) btn.addEventListener('click', () => applyLang(currentLang() === 'fr' ? 'en' : 'fr'));
})();
