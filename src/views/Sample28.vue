<!--监控视频纹理贴图-->
<template>
    <div style="height:100%;width:100%;">
        <div class="three-view">

        </div>
        <video id="mayvideo" style="width:600px;height:400px;display:none;" muted autoplay></video>
    </div>
</template>
<script>
    import * as THREE from 'three'

    import flvjs from "flv.js"

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
                let container = this.$el.firstChild;
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
                var geometry = new THREE.BoxGeometry(200, 100, 100); //立方体

                var videoElement = document.getElementById('mayvideo');

                var flvPlayer = flvjs.createPlayer({
                    type: 'flv',
                    url: 'http://222.141.123.114:8073/IPCamera87/av_stream.flv'
                });
                flvPlayer.attachMediaElement(videoElement);
                flvPlayer.load();
                flvPlayer.play();

                // video对象作为VideoTexture参数创建纹理对象
                var texture = new THREE.VideoTexture(videoElement)

                //材质对象1
                var material_1 = new THREE.MeshPhongMaterial({
                    map: texture, // 设置纹理贴图
                });

                // 材质对象2
                var material_2 = new THREE.MeshPhongMaterial({
                    color: 0x3fff3f
                });

                var materialArr = [material_2, material_2, material_1, material_2, material_2, material_2];

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
