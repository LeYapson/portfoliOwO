// space-invaders.js - Mini-jeu Space Invaders kawaii accessible via le code Konami
class SpaceInvadersGame {
    constructor(container) {
        // Éléments du DOM
        this.container = container;
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        
        // Dimensions
        this.canvas.width = 480;
        this.canvas.height = 640;
        
        // Style du canvas
        this.canvas.style.display = 'block';
        this.canvas.style.margin = '0 auto';
        this.canvas.style.backgroundColor = '#000';
        this.canvas.style.border = '4px solid #ffb6c1';
        this.canvas.style.boxShadow = '0 0 20px rgba(255, 182, 193, 0.8)';
        
        // Ajouter le canvas au conteneur
        this.container.appendChild(this.canvas);
        
        // Propriétés du jeu
        this.isRunning = false;
        this.score = 0;
        this.lives = 3;
        this.gameOverStatus = false;
        
        // Compteurs et timers
        this.animationFrame = null;
        this.lastTime = 0;
        this.enemyMoveTime = 0;
        this.enemyMoveInterval = 1000; // Intervalle initial entre les mouvements des ennemis (en ms)
        this.enemyShootTime = 0;
        this.enemyShootInterval = 1500; // Intervalle entre les tirs ennemis (en ms)
        
        // Direction des ennemis
        this.enemyDirection = 1; // 1 = droite, -1 = gauche
        
        // Contrôles
        this.keys = {
            left: false,
            right: false,
            space: false
        };
        
        // Assets
        this.assets = {
            player: null,
            enemy: null,
            playerBullet: null,
            enemyBullet: null,
            explosion: null,
            background: null
        };
        
        // Entités du jeu
        this.player = {
            x: this.canvas.width / 2,
            y: this.canvas.height - 80,
            width: 48,
            height: 48,
            speed: 5,
            cooldown: 0,
            canShoot: true
        };
        
        this.playerBullets = [];
        this.enemyBullets = [];
        this.enemies = [];
        this.explosions = [];
        
        // Statistiques pour le débug
        this.fps = 0;
        this.fpsCounter = 0;
        this.fpsTimer = 0;
        
        // Initialisation
        this.setupEventListeners();
        this.loadAssets().then(() => {
            this.initGame();
        });
    }
    
