<!--点材质-->
<template>
    <div class="three-view">

    </div>
</template>
<script>
    import * as Three from 'three'

    import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

    export default {
        name: "Sample10",
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
        },
        methods: {
            init: function () {

                //初始化相机和场景
                let container = this.$el;
                this.camera = new Three.PerspectiveCamera(70, container.clientWidth / container.clientHeight, 0.01, 10000)
                this.camera.position.z = 300
                this.scene = new Three.Scene()

                //给场景添加一个坐标轴，长度是100，红X，绿Y，蓝Z
                let axesHelper = new Three.AxesHelper(100);
                this.scene.add(axesHelper);

                //********************添加几何体**********************//
                var geometry = new Three.SphereGeometry(100, 25, 25);   //创建一个球体几何对象
                var material = new Three.PointsMaterial({   // 创建一个点材质对象
                    color: 0xff00ff, //颜色
                    size: 2, //点渲染尺寸
                });
                var point = new Three.Points(geometry, material);   //点模型对象  参数：几何体  点材质
                this.scene.add(point); //点模型添加到场景中
                //********************添加几何体-End**********************//

                //初始化渲染器，并添加到dom中
                this.renderer = new Three.WebGLRenderer({ antialias: true })
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
