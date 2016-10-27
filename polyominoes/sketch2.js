function setup() {
    a = 30;
    ww=w/a;
    p = new Polyomino();
    p.load();
    createCanvas(w,w);
    running = true;
}


function mousePressed() {
    var x=Math.floor(Math.floor(mouseX/a));
    var y=Math.floor(Math.floor(mouseY/a));
    p.addCell(new Cell(x,y,'red'));
}

function keyPressed(){

    if(keyCode == 189) {
        a-=1;
    }
    if(keyCode == 187) {
        a+=1;
    }
    if(key == 'C') {
        p.saveToStorage('p');
        window.location = "index.html";
    }

    console.log(key);
    console.log(keyCode);
}

function draw(){
    fill(256,256,256,transparency);
    rect(0,0,w,w);
    p.draw();
    if(running)
	p.translate(p.vx,p.vy);
}
