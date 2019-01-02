const c = document.getElementById("canvas");
const ctx = c.getContext("2d");
const width = c.width = 1000;
const height = c.height = 500;

function board() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, width, height);
}
//snake
function Snake() {
    this.x = width/2;
    this.y = height/2;
    this.speedx = 0;
    this.speedy = 0;
    this.total = 1;
    this.length = [];
    this.alive = true;
    
}

Snake.prototype.draw = function () {
    ctx.fillStyle = "red";
    ctx.fillRect(this.length[this.total - 1].x, this.length[this.total - 1].y, 10, 10);
  
    for (var i = this.total - 2; i >=0; i--) {
        ctx.fillStyle = "grey";
        ctx.fillRect(this.length[i].x, this.length[i].y, 10, 10);
    }
}
document.addEventListener("keydown", checkKey, false);

function checkKey(e) {
    if (e.keyCode == 40 && s.speedy != -10) {
        s.speedy = 10;
        s.speedx = 0;
    }
    if (e.keyCode == 38 && s.speedy != 10) {
        s.speedy = -10;
        s.speedx = 0;
    }
    if (e.keyCode == 37 && s.speedx != 10) {
        s.speedx = -10;
        s.speedy = 0;
    }
    if (e.keyCode == 39 && s.speedx != -10) {
        s.speedx = 10;
        s.speedy = 0;
    }
    if (e.keyCode == 83) {
        s.speedy = 0;
        s.speedx = 0;
    }
    if (e.keyCode == 65) {
        s.total++;
    }
}
var s = new Snake();
Snake.prototype.move = function () { 
    for (var i = 0; i <= this.total - 1; i++) {
        this.length.push({ x: i, y: 0 });
    }
    var tempx = this.x;
    var tempy = this.y;
    var prevx = tempx;
    var prevy = tempy;
    this.x += this.speedx;
    this.y += this.speedy;
    this.checkWall();
    this.length[this.total - 1].x = this.x;
    this.length[this.total - 1].y = this.y;
    for (var i = this.total - 2; i >=0; i--) {
        tempx = this.length[i].x;
        tempy = this.length[i].y;
        this.length[i].x = prevx;
        this.length[i].y = prevy;
        prevx = tempx;
        prevy = tempy;
    }
    
   
}
Snake.prototype.checkWall = function () {
    if (this.x < 0) {
        this.total = 1;
        this.x = width / 2;
        this.y = height / 2;
        this.speedx = 0;
        this.speedy = 0;
    }
    if (this.x > width - 10) {
        this.total = 1;
        this.x = width / 2;
        this.y = height / 2;
        this.speedx = 0;
        this.speedy = 0;
    }
    if (this.y > height - 10) {
        this.total = 1;
        this.x = width / 2;
        this.y = height / 2;
        this.speedx = 0;
        this.speedy = 0;
    }
    if (this.y < 0) {
        this.total = 1;
        this.x = width / 2;
        this.y = height / 2;
        this.speedx = 0;
        this.speedy = 0;
    }
}
var foodx = 0;
var foody = 0;
var eaten = true;
function food() {
    if (eaten) {
        foodx = Math.floor(Math.random()* 100)*10;
        foody = Math.floor(Math.random() * 50)*10;
        eaten = false;
    }
    ctx.fillStyle = "green";
    ctx.fillRect(foodx, foody, 10, 10);
}

Snake.prototype.eat = function () {
    if (this.x == foodx && this.y == foody) {
        eaten = true;
        this.total++;
    }
}
Snake.prototype.checkCollision = function () {
    for (var i = this.total - 4; i >= 0; i--) {
        if (this.length[this.total - 1].x == this.length[i].x && this.length[this.total - 1].y == this.length[i].y) {
            this.total = 1;
        }
    }

}


function draw() {
    board();
    s.eat();    
    s.move();
    s.checkCollision();
    s.draw();
   
    
    food();
  
    
    
    

}
setInterval(draw, 1000 / 10);