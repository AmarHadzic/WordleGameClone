import { getWord } from "./words.js";

let col=0;
let row=0;

const word = getWord();

window.onload=function(){
    //creates grid
    for (let i=0;i<6;i++){
        for (let j=0;j<5;j++){
            let board=document.getElementById('gameBoard');
            let tile=document.createElement('div');
            tile.id='row:'+i.toString()+'-'+'column:'+j.toString();
            tile.classList.add('tile');
            
            board.appendChild(tile);
    
        }
    }

    //starts game
    start();

}

function start(){
    let gameOver=false;
    
    document.addEventListener('keyup',function(event){
        if (gameOver){
           return;
        }
    
        if (event.code>="KeyA" && event.code<="KeyZ"){
            if(col<5){
                let currentTile=document.getElementById('row:'+row.toString()+'-'+'column:'+col.toString());
                //sets letter in apporpriate grid square
                currentTile.innerText=event.code[3];
                col+=1
            }
        
        
        }else if(event.code=="Backspace"){
            // backspace, to remove letters from grid squares
            if(col>0 && col<=5){
                col-=1
            }
            let currentTile=document.getElementById('row:'+row.toString()+'-'+'column:'+col.toString());
            currentTile.innerText='';

        }else if(event.code=="Enter" && col==5){
            let correctAmt=0;

            let letterDict={};
            //checks guess and correct word letter by letter
            for(let i=0;i<5;i++){
                if(!(word[i] in letterDict)){
                    letterDict[word[i]]=1;
                }else{
                    letterDict[word[i]]+=1;
                }
            }

            for(let j=0;j<5;j++){
                let currentLetter= document.getElementById('row:'+row.toString()+'-'+'column:'+j.toString());
                if(word[j].toUpperCase()==currentLetter.innerText){
                    //makes the grid space green if the letter is in the correct spot
                    currentLetter.classList.add("onSpot");
                    letterDict[currentLetter.innerText]-=1;
                    correctAmt+=1
                    //makes the grid space yellow if the correct letter was guessed, just not in the right spot
                }else if(word.includes(currentLetter.innerText) && letterDict[currentLetter.innerText]>0){
                    currentLetter.classList.add("contained");
                    letterDict[currentLetter.innerText]-=1;
                    //if a wrong letter is guessed
                }else{
                    currentLetter.classList.add("notContained")
                }

            }
            //if the user guesses the word, gameover
            if(correctAmt==5){
                gameOver=true;
            //otherwise, go to the next row
            }else{
                row+=1;
                col=0;
            }
            

    
        }
        //if all grid spaces were used and the word was not guessed, print the message to the user
        if (row==6 && !gameOver){
            gameOver=true;
            alert('the word was:' + word);
        }
    })
    
}
