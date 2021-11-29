let canvas = document.querySelector("canvas");
let ctx = canvas.getContext("2d")
let tileSize = 50;
let playerImage = new Image();
playerImage.src ='img/player.png';
let wallImage = new Image();
wallImage.src ='img/wall.png';
let lavaImage = new Image();
lavaImage.src ='img/monster.png';
let finishImage = new Image();
finishImage.src ='img/fin.png';
let floorImage = new Image();
floorImage.src ='img/floor.png';
let diaImage = new Image();
diaImage.src ='img/diamond.png';
let health = document.getElementById("health")
let point = document.getElementById("point");

function walk(){

    let gameSound = new Audio('sound/walk.mp3');
    gameSound.play();
    
    }

function dead(){

    let deadSound = new Audio('sound/dead.mp3');
    deadSound.play();
        
    }

function win(){

    let winSound = new Audio('sound/win.mp3');
    winSound.play();
        
    }

function collect(){

    let collectSound = new Audio('sound/collect.mp3');
    collectSound.play();
        
    }   

window.addEventListener("DOMContentLoaded", event => {
    const audio = document.querySelector("audio");
    audio.volume = 0.1;
    audio.play();
    });

var minutesLabel = document.getElementById("minutes");
var secondsLabel = document.getElementById("seconds");
var totalSeconds = 0;
setInterval(setTime, 1000);

 function setTime() {
    ++totalSeconds;
    secondsLabel.innerHTML = pad(totalSeconds % 60);
    minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
}

function pad(val) {
    var valString = val + "";
    if (valString.length < 2) {
    return "0" + valString;
    } else {
    return valString;
    }
} 

/*ctx.fillRect(x,y,50,50); */

let arr = [
    [1,0,0,3,3,3,0,3,3,3,0,0,0,0,2,0,0,3,3,3],
    [3,0,5,3,2,3,3,3,0,3,0,0,3,3,3,0,5,3,0,3],
    [3,3,0,3,3,0,2,0,0,3,0,2,3,0,3,3,0,3,0,3],
    [2,3,3,0,3,0,3,3,3,3,0,3,3,0,0,3,3,3,2,3],
    [0,0,3,3,3,0,3,0,0,2,0,3,0,0,0,0,0,0,0,3],
    [0,0,0,2,0,0,3,0,0,3,3,3,0,0,0,0,3,3,3,3],
    [5,3,0,0,0,0,3,2,3,3,0,0,5,3,3,2,3,0,3,2],
    [2,3,3,3,0,0,3,3,3,0,0,0,0,0,3,3,3,0,3,3],
    [3,3,2,3,3,0,2,0,0,0,0,0,0,3,3,3,0,0,0,5],
    [3,0,0,0,3,3,0,0,0,0,0,0,3,3,0,0,0,5,0,0],
    [3,0,0,0,0,3,0,5,3,0,0,0,3,0,0,0,3,3,0,0],
    [3,3,3,0,0,3,0,2,3,3,3,3,3,0,0,0,3,2,0,0],
    [0,2,3,0,0,3,0,0,3,2,0,0,0,0,3,3,3,3,0,0],
    [0,3,3,0,0,3,0,0,3,0,0,0,3,3,3,0,0,3,0,0],
    [0,3,2,3,3,3,3,0,3,3,3,3,3,0,0,0,2,3,3,0],
    [0,3,0,3,0,2,3,0,0,0,0,0,0,0,0,0,0,0,3,0],
    [0,3,0,3,0,5,3,0,0,3,3,3,3,2,5,2,3,3,3,0],
    [0,3,0,3,0,0,0,2,0,3,2,0,3,3,3,0,3,0,0,0],
    [0,3,0,3,3,3,3,3,3,3,0,0,0,3,0,0,3,3,5,2],
    [0,4,0,0,2,0,0,0,0,0,0,0,0,3,3,3,3,0,0,0]
]

let wall = 0
let player = 1
let monster = 2
let free = 3
let finish = 4
let diamond = 5
let playerPosition = {x:0, y:0}

console.log(arr);

