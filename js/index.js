'use strict'
//global variables
var winsNumber = 0,
    roundNumber = 0,
    score1 = 0,
    score2 = 0,
    score,
    play = true,
    buttonPaper = document.getElementById('buttonPaper'),
    buttonScissors = document.getElementById('buttonScissors'),
    buttonStone = document.getElementById('buttonStone');

//buttons EventsListeners
  buttonPaper.addEventListener('click', function(event){
    displayGameResult(playerMove(computerMove(), 'Papier'), resultsArray());
  });

  buttonScissors.addEventListener('click', function(event){
    displayGameResult(playerMove(computerMove(), 'Nożyce'), resultsArray());
  });

  buttonStone.addEventListener('click', function(event){
    displayGameResult(playerMove(computerMove(), 'Kamień'), resultsArray());
  });

  newGame.addEventListener('click', function(event){
    winsNumber = window.prompt('Chcesz zagrać kolejny raz? Do ilu gramy?!'),
    play = true;
    roundNumber = 0,
    score1 = 0,
    score2 = 0;
    displayGameResult('','');
  });

//functions
var displayGameResult = function(textToDisplay, roundResult){
  var gameResult = document.getElementById('gameResult');
  var result = document.getElementById('result');
    gameResult.innerHTML = textToDisplay;
    result.innerHTML = roundResult;
}

var whoWon = function(){
  var message;
  
  if (score1 > score2){
    score = score1;
    message = ('GAME OVER! YOU WON! Punkty które zdobyłeś: ' + score);
    score = score1;
  }
  
  if (score1 < score2){
    score = score2;
    message = ('GAME OVER! Twój przeciwnik zwyciężył! Punkty które zdobył: ' + score);
    score = score2;
  }
  
  if (winsNumber = 'null' && score1 == 0 && score2 == 0){
    message = ('Coś namieszałeś... Wykonaj wszystko ponownie, tym razem zgodnie z instrukcją!');
    play = false;
  }
  
  return message;
  
}

var matchTrial = function(){
  if (winsNumber != 0 && (winsNumber == score1 || winsNumber == score2)){
    displayGameResult(whoWon(), '');
    play = false;
  }
  
  else if (winsNumber == 0){
    play = false;
    roundNumber = 0,
    score1 = 0,
    score2 = 0;
  }
  
  else if (winsNumber > score1 && winsNumber > score2){
    play = true;
  }
  
  else if (winsNumber = 'null'){
    play = false
  }

}

var resultsArray = function(){
  var message;
  message = ('<strong>Round</strong> no ' + roundNumber + '<br>' + '<strong>Player1 result <br></strong>' + score1 + '<br>' + '<strong>Player2 result</strong> <br>' + score2 + '<br> Gramy do ' + winsNumber);
  return message;
}

var computerMove = function(){
  var moveNumber = Math.round(2 * Math.random() + 1);
  var computer;
  if (moveNumber == 1){
    computer = 'Papier';
  }
  if (moveNumber == 2){
    computer = 'Nożyce';
  }
  if (moveNumber == 3){
    computer = 'Kamień';
  }
  return computer;
}

//main function
var playerMove = function(player1, player2, liczbaRund){
  matchTrial();
  roundNumber++;
  var message;
  if (play == true){
  if (player1 === player2){
      message = ('Remis! Wybrałeś ' + player2 + '! Twój przeciwnik zagrał ' + player1 + '! <br>');
  }
  //player1 wins
  else if (player2 == 'Papier' && player1 == 'Kamień'){
    message = ('Wygrałeś! <br> Wybrałeś ' + player2 + '! Twój przeciwnik zagrał ' + player1 + '! <br>');
    score1++;
  }
  
  else if (player2 == 'Nożyce' && player1 == 'Papier'){
    message = ('Wygrałeś! <br> Wybrałeś ' + player2 + '! Twój przeciwnik zagrał ' + player1 + '! <br>');
    score1++;
  }
  
  else if (player2 == 'Kamień' && player1 == 'Nożyce'){
    message = ('Wygrałeś! <br> Wybrałeś ' + player2 + '! Twój przeciwnik zagrał ' + player1 + '! <br>');
    score1++;
  }
  //Player 2 wins
  else if (player2 == 'Kamień' && player1 == 'Papier'){
    message = ('Przegrałeś! <br> Wybrałeś ' + player2 + '! Twój przeciwnik zagrał ' + player1 + '! <br>');
    score2++;
  }
  
  else if (player2 == 'Nożyce' && player1 == 'Kamień'){
    message = ('Przegrałeś! <br> Wybrałeś ' + player2 + '! Twój przeciwnik zagrał ' + player1 + '! <br>');
    score2++;
  }
  
  else if (player2 == 'Papier' && player1 == 'Nożyce'){
    message = ('Przegrałeś! <br> Wybrałeś ' + player2 + '! Twój przeciwnik zagrał ' + player1 + '! <br>');
    score2++;
  }
  
  return message;
  }
  else {
    alert(whoWon() + ' Chcesz zagrać kolejny raz? Kliknij New Game!');
    display('','')
  }
};