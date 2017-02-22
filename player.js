function createPlayers(numberOfPlayers) {
  if (numberOfPlayers < 2) {
    numberOfPlayers = 2;
  }
  if (numberOfPlayers > 10) {
    numberOfPlayers = 10;
  }
  var players = []
  for (var i = 0; i < numberOfPlayers; i++) {
    var playerNumber = i + 1;
    players.push(new Player(playerNumber));
  }
  return players;
}

function Player(number) {
  return {
    cards: [],
    giveCard: giveCard,
    number: number,
  }
  function giveCard(aCard) {
    this.cards.push(aCard);
  }
}


function displayCurrentPlayer() {
  var currentPlayerHTML = 'Current Player: ' + currentPlayer;
  document.getElementById('currentPlayer').innerHTML = currentPlayerHTML;
}

function displayPlayers() {
  var playersHTML = '';
  players.forEach(function(player) {
    playersHTML += playerHTML(player);
  });
  document.getElementById('players').innerHTML = playersHTML;
}

function playerHTML(player) {
  var playerHTML = '';
  playerHTML += '<div id="player' + player.number + '">\n';
  playerHTML += '<p>Player ' + player.number + '</p>\n';
  playerHTML += '<p>Cards: '
  player.cards.forEach(function(card) {
    playerHTML += card + ', ';
  });
  playerHTML += '</p>\n';
  playerHTML += '</div>\n';

  playerHTML += '<div>Ask player: ';
  playerHTML += '<form><input type="text"></input></form>';
  var playerHasSuit = {};
  player.cards.forEach(function(card) {
    var value = card.value;
    playerHasSuit[value] = 'present';
  });
  var uniqueValues = Object.keys(playerHasSuit);
  uniqueValues.forEach(function(value) {
    playerHTML += '<button>Ask for ' + value + '</button>';
  });

  playerHTML += '<hr />\n';
  return playerHTML;
}
