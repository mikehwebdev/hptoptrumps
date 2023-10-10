export {diceRoll}

//diceRoll returns a random number between 1 and 6 to simulate a dice roll

function diceRoll () {
    return Math.floor(Math.random() * 6 + 1)
  }