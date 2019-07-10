var Clouds = function(){

	this.mesh = new THREE.Group();
	this.mesh.name = "clouds"

	//var cloudMat = new THREE.MeshPhongMaterial({
	var cloudMat = new THREE.MeshLambertMaterial({
	        color: 0xffffff,
	        opacity: 0.7
	});

	Cloud1 = function(){
		this.mesh = new THREE.Group();

		var oneGeom = new THREE.DodecahedronGeometry( 30 );
		this.round1 = new THREE.Mesh(oneGeom, cloudMat);
		//this.round1.position.x += 20
		// this.round1.castShadow = true;
		this.mesh.add(this.round1);

		var twoGeom = new THREE.IcosahedronGeometry( 20 );
		this.round2 = new THREE.Mesh(twoGeom, cloudMat);
		this.round2.position.x += 25;
		// this.round2.castShadow = true;
		this.mesh.add(this.round2);

		// floating 方法？
	}

	Cloud2 = function(){
		this.mesh = new THREE.Group();

		var oneGeom = new THREE.DodecahedronGeometry( 40 );
		this.round1 = new THREE.Mesh(oneGeom, cloudMat);
		//this.round1.position.x += 20
		// this.round1.castShadow = true;
		this.mesh.add(this.round1);

		var twoGeom = new THREE.IcosahedronGeometry( 20 );
		this.round2 = new THREE.Mesh(twoGeom, cloudMat);
		this.round2.position.x += 32;
		// this.round2.castShadow = true;
		this.mesh.add(this.round2);

		var threeGeom = new THREE.IcosahedronGeometry( 20 );
		this.round3 = new THREE.Mesh(threeGeom, cloudMat);
		this.round3.position.x -= 36;
		// this.round3.castShadow = true;
		this.mesh.add(this.round3);

		// floating 方法？
	}

	this.pclouds = new Array();
	var scale_base = 0.4;
	var cloudsInfo = [
		[0, [200, 310, 0], [scale_base, scale_base, scale_base], 0],
		[1, [-200, 210, 100], [scale_base, scale_base, scale_base], 0],
		[1, [100, 350, 700], [scale_base + 0.2, scale_base + 0.2, scale_base + 0.2], 0],
		[0, [50, 110, 300], [scale_base, scale_base, scale_base], 0],
		[1, [600, 310, -400], [scale_base + 0.4, scale_base + 0.4, scale_base + 0.4], 0],
		[0, [800, 310, 0], [scale_base, scale_base, scale_base], 0],
		[0, [-500, 210, 0], [scale_base + 0.1, scale_base + 0.1, scale_base + 0.1], 0],
	];

	var cloudsProducer = [Cloud1, Cloud2];

	for (var i = 0; i < cloudsInfo.length; i++) {
		this.pclouds[i] = new cloudsProducer[cloudsInfo[i][0]]();
		this.pclouds[i].mesh.position.x = cloudsInfo[i][1][0];
    	this.pclouds[i].mesh.position.y = cloudsInfo[i][1][1];
    	this.pclouds[i].mesh.position.z = cloudsInfo[i][1][2];
    	this.pclouds[i].mesh.scale.set(cloudsInfo[i][2][0], cloudsInfo[i][2][1], cloudsInfo[i][2][2]);
    	this.pclouds[i].mesh.rotation.y = cloudsInfo[i][3];
		this.mesh.add(this.pclouds[i].mesh);
	}

} 