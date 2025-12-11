// ===== État du jeu =====
let players = [];
let currentPlayerIndex = 0;
let isSpinning = false;
let currentMode = 'safe'; // 'safe', 'medium', 'hard'

// ===== Gages =====
// Femme joue → fait une ACTION sur un homme 🔥
// Homme joue → répond à une QUESTION 🧠
const gages = [
    // ===== FEMME JOUE : Elle fait une action sur un homme 🔥 =====
    { text: "Embrasse le garçon de ton choix sur la bouche pendant 2 secondes", fromGender: "female" },
    { text: "Fais un bisou dans le cou du boy de ton choix pendant 5 secondes", fromGender: "female" },
    { text: "Fais un bisou dans les biceps du boy de ton choix pendant 5 secondes", fromGender: "female" },
    { text: "Prends le garçon de ton choix dans tes bras pendant 10 secondes", fromGender: "female" },
    { text: "Masse les épaules de {target} pendant 30 secondes", fromGender: "female" },
    { text: "Regarde le garçon de ton choix dans les yeux pendant 30 secondes sans parler", fromGender: "female" },
    { text: "Chuchote quelque chose de coquin à l'oreille de ton choix", fromGender: "female" },
    { text: "Fais une danse sensuelle devant le garçon de ton choix", fromGender: "female" },
    { text: "Embrasse la main de {target}", fromGender: "female" },
    { text: "Fais un bisou sur le front de {target}", fromGender: "female" },
    { text: "Assieds-toi sur les genoux de {target} pendant 30 secondes", fromGender: "female" },
    { text: "Caresse les cheveux de {target} pendant 15 secondes", fromGender: "female" },
    { text: "Dis à {target} ce que tu trouves de plus beau chez lui", fromGender: "female" },
    { text: "Galoche le boy de ton choix pendant 10 secondes", fromGender: "female" },
    { text: "Embrasse {target} sur l'épaule", fromGender: "female" },
    { text: "Prends la main de {target} et garde-la pendant 1 minute", fromGender: "female" },
    { text: "Avec le garçon de ton choix, dites un animalau hasard en meme temps, embrasser vous si vous n'etes pas corda", fromGender: "female" },
    
    // ===== HOMME JOUE : Il répond à une question 🧠 =====
    { text: "Combien font 2+2 sale de fils de pute ?", fromGender: "male" },
    { text: "Quelle est la capitale de la France (indice, Paris)?", fromGender: "male" },
    { text: "Première lettre de l'alphabet stp le sang", fromGender: "male" },
    { text: "Comment s'appelle l'artise peintre Frida Kahlo?", fromGender: "male" },
    { text: "Nomme 5 pays (tu as 10min) !", fromGender: "male" },
    { text: "Quelle est la couleur du cheval blanc de ton père ?", fromGender: "male" },
    { text: "Combien il y a de jours dans une année de 365 jours ?", fromGender: "male" },
    { text: "Tu aimes boire de l'eau ?", fromGender: "male" },
    { text: "Tu aimes le pein?", fromGender: "male" },
    { text: "Combien de jours dans une semaine cousin?", fromGender: "male" },
    { text: "Quel est le poisson que tu manges dans les pâtes au saumon (difficile)?", fromGender: "male" },
    { text: "Dans quelle ville se trouve la Tour Eiffel (c'est Paris hein)?", fromGender: "male" },
    { text: "Combien de continents il y a sur Terre  ?", fromGender: "male" },
    { text: "Récite les 7 jours de la semaine à l'envers ! (hard)", fromGender: "male" },
    { text: "Quelle est la capitale de l'Italie ?", fromGender: "male" },
    { text: "Combien font 9x9 ?", fromGender: "male" },
    { text: "Nomme 3 océans !", fromGender: "male" },
    { text: "Quel est le plus grand pays du monde ?", fromGender: "male" },
    { text: "Combien font 15x3 stp le sang ?", fromGender: "male" },
    { text: "Quelle est la capitale de l'Allemagne, (hard)", fromGender: "male" },
    { text: "De quelle couleur est le logo de Facebook ? (bleu)", fromGender: "male" },
    { text: "Quel animal est le roi de la jungle dans le roi LION ?", fromGender: "male" },
    { text: "Combien font 100-100 ?", fromGender: "male" },
    { text: "Quelle est la monnaie du Japon ? (Yen)", fromGender: "male" },
];

