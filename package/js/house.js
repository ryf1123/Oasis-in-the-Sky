var House = function () {
    // mesh = new THREE.Object3D();
    this._mesh = new THREE.Group();
    this._mesh.name = "house"
    var mesh = this._mesh;

    //initializer for the scene
    var l = 3;//for measuring the length of the geometries and help with scaling it in the scene
    var h = 3;//for measuring the height of the geometries and help with scaling it in the scene
    var t = 3;//for measuring the width/thickness of the geometries and help with scaling it in the scene
    var p = 3; //for measuring the position of the geometries and help with scaling it in the scene
    var controls;
    var particle;
    var door, doorTmp;
    var videoBox;
    var particleSys;
    var particleCount;
    var particles;
    var light, light2, light3, light4;
    var spotLight;
    var cam1, cam2, con1, con2;
    //call the main function to run the scene in the browser and request animation/updates
    init();
    animate();

    //main function evey other function goes in here
    function init() {
        // info = document.body.appendChild(document.createElement('div'));
        // info.style.cssText = 'margin: 20px; position: absolute; ';
        // info.innerHTML =
        //     '<p><button onclick=firstPerspControl(); >First Person</button> ' +
        //     '<button onclick=orbitControl(); >Orbit</button>' + '<div id=msg ></div>';
        // initializing the weggl renderer
        // renderer = new THREE.WebGLRenderer();

        //setting hte width and height to match the window we are working with
        // renderer.setSize(window.innerWidth, window.innerHeight);

        //appending the document with renderer
        // document.body.appendChild(renderer.domElement);


        //creating the scene
        // scene = new THREE.Scene();

        //Control change from firstperson to orbit

        //ambient light for all directional light purpose
        // scene.add(new THREE.AmbientLight(0xffffff, 0.01));
        mesh.add(new THREE.AmbientLight(0xffffff, 0.01));

        //point light which makes the glowing effect each of the light is in one of the room
        //has been cloned in order to spread the light around the house.
        var bulb = new THREE.SphereGeometry(4, 16, 8);

        light = new THREE.PointLight(0xffa500, 0.6, 200);
        light.position.z = 0;
        light.position.y = 40;
        light.add(new THREE.Mesh(bulb, new THREE.MeshBasicMaterial({ color: 0xffff00 })));
        // scene.add(light);
        mesh.add(light);
        light.visible = true;
        // scene.add(new THREE.PointLightHelper(light, 1));
        mesh.add(new THREE.PointLightHelper(light, 1));

        light2 = light.clone();
        light2.position.x = 35;
        light2.position.z = -20;
        // scene.add(light2);
        mesh.add(light2);

        light3 = light.clone();
        light3.position.x = 35;
        light3.position.z = 40;
        // scene.add(light3);
        mesh.add(light3);

        light4 = light.clone();
        light4.position.x = -35;
        light4.position.z = 0;
        // scene.add(light4);
        mesh.add(light4);

        //creating spotlight to cast shadow inside the house
        spotLight = new THREE.SpotLight(0xfffff, 0.1, 1, 500);
        spotLight.position.set(0, 40, 0);
        spotLight.castShadow = true;//enabling shadow to be casted with the spotlight
        spotLight.shadow.camera.near = 3;
        spotLight.shadow.mapSize.width = 110;
        spotLight.shadow.mapSize.height = 100;
        spotLight.shadow.camera.far = 40;
        spotLight.shadow.camera.fov = 110;
        // scene.add(spotLight);
        mesh.add(spotLight);

        //enabling directional light for the light/shadow outside the house this light is only directional like the sun
        // var dirLight = new THREE.DirectionalLight(0xffffff, 0.1);
        // dirLight.position.x = -1000;
        // dirLight.position.y = 1500;
        // scene.add(dirLight);
        // scene.add(new THREE.PointLightHelper(dirLight, 10));
        // dirLight.castShadow = true; renderer.shadowMapEnabled = true;

        // renderer.shadowMapSoft = true;

        // renderer.shadow.camera.near = 3;
        // renderer.shadow.camera.far = camera.far;
        // renderer.shadow.camera.fov = 50;

        // renderer.shadowMapBias = 0.0039;
        // renderer.shadowMapDarkness = 0.5;
        // renderer.shadow.mapSize.width = 1000;
        // renderer.shadow.mapSize.height = 1000;
        //CALLING ALL THE FUNCTIONS AND ALSO CREATING THE OBJECTS
        gui();
        // skyBg();

        loadModels();

        //bedRoom items

        //create bed
        var bed = drawBed(10 * l, 2 * h, 5 * t);
        // scene.add(bed);
        mesh.add(bed);
        bed.rotation.set(0, -90 * (3.14 / 180), 0, 'XYZ');
        bed.position.x = 25;
        bed.position.z = -35;
        bed.position.y = 0.04;

        //create table
        //table idea used from assignment example
        var table = drawTable(5 * l, 5 * h, 6.5 * t);
        // scene.add(table);
        mesh.add(table);
        table.rotation.set(0, -90 * (3.14 / 180), 0, 'XYZ');
        table.position.x = 42.5;
        table.position.z = 7.5;

        //create notice board
        var noticeboard = drawnoticeboard(5 * l, 5 * h, 6.5 * t);
        // scene.add(noticeboard);
        mesh.add(noticeboard);
        noticeboard.rotation.set(0, 0, -90 * (3.14 / 180), 'XYZ');
        noticeboard.position.x = 17;
        noticeboard.position.y = 30;
        noticeboard.position.z = -28;

        //create chair
        //chair idea used from assignment example
        var chairBackHeight = 3 * h;
        var chairDepth = 2 * t;
        var chairWidth = 2.5 * l;
        var chairSeatHeight = 2 * h;
        var chairFrameThickness = 1;
        var translation = new THREE.Vector3(0, 0, 0);
        var chair = addChair(translation, chairBackHeight, chairDepth, chairWidth, chairSeatHeight, chairFrameThickness);
        chair.position.x = 41.5;
        chair.position.y = chairBackHeight / 2 + chairSeatHeight + chairFrameThickness;
        chair.position.z = -4;
        // scene.add(chair);
        mesh.add(chair);

        //Kitchen items
        //drawing cabinet in the kitchen
        var cabinet = addCabinet(0.2 * l, 4 * h, 5 * t);
        // scene.add(cabinet);
        mesh.add(cabinet);
        cabinet.castShadow = true;
        cabinet.receiveShadow = true;
        //cloning the same cabinet in order to have 1 more quantity
        var cabinet2 = cabinet.clone();
        // scene.add(cabinet2);
        mesh.add(cabinet2);
        cabinet2.position.z = -18;
        cabinet2.castShadow = true;
        cabinet2.receiveShadow = true;

        //drawing stove
        var stove = addStove();
        // scene.add(stove);
        mesh.add(stove);
        stove.position.x = -3;

        //Living room items

        //drawing door
        door = drawDoor(5.5 * l, 3 * h, 10 * t);
        doorTmp = drawDoor(5.5 * l, 3 * h, 10 * t);
        // scene.add(door);
        // scene.add(doorTmp);
        mesh.add(door);
        mesh.add(doorTmp);
        doorTmp.visible = true;
        doorTmp.rotation.set(90 * (3.14 / 180), 0, 0, 'XYZ');
        //door.position.x = -38;
        doorTmp.position.x = -45;
        doorTmp.position.y = 15.5;
        doorTmp.position.z = -55;
        door.rotation.set(90 * (3.14 / 180), 0, 0, 'XYZ');
        //door.position.x = -38;
        door.position.x = -45;
        door.position.y = 15.5;
        door.position.z = -55;
        //door.position.z = -48;

        //drawing Wardrobe
        var wardrobe = addWardrobe(0.2 * l, 9 * h, 10 * t);
        // scene.add(wardrobe);
        mesh.add(wardrobe);

        //adding sofa
        var sofaBackHeight = 4 * h;
        var sofaDepth = 5 * t;
        var sofaWidth = 10 * l;
        var sofaSeatHeight = 5.5 * h;
        var sofaFrameThickness = 5;
        var translation = new THREE.Vector3(0, 0, 0);
        var sofa = addSofa(translation, sofaBackHeight, sofaDepth, sofaWidth, sofaSeatHeight, sofaFrameThickness);
        sofa.position.x = -25;
        sofa.position.y = 12;
        sofa.position.z = -5;
        sofa.rotation.set(0, -90 * (3.14 / 180), 0, 'XYZ');
        // scene.add(sofa);
        mesh.add(sofa);

        videoBox = draVideoBox();
        videoBox.position.set(-55.15, 28.22, -2);
        videoBox.visible = false;
        // scene.add(videoBox);
        mesh.add(videoBox);

        //Toilet items
        //creating sink
        // idea used from bowl example of assignment example
        var fullsink = drawsink();
        fullsink.translateY(60);
        fullsink.translateX(-10);
        fullsink.translateZ(5);
        fullsink.rotation.set(0 * (3.14 / 180), 0, 0, 'XYZ');
        fullsink.position.x = 15;
        fullsink.position.y = 14;
        fullsink.position.z = 30;
        // scene.add(fullsink);
        mesh.add(fullsink);

        //drawing shower in the toilet
        var shower = addShower();
        // scene.add(shower);
        mesh.add(shower);

        //drawing roof
        var roof = drawRoof();
        //add stove to the scene

        //drawing particles
        var rain = particleRain();

        //Enviroment
        addFloor();

        //Front
        frontTopDoorWall();
        frontTopWindowWall();
        frontBottomWindowWall();
        frontMiddleWall();
        frontKitchenWallpaper();
        frontDoorWallpaper();
        frontBedroomWallpaper();
        frontBottomWindowWallpaper();
        frontTopWindowWallpaper();
        frontLivingRoomWallpaper();

        //Left Side
        leftWall();

        //Behind wall
        backBottomWall();
        backTopWall();
        backRightWindowWall();
        backLeftWindowWall();
        backLivingRoomWindowWall();
        backToiletRoomWindowWall();
        backBottomKitchenWallpaper();
        backBottomToiletWallpaper();
        backBottomLivingRoomWallpaper();
        backTopLivingRoomWallpaper();
        backTopToiletWallpaper();
        backTopKitchenWallpaper();

        //kitchen
        kitchenWall();
        kitchenRoomWindow();

        //Living room
        livingRoomWall();
        livingRoomWindow();

        //toilet
        toiletSmallWall();
        toiletWall();
        toiletWindow();

        //BedRoom
        rightWall();
        rToiletWallpaper();
        rBedRoomWallpaper();
        bedRoomWindow();
    }


    //orbit and firstperson control

    function switchControls() {
        cam1 = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 1000);
        cam1.position.set(-200, 10, 0);
        con1 = new THREE.FirstPersonControls(cam1);
        con1.lookSpeed = 0.003;
        con1.movementSpeed = 1;


        cam2 = cam1.clone();
        cam2.position.set(0, 0, 400);

        con2 = new THREE.OrbitControls(cam2);
        con2.minDistance = 10;
        con2.maxDistance = 400;//4
        con2.enablePan = false;
    }


    function firstPerspControl() {
        camera = cam1;
        controls = con1;
    }

    function orbitControl() {
        camera = cam2;
        controls = con2;
    }

    var angle = 0;
    var t1;
    var isGotoOpen = false;
    function doorRotating() {
        doorTmp.rotation.set(90 * (3.14 / 180), 0, -angle * (3.14 / 180), 'XYZ');
        doorTmp.position.x = -38 - 0.5 * 16.5 * Math.cos(angle * (3.14 / 180));
        doorTmp.position.y = 15.5;
        doorTmp.position.z = -48 - 0.5 * 16.5 * (1 - Math.sin(angle * 3.14 / 180)) + 0.5 * 3;
        if (isGotoOpen) {
            angle++;
            door.visible = false;
            if (angle == 90) {
                window.clearTimeout(t1);//去掉定时器
            }
        } else {
            angle--;
            if (angle == 0) {
                window.clearTimeout(t1);//去掉定时器
            }
        }
    }


    //ADDING FEATURES TO THE GUI USING dat.GUI
    function gui() {
        var gui = new dat.GUI();

        parameters =
            {//
                rain: false,//for rain
                roof: false,//for roof
                sLight: true,//for spotlight
                kLight: true,//for pointlight
                bLight: true,//for pointlight
                tLight: true,//for pointlight
                lLight: true,//for pointlight
                doorOp: true,
                tvOp: false
            };

        var particleVisible = gui.add(parameters, 'rain').name('Rain Toggle').listen();
        particleVisible.onChange(function (value) {
            particleSys.visible = value;
            if (particleSys.visible == true) {
                // scene.add(rain);//if box is ticked show rain
                mesh.add(rain);
            }
            else {

            }
        });

        var lightVisible = gui.add(parameters, 'sLight').name('SpotLight Toggle').listen();
        lightVisible.onChange(function (value) {
            spotLight.visible = value; //if box is ticked show spotlight
            if (spotLight.visible == true) {

            }
            else {

            }
        }
        );

        var lightVisible = gui.add(parameters, 'kLight').name('Kitchen Light').listen();
        lightVisible.onChange(function (value) {
            light.visible = value;
            if (light.visible == true) {// if box is unticked dont show pointlight and if its ticked show pointlight
                // scene.add(light);
                mesh.add(light);


            }
            else {

            }
        });

        var lightVisible = gui.add(parameters, 'bLight').name('Bedroom Light').listen();
        lightVisible.onChange(function (value) {
            light2.visible = value;
            if (light2.visible == true) {

                // scene.add(light2);
                mesh.add(light2);


            }
            else {

            }
        });

        var lightVisible = gui.add(parameters, 'tLight').name('Toilet Light').listen();
        lightVisible.onChange(function (value) {
            light3.visible = value;
            if (light3.visible == true) {

                // scene.add(light3);
                mesh.add(light3);


            }
            else {

            }
        });

        var lightVisible = gui.add(parameters, 'lLight').name('Living Room Light').listen();
        lightVisible.onChange(function (value) {
            light4.visible = value;
            if (light4.visible == true) {

                // scene.add(light4);
                mesh.add(light4);

            }
            else {

            }
        });

        var roofVisible = gui.add(parameters, 'roof').name('Roof Toggle').listen();
        roofVisible.onChange(function (value) {
            roof.visible = value;
            if (roof.visible == true) {
                // scene.add(roof);
                mesh.add(roof);

            }
            else {

            }
        });

        var doorOpen = gui.add(parameters, 'doorOp').name('Maindoor Toggle').listen();
        doorOpen.onChange(function (value) {
            if (value == false) {
                t1 = window.setInterval(doorRotating, 50);
                isGotoOpen = true;
            }
            else {
                isGotoOpen = false;
                t1 = window.setInterval(doorRotating, 50);
            }

        });

        var tvOpen = gui.add(parameters, 'tvOp').name('Television Control').listen();
        tvOpen.onChange(function (value) {
            if (value == false) {
                videoBox.visible = false;
            }
            else {
                videoBox.visible = true;
            }

        });

        gui.open();

    }

    // function skyBg() {
    //     //creating the sky scene using the help of sphere and texture
    //     var texture = new THREE.TextureLoader().load("images/sky_bg.jpg");
    //     //create material for the geometry
    //     var material = new THREE.MeshPhongMaterial({
    //         color: 0xffffff,
    //         specular: 0x050505,
    //         shininess: 50,
    //         side: THREE.DoubleSide,
    //         map: texture
    //     });


    //     //determine the size of the geometry
    //     var geometry = new THREE.SphereGeometry(530, 130, 3);

    //     var faceVertexUvs = geometry.faceVertexUvs[0];
    //     for (i = 0; i < faceVertexUvs.length; i++) {
    //         //determine the UV face for the geometry so that the texture are equally balanced
    //         var uvs = faceVertexUvs[i];
    //         var face = geometry.faces[i];

    //         for (var j = 0; j < 3; j++) {

    //             uvs[j].x = face.vertexNormals[j].x * 0.5 + 0.5;
    //             uvs[j].y = face.vertexNormals[j].y * 0.5 + 0.5;

    //         }

    //     }
    //     //assign the mesh
    //     mesh = new THREE.Mesh(geometry, material);

    //     mesh.scale.set(-1, 1, 1);//making the sky appear inside out
    //     texture.repeat.set(1, 0.8);//Repeat Texture

    //     mesh.add(this.mesh);
    //     // scene.add(mesh);//add it to the scene
    // }

    //FUNCTIONS TO CREATE THE SAME TYPE OF MATERIAL FOR EVERY FACEMATERIAL
    function createMaterial(path) {//use createMaterial for MeshFaceMaterial to create the faces so each of the faces in the geometrty can have different type of materials in each sides
        var texture = new THREE.TextureLoader().load(path);
        var material = new THREE.MeshLambertMaterial({
            map: texture
            , overdraw: 0.1
        });

        return material;
    }

    function createWallMaterial(obj) {
        var texture = new THREE.TextureLoader().load(obj);
        var material = new THREE.MeshLambertMaterial({
            map: texture
            , overdraw: 0.1
        });
        texture.repeat.set(1, 0.4);
        return material;
    }

    function addFloor() {
        // Create the ground using a Plane
        // Load the texture for the ground
        var groundTexture = new THREE.TextureLoader().load('images/tile.jpg');
        groundTexture.wrapS = THREE.RepeatWrapping;
        groundTexture.wrapT = THREE.RepeatWrapping;

        // Create the material
        var groundMat = new THREE.MeshPhongMaterial({ map: groundTexture });
        groundMat.map.repeat.set(2, 1);

        // Create the mesh (l, w, h)
        var groundMesh = new THREE.Mesh(new THREE.PlaneGeometry(37 * l, 40 * h, 23 * t), groundMat);
        groundMesh.rotation.set(-90 * (3.14 / 180), 0, 0, 'XYZ');
        groundMesh.position.z = 1 * p;
        groundMesh.position.y = 0.03;
        groundMesh.receiveShadow = true;
        groundMesh.castShadow = true;
        // scene.add(groundMesh);
        mesh.add(groundMesh);
    }

    function loadModels() {

        var objLoader2_tv = new THREE.OBJLoader2();

        var onLoadMtl_tv = function (materials, materialCreator) {
            var objLoader_tv = new THREE.OBJLoader();
            objLoader_tv.setMaterials(materialCreator);

            objLoader_tv.load('./models/flat-screen-lcd-tv.obj', function (tv) {
                // scene.add(tv);
                mesh.add(tv);
                tv.scale.set(4, 4, 4);
                tv.castShadow = true;
                tv.receiveShadow = true;
                tv.position.set(-53, 20, -2);
                tv.rotation.set(0, 90 * (3.14 / 180), 0, 'XYZ');
            });
        };

        objLoader2_tv.loadMtl('./models/flat-screen-lcd-tv.mtl', null, onLoadMtl_tv);

        var objLoader2_toilet = new THREE.OBJLoader2();

        var onLoadMtl_toilet = function (materials, materialCreator) {
            var objLoader_toilet = new THREE.OBJLoader();
            objLoader_toilet.setMaterials(materialCreator);

            objLoader_toilet.load('./models/toilet-water-closet.obj', function (toilet) {
                // scene.add(tv);
                mesh.add(toilet);
                toilet.scale.set(0.5, 0.5, 0.5)
                toilet.position.set(20, 1, 50);
                toilet.rotation.set(0, 90 * (3.14 / 180), 0, 'XYZ');
                toilet.castShadow = true;
                toilet.receiveShadow = true;
            });
        };

        objLoader2_toilet.loadMtl('./models/toilet-water-closet.mtl', null, onLoadMtl_toilet);
    }



    //FUNCTIONS FOR KITCHEN

    //adding cabinet

    function addCabinet(w, h, d) {


        var cabinet = new THREE.Object3D();//create the 3d object called cabinet

        var woodColor = new THREE.TextureLoader().load("images/wadrobe.jpg");//add texture


        var materials = [];
        for (var i = 0; i < 6; i++) {
            materials.push(new THREE.MeshPhongMaterial({ map: woodColor }));
        }

        var cabMat = new THREE.MeshFaceMaterial(materials);


        var handleColor = new THREE.TextureLoader().load("images/metal.jpg");//add handle

        var handleMat = new THREE.MeshPhongMaterial({ map: handleColor });



        var drawerB = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), cabMat);

        drawerB.translateY(30);
        drawerB.translateX(13.8);
        drawerB.translateZ(-25);

        drawerB.castShadow = true;
        drawerB.receiveShadow = true;
        cabinet.add(drawerB);

        var drawerF = drawerB.clone();
        drawerF.translateX(-8);
        cabinet.add(drawerF);

        var drawerR = new THREE.Mesh(new THREE.BoxGeometry(w, 9, 12), cabMat);

        drawerR.translateY(30);
        drawerR.translateX(10);
        drawerR.translateZ(-17.2);

        drawerR.castShadow = true;
        drawerR.receiveShadow = true;
        cabinet.add(drawerR);
        drawerR.rotation.set(-90 * (3.14 / 180), 0, -90 * (3.14 / 180), 'XYZ');


        var drawerL = drawerR.clone();
        cabinet.add(drawerL);
        drawerR.translateX(-15.6);

        var drawerT = new THREE.Mesh(new THREE.BoxGeometry(w, 9, 16), cabMat);
        cabinet.add(drawerT);
        drawerT.translateY(36.3);
        drawerT.translateX(10);
        drawerT.translateZ(-25);
        drawerT.rotation.set(0, 0, -90 * (3.14 / 180), 'XYZ');

        var drawerBo = drawerT.clone();
        cabinet.add(drawerBo);
        drawerBo.translateX(12.6);//position cabinet


        var handle = new THREE.Mesh(new THREE.TorusGeometry(2, 0.5, 4, 5), handleMat);
        cabinet.add(handle);

        handle.translateY(30);//position handle
        handle.translateX(5);
        handle.translateZ(-19);


        return cabinet;//return it so it can be called in init function

    }

    function addStove() {
        var wi = 14;
        var he = 15;
        var de = 15;
        var stove = new THREE.Object3D();

        var tex = new THREE.TextureLoader().load('images/metal.jpg');
        tex.wrapS = THREE.RepeatWrapping;
        tex.wrapT = THREE.RepeatWrapping;

        // Create a large cube(   length,height,thickness)
        var geometry = new THREE.BoxGeometry(wi, he, de);
        var material = new THREE.MeshLambertMaterial({ map: tex });
        var mesh1 = new THREE.Mesh(geometry, material);

        //materials.repeat.x = 1;
        // materials.repear.y = 1;
        //mesh.scale.set(1,1,-1)
        tex.repeat.set(1, 0.3);


        mesh1.position.z = -45;
        mesh1.position.y = 7;
        mesh1.position.x = -1;
        mesh1.castShadow = true;
        mesh1.receiveShadow = true;
        stove.add(mesh1);


        var circleGeometry = new THREE.CircleGeometry(3, 20, 5);
        var circleMaterial = new THREE.MeshPhongMaterial({ color: 0x000000 });
        var circle = new THREE.Mesh(circleGeometry, circleMaterial);

        circle.rotation.set(-90 * (3.14 / 180), 0, 0, 'XYZ');
        circle.position.z = -43;
        circle.position.y = 15;
        circle.position.x = -4;


        var circle2Geometry = new THREE.CircleGeometry(2, 20, 5);
        var circle2Material = new THREE.MeshPhongMaterial({ color: 0x000000 });
        var circle2 = new THREE.Mesh(circle2Geometry, circle2Material);

        circle2.rotation.set(-90 * (3.14 / 180), 0, 0, 'XYZ');
        circle2.position.z = -49;
        circle2.position.y = 15;
        circle2.position.x = -4;


        var circle3Geometry = new THREE.CircleGeometry(2, 20, 5);
        var circle3Material = new THREE.MeshPhongMaterial({ color: 0x000000 });
        var circle3 = new THREE.Mesh(circle3Geometry, circle3Material);

        circle3.rotation.set(-90 * (3.14 / 180), 0, 0, 'XYZ');
        circle3.position.z = -49;
        circle3.position.y = 15;
        circle3.position.x = 2;




        var circle4Geometry = new THREE.CircleGeometry(3, 20, 5);
        var circle4Material = new THREE.MeshPhongMaterial({ color: 0x000000 });
        var circle4 = new THREE.Mesh(circle4Geometry, circle4Material);

        circle4.rotation.set(-90 * (3.14 / 180), 0, 0, 'XYZ');
        circle4.position.z = -43;
        circle4.position.y = 15;
        circle4.position.x = 2.5;

        stove.add(circle);
        stove.add(circle2);
        stove.add(circle3);
        stove.add(circle4);

        var glassColor = new THREE.TextureLoader().load("images/window.png");

        var glassGeometry = new THREE.BoxGeometry(5, 10, 0.5);
        var glassMaterial = new THREE.MeshPhongMaterial({ map: glassColor });
        var glass = new THREE.Mesh(glassGeometry, glassMaterial);
        stove.add(glass);
        glass.rotation.set(0, 0, -90 * (3.14 / 180), 'XYZ');
        glass.position.z = -37.5;
        glass.position.y = 10;
        glass.position.x = -1;


        var glass2 = glass.clone();
        stove.add(glass2);
        glass2.position.y = 3.5;


        return stove;


    }



    //FUNCTIONS FOR LIVING ROOM

    //same method of use as the cabinet

    function addWardrobe(w, h, d) {


        var wardrobe = new THREE.Object3D();

        var woodColor = new THREE.TextureLoader().load("images/wadrobe.jpg");


        var materials = [];
        for (var i = 0; i < 6; i++) {
            materials.push(new THREE.MeshPhongMaterial({ map: woodColor }));
        }

        var warMat = new THREE.MeshFaceMaterial(materials);


        var handleColor = new THREE.TextureLoader().load("images/metal.jpg");

        var handleMat = new THREE.MeshPhongMaterial({ map: handleColor });



        var drawerB = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), warMat);
        drawerB.translateY(14);
        drawerB.translateX(-55);
        drawerB.translateZ(40);
        drawerB.castShadow = true;
        drawerB.receiveShadow = true;
        wardrobe.add(drawerB);


        var drawerF = new THREE.Mesh(new THREE.BoxGeometry(w, h, 5 * t), warMat);
        drawerF.translateY(14);
        drawerF.translateX(-45);
        drawerF.translateZ(48);

        drawerF.castShadow = true;
        drawerF.receiveShadow = true;
        wardrobe.add(drawerF);

        var drawerF1 = drawerF.clone();
        drawerF.translateZ(-15);
        drawerF1.castShadow = true;
        drawerF1.receiveShadow = true;
        wardrobe.add(drawerF1);


        var drawerR = new THREE.Mesh(new THREE.BoxGeometry(w, h, 3.5 * t), warMat);
        drawerR.translateY(14);
        drawerR.translateX(-50);
        drawerR.translateZ(55);
        drawerR.rotation.set(0, -90 * (3.14 / 180), 0, 'XYZ');


        drawerF.castShadow = true;
        drawerF.receiveShadow = true;
        wardrobe.add(drawerR);

        var drawerL = drawerR.clone();

        drawerR.translateX(-30);

        drawerL.castShadow = true;
        drawerL.receiveShadow = true;
        wardrobe.add(drawerL);




        var drawerT = new THREE.Mesh(new THREE.BoxGeometry(w, h + 3.4, 3.5 * t), warMat);
        drawerT.translateY(27.8);
        drawerT.translateX(-50);
        drawerT.translateZ(40);
        drawerT.rotation.set(0, -90 * (3.14 / 180), -90 * (3.14 / 180), 'XYZ');


        drawerT.castShadow = true;
        drawerT.receiveShadow = true;
        wardrobe.add(drawerT);

        drawerBo = drawerT.clone();



        drawerBo.castShadow = true;
        drawerBo.receiveShadow = true;
        drawerBo.translateX(27);
        wardrobe.add(drawerBo);


        var handle = new THREE.Mesh(new THREE.TorusGeometry(2, 0.5, 4, 5), handleMat);
        wardrobe.add(handle);


        handle.translateY(15);
        handle.translateX(-46);
        handle.translateZ(38);

        var handle2 = handle.clone();
        handle2.translateZ(5);
        wardrobe.add(handle2);
        wardrobe.castShadow = true;
        wardrobe.receiveShadow = false;
        return wardrobe;

    }

    function drawDoor(w, h, d) {
        var topW = w;
        var topH = 0.1 * h;
        var topD = d;

        var door = new THREE.Object3D();

        //create a wood material
        var woodColor = new THREE.TextureLoader().load("images/wood.jpg");
        woodColor.min_filter = THREE.LinearFilter;
        woodColor.mag_filter = THREE.LinearFilter;

        var doorMaterial = new THREE.MeshLambertMaterial({ map: woodColor });
        //bumpMap: woodBump,
        //bumpScale: 0.5});


        doorGeom = new THREE.BoxGeometry(topW, topH, topD);
        doorMesh = new THREE.Mesh(doorGeom, doorMaterial);

        var doorKnobColor = new THREE.TextureLoader().load("images/tile.jpg");
        doorKnobColor.min_filter = THREE.LinearFilter;
        doorKnobColor.mag_filter = THREE.LinearFilter;

        geometry = new THREE.SphereGeometry(1, 50, 50, 0, Math.PI * 2, 0, Math.PI * 2);
        var doorKnobMaterial = new THREE.MeshLambertMaterial({ map: doorKnobColor });

        var doorKnobMesh = new THREE.Mesh(geometry, doorKnobMaterial);
        door.add(doorKnobMesh);
        doorKnobMesh.translateX(-6);
        doorKnobMesh.translateZ(-2);
        doorMesh.castShadow = true;
        doorMesh.receiveShadow = true;

        door.add(doorMesh);
        door.castShadow = true;
        door.receiveShadow = true;

        return door;

    }




    function addSofa(translation, sofaBackHeight, sofaDepth, sofaWidth, sofaSeatHeight, sofaFrameThickness) {
        var sofa = new THREE.Object3D();
        var woodColor = new THREE.TextureLoader().load("images/sofa.jpg");


        var materials = [];
        for (var i = 0; i < 6; i++) {
            materials.push(new THREE.MeshPhongMaterial({ map: woodColor }));
        }

        var sofaMat = new THREE.MeshFaceMaterial(materials);

        // sofaBack
        var sofaBack = new THREE.Mesh(new THREE.BoxGeometry(sofaWidth, sofaBackHeight, 3), sofaMat);
        sofaBack.position.x = translation.x + 0;
        sofaBack.position.y = translation.y - 2;
        sofaBack.position.z = translation.z - 4;

        sofaBack.castShadow = true;
        sofaBack.receiveShadow = true;
        sofaBack.rotation.set(-90 * (1 / 180), 0, 0, 'XYZ');
        sofa.add(sofaBack);
        // seat

        var seat = new THREE.Mesh(new THREE.BoxGeometry(sofaWidth, sofaFrameThickness, sofaDepth), sofaMat);
        seat.position.x = translation.x + 0;
        seat.position.y = translation.y + -(sofaBackHeight / 2 + sofaFrameThickness / 2);
        seat.position.z = translation.z + sofaDepth / 2 - sofaFrameThickness / 2;

        seat.castShadow = true;
        seat.receiveShadow = true;
        sofa.add(seat);


        return sofa;
    }


    //FUNCTIONS FOR TOILET
    function drawsink() {
        //create an array for the points
        var sink = new THREE.Object3D();

        var insidePoints = [];
        var outsidePoints = [];

        outsidePoints.push(new THREE.Vector3(0, 0, 0));
        outsidePoints.push(new THREE.Vector3(10, 0, 6));
        outsidePoints.push(new THREE.Vector3(7, 0, 6));
        outsidePoints.push(new THREE.Vector3(14.1, 3, 8));

        insidePoints.push(new THREE.Vector3(7.1, 0, 6.95));
        insidePoints.push(new THREE.Vector3(7, 0, 4.05));
        insidePoints.push(new THREE.Vector3(5, 0, 5.5));
        insidePoints.push(new THREE.Vector3(0, 0, 0));



        insideCurve = new THREE.CatmullRomCurve3(insidePoints);

        var numPoints = 50;
        var insideSplinePoints = insideCurve.getPoints(numPoints);


        //use geometry and curve to build the curve in the sink
        var insideGeometry = new THREE.LatheGeometry(insideSplinePoints, 60);

        var material = new THREE.MeshPhongMaterial({
            color: 0x99FFFF,
            shininess: 100,
            specular: 0x333333
        });
        var insidesink = new THREE.Mesh(insideGeometry, material);
        insidesink.castShadow = true;
        insidesink.reciveShadow = true;

        outsideCurve = new THREE.CatmullRomCurve3(outsidePoints);
        var outsideSplinePoints = outsideCurve.getPoints(numPoints);
        outsideCurve.castShadow = true;
        outsideCurve.reciveShadow = true;

        var outsideGeometry = new THREE.LatheGeometry(outsideSplinePoints, 60);

        var outsidesink = new THREE.Mesh(outsideGeometry, material);
        outsidesink.castShadow = true;
        outsidesink.reciveShadow = true;

        sink.add(insidesink);
        sink.add(outsidesink);

        return sink;

    }

    function addShower() {


        var shower = new THREE.Object3D();


        var handleColor = new THREE.TextureLoader().load("images/metal.jpg");

        var handleMat = new THREE.MeshPhongMaterial({ map: handleColor });

        //crete the base of the shower

        var bar = new THREE.Mesh(new THREE.BoxGeometry(6, 1, 1), handleMat);
        shower.add(bar);


        bar.translateY(30);
        bar.translateX(51);
        bar.translateZ(38);
        bar.castShadow = true;
        bar.receiveShadow = true;

        //create the head of the shower
        var cap = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 2, 2, 10), handleMat);
        shower.add(cap);

        cap.castShadow = true;
        cap.receiveShadow = true;
        cap.translateY(30);
        cap.translateX(47.5);
        cap.translateZ(38);
        cap.rotation.set(0, 0, -90 * (1.5 / 180), 'XYZ');

        //create the handle for the shower
        var handle = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), handleMat);
        shower.add(handle);


        handle.translateY(20);
        handle.translateX(52.8);
        handle.translateZ(35);
        handle.castShadow = true;
        handle.receiveShadow = true;

        var handle2 = handle.clone();
        shower.add(handle2);
        handle2.translateZ(7);

        shower.castShadow = true;
        shower.receiveShadow = true;

        return shower;

    }

    function draVideoBox() {
        var videoBox = new THREE.Object3D();
        var texture = new THREE.VideoTexture(video);
        texture.wrapS = texture.wrapT = THREE.ClampToEdgeWrapping;
        texture.minFilter = THREE.LinearFilter;
        material = new THREE.MeshBasicMaterial({ map: texture });
        videoBox.add(new THREE.Mesh(new THREE.BoxGeometry(5, 12.8, 22), material));
        return videoBox;
    }

    //FUNCTIONS FOR BEDROOM
    function drawBed(w, h, d) {
        //set up the proportions of the bed
        var legW = 0.1 * w;
        var legH = 0.8 * h;
        var legD = 0.1 * d;

        var topW = w;
        var topH = 0.5 * h;
        var topD = d;




        var bed = new THREE.Object3D();

        //create a wood material
        var woodColor = new THREE.TextureLoader().load("images/wood.jpg");
        woodColor.min_filter = THREE.LinearFilter;
        woodColor.mag_filter = THREE.LinearFilter;
        //var woodBump = new THREE.TextureLoader().load("images/wood-bw.jpg");
        var woodMaterial = new THREE.MeshLambertMaterial({ map: woodColor });
        //bumpMap: woodBump,
        //bumpScale: 0.5});
        var bedColor = new THREE.TextureLoader().load("images/fabric.jpg");
        bedColor.min_filter = THREE.LinearFilter;
        bedColor.mag_filter = THREE.LinearFilter;
        //var woodBump = new THREE.TextureLoader().load("images/wood-bw.jpg");
        var bedMaterial = new THREE.MeshLambertMaterial({ map: bedColor });


        //var woodBump = new THREE.TextureLoader().load("images/wood-bw.jpg");
        var pillowMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });

        // //create the geometry and mesh for the legs
        var legG = new THREE.BoxGeometry(legW, legH, legD);
        var leg1 = new THREE.Mesh(legG, woodMaterial);

        //translate so that the origin of the bed is at the center of the bed at
        //the bottom
        leg1.translateX((- w * 0.5) + (legW * 0.5));
        leg1.translateY(legH * 0.5);
        leg1.translateZ((- d * 0.5) + (legD * 0.5));

        bed.add(leg1);
        leg1.castShadow = true;
        leg1.receiveShadow = true;

        leg2 = leg1.clone();
        leg2.translateX(w - (legW));

        bed.add(leg2);
        leg2.castShadow = true;
        leg2.receiveShadow = true;

        leg3 = leg2.clone();
        leg3.translateZ(d - (legD));
        leg3.castShadow = true;
        leg3.receiveShadow = true;

        bed.add(leg3);

        leg4 = leg3.clone();
        leg3.translateX(-w + legW);
        leg4.castShadow = true;
        leg4.receiveShadow = true;

        bed.add(leg4);


        frameGeom = new THREE.BoxGeometry(topW, topH, topD);
        frame = new THREE.Mesh(frameGeom, woodMaterial);

        duvetGeom = new THREE.BoxGeometry(topW, topH, topD);
        duvet = new THREE.Mesh(duvetGeom, bedMaterial);

        pillowGeom = new THREE.BoxGeometry(12, 5, 3);
        pillow = new THREE.Mesh(pillowGeom, pillowMaterial);
        pillow.position.y = 11.5;
        pillow.position.x = -12;

        pillow.rotation.set(-90 * (3.14 / 180), 0, -90 * (3.14 / 180), 'XYZ');
        frame.castShadow = true;
        frame.receiveShadow = true;

        frame.translateY(legH + (topH * 0.5));

        duvet.translateY(legH + (topH * 1.5));


        //pillow.translateY(legH + (topH * 9))
        pillow.castShadow = true;
        pillow.receiveShadow = true;


        bed.add(frame);
        bed.add(duvet);
        bed.add(pillow);


        bed.castShadow = true;
        bed.receiveShadow = true;

        return bed;

    }






    function drawTable(w, h, d) {



        //set up the proportions of the bed
        var legW = 0.05 * w;
        var legH = 0.8 * h;
        var legD = 0.05 * d;

        var topW = w;
        var topH = 0.1 * h;
        var topD = d;




        var table = new THREE.Object3D();

        //create a wood material
        var woodColor = new THREE.TextureLoader().load("images/woodskin.png");
        woodColor.min_filter = THREE.LinearFilter;
        woodColor.mag_filter = THREE.LinearFilter;
        //var woodBump = new THREE.TextureLoader().load("images/wood-bw.jpg");
        var woodMaterial = new THREE.MeshPhongMaterial({ map: woodColor });
        //bumpMap: woodBump,
        //bumpScale: 0.5});


        // //create the geometry and mesh for the legs
        var legG = new THREE.BoxGeometry(legW, legH, legD);
        var leg1 = new THREE.Mesh(legG, woodMaterial);

        //translate so that the origin of the bed is at the center of the bed at
        //the bottom
        leg1.translateX((- w * 0.5) + (legW * 0.5));
        leg1.translateY(legH * 0.5);
        leg1.translateZ((- d * 0.5) + (legD * 0.5));

        table.add(leg1);
        leg1.castShadow = true;
        leg1.receiveShadow = true;

        leg2 = leg1.clone();
        leg2.translateX(w - (legW));

        table.add(leg2);
        leg2.castShadow = true;
        leg2.receiveShadow = true;

        leg3 = leg2.clone();
        leg3.translateZ(d - (legD));
        leg3.castShadow = true;
        leg3.receiveShadow = true;

        table.add(leg3);

        leg4 = leg3.clone();
        leg3.translateX(-w + legW);
        leg4.castShadow = true;
        leg4.receiveShadow = true;

        table.add(leg4);


        toptableGeom = new THREE.BoxGeometry(topW, topH, topD);
        toptable = new THREE.Mesh(toptableGeom, woodMaterial);

        toptable.castShadow = true;
        toptable.receiveShadow = true;

        toptable.translateY(legH + (topH * 0.5));



        table.add(toptable);
        table.castShadow = true;
        table.receiveShadow = true;

        return table;

    }

    function drawnoticeboard(w, h, d) {


        var topW = w;
        var topH = 0.1 * h;
        var topD = d;




        var noticeboard = new THREE.Object3D();

        var woodColor = new THREE.TextureLoader().load("images/woodskin.jpg");
        woodColor.min_filter = THREE.LinearFilter;
        woodColor.mag_filter = THREE.LinearFilter;
        var woodMaterial = new THREE.MeshLambertMaterial({ map: woodColor });



        noticeboardG = new THREE.BoxGeometry(topW, topH, topD);
        noticeboardM = new THREE.Mesh(noticeboardG, woodMaterial);

        noticeboardM.castShadow = true;
        noticeboardM.receiveShadow = true;



        noticeboard.add(noticeboardM);
        noticeboard.castShadow = true;
        noticeboard.receiveShadow = true;

        return noticeboard;

    }


    function addChair(translation, chairBackHeight, chairDepth, chairWidth, chairSeatHeight, chairFrameThickness) {
        var chair = new THREE.Object3D();
        var woodColor = new THREE.TextureLoader().load("images/woodskin.png");
        var materials = [];
        for (var i = 0; i < 6; i++) {
            materials.push(new THREE.MeshPhongMaterial({ map: woodColor }));
        }

        var chairMat = new THREE.MeshFaceMaterial(materials);
        // back
        var back = new THREE.Mesh(new THREE.BoxGeometry(chairWidth, chairBackHeight, chairFrameThickness), chairMat);
        back.position.x = translation.x + 0;
        back.position.y = translation.y + 0;
        back.position.z = translation.z + 0;


        back.castShadow = true;
        back.receiveShadow = true;
        chair.add(back);
        // seat
        var seat = new THREE.Mesh(new THREE.BoxGeometry(chairWidth, chairFrameThickness, chairDepth), chairMat);
        seat.position.x = translation.x + 0;
        seat.position.y = translation.y + -(chairBackHeight / 2 + chairFrameThickness / 2);
        seat.position.z = translation.z + chairDepth / 2 - chairFrameThickness / 2;

        seat.castShadow = true;
        seat.receiveShadow = true;
        chair.add(seat);
        // legs
        var leg1 = new THREE.Mesh(new THREE.BoxGeometry(chairFrameThickness, chairSeatHeight, chairFrameThickness), chairMat);
        leg1.position.x = translation.x + (chairFrameThickness - chairWidth) / 2;
        leg1.position.y = translation.y + -(chairBackHeight / 2 + chairSeatHeight / 2 + chairFrameThickness);
        leg1.position.z = translation.z + 0;
        //cube.overdraw = true;
        leg1.castShadow = true;
        leg1.receiveShadow = true;
        chair.add(leg1);

        var leg2 = new THREE.Mesh(new THREE.BoxGeometry(chairFrameThickness, chairSeatHeight, chairFrameThickness), chairMat);
        leg2.position.x = translation.x + (chairWidth - chairFrameThickness) / 2;
        leg2.position.y = translation.y + -(chairBackHeight / 2 + chairSeatHeight / 2 + chairFrameThickness);
        leg2.position.z = translation.z + 0;

        leg2.castShadow = true;
        leg2.receiveShadow = true;
        chair.add(leg2);

        var leg3 = new THREE.Mesh(new THREE.BoxGeometry(chairFrameThickness, chairSeatHeight, chairFrameThickness), chairMat);
        leg3.position.x = translation.x + (chairWidth - chairFrameThickness) / 2;
        leg3.position.y = translation.y + -(chairBackHeight / 2 + chairSeatHeight / 2 + chairFrameThickness);
        leg3.position.z = translation.z + chairDepth - chairFrameThickness;

        leg3.castShadow = true;
        leg3.receiveShadow = true;
        chair.add(leg3);

        var leg4 = new THREE.Mesh(new THREE.BoxGeometry(chairFrameThickness, chairSeatHeight, chairFrameThickness), chairMat);
        leg4.position.x = translation.x + (chairFrameThickness - chairWidth) / 2;
        leg4.position.y = translation.y + -(chairBackHeight / 2 + chairSeatHeight / 2 + chairFrameThickness);
        leg4.position.z = translation.z + chairDepth - chairFrameThickness;
        leg4.castShadow = true;
        leg4.receiveShadow = true;
        chair.add(leg4);

        return chair;
    }


















    //House Walls

    //Front
    function frontMiddleWall() {


        var materials = [
            createMaterial('images/wall_t.jpg'), // right
            createMaterial('images/wall_t.jpg'), // left
            createMaterial('images/wall_t.jpg'), // top
            createMaterial('images/wall_t.jpg'), // bottom
            createMaterial('images/wall_t.jpg'), // back
            createMaterial('images/wall_t.jpg')  // front
        ];


        var mesh1 = new THREE.Mesh(new THREE.BoxGeometry(23 * l, 14 * h, 2 * t), new THREE.MeshFaceMaterial(materials));
        //mesh.scale.set(1,1,-1)
        mesh1.position.z = -18.5 * p;
        mesh1.position.y = 7 * p;
        mesh1.position.x = -1 * p;
        mesh1.receiveShadow = true;
        mesh1.castShadow = true;
        // scene.add(mesh);
        mesh.add(mesh1);
    }



    function frontBottomWindowWallpaper() {
        var tex = new THREE.TextureLoader().load('images/wall1t.jpg');
        tex.wrapS = THREE.RepeatWrapping;
        tex.wrapT = THREE.RepeatWrapping;


        var geometry = new THREE.BoxGeometry(7.7 * l, 6 * h, 0.1 * t);
        var material = new THREE.MeshLambertMaterial({ map: tex });
        var mesh1 = new THREE.Mesh(geometry, material);


        tex.repeat.set(1, 0.3);

        mesh1.position.z = -17.5 * p;
        mesh1.position.y = 3 * p;
        mesh1.position.x = 14.2 * p;
        mesh1.receiveShadow = true;
        mesh1.castShadow = true;
        // scene.add(mesh);
        mesh.add(mesh1);
    }

    function frontTopWindowWall() {
        var tex = new THREE.TextureLoader().load('images/wall_t.jpg');
        tex.wrapS = THREE.RepeatWrapping;
        tex.wrapT = THREE.RepeatWrapping;


        var geometry = new THREE.BoxGeometry(7.7 * l, 4 * h, 2 * t);
        var material = new THREE.MeshLambertMaterial({ map: tex });
        var mesh1 = new THREE.Mesh(geometry, material);


        tex.repeat.set(1, 0.3);

        mesh1.position.z = -18.5 * p;
        mesh1.position.y = 12 * p;
        mesh1.position.x = 14.2 * p;
        mesh1.receiveShadow = true;
        mesh1.castShadow = true;
        // scene.add(mesh);
        mesh.add(mesh1);
    }

    function frontBottomWindowWall() {
        var tex = new THREE.TextureLoader().load('images/wall_t.jpg');
        tex.wrapS = THREE.RepeatWrapping;
        tex.wrapT = THREE.RepeatWrapping;

        var geometry = new THREE.BoxGeometry(7.7 * l, 6 * h, 2 * t);
        var material = new THREE.MeshLambertMaterial({ map: tex });
        var mesh1 = new THREE.Mesh(geometry, material);


        tex.repeat.set(1, 0.3);

        mesh1.position.z = -18.5 * p;
        mesh1.position.y = 3 * p;
        mesh1.position.x = 14.2 * p;
        mesh1.receiveShadow = true;
        mesh1.castShadow = true;
        mesh.add(mesh1);
        // scene.add(mesh);
    }

    function frontTopDoorWall() {
        var tex = new THREE.TextureLoader().load('images/wall_t.jpg');
        tex.wrapS = THREE.RepeatWrapping;
        tex.wrapT = THREE.RepeatWrapping;

        var geometry = new THREE.BoxGeometry(8.5 * l, 4 * h, 2 * t);
        var material = new THREE.MeshLambertMaterial({ map: tex });
        var mesh1 = new THREE.Mesh(geometry, material);

        tex.repeat.set(1, 0.3);

        mesh1.position.z = -18.5 * p;
        mesh1.position.y = 12 * p;
        mesh1.position.x = -15 * p;
        mesh1.receiveShadow = true;
        mesh1.castShadow = true;
        mesh.add(mesh1);
        // scene.add(mesh1);
    }


    //Right
    function rightWall() {

        var materials = [
            createMaterial('images/wall_t.jpg'), // right
            createMaterial('images/wall_t.jpg'), // left
            createMaterial('images/wall_t.jpg'), // top
            createMaterial('images/wall_t.jpg'), // bottom
            createMaterial('images/wall1t.jpg'), // back
            createMaterial('images/wall_t.jpg')  // front
        ];

        var mesh1 = new THREE.Mesh(new THREE.BoxGeometry(39 * l, 14 * h, 2 * t), new THREE.MeshFaceMaterial(materials));
        //mesh1.scale.set(1,1,-1)
        mesh1.rotation.set(0, -90 * (3.14 / 180), 0, 'XYZ');
        mesh1.position.z = 0 * p;
        mesh1.position.y = 7 * p;
        mesh1.position.x = 18.8 * p;
        mesh1.receiveShadow = true;
        mesh1.castShadow = true;
        mesh.add(mesh1);
    }

    //Left
    function leftWall() {

        var materials = [
            createMaterial('images/wall_t.jpg'), // right
            createMaterial('images/wall_t.jpg'), // left
            createMaterial('images/wall_t.jpg'), // top
            createMaterial('images/wall_t.jpg'), // bottom
            createMaterial('images/wall_t.jpg'), // back
            createMaterial('images/livingRoom.jpg')  // front
        ];

        var mesh1 = new THREE.Mesh(new THREE.BoxGeometry(39 * l, 14 * h, 2 * t), new THREE.MeshFaceMaterial(materials));
        //mesh1.scale.set(1,1,-1)
        mesh1.rotation.set(0, -90 * (3.14 / 180), 0, 'XYZ');
        mesh1.position.z = 0 * p;
        mesh1.position.y = 7 * p;
        mesh1.position.x = -18.8 * p;
        mesh1.receiveShadow = true;
        mesh1.castShadow = true;
        mesh.add(mesh1);
    }

    //Back
    function backBottomWall() {
        var tex = new THREE.TextureLoader().load('images/wall_t.jpg');
        tex.wrapS = THREE.RepeatWrapping;
        tex.wrapT = THREE.RepeatWrapping;

        var geometry = new THREE.BoxGeometry(40 * l, 6 * h, 2 * t);
        var material = new THREE.MeshLambertMaterial({ map: tex });
        var mesh1 = new THREE.Mesh(geometry, material);

        tex.repeat.set(1, 0.4);

        mesh1.position.z = 20 * p;
        mesh1.position.y = 3 * p
        mesh1.position.x = 0 * p;
        mesh1.receiveShadow = true;
        mesh1.castShadow = true;
        mesh.add(mesh1);
    }

    function backTopWall() {
        var tex = new THREE.TextureLoader().load('images/wall_t.jpg');
        tex.wrapS = THREE.RepeatWrapping;
        tex.wrapT = THREE.RepeatWrapping;

        var geometry = new THREE.BoxGeometry(40 * l, 3 * h, 2 * t);
        var material = new THREE.MeshLambertMaterial({ map: tex });
        var mesh1 = new THREE.Mesh(geometry, material);

        tex.repeat.set(1, 0.3);

        mesh1.position.z = 20 * p;
        mesh1.position.y = 12.5 * p;
        mesh1.position.x = 0 * p;
        mesh1.receiveShadow = true;
        mesh1.castShadow = true;
        mesh.add(mesh1);
    }

    //Kitchen
    //Front
    function kitchenRoomWindow() {
        var tex = new THREE.TextureLoader().load('images/window.png');
        tex.wrapS = THREE.RepeatWrapping;
        tex.wrapT = THREE.RepeatWrapping;

        var geometry = new THREE.BoxGeometry(12 * l, 5 * h, 0.5 * t);
        var material = new THREE.MeshPhongMaterial({ map: tex, transparent: true, opacity: 1, });
        var mesh1 = new THREE.Mesh(geometry, material);

        mesh1.position.z = 20 * p;
        mesh1.position.y = 8.5 * p;
        mesh1.position.x = -1 * p;
        mesh1.receiveShadow = true;
        mesh1.castShadow = true;
        mesh.add(mesh1);
    }

    function frontKitchenWallpaper() {

        var tex = new THREE.TextureLoader().load('images/tile.jpg');
        tex.wrapS = THREE.RepeatWrapping;
        tex.wrapT = THREE.RepeatWrapping;

        var geometry = new THREE.BoxGeometry(10 * l, 14 * h, 0.1 * t);
        var material = new THREE.MeshLambertMaterial({ map: tex });
        var mesh1 = new THREE.Mesh(geometry, material);

        mesh1.position.z = -17.5 * p;
        mesh1.position.y = 7 * p;
        mesh1.position.x = 0 * p;
        mesh1.receiveShadow = true;
        mesh1.castShadow = true;
        mesh.add(mesh1);
    }

    //Right side
    function kitchenWall() {
        var materials = [
            createMaterial('images/wall_t.jpg'), // right
            createMaterial('images/wall_t.jpg'), // left
            createMaterial('images/wall_t.jpg'), // top
            createMaterial('images/wall_t.jpg'), // bottom
            createMaterial('images/livingRoom.jpg'), // back
            createMaterial('images/tile.jpg')  // front
        ];

        var mesh1 = new THREE.Mesh(new THREE.BoxGeometry(28 * l, 14 * h, 0.5 * t), new THREE.MeshFaceMaterial(materials));
        //mesh1.scale.set(1,1,-1)
        mesh1.rotation.set(0, -90 * (3.14 / 180), 0, 'XYZ');
        mesh1.position.z = -3.5 * p;
        mesh1.position.y = 7 * p;
        mesh1.position.x = -5 * p;
        mesh.add(mesh1);
        mesh1.receiveShadow = true;
        mesh1.castShadow = true;
    }

    //backside
    function backTopKitchenWallpaper() {
        var tex = new THREE.TextureLoader().load('images/tile.jpg');
        tex.wrapS = THREE.RepeatWrapping;
        tex.wrapT = THREE.RepeatWrapping;

        var geometry = new THREE.BoxGeometry(11 * l, 3 * h, 0.1 * t);
        var material = new THREE.MeshLambertMaterial({ map: tex });
        var mesh1 = new THREE.Mesh(geometry, material);

        tex.repeat.set(1, 0.3);

        mesh1.position.z = 19 * p;
        mesh1.position.y = 12.5 * p;
        mesh1.position.x = -0.5 * p;
        mesh1.receiveShadow = true;
        mesh1.castShadow = true;

        mesh.add(mesh1);
    }

    function backBottomKitchenWallpaper() {
        var tex = new THREE.TextureLoader().load('images/tile.jpg');
        tex.wrapS = THREE.RepeatWrapping;
        tex.wrapT = THREE.RepeatWrapping;

        var geometry = new THREE.BoxGeometry(11 * l, 6 * h, 0.1 * t);
        var material = new THREE.MeshLambertMaterial({ map: tex });
        var mesh1 = new THREE.Mesh(geometry, material);

        tex.repeat.set(1, 0.4);

        mesh1.position.z = 19 * p;
        mesh1.position.y = 3 * p;
        mesh1.position.x = -0.5 * p;
        mesh1.receiveShadow = true;
        mesh1.castShadow = true;
        mesh.add(mesh1);
    }


    //Living Room
    //Front
    function livingRoomWindow() {
        var tex = new THREE.TextureLoader().load('images/window.png');
        tex.wrapS = THREE.RepeatWrapping;
        tex.wrapT = THREE.RepeatWrapping;

        var geometry = new THREE.BoxGeometry(7 * l, 5 * h, 0.5 * t);
        var material = new THREE.MeshPhongMaterial({ map: tex, transparent: true, opacity: 1, });
        var mesh1 = new THREE.Mesh(geometry, material);

        mesh1.position.z = 20 * p;
        mesh1.position.y = 8.5 * p;
        mesh1.position.x = -13 * p;
        mesh1.receiveShadow = true;
        mesh1.castShadow = true;
        mesh.add(mesh1);
    }

    function frontLivingRoomWallpaper() {

        var tex = new THREE.TextureLoader().load('images/livingRoom.jpg');
        tex.wrapS = THREE.RepeatWrapping;
        tex.wrapT = THREE.RepeatWrapping;

        var geometry = new THREE.BoxGeometry(7.6 * l, 14 * h, 0.1 * t);
        var material = new THREE.MeshLambertMaterial({ map: tex });
        var mesh1 = new THREE.Mesh(geometry, material);

        mesh1.position.z = -17.5 * p;
        mesh1.position.y = 7 * p;
        mesh1.position.x = -8.7 * p;
        mesh1.receiveShadow = true;
        mesh1.castShadow = true;
        mesh.add(mesh1);
    }

    function frontDoorWallpaper() {
        var tex = new THREE.TextureLoader().load('images/livingRoom.jpg');
        tex.wrapS = THREE.RepeatWrapping;
        tex.wrapT = THREE.RepeatWrapping;

        var geometry = new THREE.BoxGeometry(5.4 * l, 4 * h, 0.1 * t);
        var material = new THREE.MeshLambertMaterial({ map: tex });
        var mesh1 = new THREE.Mesh(geometry, material);

        tex.repeat.set(1, 0.3);

        mesh1.position.z = -17.5 * p;
        mesh1.position.y = 12 * p;
        mesh1.position.x = -15.1 * p;
        mesh1.receiveShadow = true;
        mesh1.castShadow = true;
        mesh.add(mesh1);
    }


    //Right side

    function livingRoomWall() {
        var materials = [
            createMaterial('images/wall_t.jpg'), // right
            createMaterial('images/wall_t.jpg'), // left
            createMaterial('images/wall_t.jpg'), // top
            createMaterial('images/wall_t.jpg'), // bottom
            createMaterial('images/tile.jpg'), // back
            createMaterial('images/wall1t.jpg')  // front
        ];

        var mesh1 = new THREE.Mesh(new THREE.BoxGeometry(14 * l, 14 * h, 0.5 * t), new THREE.MeshFaceMaterial(materials));
        //mesh1.scale.set(1,1,-1)
        mesh1.rotation.set(0, -90 * (3.14 / 180), 0, 'XYZ');
        mesh1.position.z = -10.5 * p;
        mesh1.position.y = 7 * p;
        mesh1.position.x = 5 * p;
        mesh1.receiveShadow = true;
        mesh1.castShadow = true;
        mesh.add(mesh1);
    }

    //backside
    function backBottomLivingRoomWallpaper() {
        var tex = new THREE.TextureLoader().load('images/livingRoom.jpg');
        tex.wrapS = THREE.RepeatWrapping;
        tex.wrapT = THREE.RepeatWrapping;

        var geometry = new THREE.BoxGeometry(12 * l, 6 * h, 0.1 * t);
        var material = new THREE.MeshLambertMaterial({ map: tex });
        var mesh1 = new THREE.Mesh(geometry, material);

        tex.repeat.set(1, 0.4);

        mesh1.position.z = 19 * p;
        mesh1.position.y = 3 * p;
        mesh1.position.x = -11.9 * p;
        mesh1.receiveShadow = true;
        mesh1.castShadow = true;
        mesh.add(mesh1);
    }

    function backTopLivingRoomWallpaper() {
        var tex = new THREE.TextureLoader().load('images/livingRoom.jpg');
        tex.wrapS = THREE.RepeatWrapping;
        tex.wrapT = THREE.RepeatWrapping;

        var geometry = new THREE.BoxGeometry(12 * l, 3 * h, 0.1 * t);
        var material = new THREE.MeshLambertMaterial({ map: tex });
        var mesh1 = new THREE.Mesh(geometry, material);

        tex.repeat.set(1, 0.3);

        mesh1.position.z = 19 * p;
        mesh1.position.y = 12.5 * p;
        mesh1.position.x = -11.9 * p;
        mesh1.receiveShadow = true;
        mesh1.castShadow = true;

        mesh.add(mesh1);
    }

    function backLivingRoomWindowWall() {
        var materials = [
            createWallMaterial('images/wall_t.jpg'), // right
            createWallMaterial('images/wall_t.jpg'), // left
            createWallMaterial('images/wall_t.jpg'), // top
            createWallMaterial('images/wall_t.jpg'), // bottom
            createWallMaterial('images/wall_t.jpg'), // back
            createWallMaterial('images/livingRoom.jpg')  // front
        ];

        var mesh1 = new THREE.Mesh(new THREE.BoxGeometry(4 * l, 5 * h, 2 * t), new THREE.MeshFaceMaterial(materials));
        //mesh1.scale.set(1,1,-1)

        mesh1.position.z = 20 * p;
        mesh1.position.y = 8.5 * p;
        mesh1.position.x = -8.1 * p;
        mesh.add(mesh1);
        mesh1.receiveShadow = true;
        mesh1.castShadow = true;
    }

    function backLeftWindowWall() {

        var materials = [
            createWallMaterial('images/wall_t.jpg'), // right
            createWallMaterial('images/wall_t.jpg'), // left
            createWallMaterial('images/wall_t.jpg'), // top
            createWallMaterial('images/wall_t.jpg'), // bottom
            createWallMaterial('images/wall_t.jpg'), // back
            createWallMaterial('images/livingRoom.jpg')  // front
        ];

        var mesh1 = new THREE.Mesh(new THREE.BoxGeometry(4 * l, 5 * h, 2 * t), new THREE.MeshFaceMaterial(materials));
        //mesh1.scale.set(1,1,-1)

        mesh1.position.z = 20 * p;
        mesh1.position.y = 8.5 * p;
        mesh1.position.x = -18 * p;
        mesh.add(mesh1);
        mesh1.receiveShadow = true;
        mesh1.castShadow = true;
    }

    // Toilet
    function toiletWindow() {
        var tex = new THREE.TextureLoader().load('images/window.png');
        tex.wrapS = THREE.RepeatWrapping;
        tex.wrapT = THREE.RepeatWrapping;

        var geometry = new THREE.BoxGeometry(7.8 * l, 5 * h, 0.5 * t);
        var material = new THREE.MeshPhongMaterial({ map: tex, transparent: true, opacity: 1, });
        var mesh1 = new THREE.Mesh(geometry, material);

        mesh1.position.z = 20 * p;
        mesh1.position.y = 8.5 * p;
        mesh1.position.x = 13 * p;
        mesh1.receiveShadow = true;
        mesh1.castShadow = true;
        mesh.add(mesh1);
    }

    //left
    function toiletWall() {
        var materials = [
            createMaterial('images/wall_t.jpg'), // right
            createMaterial('images/wall_t.jpg'), // left
            createMaterial('images/wall_t.jpg'), // top
            createMaterial('images/wall_t.jpg'), // bottom
            createMaterial('images/tile.jpg'), // back
            createMaterial('images/toilet.jpg')  // front
        ];

        var mesh1 = new THREE.Mesh(new THREE.BoxGeometry(18 * l, 14 * h, 0.5 * t), new THREE.MeshFaceMaterial(materials));
        //mesh1.scale.set(1,1,-1)
        mesh1.rotation.set(0, -90 * (3.14 / 180), 0, 'XYZ');
        mesh1.position.z = 10 * p;
        mesh1.position.y = 7 * p;
        mesh1.position.x = 5 * p;
        mesh1.receiveShadow = true;
        mesh1.castShadow = true;
        mesh.add(mesh1);
    }

    //Right
    function rToiletWallpaper() {
        var materials = [
            createMaterial('images/wall_t.jpg'), // right
            createMaterial('images/wall_t.jpg'), // left
            createMaterial('images/wall_t.jpg'), // top
            createMaterial('images/wall_t.jpg'), // bottom
            createMaterial('images/toilet.jpg'), // back
            createMaterial('images/wall_t.jpg')  // front
        ];

        var mesh1 = new THREE.Mesh(new THREE.BoxGeometry(14 * l, 14 * h, 0.1 * t), new THREE.MeshFaceMaterial(materials));

        mesh1.rotation.set(0, -90 * (3.14 / 180), 0, 'XYZ');
        mesh1.position.z = 12.5 * p;
        mesh1.position.y = 7 * p;
        mesh1.position.x = 17.8 * p;
        mesh1.receiveShadow = true;
        mesh1.castShadow = true;
        mesh.add(mesh1);
    }

    //backside
    function backTopToiletWallpaper() {
        var tex = new THREE.TextureLoader().load('images/toilet.jpg');
        tex.wrapS = THREE.RepeatWrapping;
        tex.wrapT = THREE.RepeatWrapping;


        var geometry = new THREE.BoxGeometry(15 * l, 3 * h, 0.1 * t);
        var material = new THREE.MeshLambertMaterial({ map: tex });
        var mesh1 = new THREE.Mesh(geometry, material);
        tex.repeat.set(1, 0.3);

        mesh1.position.z = 19 * p;
        mesh1.position.y = 12.5 * p;
        mesh1.position.x = 12.5 * p;
        mesh1.receiveShadow = true;
        mesh1.castShadow = true;
        mesh.add(mesh1);
    }


    function backBottomToiletWallpaper() {
        var tex = new THREE.TextureLoader().load('images/toilet.jpg');
        tex.wrapS = THREE.RepeatWrapping;
        tex.wrapT = THREE.RepeatWrapping;


        var geometry = new THREE.BoxGeometry(15 * l, 6 * h, 0.1 * t);
        var material = new THREE.MeshLambertMaterial({ map: tex });
        var mesh1 = new THREE.Mesh(geometry, material);
        tex.repeat.set(1, 0.4);

        mesh1.position.z = 19 * p;
        mesh1.position.y = 3 * p;
        mesh1.position.x = 12.5 * p;
        mesh1.receiveShadow = true;
        mesh1.castShadow = true;
        mesh.add(mesh1);
    }


    function backToiletRoomWindowWall() {
        var materials = [
            createWallMaterial('images/wall_t.jpg'), // right
            createWallMaterial('images/wall_t.jpg'), // left
            createWallMaterial('images/wall_t.jpg'), // top
            createWallMaterial('images/wall_t.jpg'), // bottom
            createWallMaterial('images/wall_t.jpg'), // back
            createWallMaterial('images/toilet.jpg')  // front
        ];

        var mesh1 = new THREE.Mesh(new THREE.BoxGeometry(4 * l, 5 * h, 2 * t), new THREE.MeshFaceMaterial(materials));
        //mesh1.scale.set(1,1,-1)
        mesh1.position.z = 20 * p;
        mesh1.position.y = 8.5 * p;
        mesh1.position.x = 7.1 * p;
        mesh.add(mesh1);
        mesh1.receiveShadow = true;
        mesh1.castShadow = true;
    }

    function backRightWindowWall() {

        var materials = [
            createWallMaterial('images/wall_t.jpg'), // right
            createWallMaterial('images/wall_t.jpg'), // left
            createWallMaterial('images/wall_t.jpg'), // top
            createWallMaterial('images/wall_t.jpg'), // bottom
            createWallMaterial('images/wall_t.jpg'), // back
            createWallMaterial('images/toilet.jpg')  // front
        ];


        var mesh1 = new THREE.Mesh(new THREE.BoxGeometry(4 * l, 5 * h, 2 * t), new THREE.MeshFaceMaterial(materials));
        mesh1.position.z = 20 * p;
        mesh1.position.y = 8.5 * p;
        mesh1.position.x = 18 * p;;
        mesh.add(mesh1);
        mesh1.receiveShadow = true;
        mesh1.castShadow = true;
    }



    //Bedroom
    //Front
    function frontBedroomWallpaper() {

        var tex = new THREE.TextureLoader().load('images/wall1t.jpg');
        tex.wrapS = THREE.RepeatWrapping;
        tex.wrapT = THREE.RepeatWrapping;


        var geometry = new THREE.BoxGeometry(5.4 * l, 14 * h, 0.1 * t);
        var material = new THREE.MeshLambertMaterial({ map: tex });
        var mesh1 = new THREE.Mesh(geometry, material);



        mesh1.position.z = -17.5 * p;
        mesh1.position.y = 7 * p;
        mesh1.position.x = 7.7 * p;
        mesh1.receiveShadow = true;
        mesh1.castShadow = true;
        mesh.add(mesh1);
    }

    function frontBottomWindowWallpaper() {
        var tex = new THREE.TextureLoader().load('images/wall1t.jpg');
        tex.wrapS = THREE.RepeatWrapping;
        tex.wrapT = THREE.RepeatWrapping;


        var geometry = new THREE.BoxGeometry(7.7 * l, 6 * h, 0.1 * t);
        var material = new THREE.MeshLambertMaterial({ map: tex });
        var mesh1 = new THREE.Mesh(geometry, material);


        tex.repeat.set(1, 0.3);

        mesh1.position.z = -17.5 * p;
        mesh1.position.y = 3 * p;
        mesh1.position.x = 14.2 * p;
        mesh1.receiveShadow = true;
        mesh1.castShadow = true;
        mesh.add(mesh1);
    }

    function frontTopWindowWallpaper() {
        var tex = new THREE.TextureLoader().load('images/wall1t.jpg');
        tex.wrapS = THREE.RepeatWrapping;//repeat the texture
        tex.wrapT = THREE.RepeatWrapping;


        var geometry = new THREE.BoxGeometry(7.7 * l, 4 * h, 0.1 * t);
        var material = new THREE.MeshLambertMaterial({ map: tex });
        var mesh1 = new THREE.Mesh(geometry, material);


        tex.repeat.set(1, 0.3);//repeat the texture by 1 vertical and 0.3 horizontal

        mesh1.position.z = -17.5 * p;
        mesh1.position.y = 12 * p;
        mesh1.position.x = 14.2 * p;
        mesh1.receiveShadow = true;
        mesh1.castShadow = true;
        mesh.add(mesh1);
    }
    //Back
    function toiletSmallWall() {

        var materials = [
            createMaterial('images/wall_t.jpg'), // right
            createMaterial('images/wall_t.jpg'), // left
            createMaterial('images/wall_t.jpg'), // top
            createMaterial('images/wall_t.jpg'), // bottom
            createMaterial('images/toilet.jpg'), // back
            createMaterial('images/wall1t.jpg')  // front
        ];

        var mesh1 = new THREE.Mesh(new THREE.BoxGeometry(7 * l, 14 * h, 0.5 * t), new THREE.MeshFaceMaterial(materials));

        mesh1.position.z = 5.5 * p;
        mesh1.position.y = 7 * p;
        mesh1.position.x = 14.3 * p;
        mesh1.receiveShadow = true;
        mesh1.castShadow = true;
        mesh.add(mesh1);
    }

    function bedRoomWindow() {


        var tex = new THREE.TextureLoader().load('images/window.png');
        tex.wrapS = THREE.RepeatWrapping;
        tex.wrapT = THREE.RepeatWrapping;

        var geometry = new THREE.BoxGeometry(8 * l, 5 * h, 0.5 * t);
        var material = new THREE.MeshPhongMaterial({ map: tex, transparent: true, opacity: 1 });
        var mesh1 = new THREE.Mesh(geometry, material);

        mesh1.position.z = -18.5 * p;
        mesh1.position.y = 8.5 * p;
        mesh1.position.x = 14 * p;
        mesh1.receiveShadow = true;
        mesh1.castShadow = true;
        mesh.add(mesh1);
    }



    //Right side

    function rBedRoomWallpaper() {

        //create face material so that we can apply images to each side of the geometry
        var materials = [
            createMaterial('images/wall1t.jpg'), // right
            createMaterial('images/wall1t.jpg'), // left
            createMaterial('images/wall1t.jpg'), // top
            createMaterial('images/wall1t.jpg'), // bottom
            createMaterial('images/wall1t.jpg'), // back
            createMaterial('images/wall1t.jpg')  // front
        ];


        var mesh1 = new THREE.Mesh(new THREE.BoxGeometry(24.9 * l, 14 * h, 0.1 * t), new THREE.MeshFaceMaterial(materials));
        //mesh1.scale.set(1,1,-1)
        mesh1.rotation.set(0, -90 * (3.14 / 180), 0, 'XYZ');
        mesh1.position.z = -7 * p;
        mesh1.position.y = 7 * p;
        mesh1.position.x = 17.8 * p;
        mesh1.receiveShadow = true;
        mesh1.castShadow = true;

        mesh.add(mesh1);

    }

    function drawRoof() {

        // Create a 2D triangular shape using the THREE.Shape();

        roof = new THREE.Object3D();
        var triangleShape = new THREE.Shape();
        triangleShape.moveTo(-2, -2);
        triangleShape.lineTo(0, 2);
        triangleShape.lineTo(2, -2);
        triangleShape.lineTo(-2, -2);

        var tex = new THREE.TextureLoader().load('images/roof.jpg');

        // Create a new geometry by extruding the triangleShape
        // The option: 'amount' is how far to extrude, 'bevelEnabled: false' prevents beveling
        var extrudedGeometry = new THREE.ExtrudeGeometry(triangleShape, { depth: 5, bevelEnabled: false });
        var extrudedMaterial = new THREE.MeshPhongMaterial({ map: tex });
        var extrudedMesh = new THREE.Mesh(extrudedGeometry, extrudedMaterial);
        tex.repeat.set(1, 1);
        extrudedMesh.translateY(24 * h);
        extrudedMesh.translateZ(-21.5 * p);
        roof.add(extrudedMesh);
        //scaling it to make the roof learger for the house
        extrudedMesh.scale.set(10 * l, 5 * h, 9 * t);
        extrudedMesh.castShadow = true;
        extrudedMesh.receiveShadow = true;


        return roof;
    }

    //animate the scene
    function animate() {

        requestAnimationFrame(animate);

        render();
        update();//update the partices

    }


    //create particle function for the rain
    function particleRain() {
        var tex = new THREE.TextureLoader().load('images/raindrop2flip.png');
        rain = new THREE.Object3D();
        var particleCount = 2800,//how much particles is going to be created
            particles = new THREE.Geometry(),
            pMaterial = new THREE.ParticleBasicMaterial({ map: tex, size: 3, color: 0x0000ff, transparent: true, opacity: 0.4 });

        // create the individual particles with random positions
        for (var p = 0; p < particleCount; p++) {

            var pX = Math.random() * 400 - 150,
                pY = Math.random() * 400 - 150,
                pZ = Math.random() * 400 - 150,
                particle = new THREE.Vector3(pX, pY, pZ);


            particles.vertices.push(particle);
        }

        // create the particle system

        particleSys = new THREE.ParticleSystem(
            particles,
            pMaterial);
        particleSys.sortParticles = true;
        // add it to the scene
        rain.add(particleSys);
        update();// use the update function to animate the rain

        return rain;
    }


    //animate the rain
    function update() {

        // add rotation to the particle
        particleSys.rotation.z += 0.01;

        var pCount = particleCount;
        while (pCount--) {

            // get particle and check for reset
            particle =
                particles.vertices[pCount];


            if (particle.position.y < -200) {
                particle.position.y = 200;
                particle.velocity.y = 0;
            }

            //random velocity update and add position
            particle.velocity.y -= Math.random() * .1;

            particle.position.addSelf(
                particle.velocity);
        }

        particleSys.
            geometry.
            __dirtyVertices = true;

    }

    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;//RESIZE THE WINDOW
        camera.updateProjectionMatrix();
        // renderer.setSize(window.innerWidth, window.innerHeight);
    }

    function render() {
        // controls.update(1);// UPDATE THE CONTROLLER TO RUN WITH THE FIRSTPERSONCONTROLLER
        // renderer.render(scene, camera);
    }

}