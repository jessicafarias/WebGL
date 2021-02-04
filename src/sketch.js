// Ensure ThreeJS is in global scope for the 'examples/'
global.THREE = require("three");

// Include any additional ThreeJS examples below
require("three/examples/js/controls/OrbitControls");

const canvasSketch = require("canvas-sketch");

const settings = {
  // Make the loop animated
  animate: true,
  // Get a WebGL canvas rather than 2D
  context: "webgl"
};

const sketch = ({ context }) => {
  // Create a renderer
  const renderer = new THREE.WebGLRenderer({
    canvas: context.canvas
  });

  // WebGL background color
  renderer.setClearColor("#000", 1);

  // Setup a camera
  const camera = new THREE.PerspectiveCamera(50, 1, 0.01, 100);
  camera.position.set(0, 0, -4);
  camera.lookAt(new THREE.Vector3());

  // Setup camera controller
  const controls = new THREE.OrbitControls(camera, context.canvas);

  // Setup your scene
  const scene = new THREE.Scene();

  // Setup a geometry
  const geometry = new THREE.SphereGeometry(1, 32, 16);

  // Setup a material
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
  const material = new THREE.MeshBasicMaterial({
    map:texture
  });

  const material_moon = new THREE.MeshBasicMaterial({
    map:texture_moon
  });

  // Setup a mesh with geometry + material
  const mesh = new THREE.Mesh(geometry, material);

  const mesh_moon = new THREE.Mesh(geometry, material_moon);
  mesh_moon.position.set(0,1.5,1.5);
  mesh_moon.scale.setScalar(0.15);
  scene.add(mesh, mesh_moon);

  // draw each frame
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
