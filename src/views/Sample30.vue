<!--天空盒实现-->
<template>
    <div class="three-view">

    </div>
</template>
<script>
    import * as THREE from 'three'

    import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

    export default {
        name: "Sample30",
        data() {
            return {
                camera: null,
                scene: null,
                renderer: null,
                orbitControl: null
            }
        },
        mounted() {
            this.init()
            this.animate()
            this.createSkyBox();
            this.addObjects();
        },
        methods: {
            init: function () {

                //初始化相机和场景
                let container = this.$el;

                //正交相机
                this.camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.01, 100000)

                this.camera.position.z = 300
                this.camera.position.y = -700
                this.camera.position.x = 300

                this.scene = new THREE.Scene()

                //给场景添加一个坐标轴，长度是100，红X，绿Y，蓝Z
                let axesHelper = new THREE.AxesHelper(200);
                this.scene.add(axesHelper);

                //添加一个环境光
                var ambient = new THREE.AmbientLight(0xffffff);
                this.scene.add(ambient);//环境光对象添加到scene场景中

                //添加一个平行光
                var directionalLight = new THREE.DirectionalLight(0xffffff, 0.4);
                directionalLight.position.set(3000, 3000, 3000);     // 设置光源位置
                this.scene.add(directionalLight);

                //初始化渲染器，并添加到dom中
                this.renderer = new THREE.WebGLRenderer({ antialias: true })
                this.renderer.setSize(container.clientWidth, container.clientHeight)
                container.appendChild(this.renderer.domElement)

                //添加控制器
                this.orbitControl = new OrbitControls(this.camera, this.renderer.domElement)
                this.orbitControl.enableRotate = true
            },
            animate: function () {
                requestAnimationFrame(this.animate)
                this.renderer.render(this.scene, this.camera)
            },

            addObjects: function () {
                /**
                * 创建一个地面
                */
                var geometry = new THREE.PlaneGeometry(4000, 4000); //矩形平面
                // 加载树纹理贴图
                var texture = new THREE.TextureLoader().load("./img/caodi.jpg");
                // 设置阵列
                texture.wrapS = THREE.RepeatWrapping;
                texture.wrapT = THREE.RepeatWrapping;
                // uv两个方向纹理重复数量
                //texture.wrapS = 1001;
                //texture.wrapT = 1001;
                texture.repeat.set(10, 10);
                var material = new THREE.MeshLambertMaterial({
                    map: texture,
                });
                var mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
                this.scene.add(mesh); //网格模型添加到场景中
                mesh.rotateX(-Math.PI / 2);
                mesh.position.y = -800;

                //this.camera.lookAt(new THREE.Vector3(300, -1000, 300));
                this.camera.lookAt(mesh.position);
                this.camera.updateProjectionMatrix();
                this.orbitControl.target = mesh.position;
            },

            createSkyBox: function () {
                var path = "./img/skb/04/";//设置路径
                var directions = ["px", "nx", "py", "ny", "pz", "nz"];//获取对象
                var format = ".jpg";//格式
                //创建盒子，并设置盒子的大小为( 5000, 5000, 5000 )
                var skyGeometry = new THREE.BoxGeometry(5000, 5000, 5000);
                //设置盒子材质
                var materialArray = [];
                for (var i = 0; i < 6; i++)
                    materialArray.push(new THREE.MeshBasicMaterial({
                        map: THREE.ImageUtils.loadTexture(path + '04_' + directions[i] + format),//将图片纹理贴上
                        side: THREE.BackSide/*镜像翻转，如果设置镜像翻转，那么只会看到黑漆漆的一片，因为你身处在盒子的内部，所以一定要设置镜像翻转。*/
                    }));
                var skyMaterial = new THREE.MeshFaceMaterial(materialArray);
                var skyBox = new THREE.Mesh(skyGeometry, skyMaterial);//创建一个完整的天空盒，填入几何模型和材质的参数
                this.scene.add(skyBox);//在场景中加入天空盒
            }
        }
    }


</script>
<style>
    .three-view {
        width: 100%;
        height: 100%;
    }
</style>
