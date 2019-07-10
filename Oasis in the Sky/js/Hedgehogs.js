var Hedgehogs = function() {
	this.mesh = new THREE.Group();
	this.mesh.name = "hedgehogs";

	// Materials
	var blackMat = new THREE.MeshPhongMaterial({
	    color: 0x100707,
	    shading:THREE.FlatShading,
	  });

	var brownMat = new THREE.MeshPhongMaterial({
	    color: 0xb44b39,
	    shininess:0,
	    shading:THREE.FlatShading,
	  });

	var pinkMat = new THREE.MeshPhongMaterial({
	    color: 0xdc5f45,//0xb43b29,//0xff5b49,
	    shininess:0,
	    shading:THREE.FlatShading,
	  });

	var whiteMat = new THREE.MeshPhongMaterial({
	    //color: 0xa49789, 
	    color: 0xffffff,
	    shading:THREE.FlatShading,
	  });

	var lightBrownMat = new THREE.MeshPhongMaterial({
	    color: 0xe07a57,
	    shading:THREE.FlatShading,
	  });


	Hedgehog = function() {
	  	this.angle = 0;
	  	this.status="ready";
	  	this.mesh = new THREE.Group();
	  	var bodyGeom = new THREE.CubeGeometry(6,6,6,1);
	  	this.body = new THREE.Mesh(bodyGeom, blackMat);
	  	
	  	var headGeom = new THREE.CubeGeometry(5,5,7,1);
	  	this.head= new THREE.Mesh(headGeom, lightBrownMat);
	  	this.head.position.z = 6;
	  	this.head.position.y = -.5;
	  	
	  	var noseGeom = new THREE.CubeGeometry(1.5,1.5,1.5,1);
	  	this.nose = new THREE.Mesh(noseGeom, blackMat);
	  	this.nose.position.z = 4;
	  	this.nose.position.y = 2;
	  	
	  	var eyeGeom = new THREE.CubeGeometry(1,3,3);
	  	
	  	this.eyeL = new THREE.Mesh(eyeGeom, whiteMat);
	  	this.eyeL.position.x = 2.2;
	  	this.eyeL.position.z = -.5;
	  	this.eyeL.position.y = .8;
	  	this.eyeL.castShadow = true;
	  	this.head.add(this.eyeL);
	  	
	  	var irisGeom = new THREE.CubeGeometry(.5,1,1);
	  	
	  	this.iris = new THREE.Mesh(irisGeom, blackMat);
	  	this.iris.position.x = .5;
	  	this.iris.position.y = .8;
	  	this.iris.position.z = .8;
	  	this.eyeL.add(this.iris);
	  	
	  	this.eyeR = this.eyeL.clone();
	  	this.eyeR.children[0].position.x = -this.iris.position.x;
	  	this.eyeR.position.x = -this.eyeL.position.x;
	  	
	  	var spikeGeom = new THREE.CubeGeometry(.5,2,.5,1);
	  	spikeGeom.applyMatrix(new THREE.Matrix4().makeTranslation(0,1,0));
	  	
	  	for (var i=0; i<9; i++){ 
	  	  var row = (i%3);
	  	  var col = Math.floor(i/3);
	  	  var sb = new THREE.Mesh(spikeGeom, blackMat);
	  	  sb.rotation.x =-Math.PI/2 + (Math.PI/12*row) -.5 +  Math.random();
	  	  sb.position.z = -3;
	  	  sb.position.y = -2 + row*2;
	  	  sb.position.x = -2 + col*2; 
	  	  this.body.add(sb); 
	  	  var st = new THREE.Mesh(spikeGeom, blackMat);
	  	  st.position.y = 3;
	  	  st.position.x = -2 + row*2;
	  	  st.position.z = -2 + col*2;
	  	  st.rotation.z = Math.PI/6 - (Math.PI/6*row) -.5 +  Math.random();
	  	  this.body.add(st);
	  	  
	  	  var sr = new THREE.Mesh(spikeGeom, blackMat);
	  	  sr.position.x = 3;
	  	  sr.position.y = -2 + row*2;
	  	  sr.position.z = -2 + col*2;
	  	  sr.rotation.z = -Math.PI/2 + (Math.PI/12*row) -.5 +  Math.random();
	  	  this.body.add(sr);
	  	  
	  	  var sl = new THREE.Mesh(spikeGeom, blackMat);
	  	  sl.position.x = -3;
	  	  sl.position.y = -2 + row*2;
	  	  sl.position.z = -2 + col*2;
	  	  sl.rotation.z = Math.PI/2  - (Math.PI/12*row) -.5 +  Math.random();;
	  	  this.body.add(sl); 
	  	}
	
	  	this.head.add(this.eyeR);
	  	var earGeom = new THREE.CubeGeometry(2, 2, .5, 1);
	  	this.earL = new THREE.Mesh(earGeom, lightBrownMat);
	  	this.earL.position.x = 2.5;
	  	this.earL.position.z = -2.5;
	  	this.earL.position.y = 2.5;
	  	this.earL.rotation.z = -Math.PI/12;
	  	this.earL.castShadow = true;
	  	this.head.add(this.earL);
	  	
	  	this.earR = this.earL.clone();
	  	this.earR.position.x = -this.earL.position.x;
	  	this.earR.rotation.z = -this.earL.rotation.z;
	  	this.earR.castShadow = true;
	  	this.head.add(this.earR);
	  	
	  	var mouthGeom = new THREE.CubeGeometry( 1, 1,.5, 1);
	  	this.mouth = new THREE.Mesh(mouthGeom, blackMat);
	  	this.mouth.position.z = 3.5;
	  	this.mouth.position.y = -1.5;
	  	this.head.add(this.mouth);
	  	
	  	
	  	this.mesh.add(this.body);
	  	this.body.add(this.head);
	  	this.head.add(this.nose);
	
	  	this.mesh.traverse(function(object) {
	  	  if (object instanceof THREE.Mesh) {
	  	    object.castShadow = true;
	  	    object.receiveShadow = true;
	  	  }
	  	});
	}

	Hedgehog.prototype.nod = function(){
	  	var _this = this;
	  	var speed = .1 + Math.random()*.5;
	  	var angle = -Math.PI/4 + Math.random()*Math.PI/2;
	  	TweenMax.to(this.head.rotation, speed, {y:angle, onComplete:function(){
	  	  _this.nod();
	  	}});
	}

	Hedgehog.prototype.sleep = function(){
	  	var sp = 1;
	  	// Eyes
	  	TweenMax.to([this.eyeR.scale, this.eyeL.scale], sp/8, {y:0, ease:Power1.easeInOut, repeat:1});
	}

	this.hedgehogs = new Array();

	var scale_base = 0.15;
	var hedgehogsInfo = [
		[[160, 99.6,  80], [scale_base, scale_base, scale_base],  0],
	];

	for (var i = hedgehogsInfo.length - 1; i >= 0; i--) {
    	this.hedgehogs[i] = new Hedgehog();
    	this.hedgehogs[i].mesh.position.x = hedgehogsInfo[i][0][0];
    	this.hedgehogs[i].mesh.position.y = hedgehogsInfo[i][0][1];
    	this.hedgehogs[i].mesh.position.z = hedgehogsInfo[i][0][2];
    	this.hedgehogs[i].mesh.scale.set(hedgehogsInfo[i][1][0], hedgehogsInfo[i][1][1], hedgehogsInfo[i][1][2]);
    	this.hedgehogs[i].mesh.rotation.y = hedgehogsInfo[i][2];
    	this.mesh.add(this.hedgehogs[i].mesh);
    }

}