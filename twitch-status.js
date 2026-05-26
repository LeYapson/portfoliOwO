// twitch-status.js - Badge "LIVE" sur Twitch, via decapi.me (pas besoin d'API key).
// decapi.me renvoie "channel is offline" ou le titre du live en clair.
(() => {
    const badge = document.getElementById('twitch-status');
    if (!badge) return;
    const label = badge.querySelector('.twitch-label');

    // Pseudo Twitch ciblé. Modifie-le si besoin.
    const CHANNEL = 'yatokishi';

    async function checkStatus() {
        try {
            const res = await fetch(`https://decapi.me/twitch/uptime/${CHANNEL}`);
            const text = (await res.text()).trim().toLowerCase();
            const isLive = text && !text.includes('offline') && !text.includes('error');
            badge.classList.toggle('live', isLive);
            badge.classList.toggle('offline', !isLive);
            label.textContent = isLive ? 'LIVE NOW' : 'offline';
        } catch {
            // Échec réseau : on laisse "offline" par défaut, pas grave.
        }
    }

    checkStatus();
    // Re-check toutes les 5 minutes au cas où l'onglet reste ouvert.
    setInterval(checkStatus, 5 * 60 * 1000);
})();
