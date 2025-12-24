import * as THREE from "three";
import { OrbitControls } from "jsm/controls/OrbitControls.js";

const h = window.innerHeight;
const w = window.innerWidth;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(w, h);
document.body.appendChild(renderer.domElement);

const cam = new THREE.PerspectiveCamera(75, w / h, 0.1, 100);
cam.position.z = 3;

const scene = new THREE.Scene();
const loader = new THREE.TextureLoader();

const controls = new OrbitControls(cam, renderer.domElement);
controls.enableDamping = true;

const earthGeo = new THREE.IcosahedronGeometry(1, 12);
const earthMat = new THREE.MeshBasicMaterial({
    map: loader.load("8k_earth_daymap.jpg"),
})

const earthGroup = new THREE.Group();
earthGroup.rotation.z = -23.4 * Math.PI / 180;
scene.add(earthGroup);

const earthMesh = new THREE.Mesh(earthGeo, earthMat);
earthGroup.add(earthMesh);


scene.add(earthMesh);


function animate() {

    requestAnimationFrame(animate);
    renderer.render(scene, cam);

    earthMesh.rotation.y += 0.01;

}

animate();