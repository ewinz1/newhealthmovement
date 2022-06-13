// Health bar/continous player movement javascript by Edwin

let cnv = document.getElementById("myCanvas");
let ctx = cnv.getContext("2d");
cnv.width = 800;
cnv.height = 600;

// Global Variables
let mouseX, mouseY;

let player = {
    x: 0,
    y: 565,
    w: 35,
    h: 35,
    xSpeed: 0,
    ySpeed: 0,
    speed: 6,
    color: "white"
}

let rect1 = {
    x: 180,
    y: 240,
    w: 130,
    h: 100,
    speed: 5,
    ySpeed: 0,
    xSpeed: 0,
    color: "green"
}

let circ1 = {
    x: 570,
    y: 285,
    r: 60,
    speed: 5,
    xSpeed: 0,
    ySpeed: 0,
    color: "darkorange"
}

let deathrect = {
    x: 400,
    y: 0,
    w: 0,
    h: 15,
    color: "crimson"
}

// Main Program Loop
requestAnimationFrame(drawGame);
function drawGame() {
    moveRect();
    moveCirc();
    movePlayer();
    losehealth();
    drawshapes();

requestAnimationFrame(drawGame);
}

function losehealth() {
    deathrect.w-=0.08;
}


function drawshapes() {

    // background
    ctx.fillStyle = "black"
    ctx.fillRect(0, 0, cnv.width, cnv.height);

    // Rectangle
    ctx.fillStyle = rect1.color;
    ctx.fillRect(rect1.x, rect1.y, rect1.w, rect1.h);

    if (rect1.x < player.x + player.w &&
        rect1.x + rect1.w > player.x &&
        rect1.y < player.y + player.h &&
        rect1.h + rect1.y > player.y) {

        // collision detected!
        rect1.color = "red"
        ctx.fillRect(rect1.x, rect1.y, rect1.w, rect1.h);
        deathrect.w+=1;

    } else {
        // no collision
        rect1.color = "green";
        ctx.fillRect(rect1.x, rect1.y, rect1.w, rect1.h);
    }

    // circle
    ctx.fillStyle = circ1.color;
    ctx.beginPath();
    ctx.arc(circ1.x, circ1.y, circ1.r, 0, 2*Math.PI);
    ctx.fill();

    // circle collision detection
    if (circ1.x - circ1.r < player.x + player.w &&
        circ1.x + circ1.r > player.x &&
        circ1.y - circ1.r < player.y + player.h &&
        circ1.r + circ1.y > player.y) {

        // collision detected!
        circ1.color = "purple"
        deathrect.w-=0.6;

    } else {
        // no collision
        circ1.color = "orange";
    }

     // player
     ctx.fillStyle = player.color;
     ctx.fillRect(player.x, player.y, player.w, player.h);

     // death rectangle (red)
     ctx.fillStyle = deathrect.color;
     ctx.fillRect(deathrect.x, deathrect.y, deathrect.w, deathrect.h); 

     // health is in negative zone
     if (deathrect.x <= 399.5) {
         deathrect.color = "crimson";
     } else if (deathrect.x >=399.5) {
         deathrect.color = "lightgreen";
     }
}

function moveRect() {
    // xSpeed and ySpeed
    rect1.x += rect1.xSpeed;
    rect1.y += rect1.ySpeed;

    // wraparound
    if (rect1.x < -rect1.w){
        rect1.x = 800;
    
    } else if (rect1.x > 800) {
        rect1.x = -rect1.w;
    }
    
    if (rect1.y > 600) {
        rect1.y = -rect1.h ;
    
    } else if (rect1.y < -rect1.h) {
        rect1.y = 600;
    }
}

    function moveCirc() {

        // xspeed and yspeed
        circ1.x += circ1.xSpeed;
        circ1.y += circ1.ySpeed;

        // wraparound
        if (circ1.x < -(circ1.r)){
            circ1.x = 800 + circ1.r;
    
        } else if (circ1.x > 800 + circ1.r) {
            circ1.x = -(circ1.r);
        }
    
        if (circ1.y > 600 + circ1.r) {
            circ1.y = -(circ1.r);
    
        } else if (circ1.y < -(circ1.r)) {
            circ1.y = 600 + circ1.r;
        }
    }

setTimeout(changeblockmovement, 0);
    
    function changeblockmovement() {
        
         // Move the shapes
        let randoN = Math.random();
        if (randoN < 0.25) {
            rect1.xSpeed = 0;
            rect1.ySpeed = rect1.speed;
            circ1.xSpeed = circ1.speed;
            circ1.ySpeed = 0;
        } else if (randoN < 0.5) {
            rect1.xSpeed = rect1.speed;
            rect1.ySpeed = 0;
            circ1.xSpeed = -circ1.speed;
            circ1.ySpeed = 0;
        } else if  (randoN < 0.75) {
            rect1.xSpeed = 0;
            rect1.ySpeed = -rect1.speed;
            circ1.xSpeed = 0;
            circ1.ySpeed = circ1.speed;
        } else {
            rect1.xSpeed = -rect1.speed;
            rect1.ySpeed = 0;
            circ1.xSpeed = 0;
            circ1.ySpeed = -circ1.speed;
        }
        setTimeout(changeblockmovement, 1000);
    }

function movePlayer() {
    
// Logic

    // Move player xSpeed and ySpeed
    player.x += player.xSpeed;
    player.y += player.ySpeed;

    // wraparound

    // x section
    if (player.x < -player.w){
        player.x = 800;

    } else if (player.x > 800) {
        player.x = -player.w;
    }

    // y section
    if (player.y > 600) {
        player.y = -player.h ;

    } else if (player.y < -player.h) {
        player.y = 600;
    }
}

// Key event

document.addEventListener("keydown", keydownHandler);

function keydownHandler(event) {
    if (event.code == "ArrowRight") {
        player.xSpeed = player.speed;
        player.ySpeed = 0;
    }
    if (event.code == "ArrowLeft") {
        player.xSpeed = -player.speed;
        player.ySpeed = 0;
    }
    if (event.code == "ArrowUp") {
        player.ySpeed = -player.speed;
        player.xSpeed = 0;
    }
    if (event.code == "ArrowDown") {
        player.ySpeed = player.speed;
        player.xSpeed = 0;
    }
}