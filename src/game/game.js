'use strict';

class Circle {
    constructor(x, y, radius = 10, color = 'blue', ctx = ctx) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.ctx = ctx;
        this.speed = 1;
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
        this.fieldHeight = this.width - 200;

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

    player.move(x, y);
};

window.addEventListener('keypress', (event) => {
    onkeydown(event);
    // movementControl(event, player);
});

window.addEventListener('keyup', (event) => {
    onkeyup(event);
    // movementControl(event, player);
});

setInterval(() => {
    movementControl(player);
}, 1000/224);


const checkBorderCollision = (player) => {
    if (player.x - player.radius <= arena.fieldX || player.x + player.radius >= arena.fieldX + arena.fieldWidth) {
        console.log('Out of border X');
    }
    if (player.y - player.radius <= arena.fieldY || player.y + player.radius >= arena.fieldY + arena.fieldHeight) {
        console.log('Out of border Y');
    }
};

const checkBotCollision = (player) => {
    bots.forEach((item) => {
        if (Math.abs(item.x - player.x) <= (item.radius + player.radius) &&
            Math.abs(item.y - player.y) <= (item.radius + player.radius)) {
            console.log('COLLISION!');
        }
    })
};

bots[0].move(-10, 0);
checkBotCollision(player);
