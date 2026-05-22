let scene, camera, renderer;
let currentGame = null;
let socket = io();

function initThreeJS() {
    const container = document.getElementById('container');
    
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x1a1a2e);
    
    camera = new THREE.PerspectiveCamera(
        75,
        container.clientWidth / container.clientHeight,
        0.1,
        1000
    );
    camera.position.set(0, 5, 8);
    camera.lookAt(0, 0, 0);
    
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);
    
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 10, 7);
    directionalLight.castShadow = true;
    scene.add(directionalLight);
    
    const tableGeometry = new THREE.CylinderGeometry(8, 8, 0.5, 32);
    const tableMaterial = new THREE.MeshStandardMaterial({
        color: 0x1a472a,
        roughness: 0.3,
        metalness: 0.1
    });
    const table = new THREE.Mesh(tableGeometry, tableMaterial);
    table.castShadow = true;
    table.receiveShadow = true;
    scene.add(table);
    
    window.addEventListener('resize', onWindowResize);
    animate();
}

function animate() {
    requestAnimationFrame(animate);
    if (currentGame) {
        currentGame.update();
    }
    renderer.render(scene, camera);
}

function onWindowResize() {
    const container = document.getElementById('container');
    const width = container.clientWidth;
    const height = container.clientHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
}

document.getElementById('rummy-btn').addEventListener('click', startRummy);
document.getElementById('poker-btn').addEventListener('click', startPoker);
document.getElementById('back-btn').addEventListener('click', backToMenu);

function startRummy() {
    hideMenu();
    currentGame = new Rummy(scene, camera);
    currentGame.init();
}

function startPoker() {
    hideMenu();
    currentGame = new Poker(scene, camera);
    currentGame.init();
}

function backToMenu() {
    showMenu();
    if (currentGame) {
        currentGame.cleanup();
        currentGame = null;
    }
}

function hideMenu() {
    document.getElementById('menu').style.display = 'none';
    document.getElementById('game-ui').classList.remove('hidden');
}

function showMenu() {
    document.getElementById('menu').style.display = 'block';
    document.getElementById('game-ui').classList.add('hidden');
}

socket.on('connect', () => console.log('Connected'));
socket.on('gameUpdate', (data) => { if (currentGame) currentGame.handleGameUpdate(data); });
socket.on('playerAction', (data) => { if (currentGame) currentGame.handlePlayerAction(data); });

window.addEventListener('DOMContentLoaded', initThreeJS);
