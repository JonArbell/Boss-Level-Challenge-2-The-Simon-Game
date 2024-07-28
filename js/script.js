function initialization(){

    const title = document.querySelector('header h1');
    const mainContainer = document.querySelector('main');
    
    for(let i = 0; i < 4; i++){
        const boxes = document.createElement('button');

        switch(i){
            case 0:
                boxes.id = 'green';
                break;
            case 1:
                boxes.id = 'red';
                break;
            case 2:
                boxes.id = 'yellow';
                break;
            case 3:
                boxes.id = 'blue';
                break;
        }

        mainContainer.appendChild(boxes);
    }
    
    title.textContent = 'Click anywhere to Start!';
    
}
initialization();

function changeColor(color){

    const button = document.querySelector(`#${color}`);

    button.classList.add('shadowClick');

    setTimeout(()=>{
        button.classList.remove('shadowClick');
    },100);

}

function changeAudio(color){
    const aud = new Audio(`./sounds/${color}.mp3`);
    aud.play();
}

let level = 0;

function start(){
    level++;

    document.querySelector('header h1').textContent =  `Level ${level}`;
    addPattern();
    
    document.removeEventListener('click',start);

}
document.addEventListener('click',start);

let computerPattern = [];
let playerPattern = [];
let displaying = false;
function displayPattern(){
    
    computerPattern.forEach((pattern,index) =>{

        setTimeout(()=>{
            
            if(isGameOver){
                return;
            }

            changeAudio(pattern);
            changeColor(pattern);
            displaying = true;
        },index * 750);
        
    });

    setTimeout(()=>{
        displaying = false;
        playerMove();
    },computerPattern.length * 750);

}

function addPattern(){

    const colors = ['green','red','yellow','blue'];

    const random = parseInt(Math.random() * 4);

    computerPattern.push(colors[random]);

    displayPattern();
}

function playerMove(){
 
    document.querySelectorAll('button').forEach(button =>{
        button.addEventListener('click',playerMoveHandle);
    });
    
}

function playerMoveHandle(event){
    event.preventDefault();

    if (displaying) {
        isGameOver = true;
        gameOver();
        return; 
    }
    
    const color = event.target.id;
    
    changeAudio(color);
    changeColor(color);
    playerPattern.push(color);

    checkMoves();
}

let isGameOver = false;
function checkMoves(){
    
    for(let i = 0; i < playerPattern.length;i++){

        if(playerPattern[i] !== computerPattern[i]){
            isGameOver = true;
            gameOver();
            return;
        }

    }

    if(playerPattern.length === computerPattern.length){
        playerPattern = [];   
        setTimeout(start,1000);
    }

}

function gameOver(){
    changeAudio('wrong');
    document.querySelector('header h1').textContent = 'Game Over!, Refresh to play again!';
    document.querySelector('body').classList.add('gameOver');

    setTimeout(()=>{
        document.querySelector('body').classList.remove('gameOver');
    },75);

}
