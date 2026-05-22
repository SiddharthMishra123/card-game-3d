class GameScene {
    constructor(scene) {
        this.scene = scene;
        this.objects = [];
        this.lightings = [];
    }

    addLight(type, color, intensity, position) {
        let light;
        switch(type) {
            case 'ambient':
                light = new THREE.AmbientLight(color, intensity);
                break;
            case 'directional':
                light = new THREE.DirectionalLight(color, intensity);
                if (position) light.position.set(position.x, position.y, position.z);
                break;
            case 'point':
                light = new THREE.PointLight(color, intensity);
                if (position) light.position.set(position.x, position.y, position.z);
                break;
        }
        if (light) {
            this.scene.add(light);
            this.lightings.push(light);
        }
        return light;
    }

    addObject(mesh) {
        this.scene.add(mesh);
        this.objects.push(mesh);
        return mesh;
    }

    removeObject(mesh) {
        this.scene.remove(mesh);
        this.objects = this.objects.filter(obj => obj !== mesh);
    }

    clear() {
        for (let obj of this.objects) {
            this.scene.remove(obj);
        }
        this.objects = [];
    }
}
