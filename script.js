let makeDeck = function () {
  // 1. we need 52 cards
  // 2. 13 of each suit
  // 3. hearts, diamonds, clubs, spades
  // 4. special naming for ace, jack, queen and king
  // 5.
  var cardDeck = [];
  // making suits dynamic
  var suits = ["hearts", "diamonds", "clubs", "spades"];
  // create an outer loop for the suit

  var colors = ["red", "red", "black", "black"];
  var outerCounter = 0;
  while (outerCounter < suits.length) {
    var counter = 1;
    while (counter < 14) {
      var card = {};
      card.suits = suits[outerCounter];
      card.color = colors[outerCounter];

      if (counter == 1) {
        card.name = "Ace";
      } else if (counter == 11) {
        card.name = "Jack";
      } else if (counter == 12) {
        card.name = "Queen";
      } else if (counter == 13) {
        card.name = "King";
      } else {
        card.name = counter;
      }
      cardDeck.push(card);
      // console.log(card);
      counter += 1;
    }
    outerCounter += 1;
  }
  return cardDeck;
};
let shuffleDeck = function (deck) {
  // loop through an array to shuffle
  var counter = 0;
  while (counter < deck.length) {
    var randomIndex = Math.floor(Math.random() * 52);

    var currentCard = deck[counter];
    deck[counter] = deck[randomIndex];
    deck[randomIndex] = currentCard;

    // counter = +1; typo
    counter += 1;
  }
  // console.log(cardDeck);
  return deck;
};
let shuffledDeck = shuffleDeck(makeDeck());

// Initialize 2 players for base version
const player = { name: "Player", hand: [] };
const dealer = { name: "Dealer", hand: [] };

//Deal 2 cards to each
function dealCard(player) {
  player.hand.push(shuffledDeck.pop());
}

function printHand(hand) {
  let output = "Your cards are: \n ";
  for (let i = 0; i < hand.length; i++) {
    output += hand[i].name + " of " + hand[i].suits + "\n";
  }
  return output;
}
function main(playerChoice) {
  let outcome = "";
  if (playerChoice == "start") {
    dealCard(player);
    dealCard(dealer);
    dealCard(player);
    dealCard(dealer);

    outcome =
      printHand(player.hand) +
      "\n" +
      "One of dealer's cards is: \n" +
      dealer.hand[0].name +
      " of " +
      dealer.hand[0].suits;
  } else if (playerChoice == "hit") {
    dealCard(player);
    outcome = printHand(player.hand);
  } else if (playerChoice == "stand") {
    // Function to calculate the score of a hand
    function calculateScore(hand) {
      let score = 0;

      for (let card of hand) {
        if (card.name == "Ace") {
          score += 11;
        } else if (
          card.name == "King" ||
          card.name == "Queen" ||
          card.name == "Jack"
        ) {
          score += 10;
        } else {
          score += parseInt(card.name);
        }
      }
      return score;
    }
    //  Function to check if a hand has a blackjack (21 with two cards)
    function hasBlackjack(hand) {
      return hand.length === 2 && calculateScore(hand) === 21;
    }
    // Function to check if a hand is bust (score above 21)
    function isBust(hand) {
      return calculateScore(hand) > 21;
    }

    console.log(printHand(dealer.hand));
    console.log(printHand(player.hand));
    function dealerTurn() {
      var decision = "";
      while (calculateScore(dealer.hand) < 17) {
        dealCard(dealer);
      }
      let dealerScore = calculateScore(dealer.hand);
      let playerScore = calculateScore(player.hand);
      if (dealerScore > playerScore && dealerScore <= 21) {
        decision = "Dealer wins with " + dealerScore + " points!";
      } else if (hasBlackjack(dealer.hand)) {
        decision = "Blackjack! Dealer wins!";
      } else if (isBust(player.hand)) {
        decision = "Dealer wins with " + dealerScore + " points!";
      } else if (hasBlackjack(player.hand)) {
        decision = "Blackjack! Player wins!";
      } else if (isBust(dealer.hand)) {
        decision = "Player wins with " + playerScore + " points!";
      } else if (hasBlackjack(dealer.hand) && hasBlackjack(player.hand)) {
        decision = "Tied Blackjack! Dealer and Player draw!";
      } else {
        decision = "Player wins with " + playerScore + " points!";
      }
      return decision;
    }

    outcome = dealerTurn();
    player.hand = [];
    dealer.hand = [];
  }

  return outcome;
}