    // Charger les assets du jeu
    async loadAssets() {
        const basePath = 'assets/img/spaceInvader/';
        
        // Helper pour charger une image
        const loadImage = (src) => {
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.onload = () => resolve(img);
                img.onerror = reject;
                img.src = basePath + src;
            });
        };
        
        try {
            // Charger toutes les images
            this.assets.player = await loadImage('player.png');
            this.assets.enemy = await loadImage('ennemy.png');
            this.assets.playerBullet = await loadImage('bullet_player.png');
            this.assets.enemyBullet = await loadImage('bullet_ennemy.png');
            this.assets.explosion = await loadImage('explosion.png');
            this.assets.background = await loadImage('background.png');
            
            // Tous les assets ont été chargés avec succès
            return true;
        } catch (error) {
            console.error('Erreur lors du chargement des assets:', error);
            return false;
        }
    }
    
    // Configurer les écouteurs d'événements
    setupEventListeners() {
        // Écouteurs pour les contrôles clavier
        window.addEventListener('keydown', (e) => {
            this.handleKeyDown(e);
        });
        
        window.addEventListener('keyup', (e) => {
            this.handleKeyUp(e);
        });
    }
    
    // Gérer l'appui sur une touche
    handleKeyDown(e) {
        switch(e.key) {
            case 'ArrowLeft':
                this.keys.left = true;
                break;
            case 'ArrowRight':
                this.keys.right = true;
                break;
            case ' ':  // Espace
                this.keys.space = true;
                // Empêcher le défilement de la page
                e.preventDefault();
                break;
            case 'Escape':
                // Mettre en pause ou reprendre le jeu
                this.togglePause();
                break;
        }
    }
    
    // Gérer le relâchement d'une touche
    handleKeyUp(e) {
        switch(e.key) {
            case 'ArrowLeft':
                this.keys.left = false;
                break;
            case 'ArrowRight':
                this.keys.right = false;
                break;
            case ' ':  // Espace
                this.keys.space = false;
                break;
        }
    }
    
    // Initialiser le jeu
    initGame() {
        // Réinitialiser les variables du jeu
        this.score = 0;
        this.lives = 3;
        this.gameOverStatus = false;
        this.enemyMoveInterval = 1000;
        this.enemyDirection = 1;
        
        // Créer les ennemis
        this.createEnemies();
        
        // Positionner le joueur
        this.player.x = this.canvas.width / 2 - this.player.width / 2;
        
        // Vider les tableaux
        this.playerBullets = [];
        this.enemyBullets = [];
        this.explosions = [];
        
        // Démarrer la boucle de jeu
        if (!this.isRunning) {
            this.isRunning = true;
            this.lastTime = performance.now();
            this.gameLoop();
        }
    }
    
    // Créer la formation d'ennemis
    createEnemies() {
        this.enemies = [];
        
        const rows = 4;
        const cols = 8;
        const enemyWidth = 48;
        const enemyHeight = 48;
        const horizontalSpacing = 20;
        const verticalSpacing = 20;
        
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                this.enemies.push({
                    x: col * (enemyWidth + horizontalSpacing) + 40,
                    y: row * (enemyHeight + verticalSpacing) + 60,
                    width: enemyWidth,
                    height: enemyHeight,
                    type: row % 3,  // Type d'ennemi basé sur la rangée
                    alive: true
                });
            }
        }
    }
    
    // Mettre en pause ou reprendre le jeu
    togglePause() {
        this.isRunning = !this.isRunning;
        
        if (this.isRunning) {
            this.lastTime = performance.now();
            this.gameLoop();
        }
    }
    
    // Boucle principale du jeu
    gameLoop(currentTime = performance.now()) {
        if (!this.isRunning) return;
        
        // Calculer le delta time (temps écoulé depuis la dernière frame)
        const deltaTime = currentTime - this.lastTime;
        this.lastTime = currentTime;
        
        // Mettre à jour le FPS
        this.fpsCounter++;
        this.fpsTimer += deltaTime;
        if (this.fpsTimer >= 1000) {
            this.fps = this.fpsCounter;
            this.fpsCounter = 0;
            this.fpsTimer = 0;
        }
        
        // Mettre à jour
        this.update(deltaTime);
        
        // Dessiner
        this.render();
        
        // Demander la prochaine frame d'animation
        this.animationFrame = requestAnimationFrame((time) => this.gameLoop(time));
    }
    
    // Mettre à jour l'état du jeu
    update(deltaTime) {
        if (this.gameOverStatus) return;
        
        // Mettre à jour le joueur
        this.updatePlayer(deltaTime);
        
        // Mettre à jour les ennemis
        this.updateEnemies(deltaTime);
        
        // Mettre à jour les balles du joueur
        this.updatePlayerBullets(deltaTime);
        
        // Mettre à jour les balles ennemies
        this.updateEnemyBullets(deltaTime);
        
        // Mettre à jour les explosions
        this.updateExplosions(deltaTime);
        
        // Vérifier les conditions de victoire
        this.checkWinCondition();
    }
    
    // Mettre à jour le joueur
    updatePlayer(deltaTime) {
        // Déplacer à gauche
        if (this.keys.left && this.player.x > 10) {
            this.player.x -= this.player.speed;
        }
        
        // Déplacer à droite
        if (this.keys.right && this.player.x < this.canvas.width - this.player.width - 10) {
            this.player.x += this.player.speed;
        }
        
        // Gérer le tir
        if (this.keys.space && this.player.canShoot) {
            this.playerShoot();
            this.player.canShoot = false;
            
            // Cooldown avant de pouvoir tirer à nouveau
            setTimeout(() => {
                this.player.canShoot = true;
            }, 300);
        }
    }
    
    // Faire tirer le joueur
    playerShoot() {
        this.playerBullets.push({
            x: this.player.x + (this.player.width / 2) - 2,
            y: this.player.y - 10,
            width: 4,
            height: 16,
            speed: 8
        });
        
        // Jouer le son du tir (si disponible)
        // this.playSound('playerShoot');
    }
    
    // Mettre à jour les ennemis
    updateEnemies(deltaTime) {
        // Timer pour déplacer les ennemis
        this.enemyMoveTime += deltaTime;
        if (this.enemyMoveTime >= this.enemyMoveInterval) {
            this.enemyMoveTime = 0;
            
            // Vérifier s'il faut changer de direction
            let shouldChangeDirection = false;
            
            for (let enemy of this.enemies) {
                if (!enemy.alive) continue;
                
                // Vérifier les bords gauche et droit
                if ((this.enemyDirection === 1 && enemy.x + enemy.width + 10 >= this.canvas.width) ||
                    (this.enemyDirection === -1 && enemy.x - 10 <= 0)) {
                    shouldChangeDirection = true;
                    break;
                }
            }
            
            if (shouldChangeDirection) {
                // Inverser la direction
                this.enemyDirection *= -1;
                
                // Descendre d'un niveau
                for (let enemy of this.enemies) {
                    if (enemy.alive) {
                        enemy.y += 20;
                    }
                }
                
                // Accélérer le mouvement des ennemis (min 200ms)
                this.enemyMoveInterval = Math.max(200, this.enemyMoveInterval * 0.95);
            } else {
                // Déplacer les ennemis horizontalement
                for (let enemy of this.enemies) {
                    if (enemy.alive) {
                        enemy.x += 15 * this.enemyDirection;
                    }
                }
            }
            
            // Jouer le son du mouvement (si disponible)
            // this.playSound('enemyMove');
        }
        
        // Timer pour les tirs ennemis
        this.enemyShootTime += deltaTime;
        if (this.enemyShootTime >= this.enemyShootInterval) {
            this.enemyShootTime = 0;
            this.enemyShoot();
        }
        
        // Vérifier si les ennemis ont atteint le bas
        for (let enemy of this.enemies) {
            if (enemy.alive && enemy.y + enemy.height >= this.player.y) {
                this.gameOver();
                return;
            }
        }
    }
    
    // Faire tirer un ennemi aléatoire
    enemyShoot() {
        // Filtrer les ennemis vivants
        const liveEnemies = this.enemies.filter(enemy => enemy.alive);
        
        if (liveEnemies.length === 0) return;
        
        // Choisir un ennemi aléatoire
        const randomEnemy = liveEnemies[Math.floor(Math.random() * liveEnemies.length)];
        
        this.enemyBullets.push({
            x: randomEnemy.x + (randomEnemy.width / 2) - 4,
            y: randomEnemy.y + randomEnemy.height,
            width: 8,
            height: 16,
            speed: 5
        });
        
        // Jouer le son du tir ennemi (si disponible)
        // this.playSound('enemyShoot');
    }
    
    // Mettre à jour les balles du joueur
    updatePlayerBullets(deltaTime) {
        for (let i = this.playerBullets.length - 1; i >= 0; i--) {
            const bullet = this.playerBullets[i];
            
            // Déplacer la balle
            bullet.y -= bullet.speed;
            
            // Vérifier la sortie de l'écran
            if (bullet.y + bullet.height < 0) {
                this.playerBullets.splice(i, 1);
                continue;
            }
            
            // Vérifier les collisions avec les ennemis
            for (let j = 0; j < this.enemies.length; j++) {
                const enemy = this.enemies[j];
                
                if (enemy.alive && this.checkCollision(bullet, enemy)) {
                    // Marquer l'ennemi comme détruit
                    enemy.alive = false;
                    
                    // Ajouter une explosion
                    this.explosions.push({
                        x: enemy.x,
                        y: enemy.y,
                        width: enemy.width,
                        height: enemy.height,
                        frame: 0,
                        maxFrames: 5,
                        frameTime: 0,
                        frameDuration: 100  // ms par frame
                    });
                    
                    // Supprimer la balle
                    this.playerBullets.splice(i, 1);
                    
                    // Ajouter des points
                    this.score += 100;
                    
                    // Jouer le son d'explosion (si disponible)
                    // this.playSound('explosion');
                    
                    break;
                }
            }
        }
    }
    
    // Mettre à jour les balles ennemies
    updateEnemyBullets(deltaTime) {
        for (let i = this.enemyBullets.length - 1; i >= 0; i--) {
            const bullet = this.enemyBullets[i];
            
            // Déplacer la balle
            bullet.y += bullet.speed;
            
            // Vérifier la sortie de l'écran
            if (bullet.y > this.canvas.height) {
                this.enemyBullets.splice(i, 1);
                continue;
            }
            
            // Vérifier la collision avec le joueur
            if (this.checkCollision(bullet, this.player)) {
                // Supprimer la balle
                this.enemyBullets.splice(i, 1);
                
                // Enlever une vie
                this.lives--;
                
                // Ajouter une explosion à la position du joueur
                this.explosions.push({
                    x: this.player.x,
                    y: this.player.y,
                    width: this.player.width,
                    height: this.player.height,
                    frame: 0,
                    maxFrames: 5,
                    frameTime: 0,
                    frameDuration: 100
                });
                
                // Jouer le son du joueur touché (si disponible)
                // this.playSound('playerHit');
                
                // Vérifier si le joueur a perdu toutes ses vies
                if (this.lives <= 0) {
                    this.gameOver();
                }
                
                break;
            }
        }
    }
    
    // Mettre à jour les explosions
    updateExplosions(deltaTime) {
        for (let i = this.explosions.length - 1; i >= 0; i--) {
            const explosion = this.explosions[i];
            
            explosion.frameTime += deltaTime;
            
            if (explosion.frameTime >= explosion.frameDuration) {
                explosion.frame++;
                explosion.frameTime = 0;
                
                if (explosion.frame >= explosion.maxFrames) {
                    this.explosions.splice(i, 1);
                }
            }
        }
    }
    
    // Vérifier les collisions entre deux rectangles
    checkCollision(rect1, rect2) {
        return rect1.x < rect2.x + rect2.width &&
               rect1.x + rect1.width > rect2.x &&
               rect1.y < rect2.y + rect2.height &&
               rect1.y + rect1.height > rect2.y;
    }
    
    // Vérifier si tous les ennemis ont été détruits
    checkWinCondition() {
        if (this.enemies.every(enemy => !enemy.alive)) {
            // Augmenter le score pour avoir complété le niveau
            this.score += 1000;
            
            // Créer un nouveau niveau avec des ennemis plus rapides
            this.enemyMoveInterval = Math.max(200, this.enemyMoveInterval * 0.8);
            this.createEnemies();
            
            // Jouer le son de victoire (si disponible)
            // this.playSound('victory');
        }
    }
    
    // Game Over
    gameOver() {
        this.gameOverStatus = true;
        
        // Jouer le son de game over (si disponible)
        // this.playSound('gameOver');
        
        // Afficher l'écran de game over après un court délai
        setTimeout(() => {
            this.showGameOverScreen();
        }, 1000);
    }
    
    // Afficher l'écran de game over
    showGameOverScreen() {
        // Arrêter la boucle de jeu
        this.isRunning = false;
        cancelAnimationFrame(this.animationFrame);
        
        // Afficher l'écran de fin de partie
        const gameOverDiv = document.createElement('div');
        gameOverDiv.className = 'game-over-screen';
        gameOverDiv.style.position = 'absolute';
        gameOverDiv.style.top = '50%';
        gameOverDiv.style.left = '50%';
        gameOverDiv.style.transform = 'translate(-50%, -50%)';
        gameOverDiv.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
        gameOverDiv.style.padding = '30px';
        gameOverDiv.style.borderRadius = '15px';
        gameOverDiv.style.textAlign = 'center';
        gameOverDiv.style.color = 'white';
        gameOverDiv.style.fontFamily = "'Press Start 2P', monospace";
        gameOverDiv.style.zIndex = '2';
        gameOverDiv.style.minWidth = '300px';
        
        gameOverDiv.innerHTML = `
            <h2 style="color: #ffb6c1; margin-bottom: 20px;">GAME OVER</h2>
            <p>Score: ${this.score}</p>
            <button id="restart-game" style="margin-top: 20px; padding: 10px 20px; background-color: #ffb6c1; color: black; border: none; border-radius: 5px; font-family: 'Press Start 2P', monospace; cursor: pointer;">REJOUER</button>
            <button id="exit-game" style="margin-top: 20px; margin-left: 10px; padding: 10px 20px; background-color: #333; color: white; border: none; border-radius: 5px; font-family: 'Press Start 2P', monospace; cursor: pointer;">QUITTER</button>
        `;
        
        this.container.appendChild(gameOverDiv);
        
        // Ajouter les écouteurs d'événements
        document.getElementById('restart-game').addEventListener('click', () => {
            // Supprimer l'écran de game over
            gameOverDiv.remove();
            
            // Réinitialiser le jeu
            this.initGame();
        });
        
        document.getElementById('exit-game').addEventListener('click', () => {
            // Fermer le jeu
            this.close();
        });
    }
    
    // Fermer le jeu
    close() {
        // Arrêter la boucle de jeu
        this.isRunning = false;
        cancelAnimationFrame(this.animationFrame);
        
        // Supprimer les écouteurs d'événements
        window.removeEventListener('keydown', this.handleKeyDown);
        window.removeEventListener('keyup', this.handleKeyUp);
        
        // Animation de fermeture
        this.container.style.animation = 'fadeOut 0.5s forwards';
        
        setTimeout(() => {
            // Supprimer le canvas et le conteneur
            while (this.container.firstChild) {
                this.container.removeChild(this.container.firstChild);
            }
            
            this.container.remove();
        }, 500);
    }
    
    // Jouer un son
    playSound(sound) {
        // Cette fonction serait utilisée si vous aviez des sons
        // Vous pouvez la compléter plus tard si vous ajoutez des sons
    }
    
    // Rendu du jeu
    render() {
        // Effacer le canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Dessiner l'arrière-plan
        this.drawBackground();
        
        // Dessiner les entités de jeu
        this.drawPlayer();
        this.drawEnemies();
        this.drawBullets();
        this.drawExplosions();
        
        // Dessiner l'interface utilisateur
        this.drawUI();
        
        // Dessiner l'écran de pause si le jeu est en pause
        if (!this.isRunning && !this.gameOverStatus) {
            this.drawPauseScreen();
        }
    }
    
    // Dessiner l'arrière-plan
    drawBackground() {
        // Utiliser l'image de fond si disponible
        if (this.assets.background) {
            // Taille adaptée au canvas
            this.ctx.drawImage(this.assets.background, 0, 0, this.canvas.width, this.canvas.height);
        } else {
            // Fond noir par défaut
            this.ctx.fillStyle = 'black';
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
            
            // Quelques étoiles aléatoires
            this.ctx.fillStyle = 'white';
            for (let i = 0; i < 50; i++) {
                const x = Math.random() * this.canvas.width;
                const y = Math.random() * this.canvas.height;
                const size = Math.random() * 2 + 1;
                this.ctx.fillRect(x, y, size, size);
            }
        }
    }
    
    // Dessiner le joueur
    drawPlayer() {
        if (this.assets.player) {
            this.ctx.drawImage(this.assets.player, this.player.x, this.player.y, this.player.width, this.player.height);
        } else {
            this.ctx.fillStyle = '#ffb6c1';
            this.ctx.fillRect(this.player.x, this.player.y, this.player.width, this.player.height);
        }
    }
    
    // Dessiner les ennemis
    drawEnemies() {
        for (let enemy of this.enemies) {
            if (!enemy.alive) continue;
            
            if (this.assets.enemy) {
                this.ctx.drawImage(this.assets.enemy, enemy.x, enemy.y, enemy.width, enemy.height);
            } else {
                this.ctx.fillStyle = 'red';
                this.ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
            }
        }
    }
    
    // Dessiner les balles
    drawBullets() {
        // Balles du joueur
        this.ctx.fillStyle = '#ffb6c1';
        for (let bullet of this.playerBullets) {
            if (this.assets.playerBullet) {
                this.ctx.drawImage(this.assets.playerBullet, bullet.x, bullet.y, bullet.width, bullet.height);
            } else {
                this.ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
            }
        }
        
        // Balles ennemies
        this.ctx.fillStyle = 'orange';
        for (let bullet of this.enemyBullets) {
            if (this.assets.enemyBullet) {
                this.ctx.drawImage(this.assets.enemyBullet, bullet.x, bullet.y, bullet.width, bullet.height);
            } else {
                this.ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
            }
        }
    }
    
    // Dessiner les explosions
    drawExplosions() {
        for (let explosion of this.explosions) {
            if (this.assets.explosion) {
                this.ctx.drawImage(this.assets.explosion, explosion.x, explosion.y, explosion.width, explosion.height);
            } else {
                // Simple explosion cercle animé
                this.ctx.fillStyle = `rgba(255, 120, 50, ${1 - explosion.frame / explosion.maxFrames})`;
                this.ctx.beginPath();
                this.ctx.arc(
                    explosion.x + explosion.width / 2,
                    explosion.y + explosion.height / 2,
                    (explosion.width / 2) * (1 + explosion.frame / explosion.maxFrames),
                    0,
                    Math.PI * 2
                );
                this.ctx.fill();
            }
        }
    }
    
    // Dessiner l'interface utilisateur
    drawUI() {
        this.ctx.fillStyle = '#ffb6c1';
        this.ctx.font = "16px 'Press Start 2P'";
        
        // Score
        this.ctx.textAlign = 'left';
        this.ctx.fillText(`SCORE: ${this.score}`, 20, 30);
        
        // Vies
        this.ctx.textAlign = 'right';
        this.ctx.fillText(`VIES: ${this.lives}`, this.canvas.width - 20, 30);
        
        // FPS (pour le débogage)
        if (false) {  // Activer en mode debug
            this.ctx.textAlign = 'right';
            this.ctx.fillText(`FPS: ${this.fps}`, this.canvas.width - 20, this.canvas.height - 20);
        }
    }
    
    // Dessiner l'écran de pause
    drawPauseScreen() {
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.ctx.fillStyle = '#ffb6c1';
        this.ctx.font = "24px 'Press Start 2P'";
        this.ctx.textAlign = 'center';
        this.ctx.fillText('PAUSE', this.canvas.width / 2, this.canvas.height / 2);
        
        this.ctx.font = "16px 'Press Start 2P'";
        this.ctx.fillText('Appuyez sur ESC pour continuer', this.canvas.width / 2, this.canvas.height / 2 + 40);
    }
}

