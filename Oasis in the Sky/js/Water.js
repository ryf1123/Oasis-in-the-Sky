var Lake = function () {
    this.mesh = new THREE.Group();
    this.mesh.name = "lake";
    var waterMat = new THREE.MeshPhongMaterial({
        color: 0x00aeff,
        emissive: 0x0023b9,
        shading: THREE.FlatShading,
        shininess: 60,
        specular: 30,
        transparent: true
    });
    
    var waterGeo = new THREE.PlaneGeometry(300, 250, 80, 80);
    for (var j = 0; j < waterGeo.vertices.length; j++) {
        waterGeo.vertices[j].x = waterGeo.vertices[j].x + Math.random() * Math.random() ;//* 0.02;
        waterGeo.vertices[j].y = waterGeo.vertices[j].y + Math.random() * Math.random() ;//* 0.02;
    }

    this.water = new THREE.Mesh(waterGeo, waterMat);
    this.water.rotation.x = -Math.PI / 2;
    //this.water.rotation.z = -Math.PI / 4;
    this.water.position.y = 87;
    this.mesh.add(this.water);
        //===================================================== add Light
    //this.light = new THREE.DirectionalLight(0xefefff, 1.5);
    //this.light.position.set(1, 96, 1).normalize();
    //this.mesh.add(this.light);
    //}


    this.count = 0;
    //function animate() {
    //Lake.prototype.animate = function () {
    //    //mouse move
    //    var i = 0;
    //    for (var ix = 0; ix < 100; ix++) {
    //        for (var iy = 0; iy < 100; iy++) {
    //            this.water.geometry.vertices[i++].z =
    //                Math.sin((ix + count) * 2) * 3 + Math.cos((iy + count) * 1.5) * 6;
    //            this.water.geometry.verticesNeedUpdate = true;
    //        }
    //    }

    //    count += 0.015;

    //    requestAnimationFrame(this.animate);

    //}


    //var scale_base = 0.3;
    //var lakeInfo = [[200, 103, 0], [scale_base, scale_base, scale_base], 0];

    //this.lake = new Draw_Lake();
    //this.lake.mesh.position.x = lakeInfo[0][0];
    //this.lake.mesh.position.y = lakeInfo[0][1];
    //this.lake.mesh.position.z = lakeInfo[0][2];
    //this.lake.mesh.scale.set(lakeInfo[1][0], lakeInfo[1][1], lakeInfo[1][2]);
    //this.lake.mesh.rotation.y = lakeInfo[2];
    //this.mesh.add(this.lake.mesh);
  
    //animate();
}

Lake.prototype.animate = function () {
    //mouse move
    var i = 0;
    for (var ix = 0; ix < 80; ix++) {
        for (var iy = 0; iy < 80; iy++) {
            
            this.water.geometry.vertices[i++].z =
                Math.sin((ix + this.count) * 2)*0.5  + Math.cos((iy + this.count) * 1.5) *2;
            this.water.geometry.verticesNeedUpdate = true;
        }
    }

    this.count += 0.015;

    //requestAnimationFrame(this.animate);

}