'use strict';
(function() {
	//przypisuje funkcje playerMoveAction do odpowiednich buttonów: papier, nożyce, kamień
	var buttonsFinder = document.querySelectorAll('.player-move');
	
	  for (var i = 0; i < buttonsFinder.length; i++) {
		  buttonsFinder[i].addEventListener('click', function(event) {
        playerMoveAction(this.getAttribute('data-move'));
      });
    }
  
//show and hide Modal
  var handleShowModal = function(event) {
    event.preventDefault();
    var modalToOpen = (this.getAttribute('href')); //gpsE - getting href value from link
      document.querySelector('#modal-overlay').classList.add('show');
      document.querySelector(modalToOpen).classList.add('show'); //gpsE - query serach to add show class
  }

  var handleHideModal = function(event) {
    event.preventDefault();
 
    for (var i = 0 ; i < modals.length ; i++) {
      modals[i].classList.remove('show'); //close all modals on overlay layer
    }
    document.querySelector('#modal-overlay').classList.remove('show'); // overlay close
  }

// modalLinks finder
  var modalLinks = document.querySelectorAll('.show-modal');

    for (var i = 0; i < modalLinks.length; i++) {
      modalLinks[i].addEventListener('click', handleShowModal);  
    }

//close function binding to close button
  var modals = document.querySelectorAll('.modal'); // gpse - variable to use in for loop to find all modals

    for (var i = 0; i < modals.length; i++) {
      modals[i].addEventListener('click', function(event) {
        event.stopPropagation();
      });
    }

//close modal
  var closeButtons = document.querySelectorAll('.modal .close');

    for (var i = 0; i < closeButtons.length; i++) {
      closeButtons[i].addEventListener('click', handleHideModal);
    }

//close to open modal
  var closeOpenButtons = document.querySelectorAll('.modal .close-open');

    for (var i = 0; i < closeOpenButtons.length; i++) {
      closeOpenButtons[i].addEventListener('click', displayFinalResultTable);
    }

// closing through the overlay clicking
  document.querySelector('#modal-overlay').addEventListener('click', handleHideModal);

//game
//global variables
  var params = {
      winsNumber: 0, 
      roundNumber: 0, 
      playerScore: 0, 
      computerScore: 0,
      data: [],
      canPlay: false,
      progress: []
  };

  //functions
  //new game button function
  newGame.addEventListener('click', function(event) {
    var newWinNumber = window.prompt('Chcesz zagrać kolejny raz? Do ilu gramy?!');
    if (!newWinNumber || isNaN(newWinNumber)) {
      return false;
    }

    params.winsNumber = newWinNumber;
    params.canPlay = true;
    params.roundNumber = 0;
    params.playerScore = 0;
    params.computerScore = 0;
    params.progress = [];
    displayGameResult('','');
    
    for (var i = 0; i < buttonsFinder.length; i++) {
      buttonsFinder[i].disabled = false;
      buttonsFinder[i].classList.remove('player-move-disabled');
    }
  });

  //display round result
  var displayGameResult = function(textToDisplay, roundResult) {
    document.getElementById('gameSummary').innerHTML = textToDisplay;
    document.getElementById('gameResult').innerHTML = roundResult;
  }

  //display final result 
  var displayFinalGameResult = function(textToDisplay, roundResult) {
    document.getElementById('finalResult').innerHTML = textToDisplay + '<br>' + roundResult;
    document.querySelector('#modal-overlay').classList.add('show');
    document.querySelector('#modal-final-result').classList.add('show');
  }
 
  var displayFinalResultTable = function() {
    document.querySelector("#modal-final-result").classList.remove('show');
    tableResult = document.querySelector('#modal-table').classList.add('show');
  }

  //generate computer move
  var getComputerMove = function() {
    var optionsArray = ['paper', 'scissors', 'stone'];
    var moveNumber = Math.floor(3 * Math.random());
      return optionsArray[moveNumber];
  }
  
  //create table result in modal
  function addTable() {
    var myTableResult = document.getElementById('tableResult');
      myTableResult.innerHTML = ('');

      for (var i = 0; i < params.roundNumber; i++) {
          var tr = document.createElement('TR');
          myTableResult.appendChild(tr);

          for (var j = 0; j < 5; j++) {
              var td = document.createElement('TD');
              td.width = '75';
              td.appendChild(document.createTextNode(params.progress[5 * i + j]));
              tr.appendChild(td);
          }
      }
    myTableResult.appendChild(table);
  }
  
  //disable player-move buttons
  function disableButtons() {
    for (var i = 0; i < buttonsFinder.length; i++) {
      buttonsFinder[i].disabled = true;
      buttonsFinder[i].classList.add('player-move-disabled');
    }
  }

  //main function
  var playerMoveAction = function(playerMove) {
    if (!params.canPlay) {
      alert('Chcesz zagrać? Kliknij New Game i postępuj zgodnie z komunikatem!');
      return false;
    }
  
  params.roundNumber++;

  var computerMove = getComputerMove(),
      message,
      message2,
      whoWin,
      semiResult;
  
  //result check
  if (playerMove == computerMove) {
    whoWin = 'Draw';
    message = 'Remis! Wybrałeś ' + playerMove + '! Twój przeciwnik zagrał ' + computerMove + '! <br>';
  } else if ((playerMove == 'paper' && computerMove == 'stone') || (playerMove == 'scissors' && computerMove == 'paper') || (playerMove == 'stone' && computerMove == 'scissors')){
    params.playerScore++;
    whoWin = 'Player';
    message = 'Wygrałeś! <br> Wybrałeś ' + playerMove + '! Twój przeciwnik zagrał ' + computerMove + '! <br>';
  } else {
    params.computerScore++;
    whoWin = 'Computer';
    message = 'Przegrałeś! <br> Wybrałeś ' + playerMove + '! Twój przeciwnik zagrał ' + computerMove + '! <br>';
  };
  
  if (params.playerScore == params.winsNumber) {
    params.playerScore++;
    message2 = 'GAME OVER! YOU WON! Punkty które zdobyłeś:<br>' + params.playerScore;
    params.canPlay = false;
    disableButtons();
    displayGameResult('', message2);
    displayFinalGameResult('', message2);
  } else if (params.computerScore == params.winsNumber) {
    params.computerScore++;
    message2 = 'GAME OVER! Twój przeciwnik zwyciężył! Punkty które zdobył:<br> ' + params.computerScore;
    params.canPlay = false;
    disableButtons();
    displayGameResult('', message2);
    displayFinalGameResult('', message2);
  } else {
    message2 = '<strong>Round</strong> no ' + params.roundNumber + '<br>' + '<strong>Player1 result <br></strong>' + params.playerScore + '<br>' + '<strong>Player2 result</strong> <br>' + params.computerScore + '<br> Gramy do ' + params.winsNumber;
    displayGameResult(message, message2);
  }

  semiResult = params.playerScore + ' - ' + params.computerScore;
  params.progress.push(params.roundNumber, playerMove, computerMove, whoWin, semiResult);
  
  //display result in modal 
  addTable();
  };
})();