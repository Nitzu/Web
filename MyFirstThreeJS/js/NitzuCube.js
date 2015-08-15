
if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

var container, stats;

var camera, scene, renderer;

var uniforms1, uniforms2;

var clock = new THREE.Clock();

init();
animate();

function init() {

    container = document.getElementById( 'container' );

    camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 3000 );
    camera.position.z = 4;

    scene = new THREE.Scene();

    var geometry = new THREE.BoxGeometry( 1, 1, 1 );

    uniforms1 = {
        time: { type: "f", value: 1.0 },
        resolution: { type: "v2", value: new THREE.Vector2() }
    };

    var params = [
         ['fragment_shader4', uniforms1 ]
    ];

    var material = new THREE.ShaderMaterial( {

        uniforms: params[ 0 ][ 1 ],
        vertexShader: document.getElementById( 'vertexShader' ).textContent,
        fragmentShader: document.getElementById( params[ 0 ][ 0 ] ).textContent

        } );

    var mesh = new THREE.Mesh( geometry, material );
    
    mesh.position.x = 0 ;
    mesh.position.y = 0 ;
    scene.add( mesh );

    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio( window.devicePixelRatio );
    container.appendChild( renderer.domElement );

    }



function animate() {

    requestAnimationFrame( animate );

    render();

    
}

function render() {

    var delta = clock.getDelta();

    uniforms1.time.value += delta * 5;

    var object = scene.children[ 0 ];

    object.rotation.y += delta * 0.2 ; 
    object.rotation.x += delta * 0.2 ; 

    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

    renderer.render( scene, camera );

}
