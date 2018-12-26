var Decoration = function() {
	var whiteMat = new THREE.MeshPhongMaterial({
	    //color: 0xa49789, 
	    color: 0xffffff,
	    shading:THREE.FlatShading,
	  });
	Cloud = function(){
		this.mesh = new THREE.Object3D();
		this.mesh.name = "cloud";
		var geom = new THREE.CubeGeometry(20,20,20);
		var nBlocs = 3+Math.floor(Math.random()*3);
		for (var i=0; i<nBlocs; i++ ){
			var m = new THREE.Mesh(geom.clone(), whiteMat);
			m.position.x = i*15;
			m.position.y = Math.random()*10;
			m.position.z = Math.random()*10;
			m.rotation.z = Math.random()*Math.PI*2;
			m.rotation.y = Math.random()*Math.PI*2;
			var s = .1 + Math.random()*.9;
			m.scale.set(s,s,s);
			m.castShadow = true;
			m.receiveShadow = true;
			this.mesh.add(m);
		}
	}

	Wall = function(){
	  	this.mesh = new THREE.Group();
		this.brick = new THREE.Group();
		this.mesh.add(this.brick);
		var centralGeom = new THREE.CubeGeometry(10,6,4,1)
		this.center = new THREE.Mesh(centralGeom, brownMat);
		this.center.castShadow = true;
		this.brick.add(this.center);
		var sideGeom = new THREE.CubeGeometry(4,10,5,1);
		this.sideL = new THREE.Mesh(sideGeom, brownMat);
		this.sideL.position.x = -7;
		this.sideL.position.y =  2;
		this.brick.add(this.sideL)
		this.sideR = this.sideL.clone();
		this.sideR.position.x = 7;
		this.brick.add(this.sideR)
		var VfenceGeom = new THREE.CubeGeometry(10,0.5,0.5,1);
		this.vfence = new THREE.Mesh(VfenceGeom, darkMat);
		this.vfence.position.y = 5;
		this.brick.add(this.vfence)
		var HfenceGeom = new THREE.CubeGeometry(0.5,4,0.5,1);
		this.hfences = new Array();
		var fenceNum = 5;
		var fencePos = [-10.0/3, -5.0/3, 0, 5.0/3, 10.0/3];
		for (var i = 0; i < fenceNum; i++) {
		  this.hfences[i] = new THREE.Mesh(HfenceGeom, darkMat);
		  this.hfences[i].position.x = fencePos[i];
		  this.hfences[i].position.y = 5;
		  this.brick.add(this.hfences[i]);
		}
	}

}

