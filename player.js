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
    cardLookupTable: createCardLookupTable(),
    giveCard: giveCard,
    giveCards: giveCards,
    grabCardsWithRank: grabCardsWithRank,
    number: number,
  }
  function createCardLookupTable() {
    var result = {};
    card_ranks.forEach(function(rank) {
      var suits = {};
      card_suits.forEach(function(suit) {
        suits[suit] = false;
      });
      result[rank] = suits;
    });
    return result;
  }
  function giveCard(aCard) {
    this.cardLookupTable[aCard.value][aCard.suit] = true;
  }
  function giveCards(manyCards) {
    var cardLookupTable = this.cardLookupTable;
    manyCards.forEach(function(aCard) {
      cardLookupTable[aCard.value][aCard.suit] = true;
    });
  }
  function grabCardsWithRank(rank) {
    var result = [];
    var rankArray = this.cardLookupTable[rank];
    for (var i = 0; i < card_suits.length; i++) {
      var suit = card_suits[i];
      if (rankArray[suit] === true) {
        result.push(new Card(suit, rank));
        rankArray[suit] = false;
      }
    }
    return result;
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
  playerHTML += '</div>\n';

  playerHTML += '<p>Cards by Rank</p>';
  card_ranks.forEach(function(rank) {
    var hasRank = false;
    var rankString =  rank + ': ';
    card_suits.forEach(function(suit) {
      if (player.cardLookupTable[rank][suit]) {
        hasRank = true;
        rankString += card_suit_symbols[suit];
      }
    });
    if (hasRank) {
      playerHTML += '<p>' + rankString + '</p>';
    }
  });

  playerHTML += '<div>Ask player: ';
  playerHTML += '<form><input type="text"></input></form>';

  var playerRanks = [];
  card_ranks.forEach(function(rank) {
    for (var i = 0; i < card_suits.length; i++) {
      suit = card_suits[i];
      if (player.cardLookupTable[rank][suit]) {
        playerRanks.push(rank);
        break;
      }
    }
  });
  playerRanks.forEach(function(rank) {
    // TODO: figure out target player
    playerHTML += '<button onclick="ask(' + player.number + ', null, \'' + rank + '\')">Ask for ' + rank + '</button>';
  });

  playerHTML += '<hr />\n';
  return playerHTML;
}
