import {WebGLRenderer} from 'three';

let renderer = new WebGLRenderer({ antialias: true, alpha: false });

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.autoClear = false;

export {renderer};