// Fonction pour lancer le jeu Space Invaders
function launchSpaceInvadersGame() {
    // Créer un conteneur pour le jeu
    const gameContainer = document.createElement('div');
    gameContainer.className = 'space-invaders-container';
    gameContainer.style.position = 'fixed';
    gameContainer.style.top = '0';
    gameContainer.style.left = '0';
    gameContainer.style.width = '100vw';
    gameContainer.style.height = '100vh';
    gameContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.85)';
    gameContainer.style.display = 'flex';
    gameContainer.style.flexDirection = 'column';
    gameContainer.style.justifyContent = 'center';
    gameContainer.style.alignItems = 'center';
    gameContainer.style.zIndex = '10000';
    
    document.body.appendChild(gameContainer);
    
    // Ajouter un titre
    const title = document.createElement('h1');
    title.textContent = 'Space Invaders UwU';
    title.style.color = '#ffb6c1';
    title.style.fontFamily = "'Press Start 2P', monospace";
    title.style.textShadow = '0 0 10px rgba(255, 182, 193, 0.8)';
    title.style.marginBottom = '20px';
    gameContainer.appendChild(title);
    
    // Créer un div pour le jeu
    const gameDiv = document.createElement('div');
    gameDiv.className = 'game-area';
    gameContainer.appendChild(gameDiv);
    
    // Ajouter les instructions
    const instructions = document.createElement('div');
    instructions.style.color = 'white';
    instructions.style.fontFamily = "'Press Start 2P', monospace";
    instructions.style.fontSize = '12px';
    instructions.style.marginTop = '20px';
    instructions.style.textAlign = 'center';
    instructions.innerHTML = `
        <p>Flèches ← → pour déplacer</p>
        <p>Espace pour tirer</p>
        <p>Échap pour pause</p>
    `;
    gameContainer.appendChild(instructions);
    
    // Ajouter un bouton pour quitter
    const closeButton = document.createElement('button');
    closeButton.textContent = 'QUITTER';
    closeButton.style.marginTop = '20px';
    closeButton.style.padding = '10px 20px';
    closeButton.style.backgroundColor = '#ffb6c1';
    closeButton.style.border = 'none';
    closeButton.style.borderRadius = '5px';
    closeButton.style.fontFamily = "'Press Start 2P', monospace";
    closeButton.style.cursor = 'pointer';
    closeButton.addEventListener('click', () => {
        gameContainer.style.animation = 'fadeOut 0.5s forwards';
        setTimeout(() => {
            gameContainer.remove();
        }, 500);
    });
    gameContainer.appendChild(closeButton);
    
    // Ajouter le style pour l'animation de fondu
    if (!document.querySelector('style[data-id="space-invaders-styles"]')) {
        const style = document.createElement('style');
        style.setAttribute('data-id', 'space-invaders-styles');
        style.innerHTML = `
            @keyframes fadeOut {
                from { opacity: 1; }
                to { opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Créer et démarrer le jeu
    const game = new SpaceInvadersGame(gameDiv);
    
    return game;
}