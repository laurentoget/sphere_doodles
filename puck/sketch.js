var x,y,dx,dy;
var w = 600;
var n;
var a = 40;
var puck;
var terrain = [];
var elem = [];
var pucks = [];
var glyphs = [];
var last, gap;
var context,oscillator,analyser;
var notes = [];
function setNotes() {
    var current = 110;
    notes.push(current);
    var semi = Math.pow(2,1/12);
    current = current *semi*semi*semi;
    notes.push(current);
    current = current*semi*semi;
    notes.push(current);
    current = current *semi*semi;
    notes.push(current);
    current = current *semi*semi*semi;
    notes.push(current);
    current = current *semi*semi*semi;
    notes.push(current);
    current = current*semi*semi;
    notes.push(current);
    current = current *semi*semi;
    notes.push(current);
    current = current *semi*semi*semi;
    notes.push(current);
    current = current *semi*semi*semi;
    notes.push(current);
    current = current*semi*semi;
    notes.push(current);
    current = current *semi*semi;
    notes.push(current);
    current = current *semi*semi*semi;
    notes.push(current);
}
function setup() {
    setNotes()
    n = Math.floor(w/a);
    context = new (window.AudioContext || window.webkitAudioContext)();
    for(var i=0; i<n*n; i+= 1)
	terrain.push(null);
    pucks.push(new Puck());
    puck = loadImage("puck.png");
    left = loadImage("left.png");
    right = loadImage("right.png");
    se = loadImage("se.png");
    ne = loadImage("ne.png");
    ew = loadImage("ew.png");
    ns = loadImage("ns.png");
    glyphs = [left,right,se,ne,ew,ns];
    createCanvas(w,w);
    var d = new Date()
    last = d.getTime();
    gap = 100;
}
function play(x,y) {
    oscillator = context.createOscillator();
    analyser = context.createAnalyser();    n = w/a;
    oscillator.connect(analyser);
    analyser.connect(context.destination);
    oscillator.frequency.value = notes[x%(notes.length)];
    oscillator.type = "sine";
    oscillator.start(0);
    oscillator.stop(context.currentTime+gap/1000);
}

function Puck(){
    this.x = 0;
    this.y = 0;
    this.lastx = 0;
    this.lasty = 0;
    this.nextx = 0;
    this.nexty = 0;
    this.dx = 1;
    this.dy = 1;
}

Puck.prototype.increment = function(elapsed) {
    this.x = this.lastx+ elapsed/gap*(this.nextx-this.lastx);
    this.y = this.lasty+ elapsed/gap*(this.nexty-this.lasty);
}

Puck.prototype.move = function(){
    if(terrain[this.x+n*this.y] != null) {
	play(this.x,this.y);
	var o = terrain[this.x+n*this.y];
	if(o['kind'] == 1) {
	    var yy = this.dx;
	    this.dx = -this.dy;
	    this.dy = yy;
	} else if  (o['kind'] == 0) {
	    var xx = this.dy;
	    this.dy = -this.dx;
	    this.dx = xx;
	} else if  (o['kind'] == 2) {
	    var xx = this.dy;
	    this.dy = this.dx;
	    this.dx = xx;	    
	} else if  (o['kind'] == 3) {
	    var xx = -this.dy;
	    this.dy = -this.dx;
	    this.dx = xx;	    
	} else if  (o['kind'] == 4) {
	    this.dy = -this.dy;
	} else if  (o['kind'] == 5) {
	    this.dx = -this.dx;
	}
    }

    this.x += this.dx;
    this.x = this.x%n;
    if(this.x<0)
	this.x += n;
    this.y += this.dy;
    this.y = this.y%n;
    if(this.y<0)
	this.y += n;
}

Puck.prototype.draw = function(){
    image(puck,this.x*a,this.y*a);
}

function mousePressed() {

    var xx = Math.floor(mouseX/a);
    var yy = Math.floor(mouseY/a);
    var rank = xx + n* yy;
    if(terrain[rank] == null) {
	terrain[rank] = {"kind":0,"elem":elem.length};
        elem.push({"kind":0,"x":xx,"y":yy});
    } else {
	if(terrain[rank]['kind']<glyphs.length-1) {
	    terrain[rank]['kind'] += 1;
	    elem[terrain[rank]['elem']]['kind'] = terrain[rank]['kind'];
	} else {
	    if(terrain[rank]['elem']<elem.length - 1) {
		lastelem = elem[elem.length - 1];
		elem[terrain[rank]['elem']] = lastelem;
		terrain[lastelem['x']+n*lastelem['y']]['elem']=terrain[rank]['elem'];
	    }
	    elem.splice(elem.length-1,1);
	    terrain[rank] = null;
	}
    }
    
}

function keyPressed() {
    if(key == 'N')
	pucks.push(new Puck());
}

function move() {
    var d = new Date()
    if(d.getTime()-last < gap)
	return;
    for(p of pucks){
	p.move();
    }
    last = d.getTime();
}
function draw(){
    fill('white');
    rect(0,0,w-1,w-1)
    for(e of elem){
	image(glyphs[e['kind']],e['x']*a,e['y']*a);
    }
    for(p of pucks)
	p.draw();
    move();
}
