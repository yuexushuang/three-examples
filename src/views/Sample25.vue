<!--纹理阵列-草地效果-->
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
                /**
                  * 创建一个地面
                  */
                var geometry = new THREE.PlaneGeometry(500, 500); //矩形平面
                // 加载树纹理贴图
                var texture = new THREE.TextureLoader().load("./img/caodi.jpg");
                // 设置阵列
                texture.wrapS = THREE.RepeatWrapping;
                texture.wrapT = THREE.RepeatWrapping;
                // uv两个方向纹理重复数量
                texture.repeat.set(10, 10);
                var material = new THREE.MeshLambertMaterial({
                    map: texture,
                });
                var mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
                this.scene.add(mesh); //网格模型添加到场景中
                mesh.rotateX(-Math.PI / 2);

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
