var block = document.getElementById("block");
var hole = document.getElementById("hole");
var character = document.getElementById("character");
var deathcreen = document.getElementById("deathscreen");
var jumping = 0;
var counter = 0;
let highscore = 0;
let currscore = 0;
let death = 0;

hole.addEventListener('animationiteration', function () {
    if(death == 0){
    var random = -((Math.random() * 300) + 150);
    if (counter > 0){
    hole.style.top = random + "px";
    }
    counter++;
}
});

let gravity = setInterval(function () {
    
    var characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top")); 
    if (jumping == 0 && death == 0) {
        character.style.top = (characterTop + 3) + "px";
        currscore = counter;
        document.getElementById("currentscore").innerText = "Současné skóre = " + counter;
        if(counter > highscore){
        highscore = counter;
        document.getElementById("highscore").innerText = "Nejvyšší skóre = " + counter;  
        }  
        
    
}
}, 10);

let deathchecking = setInterval(function () {
    if(death == 0){
    var characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
    var blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue("left"));
    var holeTop = parseInt(window.getComputedStyle(hole).getPropertyValue("top"));
    var cTop = -(500 - characterTop);
    if ((characterTop > 480) || ((blockLeft < 20) && (blockLeft > -50) && ((cTop < holeTop) || (cTop > holeTop + 130)))) {
    gameover();
    }
}
}, 1);

function gameover() {
        death = 1;
        character.style.top = 100 + "px";
        hole.style.top = -500 + "px";
        counter = 0;
        deathcreen.style.width = 800 + "px";
        deathcreen.style.height = 500 + "px";
        document.getElementById("deathcurrentscore").innerText = "Současné skóre bylo " + currscore;
        document.getElementById("deathhighscore").innerText = "Nejvyšší skóre bylo " + highscore;  
        document.getElementById("deathcurrentscore").style.fontSize = 30 + "px";
        document.getElementById("deathhighscore").style.fontSize = 30 + "px";
        document.getElementById("currentscore").style.fontSize = 0 + "px";
        document.getElementById("highscore").style.fontSize = 0 + "px";
        document.getElementById("button").style.fontSize = 40 + "px";
        character.style.visibility = "hidden";
}


function jump() {
    if(death == 0){
    jumping = 1;
    let jumpCount = 0;
    var jumpInterval = setInterval(function () {
        var characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
        if ((characterTop > 6) && (jumpCount < 15)) {
            character.style.top = (characterTop - 5) + "px";
        }
        if (jumpCount > 20) {
            clearInterval(jumpInterval);
            jumping = 0;
            jumpCount = 0;
        }
        jumpCount++;
    }, 10);
}}

function restart(){
    death = 0;
    character.style.top = 100 + "px";
    hole.style.top = -500 + "px";
    counter = 0;
    deathcreen.style.width = 0 + "px";
    deathcreen.style.height = 0 + "px";
    document.getElementById("deathcurrentscore").style.fontSize = 0 + "px";
    document.getElementById("deathhighscore").style.fontSize = 0 + "px";
    document.getElementById("currentscore").style.fontSize = 50 + "px";
    document.getElementById("highscore").style.fontSize = 50 + "px";
    document.getElementById("button").style.fontSize = 0 + "px";
    character.style.visibility = "visible";
}