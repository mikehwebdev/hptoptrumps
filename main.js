
import { diceRoll, render, splitDeck, initiateBattle } from "./utils"

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

let player1turn = true

let gameType = ''

let diceScore1 = 0
let diceScore2 = 0

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
  if (diceCount === 20) {
    clearInterval(diceInterval)

    if (diceScore1 > diceScore2) {
      rollResultEl.textContent = `${localStorage.getItem('p1name')} wins.`
      player1turn = true
      diceRollBtn.style.display = 'none'
      dealCardsBtn.style.display = 'block'
    
    } else if (diceScore2 > diceScore1) {
      player1turn = false
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






