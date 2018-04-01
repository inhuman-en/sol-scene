import { Scene, PerspectiveCamera, WebGLRenderer, SphereGeometry, Mesh, MeshBasicMaterial } from 'three';

let scene = new Scene();
let camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

let renderer = new WebGLRenderer();
let canvas = document.body.appendChild(renderer.domElement);

let geometry = new SphereGeometry(1, 10, 10);
let material = new MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
let sun = new Mesh(geometry, material);

let resize = () => {
    renderer.setSize(window.innerWidth * 0.7, window.innerHeight * 0.7);
};

window.addEventListener('resize', resize, false);

resize();
scene.add(sun);

camera.position.z = 5;

let animate = function() {
    requestAnimationFrame(animate);

    sun.rotation.y += 0.005;

    renderer.render(scene, camera);
};

animate();
