<!--加载展示obj模型-->
<template>
    <div class="three-view">

    </div>
</template>
<script>
    import * as Three from 'three'
    import { MTLLoader, OBJLoader } from 'three-obj-mtl-loader'
    let OrbitControls = require('three-orbit-controls')(Three)

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

                this.camera =
                    new Three.PerspectiveCamera(70, container.clientWidth / container.clientHeight, 1, 2000)
                this.camera.position.z = 250

                this.scene = new Three.Scene()

                const ambientLight = new Three.AmbientLight(0xcccccc, 0.4);
                this.scene.add(ambientLight);
                const pointLight = new Three.PointLight(0xffffff, 0.8);
                this.camera.add(pointLight);

                let controls = new OrbitControls(this.camera)

                this.loadObj();

                this.renderer = new Three.WebGLRenderer({ antialias: true })
                this.renderer.setSize(container.clientWidth, container.clientHeight)
                container.appendChild(this.renderer.domElement)


            },
            animate: function () {
                requestAnimationFrame(this.animate)
                this.renderer.render(this.scene, this.camera)
            },

            loadObj() {
                let mtlLoader = new MTLLoader();
                mtlLoader.load('./models/test.mtl', function (materials) {

                    const loader = new OBJLoader();
                    loader.setMaterials(materials);
                    loader.load(
                        './models/test.obj',
                        (object) => {
                            this.scene.add(object);
                            object.scale.set(10, 10, 10);
                            object.position.y = - 95;
                        },
                        function (xhr) {
                            console.log((xhr.loaded / xhr.total * 100) + '% loaded');
                        },
                        function (error) {
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
