//Scene every object is placed into
var scene = new THREE.Scene( );

//Camera which defines how the object is viewed
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

//Establishes the renderer defined by three js
var renderer = new THREE.WebGLRenderer( );
renderer.setSize( window.innerWidth * 0.79 , window.innerHeight * 0.95 );
document.body.appendChild( renderer.domElement );

//Scalable window resizing
window.addEventListener( 'resize', function()
{
  var width = window.innerWidth * 0.79;
  var height = window.innerHeight * 0.95;
  renderer.setSize( width, height );
  camera.aspect = width/height;
  camera.updateProjectionMatrix( );
})

function floatLeft(){
  renderer.style.cssFloat="left";
}


//Creates a grid behind the object being rendered
var size = 10;
var divisions = 10;
var gridHelper = new THREE.GridHelper( size, divisions );
scene.add( gridHelper )

//Generates the shape rendered, and gives it a mesh
var cube = new THREE.Mesh(
  new THREE.BoxGeometry(4,2,0.01),
  new THREE.MeshBasicMaterial({map: THREE.ImageUtils.loadTexture('textures/airplane.png')})
);


cube.material.side = THREE.DoubleSide;
scene.add(cube);

cube.position.y = 0.5;

//Pulls the camera back from the rendered shape so the shape is in view
camera.position.z = 3;
camera.position.y = 1;
//Animation function which gives the cube some rotation
var animate = function ( ) {
requestAnimationFrame( animate );
/*
cube.rotation.x += 0.01;
cube.rotation.y += 0.01;
*/
renderer.render( scene, camera );
};

animate();
