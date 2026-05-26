// contact-form.js - Envoi AJAX vers Formspree (ou tout endpoint compatible).
(() => {
    const form = document.getElementById('contact-form');
    if (!form) return;
    const status = form.querySelector('.form-status');

    function tr(key, fallback) {
        return (window.i18n && window.i18n.t(key)) || fallback;
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const action = form.getAttribute('action');

        if (!action || action.includes('YOUR_FORM_ID')) {
            status.textContent = tr('contact.errorUnconfigured', '⚠ Formulaire non configuré.');
            status.className = 'form-status error';
            return;
        }

        status.textContent = tr('contact.sending', 'Envoi en cours…');
        status.className = 'form-status';

        try {
            const res = await fetch(action, {
                method: 'POST',
                body: new FormData(form),
                headers: { 'Accept': 'application/json' },
            });
            if (res.ok) {
                form.reset();
                status.textContent = tr('contact.success', 'Merci ! Ton message est envoyé ♥');
                status.className = 'form-status success';
            } else {
                const data = await res.json().catch(() => ({}));
                status.textContent = data.error || tr('contact.errorGeneric', "Oups, erreur lors de l'envoi.");
                status.className = 'form-status error';
            }
        } catch (err) {
            status.textContent = tr('contact.errorNetwork', 'Erreur réseau, réessaie plus tard.');
            status.className = 'form-status error';
        }
    });
})();
