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

	// Trees
	Tree1 = function(){
	  this.mesh = new THREE.Group();

	  // Parameters
	  this.objLength = 6;
	  this.objWidth =  24;
	  this.objHeight = 6;

	  // trunk
	  var trunkGeom = new THREE.CubeGeometry( 6, 24, 6, 1 );
	  trunkGeom.vertices[0].x -= 1.5;
	  trunkGeom.vertices[0].z -= 1.5;
	  trunkGeom.vertices[1].x -= 1.5;
	  trunkGeom.vertices[1].z += 1.5;
	  trunkGeom.vertices[4].x += 1.5;
	  trunkGeom.vertices[4].z -= 1.5;
	  trunkGeom.vertices[5].x += 1.5;
	  trunkGeom.vertices[5].z += 1.5;

	  this.trunk = new THREE.Mesh(trunkGeom, trunkMat);
	  this.trunk.castShadow = true;
	  this.mesh.add(this.trunk);

	  // leaves
	  var leafGeom = new THREE.IcosahedronGeometry(15, 0); // new THREE.SphereGeometry( 15, 6, 6 );
	  this.leaf = new THREE.Mesh(leafGeom, leafMat);
	  this.leaf.position.y = 20;
	  this.leaf.castShadow = true;
	  this.mesh.add(this.leaf);

	  this.AABB = null;

	}

	Tree2 = function(){
	  this.mesh = new THREE.Group();

	  // Parameters
	  this.objLength = 6;
	  this.objWidth =  30;
	  this.objHeight = 6;

	  // trunk
	  var trunkGeom = new THREE.CubeGeometry( 6, 30, 6, 1 );
	  trunkGeom.vertices[0].x -= 1.5;
	  trunkGeom.vertices[0].z -= 1.5;
	  trunkGeom.vertices[1].x -= 1.5;
	  trunkGeom.vertices[1].z += 1.5;
	  trunkGeom.vertices[4].x += 1.5;
	  trunkGeom.vertices[4].z -= 1.5;
	  trunkGeom.vertices[5].x += 1.5;
	  trunkGeom.vertices[5].z += 1.5;

	  this.trunk = new THREE.Mesh(trunkGeom, trunkMat);
	  this.trunk.castShadow = true;
	  this.mesh.add(this.trunk);

	  // leaves
	  var leafGeom = new THREE.IcosahedronGeometry(15, 1); // new THREE.SphereGeometry( 15, 6, 6 );
	  this.leaf = new THREE.Mesh(leafGeom, leafMat);
	  this.leaf.position.y = 25;
	  this.leaf.castShadow = true;
	  this.mesh.add(this.leaf);
	}

	Tree3 = function(){
	  this.mesh = new THREE.Group();
	  this.trunk = new THREE.Group();
	  this.mesh.add(this.trunk);
	  
	  // Parameters
	  this.objLength = 6;
	  this.objWidth  = 40;
	  this.objHeight = 6;

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

	  this.AABB = null;
	}

	Tree4 = function(){
	  this.mesh = new THREE.Group();
	  this.trunk = new THREE.Group();
	  this.mesh.add(this.trunk);
	  
	  // Parameters
	  this.objLength = 6;
	  this.objWidth =  30;
	  this.objHeight = 6;

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

	  this.AABB = null;
	}

	Tree5 = function(){
	  this.mesh = new THREE.Group();
	  // trunk

	  // Parameters
	  this.objLength = 10;
	  this.objWidth =  40;
	  this.objHeight = 10;

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

	  this.AABB = null;
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
        [0, [200, 103, 125], [scale_base, scale_base, scale_base],  -Math.PI/5],
        [0, [205, 103, 30],  [scale_base, scale_base, scale_base],  -Math.PI/5],
        [0, [205, 103, 130], [scale_base, scale_base, scale_base],  -Math.PI/5],
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
    	this.mesh.add(this.trees[i].mesh);
    }
}