function setup() {
    ww=w/a;
    current = 1;
    loadCurrent();
    createCanvas(w,w);
    running = true;
}

function loadCurrent() {
    p = new Polyomino();
    p.load(current);
    var corners = p.corners();
    var dx = corners[2]-corners[0];
    var dy = corners[3]-corners[1];

    if(dx>dy) {
	a = Math.floor(w/(dx+5))
    } else {
	a = Math.floor(w/(dy+5))
    }
    p.x = (2-corners[0])*a;
    p.y = (2-corners[1])*a;
}

function mousePressed() {
    var x=Math.floor(Math.floor((mouseX-p.x)/a));
    var y=Math.floor(Math.floor((mouseY-p.y)/a));
    p.addCell(new Cell(x,y,colors[current]));
}

function keyPressed(){

    if(keyCode == 189) {
        a-=1;
    }
    if(keyCode == 187) {
        a+=1;
    }
    if(key == 'C') {
        p.saveToStorage('p'+current);
        window.location = "index.html";
    }
    if(key == 'N') {
	p.saveToStorage('p'+current);
        current +=1;
	if(current >=n)
	    current =0;
	loadCurrent();
    }

    console.log(key);
    console.log(keyCode);
}

function draw(){
    drawContext();
    p.draw();
}
