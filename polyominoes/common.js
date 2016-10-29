var w = 500;
var a=10;
var k = 0.3;
var diag= 0.5;
var sz = 1000;
var transparency = 70;
var p;
var polyominoes = [];
var running;
var n = 6;
var current = 0;
var colors = ['red','yellow','blue','green','orange','purple'];
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
    this.x = 0;
    this.y = 0;
    this.vx = 0;
    this.vy = 0;
}

Polyomino.prototype.draw = function() {
    push()
    translate(this.x,this.y)
    for(var c of this.cells){
	c.draw();
    }
    pop()
}

Polyomino.prototype.addCell = function(cell) {
    this.cells.push(cell);
}

Polyomino.prototype.translate = function(x,y) {
    this.x = (this.x+x)%w;
    this.y = (this.y+y)%w;
    if(this.x<0)
	this.x +=w;
    if(this.y<0)
	this.y +=w;
}

Polyomino.prototype.loadFromStorage = function(key) {
    json_p = sessionStorage.getItem(key);
    parsed_p = JSON.parse(json_p)
    for(cell of parsed_p['cells']){
        this.addCell(new Cell(cell['x'],cell['y'],cell['color']));
    }
    this.x = asNumber(parsed_p['x'])
    this.y = asNumber(parsed_p['y'])
    this.vx = asNumber(parsed_p['vx'])
    this.vy = asNumber(parsed_p['vy'])
}

function asNumber(x) {
    var r = parseFloat(x)
    if(Number.isNaN(r))
	return 0
    return r
}

Polyomino.prototype.saveToStorage = function(key) {
    sessionStorage.setItem(key,JSON.stringify({"cells":this.cells,"x":this.x,"y":this.y,"vx":this.vx,"vy":this.vy}));
}

Polyomino.prototype.load = function(i) {
    if(sessionStorage.getItem('p'+i)){
        this.loadFromStorage('p'+i);
    }
    else {
	var col = colors[i];
	this.addCell(new Cell(0,0,col));
	this.addCell(new Cell(0,1,col));
	this.addCell(new Cell(1,1,col));
    }

}

Polyomino.prototype.corners = function() {
    var minx = w;
    var miny = w;
    var maxx = -w;
    var maxy = -w;
    for(c of this.cells) {
	if(c.x<minx)
	    minx = c.x;
	if(c.y<miny)
	    miny = c.y;
	if(c.x>maxx)
	    maxx = c.x;
	if(c.y>maxy)
	    maxy = c.y;
	
    }
    return [minx,miny,maxx,maxy]
}

function drawContext() {
    fill(256,256,256,transparency);
    stroke(colors[current])
    strokeWeight(8)
    rect(0,0,w-1,w-1);
    stroke('black')
    strokeWeight(2)

}
