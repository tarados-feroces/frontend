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

    }

    draw(ctx = ctx) {
        ctx.beginPath();
        ctx.fillStyle = 'brown';
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = 'green';
        ctx.fillRect(this.x + 150, this.y + 100, this.width - 300, this.height - 200);
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

const map = {}; // You could also use an array
onkeydown = onkeyup = function(e){
    e = e || event; // to deal with IE
    map[e.keyCode] = e.type == 'keydown';
    /* insert conditional here */
}



const movementControl = (event, player) => {
    switch (event.keyCode) {
        case 68:
            switch (lastKey[0]) {
                case 87:
                    player.move(player.speed, -player.speed);
                    player.move(player.speed, -player.speed);
                    break;
                case 83:
                    player.move(player.speed, player.speed);
                    player.move(player.speed, player.speed);
                    break;
                default:
                    player.move(player.speed, 0);
                    player.move(player.speed, 0);
                    break;
            }
            updateKey(lastKey, 68);
            break;

        case 65:
            switch (lastKey[0]) {
                case 87:
                    player.move(-player.speed, -player.speed);
                    player.move(-player.speed, -player.speed);
                    break;
                case 83:
                    player.move(-player.speed, player.speed);
                    player.move(-player.speed, player.speed);
                    break;
                default:
                    player.move(-player.speed, 0);
                    player.move(-player.speed, 0);
                    break;
            }
            updateKey(lastKey, 65);
            break;
        case 87:
            switch (lastKey[0]) {
                case 68:
                    player.move(player.speed, -player.speed);
                    player.move(player.speed, -player.speed);
                    break;
                case 65:
                    player.move(-player.speed, -player.speed);
                    player.move(-player.speed, -player.speed);
                    break;
                default:
                    player.move(0, -player.speed);
                    player.move(0, -player.speed);
                    break;
            }
            updateKey(lastKey, 87);
            break;
        case 83:
            switch (lastKey[0]) {
                case 68:
                    player.move(player.speed, player.speed);
                    player.move(player.speed, player.speed);
                    break;
                case 65:
                    player.move(-player.speed, player.speed);
                    player.move(-player.speed, player.speed);
                    break;
                default:
                    player.move(0, player.speed);
                    player.move(0, player.speed);
                    break;
            }
            updateKey(lastKey, 83);
            break;
    }
};

window.addEventListener('keydown', onkeydown);
window.addEventListener('keyup', () =>  updateKey(lastKey, null));





// window.addEventListener('resize', () => {canvas.width = window.innerWidth; canvas.height = window.innerHeight;});