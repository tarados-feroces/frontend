'use strict';


const canvas = document.getElementById('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext('2d');

class Object {
    constructor(ctx, x, y, radius = 20, color = 'blue') {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.ctx = ctx;
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
        this.ctx.fillStyle = '#1956a8';
        this.ctx.fill();
        this.ctx.closePath();
    }
}

class Player extends Object {
    constructor(ctx, x, y, speed = 3, radius = 20, color = 'red') {
        super(ctx, x, y, radius, color);
        this.speed = speed;
    }
}

class Bot extends Object {
    constructor(ctx, x, y, direction, timeout = 0, speed = 4, radius = 30, color = 'black') {
        super(ctx, x, y, radius, color);
        this.direction = direction;
        this.speed = speed;
        this.speedDirections = {
            right: [this.speed, 0],
            left: [-this.speed, 0],
            up: [0, -this.speed],
            down: [0, this.speed]
        };
        this.isActive = true;
        this.timeout = timeout;
    }

    movement() {
        this.move(this.speedDirections[this.direction][0], this.speedDirections[this.direction][1]);
    }
}
class Arena {
    constructor(ctx) {
        this.x = 0;
        this.y = 0;
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.fieldX = 400;
        this.fieldY = 200;
        this.fieldWidth = this.width - 800;
        this.fieldHeight = this.height - 400;
        this.ctx = ctx;

    }

    draw(ctx = this.ctx) {
        ctx.beginPath();
        ctx.fillStyle = '#000a57';
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = '#1956a8';
        ctx.fillRect(this.fieldX, this.fieldY, this.fieldWidth, this.fieldHeight);
        ctx.closePath();
    }
}

class Round {
    constructor(arena) {
        this.bots = [];
        this.wave = 1;
        this.arena = arena;
    }

    checkBots() {
        let counter = 0;
        this.bots.forEach((bot) => {
            if (!checkBorderCollision(bot.x, bot.y, bot.radius + 2)) {
                counter += 1;
                bot.clear();
                bot.isActive = false;
            }
        });

        if (counter === this.bots.length) {
            this.bots = [];
        }
    }

    createBot(bot) {
        setTimeout(() => {
            this.bots.push(bot);
            bot.draw();}, bot.timeout);
    }

    firstWave() {
        let bot = new Bot(ctx, this.arena.fieldX + 50, this.arena.fieldY + 400, 'right', 500);
        this.createBot(bot);

        bot = new Bot(ctx, this.arena.fieldX + 50, this.arena.fieldY + 500, 'right', 33);
        this.createBot(bot);

        bot = new Bot(ctx, this.arena.fieldX + 400, this.arena.fieldY + 50, 'down');
        this.createBot(bot);

        bot = new Bot(ctx, this.arena.fieldX + this.arena.fieldWidth - 100, this.arena.fieldY + 400, 'left', 800);
        this.createBot(bot);

        bot = new Bot(ctx, this.arena.fieldX + 500, this.arena.fieldY + this.arena.fieldHeight - 100, 'up', 100);
        this.createBot(bot);
    }

    secondWave() {
        let bot = new Bot(ctx, this.arena.fieldX + 50, this.arena.fieldY + 400, 'right', 500);
        this.createBot(bot);

        bot = new Bot(ctx, this.arena.fieldX + 50, this.arena.fieldY + 200, 'right', 33);
        this.createBot(bot);

        bot = new Bot(ctx, this.arena.fieldX + 400, this.arena.fieldY + 50, 'down');
        this.createBot(bot);

        bot = new Bot(ctx, this.arena.fieldX + this.arena.fieldWidth - 100, this.arena.fieldY + 400, 'left', 800);
        this.createBot(bot);

        bot = new Bot(ctx, this.arena.fieldX + 500, this.arena.fieldY + this.arena.fieldHeight - 100, 'up', 100);
        this.createBot(bot);

        bot = new Bot(ctx, this.arena.fieldX + 50, this.arena.fieldY + 500, 'right', 1000);
        this.createBot(bot);

        bot = new Bot(ctx, this.arena.fieldX + this.arena.fieldWidth - 100, this.arena.fieldY + 500, 'left', 303);
        this.createBot(bot);

        bot = new Bot(ctx, this.arena.fieldX + 400, this.arena.fieldY + 150, 'down', 460);
        this.createBot(bot);

        bot = new Bot(ctx, this.arena.fieldX + this.arena.fieldWidth - 100, this.arena.fieldY + 100, 'left', 300);
        this.createBot(bot);

        bot = new Bot(ctx, this.arena.fieldX + 500, this.arena.fieldY + this.arena.fieldHeight - 100, 'up', 150);
        this.createBot(bot);

        bot = new Bot(ctx, this.arena.fieldX + 300, this.arena.fieldY + this.arena.fieldHeight - 100, 'up', 200);
        this.createBot(bot);

    }

    thirdWave() {
        let bot = new Bot(ctx, this.arena.fieldX + 50, this.arena.fieldY + 100, 'right', 100);
        this.createBot(bot);

        bot = new Bot(ctx, this.arena.fieldX + 50, this.arena.fieldY + 400, 'right', 250);
        this.createBot(bot);

        bot = new Bot(ctx, this.arena.fieldX + 200, this.arena.fieldY + 50, 'down', 421);
        this.createBot(bot);

        bot = new Bot(ctx, this.arena.fieldX + this.arena.fieldWidth - 100, this.arena.fieldY + 200, 'left', 330);
        this.createBot(bot);

        bot = new Bot(ctx, this.arena.fieldX + 700, this.arena.fieldY + this.arena.fieldHeight - 100, 'up');
        this.createBot(bot);

        bot = new Bot(ctx, this.arena.fieldX + 50, this.arena.fieldY + 500, 'right', 579);
        this.createBot(bot);

        bot = new Bot(ctx, this.arena.fieldX + this.arena.fieldWidth - 100, this.arena.fieldY + 70, 'left', 33);
        this.createBot(bot);

        bot = new Bot(ctx, this.arena.fieldX + 400, this.arena.fieldY + 150, 'down', 134);
        this.createBot(bot);

        bot = new Bot(ctx, this.arena.fieldX + this.arena.fieldWidth - 100, this.arena.fieldY + 350, 'left', 100);
        this.createBot(bot);

        bot = new Bot(ctx, this.arena.fieldX + 100, this.arena.fieldY + this.arena.fieldHeight - 100, 'up', 150);
        this.createBot(bot);

        bot = new Bot(ctx, this.arena.fieldX + 350, this.arena.fieldY + this.arena.fieldHeight - 100, 'up', 400);
        this.createBot(bot);
    }

    fourthWave() {
        let bot = new Bot(ctx, this.arena.fieldX + 50, this.arena.fieldY + 100, 'right', 100);
        this.createBot(bot);

        bot = new Bot(ctx, this.arena.fieldX + 100, this.arena.fieldY + 50, 'down');
        this.createBot(bot);

        bot = new Bot(ctx, this.arena.fieldX + this.arena.fieldWidth - 100, this.arena.fieldY + 200, 'left', 280);
        this.createBot(bot);

        bot = new Bot(ctx, this.arena.fieldX + 300, this.arena.fieldY + this.arena.fieldHeight - 100, 'up');
        this.createBot(bot);

        bot = new Bot(ctx, this.arena.fieldX + 50, this.arena.fieldY + 200, 'right', 341);
        this.createBot(bot);

        bot = new Bot(ctx, this.arena.fieldX + 50, this.arena.fieldY + 400, 'right', 500);
        this.createBot(bot);

        bot = new Bot(ctx, this.arena.fieldX + this.arena.fieldWidth - 100, this.arena.fieldY + 567, 'left', 290);
        this.createBot(bot);

        bot = new Bot(ctx, this.arena.fieldX + 400, this.arena.fieldY + 150, 'down', 134);
        this.createBot(bot);

        bot = new Bot(ctx, this.arena.fieldX + 400, this.arena.fieldY + 350, 'down', 400);
        this.createBot(bot);

        bot = new Bot(ctx, this.arena.fieldX + this.arena.fieldWidth - 100, this.arena.fieldY + 450, 'left', 100);
        this.createBot(bot);

        bot = new Bot(ctx, this.arena.fieldX + 100, this.arena.fieldY + this.arena.fieldHeight - 100, 'up', 450);
        this.createBot(bot);

        bot = new Bot(ctx, this.arena.fieldX + 350, this.arena.fieldY + this.arena.fieldHeight - 100, 'up', 100);
        this.createBot(bot);
    }

    initWave() {
        switch (this.wave) {
            case 1:
                this.firstWave();
                break;
            case 2:
                this.secondWave();
                break;
            case 3:
                this.thirdWave();
                break;
            case 4:
                this.fourthWave();
                break;
            default:
                return false;
        }
        this.wave += 1;
        return true;
    }
}



const arena = new Arena(ctx);
arena.draw(ctx);

const player = new Player(ctx, arena.fieldX + arena.fieldWidth / 2, arena.fieldY + arena.fieldHeight / 2);
player.draw(ctx);

const keyMap = {};

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

        return true;
    }

    player.move(x, y);
    return checkBotCollision(player);
};

window.addEventListener('keypress', (event) => {
    onkeydown(event);
    // movementControl(event, player);
});

window.addEventListener('keyup', (event) => {
    onkeyup(event);
    // movementControl(event, player);
});

const round = new Round(arena);




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
    let result = true;
    round.bots.forEach((item) => {
        const dx = item.x - player.x;
        const dy = item.y - player.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if ( dist < (item.radius + player.radius) ) {
            result = false;
        }
    });

    return result;
};

setTimeout(() => {
    document.getElementById('header').style.display = 'none';
    const gameLoop = setInterval(() => {
        if (!movementControl(player)) {
            clearInterval(gameLoop);
            let anotherGame = confirm('You died!!! Do you want to play again?');
            anotherGame ? window.location.reload() : window.location.href = '../main-page/main-page.html';
        }

        round.bots.forEach((bot) => {
            if (bot.isActive) {
                bot.movement();
            }

        });
        round.checkBots();
        if (round.bots.length === 0) {
            if (!round.initWave()) {
                let anotherGame = confirm('You won!!! Do you want to play again?');
                clearInterval(gameLoop);
                anotherGame ? window.location.reload() : window.location.href = '../main-page/main-page.html';
            }
        }
    }, 1000/74);
}, 1000);
