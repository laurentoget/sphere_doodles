var w = 1000;
var ww;
var k = 0.3;
var diag= 0.5;
var sz = 600;
var c;
function setup() {
    ww=w/10;
    createCanvas(w,w,WEBGL);
    c = cloud();
}

function randomPoint() {
    var r = [];
    r.push(2*Math.random() - 1);
    r.push(2*Math.random() - 1);
    r.push(2*Math.random() - 1);
    return r
}

function cartesian_norm(x) {
    return Math.sqrt( x[0] * x[0] + x[1] * x[1] + x[2] * x[2]);
}

function distance(p,q) {
    return cartesian_norm([p[0] - q[0],p[1] - q[1],p[2] - q[2]])
}

function normalize (x) {
    var l = cartesian_norm(x);
    var r = [];
    r.push( x[0]/l);
    r.push( x[1]/l);
    r.push( x[2]/l);
    return r;
}

function cloud() {
    var r = [];
    for(var i =0; i<sz; i++) {
	var p = normalize(randomPoint());
	r.push(p);
    }
    return r;
}

function closest(j,k) {
    var closest, range = 3;
    var minRange = distance( c[j], c[k]);
    var p = c[j];
    for(var i = 0; i<sz; i++){
	if (i!=j) {
	    var q = c[i];
	    var d = distance(p,q);
	    if (d < range && d> minRange){
		range = d;
		closest = i;
	    }
	}
    }
    return closest;
}

function twoD(p) {
    var x = w/2 + w * k * (p[0]+diag*p[1]);
    var y = w/2 + w * k * (p[2]+diag*p[1]);
    return [x,y];
}
function drawPoint(p) {
    push();
    translate((1+p[0])*ww,(1+p[1])*ww,(1+p[2])*ww);
    normalMaterial();
    sphere(5);
    pop();

}

function drawLine(i,j) {
    var p = c[i];
    var q = c[j];
    line((1+p[0])*ww, (1+p[1])*ww, (1+p[2])*ww, (1+q[0])*ww, (1+q[1])*ww, (1+q[2])*ww);
}

function draw() {
    orbitControl();
    for(var i = 0; i<sz; i++){
	stroke('red');
	drawPoint(c[i]);
	stroke('red');
	var cl = closest(i,i);
	drawLine(cl,i);
	cl = closest(i,cl);
	drawLine(cl,i);
	cl = closest(i,cl);
	drawLine(cl,i);
	cl = closest(i,cl);
	drawLine(cl,i);
    }
    
}
