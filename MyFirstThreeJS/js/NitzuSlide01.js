var scene = new THREE.Scene();
			var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

			var renderer = new THREE.WebGLRenderer();
			renderer.setSize( window.innerWidth, window.innerHeight );
			document.body.appendChild( renderer.domElement );

			//Create a closed bent a sine-like wave
			var spline = new THREE.SplineCurve3( [
				new THREE.Vector3( -10, 0, 10 ),
				new THREE.Vector3( -5, 5, 5 ),
				new THREE.Vector3( 0, 0, 0 ),
				new THREE.Vector3( 5, -5, 5 ),
				new THREE.Vector3( 10, 0, 10 )
			] );

			var splineGeometry = new THREE.Geometry();
			
			splineGeometry.vertices = spline.getPoints( 50 );

			var splineMaterial = new THREE.LineBasicMaterial( { color : 0xff0000 } );

			//Create the final Object3d to add to the scene
			var splineObject = new THREE.Line( splineGeometry, splineMaterial );

			var extrudeSettings = {
					steps			: 100,
					bevelEnabled	: false,
					extrudePath		: spline
				};

			var pts = [], count = 6;

				for ( var i = 0; i < count; i ++ ) {

					var l = 1;

					var a = 2 * i / count * Math.PI;

					pts.push( new THREE.Vector2 ( Math.cos( a ) * l, Math.sin( a ) * l ) );

				}

			var shape = new THREE.Shape( pts );

			var geometry = new THREE.ExtrudeGeometry( shape, extrudeSettings );

			var material = new THREE.MeshBasicMaterial( { color: 0x00ffff, wireframe: true } );

			var mesh = new THREE.Mesh( geometry, material );

			scene.add( mesh );


			scene.add( splineObject );

			var cubeGeometry = new THREE.BoxGeometry( 1, 1, 1 );
			var cubeMaterial = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );

			var cube = new THREE.Mesh( cubeGeometry, cubeMaterial );
			scene.add( cube );

			camera.position.z = 25;

			var render = function () {
				requestAnimationFrame( render );

				// Try Animate cube Along Spline
				var time = Date.now();
				var sineTime = Math.sin(time * 0.0003) * 0.5 + 0.5;

				var pos = spline.getPointAt( sineTime );
				
				cube.position.copy( pos );
				//pos.multiplyScalar( scale );
				cube.lookAt(THREE.Vector3.prototype.addVectors(pos, spline.getTangent( sineTime )));

				renderer.render(scene, camera);
			};

			render();