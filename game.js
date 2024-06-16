const races = {
    human: { health: 100, speed: 5 },
    elf: { health: 80, speed: 7 },
    dwarf: { health: 120, speed: 4 }
};

const classes = {
    warrior: { attack: 10, defense: 5 },
    mage: { attack: 15, defense: 2 },
    rogue: { attack: 12, defense: 3 }
};

const talentTrees = {
    warrior: [
        { name: 'Sword Mastery', description: 'Increase sword damage by 10%', selected: false },
        { name: 'Shield Block', description: 'Increase block chance by 5%', selected: false },
        { name: 'Berserk', description: 'Increase attack speed by 20%', selected: false }
    ],
    mage: [
        { name: 'Fireball', description: 'Increase fireball damage by 15%', selected: false },
        { name: 'Ice Shield', description: 'Reduce damage taken by 10%', selected: false },
        { name: 'Arcane Blast', description: 'Increase arcane damage by 20%', selected: false }
    ],
    rogue: [
        { name: 'Backstab', description: 'Increase backstab damage by 20%', selected: false },
        { name: 'Evasion', description: 'Increase dodge chance by 10%', selected: false },
        { name: 'Poison', description: 'Increase poison damage by 15%', selected: false }
    ]
};

const player = {
    race: 'human',
    class: 'warrior',
    x: 400,
    y: 300,
    width: 50,
    height: 50,
    color: 'blue',
    health: 100,
    speed: 5,
    attack: 10,
    defense: 5,
    talents: [],
    inventory: []
};

const enemies = [
    { x: 100, y: 100, width: 50, height: 50, color: 'red', health: 50, speed: 2, agro: false },
    { x: 700, y: 100, width: 50, height: 50, color: 'red', health: 50, speed: 2, agro: false },
    { x: 100, y: 500, width: 50, height: 50, color: 'red', health: 50, speed: 2, agro: false },
    { x: 700, y: 500, width: 50, height: 50, color: 'red', health: 50, speed: 2, agro: false }
];

const itemTiers = [
    { name: 'Gray', color: '#808080' },
    { name: 'White', color: '#FFFFFF' },
    { name: 'Green', color: '#008000' },
    { name: 'Blue', color: '#0000FF' },
    { name: 'Purple', color: '#800080' },
    { name: 'Red', color: '#FF0000' }
];

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Simple validation
    if (username && password) {
        document.getElementById('loginScreen').classList.add('hidden');
        document.getElementById('characterCreationScreen').classList.remove('hidden');
    } else {
        alert('Please enter both username and password.');
    }
}

function createCharacter() {
    const selectedRace = document.getElementById('race').value;
    const selectedClass = document.getElementById('class').value;

    // Assign selected race and class to player
    player.race = selectedRace;
    player.class = selectedClass;
    player.health = races[selectedRace].health;
    player.speed = races[selectedRace].speed;
    player.attack = classes[selectedClass].attack;
    player.defense = classes[selectedClass].defense;

    // Hide character creation screen and show talent tree screen
    document.getElementById('characterCreationScreen').classList.add('hidden');
    document.getElementById('talentTreeScreen').classList.remove('hidden');

    // Generate the talent tree
    generateTalentTree(selectedClass);
}

function generateTalentTree(className) {
    const talentTree = document.getElementById('talentTree');
    talentTree.innerHTML = '';

    talentTrees[className].forEach((talent, index) => {
        const talentElement = document.createElement('div');
        talentElement.className = 'talent';
        talentElement.innerHTML = `<h4>${talent.name}</h4><p>${talent.description}</p>`;
        talentElement.onclick = () => selectTalent(className, index);
        talentTree.appendChild(talentElement);
    });
}

function selectTalent(className, index) {
    const talent = talentTrees[className][index];
    talent.selected = !talent.selected;

    // Update the talent tree display
    generateTalentTree(className);

    // Update player's talents
    if (talent.selected) {
        player.talents.push(talent.name);
    } else {
        player.talents = player.talents.filter(t => t !== talent.name);
    }
}

function startGame() {
    document.getElementById('talentTreeScreen').classList.add('hidden');
    update();
}

function drawPlayer() {
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

function drawEnemies
