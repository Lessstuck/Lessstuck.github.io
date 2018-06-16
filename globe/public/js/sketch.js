window.addEventListener( 'resize', onWindowResize, false );
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

let leftLight = 2;
let rightLight = 2;
let topLight = 2;
let bottomLight = 2;
let frontLight = 2;
var socket = io.connect('//localhost:3000');

socket.on('data', function(data) {
  let incoming = data;
  console.log(incoming);
  if(incoming === "left"){
    leftLight = 2;
    setTimeout(function(){ leftLight = 0; }, 1000);
  };
  if(incoming === "right"){
    rightLight = 2;
    setTimeout(function(){ rightLight = 0; }, 1000);
  };
  if(incoming === "top"){
    topLight = 2;
    setTimeout(function(){ topLight = 0; }, 1000);
  };
  if(incoming === "bottom"){
    bottomLight = 2;
    setTimeout(function(){ bottomLight = 0; }, 1000);
  };
  if(incoming === "front"){
    frontLight = 2;
    setTimeout(function(){ frontLight = 0; }, 1000);
  };
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

//scene.add( new THREE.AmbientLight( 0xffffff, 2 ) );
var light1 = new THREE.PointLight( 0xffffff, 2, 0 ); light1.position.set( 3,0,0); scene.add( light1 );
var light2 = new THREE.PointLight( 0xffffff, 2, 0 ); light2.position.set( -3,0,0 ); scene.add( light2 );
var light3 = new THREE.PointLight( 0xffffff, 2, 0 ); light3.position.set( 0,3,0); scene.add( light3 );
var light4 = new THREE.PointLight( 0xffffff, 2, 0 ); light4.position.set( 0,-3,0 ); scene.add( light4 );
var light5 = new THREE.PointLight( 0xffffff, 2, 0 ); light5.position.set( 0,0,2 ); scene.add( light5 );

var textureLoader = new THREE.TextureLoader();
var earthTexture = textureLoader.load( './models/Earth_TEXTURE_CM.jpg' );
//earthTexture.mapping = THREE.EquirectangularRefractionMapping;
var earthBall = new THREE.OBJLoader();
var Earth;
var obloaded = false;
earthBall.setPath( './models/' );
earthBall.load( 'Earth.obj', function ( object ) {
    scene.add( object );
    object.scale.set(.45, .45,.45);
    Earth = object;
    obloaded = true;
})

//earthBall.scale=(.5,.5,.5);

var earthMat = new THREE.MTLLoader();
earthMat.setPath( './models/' );
earthMat.load( "Earth.mtl", function( materials ) {
    materials.preload();
    earthBall.setMaterials( materials );
  });


//scene.add(cube);

// Render Loop
var render = function() {
  requestAnimationFrame(render);
  if (obloaded) {
    Earth.rotation.y += (0.2*(Math.PI / 180));
    Earth.rotation.y %=360;
    light1.intensity = leftLight;
    light2.intensity = rightLight;
    light3.intensity = topLight;
    light4.intensity = bottomLight;
    light5.intensity = frontLight;
  }
/*
  cube.rotation.x = 1;
  cube.rotation.y = 1;
  cube.rotation.z = 1;
*/
  renderer.render(scene, camera);
};

render();
