var w = 500;
var a=20;
var k = 0.3;
var diag= 0.5;
var sz = 1000;
var p;
var running;
function setup() {
    ww=w/a;
    p = new Polyomino();
    p.addCell(new Cell(10,10,'red'));
    p.addCell(new Cell(10,11,'red'));
    p.addCell(new Cell(11,11,'red'));
    createCanvas(w,w);
    running = true;
}

function Cell(x,y,color) {
    this.color = color;
    this.x = x;
    this.y = y; 
}


Cell.prototype.draw = function() {
    fill(this.color);
    rect(this.x*a,this.y*a,a,a);
}

Cell.prototype.translate = function(x,y) {
    this.x = (this.x+x)%ww;
    if(this.x<0)
	this.x += ww;
    this.y = (this.y+y)%ww;
    if(this.y<0)
	this.y += ww;
}

function Polyomino() {
    this.cells = [];
    this.vx = 0;
    this.vy = 0;
}

Polyomino.prototype.draw = function() {
    for(var c of this.cells){
	c.draw();
    }
}

Polyomino.prototype.addCell = function(cell) {
    this.cells.push(cell);
}

Polyomino.prototype.translate = function(x,y) {
    for(var c of this.cells){
	c.translate(x,y);
    }
}

function keyPressed(){
    if(key == ' ')
	running = !(running);
    if(key == 'D') {
	p.vx +=0.1;
    }
    if(key == 'A') {
	p.vx -=0.1;
    }
    if(key == 'X') {
	p.vy +=0.1;
    }
    if(key == 'W') {
	p.vy -=0.1;
    }
    console.log(key);
}
function draw(){
    fill(256,256,256,50);
    rect(0,0,w,w);
    p.draw();
    if(running)
	p.translate(p.vx,p.vy);
}