function drawMaze(){

for(let x = 0; x < arr.length; x++){

    for(let y = 0; y < arr[x].length; y++){

        if(arr[x][y] == wall){
            ctx.drawImage(wallImage,x*tileSize,y*tileSize,tileSize,tileSize);
        } 
        if(arr[x][y] == player){
            playerPosition.x = x;
            playerPosition.y = y;
            ctx.drawImage(playerImage,x*tileSize,y*tileSize,tileSize,tileSize);
        }
        if(arr[x][y] == monster){
            ctx.drawImage(lavaImage,x*tileSize,y*tileSize,tileSize,tileSize);
        }
        if(arr[x][y] == free){
            ctx.drawImage(floorImage,x*tileSize,y*tileSize,tileSize,tileSize);
        }
        if(arr[x][y] == finish){
            ctx.drawImage(finishImage,x*tileSize,y*tileSize,tileSize,tileSize);
        }
        if(arr[x][y] == diamond){
            ctx.drawImage(diaImage,x*tileSize,y*tileSize,tileSize,tileSize);
        }

    }

    }
}

document.addEventListener("keyup", function(event){
    if(event.keyCode == 37){
        if(arr[playerPosition.x -1][playerPosition.y] == free){
            arr[playerPosition.x -1][playerPosition.y] = player;
            arr[playerPosition.x][playerPosition.y] = free;
            walk();
        }
        else if(arr[playerPosition.x -1][playerPosition.y] == monster){
            arr[playerPosition.x,0][playerPosition.y,0] = player;
            arr[playerPosition.x][playerPosition.y] = free;
            dead();
            health.value -= 10;
        }
        else if(arr[playerPosition.x -1][playerPosition.y] == diamond){
            arr[playerPosition.x -1][playerPosition.y] = player;
            arr[playerPosition.x][playerPosition.y] = free;
            collect();
            point.value += 10;
        }
        if(health.value == 0){
            location.reload()
        }
        drawMaze();
        
    }
    if(event.keyCode == 38){
        if(arr[playerPosition.x][playerPosition.y -1] == free){
            arr[playerPosition.x][playerPosition.y -1] = player;
            arr[playerPosition.x][playerPosition.y] = free;
            walk();
        }
        else if(arr[playerPosition.x][playerPosition.y -1] == monster){
            arr[playerPosition.x,0][playerPosition.y,0] = player;
            arr[playerPosition.x][playerPosition.y] = free;
            dead();
            health.value -= 10;
        }
        else if(arr[playerPosition.x][playerPosition.y-1] == diamond){
            arr[playerPosition.x][playerPosition.y-1] = player;
            arr[playerPosition.x][playerPosition.y] = free;
            collect();
            point.value += 10;
        }
        if(health.value == 0){
            location.reload()
        }
        drawMaze();  
    }

    if(event.keyCode == 39){
        if(arr[playerPosition.x +1][playerPosition.y] == free){
            arr[playerPosition.x +1][playerPosition.y] = player;
            arr[playerPosition.x][playerPosition.y] = free;
            walk();
        }
        else if(arr[playerPosition.x +1][playerPosition.y] == monster){
            arr[playerPosition.x,0][playerPosition.y,0] = player;
            arr[playerPosition.x][playerPosition.y] = free;
            dead();
            health.value -= 10;
        }
        else if(arr[playerPosition.x +1][playerPosition.y] == finish && point.value == 100){
            arr[playerPosition.x,0][playerPosition.y,0] = player;
            arr[playerPosition.x][playerPosition.y] = free;
            win();
            point.value = 0;
            health.value = 30;
        }
        else if(arr[playerPosition.x +1][playerPosition.y] == diamond){
            arr[playerPosition.x +1][playerPosition.y] = player;
            arr[playerPosition.x][playerPosition.y] = free;
            collect();
            point.value += 10;
        }
        if(health.value == 0){
            location.reload()
        }
        drawMaze();
        
        
    }
    if(event.keyCode == 40){
        if(arr[playerPosition.x][playerPosition.y +1] == free){
            arr[playerPosition.x][playerPosition.y +1] = player;
            arr[playerPosition.x][playerPosition.y] = free;
            walk();
        }
        else if(arr[playerPosition.x][playerPosition.y +1] == monster){
            arr[playerPosition.x,0][playerPosition.y,0] = player;
            arr[playerPosition.x][playerPosition.y] = free;
            dead();
            health.value -= 10;
        }
        else if(arr[playerPosition.x][playerPosition.y +1] == diamond){
            arr[playerPosition.x][playerPosition.y +1] = player;
            arr[playerPosition.x][playerPosition.y] = free;
            collect();
            point.value += 10;
        }
        if(health.value == 0){
            location.reload()
        }
        drawMaze();   
    } 

    document.getElementById("reset").onclick = function() {
        location.reload()
      };

    

    /*
    venstre: 37 
    op: 38
    højre: 39
    ned: 40
    */
})

window.addEventListener("load", drawMaze);

//<>