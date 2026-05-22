class Rummy {
    constructor(scene, camera) {
        this.scene = scene;
        this.camera = camera;
        this.players = [];
        this.deck = new Deck(2);
        this.discardPile = [];
        this.currentPlayerIndex = 0;
        this.gameState = 'setup';
    }

    init() {
        this.createPlayers(4);
        this.dealCards();
        this.updateUI();
    }

    createPlayers(count = 4) {
        for (let i = 0; i < count; i++) {
            this.players.push({
                id: i,
                name: i === 0 ? 'You' : `AI Player ${i}`,
                hand: [],
                melds: [],
                score: 0,
                isCPU: i !== 0
            });
        }
    }

    dealCards() {
        for (let i = 0; i < 13; i++) {
            for (let player of this.players) {
                const cardData = this.deck.drawCard();
                player.hand.push(cardData);
            }
        }
        this.gameState = 'playing';
    }

    calculateScore(playerIndex) {
        const player = this.players[playerIndex];
        const rankValues = {
            'A': 10, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9,
            '10': 10, 'J': 10, 'Q': 10, 'K': 10
        };
        let score = 0;
        for (let card of player.hand) {
            score += rankValues[card.rank];
        }
        return score;
    }

    update() {}
    handleGameUpdate(data) {}
    handlePlayerAction(data) {}
    cleanup() {}

    updateUI() {
        const playerInfo = document.getElementById('player-info');
        const player = this.players[0];
        
        let html = '<h3>🃏 Your Hand</h3>';
        html += `<p><strong>Cards:</strong> ${player.hand.length}</p>`;
        html += `<p><strong>Score:</strong> ${this.calculateScore(0)}</p>`;
        
        const gameStats = document.getElementById('game-stats');
        gameStats.innerHTML = `
            <h3>📊 Game Stats</h3>
            <p><strong>Current:</strong> ${this.players[this.currentPlayerIndex].name}</p>
            <p><strong>Deck:</strong> ${this.deck.getCardCount()}</p>
            <p><strong>Discard:</strong> ${this.discardPile.length}</p>
        `;
        
        playerInfo.innerHTML = html;
    }
}