// Segments de la roue par mode
// id: "MONEY" = INTERDIT, la roue ne tombera JAMAIS dessus !!!
// id: "GAGE" = les vrais segments où on peut tomber (que des ❓ pour le suspense)
const wheelSegmentsByMode = {
    safe: [
        { id: "GAGE", label: "❓", color: "#ff2d55", weight: 2 },
        { id: "MONEY", label: "2€", color: "#ffd700", weight: 1 },
        { id: "GAGE", label: "❓", color: "#00f5d4", weight: 2 },
        { id: "MONEY", label: "5€", color: "#ffd700", weight: 1 },
        { id: "GAGE", label: "❓", color: "#f15bb5", weight: 2 },
        { id: "GAGE", label: "❓", color: "#00bbf9", weight: 2 },
        { id: "MONEY", label: "10€", color: "#ffd700", weight: 1 },
        { id: "GAGE", label: "❓", color: "#8ac926", weight: 2 },
    ],
    medium: [
        { id: "GAGE", label: "❓", color: "#ff2d55", weight: 2 },
        { id: "MONEY", label: "10€", color: "#ffd700", weight: 1 },
        { id: "GAGE", label: "❓", color: "#f15bb5", weight: 2 },
        { id: "MONEY", label: "25€", color: "#ffd700", weight: 1 },
        { id: "GAGE", label: "❓", color: "#00f5d4", weight: 2 },
        { id: "GAGE", label: "❓", color: "#00bbf9", weight: 2 },
        { id: "MONEY", label: "50€", color: "#ffd700", weight: 1 },
        { id: "GAGE", label: "❓", color: "#9b5de5", weight: 2 },
    ],
    hard: [
        { id: "GAGE", label: "❓", color: "#ff2d55", weight: 2 },
        { id: "MONEY", label: "50€", color: "#ffd700", weight: 1 },
        { id: "GAGE", label: "❓", color: "#f15bb5", weight: 2 },
        { id: "MONEY", label: "100€", color: "#ffd700", weight: 1 },
        { id: "GAGE", label: "❓", color: "#9b5de5", weight: 2 },
        { id: "GAGE", label: "❓", color: "#00bbf9", weight: 2 },
        { id: "MONEY", label: "500€", color: "#ffd700", weight: 1 },
        { id: "GAGE", label: "❓", color: "#ff6b35", weight: 2 },
    ],
};

// Fonction pour obtenir les segments actuels
function getWheelSegments() {
    return wheelSegmentsByMode[currentMode];
}

// Calculer les angles de chaque segment en fonction du poids
function getSegmentAngles() {
    const segments = getWheelSegments();
    const totalWeight = segments.reduce((sum, seg) => sum + seg.weight, 0);
    
    let angles = [];
    let currentAngle = 0;
    
    segments.forEach((seg, i) => {
        const segmentAngle = (seg.weight / totalWeight) * 360;
        angles.push({
            index: i,
            startAngle: currentAngle,
            endAngle: currentAngle + segmentAngle,
            midAngle: currentAngle + segmentAngle / 2,
            segment: seg
        });
        currentAngle += segmentAngle;
    });
    
    return angles;
}

// ===== Navigation =====
function hideAllScreens() {
    document.getElementById('landing').classList.remove('active');
    document.getElementById('registration').classList.remove('active');
    document.getElementById('modeSelection').classList.remove('active');
    document.getElementById('game').classList.remove('active');
}

function showLanding() {
    hideAllScreens();
    document.getElementById('landing').classList.add('active');
}

function showRegistration() {
    hideAllScreens();
    document.getElementById('registration').classList.add('active');
}

function showModeSelection() {
    hideAllScreens();
    document.getElementById('modeSelection').classList.add('active');
}

function selectMode(mode) {
    currentMode = mode;
    startGame();
}

function showGame() {
    hideAllScreens();
    document.getElementById('game').classList.add('active');
    drawWheel();
    updateTurnList();
}

// ===== Gestion des joueurs =====

// Ajout rapide d'un joueur prédéfini
function quickAddPlayer(name, gender) {
    // Vérifier si déjà ajouté
    if (players.some(p => p.name.toLowerCase() === name.toLowerCase())) {
        return;
    }
    
    const player = {
        name: name,
        gender: gender,
        hasPlayed: false
    };
    
    players.push(player);
    updatePlayersList();
    updateQuickButtons();
}

// Mettre à jour l'état des boutons quick select
function updateQuickButtons() {
    const buttons = document.querySelectorAll('.quick-btn');
    buttons.forEach(btn => {
        const name = btn.textContent.replace('👨 ', '').replace('👩 ', '').trim();
        if (players.some(p => p.name.toLowerCase() === name.toLowerCase())) {
            btn.classList.add('added');
        } else {
            btn.classList.remove('added');
        }
    });
}

