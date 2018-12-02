// Enemies our player must avoid
class Enemy {
    constructor(positionX, positionY, move) {
        this.positionX = positionX; // X position on canvas.
        this.positionY = positionY; // Y position on canvas.
        this.moveSpeed = move; 
        this.sprite = 'images/enemy-bug.png';
        this.SALT = 250; // used for random speed generation per bug.
    }

    update(dt) {
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.
        this.positionX += this.moveSpeed * dt;

        // not on canvas, move the bug to start position
        // 506 is the width of the canvas.
        if (this.positionX > 506) {
            // width of the bug is 101px.
            // the head of bug should be to the left of the canvas.
            this.positionX = -101; 
            const calculatedRandomNumber = Math.floor(Math.random() * this.SALT);
            this.speed = calculatedRandomNumber + 100;
        }

        // incase of accident
        if (player.positionX < this.positionX + 60 &&
            player.positionX + 37 > this.positionX &&
            player.positionY < this.positionY + 25 &&
            30 + player.positionY > this.positionY) {
            player.positionX = 202;
            player.positionY = 375;
        }
    }

    render () {
        ctx.drawImage(Resources.get(this.sprite), this.positionX, this.positionY);
    }

}


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
    constructor(positionX, positionY) {
        this.positionX = positionX;
        this.positionY = positionY;
        this.speed = 50; // The speed at which the player can move.
        this.sprite = 'images/char-princess-girl.png';
    }

    update() {
        // keep the player within the canvas.
        if (this.positionY > 375) {
            this.positionY = 375;
        }

        if (this.positionX > 400) {
            this.positionX = 400;
        }

        if (this.positionX < 0) {
            this.positionX = 0;
        }

        // to the top.
        if (this.positionY < 0) {
            this.positionX = 202;
            this.positionY = 375;
        }
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.positionX, this.positionY);
    }

    handleInput(arrowKeys) {
        switch (arrowKeys) {
            case 'up':
                // Move up.
                this.positionY -= this.speed + 28;
                break;
            case 'right':
                this.positionX += this.speed + 45;
                break;
            case 'down':
                // Move down.
                this.positionY += this.speed + 28;
                break;
            case 'left':
                this.positionX -= this.speed + 45;
                break;            
        }
    }
}



// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];

// Every time Math.random() should be called so that initial speeds are different.
var enemyOne = new Enemy(0, 65, 100 + Math.floor(Math.random() * 250)); // ROW2
// Every time Math.random() should be called so that initial speeds are different.
var enemyTwo = new Enemy(0, 138, 100 + Math.floor(Math.random() * 250)); // ROW3
// Every time Math.random() should be called so that initial speeds are different.
var enemyThree = new Enemy(0, 230, 100 + Math.floor(Math.random() * 250)); // ROW4

allEnemies.push(enemyOne);
allEnemies.push(enemyTwo);
allEnemies.push(enemyThree);

// The player.
// default X position = 202. width of player is 101. approx center of 
// canvas will be 101 * 2 = 202
// default Y position approx= 375. width of each box is 100. 
// 4 * 100 - 25 (offset of player head) = 375
var player = new Player(202, 375);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});