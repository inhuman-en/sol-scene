import {RenderPass, BloomPass, FilmPass, EffectComposer} from 'postprocessing';

import {renderer} from './renderer';
import {scene} from './scene';
import {camera} from './camera';

let composer = new EffectComposer(renderer);
let renderModel = new RenderPass(scene, camera);
let effectBloom = new BloomPass(2.5);
let effectFilm = new FilmPass(0.15, 0.95, 2048, false);

effectFilm.renderToScreen = true;

composer.addPass(renderModel);
composer.addPass(effectBloom);
composer.addPass(effectFilm);

export {composer};
