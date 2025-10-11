// music-player.js - Petit lecteur de musique kawaii
(() => {
    // Créer le lecteur de musique
    const player = document.createElement('div');
    player.className = 'kawaii-music-player';
    player.innerHTML = `
        <div class="player-handle"></div>
        <div class="player-top">
            <div class="player-screen">
                <div class="song-title">Aucune musique</div>
                <div class="song-controls">
                    <button class="btn-prev">⏮</button>
                    <button class="btn-play">▶</button>
                    <button class="btn-next">⏭</button>
                </div>
            </div>
        </div>
        <div class="player-volume">
            <span>🔊</span>
            <input type="range" min="0" max="100" value="50" class="volume-slider">
        </div>
    `;
    
    document.body.appendChild(player);
    
    // Rendre le lecteur déplaçable
    const handle = player.querySelector('.player-handle');
    let isDragging = false;
    let offsetX, offsetY;
    
    handle.addEventListener('mousedown', (e) => {
        isDragging = true;
        offsetX = e.clientX - player.getBoundingClientRect().left;
        offsetY = e.clientY - player.getBoundingClientRect().top;
    });
    
    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        
        const x = e.clientX - offsetX;
        const y = e.clientY - offsetY;
        
        // Assurer que le lecteur reste dans la fenêtre
        const maxX = window.innerWidth - player.offsetWidth;
        const maxY = window.innerHeight - player.offsetHeight;
        
        player.style.left = `${Math.max(0, Math.min(x, maxX))}px`;
        player.style.top = `${Math.max(0, Math.min(y, maxY))}px`;
    });
    
    document.addEventListener('mouseup', () => {
        isDragging = false;
    });
    
    // Liste de chansons kawaii (fichiers audio locaux)
    const songs = [
        {
            title: "Cutie Japan Lofi",
            url: "assets/sound/cutie-japan-lofi-402355.mp3"
        },
        {
            title: "Good Night Lofi",
            url: "assets/sound/good-night-lofi-cozy-chill-music-160166.mp3"
        },
        {
            title: "Lofi Study",
            url: "assets/sound/lofi-study-112191.mp3"
        },
        {
            title: "Lofi Chill",
            url: "assets/sound/lofi-295209.mp3"
        },
        {
            title: "Peaceful Chill Hop",
            url: "assets/sound/lofi-study-calm-peaceful-chill-hop-112191.mp3"
        },
        {
            title: "Rainy Lofi City",
            url: "assets/sound/rainy-lofi-city-lofi-music-332746.mp3"
        }
    ];
    
    // Créer l'élément audio de la façon la plus simple possible
    const audio = new Audio();
    audio.loop = false;
    audio.volume = 0.5;
    
    let currentSongIndex = 0;
    let isPlaying = false;
    
    // Fonction de contrôle optimisée pour les fichiers audio locaux
    function playSong() {
        const song = songs[currentSongIndex];
        
        try {
            // Réinitialiser l'audio
            audio.pause();
            
            // Afficher un message de chargement
            const songTitle = player.querySelector('.song-title');
            songTitle.textContent = `Chargement... ${song.title}`;
            
            // Définir la source et charger
            audio.src = song.url;
            audio.load(); // Préchargement explicite pour les fichiers locaux
            
            // Démarrer la lecture
            const playPromise = audio.play();
            
            if (playPromise !== undefined) {
                playPromise
                    .then(() => {
                        console.log("Lecture démarrée avec succès");
                        isPlaying = true;
                        songTitle.textContent = `▶ ${song.title}`;
                        const btnPlay = player.querySelector('.btn-play');
                        btnPlay.textContent = '⏸';
                    })
                    .catch(error => {
                        console.error(`Erreur de lecture: ${error}`);
                        songTitle.textContent = `Erreur: ${song.title}`;
                        isPlaying = false;
                    });
            }
        } catch (error) {
            console.error("Erreur inattendue:", error);
        }
    }
    
    function pauseSong() {
        try {
            audio.pause();
            isPlaying = false;
            updateDisplay();
            console.log("Lecture mise en pause");
        } catch (error) {
            console.error("Erreur lors de la mise en pause:", error);
        }
    }
    
    function nextSong() {
        // Arrêter l'audio actuel
        audio.pause();
        
        // Changer l'index
        currentSongIndex = (currentSongIndex + 1) % songs.length;
        console.log(`Passage à la chanson suivante: ${songs[currentSongIndex].title}`);
        
        // Si la lecture était en cours, démarrer la nouvelle chanson
        if (isPlaying) {
            playSong();
        } else {
            // Sinon juste mettre à jour l'affichage
            updateDisplay();
        }
    }
    
    function prevSong() {
        // Arrêter l'audio actuel
        audio.pause();
        
        // Changer l'index
        currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
        console.log(`Passage à la chanson précédente: ${songs[currentSongIndex].title}`);
        
        // Si la lecture était en cours, démarrer la nouvelle chanson
        if (isPlaying) {
            playSong();
        } else {
            // Sinon juste mettre à jour l'affichage
            updateDisplay();
        }
    }
    
    function updateDisplay() {
        const songTitle = player.querySelector('.song-title');
        const btnPlay = player.querySelector('.btn-play');
        
        // Mise à jour simple du titre
        songTitle.textContent = isPlaying ? 
            `▶ ${songs[currentSongIndex].title}` : 
            songs[currentSongIndex].title;
        
        // Mise à jour du bouton
        btnPlay.textContent = isPlaying ? '⏸' : '▶';
    }
    
    // Attacher les événements
    const btnPlay = player.querySelector('.btn-play');
    const btnPrev = player.querySelector('.btn-prev');
    const btnNext = player.querySelector('.btn-next');
    const volumeSlider = player.querySelector('.volume-slider');
    
    btnPlay.addEventListener('click', () => {
        if (isPlaying) {
            pauseSong();
        } else {
            playSong();
        }
    });
    
    btnPrev.addEventListener('click', prevSong);
    btnNext.addEventListener('click', nextSong);
    
    volumeSlider.addEventListener('input', (e) => {
        audio.volume = e.target.value / 100;
    });
    
    // Lorsque la chanson se termine, passer à la suivante
    audio.addEventListener('ended', function() {
        console.log("La chanson est terminée, passage à la suivante");
        // Avancer à la chanson suivante
        currentSongIndex = (currentSongIndex + 1) % songs.length;
        // Jouer la chanson suivante automatiquement
        playSong();
    });
    
    // Initialiser l'affichage
    updateDisplay();
    console.log("Lecteur de musique initialisé avec", songs.length, "chansons");
    
    // Pour le développement - commenter ou supprimer cette ligne pour la production
    // console.log('Lecteur de musique kawaii initialisé');
    
    // Easter egg - Double-clic sur l'avatar pour activer/désactiver la musique
    const avatar = document.querySelector('.avatar');
    if (avatar) {
        avatar.addEventListener('dblclick', () => {
            if (isPlaying) {
                pauseSong();
            } else {
                playSong();
            }
        });
    }
})();
