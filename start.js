function startGame() {
  var numberOfCardsPerPlayer = players.length > 4 ? 5 : 7;
  players.forEach(function(player) {
    for (var i = 0; i < numberOfCardsPerPlayer; i++) {
      player.giveCard(deck.draw());
    }
  });
}
