
import { diceRoll} from "./utils"
import { characters } from "./data"


const welcomePageSection = document.querySelector('.welcome')
const choosePlayersSection = document.querySelector('.choose-players')
const chooseDeckSection = document.querySelector('.choose-your-deck')
const rollDiceSection = document.querySelector('.roll-dice')
const battlefieldSection = document.querySelector('.battlefield')

const chooseDeckBtn = document.getElementById('chooseDeck')
const diceRollBtn = document.getElementById('dice')
const dealCardsBtn = document.getElementById('dealCards')

const player1El = document.getElementById('player1')
const player2El = document.getElementById('player2')

const playersNamesEl = document.querySelector('.players-names')
const player1InputEl = document.querySelector('.player1-inputs')
const player2InputEl = document.querySelector('.player2-inputs')

const chooseDeck = document.querySelector('.deck-container')
const gryffindorDeckEl = document.getElementById('gryffindorDeck')
const slytherinDeckEl = document.getElementById('slytherinDeck')
const ravenclawDeckEl = document.getElementById('ravenclawDeck')
const hufflepuffDeckEl = document.getElementById('hufflepuffDeck')

const playerCountEl = document.querySelector('.choose-players')

const dice1El = document.querySelector('.dice1')
const dice2El = document.querySelector('.dice2')

const rollResultEl = document.querySelector('.roll-result')

const cardsInPlay = document.querySelector('.cards-in-play')
const winnerDialog = document.querySelector('.winner-message')
const winnerDialogText = document.querySelector('.winner-message-text')
const nextRoundBtn = document.querySelector('.next-round')

let player1Turn = true
let renderCycle = 1

let diceScore1 = 0
let diceScore2 = 0

let gameType = ''

let battleDeck = []

let player1Deck = []
let player2Deck = []

// Event listeners for navigation 

document.getElementById('startGame').addEventListener('click',()=>{
  welcomePageSection.classList.toggle('visible')
  choosePlayersSection.classList.toggle('visible')
})

document.getElementById('chooseDeck').addEventListener('click', ()=>{
  setPlayerNames()
  choosePlayersSection.classList.toggle('visible')
  chooseDeckSection.classList.toggle('visible')
})

document.getElementById('chooseFirst').addEventListener('click', ()=>{
  chooseDeckSection.classList.toggle('visible')
  playersNamesEl.innerHTML = `${localStorage.getItem('p1name')} ${localStorage.getItem('p2name')}`
  rollDiceSection.classList.toggle('visible')
})

//this function displays inputs for names to correspond with the type of game selection (single or 2 player)

playerCountEl.addEventListener('click', (e)=>{
  if (e.target.id === 'player1Button') {
    chooseDeckBtn.style.display = 'block'
    player1InputEl.style.display = 'block'
    player2InputEl.style.display = 'none'
    gameType = 'single'
  } else if (e.target.id === 'player2Button') {
    player1InputEl.style.display = 'block'
    chooseDeckBtn.style.display = 'block'
    player2InputEl.style.display = 'block'
    gameType = 'multi'
  }
})

  //setPlayerNames checks for name values entered and sets them in localStorage for later use. If no value is entered defaults are used instead

  function setPlayerNames(){
    player1El.value ? localStorage.setItem('p1name', player1El.value) : localStorage.setItem('p1name', 'Player 1')
    if (gameType === 'multi') {
    player2El.value ? localStorage.setItem('p2name', player2El.value) : localStorage.setItem('p2name', 'Player 2')
    } else {
      localStorage.setItem('p2name', 'Computer')
    }
  }

// deckManipulator loops through all cards in the deck selection section and grows/shrinks them as appropriate

function deckManipulator(e){
  
  for (let card of chooseDeck.children) {    
      card.id === e.currentTarget.id ? card.classList.add('expanded-deck') : card.classList.add('shrunk-deck')
}
}

