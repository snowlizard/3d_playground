import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';

import aya from '../assets/models/091_W_Aya_30k.obj';

let scene, camera, renderer, controls, spotLight;
const canvas = document.getElementById('model');
let model = new THREE.Object3D();

const width = 500;
const height = 500;

export const Aya = () => {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xdddddd);

    camera = new THREE.PerspectiveCamera(60, width/height, 1, 1000);
    camera.position.set(0, 0, 0);

    scene.add(new THREE.AxesHelper(500));

    renderer = new THREE.WebGLRenderer();
    canvas.appendChild(renderer.domElement);
    renderer.setSize(width, height);

    controls = new OrbitControls(camera, renderer.domElement);

    spotLight = new THREE.SpotLight(0xffa95c, 0.5);
    spotLight.castShadow = true;
    scene.add(spotLight);

    const loader = new OBJLoader();

    loader.load(aya, (obj) => {
        model = obj
        model.scale.set(2, 2, 2);
        scene.add(model);
    }, undefined,
    (error) => console.log(`Error: ${error}`) );

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