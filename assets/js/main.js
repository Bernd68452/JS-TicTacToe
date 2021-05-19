
window.onload = init;  
 
const NUM_CELLS = 9;
 

const WINNING_PATTERNS
    = new Array(0007, 0070, 0700, 0444, 0222, 0111, 0421, 0124);
let crossPattern, noughtPattern; 
 

let crossPlaying;
 

function init() {
   resetGame();
   document.getElementById("btnNewGame").onclick = resetGame;
}


function resetGame() {
   crossPattern = 0;
   noughtPattern = 0;
   crossPlaying = true;
   for (let cellNum = 0; cellNum < NUM_CELLS; cellNum++) {
      let elm = document.getElementById("cell" + cellNum);
      elm.innerHTML = "&nbsp;"; 
      elm.className = "";        
      elm.onmousedown = play;    
   }
}
 

function play(evt) {
   let thisCell;
   if (evt) {  
     thisCell = evt.target;
   } else {    
     thisCell = window.event.srcElement;
   }
 
   
   if (thisCell.innerHTML === "&nbsp;") {
      if (crossPlaying) {
         thisCell.innerHTML = "x";
         crossPattern |=  Math.pow(2, thisCell.id.charAt(4));
      } else {
         thisCell.innerHTML = "o";
         noughtPattern |=  Math.pow(2, thisCell.id.charAt(4));
      }
   }
   if (!checkWin()) {
     
      thisCell.onmousedown = null;
      
      crossPlaying = !crossPlaying;
   }
}
 

function checkWin() {
   let theWinningPattern = -1;
   let playerPattern;
   if (crossPlaying) {
      playerPattern = crossPattern;
   } else {
      playerPattern = noughtPattern;
   }
 
  
   for (let i = 0; i < WINNING_PATTERNS.length; i++) {
      if ((WINNING_PATTERNS[i] & playerPattern) === WINNING_PATTERNS[i]) {
         theWinningPattern = WINNING_PATTERNS[i];
         break;
      }
   }
 
   
   if (theWinningPattern > -1) {
      for (let cellNum = 0; cellNum < NUM_CELLS; cellNum++) {
         let elm = document.getElementById("cell" + cellNum);
         if (theWinningPattern & Math.pow(2, cellNum)) {
            elm.className = "winningCell";
         }
         elm.onmousedown = null;  
      }
      return true;
   } else {
      return false;
   }
}