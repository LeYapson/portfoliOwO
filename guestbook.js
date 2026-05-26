// guestbook.js - Livre d'or stocké en localStorage (pas de backend).
(() => {
    const form = document.getElementById('guestbook-form');
    const list = document.getElementById('guestbook-entries');
    const nameInput = document.getElementById('guestbook-name');
    const msgInput = document.getElementById('guestbook-message');
    if (!form || !list) return;

    const STORAGE_KEY = 'guestbook.entries.v1';
    const MAX_ENTRIES = 50;

    function load() {
        try {
            return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
        } catch {
            return [];
        }
    }

    function save(entries) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(entries.slice(0, MAX_ENTRIES)));
    }

    function escapeHtml(s) {
        return s.replace(/[&<>"']/g, c => ({
            '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
        }[c]));
    }

    function render() {
        const entries = load();
        list.innerHTML = '';
        if (entries.length === 0) {
            const li = document.createElement('li');
            li.className = 'guestbook-entry';
            const emptyMsg = (window.i18n && window.i18n.t('guestbook.empty')) || 'Sois le premier à signer ! ♥';
            li.innerHTML = `<span class="msg" style="font-style:italic;opacity:0.6">${escapeHtml(emptyMsg)}</span>`;
            list.appendChild(li);
            return;
        }
        entries.forEach((entry, idx) => {
            const li = document.createElement('li');
            li.className = 'guestbook-entry';
            const date = new Date(entry.date).toLocaleDateString();
            li.innerHTML = `
                <button class="delete" aria-label="Supprimer" title="Supprimer">✕</button>
                <span class="name">${escapeHtml(entry.name)}</span>
                <span class="date">${date}</span>
                <div class="msg">${escapeHtml(entry.message)}</div>
            `;
            li.querySelector('.delete').addEventListener('click', () => {
                const next = load();
                next.splice(idx, 1);
                save(next);
                render();
            });
            list.appendChild(li);
        });
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = nameInput.value.trim();
        const message = msgInput.value.trim();
        if (!name || !message) return;
        const entries = load();
        entries.unshift({ name, message, date: Date.now() });
        save(entries);
        nameInput.value = '';
        msgInput.value = '';
        render();
    });

    render();

    // Re-render le placeholder vide quand l'utilisateur change de langue.
    document.addEventListener('langchange', render);
})();
