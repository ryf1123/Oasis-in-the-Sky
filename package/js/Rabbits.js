var Rabbits = function(){
	this.mesh = new THREE.Group();
	this.mesh.name = "rabbits"
	// Rabbit

	var delta = 0;

	var clock = new THREE.Clock();

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

	Rabbit = function() {
		this.status = "ready";

		this.lspeed = 2;
		this.rspeed = Math.PI/2;
		this.movingTime = 0;
		this.rotatingDegree = 0;

	  	this.runningCycle = 0;
	  	this.mesh = new THREE.Group();
	  	this.body = new THREE.Group();
	  	this.mesh.add(this.body);
	  
	  	var torsoGeom = new THREE.CubeGeometry(7, 7, 10, 1);
	  
	  	this.torso = new THREE.Mesh(torsoGeom, brownMat);
	  	this.torso.position.z = 0;
	  	this.torso.position.y = 7;
	  	this.torso.castShadow = true;
	  	this.body.add(this.torso);
	  	
	  	var pantsGeom = new THREE.CubeGeometry(9, 9, 5, 1);
	  	this.pants = new THREE.Mesh(pantsGeom, whiteMat);
	  	this.pants.position.z = -3;
	  	this.pants.position.y = 0;
	  	this.pants.castShadow = true;
	  	this.torso.add(this.pants);
	  	
	  	var tailGeom = new THREE.CubeGeometry(3, 3, 3, 1);
	  	tailGeom.applyMatrix(new THREE.Matrix4().makeTranslation(0,0,-2));
	  	this.tail = new THREE.Mesh(tailGeom, lightBrownMat);
	  	this.tail.position.z = -4;
	  	this.tail.position.y = 5;
	  	this.tail.castShadow = true;
	  	this.torso.add(this.tail);
	  	
	  	this.torso.rotation.x = -Math.PI/8;
	  	
	  	var headGeom = new THREE.CubeGeometry(10, 10, 13, 1);
	  	
	  	headGeom.applyMatrix(new THREE.Matrix4().makeTranslation(0,0,7.5));
	  	this.head = new THREE.Mesh(headGeom, brownMat);
	  	this.head.position.z = 2;
	  	this.head.position.y = 11;
	  	this.head.castShadow = true;
	  	this.body.add(this.head);
	  	
	  	var cheekGeom = new THREE.CubeGeometry(1, 4, 4, 1);
	  	this.cheekR = new THREE.Mesh(cheekGeom, pinkMat);
	  	this.cheekR.position.x = -5;
	  	this.cheekR.position.z = 7;
	  	this.cheekR.position.y = -2.5;
	  	this.cheekR.castShadow = true;
	  	this.head.add(this.cheekR);
	  	
	  	this.cheekL = this.cheekR.clone();
	  	this.cheekL.position.x = - this.cheekR.position.x;
	  	this.head.add(this.cheekL);
	  	
	  	
	  	var noseGeom = new THREE.CubeGeometry(6, 6, 3, 1);
	  	this.nose = new THREE.Mesh(noseGeom, lightBrownMat);
	  	this.nose.position.z = 13.5;
	  	this.nose.position.y = 2.6;
	  	this.nose.castShadow = true;
	  	this.head.add(this.nose);
	  	
	  	var mouthGeom = new THREE.CubeGeometry(4, 2, 4, 1);
	  	mouthGeom.applyMatrix(new THREE.Matrix4().makeTranslation(0,0,3));
	  	mouthGeom.applyMatrix(new THREE.Matrix4().makeRotationX(Math.PI/12));
	  	this.mouth = new THREE.Mesh(mouthGeom, brownMat);
	  	this.mouth.position.z = 8;
	  	this.mouth.position.y = -4;
	  	this.mouth.castShadow = true;
	  	this.head.add(this.mouth);
	  	
	  	
	  	var pawFGeom = new THREE.CubeGeometry(3,3,3, 1);
	  	this.pawFR = new THREE.Mesh(pawFGeom, lightBrownMat);
	  	this.pawFR.position.x = -2;
	  	this.pawFR.position.z = 6;
	  	this.pawFR.position.y = 1.5;
	  	this.pawFR.castShadow = true;
	  	this.body.add(this.pawFR);
	  	
	  	this.pawFL = this.pawFR.clone();
	  	this.pawFL.position.x = - this.pawFR.position.x;
	  	this.pawFL.castShadow = true;
	  	this.body.add(this.pawFL);
	  	
	  	var pawBGeom = new THREE.CubeGeometry(3,3,6, 1);
	  	this.pawBL = new THREE.Mesh(pawBGeom, lightBrownMat);
	  	this.pawBL.position.y = 1.5;
	  	this.pawBL.position.z = 0;
	  	this.pawBL.position.x = 5;
	  	this.pawBL.castShadow = true;
	  	this.body.add(this.pawBL);
	  	
	  	this.pawBR = this.pawBL.clone();
	  	this.pawBR.position.x = - this.pawBL.position.x;
	  	this.pawBR.castShadow = true;
	  	this.body.add(this.pawBR);
	  	
	  	var earGeom = new THREE.CubeGeometry(7, 18, 2, 1);
	  	earGeom.vertices[6].x+=2;
	  	earGeom.vertices[6].z+=.5;
	  	
	  	earGeom.vertices[7].x+=2;
	  	earGeom.vertices[7].z-=.5;
	  	
	  	earGeom.vertices[2].x-=2;
	  	earGeom.vertices[2].z-=.5;
	  	
	  	earGeom.vertices[3].x-=2;
	  	earGeom.vertices[3].z+=.5;
	  	earGeom.applyMatrix(new THREE.Matrix4().makeTranslation(0,9,0));
	  	
	  	this.earL = new THREE.Mesh(earGeom, brownMat);
	  	this.earL.position.x = 2;
	  	this.earL.position.z = 2.5;
	  	this.earL.position.y = 5;
	  	this.earL.rotation.z = -Math.PI/12;
	  	this.earL.castShadow = true;
	  	this.head.add(this.earL);
	  	
	  	this.earR = this.earL.clone();
	  	this.earR.position.x = -this.earL.position.x;
	  	this.earR.rotation.z = -this.earL.rotation.z;
	  	this.earR.castShadow = true;
	  	this.head.add(this.earR);
	  	
	  	var eyeGeom = new THREE.CubeGeometry(2,4,4);
	  	
	  	this.eyeL = new THREE.Mesh(eyeGeom, whiteMat);
	  	this.eyeL.position.x = 5;
	  	this.eyeL.position.z = 5.5;
	  	this.eyeL.position.y = 2.9;
	  	this.eyeL.castShadow = true;
	  	this.head.add(this.eyeL);
	  	
	  	var irisGeom = new THREE.CubeGeometry(.6,2,2);
	  	
	  	this.iris = new THREE.Mesh(irisGeom, blackMat);
	  	this.iris.position.x = 1.2;
	  	this.iris.position.y = 1;
	  	this.iris.position.z = 1;
	  	this.eyeL.add(this.iris);
	  	
	  	this.eyeR = this.eyeL.clone();
	  	this.eyeR.children[0].position.x = -this.iris.position.x;
	  	
	  	
	  	this.eyeR.position.x = -this.eyeL.position.x;
	  	this.head.add(this.eyeR);
		
	  	this.body.traverse(function(object) {
	  	  	if (object instanceof THREE.Mesh) {
	  	    	object.castShadow = true;
	  	    	object.receiveShadow = true;
	    	}
	  	});

	  	// Parameters
		this.objLength = 10;
		this.objWidth =  20;
		this.objHeight = 26;

		this.AABB = null;

	}

	Rabbit.prototype.nod = function(){
	  var _this = this;
	  var sp = .5 + Math.random();
	  
	  // HEAD
	  var tHeadRotY = -Math.PI/6 + Math.random()* Math.PI/3;
	  TweenMax.to(this.head.rotation, sp, {y:tHeadRotY, ease:Power4.easeInOut, onComplete:function(){_this.nod()}});
	  
	  // EARS
	  var tEarLRotX =  Math.PI/4 + Math.random()* Math.PI/6;
	  var tEarRRotX =  Math.PI/4 + Math.random()* Math.PI/6;
	  
	  TweenMax.to(this.earL.rotation, sp, {x:tEarLRotX, ease:Power4.easeInOut});
	  TweenMax.to(this.earR.rotation, sp, {x:tEarRRotX, ease:Power4.easeInOut});
	  
	  
	  // PAWS BACK LEFT
	  
	  var tPawBLRot = Math.random()*Math.PI/2;
	  var tPawBLY = -4 + Math.random()*8;
	  
	  TweenMax.to(this.pawBL.rotation, sp/2, {x:tPawBLRot, ease:Power1.easeInOut, yoyo:true, repeat:2});
	  TweenMax.to(this.pawBL.position, sp/2, {y:tPawBLY, ease:Power1.easeInOut, yoyo:true, repeat:2});
	  
	  
	  // PAWS BACK RIGHT
	  
	  var tPawBRRot = Math.random()*Math.PI/2;
	  var tPawBRY = -4 + Math.random()*8;
	  TweenMax.to(this.pawBR.rotation, sp/2, {x:tPawBRRot, ease:Power1.easeInOut, yoyo:true, repeat:2});
	  TweenMax.to(this.pawBR.position, sp/2, {y:tPawBRY, ease:Power1.easeInOut, yoyo:true, repeat:2});
	  
	  // PAWS FRONT LEFT
	  
	  var tPawFLRot = Math.random()*Math.PI/2;
	  var tPawFLY = -4 + Math.random()*8;
	  
	  TweenMax.to(this.pawFL.rotation, sp/2, {x:tPawFLRot, ease:Power1.easeInOut, yoyo:true, repeat:2});
	  
	  TweenMax.to(this.pawFL.position, sp/2, {y:tPawFLY, ease:Power1.easeInOut, yoyo:true, repeat:2});
	  
	  // PAWS FRONT RIGHT
	  
	  var tPawFRRot = Math.random()*Math.PI/2;
	  var tPawFRY = -4 + Math.random()*8;
	  
	  TweenMax.to(this.pawFR.rotation, sp/2, {x:tPawFRRot, ease:Power1.easeInOut, yoyo:true, repeat:2});
	  
	  TweenMax.to(this.pawFR.position, sp/2, {y:tPawFRY, ease:Power1.easeInOut, yoyo:true, repeat:2});
	  
	  // MOUTH
	  var tMouthRot = Math.random()*Math.PI/8;
	  TweenMax.to(this.mouth.rotation, sp, {x:tMouthRot, ease:Power1.easeInOut});
	  // IRIS
	  var tIrisY = -1 + Math.random()*2;
	  var tIrisZ = -1 + Math.random()*2;
	  var iris1 = this.iris;
	  var iris2 = this.eyeR.children[0];
	  TweenMax.to([iris1.position, iris2.position], sp, {y:tIrisY, z:tIrisZ, ease:Power1.easeInOut});
	  
	  //EYES
	  if (Math.random()>.2) TweenMax.to([this.eyeR.scale, this.eyeL.scale], sp/8, {y:0, ease:Power1.easeInOut, yoyo:true, repeat:1});

	}

	Rabbit.prototype.sleep = function(){
	  var sp = 1;
	  var _this = this;
	  // SleepMark
	  // no idea now

	  // Head
	  var tHeadRotZ = -Math.PI/6;
	  TweenMax.to(this.head.position, sp, {z: 4, ease: Power4.easeInOut});
	  TweenMax.to(this.head.rotation, sp, {z: tHeadRotZ, ease: Power4.easeInOut, onComplete:function(){_this.sleep()}});

	  // Eyes
	  TweenMax.to([this.eyeR.scale, this.eyeL.scale], sp/8, {y:0, ease:Power1.easeInOut, repeat:1});
	}

	Rabbit.prototype.run = function(){
	  var s = this.lspeed;
	  
	  this.runningCycle += delta * s * 3;
	  this.runningCycle = this.runningCycle % (Math.PI*2);
	  var t = this.runningCycle;
	  
	  var amp = 4;
	  var disp = .2;
	  
	  // BODY
	  
	  this.body.position.y = 6+ Math.sin(t - Math.PI/2)*amp;
	  this.body.rotation.x = .2 + Math.sin(t - Math.PI/2)*amp*.1;
	  
	  this.torso.rotation.x =  Math.sin(t - Math.PI/2)*amp*.1;
	  this.torso.position.y =  7 + Math.sin(t - Math.PI/2)*amp*.5;
	  
	  // MOUTH
	  this.mouth.rotation.x = Math.PI/16 + Math.cos(t)*amp*.05;
	  
	  // HEAD
	  this.head.position.z = 2 + Math.sin(t - Math.PI/2)*amp*.5;
	  this.head.position.y = 8 + Math.cos(t - Math.PI/2)*amp*.7;
	  this.head.rotation.x = -.2 + Math.sin(t + Math.PI)*amp*.1;
	  
	  // EARS
	  this.earL.rotation.x = Math.cos(-Math.PI/2 + t)*(amp*.2);
	  this.earR.rotation.x = Math.cos(-Math.PI/2 + .2 + t)*(amp*.3);
	  
	  // EYES
	  this.eyeR.scale.y = this.eyeL.scale.y = .7 +  Math.abs(Math.cos(-Math.PI/4 + t*.5))*.6;
	  
	  // TAIL
	  this.tail.rotation.x = Math.cos(Math.PI/2 + t)*amp*.3;
	  
	  // FRONT RIGHT PAW
	  this.pawFR.position.y = 1.5 + Math.sin(t)*amp;
	  this.pawFR.rotation.x = Math.cos(t ) * Math.PI/4;
	  
	  
	  this.pawFR.position.z = 6 - Math.cos(t)*amp*2;
	  
	  // FRONT LEFT PAW
	  
	  this.pawFL.position.y = 1.5 + Math.sin(disp + t)*amp;
	  this.pawFL.rotation.x = Math.cos( t ) * Math.PI/4;
	  
	  
	  this.pawFL.position.z = 6 - Math.cos(disp+t)*amp*2;
	  
	  // BACK RIGHT PAW
	  this.pawBR.position.y = 1.5 + Math.sin(Math.PI + t)*amp;
	  this.pawBR.rotation.x = Math.cos(t + Math.PI*1.5) * Math.PI/3;
	  
	  
	  this.pawBR.position.z = - Math.cos(Math.PI + t)*amp;
	  
	  // BACK LEFT PAW
	  this.pawBL.position.y = 1.5 + Math.sin(Math.PI + t)*amp;
	  this.pawBL.rotation.x = Math.cos(t + Math.PI *1.5) * Math.PI/3;
	  
	  
	  this.pawBL.position.z = - Math.cos(Math.PI + t)*amp;
	   
	}

	Rabbit.prototype.move = function(duration){
	  	var _this = this;
		side = duration * _this.lspeed;
		axisPos = [_this.mesh.position.x + side * Math.cos(_this.mesh.rotation.y - Math.PI/2), _this.mesh.position.y, _this.mesh.position.z - Math.sin(_this.mesh.rotation.y - Math.PI/2)];
	  	TweenMax.to(this.mesh.position, duration, {x: axisPos[0], y:axisPos[1], z:axisPos[2], ease:Power1.easeInOut, onComplete:function(){_this.trigger("ready"), null}});
	}

	Rabbit.prototype.rotate = function(R){
		var _this = this;
		duration = R / _this.rspeed;
		TweenMax.to(this.mesh.rotation, duration, {y: R, ease:Power1.easeInOut, onComplete:function(){_this.trigger("ready"), null}});
	}

	Rabbit.prototype.trigger = function(updatestatus, para){
		switch(updatestatus){
			case "nod":
				this.status = "nod";
				break;
			case "sleep":
				this.status = "sleep";
				break;
			case "forward":
				this.status = "forward";
				this.movingTime = para;
				break;
			case "rotate":
				this.status = "rotate";
				this.rotatingDegree = para;
				break;
			default:
				this.status = "ready";
				break;
		}	  
	}

	Rabbit.prototype.action = function(){
	  	switch(this.status){
	  		case "nod":
	  			this.nod();
	  			this.status = "noding";
	  			break;
	  		case "sleep":
	  			this.sleep();
	  			this.status = "sleeping";
	  			break;
	  		case "forward":
	  			this.move(this.movingTime);
	  			this.status = "moving";
	  			break;
	  		case "rotate":
	  			this.rotate(this.rotatingDegree);
	  			this.status = "moving";
	  			break;
	  		case "moving":
	  			this.run();
	  			break;
	  		default:
	  			// do nothing
	  	}
	}

	this.rabbits = new Array();

	var scale_base = 0.15;
	var rabbitsInfo = [
		[[165, 98.85, -10], [scale_base, scale_base, scale_base],  Math.PI/2],
	];

	for (var i = rabbitsInfo.length - 1; i >= 0; i--) {
    	this.rabbits[i] = new Rabbit();
    	this.rabbits[i].mesh.position.x = rabbitsInfo[i][0][0];
    	this.rabbits[i].mesh.position.y = rabbitsInfo[i][0][1];
    	this.rabbits[i].mesh.position.z = rabbitsInfo[i][0][2];
    	this.rabbits[i].mesh.scale.set(rabbitsInfo[i][1][0], rabbitsInfo[i][1][1], rabbitsInfo[i][1][2]);
    	this.rabbits[i].mesh.rotation.y = rabbitsInfo[i][2];
    	this.rabbits[i].AABB = new myAABB(
    									calculateMyAABB(
    										[this.rabbits[i].mesh.rotation.x, this.rabbits[i].mesh.rotation.y, this.rabbits[i].mesh.rotation.z],
    										[this.rabbits[i].mesh.position.x, this.rabbits[i].mesh.position.y, this.rabbits[i].mesh.position.z],
    										 this.rabbits[i].objLength * this.rabbits[i].mesh.scale.x,
    										 this.rabbits[i].objWidth *  this.rabbits[i].mesh.scale.y,
    										 this.rabbits[i].objHeight * this.rabbits[i].mesh.scale.z
    									)
    								);
    	this.mesh.add(this.rabbits[i].mesh);
    }

   	Rabbits.prototype.loop = function(){
    	delta = clock.getDelta();
		for (var i = 0; i < this.rabbits.length; i++) {
			this.rabbits[i].action();
		}
	}

}