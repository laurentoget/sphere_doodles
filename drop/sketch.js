var w=800;
var bps = [];
var pts = [];
var dragging = null;
var droplets = [];
var speed = 8;

function pt(x,y) {
    this.x = x;
    this.y = y;
}

pt.prototype.distsq = function(other) {
    return (this.x-other.x)*(this.x-other.x)+(this.y-other.y)*(this.y-other.y);
}

function bp(c1,c2,a){
    this.c1 = c1;
    this.c2 = c2;
    this.a = a;
}

bp.prototype.draw = function() {
    bezierVertex(this.c1.x,this.c1.y,this.c2.x,this.c2.y,this.a.x,this.a.y);
}

function droplet(x,y,r) {
    this.top = new pt(x,y);
    this.p1 = new pt(x-r,y+r);
    this.p2 = new pt(x+r,y+r);
    this.r = r;
    this.cut = false;
}

droplet.prototype.draw = function() {
    beginShape();
    if(!this.cut) {
	vertex(this.top.x,this.top.y);
	bezierVertex(this.top.x,this.p1.y-this.r*0.3,this.p1.x,this.p1.y-1.3*this.r,this.p1.x,this.p1.y);
    } else {
	vertex(this.p1.x,this.p1.y);
    }
    bezierVertex(this.p1.x,this.p1.y+1.3*this.r,this.p2.x,this.p2.y+1.3*this.r,this.p2.x,this.p2.y);
    if(!this.cut)
	bezierVertex(this.p2.x,this.p2.y-1.3*this.r,this.top.x,this.p2.y-this.r*0.3,this.top.x,this.top.y);
    else
	bezierVertex(this.p2.x,this.p2.y-1.3*this.r,this.p1.x,this.p1.y-1.3*this.r,this.p1.x,this.p1.y);
    endShape();
}

droplet.prototype.down = function(fall) {
    if(!this.cut && Math.random()>0.995)
	this.cut = true;
    if(this.cut) {
	this.p1.y += speed;
	this.p2.y += speed;
	return;
    }
	
    this.p1.y += fall;
    var dx =1*(Math.random()-0.5);
    this.p1.x += dx;
    this.p2.x += dx;
    this.p2.y += fall;
    
}

function mousePressed() {
    droplets.push(new droplet(mouseX,mouseY,5+30*Math.random()));
}
function setup() {
    createCanvas(w,w);
    droplets.push(new droplet(w/2,w/2,50));
}

function draw(){
    stroke('black');
    fill('white');
    rect(1,1,w-2,w-2);
    stroke('black');
    fill('red');
    for(dp of droplets) {
	dp.draw();
	var height = (w-dp.p1.y)/w;
	dp.down(speed*Math.random()*height*height);
    }
    if(random()>0.95)
	droplets.push(new droplet(Math.random()*w,Math.random()*w,5+30*Math.random()));
}
