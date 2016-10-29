function setup() {
    ww=w/a;
    for(var i=0;i<n;i+=1) {
	var p = new Polyomino();
	p.load(i);
	polyominoes.push(p);
    }
    createCanvas(w,w);
    running = true;
}

function keyPressed(){
    var p = polyominoes[current];
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
    if(key == 'N') {
        current +=1;
	if(current >=n)
	    current = 0;
    }

    if(key == 'C') {
	for(var i=0;i<n; i+=1){
	    p = polyominoes[i];
            p.saveToStorage('p'+i);
	}
        window.location = "index2.html";
    }

    console.log(key);
}
function draw(){
    drawContext()
    for(var p of polyominoes){
	p.draw();
	if(running)
	    p.translate(p.vx,p.vy);
    }
}
