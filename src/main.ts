import { Scene, PerspectiveCamera, WebGLRenderer, SphereGeometry, Mesh, MeshBasicMaterial, TextureLoader } from 'three';
import { OrbitControls } from 'three-orbitcontrols-ts';
import { starfield } from './objects';

let scene = new Scene();
let camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

let loader = new TextureLoader();

let controls = new OrbitControls(camera);

let renderer = new WebGLRenderer();
let canvas = document.body.appendChild(renderer.domElement);

let geometry = new SphereGeometry(1, 200, 200);
let material = new MeshBasicMaterial({ wireframe: false, map: new TextureLoader().load( "assets/textures/sun1.jpg" ) });
let sun = new Mesh(geometry, material);

let tanFOV = Math.tan( ( ( Math.PI / 180 ) * camera.fov / 2 ) );

let resize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    
    // adjust the FOV
    camera.fov = ( 360 / Math.PI ) * Math.atan( tanFOV * ( window.innerHeight / window.innerHeight ) );
    
    camera.updateProjectionMatrix();
    camera.lookAt( scene.position );

    renderer.setSize( window.innerWidth, window.innerHeight );
};

window.addEventListener('resize', resize, false);

resize();
scene.add(sun);
scene.add(starfield);

camera.position.z = 5;
controls.update();

let animate = function() {
    requestAnimationFrame(animate);

    sun.rotation.y += 0.005;
    controls.update();

    renderer.render(scene, camera);
};

animate();
