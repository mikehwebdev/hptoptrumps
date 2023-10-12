export {diceRoll, render, splitDeck, initiateBattle}
import { TrumpCard } from "./card"
import { characters } from "./data"

let player1Deck = []
let player2Deck = []
let battleDeck = []

const cardsInPlay = document.querySelector('.cards-in-play')

//diceRoll returns a random number between 1 and 6 to simulate a dice roll

function diceRoll () {
    return Math.floor(Math.random() * 6 + 1)
  }

  function render(){
    let player1ActiveCard = new TrumpCard(battleDeck[0])
    let player2ActiveCard = new TrumpCard(battleDeck[1])
      
    cardsInPlay.innerHTML = `${player1ActiveCard.getCardHtml()} ${player2ActiveCard.getCardHtml()}`
  }

  function splitDeck(){
    characters.forEach((character)=>{
      // character.ref%2 !== 0? player1Deck.push(character) : player2Deck.push(character);
      character.id === 1? player2Deck.push(character) : player1Deck.push(character);
  })
   }

   function initiateBattle (){
    battleDeck.unshift(player1Deck[0])
    battleDeck.unshift(player2Deck[0])
    render()
  }