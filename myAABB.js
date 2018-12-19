/**
 * By ttx
 */

var myAABB = function ( boxloc ) {

    this.min_x = boxloc[0];
    this.max_x = boxloc[1];
    this.min_y = boxloc[2];
    this.max_y = boxloc[3];
    this.min_z = boxloc[4];
    this.max_z = boxloc[5];

    this.enabled = true;
    this.iscollision = false;
    // methods

    this.update = function ( new_boxloc) {
        this.min_x = new_boxloc[0];
        this.max_x = new_boxloc[1];
        this.min_y = new_boxloc[2];
        this.max_y = new_boxloc[3];
        this.min_z = new_boxloc[4];
        this.max_z = new_boxloc[5];
    };

    this.disable = function()
    {
        this.enabled = false;
    };

    this.enable = function () {
        this.enabled = true;
    };

    this.detect = function ( box ) {
        if  ((this.min_x >= box.min_x && this.min_x <= box.max_x) || (box.min_x >= this.min_x && box.min_x <= this.max_x))
            if((this.min_y >= box.min_y && this.min_y <= box.max_y) || (box.min_y >= this.min_y && box.min_y <= this.max_y))
             if((this.min_z >= box.min_z && this.min_z <= box.max_z) || (box.min_z >= this.min_z && box.min_z <= this.max_z))
        {
            this.iscollision = true;
        }
    };

    this.collisionOver = function () {
        this.iscollision = false;
    };

    return myAABB;

};


/*
*起初各轴旋转角vec = [0, 0, 0], 假设现在旋转角为 [x, y, z]
* 起初八个坐标为[center_x +- l/2 * l, center_y +- 1/2 * w, center_z +- 1/2 *h]
* 变幻后八个坐标通过变换矩阵可计算如下
*/
function calculateMyAABB (vec, center, l, w, h)
{
    var min_x,min_y,min_z,max_x,max_y,max_z;
    var x = l/2;
    var y = w/2;
    var z = h/2;
    var x_rx = x;
    var y_rx = Math.cos(vec[0]) * y - Math.sin(vec[0]) * z;
    var z_rx = Math.cos(vec[0]) * z + Math.sin(vec[0]) * y;
    var x_ry = Math.cos(vec[0]) * x_rx + Math.sin(vec[0]) * z_rx;
    var y_ry = y_rx;
    var z_ry = Math.cos(vec[0]) * z_rx - Math.sin(vec[0]) * x_rx;
    var x_rz = Math.cos(vec[0]) * x_ry - Math.sin(vec[0]) * y_ry;
    var y_rz = Math.cos(vec[0]) * y_ry + Math.sin(vec[0]) * x_ry;
    var z_rz = z_ry;
    if(x_rz > 0) {
        min_x = center[0] - x_rz;
        max_x = center[0] + x_rz;
    }
    else
    {
        min_x = center[0] + x_rz;
        max_x = center[0] - x_rz;
    }
    if(y_rz > 0) {
        min_y = center[1] - y_rz;
        max_y = center[1] + y_rz;
    }
    else
    {
        min_y = center[1] + y_rz;
        max_y = center[1] - y_rz;
    }
    if(z_rz > 0) {
        min_z = center[2] - z_rz;
        max_z = center[2] + z_rz;
    }
    else
    {
        min_z = center[2] + z_rz;
        max_z = center[2] - z_rz;
    }
    return [min_x,max_x,min_y,max_y,min_z,max_z];
}
