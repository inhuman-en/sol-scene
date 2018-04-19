import {
    SphereGeometry,
    Mesh,
    MeshBasicMaterial,
    ShaderMaterial,
    Vector2,
    Vector3,
    RepeatWrapping,
    Clock
} from 'three';

import { RenderPass, BloomPass, FilmPass } from 'postprocessing';

import { starfield, sun, uniforms as sunUniforms } from './objects';
import { renderer } from "./renderer";
import { scene } from "./scene";
import { camera } from "./camera";
import { controls } from "./controls";
import { composer } from "./effectComposer";

window.onload = function() {
    let clock = new Clock();    

    document.body.appendChild(renderer.domElement);

    scene.add(sun);
    scene.add(starfield);

    camera.position.z = 5;

    controls.update();

    let tanFOV = Math.tan(Math.PI / 180 * camera.fov / 2);    

    let resize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;

        // adjust the FOV
        camera.fov = 360 / Math.PI * Math.atan(tanFOV * (window.innerHeight / window.innerHeight));

        camera.updateProjectionMatrix();
        camera.lookAt(scene.position);
        renderer.setSize(window.innerWidth, window.innerHeight);
    };

    resize();

    window.addEventListener('resize', resize, false);

    let render = function() {
        sun.rotation.y += 0.0005;

        // renderer.render(scene, camera);

        let delta = 5 * clock.getDelta();
        sunUniforms.time.value += 0.1 * delta;

        renderer.clear();
        composer.render(0.01);

        controls.update();
        
    };

    let animate = function() {
        requestAnimationFrame(animate);
        render();
    };

    animate();
};
