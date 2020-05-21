//Scene every object is placed into
var scene = new THREE.Scene( );

//Camera which defines how the object is viewed
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 10000 );

//Establishes the renderer defined by three js, sets the width to 80% of the screen, and the height to 95% of the screen. It also changes the background color of the renderer window to light grey
var renderer = new THREE.WebGLRenderer( );
renderer.setSize( window.innerWidth * 0.79 , window.innerHeight * 0.95 );
document.body.appendChild( renderer.domElement );
renderer.setClearColor("#efefef");

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

//Mtl loader testing
var mesh = null;

var mtlLoader = new THREE.MTLLoader();
mtlLoader.setPath( "threejs_example_project/assets/" );
mtlLoader.load( 'privateJet.mtl', function( materials ) {

  materials.preload();

  var objLoader = new THREE.OBJLoader();
  objLoader.setMaterials( materials );
  objLoader.setPath( "threejs_example_project/assets/" );
  objLoader.load( 'privateJet.obj', function ( object ) {

    mesh = object;
    mesh.position.y = -30;
    scene.add( mesh );
    transform.attach(mesh);
    scene.add(transform);
    transform.setMode("rotate");
  } );

} );

//Skybox
var materialArray = [];
var tex_ft = new THREE.TextureLoader().load('threejs_example_project/assets/skybox/clouds1_front.png');
var tex_bk = new THREE.TextureLoader().load('threejs_example_project/assets/skybox/clouds1_back.png');
var tex_up = new THREE.TextureLoader().load('threejs_example_project/assets/skybox/clouds1_up.png');
var tex_dn = new THREE.TextureLoader().load('threejs_example_project/assets/skybox/clouds1_down.png');
var tex_rt = new THREE.TextureLoader().load('threejs_example_project/assets/skybox/clouds1_right.png');
var tex_lf = new THREE.TextureLoader().load('threejs_example_project/assets/skybox/clouds1_left.png');



materialArray.push(new THREE.MeshBasicMaterial({map: tex_ft}));
materialArray.push(new THREE.MeshBasicMaterial({map: tex_bk}));
materialArray.push(new THREE.MeshBasicMaterial({map: tex_up}));
materialArray.push(new THREE.MeshBasicMaterial({map: tex_dn}));
materialArray.push(new THREE.MeshBasicMaterial({map: tex_rt}));
materialArray.push(new THREE.MeshBasicMaterial({map: tex_lf}));

for (var i = 0; i<6; i++)
  materialArray[i].side = THREE.BackSide;


var skyboxGeo = new THREE.BoxGeometry(10000,10000,10000);
var skybox = new THREE.Mesh(skyboxGeo, materialArray);
scene.add(skybox);

//Grid Helper creator
var size = 850;
var divisions = 100;
var gridHelper = new THREE.GridHelper( size, divisions );
scene.add( gridHelper )

/*
//Generates the shape rendered, and gives it a mesh
var cube = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({map: THREE.ImageUtils.loadTexture('textures/airplane.png')})
);
*/
/*
cube.material.side = THREE.DoubleSide;
scene.add(cube);
*/

//Attaches transform controls to the rendererd shape, adds control handles to the scene, and sets the control mode to rotation


//Pulls the camera back from the rendered shape so the shape is in view
camera.position.z = 350;


//Ambient light generator
var ambientLight = new THREE.AmbientLight( 0xFFFFFF, 5.0 );

//Function animate which calls the renderer to render the scene
var animate = function ( ) {
requestAnimationFrame( animate );

renderer.render( scene, camera );
};

animate();
