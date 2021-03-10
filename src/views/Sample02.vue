<!--加载展示obj模型-->
<template>
    <div class="three-view">

    </div>
</template>
<script>
    import * as Three from 'three'
    import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
    import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';
    import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";

    export default {
        name: "Sample01",
        data() {
            return {
                camera: null,
                scene: null,
                renderer: null,
            }
        },
        mounted() {
            this.init();
            this.animate()

        },
        methods: {
            init: function () {
                let container = this.$el;

                //初始化相机和场景
                this.camera =
                    new Three.PerspectiveCamera(70, container.clientWidth / container.clientHeight, 1, 2000)
                this.scene = new Three.Scene()
                //给场景添加一个坐标轴，长度是100，红X，绿Y，蓝Z
                let axesHelper = new Three.AxesHelper(10);
                //axesHelper.position.set(0, 0, -10);
                this.scene.add(axesHelper);

                //给场景添加环境光，给相机添加点光源
                const ambientLight = new Three.AmbientLight(0xcccccc, 1);
                this.scene.add(ambientLight);
                const pointLight = new Three.PointLight(0xffffff, 1);
                this.camera.add(pointLight);

                //加载obj模型
                this.loadObj();

                //设置相机位置，看向原点
                this.camera.position.z = 3
                this.camera.position.y = 3
                this.camera.position.x = 3

                //初始化render，并添加到dom中
                this.renderer = new Three.WebGLRenderer({ antialias: true })
                this.renderer.setSize(container.clientWidth, container.clientHeight)
                container.appendChild(this.renderer.domElement)

                //添加控制器
                let controls = new OrbitControls(this.camera, this.renderer.domElement)
            },
            animate: function () {
                requestAnimationFrame(this.animate)
                this.renderer.render(this.scene, this.camera)
            },

            loadObj() {
                let mtlLoader = new MTLLoader();
                let objLoader = new OBJLoader();
                mtlLoader.load('./models/oblique/Tile_+000_+001_+000.mtl', (materials) => {
                    objLoader.setMaterials(materials);
                    objLoader.load(
                        './models/oblique/Tile_+000_+001_+000.obj',
                        (object) => {
                            this.scene.add(object);
                        },
                        function (xhr) {
                            //console.log((xhr.loaded / xhr.total * 100) + '% loaded');
                        },
                        function (error) {
                            throw error;
                            console.log('An error happened');
                        }
                    );
                });
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
