const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const player = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    width: 50,
    height: 50,
    color: 'blue',
    speed: 5,
    health: 100,
    inventory: []
};

const enemies = [
    { x: 100, y: 100, width: 50, height: 50, color: 'red', health: 50, speed: 2 },
    { x: 700, y: 100, width: 50, height: 50, color: 'red', health: 50, speed: 2 },
    { x: 100, y: 500, width: 50, height: 50, color: 'red', health: 50, speed: 2 },
    { x: 700, y: 500, width: 50, height: 50, color: 'red', health: 50, speed: 2 }
];

const itemTiers = [
    { name: 'Gray', color: '#808080' },
    { name: 'White', color: '#FFFFFF' },
    { name: 'Green', color: '#008000' },
    { name: 'Blue', color: '#0000FF' },
    { name: 'Purple', color: '#800080' },
    { name: 'Red', color: '#FF0000' }
];

function drawPlayer() {
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

function drawEnemies() {
    enemies.forEach(enemy => {
        ctx.fillStyle = enemy.color;
        ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
    });
}

function updateUI() {
    document.getElementById('playerHealth').textContent = `Player Health: ${player.health}`;
    document.getElementById('inventory').textContent = `Inventory: ${player.inventory.map(item => item.name).join(', ')}`;
}

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPlayer();
    drawEnemies();
    moveEnemies();
    updateUI();
    requestAnimationFrame(update);
}

function movePlayer(event) {
    switch (event.key) {
        case 'ArrowUp':
            player.y -= player.speed;
            break;
        case 'ArrowDown':
            player.y += player.speed;
            break;
        case 'ArrowLeft':
            player.x -= player.speed;
            break;
        case 'ArrowRight':
            player.x += player.speed;
            break;
        case ' ':
            attackEnemies();
            break;
    }
}

function moveEnemies() {
    enemies.forEach(enemy => {
        if (enemy.x < player.x) enemy.x += enemy.speed;
        if (enemy.x > player.x) enemy.x -= enemy.speed;
        if (enemy.y < player.y) enemy.y += enemy.speed;
        if (enemy.y > player.y) enemy.y -= enemy.speed;
    });
}

function checkCollision(rect1, rect2) {
    return rect1.x < rect2.x + rect2.width &&
           rect1.x + rect1.width > rect2.x &&
           rect1.y < rect2.y + rect2.height &&
           rect1.y + rect1.height > rect2.y;
}

function attackEnemies() {
    enemies.forEach((enemy, index) => {
        if (checkCollision(player, enemy)) {
            enemy.health -= 10;
            if (enemy.health <= 0) {
                dropLoot(enemy);
                enemies.splice(index, 1);
            }
        }
    });
}

function dropLoot(enemy) {
    const randomTier = itemTiers[Math.floor(Math.random() * itemTiers.length)];
    const item = {
        name: `${randomTier.name} Item`,
        color: randomTier.color
    };
    player.inventory.push(item);
}

document.addEventListener('keydown', movePlayer);
update();
