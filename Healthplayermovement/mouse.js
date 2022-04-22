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
    speed: 5,
}

let rect1 = {
    x: 180,
    y: 240,
    w: 130,
    h: 100,
    speed: 4,
    ySpeed: 3,
    xSpeed: 0,
}

let circ1 = {
    x: 570,
    y: 285,
    r: 60,
    speed: 3,
    xSpeed: 0,
    ySpeed: -3,
}

requestAnimationFrame(drawshapes);

function drawshapes() {

    // background
    ctx.fillStyle = "black"
    ctx.fillRect(0, 0, cnv.width, cnv.height);

    // Rectangle
    ctx.fillStyle = "green"
    ctx.fillRect(rect1.x, rect1.y, rect1.w, rect1.h);

     // circle
     ctx.fillStyle = "darkorange";
     ctx.beginPath();
     ctx.arc(circ1.x, circ1.y, circ1.r, 0, 2*Math.PI);
     ctx.fill();
    
   

    // shape random movement
    
    setTimeout(changeblockmovement, 2000);
    
    
    function changeblockmovement() {
        
         // Move the shapes
        rect1.x += rect1.xSpeed;
        rect1.y += rect1.ySpeed;
        circ1.x += circ1.xSpeed;
        circ1.y += circ1.ySpeed;
    
        let randoN = Math.random();
        console.log(randoN)
        if (randoN < 0.25) {
            rect1.xSpeed = 0;
            rect1.ySpeed = rect1.speed;
        } else if (randoN < 0.5) {
            rect1.xSpeed = rect1.speed;
            rect1.ySpeed = 0;
        } else if  (randoN < 0.75) {
            rect1.xSpeed = 0;
            rect1.ySpeed = -rect1.speed;
        } else {
            rect1.xSpeed = -rect1.speed;
            rect1.ySpeed = 0;
        }
        
    }
    setTimeout(changeblockmovement, 3000);
    
    

    

    // shape wrap around
    
    // rectangle
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

    // circle
    if (circ1.x < -(circ1.r)){
        circ1.x = 800 + circ1.r;

    } else if (circ1.x > 800 + circ1.r) {
        circ1.x = -2*(circ1.r);
    }

    if (circ1.y > 600 + circ1.r) {
        circ1.y = -(circ1.r);

    } else if (circ1.y < -(circ1.r)) {
        circ1.y = 600 + circ1.r;
    }

    // rectangle collision detection
    if (rect1.x < player.x + player.w &&
        rect1.x + rect1.w > player.x &&
        rect1.y < player.y + player.h &&
        rect1.h + rect1.y > player.y) {
        // collision detected!
        ctx.fillStyle = "red"
        ctx.fillRect(rect1.x, rect1.y, rect1.w, rect1.h);
    } else {
        // no collision
        ctx.fillStyle = "green"
        ctx.fillRect(rect1.x, rect1.y, rect1.w, rect1.h);
    }


    // circle collision detection
    if (circ1.x - circ1.r < player.x + player.w &&
        circ1.x + circ1.r > player.x &&
        circ1.y - circ1.r < player.y + player.h &&
        circ1.r + circ1.y > player.y) {

        // collision detected!
        ctx.fillStyle = "purple"
        ctx.beginPath();
        ctx.arc(circ1.x, circ1.y, circ1.r, 0, 2*Math.PI);
        ctx.fill();
    } else {

        // no collision
        ctx.fillStyle = "darkorange"
        ctx.beginPath();
        ctx.arc(circ1.x, circ1.y, circ1.r, 0, 2*Math.PI);
        ctx.fill();
    }

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


    // Draw Coordinates Sub-Function

    // Draw mouse coordinates at mouse location
    ctx.font = "16px Arial"
    ctx.fillStyle = "white";
    let mouseCoordsStr = "(" + mouseX + "," + mouseY + ")"
    ctx.fillText(mouseCoordsStr, mouseX, mouseY);

    // Request Animation Frame
    requestAnimationFrame(drawshapes);
}



// Main Program Loop
requestAnimationFrame(drawPlayer);

function drawPlayer() {
    // Logic

    // Move player xSpeed and ySpeed
    player.x += player.xSpeed;
    player.y += player.ySpeed;

    // Draw Player 
    ctx.fillStyle = "white";
    ctx.fillRect(player.x, player.y, player.w, player.h);

    // Request another Animation Frame
    requestAnimationFrame(drawPlayer);
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

// Event Listener 
document.addEventListener("mousemove", mousemoveHandler);

function mousemoveHandler(event) {
    // Get rectangle info about canvas location
    let cnvRect = cnv.getBoundingClientRect();

    // Calc mouse coordinates using mouse event and canvas location info
    mouseX = Math.round(event.clientX - cnvRect.left);
    mouseY = Math.round(event.clientY - cnvRect.top);
 }