class Poker {
    constructor(scene, camera) {
        this.scene = scene;
        this.camera = camera;
        this.players = [];
        this.deck = new Deck();
        this.communityCards = [];
        this.pot = 0;
        this.gameRound = 0;
    }

    init() {
        this.createPlayers(6);
        this.startNewRound();
        this.updateUI();
    }

    createPlayers(count = 6) {
        for (let i = 0; i < count; i++) {
            this.players.push({
                id: i,
                name: i === 0 ? 'You' : `AI Player ${i}`,
                hand: [],
                chips: 1000,
                bet: 0,
                isActive: true,
                isCPU: i !== 0,
                folded: false,
                allIn: false
            });
        }
    }

    startNewRound() {
        this.gameRound++;
        this.deck.reset();
        this.communityCards = [];
        this.pot = 0;
        
        for (let player of this.players) {
            player.hand = [];
            player.bet = 0;
            player.folded = false;
        }
        
        this.dealHoleCards();
    }

    dealHoleCards() {
        for (let player of this.players) {
            player.hand = this.deck.drawMultiple(2);
        }
    }

    update() {}
    handleGameUpdate(data) {}
    handlePlayerAction(data) {}
    cleanup() {}

    updateUI() {
        const playerInfo = document.getElementById('player-info');
        const player = this.players[0];
        
        let html = '<h3>🎰 Your Hand</h3>';
        html += `<p><strong>Cards:</strong> ${player.hand.length}</p>`;
        html += `<p><strong>Chips:</strong> ${player.chips}</p>`;
        html += `<p><strong>Your Bet:</strong> ${player.bet}</p>`;
        
        const gameStats = document.getElementById('game-stats');
        gameStats.innerHTML = `
            <h3>💰 Game Stats</h3>
            <p><strong>Round:</strong> ${this.gameRound}</p>
            <p><strong>Pot:</strong> ${this.pot}</p>
            <p><strong>Community:</strong> ${this.communityCards.length}/5</p>
        `;
        
        playerInfo.innerHTML = html;
    }
}
