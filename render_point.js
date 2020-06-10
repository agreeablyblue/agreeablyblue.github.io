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

var geometry = new THREE.SphereGeometry( 5, 32, 32 );
var material = new THREE.MeshBasicMaterial( { color: 0xFF0000, wireframe: false } );
var sphere = new THREE.Mesh( geometry, material );
s.add( sphere );

sphere.position.x = 0;
sphere.position.y = 0;
c.position.z = 350;

c.rotation.order = "YXZ";
c.lookAt(0,0,0);
var size = 850;
var divisions = 25;
var gridPointHelper = new THREE.GridHelper(size, divisions);
s.add(gridPointHelper);


var GameLoop = function ( )
{
  requestAnimationFrame( GameLoop );

  render( );

};

GameLoop( );
