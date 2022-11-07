let block = document.getElementById("block");
let hole = document.getElementById("hole");
let character = document.getElementById("character");
let deathcreen = document.getElementById("deathscreen");
let jumping = 0;
let counter = 0;
let highscore = 0;
let currscore = 0;
let death = 0;

hole.addEventListener('animationiteration',() => {
    if (death == 0) {
        let random = -((Math.random() * 300) + 200);
        if (counter > 0) {
            hole.style.top = random + "px";
        }
        counter++;
    }
});

let gravity = setInterval(() => {

    let characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
    if (jumping == 0 && death == 0) {
        character.style.top = (characterTop + 3) + "px";
        currscore = counter;
        document.getElementById("currentscore").innerText = "Současné skóre = " + counter;
        if (counter > highscore) {
            highscore = counter;
            document.getElementById("highscore").innerText = "Nejvyšší skóre = " + counter;
        }


    }
}, 10);

let deathchecking = setInterval(() => {
    if (death == 0) {
        let characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
        let blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue("left"));
        let holeTop = parseInt(window.getComputedStyle(hole).getPropertyValue("top"));
        let cTop = -(500 - characterTop);
        if ((characterTop > 450) || ((blockLeft < 50) && (blockLeft > -50) && ((cTop < holeTop) || (cTop > holeTop + 100)))) {
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
    document.getElementById("score").style.height = 0 + "px";
    document.getElementById("button").style.fontSize = 40 + "px";
    document.getElementById("button").style.width = 174 + "px";
    document.getElementById("button").style.height = 40 + "px";
    character.style.visibility = "hidden";
}

document.getElementById("button").addEventListener("click",() => {
    death = 0;
    character.style.top = 100 + "px";
    hole.style.top = -500 + "px";
    counter = 0;
    deathcreen.style.width = 0 + "px";
    deathcreen.style.height = 0 + "px";
    document.getElementById("deathcurrentscore").style.fontSize = 0 + "px";
    document.getElementById("deathhighscore").style.fontSize = 0 + "px";
    document.getElementById("currentscore").style.fontSize = 40 + "px";
    document.getElementById("highscore").style.fontSize = 40 + "px";
    document.getElementById("score").style.height = 375 + "px";
    document.getElementById("button").style.fontSize = 0 + "px";
    document.getElementById("button").style.width = 0 + "px";
    document.getElementById("button").style.height = 0 + "px";
    character.style.visibility = "visible";
});

document.getElementById("click").addEventListener("click",() => {
    if (death == 0) {
        
        jumping = 1;
        let jumpCount = 0;
        let jumpInterval = setInterval(function () {
            let characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
            if ((characterTop > 6) && (jumpCount < 15)) {
                character.style.top = (characterTop - 4) + "px";

            }
            
            if (jumpCount > 20) {
                clearInterval(jumpInterval);
                jumping = 0;
                jumpCount = 0;
            }
            jumpCount++;
        }, 10);
    }
})