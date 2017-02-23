var card_suits = [
  'Spades',
  'Hearts',
  'Diamonds',
  'Clubs',
];

var card_values = [
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  'J',
  'Q',
  'K',
  'A',
];

var card_ranks = card_values;

function Card(suit, value) {
  this.suit = suit;
  this.value = value;
  this.toString = function() {
    return this.value + ' of ' + this.suit;
  };
}

function Deck() {
  return {
    cards: createShuffledDeck(),
    draw: draw,
    toString: toString,
  };

  function createShuffledDeck() {
    var before_shuffle = [];
    card_suits.forEach(function(suit) {
      card_values.forEach(function(value) {
        var card = new Card(suit, value);
        before_shuffle.push(card);
      });
    });

    var after_shuffle = [];
    while (before_shuffle.length > 0) {
      var randomIndex = Math.floor(Math.random() * before_shuffle.length);
      var card = before_shuffle[randomIndex];
      before_shuffle.splice(randomIndex, 1);
      after_shuffle.push(card);
    }
    return after_shuffle;
  }

  function draw() {
    var card = this.cards[0];
    this.cards.splice(0, 1);
    return card;
  }

  function toString() {
    var result = '';
    this.cards.forEach(function(card) {
      result = result + card + ', ';
    });
    return result;
  };

}

function displayDeck() {
  var deckHTML = '<p>Deck: ' + deck + '</p>';
  document.getElementById('deck').innerHTML = deckHTML;
}
