<!--虚线材质-->
<template>
    <div class="three-view">

    </div>
</template>
<script>
    import * as THREE from 'three'

    import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

    export default {
        name: "Sample12",
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
                this.camera = new THREE.PerspectiveCamera(70, container.clientWidth / container.clientHeight, 0.01, 10000)
                this.camera.position.z = 300
                this.scene = new THREE.Scene()

                //给场景添加一个坐标轴，长度是100，红X，绿Y，蓝Z
                let axesHelper = new THREE.AxesHelper(100);
                this.scene.add(axesHelper);

                //********************添加几何体**********************//
                var geometry = new THREE.SphereGeometry(100, 25, 25);   //球体
                // 虚线材质对象：产生虚线效果
                var material = new THREE.LineDashedMaterial({
                    color: 0x0000ff,
                    dashSize: 10,//显示线段的大小。默认为3。
                    gapSize: 5,//间隙的大小。默认为1
                });
                var line = new THREE.Line(geometry, material); //线模型对象
                //  computeLineDistances方法  计算LineDashedMaterial所需的距离数组
                line.computeLineDistances();        //不加没有虚线效果
                this.scene.add(line); //线模型添加到场景中
                //********************添加几何体-End**********************//

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
