
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


var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 4;
var renderer = new THREE.WebGLRenderer({
  antialias: true
});
renderer.setClearColor("#000000");
renderer.setSize(window.innerWidth, window.innerHeight);
// Append Renderer to DOM
console.log('renderer: ', renderer.domElement);
document.body.appendChild(renderer.domElement);
/*
var spotLight = new THREE.SpotLight(0xdddddd);
spotLight.position.set(-0, 30, 60);
spotLight.castShadow = true;
spotLight.intensity = 1.0;
scene.add(spotLight);
*/
scene.add( new THREE.AmbientLight( 0xffffff, 2 ) );
			/*	var directionalLight = new THREE.DirectionalLight( 0xffffff, 2 );
				directionalLight.position.x = Math.random() - 0.5;
				directionalLight.position.y = Math.random() - 0.5;
				directionalLight.position.z = Math.random() - 0.5;
				directionalLight.position.normalize();
				scene.add( directionalLight );
				pointLight = new THREE.PointLight( 0xffffff, 2 );
				scene.add( pointLight );
*/
var textureLoader = new THREE.TextureLoader();
var earthTexture = textureLoader.load( './models/Earth_TEXTURE_CM.jpg' );

var earthBall = new THREE.OBJLoader();
var earthMat = new THREE.MTLLoader();
earthMat.setPath( './models/' );
earthMat.load( "Earth.mtl", function( materials ) {
    materials.preload();
    earthBall.setMaterials( materials );
    earthBall.setPath( './models/' );
    earthBall.load( 'Earth.obj', function ( object ) {
        scene.add( object );
        object.scale.set(1,1,1);
  },
  // called when loading is in progresses
  function ( xhr ) {
    console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
  },
  function ( error ) {
    console.log( 'An error happened' );
  })});
//  earthBall.scale.set(.25,.25,.25);
//scene.add(cube);

// Render Loop
var render = function() {
  requestAnimationFrame(render);

/*
  cube.rotation.x = 1;
  cube.rotation.y = 1;
  cube.rotation.z = 1;
*/
  renderer.render(scene, camera);
};

render();
