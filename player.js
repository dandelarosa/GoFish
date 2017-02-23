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
    cards: [],
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
    this.cards.push(aCard);
    this.cardLookupTable[aCard.value][aCard.suit] = true;
  }
  function giveCards(manyCards) {
    var cards = this.cards;
    manyCards.forEach(function(aCard) {
      cards.push(aCard);
      this.cardLookupTable[aCard.value][aCard.suit] = true;
    });
  }
  function grabCardsWithRank(rank) {
    var result = [];
    for (var i = 0; i < this.cards.length; i++) {
      var card = this.cards[i];
      if (card.value === rank) {
        result.push(card);
        this.cards.splice(i, 1);
        i--;
        this.cardLookupTable[card.value][card.suit] = false;
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
  playerHTML += '<p>Cards: '
  player.cards.forEach(function(card) {
    playerHTML += card + ', ';
  });
  playerHTML += '</p>\n';
  playerHTML += '</div>\n';

  // TODO: print out cards sorted by rank
  console.log(player.cardLookupTable);
  // &spades;&hearts;&diams;&clubs;

  playerHTML += '<div>Ask player: ';
  playerHTML += '<form><input type="text"></input></form>';
  var playerHasSuit = {};
  player.cards.forEach(function(card) {
    var value = card.value;
    playerHasSuit[value] = 'present';
  });
  var uniqueValues = Object.keys(playerHasSuit);
  uniqueValues.forEach(function(value) {
    // TODO: figure out target player
    playerHTML += '<button onclick="ask(' + player.number + ', null, \'' + value + '\')">Ask for ' + value + '</button>';
  });

  playerHTML += '<hr />\n';
  return playerHTML;
}