// These event listeners are attached to each individual deck choice and sets the custom colours in our css file for the Top Trump card template which we then populate with data

gryffindorDeckEl.addEventListener('click', (e)=>{
  let rootEl = document.querySelector(':root')
  deckManipulator(e)
  gryffindorDeckEl.classList.add('gr-translate')
  rootEl.style.setProperty('--card-text','#AE0001')
  rootEl.style.setProperty('--card-background-color-1','#D3A625')
  rootEl.style.setProperty('--card-background-color-2','white')
  rootEl.style.setProperty('--card-button-color-1','#EEBA30')
  rootEl.style.setProperty('--card-button-color-2','white')
})

slytherinDeckEl.addEventListener('click', (e)=>{
  let rootEl = document.querySelector(':root')
  deckManipulator(e)
  slytherinDeckEl.classList.add('sl-translate')
  rootEl.style.setProperty('--card-text','#000000')
  rootEl.style.setProperty('--card-background-color-1','#1A472A')
  rootEl.style.setProperty('--card-background-color-2','white')
  rootEl.style.setProperty('--card-button-color-1','#AAAAAA')
  rootEl.style.setProperty('--card-button-color-2','white')
})

ravenclawDeckEl.addEventListener('click', (e)=>{
  let rootEl = document.querySelector(':root')
  deckManipulator(e)
  ravenclawDeckEl.classList.add('rc-translate')
  rootEl.style.setProperty('--card-text','#000000')
  rootEl.style.setProperty('--card-background-color-1','#222F5B')
  rootEl.style.setProperty('--card-background-color-2','white')
  rootEl.style.setProperty('--card-button-color-1','#946B2D')
  rootEl.style.setProperty('--card-button-color-2','white')
})

hufflepuffDeckEl.addEventListener('click', (e)=>{
  let rootEl = document.querySelector(':root')
  deckManipulator(e)
  hufflepuffDeckEl.classList.add('hp-translate')
  rootEl.style.setProperty('--card-text','#000000')
  rootEl.style.setProperty('--card-background-color-1','#60605C')
  rootEl.style.setProperty('--card-background-color-2','white')
  rootEl.style.setProperty('--card-button-color-1','#FFED86')
  rootEl.style.setProperty('--card-button-color-2','white')
})

//-------------

//this function manages the dice rolling section. It rolls for each player, updating the dice image for each player every 200ms until it hits a count of 20. Once it finishes "rolling" it compares scores, declares a winner and sets a boolean which we will use to track the current turn.

diceRollBtn.addEventListener('click', ()=>{
  diceRollBtn.disabled = true
  rollResultEl.textContent = ''
  let diceCount = 0
  
  let diceInterval = setInterval(()=>{
    let diceScore1 = diceRoll()
    let diceScore2 = diceRoll()
    dice1El.innerHTML = `<img src="./images/${diceScore1}.png">`
    dice2El.innerHTML = `<img src="./images/${diceScore2}.png">`
    diceCount = diceCount +1
  if (diceCount === 2) {
    clearInterval(diceInterval)

    if (diceScore1 > diceScore2) {
      rollResultEl.textContent = `${localStorage.getItem('p1name')} wins.`
      player1Turn = true
      diceRollBtn.style.display = 'none'
      dealCardsBtn.style.display = 'block'
    
    } else if (diceScore2 > diceScore1) {
      player1Turn = false
      rollResultEl.textContent = `${localStorage.getItem('p2name')} wins.`
      diceRollBtn.style.display = 'none'
      dealCardsBtn.style.display = 'block'
    
    } else {
      rollResultEl.textContent = "It's a draw. Roll again!"
      diceRollBtn.disabled = false
    }
  }

}, 200)

})

dealCardsBtn.addEventListener('click',()=>{
  splitDeck()
  rollDiceSection.classList.toggle('visible')
  battlefieldSection.classList.toggle('visible')
  initiateBattle()
})

