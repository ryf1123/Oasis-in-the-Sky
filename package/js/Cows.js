var Cows = function() {
	this.mesh = new THREE.Group();
	this.mesh.name = "cows"

	var delta = 0;

	var clock = new THREE.Clock();

	var blackMat = new THREE.MeshPhongMaterial({
	    color: 0x100707,
	    shading:THREE.FlatShading,
	  });

	var darkMat = new THREE.MeshPhongMaterial({
	    color: 0x000000,
	    shading:THREE.FlatShading,
	  });

	var whiteMat = new THREE.MeshPhongMaterial({
	    //color: 0xa49789, 
	    color: 0xffffff,
	    shading:THREE.FlatShading,
	  });

	var fleshMat = new THREE.MeshPhongMaterial({
	    color: 0xffc0cb,//0xfaf0e6,//0xfce6c9,
	    shininess:50,
	    shading:THREE.FlatShading,
	  });

	Cow = function(){
		this.status = "ready";
		
		this.lspeed = 2;
		this.rspeed = Math.PI/2;
		this.movingTime = 0;
		this.rotatingDegree = 0;

		this.runningCycle = 0;
		this.mesh = new THREE.Group();
		this.body = new THREE.Group();
		this.mesh.add(this.body);

		// Parameters
		this.objLength = 40;
		this.objWidth =  20;
	    this.objHeight = 20;

		// Big Belly
		var bellyGeom = new THREE.CubeGeometry(40, 20, 20, 1);

		this.belly = new THREE.Mesh(bellyGeom, whiteMat);
		this.belly.position.z = 0;
		this.belly.position.y = 8;
		this.belly.position.x = 0;
		this.belly.castShadow = true;
		this.body.add(this.belly);

		var bellySpotGeom1 = new THREE.CubeGeometry(20, 10, 0.1);
		this.bellySpot1 = new THREE.Mesh(bellySpotGeom1, darkMat);
	  	this.bellySpot1.position.x = 20;
	  	this.bellySpot1.position.y = 12.9;
	  	this.bellySpot1.position.z = 0;
	  	this.bellySpot1.rotation.y = Math.PI/2;
	  	this.body.add(this.bellySpot1);

	  	var bellySpotGeom2 = new THREE.CubeGeometry(10, 10, 0.5);
		bellySpotGeom2.vertices[6].x += 3;
		bellySpotGeom2.vertices[7].x += 3;
		this.bellySpot2 = new THREE.Mesh(bellySpotGeom2, darkMat);
	  	this.bellySpot2.position.x = 15;
	  	this.bellySpot2.position.y = 12.9;
	  	this.bellySpot2.position.z = 10;

	  	this.body.add(this.bellySpot2);

	  	this.bellySpot3 = this.bellySpot2.clone();
	  	this.bellySpot3.position.z = -10;
	  	this.body.add(this.bellySpot3);

	  	var bellySpotGeom4 = new THREE.CubeGeometry(10, 0.5, 20);
	  	this.bellySpot4 = new THREE.Mesh(bellySpotGeom4, darkMat);
	  	this.bellySpot4.position.x = 15;
	  	this.bellySpot4.position.y = 18;
	  	this.bellySpot4.position.z = 0;
	  	//this.bellySpot4.rotation.y = Math.PI/2;
	  	this.body.add(this.bellySpot4);

	  	var bellySpotGeom5 = new THREE.CubeGeometry(10, 14, 0.5);
	  	this.bellySpot5 = new THREE.Mesh(bellySpotGeom5, darkMat);
	  	this.bellySpot5.position.x = -15;
	  	this.bellySpot5.position.y = 11;
	  	this.bellySpot5.position.z = 10;
	  	// this.bellySpot5.rotation.y = Math.PI/2;
	  	this.body.add(this.bellySpot5);

	  	var bellySpotGeom6 = new THREE.CubeGeometry(0.5, 14, 6);
	  	this.bellySpot6 = new THREE.Mesh(bellySpotGeom6, darkMat);
	  	this.bellySpot6.position.x = -20;
	  	this.bellySpot6.position.y = 11;
	  	this.bellySpot6.position.z = 6.9;
	  	this.body.add(this.bellySpot6);

	  	var bellySpotGeom7 = new THREE.CubeGeometry(10, 0.5, 6);
	  	this.bellySpot7 = new THREE.Mesh(bellySpotGeom7, darkMat);
	  	this.bellySpot7.position.x = -15;
	  	this.bellySpot7.position.y = 18;
	  	this.bellySpot7.position.z = 6.9;
	  	this.body.add(this.bellySpot7);

	  	var bellySpotGeom8 = new THREE.CubeGeometry(16, 16, 0.5);
	  	this.bellySpot8 = new THREE.Mesh(bellySpotGeom8, darkMat);
	  	this.bellySpot8.position.x = -8;
	  	this.bellySpot8.position.y = 10;
	  	this.bellySpot8.position.z = -10;
	  	this.body.add(this.bellySpot8);
	  	
	  	var bellySpotGeom9 = new THREE.CubeGeometry(16, 0.5, 6);
	  	this.bellySpot9 = new THREE.Mesh(bellySpotGeom9, darkMat);
	  	this.bellySpot9.position.x = -8;
	  	this.bellySpot9.position.y = 18;
	  	this.bellySpot9.position.z = -7;
	  	this.body.add(this.bellySpot9);

	  	var bellySpotGeom10 = new THREE.CubeGeometry(8, 8, 0.5);
	  	this.bellySpot10 = new THREE.Mesh(bellySpotGeom10, darkMat);
	  	this.bellySpot10.position.x = 0;
	  	this.bellySpot10.position.y = 4;
	  	this.bellySpot10.position.z = 10;;
	  	this.body.add(this.bellySpot10);

	  	// Tail
	  	var tailGeom = new THREE.CylinderGeometry(2, 1, 24, 8, 1);
	  	tailGeom.applyMatrix(new THREE.Matrix4().makeTranslation(0,10,0));
	  	tailGeom.applyMatrix(new THREE.Matrix4().makeRotationZ(Math.PI*7/8));
	  
	  	this.tail = new THREE.Mesh(tailGeom, whiteMat);
	  	this.tail.position.x = -20;
	  	this.tail.position.y = 14;
	  	this.body.add(this.tail);

	  	// Milk
	  	var milkGeom = new THREE.CubeGeometry(12, 8, 12);
	  	this.milk = new THREE.Mesh(milkGeom, fleshMat);
	  	this.milk.position.x = -5;
	  	this.milk.position.y = 2;
	  	this.milk.position.z = 0;
	  	this.body.add(this.milk);

		// Legs
		var LegGeom = new THREE.CubeGeometry(6, 20, 6, 1);
		LegGeom.vertices[2].x-=2;
		LegGeom.vertices[2].z-=2;
		LegGeom.vertices[3].x-=2;
		LegGeom.vertices[3].z+=2;
		LegGeom.vertices[6].x+=2;
		LegGeom.vertices[6].z+=2;
		LegGeom.vertices[7].x+=2;
		LegGeom.vertices[7].z-=2;

		this.legFL = new THREE.Mesh(LegGeom, whiteMat);
		this.legFL.position.y = -6;
		this.legFL.position.z = 6;
		this.legFL.position.x = 12;
		this.legFL.castShadow = true;
		this.body.add(this.legFL);

		this.legFR = new THREE.Mesh(LegGeom, whiteMat);
		this.legFR.position.y = -6;
		this.legFR.position.z = -6;
		this.legFR.position.x = 12;
		this.legFR.castShadow = true;
		this.body.add(this.legFR);

		this.legBL = new THREE.Mesh(LegGeom, whiteMat);
		this.legBL.position.y = -6;
		this.legBL.position.z = 6;
		this.legBL.position.x = -15;
		this.legBL.castShadow = true;
		this.body.add(this.legBL);

		this.legBR = new THREE.Mesh(LegGeom, whiteMat);
		this.legBR.position.y = -6;
		this.legBR.position.z = -6;
		this.legBR.position.x = -15;
		this.legBR.castShadow = true;
		this.body.add(this.legBR);

		// Heads
		var HeadGeom = new THREE.CubeGeometry(12, 12, 12, 1);

		this.head = new THREE.Mesh(HeadGeom, whiteMat);
		this.head.position.x = 24;
		this.head.position.y = 22;
		this.head.position.z = 0;
		//this.head.rotation.z = Math.PI/9;
		this.head.castShadow = true;
		this.body.add(this.head);
		// Mouth

		var MouthGeom = new THREE.CubeGeometry(12, 4, 12, 1);
		this.mouth = new THREE.Mesh(MouthGeom, fleshMat);
		this.mouth.position.y = -8;
		this.mouth.castShadow = true;
		this.head.add(this.mouth);


	  	// Ring
	  	var ringGeom = new THREE.TorusGeometry(3, 0.5, 4, 8);
		this.ring = new THREE.Mesh(ringGeom, blackMat);
		this.ring.position.x = 6.5;
		this.ring.position.z = 0;
		this.ring.position.y = -10;
		this.ring.rotation.x = Math.PI/2;
		this.ring.rotation.y = -Math.PI/3;
		this.ring.castShadow = true;
		this.head.add(this.ring);
	  
	  	// Ears
	  	var earLGeom = new THREE.CubeGeometry(5, 5, 4, 1);
	  	earLGeom.vertices[0].y -= 1;
	  	earLGeom.vertices[1].y -= 1;
	  	earLGeom.vertices[2].y += 1;
	  	earLGeom.vertices[3].y += 1;
	
	  	var earRGeom = new THREE.CubeGeometry(5, 5, 4, 1);
	  	earRGeom.vertices[0].y += 1;
	  	earRGeom.vertices[1].y += 1;
	  	earRGeom.vertices[2].y -= 1;
	  	earRGeom.vertices[3].y -= 1;
	
	  	this.earL = new THREE.Mesh(earLGeom, darkMat);
	  	this.earL.position.x = -6;
	  	this.earL.position.y = 1;
	  	this.earL.position.z = 7;
	  	//this.earL.rotation.z = -Math.PI/6;
	  	this.earL.rotation.y = Math.PI*2/3;
	  	this.earL.castShadow = true;
	  	this.head.add(this.earL);
	
	  	this.earR = new THREE.Mesh(earRGeom, darkMat);
	  	this.earR.position.x = -6;
	  	this.earR.position.y = 1;
	  	this.earR.position.z = -7;
	  	//this.earR.rotation.z = -Math.PI/6;
	  	this.earR.rotation.y = -Math.PI/3;
	  	this.earR.castShadow = true;
	  	this.head.add(this.earR);
	  	// Eyes
	  	var eyeGeom = new THREE.CubeGeometry(2,4,4);
	
	  	this.eyeL = new THREE.Mesh(eyeGeom, whiteMat);
	  	this.eyeL.position.x = 0;
	  	this.eyeL.position.z = 5.5;
	  	this.eyeL.position.y = 0;
	  	this.eyeL.castShadow = true;
	  	this.eyeL.rotation.y = -Math.PI/2;
	  	this.head.add(this.eyeL);
	
	  	var irisGeom = new THREE.CubeGeometry(.6,2,2);
	
	  	this.iris = new THREE.Mesh(irisGeom, darkMat);
	  	this.iris.position.x = 1.0;
	  	this.iris.position.y = 0;
	  	this.iris.position.z = 0;
	  	this.eyeL.add(this.iris);
	
	  	this.eyeR = this.eyeL.clone();
	  	this.eyeR.children[0].position.x = -this.iris.position.x;
	
	  	this.eyeR.position.z = -this.eyeL.position.z;
	  	this.head.add(this.eyeR);
	  	// SPOTS
	  	var spotGeom = new THREE.CubeGeometry( 10, 6, 0.5 );
	  	this.eyePotR = new THREE.Mesh(spotGeom, blackMat);
	  	this.eyePotR.position.z = 6.3;
	  	this.eyePotR.position.y = 0;
	  	this.eyePotR.position.x = -1;
	  	this.eyePotR.castShadow = true;
	  	this.head.add(this.eyePotR);
	  	this.eyePotL = new THREE.Mesh(spotGeom, darkMat);
	  	this.eyePotL.position.x = -1;
	  	this.eyePotL.position.y = 0;
	  	this.eyePotL.position.z = -6.3;
	  	this.eyePotL.castShadow = false;
	  	this.head.add(this.eyePotL);
	  	var face_spotGeom = new THREE.PlaneGeometry( 6.5, 6.5, 1 );
	  	this.facePot = new THREE.Mesh(face_spotGeom, darkMat);
	  	this.facePot.position.x = 6.5;
	  	this.facePot.position.y = 2.8;
	  	this.facePot.position.z = -3;
	  	this.facePot.rotation.y = Math.PI/2;
	  	this.head.add(this.facePot);

		this.body.traverse(function(object) {
		    if (object instanceof THREE.Mesh) {
		        object.castShadow = true;
		        object.receiveShadow = true;
		    }
	    });

	    this.AABB = null;
	}

	Cow.prototype.nod = function(){
	  var _this = this;
	  var sp = 1 + Math.random()*2;

	  // Head
	  var tHeadRotY = -Math.PI/3 + Math.random()* Math.PI/3;
	  var tHeadRotZ = Math.random()*.4 + Math.PI/16;
	  TweenMax.to(this.head.rotation, sp, {z:tHeadRotZ, y:tHeadRotY, ease:Power4.easeInOut, onComplete:function(){_this.nod()}});

	  // Tail
	  var tTailRotY = -Math.PI/4;
	  TweenMax.to(this.tail.rotation, sp/8, {y:tTailRotY, ease:Power1.easeInOut, yoyo:true, repeat:8});

	  // Eyes
	  TweenMax.to([this.eyeR.scale, this.eyeL.scale], sp/20, {y:0, ease:Power1.easeInOut, yoyo:true, repeat:1});
	}

	Cow.prototype.sleep = function(){
	  var sp = 1;
	  var _this = this;
	  // SleepMark
	  // no idea now

	  // Head
	  var tHeadRotZ = -Math.PI/6;
	  TweenMax.to(this.head.position, sp, {x: 28, ease: Power4.easeInOut});
	  TweenMax.to(this.head.rotation, sp, {z: tHeadRotZ, ease: Power4.easeInOut, onComplete:function(){_this.sleep()}});

	  // Eyes
	  TweenMax.to([this.eyeR.scale, this.eyeL.scale], sp/8, {y:0, ease:Power1.easeInOut, repeat:1});

	}

	Cow.prototype.walk = function(){
	  var s = this.lspeed;
	  this.runningCycle += delta * s * 3;
	  this.runningCycle = this.runningCycle % (Math.PI*2);
	  var t = this.runningCycle;
	  
	  this.legFR.rotation.z = Math.sin(t+2)*Math.PI/8;
	  
	  this.legFL.rotation.z = Math.sin(t+.4)*Math.PI/8;
	  
	  this.legBL.rotation.z = Math.sin(t)*Math.PI/12;
	  
	  this.legBR.rotation.z = Math.sin(t+2.4)*Math.PI/12;
	  
	  this.body.position.y = Math.sin(t+Math.PI/2)*0.8;

	  this.head.position.y = 20-Math.sin(t+Math.PI/2)*0.8;

	  this.head.rotation.z = Math.PI/16;

	  this.tail.rotation.z =  + Math.sin(t-Math.PI/2)*0.1;
	  
	  this.iris.position.x = 1.1;

	  this.iris.position.x = 1.1;
	}

	Cow.prototype.move = function(duration){
		var _this = this;
		side = duration * _this.lspeed;
		axisPos = [_this.mesh.position.x + side * Math.cos(_this.mesh.rotation.y), _this.mesh.position.y, _this.mesh.position.z - Math.sin(_this.mesh.rotation.y)];
	  	TweenMax.to(this.mesh.position, duration, {x: axisPos[0], y:axisPos[1], z:axisPos[2], ease:Power1.easeInOut, onComplete:function(){_this.trigger("ready"), null}});
	}

	Cow.prototype.rotate = function(R){
		var _this = this;
		duration = R / _this.rspeed;
		TweenMax.to(this.mesh.rotation, duration, {y: R, ease:Power1.easeInOut, onComplete:function(){_this.trigger("ready"), null}});
	}

	Cow.prototype.trigger = function(updatestatus, para){
	// 状态机
	/*
	 * 如何回复动作啊？瞬移回复？
	 * 初始 ready
	 * 触发 nod
	 * 接受 nodding
	 * 触发 sleep
	 * 接受 sleeping
	 * 触发 collision
	 * 接受 jumping
	 */
	// 解释进来的信号
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

	Cow.prototype.action = function(){
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
	  			this.walk();
	  			break;
	  		default:
	  			// do nothing
	  	}
	}


	this.cows = new Array();
	var scale_base = 0.15;
	var cowsInfo = [
		[[200, 101,  50], [scale_base, scale_base, scale_base],  Math.PI/4],
	];

	for (var i = 0; i < cowsInfo.length; i++) {
    	this.cows[i] = new Cow();
    	var temp = this.cows[i];
    	temp.mesh.position.x = cowsInfo[i][0][0];
    	temp.mesh.position.y = cowsInfo[i][0][1];
    	temp.mesh.position.z = cowsInfo[i][0][2];
    	temp.mesh.scale.set(cowsInfo[i][1][0], cowsInfo[i][1][1], cowsInfo[i][1][2]);
    	temp.mesh.rotation.y = cowsInfo[i][2];
    	
    	// Axis?
    	temp.AABB = new myAABB(calculateMyAABB( 
    								[temp.mesh.rotation.x, temp.mesh.rotation.y, temp.mesh.rotation.z], 
    								[temp.mesh.position.x, temp.mesh.position.y, temp.mesh.position.z], 
    								temp.objLength*temp.mesh.scale.x, 
    								temp.objWidth*temp.mesh.scale.y, 
    								temp.objHeight*temp.mesh.scale.z
    								)
    							);
    	this.mesh.add(temp.mesh);
    }

    Cows.prototype.loop = function(){
    	delta = clock.getDelta();
		for (var i = 0; i < this.cows.length; i++) {
			this.cows[i].action();
		}
	}
}