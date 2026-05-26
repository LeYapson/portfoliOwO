// i18n.js - Bascule FR / EN via le tools-dock.
// Supports : data-i18n="<clé>"             -> innerHTML
//            data-i18n-placeholder="<clé>"  -> attribut placeholder
//            data-i18n-title="<clé>"        -> attribut title
//            data-i18n-aria-label="<clé>"   -> attribut aria-label
(() => {
    const dict = {
        fr: {
            // Meta
            'meta.title': 'Théau Yapi | Portfolio Parallaxe',
            'meta.description': "Portfolio kawaii pastel de Théau Yapi — développeur, streamer et organisateur d'événements. Projets, expériences et easter eggs rétro.",

            // Header
            'title': 'théau yapi <span class="uwu">(◕‿◕✿)</span>',
            'tagline': "développeur · streamer · organisateur d'événements",
            'now': '<span class="now-tag">🌱 now</span> Je code un JRPG sur Godot et j\'organise les prochains rassemblements THE STAND.',

            // Nav
            'nav.about': 'à propos',
            'nav.projects': 'projets',
            'nav.skills': 'compétences',
            'nav.experiences': 'expériences',
            'nav.testimonials': 'témoignages',
            'nav.guestbook': "livre d'or",
            'nav.contact': 'contact',

            // About
            'about.title': '&gt; à propos de moi &lt;',
            'about.body': "Salut ! Je m'appelle Théau, je suis un développeur passionné par les jeux vidéo, les communautés en ligne et les voitures.<br><br>Ce portfolio est un mélange de <strong>nostalgie des années 2000</strong> et de <strong>douceur pastel</strong>, comme mes streams et mes projets.<br>Bienvenue dans mon petit coin d'internet ! <span class=\"uwu\">♥</span>",

            // Projects
            'projects.title': '&gt; mes projets <span class="uwu">(・∀・)</span> &lt;&lt;',
            'projects.viewGithub': 'Voir sur GitHub',
            'projects.ravenwise': "Plateforme éducative interactive avec système d'authentification, tableau de bord personnalisé et contenu de cours adaptatif. Développé avec Next.js et React.",
            'projects.cwag': "Jeu arcade multijoueur et solo développé avec Godot Engine, où les joueurs contrôlent des voitures armées dans des arènes de combat palpitantes.",
            'projects.codedex': "Site web à thème de pêche avec un design inspiré des années 90, créé pour le hackathon d'hiver de Codedex avec des animations rétro.",
            'projects.uwu': "Ce site même ! Un hommage aux sites persos des années 2000, revisité en pastel avec effets parallaxe, mascotte interactive et lecteur de musique LoFi.",

            // Skills
            'skills.title': '&gt; mes compétences <span class="uwu">(≧◡≦)</span> &lt;&lt;',
            'skills.intro': "Développeur passionné avec une appétence pour le design et l'UX. Voici les domaines dans lesquels j'excelle :",
            'skills.frontend.title': 'Frontend Developer',
            'skills.frontend.body': "Création d'interfaces interactives et responsives avec React, Vue.js et les technologies modernes du web.",
            'skills.backend.title': 'Backend Developer',
            'skills.backend.body': "Développement d'API RESTful et d'applications serveur robustes avec Node.js, Express et Python.",
            'skills.uiux.title': 'UI/UX Design',
            'skills.uiux.body': "Conception d'expériences utilisateur intuitives et d'interfaces visuellement attrayantes.",
            'skills.gamedev.title': 'Game Development',
            'skills.gamedev.body': "Création de jeux et prototypes avec Unity, avec une passion particulière pour la conception de mécaniques de jeu.",

            // Experiences
            'experiences.title': '&gt; expériences <span class="uwu">(⌐■_■)</span> &lt;&lt;',
            'exp.ongoing': 'Projet en cours',
            'exp.ivalua.date': 'Oct 2024 - Présent',
            'exp.ivalua.title': 'Ingénieur Études et Développement',
            'exp.ivalua.body': 'Développement spécialisé en C#, .NET, et SQL Server.',
            'exp.mentor.date': 'Fev 2024 - Juin 2024',
            'exp.mentor.title': 'Mentor Junior Informatique',
            'exp.mentor.body': 'Accompagnement et mentorat auprès des étudiants en informatique.',
            'exp.els.date': 'Août 2023 - Sep 2023',
            'exp.els.title': 'Développeur Web Front-end',
            'exp.els.body': "Développement d'interfaces web et intégration front-end.",
            'exp.ynov.date': 'Sep 2022 - Présent',
            'exp.ynov.title': 'Licence Informatique',
            'exp.ynov.body': 'Formation complète en développement et technologies informatiques.',
            'exp.eea.date': 'Sep 2020 - Juil 2022',
            'exp.eea.title': 'Licence en Électronique, Électrotechnique et Automatisation',
            'exp.eea.body': 'Formation en systèmes électroniques et automatisés.',
            'exp.thestand.title': 'Fondateur & Organisateur',
            'exp.thestand.body': "Organisation d'événements de rassemblement automobile.",
            'exp.projectms.title': 'Développeur Indépendant',
            'exp.projectms.body': "Développement d'un jeu vidéo JRPG japonais sur Godot Engine.",

            // Testimonials
            'testimonials.title': '&gt; témoignages <span class="uwu">(„• ֊ •„)</span> &lt;&lt;',
            'testimonials.q1': '« Théau apporte une énergie communicative à chaque projet, et son sens du détail visuel fait la différence. »',
            'testimonials.a1': '— Camille, collègue dev',
            'testimonials.q2': "« Un mentor patient et clair. Il m'a fait aimer le développement web. »",
            'testimonials.a2': '— Étudiant·e Ynov',
            'testimonials.q3': '« THE STAND est devenu LE rendez-vous des passionnés. Organisation au top. »',
            'testimonials.a3': '— Participant à un rassemblement',
            'testimonials.note': '✏️ Remplace ces témoignages par de vrais retours quand tu en as.',

            // Guestbook
            'guestbook.title': '&gt; livre d\'or <span class="uwu">(◠‿◠)</span> &lt;&lt;',
            'guestbook.intro': 'Laisse un petit mot ! (sauvegardé en local dans ton navigateur uniquement)',
            'guestbook.namePlaceholder': 'ton pseudo',
            'guestbook.msgPlaceholder': 'ton message kawaii…',
            'guestbook.sign': 'signer ♥',
            'guestbook.empty': 'Sois le premier à signer ! ♥',

            // Contact
            'contact.title': '&gt; contact <span class="uwu">(｡♥‿♥｡)</span> &lt;&lt;',
            'contact.intro': "Envies de discuter d'un projet, d'une collaboration ou juste de dire bonjour ?",
            'contact.name': 'Nom',
            'contact.email': 'Email',
            'contact.message': 'Message',
            'contact.send': 'Envoyer ♥',
            'contact.cv': '📄 Télécharger mon CV',
            'contact.fallback': 'Ou par mail direct : <a href="mailto:yapsonstudio@gmail.com">yapsonstudio@gmail.com</a>',
            'contact.sending': 'Envoi en cours…',
            'contact.success': 'Merci ! Ton message est envoyé ♥',
            'contact.errorGeneric': "Oups, erreur lors de l'envoi.",
            'contact.errorNetwork': 'Erreur réseau, réessaie plus tard.',
            'contact.errorUnconfigured': '⚠ Formulaire non configuré (remplace YOUR_FORM_ID dans index.html).',

            // Footer
            'footer.made': 'fait avec ❤️ et des couleurs pastel | © 2025',
        },

        en: {
            // Meta
            'meta.title': 'Théau Yapi | Parallax Portfolio',
            'meta.description': "Kawaii pastel portfolio by Théau Yapi — developer, streamer and event organizer. Projects, experience and retro easter eggs.",

            // Header
            'title': 'théau yapi <span class="uwu">(◕‿◕✿)</span>',
            'tagline': 'developer · streamer · event organizer',
            'now': '<span class="now-tag">🌱 now</span> Building a Godot JRPG and prepping the next THE STAND meetups.',

            // Nav
            'nav.about': 'about',
            'nav.projects': 'projects',
            'nav.skills': 'skills',
            'nav.experiences': 'experience',
            'nav.testimonials': 'testimonials',
            'nav.guestbook': 'guestbook',
            'nav.contact': 'contact',

            // About
            'about.title': '&gt; about me &lt;',
            'about.body': "Hi! I'm Théau, a developer passionate about video games, online communities, and cars.<br><br>This portfolio is a blend of <strong>2000s nostalgia</strong> and <strong>pastel softness</strong>, just like my streams and my projects.<br>Welcome to my little corner of the internet! <span class=\"uwu\">♥</span>",

            // Projects
            'projects.title': '&gt; my projects <span class="uwu">(・∀・)</span> &lt;&lt;',
            'projects.viewGithub': 'View on GitHub',
            'projects.ravenwise': "Interactive educational platform with authentication, personalized dashboard and adaptive course content. Built with Next.js and React.",
            'projects.cwag': "Solo & multiplayer arcade game built with Godot Engine, where players drive armed cars in thrilling combat arenas.",
            'projects.codedex': "Fishing-themed website with a 90s-inspired design, built for the Codedex winter hackathon with retro animations.",
            'projects.uwu': "This very site! A tribute to early-2000s personal pages, reimagined in pastel with parallax effects, an interactive mascot and a LoFi music player.",

            // Skills
            'skills.title': '&gt; my skills <span class="uwu">(≧◡≦)</span> &lt;&lt;',
            'skills.intro': 'Passionate developer with a taste for design and UX. The areas where I shine:',
            'skills.frontend.title': 'Frontend Developer',
            'skills.frontend.body': 'Building interactive, responsive interfaces with React, Vue.js and modern web tech.',
            'skills.backend.title': 'Backend Developer',
            'skills.backend.body': 'Designing robust REST APIs and server applications with Node.js, Express and Python.',
            'skills.uiux.title': 'UI/UX Design',
            'skills.uiux.body': 'Crafting intuitive user experiences and visually pleasing interfaces.',
            'skills.gamedev.title': 'Game Development',
            'skills.gamedev.body': 'Creating games and prototypes with Unity, with a special love for game mechanics.',

            // Experiences
            'experiences.title': '&gt; experience <span class="uwu">(⌐■_■)</span> &lt;&lt;',
            'exp.ongoing': 'Ongoing project',
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
            'exp.ynov.title': "Bachelor's in Computer Science",
            'exp.ynov.body': 'Full-stack training in development and computer technologies.',
            'exp.eea.date': 'Sep 2020 - Jul 2022',
            'exp.eea.title': "Bachelor's in Electronics, Electrical Engineering & Automation",
            'exp.eea.body': 'Training in electronic and automated systems.',
            'exp.thestand.title': 'Founder & Organizer',
            'exp.thestand.body': 'Organizing automotive meetup events.',
            'exp.projectms.title': 'Indie Developer',
            'exp.projectms.body': 'Building a Japanese-style JRPG with Godot Engine.',

            // Testimonials
            'testimonials.title': '&gt; testimonials <span class="uwu">(„• ֊ •„)</span> &lt;&lt;',
            'testimonials.q1': '"Théau brings infectious energy to every project, and his eye for visual detail makes all the difference."',
            'testimonials.a1': '— Camille, fellow dev',
            'testimonials.q2': '"A patient and clear mentor. He made me love web development."',
            'testimonials.a2': '— Ynov student',
            'testimonials.q3': '"THE STAND has become THE meetup for enthusiasts. Top-notch organization."',
            'testimonials.a3': '— Meetup attendee',
            'testimonials.note': '✏️ Swap these placeholder testimonials for real ones once you have them.',

            // Guestbook
            'guestbook.title': '&gt; guestbook <span class="uwu">(◠‿◠)</span> &lt;&lt;',
            'guestbook.intro': 'Drop a little message! (saved locally in your browser only)',
            'guestbook.namePlaceholder': 'your nickname',
            'guestbook.msgPlaceholder': 'your kawaii message…',
            'guestbook.sign': 'sign ♥',
            'guestbook.empty': 'Be the first to sign! ♥',

            // Contact
            'contact.title': '&gt; contact <span class="uwu">(｡♥‿♥｡)</span> &lt;&lt;',
            'contact.intro': 'Want to chat about a project, a collab, or just say hi?',
            'contact.name': 'Name',
            'contact.email': 'Email',
            'contact.message': 'Message',
            'contact.send': 'Send ♥',
            'contact.cv': '📄 Download my CV',
            'contact.fallback': 'Or by email: <a href="mailto:yapsonstudio@gmail.com">yapsonstudio@gmail.com</a>',
            'contact.sending': 'Sending…',
            'contact.success': 'Thanks! Your message has been sent ♥',
            'contact.errorGeneric': 'Oops, something went wrong.',
            'contact.errorNetwork': 'Network error, please try again later.',
            'contact.errorUnconfigured': '⚠ Form not configured (replace YOUR_FORM_ID in index.html).',

            // Footer
            'footer.made': 'made with ❤️ and pastel colors | © 2025',
        },
    };

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
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const v = t(el.getAttribute('data-i18n-placeholder'), lang);
            if (v !== null) el.setAttribute('placeholder', v);
        });
        document.querySelectorAll('[data-i18n-title]').forEach(el => {
            const v = t(el.getAttribute('data-i18n-title'), lang);
            if (v !== null) el.setAttribute('title', v);
        });
        document.querySelectorAll('[data-i18n-aria-label]').forEach(el => {
            const v = t(el.getAttribute('data-i18n-aria-label'), lang);
            if (v !== null) el.setAttribute('aria-label', v);
        });
        document.querySelectorAll('[data-i18n-content]').forEach(el => {
            const v = t(el.getAttribute('data-i18n-content'), lang);
            if (v !== null) el.setAttribute('content', v);
        });

        localStorage.setItem('lang', lang);

        // Notifie les autres scripts (guestbook, contact-form…) qu'ils
        // peuvent re-rendre leur contenu dynamique.
        document.dispatchEvent(new CustomEvent('langchange', { detail: { lang } }));
    }

    function currentLang() {
        return localStorage.getItem('lang')
            || (navigator.language && navigator.language.startsWith('en') ? 'en' : 'fr');
    }

    // Expose une mini-API pour les scripts qui génèrent du DOM dynamiquement.
    window.i18n = { t, currentLang, applyLang };

    // Appliquer immédiatement (avant les autres scripts qui regardent l'UI).
    applyLang(currentLang());

    // Bouton dans le dock
    function waitForToolsDock(cb) {
        if (window.addToolToDock) cb();
        else setTimeout(() => waitForToolsDock(cb), 100);
    }
    waitForToolsDock(() => {
        const btn = window.addToolToDock('🌐', 'FR / EN', () => {
            const next = currentLang() === 'fr' ? 'en' : 'fr';
            applyLang(next);
            btn.innerHTML = next.toUpperCase();
        }, 'lang-toggle');
        btn.style.fontSize = '0.75rem';
        btn.style.fontFamily = "'IBM Plex Mono', monospace";
        btn.innerHTML = currentLang().toUpperCase();
    });
})();
