/*
Variable Key:
s = scene being rendered
c = camera viewing the scene
containerA = div contained defined in index.html which the rendered scene is appended to
sphere = rendered sphere
gridPointHelper = grid lines added to the scene

*/

var s = new THREE.Scene();
var c = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 10000 );

var containerA = document.getElementById('containerA');
document.body.appendChild(containerA);

r = new THREE.WebGLRenderer();
r.setSize(window.innerWidth, window.innerHeight);
containerA.appendChild(r.domElement);

r.setClearColor("#efefef");

var render = function( )
{
  r.render ( s, c );
};

window.addEventListener('resize', function() {
  var width = window.innerWidth ;
  var height = window.innerHeight;
  r.setSize(width, height);
  c.aspect = width / height;
  c.updateProjectionMatrix();
});

//Transform Controls
var pointTransform = new THREE.TransformControls(camera, renderer.domElement);
pointTransform.setRotationSnap(THREE.Math.degToRad(0.25));
pointTransform.axis = 'Y';
pointTransform.showX = false;
pointTransform.showZ = false;


var geometry = new THREE.SphereGeometry( 5, 32, 32 );
var material = new THREE.MeshBasicMaterial( { color: 0xFF0000, wireframe: false } );
var sphere = new THREE.Mesh( geometry, material );
s.add( sphere );



sphere.position.y = 0;
sphere.position.z = -195;
sphere.position.x = 13;

c.rotation.order = "YXZ";
c.position.x = 0;
c.position.y = 550;
c.lookAt(0,0,0);


var size = 650;
var divisions = 25;
var gridPointHelper = new THREE.GridHelper(size, divisions);
s.add(gridPointHelper);

pointTransform.attach( gridPointHelper );
s.add( pointTransform );
pointTransform.setMode("rotate");

var GameLoop = function ( )
{
  requestAnimationFrame( GameLoop );

  render( );

};

GameLoop( );
