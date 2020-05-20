//Scene every object is placed into
var scene = new THREE.Scene( );

//Camera which defines how the object is viewed
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

//Establishes the renderer defined by three js, sets the width to 80% of the screen, and the height to 95% of the screen. It also changes the background color of the renderer window to light grey
var renderer = new THREE.WebGLRenderer( );
renderer.setSize( window.innerWidth * 0.79 , window.innerHeight * 0.95 );
document.body.appendChild( renderer.domElement );
renderer.setClearColor("#e5e5e5");

//Scalable window resizing
window.addEventListener( 'resize', function()
{
  var width = window.innerWidth *0.79;
  var height = window.innerHeight * 0.95;
  renderer.setSize( width, height );
  camera.aspect = width/height;
  camera.updateProjectionMatrix( );
});

//OrbitControls
var orbit = new THREE.OrbitControls( camera, renderer.domElement );
orbit.update();
orbit.addEventListener('change', animate);

//TransformControls
var transform = new THREE.TransformControls(camera, renderer.domElement);
//transform.addEventListener('change', animate); //Crashes the scene for some reason still wip

transform.addEventListener('dragging-changed', function(event){
  orbit.enabled = ! event.value;
});

//Grid Helper creator
var size = 10;
var divisions = 10;
var gridHelper = new THREE.GridHelper( size, divisions );
scene.add( gridHelper )

//Generates the shape rendered, and gives it a mesh
var cube = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({map: THREE.ImageUtils.loadTexture('textures/airplane.png')})
);

cube.material.side = THREE.DoubleSide;
scene.add(cube);

//Attaches transform controls to the rendererd shape, adds control handles to the scene, and sets the control mode to rotation
transform.attach(cube);
scene.add(transform);
transform.setMode("rotate");

//Pulls the camera back from the rendered shape so the shape is in view
camera.position.z = 3;

//Ambient light generator
var ambientLight = new THREE.AmbientLight( 0xFFFFFF, 5.0 );

//Function animate which calls the renderer to render the scene
var animate = function ( ) {
requestAnimationFrame( animate );

renderer.render( scene, camera );
};

animate();
