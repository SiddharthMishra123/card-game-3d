class Deck {
    constructor(numDecks = 1) {
        this.cards = [];
        this.numDecks = numDecks;
        this.initializeDeck();
    }

    initializeDeck() {
        const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
        const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
        
        for (let d = 0; d < this.numDecks; d++) {
            for (let suit of suits) {
                for (let rank of ranks) {
                    this.cards.push({
                        suit: suit,
                        rank: rank,
                        id: `${suit}-${rank}-${d}`
                    });
                }
            }
        }
        
        this.shuffle();
    }

    shuffle() {
        for (let i = this.cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
        }
    }

    drawCard() {
        if (this.cards.length === 0) {
            this.initializeDeck();
        }
        return this.cards.pop();
    }

    drawMultiple(count) {
        const drawnCards = [];
        for (let i = 0; i < count; i++) {
            drawnCards.push(this.drawCard());
        }
        return drawnCards;
    }

    getCardCount() {
        return this.cards.length;
    }
}
