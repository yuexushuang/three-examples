<!--聚光灯投影计算-->
<template>
    <div class="three-view">

    </div>
</template>
<script>
    import * as THREE from 'three'

    import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

    export default {
        name: "Sample17",
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

                // 添加聚光光源
                // 聚光光源
                var spotLight = new THREE.SpotLight(0xffffff);
                // 设置聚光光源位置
                spotLight.position.set(100, 300, 100);
                // 设置聚光光源发散角度
                spotLight.angle = Math.PI / 3;           //60度开角
                this.scene.add(spotLight); //光对象添加到scene场景中
                // 设置用于计算阴影的光源对象
                spotLight.castShadow = true;
                // 设置计算阴影的区域，注意包裹对象的周围
                spotLight.shadow.camera.near = 1;
                spotLight.shadow.camera.far = 1000;
                spotLight.shadow.camera.fov = 30;

                // 设置mapSize属性可以使阴影更清晰，不那么模糊
                spotLight.shadow.mapSize.set(1024, 1024)
                var helper = new THREE.DirectionalLightHelper(spotLight, 5);
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
