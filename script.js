import Deck from './deck.js';

const CARD_VALUE_MAP = {
    "2": 2,
    "3": 3,
    "4": 4,
    "5": 5,
    "6": 6,
    "7": 7,
    "8": 8,
    "9": 9,
    "10": 10,
    "J": 11,
    "Q": 12,
    "K": 13,
    "A": 15
}

const computerCardSlot = document.querySelector('.computer-card-slot')
const playerCardSlot = document.querySelector('.player-card-slot')
const computerDeckElement = document.querySelector('.computer-deck')
const playerDeckElement = document.querySelector('.player-deck')
const text = document.querySelector('.text')

let playerDeck, computerDeck, inRound, gameEnd;

document.addEventListener('click', () => {
    if (gameEnd){
        startGame();
        return
    }

    if(inRound){
        clearBeforeRound()
    }else{
        flipCards()
    }
})

startGame()
function startGame() {
    const deck = new Deck();
    deck.shuffleDeck()
//divide in half rounding to nerest whole integer
    const deckMidpoint = Math.ceil(deck.numberOfCards / 2)
    playerDeck = new Deck(deck.cards.slice(0,deckMidpoint))
    computerDeck = new Deck(deck.cards.slice(deckMidpoint, deck.numberOfCards))

    inRound = false
    gameEnd = false

    clearBeforeRound()
}

function clearBeforeRound() {
    inRound = false
    computerCardSlot.innerHTML = ''
    playerCardSlot.innerHTML = ''
    text.innerHTML = ''

    updateDeckCount()
}

function updateDeckCount() {
    computerDeckElement.innerText = computerDeck.numberOfCards
    playerDeckElement.innerText = playerDeck.numberOfCards

}
function flipCards(){
    inRound = true  


    const playerCard = playerDeck.pop()
    const computerCard = computerDeck.pop()

    playerCardSlot.appendChild(playerCard.getHTML())
    computerCardSlot.appendChild(computerCard.getHTML())
    updateDeckCount()
    if(roundWinner(playerCard, computerCard)){
        text.innerText = "Player Wins"
        playerDeck.push(playerCard)
        playerDeck.push(computerCard)
    }else if(roundWinner(computerCard,playerCard)){
        text.innerText = "Computer Wins"
        computerDeck.push(playerCard)
        computerDeck.push(computerCard)
    }else{
        text.innerText = "Draw !!!"
        playerDeck.push(playerCard)
        computerDeck.push(computerCard)
    }
    if (isGameOver(playerDeck)){
        text.innerText = "You're a Looser!!!"
        gameEnd = true
    } else if(isGameOver(computerDeck)){
        text.innerText = "You're a Winner!!!"
        gameEnd = true
    }
}

function roundWinner(cardOne,cardTwo) {
    return CARD_VALUE_MAP[cardOne.value]>CARD_VALUE_MAP[cardTwo.value]
}

function isGameOver(deck){
    return deck.numberOfCards === 0

}
