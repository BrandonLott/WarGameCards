const SUITS = ["♥", "♦", "♠", "♣"]
const VALUES = [
    "A","2","3","4","5","6","7","8","9","10","J","Q","K"
]

export default class Deck {
    constructor(cards = newDeck()){
        this.cards = cards;
    }

    get numberOfCards(){
        return this.cards.length;
    }

    pop() {
        return this.cards.shift()
    }

    push(card){
        this.cards.push(card)
    }
/* take our array of cards and "shuffle" them so we have an unordered
array of cards loop through cards and switch out index with a random number*/
    shuffleDeck(){ 
        for(let i = this.numberOfCards - 1;i > 0; i--){
            //index an unindexed place
            const newIndex = Math.floor(Math.random() * (i + 1));
            const oldValue  = this.cards[newIndex]
            //switch i for new index and swap values
            this.cards[newIndex] = this.cards[i]
            this.cards[i] = oldValue
        }
    }

}
class Card{
    constructor(suit, value){
        this.suit = suit;
        this.value = value;
    }

get color(){
    //turnary operation for simplifying an if else statement
    return this.suit === '♣' || this.suit === '♠' ? 'black' : 'red';
}

getHTML(){
    const cardDiv = document.createElement('div')
    cardDiv.innerText = this.suit
    cardDiv.classList.add("card", this.color)
    cardDiv.dataset.value = `${this.value} ${this.suit}`
    return cardDiv
    }
}





function newDeck(){
    /* take an array of arrays and condense it inot a single array */
    return SUITS.flatMap(suit => {
        return VALUES.map(value =>{
            return new Card(suit, value)
        })
    })
}