function registerPlayer(event) {
    event.preventDefault();
    
    const nameInput = document.getElementById('playerName');
    const genderInput = document.querySelector('input[name="gender"]:checked');
    
    if (!nameInput.value.trim() || !genderInput) return false;
    
    const player = {
        name: nameInput.value.trim(),
        gender: genderInput.value,
        hasPlayed: false
    };
    
    // Vérifier si le joueur existe déjà
    if (players.some(p => p.name.toLowerCase() === player.name.toLowerCase())) {
        alert('Ce joueur existe déjà !');
        return false;
    }
    
    players.push(player);
    updatePlayersList();
    updateQuickButtons();
    
    // Reset form
    nameInput.value = '';
    genderInput.checked = false;
    
    return false;
}

function updatePlayersList() {
    const grid = document.getElementById('playersGrid');
    const startBtn = document.getElementById('startGameBtn');
    
    grid.innerHTML = players.map(p => `
        <div class="player-tag ${p.gender}">
            ${p.gender === 'male' ? '👨' : '👩'} ${p.name}
        </div>
    `).join('');
    
    // Vérifier qu'il y a au moins un homme et une femme
    const hasMale = players.some(p => p.gender === 'male');
    const hasFemale = players.some(p => p.gender === 'female');
    
    if (hasMale && hasFemale && players.length >= 2) {
        startBtn.style.display = 'inline-flex';
    } else {
        startBtn.style.display = 'none';
    }
}

function startGame() {
    if (players.length < 2) return;
    
    // Choisir un joueur aléatoire pour commencer
    currentPlayerIndex = Math.floor(Math.random() * players.length);
    
    updateCurrentPlayer();
    showGame();
}

// ===== Roue =====
function drawWheel() {
    const canvas = document.getElementById('wheelCanvas');
    const ctx = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 10;
    
    const segmentAngles = getSegmentAngles();
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    segmentAngles.forEach(({ startAngle, endAngle, segment }) => {
        // Convertir en radians et décaler pour que 0° soit en haut
        const startRad = (startAngle - 90) * Math.PI / 180;
        const endRad = (endAngle - 90) * Math.PI / 180;
        
        // Dessiner le segment
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, startRad, endRad);
        ctx.closePath();
        ctx.fillStyle = segment.color;
        ctx.fill();
        
        // Bordure
        ctx.strokeStyle = 'rgba(255,255,255,0.3)';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Label (emoji ou argent) au centre du segment
        const midRad = ((startAngle + endAngle) / 2 - 90) * Math.PI / 180;
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(midRad);
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        // Style différent pour l'argent
        if (segment.id === "MONEY") {
            ctx.font = 'bold 26px Arial';
            ctx.fillStyle = '#000';
            // Ajouter un contour blanc pour plus de visibilité
            ctx.strokeStyle = '#fff';
            ctx.lineWidth = 3;
            ctx.strokeText(segment.label, radius * 0.6, 0);
        } else {
            ctx.font = '28px Arial';
        }
        ctx.fillText(segment.label, radius * 0.6, 0);
        ctx.restore();
    });
}

let currentRotation = 0;

