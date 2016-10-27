var w = 500;
var a=10;
var k = 0.3;
var diag= 0.5;
var sz = 1000;
var transparency = 70;
var p;
var running;

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

Polyomino.prototype.loadFromStorage = function(key) {
    json_p = sessionStorage.getItem(key);
    for(cell of JSON.parse(json_p)['cells']){
        this.addCell(new Cell(cell['x'],cell['y'],cell['color']));
    }
    console.log('loaded');
}

Polyomino.prototype.saveToStorage = function(key) {
    sessionStorage.setItem(key,JSON.stringify(p));
}

Polyomino.prototype.load = function() {
    if(sessionStorage.getItem('p')){
        this.loadFromStorage('p');
    }
    else {
      this.addCell(new Cell(10,10,'red'));
      this.addCell(new Cell(10,11,'red'));
      this.addCell(new Cell(11,11,'red'));
    }

}