function splitDeck(){
  characters.forEach((character)=>{
    character.id %2 == 0? player1Deck.push(character) : player2Deck.push(character);
    // character.id === 0? player2Deck.push(character) : player1Deck.push(character);
})
}

  function initiateBattle (){
    battleDeck.unshift(player1Deck[0])
    battleDeck.unshift(player2Deck[0])
    player1Deck.shift()
    player2Deck.shift()
    render()
  }

function render(){
  let player1ActiveCard = new TrumpCard(battleDeck[0])
  let player2ActiveCard = new TrumpCard(battleDeck[1])
  cardsInPlay.innerHTML = `${player1ActiveCard.getCardHtml()}` 
  renderCycle = 2
  cardsInPlay.innerHTML += `${player2ActiveCard.getCardHtml()}`
  renderCycle = 1
}

cardsInPlay.addEventListener('click', (e)=>{
    console.log(e)
    if (battleDeck[0][e.target.parentElement.id] > battleDeck[1][e.target.parentElement.id]) {
       console.log('player1 wins')
       player1Turn = true
       player1Deck.push(battleDeck[0],battleDeck[1])
       displayWinner()

  } else if (battleDeck[0][e.target.parentElement.id] < battleDeck[1][e.target.parentElement.id]){
    console.log('player2 wins')
    player1Turn = false
    player2Deck.push(battleDeck[0],battleDeck[1])
    displayWinner()
  } else if (battleDeck[0][e.target.parentElement.id] === battleDeck[1][e.target.parentElement.id]){
    console.log('draw')
    player1Deck.push(battleDeck[0])
    player2Deck.push(battleDeck[1])
    displayWinner()
  }
  
})

function displayWinner(){
  winnerDialog.style.display = 'grid'
  winnerDialogText.innerHTML = 
  player1Turn? `${localStorage.getItem('p1name')} wins!`: `${localStorage.getItem('p2name')} wins!` 
}

nextRoundBtn.addEventListener('click',()=>{
  battleDeck = []
  winnerDialog.style.display = 'none'
  initiateBattle()
})


class TrumpCard {
  constructor(data){
    Object.assign(this,data) 
  }

  renderCalculator(){
      if (renderCycle === 1 && player1Turn) {
      return 'active'
    } else if (renderCycle === 2 && !player1Turn) {
      return 'active'
    } else {
      return ''
    }
  }

  getCardHtml(){
    const {name, img, magic, cunning, courage, wisdom, temper} = this
    return ` <div class="card ${this.renderCalculator()}">
    
      <div class="card-inner">
    <h3 class="card-name">${name}</h3>
    <div class="card-image-container">
      <img src=${img} class="card-image">
    </div>
    <ul class="card-attribute-container">
      <li id="magic" class="magic ${player1Turn? 'Player1' : 'Player2'}"><span class="attrib-name">Magic</span><span class="arrow">&#10148;</span><span class="attrib-value">${magic}</span></li>
      <li id="cunning" class="cunning ${player1Turn? 'Player1' : 'Player2'}"><span class="attrib-name">Cunning</span><span class="arrow">&#10148;</span><span class="attrib-value">${cunning}</span></li>
      <li id="courage" class="courage ${player1Turn? 'Player1' : 'Player2'}"><span class="attrib-name">Courage</span><span class="arrow">&#10148;</span><span class="attrib-value">${courage}</span></li>
      <li id="wisdom" class="wisdom ${player1Turn? 'Player1' : 'Player2'}"><span class="attrib-name">Wisdom</span><span class="arrow">&#10148;</span><span class="attrib-value">${wisdom}</span></li>
      <li id="temper" class="temper ${player1Turn? 'Player1' : 'Player2'}"><span class="attrib-name">Temper</span><span class="arrow">&#10148;</span> <span class="attrib-value">${temper}</span></li>
 </ul>
</div>
 </div>`
  }
}