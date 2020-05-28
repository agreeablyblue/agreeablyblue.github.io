//Scene every object is placed into
var scene = new THREE.Scene( );

//Camera which defines how the object is viewed
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 10000 );

//Establishes the renderer defined by three js, sets the width to 80% of the screen, and the height to 95% of the screen. It also changes the background color of the renderer window to light grey
var container = document.getElementById( 'canvas' );
document.body.appendChild( container );

renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight);
container.appendChild( renderer.domElement );

renderer.setClearColor("#efefef");

//Scalable window resizing
window.addEventListener( 'resize', function()
{
  var width = window.innerWidth;
  var height = window.innerHeight;
  renderer.setSize( width, height );
  camera.aspect = width/height;
  camera.updateProjectionMatrix( );
});

//OrbitControls
/*
var orbit = new THREE.OrbitControls( camera, renderer.domElement );
orbit.update();
orbit.addEventListener('change', animate);
*/

//TransformControls
var transform = new THREE.TransformControls(camera, renderer.domElement);
//transform.addEventListener('change', animate); //Crashes the scene for some reason still wip

transform.addEventListener('dragging-changed', function(event){
  orbit.enabled = ! event.value;
});

//Mesh to hold the rendered airplane
var mesh = null;

//MTLLoader
var mtlLoader = new THREE.MTLLoader();
mtlLoader.setPath( "threejs_example_project/assets/" );
mtlLoader.load( 'privateJet.mtl', function( materials ) {

  materials.preload();

  //OBJ Loader
  var objLoader = new THREE.OBJLoader();
  objLoader.setMaterials( materials );
  objLoader.setPath( "threejs_example_project/assets/" );
  objLoader.load( 'privateJet.obj', function ( object ) {

    mesh = object;
    mesh.position.y = -30;
    scene.add( mesh );

    //Attaches transform controls to the rendererd shape, adds control handles to the scene, and sets the control mode to rotation
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
scene.add( gridHelper );


//Focuses the camera on the rendered object
camera.position.y = 450;
camera.rotation.order = "YXZ";
camera.lookAt(0,0,0);
camera.rotation.y = 1.5698;

//Ambient light generator
var pointLight = new THREE.PointLight(0xFFFFFF, 20, 1000);
pointLight.position.set(0, 500, 0);
scene.add(pointLight);

var defaultRotation = new THREE.Quaternion();
//Function animate which calls the renderer to render the scene
var animate = function ( ) {

requestAnimationFrame( animate );

//Goes to 180 currently because angleTo is measure the distance from the starting point to the current point
//The furthest point away from the starting point technically is 180 degrees away so it causes issues
//Got to fix this in the next update

var angleOfY = defaultRotation.angleTo(mesh.quaternion);
var y = THREE.Math.radToDeg(angleOfY).toFixed(2);

document.getElementById("yAngle").innerHTML = "Y-Axis Rotation: " + y + "°";

renderer.render( scene, camera );
};

animate();
