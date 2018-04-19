import {SphereGeometry, Mesh, ShaderMaterial, TextureLoader, Vector2, Vector3, RepeatWrapping} from 'three';

import * as Shaders from '../shaders';

let geometry = new SphereGeometry(2.5, 300, 300);
let textureLoader = new TextureLoader();

let uniforms = {
    fogDensity: {value: 0.05},
    fogColor: {value: new Vector3(30, 8, 0)},
    time: {value: 1.0},
    uvScale: {value: new Vector2(2.0, 1.0)},
    texture1: {value: textureLoader.load('/assets/textures/cloud.png')},
    texture2: {value: textureLoader.load('/assets/textures/lavatile.jpg')}
};
uniforms.texture1.value.wrapS = uniforms.texture1.value.wrapT = RepeatWrapping;
uniforms.texture2.value.wrapS = uniforms.texture2.value.wrapT = RepeatWrapping;

let material = new ShaderMaterial({
    uniforms,
    vertexShader: Shaders.sunVertex,
    fragmentShader: Shaders.sunFagment
});

// let material = new MeshBasicMaterial({ wireframe: false, map: new TextureLoader().load( "assets/textures/sun1.jpg" ) });
let sun = new Mesh(geometry, material);

export {sun, uniforms};
