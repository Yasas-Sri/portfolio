import './style.css'
import * as THREE from 'three'


import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
//import { OrbitControls } from 'https://unpkg.com/three@0.153.0/examples/jsm/controls/OrbitControls.js';





const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById("three-canvas"),
  alpha: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(2, 2, 5);
scene.add(light);

const loader = new GLTFLoader();
loader.load("./spaceman.glb", function (gltf) {  //astronut_suit.glb  spaceman.glb
  const model = gltf.scene;
  console.log(model)
  model.scale.set(1, 1, 1);
  //model.rotation.set(2, 0, Math.PI / 1);
  model.position.y = -2.5;
  model.position.x = -2.5;




  // // Auto-center the model
  // const box = new THREE.Box3().setFromObject(model);
  // const center = box.getCenter(new THREE.Vector3());
  // model.position.sub(center);

  scene.add(model);


  // model.traverse((child) => {
  //   if (child.isMesh) {
  //     child.material.color.set('#ffffff'); // Set to your desired hex color
  //   }
  // });

  model.traverse((child) => {
    if (child.isBone || child.isMesh) {
      console.log(child.name); // See bone names in browser console
    }
  });

  model.traverse((child) => {
    if (
      child.name.includes('Cube009_0') ||
      child.name.includes('Plane_0') ||
      child.name.includes('Cube011_0')
    ) {
      child.visible = false;
    }
  });


  model.traverse((child) => {
    switch (child.name) {
      //case 'upper_armR_metarig':
      case 'upper_armL_metarig':
        child.rotation.x = -Math.PI / 1.5; // Arms up
        break;
      case 'upper_armR_metarig':
        child.rotation.y = Math.PI / 0.8; // Arms up
        break;
      // case 'thighL_metarig':
      //   child.rotation.x = Math.PI / 5;
      //   break;
      // case 'thighR_metarig':
      //   child.rotation.y = Math.PI / 9;
      //   break;

      // case 'spine_metarig':
      //   child.rotation.x = Math.PI / 8; 
      //   break;

      case 'mike_metarig':
        child.visible = false;
        break;

    }
  });




  let angle = 0;
  function animate() {
    requestAnimationFrame(animate);
    angle += 0.005;
    // model.rotation.y = angle;
    model.position.y = Math.sin(angle) * 0.5;
    renderer.render(scene, camera);
  }
  animate();












  // model.rotation.x = Math.PI / 4; // Tilt backwards 45 degrees
  // model.rotation.z = Math.PI / 8; // Add a slight spin

  // // Explore bone or mesh structure
  // model.traverse((child) => {
  //   if (child.isBone || child.isMesh) {
  //     console.log(child.name); // See bone names in browser console
  //   }
  // });

  // // Sample pose: raise both arms and tilt legs
  // model.traverse((child) => {
  //   switch (child.name) {
  //     case 'upper_armR_metarig':
  //     case 'upper_armL_metarig':
  //       child.rotation.x = -Math.PI / 2; // Arms up
  //       break;
  //     case 'footR_metarig':
  //     case 'footL_metarig':
  //     case 'thighL_metarig':
  //       child.rotation.x = Math.PI / 6; // Slight leg bend
  //       break;
  //     case 'mixamorigHead':
  //       child.rotation.x = Math.PI / 6; // Tilt head up
  //       break;
  //     case 'mike_metarig':
  //       child.visible = false;
  //       break;

  //   }
  // });

  // model.traverse((child) => {
  //   if (child.name === 'mike_metarig' || child.name === 'phone_metarig') {
  //     child.visible = false;
  //   }
  // });


  // // Animate the whole model slowly spinning as it "falls"
  // function animate() {
  //   requestAnimationFrame(animate);
  //   model.rotation.y += 0.01;
  //   renderer.render(scene, camera);
  // }
  // animate();
});

camera.position.z = 5;

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

console.log(THREE)