function spinWheel() {
    if (isSpinning) return;
    
    const currentPlayer = players[currentPlayerIndex];
    
    // Les femmes ont besoin d'un homme pour faire une action
    // Les hommes n'ont pas besoin de cible (juste des questions)
    let target = null;
    if (currentPlayer.gender === 'female') {
        const availableTargets = players.filter(p => p.gender === 'male');
        if (availableTargets.length === 0) {
            alert('Il faut au moins un homme pour que tu puisses faire ton action !');
            return;
        }
        target = availableTargets[Math.floor(Math.random() * availableTargets.length)];
    }
    
    isSpinning = true;
    const spinBtn = document.getElementById('spinBtn');
    spinBtn.disabled = true;
    
    const canvas = document.getElementById('wheelCanvas');
    
    // 🎰 ROUE 100% TRUQUÉE - JAMAIS D'ARGENT ! 😈
    const segmentAngles = getSegmentAngles();
    
    // Trouver UNIQUEMENT les segments GAGE (jamais MONEY!)
    const gageSegments = segmentAngles.filter(s => s.segment.id === "GAGE");
    
    // Choisir un segment GAGE aléatoire (JAMAIS money)
    const targetSegment = gageSegments[Math.floor(Math.random() * gageSegments.length)];
    
    // Taille du segment en degrés
    const segmentSize = targetSegment.endAngle - targetSegment.startAngle;
    
    // Position EXACTE au CENTRE du segment (plus de random dans le segment)
    const targetAngle = targetSegment.midAngle;
    
    // La rotation finale doit être telle que le pointeur (en haut) tombe sur targetAngle
    // Après tests, la formule correcte est simplement targetAngle
    // (la roue tourne et le segment à targetAngle arrive en haut)
    
    // Nombre de tours complets pour l'effet
    const fullSpins = 7 + Math.floor(Math.random() * 4); // 7 à 10 tours
    
    // NOUVELLE APPROCHE : calculer la rotation finale absolue
    // puis déterminer combien ajouter pour y arriver
    const desiredFinalAngle = targetAngle;
    const currentAngle = currentRotation % 360;
    let angleToAdd = desiredFinalAngle - currentAngle;
    if (angleToAdd < 0) angleToAdd += 360;
    
    // Rotation totale = tours complets + ajustement pour tomber pile sur le segment
    const newRotation = fullSpins * 360 + angleToAdd;
    
    currentRotation += newRotation;
    
    // DEBUG - vérifie que la rotation finale mod 360 = targetAngle
    console.log('🎯 Segment:', targetSegment.segment.label, 
                '| Target:', targetAngle.toFixed(1) + '°',
                '| Final rotation mod 360:', (currentRotation % 360).toFixed(1) + '°');
    
    // Animation CSS
    canvas.style.transition = 'transform 4s cubic-bezier(0.17, 0.67, 0.12, 0.99)';
    canvas.style.transform = `rotate(${currentRotation}deg)`;
    
    // Après l'animation
    setTimeout(() => {
        isSpinning = false;
        
        // Choisir un gage aléatoire
        const availableGages = gages.filter(g => g.fromGender === currentPlayer.gender);
        const gage = availableGages[Math.floor(Math.random() * availableGages.length)];
        
        // Afficher le gage
        showGage(currentPlayer, target, gage);
        
    }, 4000);
}

function showGage(player, target, gage) {
    const modal = document.getElementById('gageModal');
    const gageText = document.getElementById('gageText');
    const gageEmoji = document.querySelector('.gage-emoji');
    const modalTitle = document.querySelector('.modal-header h2');
    
    // Emoji et titre différent selon le type de gage
    if (player.gender === 'female') {
        // Femme joue = ACTION sur un homme 🔥
        gageEmoji.textContent = '🔥';
        modalTitle.textContent = 'ACTION !';
        
        // Remplacer le placeholder {target}
        let text = gage.text.replace('{target}', `<strong>${target.name}</strong>`);
        gageText.innerHTML = `<strong>${player.name}</strong>, ${text.charAt(0).toLowerCase() + text.slice(1)} !`;
    } else {
        // Homme joue = QUESTION 🧠
        gageEmoji.textContent = '🧠';
        modalTitle.textContent = 'QUESTION !';
        
        // Pas de target pour les questions, juste le joueur qui doit répondre
        gageText.innerHTML = `<strong>${player.name}</strong>, ${gage.text.charAt(0).toLowerCase() + gage.text.slice(1)}`;
    }
    
    modal.classList.add('active');
}

function closeModal() {
    const modal = document.getElementById('gageModal');
    modal.classList.remove('active');
    
    // Passer au joueur suivant
    nextPlayer();
}

function nextPlayer() {
    // Choisir un joueur ALÉATOIRE
    currentPlayerIndex = Math.floor(Math.random() * players.length);
    
    updateCurrentPlayer();
    updateTurnList();
    
    const spinBtn = document.getElementById('spinBtn');
    spinBtn.disabled = false;
}

function updateCurrentPlayer() {
    const nameSpan = document.getElementById('currentPlayerName');
    nameSpan.textContent = players[currentPlayerIndex].name;
}

function updateTurnList() {
    const list = document.getElementById('playersTurnList');
    // Afficher tous les joueurs, le joueur actuel est mis en évidence
    list.innerHTML = players.map((p, i) => {
        let className = 'turn-tag';
        if (i === currentPlayerIndex) className += ' active';
        return `<span class="${className}">${p.gender === 'male' ? '👨' : '👩'} ${p.name}</span>`;
    }).join('');
}

// Arrêter la partie et revenir à l'écran d'inscription
function stopGame() {
    // Reset la rotation de la roue
    currentRotation = 0;
    const canvas = document.getElementById('wheelCanvas');
    canvas.style.transition = 'none';
    canvas.style.transform = 'rotate(0deg)';
    
    // Retour à l'écran d'inscription
    showRegistration();
}

// ===== Utilitaires =====
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// ===== Init =====
document.addEventListener('DOMContentLoaded', () => {
    // Précharger la roue
    setTimeout(drawWheel, 100);
});

