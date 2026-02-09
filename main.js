
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

function main() {

	const canvas = document.querySelector( '#c' );
	const renderer = new THREE.WebGLRenderer( { antialias: true, canvas } );

	const fov = 75;
	const aspect = 2;
	const near = 0.1;
	const far = 100;
	const camera = new THREE.PerspectiveCamera( fov, aspect, near, far );
	camera.position.z = 25;

	const controls = new OrbitControls( camera, renderer.domElement );
	controls.enableDamping = true;

	const scene = new THREE.Scene();
	scene.background = new THREE.Color( 'black' );

	const objects = [];
	const spread = 15;

	function addObject( x, y, obj ) {

		obj.position.x = x * spread;
		obj.position.y = y * spread;

		scene.add( obj );
		objects.push( obj );

	}

	function createMaterial() {

		const material = new THREE.MeshPhongMaterial( {
			side: THREE.DoubleSide,
		} );

		const hue = Math.random();
		const saturation = 1;
		const luminance = .5;
		material.color.setHSL( hue, saturation, luminance );

		return material;

	}

	function addSolidGeometry( x, y, geometry ) {

		const mesh = new THREE.Mesh( geometry, createMaterial() );
		addObject( x, y, mesh );

	}

	{

		const radius = 7;
		const widthSegments = 12;
		const heightSegments = 8;
		addSolidGeometry( - 2, 2, new THREE.SphereGeometry( radius, widthSegments, heightSegments ) );

	}

	{

		const radiusTop = 4;
		const radiusBottom = 4;
		const height = 8;
		const radialSegments = 12;
		addSolidGeometry( - 1, 2, new THREE.CylinderGeometry( radiusTop, radiusBottom, height, radialSegments ) );

	}

	{

		const radius = 5;
		const tube = 2;
		const radialSegments = 8;
		const tubularSegments = 24;
		addSolidGeometry( 0, 2, new THREE.TorusGeometry( radius, tube, radialSegments, tubularSegments ) );

	}

	{

		const radius = 7;
		addSolidGeometry( 1, 2, new THREE.TetrahedronGeometry( radius ) );

	}

	{

		const color = 0xFFFFFF;
		const intensity = 3;
		const light = new THREE.DirectionalLight( color, intensity );
		light.position.set( - 1, 2, 4 );
		scene.add( light );
		const ambientLight = new THREE.AmbientLight( 0x404040, 2 );
		scene.add( ambientLight );

	}

	function render( time ) {

		time *= 0.001;

		const canvas = renderer.domElement;
		const width = canvas.clientWidth;
		const height = canvas.clientHeight;
		const needResize = canvas.width !== width || canvas.height !== height;
		if ( needResize ) {

			renderer.setSize( width, height, false );
			camera.aspect = width / height;
			camera.updateProjectionMatrix();

		}

		objects.forEach( ( obj, ndx ) => {

			const speed = .1 + ndx * .05;
			const rot = time * speed;
			obj.rotation.x = rot;
			obj.rotation.y = rot;

		} );

		controls.update();
		renderer.render( scene, camera );

		requestAnimationFrame( render );

	}

	requestAnimationFrame( render );

}

main();
