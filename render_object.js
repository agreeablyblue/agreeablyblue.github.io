//Scene every object is placed into
var scene = new THREE.Scene( );

//Camera which defines how the object is viewed
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

//Establishes the renderer defined by three js
var renderer = new THREE.WebGLRenderer( );
renderer.setSize( window.innerWidth , window.innerHeight );
document.body.appendChild( renderer.domElement );

//Scalable window resizing
window.addEventListener( 'resize', function()
{
  var width = window.innerWidth;
  var height = window.innerHeight;
  renderer.setSize( width, height );
  camera.aspect = width/height;
  camera.updateProjectionMatrix( );
})



//Generates the shape rendered, and gives it a mesh
var geometry = new THREE.BoxGeometry( 1, 1, 1 );
var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
var cube = new THREE.Mesh( geometry, material );
scene.add( cube );

//Pulls the camera back from the rendered shape so the shape is in view
camera.position.z = 5;

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
