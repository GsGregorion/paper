'use strict';
(function(){
	
	// Mimo, że obecnie mamy tylko jeden link, stosujemy kod dla wielu linków. W ten sposób nie będzie trzeba go zmieniać, kiedy zechcemy mieć więcej linków lub guzików otwierających modale
	
	var buttonsFinder = document.querySelectorAll('.player-move');
	
	for(var i = 0; i < buttonsFinder.length; i++){
		buttonsFinder[i].addEventListener('click', function(event){
  playerMoveAction(this.getAttribute('data-move'));
    });
  }

//game


//global variables
var params = {winsNumber: 0, roundNumber: 0, playerScore: 0, computerScore: 0, canPlay: false};

newGame.addEventListener('click', function(event){
  var newWinNumber = window.prompt('Chcesz zagrać kolejny raz? Do ilu gramy?!');
  if (!newWinNumber) {
    return false;
  }
  params.winsNumber = newWinNumber;
  params.canPlay = true;
  params.roundNumber = 0;
  params.playerScore = 0;
  params.computerScore = 0;
  displayGameResult('','');
});

//functions
var displayGameResult = function(textToDisplay, roundResult){
  document.getElementById('gameResult').innerHTML = textToDisplay;
  document.getElementById('result').innerHTML = roundResult;
}

var getComputerMove = function(){
  var optionsArray = ['paper', 'scissors', 'stone'];
  var moveNumber = Math.floor(3 * Math.random());
  
  return optionsArray[moveNumber];
}

//main function
var playerMoveAction = function(playerMove){
  if (!params.canPlay){
    alert('Chcesz zagrać? Kliknij New Game i postępuj zgodnie z komunikatem!');
    return false;
  }
  params.roundNumber++;
  var computerMove = getComputerMove(),
      message,
      message2;
  //poniżej należy wstawić sprawdzanie kto wygrał
    if (playerMove == computerMove){
      message = ('Remis! Wybrałeś ' + playerMove + '! Twój przeciwnik zagrał ' + computerMove + '! <br>');
    } else if ((playerMove == 'paper' && computerMove == 'stone') || (playerMove == 'scissors' && computerMove == 'paper') || (playerMove == 'stone' && computerMove == 'scissors')){
      message = ('Wygrałeś! <br> Wybrałeś ' + playerMove + '! Twój przeciwnik zagrał ' + computerMove + '! <br>');
      params.playerScore++;
    } else {
      message = ('Przegrałeś! <br> Wybrałeś ' + playerMove + '! Twój przeciwnik zagrał ' + computerMove + '! <br>');
      params.computerScore++;
    };
  
    if (params.playerScore == params.winsNumber){
      message2 = ('GAME OVER! YOU WON! Punkty które zdobyłeś:<br>' + params.playerScore);
      params.canPlay = false;
      displayGameResult('', message2);
    } else if (params.computerScore == params.winsNumber){
      message2 = ('GAME OVER! Twój przeciwnik zwyciężył! Punkty które zdobył:<br> ' + params.computerScore);
      params.canPlay = false;
      displayGameResult('', message2);
    } else {
      message2 = ('<strong>Round</strong> no ' + params.roundNumber + '<br>' + '<strong>Player1 result <br></strong>' + params.playerScore + '<br>' + '<strong>Player2 result</strong> <br>' + params.computerScore + '<br> Gramy do ' + params.winsNumber);
      displayGameResult(message, message2);
    }
};

})();