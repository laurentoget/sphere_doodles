function setup() {
    ww=w/a;
    p = new Polyomino();
    p.load();
    createCanvas(w,w);
    running = true;
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
    if(key == 'C') {
        p.saveToStorage('p');
        window.location = "index2.html";
    }

    console.log(key);
}
function draw(){
    fill(256,256,256,transparency);
    rect(0,0,w,w);
    p.draw();
    if(running)
	p.translate(p.vx,p.vy);
}
