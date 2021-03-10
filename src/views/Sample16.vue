<!--平行光投影计算-->
<template>
    <div class="three-view">

    </div>
</template>
<script>
    import * as THREE from 'three'

    import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

    export default {
        name: "Sample16",
        data() {
            return {
                camera: null,
                scene: null,
                renderer: null,
            }
        },
        mounted() {
            this.init()
            this.showMesh()
            this.animate()
        },
        methods: {
            showMesh() {

                this.renderer.shadowMapEnabled = true;

                // 添加一个方盒子
                var geometry = new THREE.BoxGeometry(50, 50, 50);
                var material = new THREE.MeshLambertMaterial({
                    color: 0x0000ff
                });
                var mesh = new THREE.Mesh(geometry, material);
                mesh.position.set(0, 100, 0)
                this.scene.add(mesh);
                mesh.castShadow = true;     // 设置产生投影

                //创建一个平面几何体作为投影面
                var planeGeometry = new THREE.PlaneGeometry(600, 600);
                var planeMaterial = new THREE.MeshLambertMaterial({
                    color: 0x999999
                });
                var planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
                this.scene.add(planeMesh);
                planeMesh.rotateX(-Math.PI / 2); //旋转网格模型
                planeMesh.position.y = -50; //设置网格模型y坐标
                planeMesh.receiveShadow = true; // 设置接收阴影的投影面

                // 添加方向光
                var directionalLight = new THREE.DirectionalLight(0xffffff, 1);
                directionalLight.position.set(50, 300, 50);     // 设置光源位置
                this.scene.add(directionalLight);
                directionalLight.castShadow = true; // 设置用于计算阴影的光源对象
                // 设置计算阴影的区域，最好刚好紧密包围在对象周围
                // 计算阴影的区域过大：模糊  过小：看不到或显示不完整
                directionalLight.shadow.camera.near = 0.5;
                directionalLight.shadow.camera.far = 1000;
                directionalLight.shadow.camera.left = -200;
                directionalLight.shadow.camera.right = 200;
                directionalLight.shadow.camera.top = 200;
                directionalLight.shadow.camera.bottom = -200;
                // 设置mapSize属性可以使阴影更清晰，不那么模糊
                directionalLight.shadow.mapSize.set(1024, 1024)
                var helper = new THREE.DirectionalLightHelper(directionalLight, 5);
                this.scene.add(helper);
            },

            init: function () {

                //初始化相机和场景
                let container = this.$el;
                this.camera = new THREE.PerspectiveCamera(70, container.clientWidth / container.clientHeight, 0.01, 10000)
                this.camera.position.set(300, 300, 300);
                this.scene = new THREE.Scene()

                //给场景添加一个坐标轴，长度是100，红X，绿Y，蓝Z
                let axesHelper = new THREE.AxesHelper(200);
                this.scene.add(axesHelper);

                //初始化渲染器，并添加到dom中
                this.renderer = new THREE.WebGLRenderer({ antialias: true })
                this.renderer.setSize(container.clientWidth, container.clientHeight)
                container.appendChild(this.renderer.domElement)

                //添加控制器
                let controls = new OrbitControls(this.camera, this.renderer.domElement)
            },
            animate: function () {
                requestAnimationFrame(this.animate)
                this.renderer.render(this.scene, this.camera)
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
