<!--纹理动画-管道-->
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
                this.camera.position.z = 100
                this.camera.position.x = 100
                this.camera.position.y = 100
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
                if (this.texture) {
                    this.texture.offset.x -= 0.02;
                }
            },

            addObjects: function () {
                /**
                 * 创建一个设置重复纹理的管道
                 */
                var curve = new THREE.CatmullRomCurve3([
                    new THREE.Vector3(-80, -40, 0),
                    new THREE.Vector3(-80, 40, 0),
                    new THREE.Vector3(80, 40, 0),
                    new THREE.Vector3(80, -40, 0)
                ]);
                var tubeGeometry = new THREE.TubeGeometry(curve, 100, 1, 50, false);
                var textureLoader = new THREE.TextureLoader();
                var texture = textureLoader.load('./img/line.png');

                //texture.rotation = Math.PI / 2;

                // 设置阵列模式为 RepeatWrapping
                texture.wrapS = THREE.RepeatWrapping
                texture.wrapT = THREE.RepeatWrapping
                // 设置x方向的偏移(沿着管道路径方向)，y方向默认1
                //等价texture.repeat= new THREE.Vector2(20,1)

                texture.repeat.x = 20
                texture.repeat.y = 6

                this.texture = texture;

                var tubeMaterial = new THREE.MeshPhongMaterial({
                    map: texture,
                    transparent: true,
                });

                var mesh = new THREE.Mesh(tubeGeometry, tubeMaterial); //网格模型对象Mesh
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
