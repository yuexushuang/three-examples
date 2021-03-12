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
                //this.orbitControl.enablePan = false;
                //this.orbitControl.screenSpacePanning = true;
                this.orbitControl.enableDamping = true;
                //this.orbitControl.addEventListener('change', () => {
                //    console.log('change');
                //    this.camera.updateProjectionMatrix();
                //})
            },
            animate: function () {
                requestAnimationFrame(this.animate)
                this.orbitControl.update();
                this.renderer.render(this.scene, this.camera)
                //this.orbitControl.target = this.camera.
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
                texture.repeat.set(10, 10);
                var material = new THREE.MeshLambertMaterial({
                    map: texture,
                });
                var mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
                this.scene.add(mesh); //网格模型添加到场景中
                mesh.rotateX(-Math.PI / 2);
                mesh.position.y = -800;
                mesh.updateWorldMatrix();

                this.orbitControl.target.copy(mesh.position); 
                this.orbitControl.update();
                
            },

            createSkyBox: function () {

                var path = "./img/skb/04/";       //设置路径
                var format = '.jpg';                        //设定格式
                var urls = [
                    path + '04_px' + format, path + '04_nx' + format,
                    path + '04_py' + format, path + '04_ny' + format,
                    path + '04_pz' + format, path + '04_nz' + format
                ];
                var textureCube = new THREE.CubeTextureLoader().load(urls);

                this.scene.background = textureCube; //作为背景贴图

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