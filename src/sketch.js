// Ensure ThreeJS is in global scope for the 'examples/'
global.THREE = require("three");

require("three/examples/js/controls/OrbitControls");

const canvasSketch = require("canvas-sketch");

const settings = {
  animate: true,
  context: "webgl"
};

const sketch = ({ context }) => {
  const renderer = new THREE.WebGLRenderer({
    canvas: context.canvas
  });

  renderer.setClearColor("#000", 1);

  const camera = new THREE.PerspectiveCamera(50, 1, 0.01, 100);
  camera.position.set(0, 0, -4);
  camera.lookAt(new THREE.Vector3());

  const controls = new THREE.OrbitControls(camera, context.canvas);

  const scene = new THREE.Scene();

  const geometry = new THREE.SphereGeometry(1, 32, 16);

  const material2 = new THREE.MeshNormalMaterial({
    //color: "red",
    //wireframe: true
  });
  const material1 = new THREE.MeshNormalMaterial({
    //color: "red",
    flatShading: true
    //wireframe: true
  });

  const loader = new THREE.TextureLoader();
  const texture_moon = new loader.load("../src/images/moon.jpg")

  const texture = new loader.load("../src/images/earth.jpg")
  const material = new THREE.MeshStandardMaterial({
    map:texture,
    roughness:1,
    metalness: 0
  });

  const material_moon = new THREE.MeshStandardMaterial({
    map:texture_moon
  });

  // Setup a mesh with geometry + material
  const mesh = new THREE.Mesh(geometry, material);
  const mesh_moon = new THREE.Mesh(geometry, material_moon);

  const group = new THREE.Group();
  group.add(mesh_moon);

  mesh_moon.position.set(1.2,0.8,0.5);
  mesh_moon.scale.setScalar(0.15);
  scene.add(mesh);
  scene.add(group)


  // drawing a light
  const light = new THREE.PointLight("white", 1.5);
  light.position.set(2,2,-3)
  scene.add(light)
  // draw each frame

  //scene.add(new THREE.PointLightHelper(light,0.1))
  //scene.add(new THREE.GridHelper(2,15))

  return {
    // Handle resize events here
    resize({ pixelRatio, viewportWidth, viewportHeight }) {
      renderer.setPixelRatio(pixelRatio);
      renderer.setSize(viewportWidth, viewportHeight, false);
      camera.aspect = viewportWidth / viewportHeight;
      camera.updateProjectionMatrix();
    },
    // Update & render your scene here
    render({ time }) {
      mesh.rotation.y = time * 0.1;
      mesh_moon.rotation.y=time*0.05;
      group.rotation.y = time * 0.5;
      controls.update();
      renderer.render(scene, camera);
    },
    // Dispose of events & renderer for cleaner hot-reloading
    unload() {
      controls.dispose();
      renderer.dispose();
    }
  };
};

canvasSketch(sketch, settings);
