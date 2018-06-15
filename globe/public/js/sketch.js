
// let x, y, z, mx, my, mz;
//
// function map(num, in_min, in_max, out_min, out_max) {
//     return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
// }
let a = 1;
var socket = io.connect('//localhost:3000');

socket.on('data', function(data) {
  let incoming = data;
  console.log(incoming);
  if(incoming === "f"){
    a = 2;
  }

  // x = data[1];
  // y = data[2];
  // z = data[3];
  // $('#incoming').text(incoming[0] + " x:" + x + " y:" + y + " z:" + z);
  //
  // mx = map(parseInt(x), -10, 10, -1, 1);
  // my = map(parseInt(y), -10, 10, -1, 1);
  // mz = map(parseInt(z), -10, 10, -1, 1);
  // console.log(map(x, -10, 10, .01, .09));
});
socket.on('error', function() {
  console.error(arguments)
});


// part 2 of scipt from index
var scene = new THREE.Scene();

// Create a basic perspective camera
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 4;

// Create a renderer with Antialiasing
var renderer = new THREE.WebGLRenderer({
  antialias: true
});

// Configure renderer clear color
renderer.setClearColor("#000000");

// Configure renderer size
renderer.setSize(window.innerWidth, window.innerHeight);

// Append Renderer to DOM
console.log('renderer: ', renderer.domElement);
document.body.appendChild(renderer.domElement);


// ------------------------------------------------
// FUN STARTS HERE
// ------------------------------------------------

//Add a light
var spotLight = new THREE.SpotLight(0xffffff);
spotLight.position.set(-0, 30, 60);
spotLight.castShadow = true;
spotLight.intensity = 0.6;
scene.add(spotLight);

// Create a Cube Mesh with basic material
var geometry = new THREE.BoxGeometry(2, 2, 2);
var material = new THREE.MeshStandardMaterial({color: 0x7777ff})
var cube = new THREE.Mesh(geometry, material);

// instantiate a loader
var loader = new THREE.OBJLoader();
var mtlLoader = new THREE.MTLLoader();

// load a resource
loader.load(
  // resource URL
  './models/Earth.obj',
  // called when resource is loaded
  function ( object ) {

    scene.add( object );

  },
  // called when loading is in progresses
  function ( xhr ) {

    console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

  },
  // called when loading has errors
  function ( error ) {

    console.log( 'An error happened' );

  }
);


// Add cube to Scene
scene.add(cube);

// Render Loop
var render = function() {
  requestAnimationFrame(render);

  cube.rotation.x = a;
  cube.rotation.y = 1;
  cube.rotation.z = 1;

  // Render the scene
  renderer.render(scene, camera);
};

render();
