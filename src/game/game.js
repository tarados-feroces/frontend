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
        this.ctx.globalCompositeOperation = 'source-over';
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
        this.ctx.globalCompositeOperation = 'destination-out';
        this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, true);
        this.ctx.fill();
        this.ctx.closePath();
        // this.ctx.clearRect(this.x - this.radius, this.y - this.radius, this.radius * 2 + 2, this.radius * 2 + 2);
    }
}

class Player extends Object {
    constructor(ctx, x, y, speed = 5, radius = 20, color = 'red') {
        super(ctx, x, y, radius, color);
        this.speed = speed;
    }
}

class Bot extends Object {
    constructor(ctx, x, y, direction, timeout = 0, speed = 5, radius = 30, color = 'black') {
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

    // clear() {
    //     this.ctx.beginPath();
    //     this.ctx.arc(this.x, this.y, this.radius + 1, 0, 360, false);
    //     if (checkBotInField(this)) {
    //         this.ctx.fillStyle = '#1956a8';
    //         this.ctx.fill();
    //     }
    //     else {
    //         this.ctx.clearRect(this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2);
    //         // this.ctx.fillStyle = '#000a57';
    //     }
    //
    //     this.ctx.closePath();
    // }
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

    clear() {
        this.ctx.clearRect(this.x, this.y, this.width, this.height);
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
            if (!checkBotAlive(bot)) {
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
        let bot = new Bot(ctx, 50, 400, 'right', 500);
        this.createBot(bot);

        bot = new Bot(ctx, 50, 500, 'right', 33);
        this.createBot(bot);

        bot = new Bot(ctx, 400, 50, 'down');
        this.createBot(bot);

        bot = new Bot(ctx, this.arena.width - 100, 400, 'left', 800);
        this.createBot(bot);

        bot = new Bot(ctx, 500, this.arena.height - 100, 'up', 100);
        this.createBot(bot);
    }

    secondWave() {
        let bot = new Bot(ctx, 50, 400, 'right', 500);
        this.createBot(bot);

        bot = new Bot(ctx,  50, 200, 'right', 33);
        this.createBot(bot);

        bot = new Bot(ctx,  400, 50, 'down');
        this.createBot(bot);

        bot = new Bot(ctx,  this.arena.width - 100,  400, 'left', 800);
        this.createBot(bot);

        bot = new Bot(ctx,  500,  this.arena.height - 100, 'up', 100);
        this.createBot(bot);

        bot = new Bot(ctx,  50, 500, 'right', 1000);
        this.createBot(bot);

        bot = new Bot(ctx,  this.arena.width - 100, 500, 'left', 303);
        this.createBot(bot);

        bot = new Bot(ctx,  400,  150, 'down', 460);
        this.createBot(bot);

        bot = new Bot(ctx, this.arena.width - 100,  100, 'left', 300);
        this.createBot(bot);

        bot = new Bot(ctx, 500,  this.arena.height - 100, 'up', 150);
        this.createBot(bot);

        bot = new Bot(ctx, 300, this.arena.height - 100, 'up', 200);
        this.createBot(bot);

    }

    thirdWave() {
        let bot = new Bot(ctx,  50, this.arena.fieldY + 100, 'right', 100);
        this.createBot(bot);

        bot = new Bot(ctx,  50, this.arena.fieldY + 400, 'right', 250);
        this.createBot(bot);

        bot = new Bot(ctx,  200, this.arena.fieldY + 50, 'down', 421);
        this.createBot(bot);

        bot = new Bot(ctx,  this.arena.width - 100, 200, 'left', 330);
        this.createBot(bot);

        bot = new Bot(ctx, 700, this.arena.height - 100, 'up');
        this.createBot(bot);

        bot = new Bot(ctx, 50, this.arena.fieldY + 500, 'right', 579);
        this.createBot(bot);

        bot = new Bot(ctx, this.arena.width - 100,  70, 'left', 33);
        this.createBot(bot);

        bot = new Bot(ctx, this.arena.fieldX + 400,150, 'down', 134);
        this.createBot(bot);

        bot = new Bot(ctx, this.arena.width - 100, 350, 'left', 100);
        this.createBot(bot);

        bot = new Bot(ctx, 100,  this.arena.height - 100, 'up', 150);
        this.createBot(bot);

        bot = new Bot(ctx, 350, this.arena.height - 100, 'up', 400);
        this.createBot(bot);
    }

    fourthWave() {
        let bot = new Bot(ctx, 50,  100, 'right', 100);
        this.createBot(bot);

        bot = new Bot(ctx,  100,  50, 'down');
        this.createBot(bot);

        bot = new Bot(ctx, this.arena.width - 100,  200, 'left', 280);
        this.createBot(bot);

        bot = new Bot(ctx, 300, this.arena.height - 100, 'up');
        this.createBot(bot);

        bot = new Bot(ctx, 50, 200, 'right', 341);
        this.createBot(bot);

        bot = new Bot(ctx, 50, 400, 'right', 500);
        this.createBot(bot);

        bot = new Bot(ctx, this.arena.width - 100,  567, 'left', 290);
        this.createBot(bot);

        bot = new Bot(ctx, 400,  150, 'down', 134);
        this.createBot(bot);

        bot = new Bot(ctx, 400,  350, 'down', 400);
        this.createBot(bot);

        bot = new Bot(ctx, this.arena.width - 100,  450, 'left', 100);
        this.createBot(bot);

        bot = new Bot(ctx, 100, this.arena.height - 100, 'up', 450);
        this.createBot(bot);

        bot = new Bot(ctx, 350, this.arena.height - 100, 'up', 100);
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
arena.draw();

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


const checkBotAlive = (bot) => {
    if (bot.x + bot.radius <= arena.x || bot.x - bot.radius >= arena.x + arena.width) {
        return false;
    }
    if (bot.y + bot.radius <= arena.y || bot.y - bot.radius >= arena.y + arena.height) {
        return false;
    }
    return true;
};

// const checkBotInField = (bot) => {
//     if (bot.x + bot.radius <= arena.fieldX || bot.x - bot.radius >= arena.fieldX + arena.fieldWidth) {
//         return false;
//     }
//     if (bot.y + bot.radius <= arena.fieldY || bot.y - bot.radius >= arena.fieldY + arena.fieldHeight) {
//         return false;
//     }
//     return true;
// };

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

const gameLoop = () => {
    let animation = requestAnimationFrame(gameLoop);
    arena.clear();
        arena.draw();
        if (!movementControl(player)) {
            cancelAnimationFrame(animation);
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
                cancelAnimationFrame(animation);
                let anotherGame = confirm('You won!!! Do you want to play again?');
                anotherGame ? window.location.reload() : window.location.href = '../main-page/main-page.html';
            }
        }
};

setTimeout(() => {
    document.getElementById('header').style.display = 'none';
    requestAnimationFrame(gameLoop);
}, 1000);
