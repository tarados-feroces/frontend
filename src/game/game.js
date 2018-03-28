'use strict';

class Circle {
    constructor(x, y, radius = 10, color = 'blue', ctx = ctx) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.ctx = ctx;
        this.speed = 3;
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, 360, false);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
        this.ctx.closePath();
    }

    move(dx, dy) {
        this.clear();

        this.x += dx;
        this.y += dy;

        this.draw();
    }

    clear() {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius + 1, 0, 360, false);
        this.ctx.fillStyle = 'green';
        this.ctx.fill();
        this.ctx.closePath();

    }
}


class Arena {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.fieldX = 150;
        this.fieldY = 100;
        this.fieldWidth = this.width - 300;
        this.fieldHeight = this.height - 200;

    }

    draw(ctx = ctx) {
        ctx.beginPath();
        ctx.fillStyle = 'brown';
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = 'green';
        ctx.fillRect(this.fieldX, this.fieldY, this.fieldWidth, this.fieldHeight);
        ctx.closePath();
    }
}

const canvas = document.getElementById('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext('2d');

const arena = new Arena();
arena.draw(ctx);

const player = new Circle(250, 200, 20, 'red', ctx);
player.draw(ctx);

// player.move(100, 100);

const bots = [];
const bot = new Circle(300, 200, 20, 'black', ctx);
bots.push(bot);
bot.draw();

// window.addEventListener('resize', () => {canvas.width = window.innerWidth; canvas.height = window.innerHeight;});

const keyMap = {}; // You could also use an array

onkeydown = onkeyup = function(e){
    keyMap[e.keyCode] = (e.type === 'keypress' || e.type === 'keydown');
};



const movementControl = (player) => {

    let x = 0;
    let y = 0;
    if (keyMap[68]) {
        x += player.speed;
    }
    if (keyMap[65]) {
        x -= player.speed;
    }
    if (keyMap[83]) {
        y += player.speed;
    }
    if (keyMap[87]) {
        y -= player.speed;
    }

    if (!checkBorderCollision(player.x + x, player.y + y, player.radius)) {
        player.move(-x, -y);
        checkBotCollision(player);
        return;
    }

    player.move(x, y);
    checkBotCollision(player);
};

window.addEventListener('keypress', (event) => {
    onkeydown(event);
    // movementControl(event, player);
});

window.addEventListener('keyup', (event) => {
    onkeyup(event);
    // movementControl(event, player);
});

const gameLoop = setInterval(() => {
    movementControl(player);
}, 1000/74);


const checkBorderCollision = (x, y, radius) => {
    if (x - radius <= arena.fieldX || x + radius >= arena.fieldX + arena.fieldWidth) {
        return false;
    }
    if (y - radius <= arena.fieldY || y + radius >= arena.fieldY + arena.fieldHeight) {
        return false;
    }
    return true;
};

const checkBotCollision = (player) => {
    bots.forEach((item) => {
        const dx = item.x - player.x;
        const dy = item.y - player.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if ( dist < (item.radius + player.radius) ) {
            clearInterval(gameLoop);
            alert("You died!");
            window.location.href = "../main-page/main-page.html";
        }
    })
};

// bots[0].move(-10, 0);

