// parallax.js - optimized with requestAnimationFrame
(() => {
    const sky = document.getElementById('layer-sky');
    const clouds = document.getElementById('layer-clouds');
    const ground = document.getElementById('layer-ground'); // kept for future use but not animated
    const groundSection = document.getElementById('ground-section');

    // Speed multipliers (tweak these to adjust how pronounced the parallax is)
    const speedSky = 0.12;
    const speedClouds = 0.35;
    const speedGround = 0.7;

    let latestScrollY = 0;
    let ticking = false;

    function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }

    function update() {
        const y = latestScrollY;
        // Use translate3d for GPU acceleration and round to avoid subpixel blurriness
        // Negative multipliers: when scrolling down (y increases) backgrounds move up
        if (sky) sky.style.transform = `translate3d(0, ${Math.round(-y * speedSky)}px, 0)`;
        if (clouds) clouds.style.transform = `translate3d(0, ${Math.round(-y * speedClouds)}px, 0)`;

        // For ground, we want it to appear mostly at the end of the page
        // Compute progress (0..1) of scroll
        const docHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
        const maxScroll = Math.max(1, docHeight - window.innerHeight);
        const progress = clamp(y / maxScroll, 0, 1);

        // Animate ground to appear reliably when user nears the bottom of the page
        if (ground) {
            const distanceToBottom = Math.max(0, (docHeight - (y + window.innerHeight)));
            const startPx = Math.min(600, window.innerHeight * 0.8);
            const endPx = 40;
            // If we're within startPx, show the ground
            if (distanceToBottom <= startPx) {
                ground.classList.add('ground-visible');
            } else {
                ground.classList.remove('ground-visible');
            }
        }

        // optional fade for ground section
        if (groundSection) {
            const rect = groundSection.getBoundingClientRect();
            const visible = clamp((window.innerHeight - rect.top) / window.innerHeight, 0, 1);
            groundSection.style.opacity = String(visible);
        }

        ticking = false;
    }

    window.addEventListener('scroll', () => {
        latestScrollY = window.scrollY || window.pageYOffset;
        if (!ticking) {
            window.requestAnimationFrame(update);
            ticking = true;
        }
    }, { passive: true });

    // Initial update in case page loads scrolled
    latestScrollY = window.scrollY || window.pageYOffset;
    window.requestAnimationFrame(update);
})();
