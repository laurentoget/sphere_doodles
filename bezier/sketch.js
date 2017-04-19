var w = 800;
var bps = [];
var pts = [];
var dragging = null;

function setup() {
    createCanvas(w,w);
}

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

function mousePressed(){
    for(p of pts) {
	var d = p.distsq(new pt(mouseX,mouseY));
	if (d<40){
	    dragging = p;
	}
    }
    if(dragging!=null)
	return;
    
    var anch = new pt(w/2,w/2)
    var oc2 = new pt(anch.x-10,anch.y);
    if(pts.length>2){
	anch = pts[pts.length-3]
	oc2 = pts[pts.length-1];
    }
    var a = new pt(mouseX,mouseY);
    var c1 = new pt(2*anch.x-oc2.x,2*anch.y-oc2.y);
    var c2 = new pt(c1.x+10,c1.y);
    var b = new bp(c1,c2,a);
    pts.push(a);
    pts.push(c1);
    pts.push(c2);
    bps.push(b);
}

function mouseDragged() {
    if(dragging == null)
	return;
    dragging.x = mouseX;
    dragging.y = mouseY;
}

function mouseReleased() {
    dragging = null;
}

function draw(){
    fill('white');
    rect(0,0,w,w);
    beginShape();
    vertex(w/2,w/2);
    for(b of bps) {
	b.draw();
    }
    endShape();
    var previous = new pt(w/2,w/2);
    for(b of bps) {
	stroke('red');
	ellipse(b.a.x,b.a.y,10,10);
	stroke('blue');
	ellipse(b.c1.x,b.c1.y,10,10);
	ellipse(b.c2.x,b.c2.y,10,10);
	stroke('purple');
	line(b.c1.x,b.c1.y,b.c2.x,b.c2.y);
	stroke('pink');
	line(previous.x,previous.y,b.c1.x,b.c1.y);
	line(b.a.x,b.a.y,b.c2.x,b.c2.y);
	previous = b.a;
    }
}
