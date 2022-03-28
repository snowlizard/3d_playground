import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';

import room from '../assets/models/room.obj';

let scene, camera, renderer, controls, hemiLight, spotLight;
let model = new THREE.Object3D()

const width = 500;
const height= 500;

const canvas = document.getElementById('canvas');

// blue 0x4287f5
// black 0x000000
// white 0xffffff
// grey 0xdddddd

export const init = () => {
    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0xdddddd );

    // camera
    camera = new THREE.PerspectiveCamera(60, width/height, 1, 5000);
    camera.position.set(0, 25, 25);

    // axis helper
    scene.add(new THREE.AxesHelper(500));

    // renderer
    renderer = new THREE.WebGLRenderer({canvas});
    renderer.setSize(width, height);

    controls = new OrbitControls(camera, renderer.domElement);
    
    // lighting
    hemiLight = new THREE.HemisphereLight(0xffeeb1, 0x080820, 1);
    scene.add(hemiLight);
    
    spotLight = new THREE.SpotLight(0xffa95c, 0.5);
    spotLight.castShadow = true;
    scene.add(spotLight);

    // loading 3D object
    const loader = new OBJLoader();
    
    loader.load(room, (obj) => {
        model = obj;
        model.scale.set(2, 2, 2);
        scene.add(model);
    },
    undefined,
    (error) => console.log(`Error: ${error}`));

    animate();

}

const animate = () => {
    renderer.render(scene, camera);
    spotLight.position.set(
        camera.position.x + 100,
        camera.position.y + 100,
        camera.position.z + 100
    );
    requestAnimationFrame(animate);
}



/* OBJ 
    loader.load(monitor, (obj) => {
        model = obj;
        model.scale.set(2, 2, 2);
        scene.add(model);
        animate();
    },
    undefined,
    (error) => console.log(`Error: ${error}`));
*/

/* GLB GLTF

    loader.load(monitor, (gltf) => {
        model = gltf.scene;
        //model.scale.set(10, 10, 10);
        scene.add(model);
    },
    undefined,
    (error) => console.log(`Error: ${error}`))
*/

/*
    const cubeTarget = new THREE.WebGLCubeRenderTarget(128, { generateMipmaps: true,
        minFilter: THREE.LinearMipMapLinearFilter});
    
    //let camera = new THREE.CubeCamera(1, 10000, cubeTarget);
    //scene.add(camera);
*/