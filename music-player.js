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
    
    // Liste de chansons kawaii (liens vers des musiques libres de droits)
    const songs = [
        {
            title: "Lofi Kawaii Beats",
            url: "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3"
        },
        {
            title: "Pixel Dreams",
            url: "https://cdn.pixabay.com/download/audio/2022/10/25/audio_fbd0d1483d.mp3?filename=synthwave-80s-112684.mp3"
        },
        {
            title: "Pastel Memories",
            url: "https://cdn.pixabay.com/download/audio/2022/01/18/audio_edb88899e1.mp3?filename=beautiful-piano-111206.mp3"
        }
    ];
    
    // Créer l'élément audio
    const audio = new Audio();
    audio.loop = false;
    audio.volume = 0.5;
    
    let currentSongIndex = 0;
    let isPlaying = false;
    
    // Fonctions de contrôle
    function playSong() {
        const song = songs[currentSongIndex];
        audio.src = song.src || song.url;
        audio.play();
        isPlaying = true;
        updateDisplay();
    }
    
    function pauseSong() {
        audio.pause();
        isPlaying = false;
        updateDisplay();
    }
    
    function nextSong() {
        currentSongIndex = (currentSongIndex + 1) % songs.length;
        if (isPlaying) {
            playSong();
        } else {
            updateDisplay();
        }
    }
    
    function prevSong() {
        currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
        if (isPlaying) {
            playSong();
        } else {
            updateDisplay();
        }
    }
    
    function updateDisplay() {
        const songTitle = player.querySelector('.song-title');
        const btnPlay = player.querySelector('.btn-play');
        
        songTitle.textContent = isPlaying ? 
            `▶ ${songs[currentSongIndex].title}` : 
            songs[currentSongIndex].title;
        
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
    audio.addEventListener('ended', nextSong);
    
    // Initialiser l'affichage
    updateDisplay();
    
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
