# Some Tips

> 首先这个pro肯定比我们想的要难，时间也很紧张，需要大家都投入进来



### 得分点保平安

####基本

1. 基于OpenGL/WebGL，具有<u>基本体素</u>(立方体、球、圆柱、圆锥、多面棱 柱、多面棱台)的建模表达能力; 

2. 具有基本三维网格模型<u>导入导出</u>功能(建议OBJ或DAE格式);
   **注意：查了查发现GLTF这个格式现在比较热门**
3. 具有<u>基本材质、纹理的显示和编辑能力</u>;
4.  具有基本几何变换功能(<u>旋转、平移、缩放</u>等);
5. <u>基本光照明模型</u>要求，并实现基本的光源编辑(如调整光源的位置，光强等参数); 
6. 能对建模后场景进行漫游如<u>Zoom In/Out, Pan, Orbit, Zoom To Fit</u>等观察功能。 
7. 能够提供动画播放功能(多帧数据连续绘制)，能够提供<u>屏幕截取/保存</u>功能。 

#### 高级

1. 具有NURBS曲面建模能力

2. 漫游时可实时<u>碰撞检测</u>

3. 光照明模型细化，可任选实现实时阴影、caustic、位移纹理、全局光照明(光子跟踪)、辐射度、AO叠加等

4. <u>采用HTML5</u>/IOS/Android移动平台实现

5. 构建了基于此引擎的完整三维游戏，具有可玩性。
6. 与虚拟现实/增强现实应用结合

7. 具有一定的对象表达能力，能够表达门、窗、墙等;
8. 复杂材质效果





一些有用的reference

- 漂亮的场景：https://showroom.littleworkshop.fr/
  http://campoallecomete.it/
- 不错的切换：https://moments.epic.net/#home
- 模型导入：https://threejs.org/examples/#webgl_loader_gltf
- 模型导出：https://threejs.org/examples/#misc_exporter_gltf
- 已有模型：https://github.com/KhronosGroup/glTF-Sample-Models/tree/master/2.0/
- 建模参考：https://zhuanlan.zhihu.com/p/40869476
- 未完待续

