var Forest = function(){
	this.mesh = new THREE.Group();
	this.mesh.name = "forest"

	var leafMat = new THREE.MeshPhongMaterial({
	        //color: 0xa49789, 
	        color: 0x228b2e,
	        shininess:0,
	        shading:THREE.FlatShading,
	    });

	var trunkMat = new THREE.MeshPhongMaterial({
	        //color: 0xa49789, 
	        color: 0x8b4500,
	        shininess:0,
	        shading:THREE.FlatShading,
	});

	var defaultFalling = 3;

	// Trees
	Tree1 = function(){
	  this.mesh = new THREE.Group();

	  // Parameters
	  this.objLength = 3;
	  this.objWidth =  24;
	  this.objHeight = 3;

	  // trunk
	  var trunkGeom = new THREE.CubeGeometry( 5, 24, 5, 1 );
	  trunkGeom.vertices[4].x += 1.0;
	  trunkGeom.vertices[4].z += 1.0;
	  trunkGeom.vertices[5].x += 1.0;
	  trunkGeom.vertices[5].z -= 1.0;
	  trunkGeom.vertices[0].x -= 1.0;
	  trunkGeom.vertices[0].z -= 1.0;
	  trunkGeom.vertices[1].x -= 1.0;
	  trunkGeom.vertices[1].z += 1.0;

	  this.trunk = new THREE.Mesh(trunkGeom, trunkMat);
	  this.trunk.castShadow = true;
	  this.mesh.add(this.trunk);

	  // leaves
	  var leafGeom = new THREE.IcosahedronGeometry(15, 0); // new THREE.SphereGeometry( 15, 6, 6 );
	  this.leaf = new THREE.Mesh(leafGeom, leafMat);
	  this.leaf.position.y = 20;
	  this.leaf.castShadow = true;
	  this.mesh.add(this.leaf);



	  Tree1.prototype.fall = function(){
	  	var foliageGeom = new THREE.DodecahedronGeometry(1.2, 0);
	  	var tempLeaf = new THREE.Mesh(foliageGeom, leafMat);
	  	tempLeaf.position.y = this.leaf.position.y;
	  	tempLeaf.position.x = this.leaf.position.x + 20 * (Math.random() - 0.5);// * this.mesh.scale.x;
	  	tempLeaf.position.z = this.leaf.position.z + 20 * (Math.random() - 0.5);// * this.mesh.scale.z;
	  	// x and z need randomly allocate
	  	this.mesh.add(tempLeaf);
	  	var fallingTime = defaultFalling + (Math.random()-0.5) * 2;
	  	var rootheight = this.trunk.position.y - this.objWidth; // * this.mesh.scale.y;
	  	// console.log("Debugging below");
	  	// console.log("Leaf position: ", this.leaf.position.y);
	  	// console.log("Trunk origin height: ", this.objWidth);
	  	// console.log("Trunk current height: ", this.objWidth * this.mesh.scale.y);
	  	TweenMax.to(tempLeaf.position, fallingTime, {y: rootheight, ease:Power1.easeInOut, onComplete:function(){tempLeaf.visible = false;}})
	  }
	}

	Tree2 = function(){
	  this.mesh = new THREE.Group();

	  // Parameters
	  this.objLength = 3;
	  this.objWidth =  30;
	  this.objHeight = 3;

	  // trunk
	  var trunkGeom = new THREE.CubeGeometry( 6, 30, 6, 1 );
	  trunkGeom.vertices[4].x += 1.5;
	  trunkGeom.vertices[4].z += 1.5;
	  trunkGeom.vertices[5].x += 1.5;
	  trunkGeom.vertices[5].z -= 1.5;
	  trunkGeom.vertices[0].x -= 1.5;
	  trunkGeom.vertices[0].z -= 1.5;
	  trunkGeom.vertices[1].x -= 1.5;
	  trunkGeom.vertices[1].z += 1.5;

	  this.trunk = new THREE.Mesh(trunkGeom, trunkMat);
	  this.trunk.castShadow = true;
	  this.mesh.add(this.trunk);

	  // leaves
	  var leafGeom = new THREE.IcosahedronGeometry(15, 1); // new THREE.SphereGeometry( 15, 6, 6 );
	  this.leaf = new THREE.Mesh(leafGeom, leafMat);
	  this.leaf.position.y = 25;
	  this.leaf.castShadow = true;
	  this.mesh.add(this.leaf);

	  Tree2.prototype.fall = function(){
	  	var foliageGeom = new THREE.DodecahedronGeometry(1.2, 0);
	  	var tempLeaf = new THREE.Mesh(foliageGeom, leafMat);
	  	tempLeaf.position.y = this.leaf.position.y;
	  	tempLeaf.position.x = this.leaf.position.x + 20 * (Math.random() - 0.5); // * this.mesh.scale.x;
	  	tempLeaf.position.z = this.leaf.position.z + 20 * (Math.random() - 0.5); // * this.mesh.scale.z;
	  	// x and z need randomly allocate
	  	this.mesh.add(tempLeaf);
	  	var fallingTime = defaultFalling + (Math.random()-0.5) * 2;
	  	var rootheight = this.trunk.position.y - this.objWidth; // * this.mesh.scale.y;
	  	// console.log("Debugging below");
	  	// console.log("Leaf position: ", this.leaf.position.y);
	  	// console.log("Trunk origin height: ", this.objWidth);
	  	// console.log("Trunk current height: ", this.objWidth * this.mesh.scale.y);
	  	TweenMax.to(tempLeaf.position, fallingTime, {y: rootheight, ease:Power1.easeInOut, onComplete:function(){tempLeaf.visible = false;}})
	  }
	}

	Tree3 = function(){
	  this.mesh = new THREE.Group();
	  this.trunk = new THREE.Group();
	  this.mesh.add(this.trunk);
	  
	  // Parameters
	  this.objLength = 3;
	  this.objWidth  = 40;
	  this.objHeight = 3;

	  // trunk
	  var trunk1Geom = new THREE.CylinderGeometry( 1.5, 3, 40, 6 );
	  this.trunk1 = new THREE.Mesh(trunk1Geom, trunkMat);
	  this.trunk1.castShadow = true;
	  this.trunk.add(this.trunk1);

	  var trunk2Geom = new THREE.CubeGeometry( 3, 16, 3, 1 );
	  trunk2Geom.vertices[0].x -= .5;
	  trunk2Geom.vertices[0].z -= .5;
	  trunk2Geom.vertices[1].x -= .5;
	  trunk2Geom.vertices[1].z += .5;
	  trunk2Geom.vertices[4].x += .5;
	  trunk2Geom.vertices[4].z -= .5;
	  trunk2Geom.vertices[5].x += .5;
	  trunk2Geom.vertices[5].z += .5;

	  this.trunk2 = new THREE.Mesh(trunk2Geom, trunkMat);
	  this.trunk2.rotation.z = Math.PI/3;
	  this.trunk2.position.x -= 8;
	  this.trunk2.position.y += 8;
	  this.trunk2.castShadow = true;
	  this.trunk.add(this.trunk2);

	  var trunk3Geom = new THREE.CubeGeometry( 3, 12, 2, 1 );
	  trunk3Geom.vertices[0].x -= .5;
	  trunk3Geom.vertices[0].z -= .5;
	  trunk3Geom.vertices[1].x -= .5;
	  trunk3Geom.vertices[1].z += .5;
	  trunk3Geom.vertices[4].x += .5;
	  trunk3Geom.vertices[4].z -= .5;
	  trunk3Geom.vertices[5].x += .5;
	  trunk3Geom.vertices[5].z += .5;

	  this.trunk3 = new THREE.Mesh(trunk3Geom, trunkMat);
	  this.trunk3.rotation.z = -Math.PI/3;
	  this.trunk3.position.x += 6;
	  this.trunk3.position.y += 12;
	  this.trunk3.castShadow = true;
	  this.trunk.add(this.trunk3);

	  // Leafs
	  var leaf1Geom = new THREE.IcosahedronGeometry(12, 0); // new THREE.SphereGeometry( 15, 6, 6 );
	  this.leaf1 = new THREE.Mesh(leaf1Geom, leafMat);
	  this.leaf1.rotation.z = Math.PI/2;
	  this.leaf1.castShadow = true;
	  this.leaf1.position.y += 24;
	  this.trunk1.add(this.leaf1);

	  var leaf2Geom = new THREE.IcosahedronGeometry(6, 0); // new THREE.SphereGeometry( 15, 6, 6 );
	  this.leaf2 = new THREE.Mesh(leaf2Geom, leafMat);
	  this.leaf2.rotation.z = Math.PI/2;
	  this.leaf2.castShadow = true;
	  this.leaf2.position.y += 6;
	  this.trunk2.add(this.leaf2);

	  var leaf3Geom = new THREE.IcosahedronGeometry(6, 0); // new THREE.SphereGeometry( 15, 6, 6 );
	  this.leaf3 = new THREE.Mesh(leaf3Geom, leafMat);
	  this.leaf3.rotation.z = Math.PI/2;
	  this.leaf3.castShadow = true;
	  this.leaf3.position.y += 8;
	  this.trunk3.add(this.leaf3);

	  Tree3.prototype.fall = function(){
	  	var foliageGeom = new THREE.DodecahedronGeometry(1.2, 0);
	  	var tempLeaf = new THREE.Mesh(foliageGeom, leafMat);

	  	var choice = Math.random();
	  	if(choice > 2.0/3){
	  		tempLeaf.position.y = this.leaf1.position.y;
	  		tempLeaf.position.x = this.leaf1.position.x + 12 * (Math.random() - 0.5); // * this.mesh.scale.x;
	  		tempLeaf.position.z = this.leaf1.position.z + 12 * (Math.random() - 0.5); // * this.mesh.scale.z;
	  	}else if(choice > 1.0/3){
	  		tempLeaf.position.y = this.leaf2.position.y;
	  		tempLeaf.position.x = this.leaf2.position.x + 6 * (Math.random() - 0.5); // * this.mesh.scale.x;
	  		tempLeaf.position.z = this.leaf2.position.z + 6 * (Math.random() - 0.5); // * this.mesh.scale.z;
	  	}else{
	  		tempLeaf.position.y = this.leaf3.position.y;
	  		tempLeaf.position.x = this.leaf3.position.x + 6 * (Math.random() - 0.5); // * this.mesh.scale.x;
	  		tempLeaf.position.z = this.leaf3.position.z + 6 * (Math.random() - 0.5); // * this.mesh.scale.z;
	  	}
	  	// x and z need randomly allocate
	  	this.mesh.add(tempLeaf);
	  	var fallingTime = defaultFalling + (Math.random()-0.5) * 2;
	  	var rootheight = this.trunk1.position.y - this.objWidth; // * this.mesh.scale.y;
	  	// console.log("Debugging below");
	  	// console.log("Leaf position: ", this.leaf.position.y);
	  	// console.log("Trunk origin height: ", this.objWidth);
	  	// console.log("Trunk current height: ", this.objWidth * this.mesh.scale.y);
	  	TweenMax.to(tempLeaf.position, fallingTime, {y: rootheight, ease:Power1.easeInOut, onComplete:function(){tempLeaf.visible = false;}})
	  }
	}

	Tree4 = function(){
	  this.mesh = new THREE.Group();
	  this.trunk = new THREE.Group();
	  this.mesh.add(this.trunk);
	  
	  // Parameters
	  this.objLength = 3;
	  this.objWidth =  30;
	  this.objHeight = 3;

	  // trunk
	  var trunk1Geom = new THREE.CylinderGeometry( 1.5, 3, 30, 6 );
	  this.trunk1 = new THREE.Mesh(trunk1Geom, trunkMat);
	  this.trunk1.castShadow = true;
	  this.trunk.add(this.trunk1);

	  var trunk2Geom = new THREE.CubeGeometry( 3, 16, 3, 1 );
	  trunk2Geom.vertices[0].x -= .5;
	  trunk2Geom.vertices[0].z -= .5;
	  trunk2Geom.vertices[1].x -= .5;
	  trunk2Geom.vertices[1].z += .5;
	  trunk2Geom.vertices[4].x += .5;
	  trunk2Geom.vertices[4].z -= .5;
	  trunk2Geom.vertices[5].x += .5;
	  trunk2Geom.vertices[5].z += .5;

	  this.trunk2 = new THREE.Mesh(trunk2Geom, trunkMat);
	  this.trunk2.rotation.z = Math.PI/6;
	  this.trunk2.position.x -= 4;
	  this.trunk2.position.y += 14;
	  this.trunk2.castShadow = true;
	  this.trunk.add(this.trunk2);

	  var trunk3Geom = new THREE.CubeGeometry( 3, 12, 2, 1 );
	  trunk3Geom.vertices[0].x -= .5;
	  trunk3Geom.vertices[0].z -= .5;
	  trunk3Geom.vertices[1].x -= .5;
	  trunk3Geom.vertices[1].z += .5;
	  trunk3Geom.vertices[4].x += .5;
	  trunk3Geom.vertices[4].z -= .5;
	  trunk3Geom.vertices[5].x += .5;
	  trunk3Geom.vertices[5].z += .5;

	  this.trunk3 = new THREE.Mesh(trunk3Geom, trunkMat);
	  this.trunk3.rotation.z = -Math.PI/4;
	  this.trunk3.position.x += 4;
	  this.trunk3.position.y += 16;
	  this.trunk3.castShadow = true;
	  this.trunk.add(this.trunk3);

	  // Leafs
	  // var leaf1Geom = new THREE.IcosahedronGeometry(12, 0); // new THREE.SphereGeometry( 15, 6, 6 );
	  // this.leaf1 = new THREE.Mesh(leaf1Geom, greenMat);
	  // this.leaf1.rotation.z = Math.PI/2;
	  // this.leaf1.castShadow = true;
	  // this.leaf1.position.y += 24;
	  // this.trunk1.add(this.leaf1);

	  var leaf2Geom = new THREE.IcosahedronGeometry(12, 0); // new THREE.SphereGeometry( 15, 6, 6 );
	  this.leaf2 = new THREE.Mesh(leaf2Geom, leafMat);
	  this.leaf2.rotation.z = Math.PI/2;
	  this.leaf2.castShadow = true;
	  this.leaf2.position.y += 10;
	  this.trunk2.add(this.leaf2);

	  var leaf3Geom = new THREE.IcosahedronGeometry(10, 0); // new THREE.SphereGeometry( 15, 6, 6 );
	  this.leaf3 = new THREE.Mesh(leaf3Geom, leafMat);
	  this.leaf3.rotation.z = Math.PI/2;
	  this.leaf3.castShadow = true;
	  this.leaf3.position.y += 8;
	  this.trunk3.add(this.leaf3);

	  Tree4.prototype.fall = function(){
	  	var foliageGeom = new THREE.DodecahedronGeometry(1.2, 0);
	  	var tempLeaf = new THREE.Mesh(foliageGeom, leafMat);

	  	var choice = Math.random();
	  	if(choice > 1.0/2){
	  		tempLeaf.position.y = this.leaf2.position.y;
	  		tempLeaf.position.x = this.leaf2.position.x + 12 * (Math.random() - 0.5); // * this.mesh.scale.x;
	  		tempLeaf.position.z = this.leaf2.position.z + 12 * (Math.random() - 0.5); // * this.mesh.scale.z;
	  	}else{
	  		tempLeaf.position.y = this.leaf3.position.y;
	  		tempLeaf.position.x = this.leaf3.position.x + 10 * (Math.random() - 0.5); // * this.mesh.scale.x;
	  		tempLeaf.position.z = this.leaf3.position.z + 10 * (Math.random() - 0.5); // * this.mesh.scale.z;
	  	}
	  	// x and z need randomly allocate
	  	this.mesh.add(tempLeaf);
	  	var fallingTime = defaultFalling + (Math.random()-0.5) * 2;
	  	var rootheight = this.trunk1.position.y - this.objWidth; // * this.mesh.scale.y;
	  	// console.log("Debugging below");
	  	// console.log("Leaf position: ", this.leaf.position.y);
	  	// console.log("Trunk origin height: ", this.objWidth);
	  	// console.log("Trunk current height: ", this.objWidth * this.mesh.scale.y);
	  	TweenMax.to(tempLeaf.position, fallingTime, {y: rootheight, ease:Power1.easeInOut, onComplete:function(){tempLeaf.visible = false;}})
	  }
	}

	Tree5 = function(){
	  this.mesh = new THREE.Group();
	  // trunk

	  // Parameters
	  this.objLength = 8;
	  this.objWidth =  40;
	  this.objHeight = 8;

	  var trunkGeom = new THREE.CylinderGeometry( 3, 5, 40, 8 );
	  this.trunk = new THREE.Mesh(trunkGeom, trunkMat);
	  this.trunk.castShadow = true;
	  this.mesh.add(this.trunk);

	  // leaf
	  var leaf1Geom = new THREE.CylinderGeometry( 0, 18, 20, 8 );
	  this.leaf1 = new THREE.Mesh(leaf1Geom, leafMat);
	  this.leaf1.castShadow = true;
	  this.leaf1.position.y = 10;
	  this.mesh.add(this.leaf1);

	  var leaf2Geom = new THREE.CylinderGeometry( 0, 16, 20, 8 );
	  this.leaf2 = new THREE.Mesh(leaf2Geom, leafMat);
	  this.leaf2.castShadow = true;
	  this.leaf2.position.y = 20;
	  this.mesh.add(this.leaf2);

	  var leaf3Geom = new THREE.CylinderGeometry( 0, 14, 20, 6 );
	  this.leaf3 = new THREE.Mesh(leaf3Geom, leafMat);
	  this.leaf3.castShadow = true;
	  this.leaf3.position.y = 30;
	  this.mesh.add(this.leaf3);

	  Tree5.prototype.fall = function(){
	  	var foliageGeom = new THREE.DodecahedronGeometry(1.2, 0);
	  	var tempLeaf = new THREE.Mesh(foliageGeom, leafMat);
	  	tempLeaf.position.y = this.leaf1.position.y;
	  	tempLeaf.position.x = this.leaf1.position.x + 20 * (Math.random() - 0.5); // * this.mesh.scale.x;
	  	tempLeaf.position.z = this.leaf1.position.z + 20 * (Math.random() - 0.5); // * this.mesh.scale.z;
	  	// x and z need randomly allocate
	  	this.mesh.add(tempLeaf);
	  	var fallingTime = defaultFalling + (Math.random()-0.5) * 2;
	  	var rootheight = this.trunk.position.y - this.objWidth; // * this.mesh.scale.y;
	  	// console.log("Debugging below");
	  	// console.log("Leaf position: ", this.leaf.position.y);
	  	// console.log("Trunk origin height: ", this.objWidth);
	  	// console.log("Trunk current height: ", this.objWidth * this.mesh.scale.y);
	  	TweenMax.to(tempLeaf.position, fallingTime, {y: rootheight, ease:Power1.easeInOut, onComplete:function(){tempLeaf.visible = false;}})
	  }

	}

	this.trees = new Array();
	var scale_base = 0.3;
	var treesInfo = [
		[0, [200, 103,   0], [scale_base, scale_base, scale_base],  Math.PI/4],
        [1, [210, 103,  10], [scale_base, scale_base, scale_base],  Math.PI/3],
        [2, [220, 103, -10], [scale_base, scale_base, scale_base], -Math.PI/6],
        [3, [230, 103,   0], [scale_base, scale_base, scale_base], -Math.PI/4],
        [4, [225, 103,  15], [scale_base, scale_base, scale_base],  0],
        [1, [120, 103, 100], [scale_base, scale_base, scale_base],  0],
        [1, [245, 103, 100], [scale_base, scale_base, scale_base],  0],
        [0, [120, 103, 160], [scale_base, scale_base, scale_base],  0],
        [2, [125, 103, 165], [scale_base, scale_base, scale_base],  Math.PI/2],
        [0, [120, 103, 170], [scale_base, scale_base, scale_base],  0],
        [1, [100, 103, 150], [scale_base, scale_base, scale_base],  0],
        [2, [109, 103, 155], [scale_base, scale_base, scale_base],  Math.PI/3],
        [0, [100, 103, 160], [scale_base, scale_base, scale_base],  0],
        [3, [109, 103, 145], [scale_base, scale_base, scale_base],  -Math.PI/5],
        [0, [200, 103, 120], [scale_base, scale_base, scale_base],  -Math.PI/5],
        [0, [205, 103, 30],  [scale_base, scale_base, scale_base],  -Math.PI/5],
        [0, [130, 102, 160],  [scale_base, scale_base, scale_base],  -Math.PI/5],
        // slaughter begin
        [0, [128.372556912627,102,174.17121397712748], [0.3150715825392991,0.2943707844501916,0.30870718086686666], Math.PI*0.9811299121390337],
		//[0, [137.1404289981405,102,166.51174923675146], [0.27999268534696964,0.2893175789117478,0.2943738226591875], Math.PI*0.6284444897796502],
		[2, [150.54091753439107,102,166.7294606362185], [0.2811553919910569,0.2751245970642985,0.2837321680579694], Math.PI*0.21359775811894377],
		[3, [158.34528307752768,102,160.22372138206586], [0.30824343809655896,0.3144306004850239,0.2950451235246791], Math.PI*0.2975578105065416],
		[3, [158.15834540408667,102,173.70269125158546], [0.27986073476524814,0.29889193288268723,0.2887638393981142], Math.PI*0.28079228378513443],
		[3, [158.22474438472625,102,188.48475574101084], [0.30340210787620825,0.3214025804383226,0.2896417152475036], Math.PI*0.22978848499399052],
		[0, [171.97410986604393,102,160.17376903849814], [0.3228807494155965,0.30748369202114767,0.297686404405278], Math.PI*0.8171869766311929],
		[2, [172.32398536505377,102,187.9070686058612], [0.3165138659539844,0.2860692069112786,0.29717761337353676], Math.PI*0.23456629889529568],
		[4, [178.99790378251535,102,180.65022672845112], [0.32495667997495625,0.28247378095580955,0.3238771417916531], Math.PI*0.5474074158856941],
		[0, [192.65676681774394,102,188.124330763918], [0.29313888508865094,0.3004883167544827,0.3153828910330272], Math.PI*0.1937922212610259],
		//
		[1, [65.74494430588499,102,173.72810100326996], [0.2864325648616575,0.27835718705249984,0.27650532270297934], Math.PI*0.377713436772422],
		[4, [65.87665536188119,102,186.22099446149196], [0.30695210981834564,0.312356861395277,0.27637024766245466], Math.PI*0.03299073509037653],
		[4, [71.67647623939527,102,179.7257404088242], [0.3041927976309029,0.2769821419495355,0.28156955808800493], Math.PI*0.9338372982538715],
		[1, [78.44423346126761,102,155.82908287928348], [0.3175273268979002,0.2878582933380826,0.3145146960718892], Math.PI*0.1092214238921404],
		[3, [78.41344280107148,102,173.72280779310756], [0.29306364246608935,0.3150220820700803,0.29169972135054084], Math.PI*0.37001149250395093],
		[4, [77.94721582079836,102,197.99132787110767], [0.3005546075522111,0.29085331091540123,0.284876746451166], Math.PI*0.8927922164870937],
		[3, [84.47226856236465,102,149.899292787042], [0.2893546707623,0.2870342023886162,0.3032844648639711], Math.PI*0.41220159220955],
		[2, [84.44691504909126,102,162.43651907400653], [0.30953677274337876,0.3178302808741131,0.284217062559943], Math.PI*0.9916978058016696],
		[0, [90.20475995935864,102,156.3653155751343], [0.29330620697265647,0.32332140662115133,0.3200843362105294], Math.PI*0.45715182860787584],
		[0, [90.21710734694562,102,185.92913232682548], [0.309366571212871,0.3037367907801736,0.32029597517378605], Math.PI*0.20385102554087187],
		[2, [95.68084386856185,102,174.36162556883315], [0.28297992288618024,0.2984045867467262,0.277694934503779], Math.PI*0.8128881900860245],
		[1, [96.3031392208866,102,198.06475698723634], [0.2966224942284223,0.3103644610275593,0.2873696548255039], Math.PI*0.8615188233825606],
		//
		[2, [0.4284570007943015,102,148.14814888917775], [0.27822296583240996,0.2906763155151251,0.2963532450085742], Math.PI*0.7031228690296443],
		[4, [-0.07818666941817731,102,159.77035614556823], [0.31063267992025584,0.2937545087503369,0.29279640130694695], Math.PI*0.0794394973391237],
		[1, [5.8333868897733145,102,130.36174629262513], [0.27732691281442373,0.2934091455585982,0.3116633507300355], Math.PI*0.9437960854903499],
		[4, [5.88147869695169,102,142.49370114683867], [0.32120003838407374,0.28035313836223075,0.30490670079539983], Math.PI*0.08483745411352672],
		[4, [6.033451266557582,102,153.5231301467463], [0.3215352117180733,0.3207167585675466,0.27619741915596857], Math.PI*0.44110836444370094],
		[3, [12.153288988923121,102,136.163625243638], [0.29418322772045424,0.2889638431341749,0.288022956876516], Math.PI*0.006879807692654505],
		[0, [17.636883494096132,102,130.49807013013495], [0.3036729793168093,0.2994116525149013,0.30418716536676904], Math.PI*0.36708065816302404],
		[3, [18.263598356312173,102,141.59310515325873], [0.291180820134628,0.28550867550450415,0.28811754131383627], Math.PI*0.0792744543207391],
		[1, [24.448119296608574,102,147.70991985409256], [0.301126631137434,0.3030988911660439,0.2927855647088066], Math.PI*0.14295003109895044],
		[0, [30.166143733793632,102,130.2998759413006], [0.28997124007367847,0.29830199071891944,0.30730176197093584], Math.PI*0.7145501932271874],
		[4, [29.651265927257864,102,165.62660575101847], [0.313215704065242,0.28672324249276615,0.3049256185296416], Math.PI*0.8577559516850815],
		[4, [35.898801582982976,102,136.4976874656542], [0.30230336763375437,0.28248654983694343,0.30691024785451204], Math.PI*0.587709429403821],
		[0, [35.61317706522829,102,147.5253348749941], [0.31120966207436535,0.2821485023459615,0.31002504844605], Math.PI*0.7073737966463062],
		[1, [36.00253999560409,102,172.28135955148284], [0.3164401138749175,0.29363525869000173,0.2968865930006206], Math.PI*0.7042614730605424],
		[3, [41.567930502812615,102,130.1771559373386], [0.31563887954389286,0.2805009315727345,0.27770096398477523], Math.PI*0.025451270373720192],
		[3, [42.40751628535375,102,142.06307180029748], [0.3201507064408163,0.31707543509059527,0.2998049330608267], Math.PI*0.665507260425229],
		[4, [47.69815513982031,102,123.54755072832971], [0.2884035260041977,0.3184855069973137,0.28292637732340037], Math.PI*0.21753636709655977],
		[4, [48.49925394108242,102,136.04256056635396], [0.28502080706743027,0.27554484655853284,0.31050160046480796], Math.PI*0.6856525906115901],
		[0, [47.69181971913713,102,148.3577920671878], [0.3108505114210608,0.3069413708100187,0.3057571712551855], Math.PI*0.09950303020373408],
		[4, [47.62433436755265,102,159.61510818248533], [0.27791980203415334,0.3099135527965821,0.286664113976519], Math.PI*0.7065928025921792],
		[0, [59.71892878983055,102,159.624464986211], [0.2775495755449553,0.3205874145650283,0.2907006714699912], Math.PI*0.18062858286302907],
		[1, [59.502411776412096,102,171.70934733103394], [0.282312980032335,0.2918923510868684,0.28526378603954217], Math.PI*0.6434262068918678],
		//
		[4, [59.881759536155414,102,120.27019060194819], [0.28209415618016787,0.2761008020965427,0.28147797381957806], Math.PI*0.10434797396792928],
		[2, [81.48819764734264,102,126.73674276704226], [0.2916379939394925,0.29589360377352375,0.2997754516270314], Math.PI*0.3331491310188135],
		[0, [80.56307585738477,102,140.59223558901903], [0.319887519239877,0.32468644159666715,0.3248294129200581], Math.PI*0.07925316910795566],
		[3, [88.1292185952226,102,119.63760630357726], [0.27526799696271076,0.2843732287583676,0.3118550863999591], Math.PI*0.5471237843912513],
		[3, [94.84366220298966,102,127.01788293524488], [0.2988899158287065,0.2871205217446764,0.32310902814979464], Math.PI*0.12942323180182258],
		[0, [94.73291080506638,102,140.61043784994908], [0.30184196390864654,0.2930085294315936,0.2887816545360461], Math.PI*0.8763770612872414],
		[1, [109.32472015987587,102,120.14995995345127], [0.3197628659233796,0.28575431489680597,0.3115578011585467], Math.PI*0.9816741042942965],
		[3, [109.07315081548688,102,140.5773565123468], [0.3197221073230999,0.2839281824580439,0.29102740501344193], Math.PI*0.19643340072244242],
		
		[0, [125, 102, 150],  [scale_base, scale_base, scale_base],  -Math.PI/5],
		[4, [125, 102, 140],  [scale_base, scale_base, scale_base],  -Math.PI/5],

		[0, [152, 102, 140],  [scale_base, scale_base, scale_base],  -Math.PI/5],
		[1, [134, 102, 135],  [scale_base, scale_base, scale_base],  -Math.PI/5],
		[2, [144, 102, 120],  [scale_base, scale_base, scale_base],  -Math.PI/5],
		[3, [140, 102, 133],  [scale_base, scale_base, scale_base],  -Math.PI/5],

		//
		[3, [125.4234734156848,102,31.720032713422246], [0.31244326956153246,0.275537193497165,0.3226133770812745], Math.PI*0.4956292427990152],
		[3, [125.26648007776413,102,46.165810850288615], [0.3003846102859983,0.3211703003345165,0.2924317353544789], Math.PI*0.7953266792266241],
		[1, [124.9697951405333,102,60.246505894901745], [0.30485148989456873,0.27997202408164074,0.29845770375552644], Math.PI*0.9431315522349729],
		[0, [125.11618982221583,102,88.08282770810892], [0.3163871029196451,0.3048259088593551,0.30213345144375847], Math.PI*0.7797094746476461],
		[0, [124.82593200023771,102,102.08595458756983], [0.28990492066458895,0.29516542994173206,0.2861818369739396], Math.PI*0.3675582064576498],
		[4, [124.70482784537394,102,130.48863468609662], [0.30053347910755185,0.28226620179618883,0.32197316861803227], Math.PI*0.21711933605276756],
		[3, [132.13821672470152,102,67.48446340027276], [0.2919243465129929,0.3158812811789073,0.2868630326643777], Math.PI*0.38773800669927627],
		[3, [131.5126244240095,102,81.37860606407025], [0.32358363882569363,0.3174798912154728,0.3221115227163273], Math.PI*0.7426059375881569],
		[0, [132.249664838909,102,94.83680327746902], [0.27884209384762715,0.30543703987005744,0.3223716729356354], Math.PI*0.556545213949597],
		[3, [132.1197166809531,102,109.12090416561914], [0.3041393915703105,0.31355225780466545,0.2783262431869894], Math.PI*0.9968395665312356],
		[1, [131.84204337752567,102,122.62474691610811], [0.30876213385307016,0.2774802548420894,0.2987282071867629], Math.PI*0.04522599956618667],
		[3, [139.01434374148843,102,31.624076157582834], [0.31096761282112223,0.28021598282079735,0.3214149543767127], Math.PI*0.14914255717124025],
		[4, [139.10591079661467,102,46.42594994690549], [0.29988367551372214,0.2979639022344525,0.27764837365238704], Math.PI*0.8156326066359803],
		[3, [139.08172222540293,102,59.635630555153014], [0.29817022278420985,0.3114092803188052,0.30791309373493436], Math.PI*0.06423877440827841],
		[4, [139.0150648926092,102,88.16641443351229], [0.29681530987097865,0.2756861072538663,0.29212695084946666], Math.PI*0.4529710696058371],
		[4, [138.7442281495935,102,115.60411146537109], [0.288779501255893,0.3170978398651137,0.3113844344929393], Math.PI*0.6046693978928805],
		[3, [146.45787457922467,102,80.84562363352615], [0.3137113583240235,0.324418927001401,0.29131864784012634], Math.PI*0.5191036909301748],
		[0, [153.30840228316802,102,60.445063009689456], [0.2885244042955959,0.3026790011488705,0.2777548706644749], Math.PI*0.6461561888382359],
		[3, [153.09546420348474,102,108.66828293485824], [0.31425000651931356,0.31210673031466885,0.2790451090559283], Math.PI*0.7124138054487961],
		[4, [152.56772528590773,102,129.80264555869616], [0.2786950131091405,0.29456320149445536,0.3197107558915784], Math.PI*0.22168928947272448],
		
		//
		[4, [165, 102, 140],  [scale_base, scale_base, scale_base],  -Math.PI/5],
		[4, [165.31566162179288,102,119.73278589444041], [0.3084222807217114,0.3149074870539438,0.2839701542463962], Math.PI*0.4016601908427353],
		[1, [171.0592028473249,102,138.36949729992804], [0.2766289285972138,0.2768427216574555,0.30041459787389396], Math.PI*0.395952259323337],
		[2, [176.69411234665807,102,132.41590973361258], [0.31230804968988124,0.3066691727462035,0.29357271524131373], Math.PI*0.12500950999514682],
		[1, [182.73161383833562,102,137.66687440276803], [0.31936963096064486,0.31346843610678954,0.29746274640537396], Math.PI*0.203519096671962],
		[0, [188.81903620879436,102,120.39283371673287], [0.30280018820975696,0.3131148545965609,0.29498519852703753], Math.PI*0.5381400637367035],
		[4, [189.21716556496204,102,132.4507044765519], [0.30535216884741295,0.30276040907879403,0.31456593088270157], Math.PI*0.9443311329322954],

		[4, [230, 102, 120],  [scale_base, scale_base, scale_base],  -Math.PI/5],
		[4, [240, 102, 0],  [scale_base, scale_base, scale_base],  -Math.PI/5],

		[4, [190.24453390365008,102,63.37934373656162], [0.3096485682368768,0.2880980669295413,0.30629742483589883], Math.PI*0.9415400807501773],
		[4, [189.6061154491522,102,75.31159259123436], [0.28207320329374747,0.3122022586045108,0.30060619905939495], Math.PI*0.2780184403568231],
		[0, [189.9160319430538,102,98.93185805148892], [0.2875426119948141,0.27981180556257895,0.31939868910613356], Math.PI*0.7278435955271612],
		[0, [190.39259632034563,102,111.4918372454117], [0.3241140316773167,0.29473654098100843,0.3056476290468091], Math.PI*0.5829855103270876],
		[2, [196.35201323622513,102,33.00626278523272], [0.3016519819861171,0.30568024736110094,0.3240838709146894], Math.PI*0.006370314849827308],
		[2, [195.66283388584552,102,45.21395469735596], [0.3034374695203782,0.29675801366170435,0.2860073877307872], Math.PI*0.5042364035530744],
		[2, [195.9269079149904,102,56.61748289539919], [0.31353854098245704,0.29744042897667894,0.275778764540907], Math.PI*0.5594263842446934],
		[3, [195.55371590696956,102,69.1680458228172], [0.3196890102968993,0.32444453637554677,0.32425994727633056], Math.PI*0.029008922231146483],
		[4, [201.8381984210115,102,26.92476807098567], [0.29894411719193,0.29407285905312314,0.30165804414030617], Math.PI*0.5113530815123009],
		[0, [201.82114384718378,102,62.633906126501195], [0.30994179975117075,0.28519487158198653,0.30630377641571344], Math.PI*0.09328748234089412],
		[2, [201.63827741578248,102,75.38202147779953], [0.3110634835217317,0.32463191655601875,0.3134147600524607], Math.PI*0.14370685087859048],
		[1, [208.49868943258494,102,20.638137631868283], [0.3153467054778698,0.2919478479482228,0.31586165429073043], Math.PI*0.720472432415574],
		[2, [208.07549164460596,102,32.538246061578164], [0.27776953814106853,0.32375948796069254,0.3246712932889072], Math.PI*0.13352264266643443],
		[4, [207.52103631843372,102,44.51021143778444], [0.28071362475092354,0.2772935987680338,0.3210517371962281], Math.PI*0.833373667314136],
		[3, [208.31667749092966,102,57.02420314641871], [0.2897233423538077,0.30685485278179,0.2863350326379523], Math.PI*0.9412260708213585],
		[4, [208.43511368994837,102,68.59514629161215], [0.31034782125178384,0.312957385937247,0.31901686453348066], Math.PI*0.6069021013705853],
		[1, [207.71492330089026,102,81.29467392354113], [0.2802182510780045,0.2777757298367826,0.31147192410769564], Math.PI*0.1383745040573845],
		[2, [208.35831836616762,102,93.18101314578799], [0.310353921317369,0.29576190598283825,0.30122155705481773], Math.PI*0.9622941435128853],
		[4, [208.04137788627412,102,105.08850879835477], [0.28108451865998063,0.30442314417040256,0.3116138772641585], Math.PI*0.19698271977886106],
		[0, [213.58503554089106,102,14.596241063575322], [0.30778351747654636,0.2818086417171667,0.3132737773062542], Math.PI*0.6375335209117842],
		[2, [214.08381862293015,102,51.14774484679603], [0.27779797800736367,0.3008663043794444,0.2943218477474625], Math.PI*0.901648009785601],
		[3, [214.47724902237815,102,75.49415012779852], [0.28048615836693463,0.28415864757498716,0.30275153852125863], Math.PI*0.9742146746362851],
		[2, [220.4186523074424,102,21.441734623947685], [0.2807028965090323,0.3186643194537999,0.2905450487338912], Math.PI*0.3232393001769467],
		[3, [219.8727753237431,102,69.48587985758726], [0.27702693135378387,0.3014866031656509,0.30116151527903834], Math.PI*0.7716461435167153],
		[1, [219.65676278812478,102,93.36945771136065], [0.31009899564489324,0.3124830980876242,0.30713747162384847], Math.PI*0.5330972738182808],
		[4, [226.09595835091477,102,15.343400428374212], [0.28677415720490257,0.30426504812100674,0.2788953777389002], Math.PI*0.3573397056360156],
		[4, [226.12459946813388,102,27.185615420183993], [0.31400393629776735,0.32161335689688725,0.3022098052244853], Math.PI*0.3068469864855655],
		[0, [226.35993902971256,102,51.15862172620471], [0.3220009492306859,0.30946862418088555,0.3219705952146379], Math.PI*0.11864345812575572],
		[4, [225.77652408752326,102,63.1900587053011], [0.31946216698158625,0.32324000866184893,0.3238550831649743], Math.PI*0.45114705728915194],
		[4, [225.9096387394008,102,74.67547000593434], [0.2831568626946388,0.27850326477919063,0.32443760242203773], Math.PI*0.38381710682610415],
		[3, [226.30634118407104,102,99.49182759461753], [0.31187081465165434,0.2755014158128597,0.3144567934794878], Math.PI*0.9334549288193773],
		[3, [226.03983411703442,102,111.24310909576478], [0.29534947623223956,0.2935329270197701,0.3031840442858015], Math.PI*0.9486002034960922],

		[0, [245, 102, 15],  [scale_base, scale_base, scale_base],  -Math.PI/5],
		[1, [240, 102, 30],  [scale_base, scale_base, scale_base],  -Math.PI/5],
		[2, [235, 102, 33],  [scale_base, scale_base, scale_base],  -Math.PI/5],
		[3, [240, 102, 50],  [scale_base, scale_base, scale_base],  -Math.PI/5],
		[4, [244, 102, 60],  [scale_base, scale_base, scale_base],  -Math.PI/5],
		[1, [250, 102, 25],  [scale_base, scale_base, scale_base],  -Math.PI/5],
		[2, [250, 102, 15],  [scale_base, scale_base, scale_base],  -Math.PI/5],

		[0, [175, 102, 125],  [scale_base, scale_base, scale_base],  -Math.PI/5],
		[3, [178, 102, 120],  [scale_base, scale_base, scale_base],  -Math.PI/5],
		[1, [185, 102, 115],  [scale_base, scale_base, scale_base],  -Math.PI/5],
		[0, [175, 102, 100],  [scale_base, scale_base, scale_base],  -Math.PI/5],
		[3, [178, 102, 107],  [scale_base, scale_base, scale_base],  -Math.PI/5],
		[1, [185, 102, 98],  [scale_base, scale_base, scale_base],  -Math.PI/5],

		[4, [145, 102, 15],  [scale_base, scale_base, scale_base],  -Math.PI/5],
		[4, [145, 102, 35],  [scale_base, scale_base, scale_base],  -Math.PI/5],
		[2, [147, 102, 46],  [scale_base, scale_base, scale_base],  -Math.PI/5],
		[0, [151, 102, 54],  [scale_base, scale_base, scale_base],  -Math.PI/5],
		[2, [155, 102, 34],  [scale_base, scale_base, scale_base],  -Math.PI/5],
		[3, [154, 102, 44],  [scale_base, scale_base, scale_base],  -Math.PI/5],
		[3, [158, 102, 53],  [scale_base, scale_base, scale_base],  -Math.PI/5],
		[1, [165, 102, 37],  [scale_base, scale_base, scale_base],  -Math.PI/5],
		[0, [164, 102, 45],  [scale_base, scale_base, scale_base],  -Math.PI/5],
		[4, [166, 102, 57],  [scale_base, scale_base, scale_base],  -Math.PI/5],

		[0, [110, 102, 115],  [scale_base, scale_base, scale_base],  -Math.PI/3],
		[2, [100, 102, 112],  [scale_base, scale_base, scale_base],  -Math.PI/3],
		[3, [ 99, 100, 107],  [scale_base, scale_base, scale_base],  -Math.PI/3],
		[3, [112, 102, 85],  [scale_base, scale_base, scale_base],  -Math.PI/3],
		[0, [107, 102, 65],  [scale_base, scale_base, scale_base],  -Math.PI/3],
		[2, [111, 102, 55],  [scale_base, scale_base, scale_base],  -Math.PI/3],
		[1, [113, 102, 35],  [scale_base, scale_base, scale_base],  -Math.PI/3],
		[3, [110, 102, 15],  [scale_base, scale_base, scale_base],  -Math.PI/3],

		[4, [110, 102, -100],  [scale_base, scale_base, scale_base],  -Math.PI/3],
		//
		// [0, [109.36755129317758,102,-61.641894313033234], [0.28930026961335553,0.31075665711902234,0.29071208674066756], Math.PI*0.9991340375534148],
		// [0, [110.68001607604043,102,-43.692287557254566], [0.2756384095880376,0.2995692873217078,0.2834274368805691], Math.PI*0.0720722318078223],
		// [1, [110.20179888756249,102,-26.917504167331913], [0.3011078111447679,0.29703337257036916,0.3069562223103012], Math.PI*0.07216648532462633],
		// [1, [109.92502018568256,102,-12.624477572656716], [0.31520743332694806,0.2762141211248469,0.2966107230589753], Math.PI*0.6886758009096587],
		// [3, [119.1653335809237,102,-69.43919287554282], [0.3249963786713074,0.3108267980436221,0.3058615905414312], Math.PI*0.940033663015788],
		// [2, [117.87010226098673,102,-51.66582318394317], [0.28591044219258666,0.3129785645385495,0.2866896121468068], Math.PI*0.6457525483647645],
		// [4, [116.61558366041749,102,-35.88144366908201], [0.31301008352228,0.2775698621807658,0.30593933852386995], Math.PI*0.2631001334592312],
		// [4, [119.93982992557494,102,-3.841749815563385], [0.3099155296926702,0.30336128109577437,0.32314953547703307], Math.PI*0.5467232980429747],
		// [2, [125.09428871527093,102,-100.41934536579463], [0.27859258909944107,0.3107284093761006,0.3098133342719659], Math.PI*0.7948956968716379],
		// [3, [125.00737314786875,102,-75.9296270394341], [0.3060121606758803,0.30219566531568054,0.27507976164980974], Math.PI*0.8349168320054273],
		// [0, [127.06518047303715,102,-58.756856913421096], [0.2755691420202282,0.2804642410568298,0.2770344289967892], Math.PI*0.8857486972077011],
		// [0, [125.69066543670588,102,-43.04700098952067], [0.28404649745531546,0.2910529834296228,0.30847443994149665], Math.PI*0.5797743106060017],
		// [4, [127.28161851333537,102,-29.505973286035484], [0.28150543424220437,0.2862219908804228,0.2948590407663691], Math.PI*0.4248778126640853],
		// [3, [126.17390464116326,102,-12.948802724659014], [0.2838953389325602,0.32112321167381375,0.31470981260564157], Math.PI*0.6059760635844088],
		// [3, [135.79837450100987,102,-53.52869899819609], [0.29031384337690624,0.2771779096937672,0.3007084896989759], Math.PI*0.10578617749178287],
		// [1, [132.7746753437228,102,-34.70115309973192], [0.2833315052506356,0.31338979535208683,0.3131952977527989], Math.PI*0.2153543851016929],
		// [4, [133.75576566459543,102,-3.355040746732601], [0.27627167924631957,0.3036806655185704,0.3246301057877714], Math.PI*0.528353811557065],
		// [4, [142.8442616091624,102,-59.44293375039393], [0.2801585317245656,0.29112556109432225,0.3226041655131368], Math.PI*0.2651196500283246],
		// [4, [141.79793011769826,102,-43.67847942667026], [0.29203479353668127,0.28324788071286544,0.30269608035658113], Math.PI*0.3796622799165561],
		// [4, [143.3973503144738,102,-27.16072650671672], [0.30161438271178453,0.3078355257592637,0.28515459820503036], Math.PI*0.6656852882876871],
		// [1, [140.27736123500367,102,-11.328962880493485], [0.3224147595161232,0.2913393548590005,0.288882466170124], Math.PI*0.5166747973635615],
		// [4, [148.43294726433163,102,-92.6624060639717], [0.3199611814281672,0.301375114596688,0.2785425562090592], Math.PI*0.5090412443315713],
		// [2, [148.21784043598936,102,-74.2113034341572], [0.3101610922636191,0.30410216555577163,0.31681529044594176], Math.PI*0.8674504825758987],
		// [3, [150.4692477094093,102,-21.552704436044827], [0.27925153159063804,0.30582651547861905,0.3216272784015698], Math.PI*0.6036773506412864],
		// [0, [151.57552962518506,102,-4.157409488916055], [0.275276708398961,0.3033733433935958,0.31008738270691105], Math.PI*0.1931871431850124],
		// [2, [157.1376160623856,102,-85.40241390004296], [0.29497204273865035,0.3077869089718266,0.29188267474236185], Math.PI*0.919588569442218],
		// [4, [156.90336013314592,102,-67.35279553518087], [0.29611569618567274,0.3013104677525636,0.32254088792188795], Math.PI*0.17445678719777535],
		// [0, [159.50418752226813,102,-26.91340502548448], [0.2807130869251413,0.31147172043812765,0.28827665707304956], Math.PI*0.8064953676100683],
		// [0, [165.05235634940163,102,-74.16502367991663], [0.3054547632275114,0.3240194429762499,0.30232038624354124], Math.PI*0.790869404454938],
		// [1, [167.54253092312163,102,-59.98218729108941], [0.30675963783979154,0.28303153174232504,0.2986976346145379], Math.PI*0.03286119423981615],
		// [3, [167.00642136574461,102,-21.140858059740683], [0.3148860081982488,0.27834094681740673,0.3011338950605121], Math.PI*0.8430017124898679],
		//

		[4, [110, 125, 240],  [scale_base, scale_base, scale_base],  -Math.PI/3],
		[4, [116, 125, 236],  [scale_base, scale_base, scale_base],  -Math.PI/3],
		[4, [109, 125, 244],  [scale_base, scale_base, scale_base],  -Math.PI/3],
		[4, [ 90, 125, 248],  [scale_base, scale_base, scale_base],  -Math.PI/3],

		[4, [60, 125, 220],  [scale_base, scale_base, scale_base],  -Math.PI/3],
		[4, [35, 125, 204],  [scale_base, scale_base, scale_base],  -Math.PI/3],
		[4, [35, 125, 264],  [scale_base, scale_base, scale_base],  -Math.PI/3],

		[4, [80, 125, 240],  [scale_base, scale_base, scale_base],  -Math.PI/3],
		[4, [67, 125, 246],  [scale_base, scale_base, scale_base],  -Math.PI/3],
		[4, [87, 125, 255],  [scale_base, scale_base, scale_base],  -Math.PI/3],


		//
		// [3, [33.86205231354284,125,203.88903185115268], [0.3112033581829141,0.30519815609843876,0.308214408869652], Math.PI*0.2713649973204869],
		// [2, [35.23757369204081,125,201.65407029167315], [0.29695730908679596,0.3063516056906826,0.31274560274248175], Math.PI*0.6459985973432096],
		// [1, [36.2690331604568,125,217.47513254989912], [0.3169629063001434,0.3181496098111446,0.29058766780955364], Math.PI*0.8209652782128458],
		// [2, [41.88515581902469,125,222.479516962874], [0.28768790356809937,0.31067521635888157,0.3080707766551564], Math.PI*0.9886019055778618],
		// [1, [48.53533452895361,125,237.51128194516363], [0.28784950159330247,0.3083332286705399,0.30441165645518714], Math.PI*0.5854477282105193],
		// [0, [57.357261994718854,125,210.01966597959915], [0.3006860765670678,0.3073035925402569,0.30775454146542885], Math.PI*0.8737819010533899],
		// [0, [57.412390742612715,125,229.41957648402442], [0.3094696431873469,0.2804886500757413,0.3031301674284397], Math.PI*0.9133494335506492],
		// [0, [68.58378625918373,125,210.37052335508284], [0.298381400374333,0.295113804541506,0.32294690166759715], Math.PI*0.32245208179974905],
		// [0, [69.94624427666984,125,224.17906845999488], [0.3120303307881507,0.30132984056555323,0.275242585126763], Math.PI*0.47092553106561086],
		// [4, [90.4124489813336,125,230.56766202161404], [0.2758704858498081,0.2935129718667277,0.3109580852994389], Math.PI*0.11543671567275937],
		
		// [0, [35.416445416539716,125,220.49303437004724], [0.2967754652589651,0.30795480749507054,0.2846252281582331], Math.PI*0.7498527438034589],
		// [3, [36.27778078835008,125,231.46786508131868], [0.3145644124984368,0.30577416203356855,0.29830295299160264], Math.PI*0.17110802708580297],
		// [2, [42.17812099765439,125,236.98398423391652], [0.2819101473511479,0.3049402987307436,0.3041364557405795], Math.PI*0.6001927913357213],
		// [2, [46.14547620375577,125,220.70701887634863], [0.29118588035638515,0.30708750796405654,0.2939527862716745], Math.PI*0.6230288801303763],
		// [0, [46.75596459059362,125,231.28963457131323], [0.3070365397388552,0.2788173208680318,0.31834391967699294], Math.PI*0.6079533427855679],
		// [4, [53.85471863763254,125,225.9319067321441], [0.29095385259116646,0.2859077668252992,0.3080834705990536], Math.PI*0.11571611483522792],
		// [0, [52.68119027404327,125,237.4810975596876], [0.3068153835706278,0.2899765391203663,0.2907627244047361], Math.PI*0.022871468071686163],
		// [3, [60.194598231606385,125,219.10198859654653], [0.30536970581986506,0.3119229638653184,0.294805479214873], Math.PI*0.39287630040355426],
		// [2, [57.55883242356236,125,245.16612805638917], [0.2862197390157615,0.28661346949426847,0.3023638187956927], Math.PI*0.260284278209132],
		// [2, [63.93552847038352,125,225.817446725449], [0.3076085606127555,0.31050273000960443,0.2965986764133544], Math.PI*0.8645756392978202],
		// [4, [64.92950984009869,125,250.1044293761626], [0.31079933286707373,0.2950966866931661,0.3238567269404028], Math.PI*0.9789048786531713],
		// [3, [75.69737986831063,125,224.7744907874173], [0.3038573628184559,0.27933840515917097,0.30352046303502866], Math.PI*0.48194994082143006],
		// [3, [83.07409860879899,125,231.40240985406464], [0.3137886994165088,0.29355538928019315,0.28862355740072565], Math.PI*0.32496034580366806],
		// [1, [84.06678807853103,125,249.21493805350477], [0.2961114969637623,0.30696605303853686,0.32145422071056096], Math.PI*0.6158659192473167],
		// [4, [90.28015997403223,125,239.32388748687504], [0.31303062903731027,0.2766606730664861,0.2782161941941536], Math.PI*0.6284952126370709],
		// [1, [95.776950186283,125,231.54939271469027], [0.2867943010535227,0.30292219196904024,0.31835710180591814], Math.PI*0.027412973756004932],
		// [2, [101.96449554347994,125,249.63684530111692], [0.2756347998471354,0.3137533151740957,0.3241001426055291], Math.PI*0.7265679467941026],

		];

	var treeProducer = [Tree1, Tree2, Tree3, Tree4, Tree5];

	for (var i = treesInfo.length - 1; i >= 0; i--) {
    	this.trees[i] = new treeProducer[treesInfo[i][0]]();
    	this.trees[i].mesh.position.x = treesInfo[i][1][0];
    	this.trees[i].mesh.position.y = treesInfo[i][1][1];
    	this.trees[i].mesh.position.z = treesInfo[i][1][2];
    	this.trees[i].mesh.scale.set(treesInfo[i][2][0], treesInfo[i][2][1], treesInfo[i][2][2]);
    	this.trees[i].mesh.rotation.y = treesInfo[i][3];
    	this.trees[i].AABB = new myAABB(
    									calculateMyAABB(
    										[this.trees[i].mesh.rotation.x, this.trees[i].mesh.rotation.y, this.trees[i].mesh.rotation.z],
    										[this.trees[i].mesh.position.x, this.trees[i].mesh.position.y, this.trees[i].mesh.position.z],
    										this.trees[i].objLength * this.trees[i].mesh.scale.x,
    										this.trees[i].objWidth * this.trees[i].mesh.scale.y,
    										this.trees[i].objHeight * this.trees[i].mesh.scale.z
    									)
    								);
    	this.trees[i].AntiJitter = new myAnti_Jitter( 10 );
    	this.trees[i].AntiJitter.clear();
    	this.mesh.add(this.trees[i].mesh);
    }

    Forest.prototype.collideDetect = function()
    {
    	for (var i = 0; i < this.trees.length; i++) {
    		if(this.trees[i].AABB.iscollision){
    			if(this.trees[i].AntiJitter.count()){
    				console.log("Tree Number: ", i, " real oops");
    				this.trees[i].fall();
    				this.trees[i].AntiJitter.clear();
    				this.trees[i].AABB.collisionOver();
    			}
    		}
    	}
    }
}