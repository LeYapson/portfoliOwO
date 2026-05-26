// nav-active.js - Surligne la section visible dans la nav (scroll spy).
(() => {
    const nav = document.getElementById('primary-nav');
    if (!nav) return;

    const links = Array.from(nav.querySelectorAll('a[href^="#"]'));
    const sections = links
        .map(a => document.querySelector(a.getAttribute('href')))
        .filter(Boolean);

    if (sections.length === 0) return;

    const linkBySection = new Map(
        sections.map((s, i) => [s, links[i]])
    );

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const link = linkBySection.get(entry.target);
            if (!link) return;
            if (entry.isIntersecting && entry.intersectionRatio > 0.4) {
                links.forEach(l => l.classList.remove('is-active'));
                link.classList.add('is-active');
            }
        });
    }, { rootMargin: '-20% 0px -40% 0px', threshold: [0, 0.4, 0.8] });

    sections.forEach(s => observer.observe(s));
})();
