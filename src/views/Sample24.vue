<!--数组材质-->
<template>
    <div class="three-view">

    </div>
</template>
<script>
    import * as THREE from 'three'

    import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

    export default {
        name: "Sample24",
        data() {
            return {
                camera: null,
                scene: null,
                renderer: null,
            }
        },
        mounted() {
            this.init()
            this.animate()
            this.addObjects();
        },
        methods: {
            init: function () {

                //初始化相机和场景
                let container = this.$el;
                this.camera = new THREE.PerspectiveCamera(70, container.clientWidth / container.clientHeight, 0.01, 10000)
                this.camera.position.z = 200
                this.camera.position.x = 200
                this.camera.position.y = 200
                this.scene = new THREE.Scene()

                //给场景添加一个坐标轴，长度是100，红X，绿Y，蓝Z
                let axesHelper = new THREE.AxesHelper(200);
                this.scene.add(axesHelper);

                //添加一个环境光
                var ambient = new THREE.AmbientLight(0xffffff);
                this.scene.add(ambient);//环境光对象添加到scene场景中

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
            },

            addObjects: function () {
                //var geometry = new THREE.BoxGeometry(100, 100, 100); //立方体
                // var geometry = new THREE.PlaneGeometry(204, 102, 4, 4); //矩形平面
                 //var geometry = new THREE.SphereGeometry(100, 48, 48); //球体
                 var geometry = new THREE.CylinderGeometry(60, 60, 160,25); //圆柱
                //
                // 材质对象1
                var material_1 = new THREE.MeshPhongMaterial({
                    color: 0x3fff3f
                })
                var textureLoader = new THREE.TextureLoader(); // 纹理加载器
                var texture = textureLoader.load('./img/world.jpg'); // 加载图片，返回Texture对象
                // 材质对象2
                var material_2 = new THREE.MeshLambertMaterial({
                    map: texture, // 设置纹理贴图
                    // wireframe:true,
                });
                // 设置材质数组
                var materialArr = [material_2, material_1, material_1, material_1, material_1, material_1];

                // 设置数组材质对象作为网格模型材质参数
                var mesh = new THREE.Mesh(geometry, materialArr); //网格模型对象Mesh
                this.scene.add(mesh); //网格模型添加到场景中

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
