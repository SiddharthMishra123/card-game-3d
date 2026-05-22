class Card3D {
    constructor(suit, rank, position = { x: 0, y: 0, z: 0 }) {
        this.suit = suit;
        this.rank = rank;
        this.position = position;
        this.isFlipped = false;
        this.mesh = this.createCardMesh();
    }

    createCardMesh() {
        const group = new THREE.Group();
        const width = 1.5;
        const height = 2.5;
        const depth = 0.05;
        
        const cardGeometry = new THREE.BoxGeometry(width, height, depth);
        const materials = [
            new THREE.MeshStandardMaterial({ color: 0xcccccc }),
            new THREE.MeshStandardMaterial({ color: 0xcccccc }),
            new THREE.MeshStandardMaterial({ color: 0xffffff }),
            new THREE.MeshStandardMaterial({ color: 0x0066cc }),
            new THREE.MeshStandardMaterial({ color: 0xcccccc }),
            new THREE.MeshStandardMaterial({ color: 0xcccccc })
        ];
        
        const card = new THREE.Mesh(cardGeometry, materials);
        card.castShadow = true;
        card.receiveShadow = true;
        
        group.add(card);
        group.position.set(this.position.x, this.position.y, this.position.z);
        
        return group;
    }

    setPosition(x, y, z) {
        this.position = { x, y, z };
        this.mesh.position.set(x, y, z);
    }

    flip() {
        this.isFlipped = !this.isFlipped;
        this.mesh.rotation.y += Math.PI;
    }

    getSuitSymbol() {
        const symbols = { 'hearts': '♥', 'diamonds': '♦', 'clubs': '♣', 'spades': '♠' };
        return symbols[this.suit];
    }
}
