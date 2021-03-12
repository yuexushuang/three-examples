<template>
    <div style="height:100%;width:100%;">
        <div style="position:absolute;top:0px;margin:20px;">
            <el-button type="primary" @click="playAudio">{{playing?'暂停':'播放'}}</el-button>
        </div>
        <div class="three-view">

        </div>
    </div>
</template>
<script>
    import * as THREE from 'three'

    import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

    export default {
        name: "Sample41",
        data() {
            return {
                playing: false,

                camera: null,
                scene: null,
                renderer: null,
                orbitControl: null,
                meshGroup: null,
                audio: null,
                audioAnalyser: null
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
                let container = this.$el.lastChild;

                //正交相机
                this.camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.01, 100000)

                this.camera.position.z = 1200
                this.camera.position.y = 0
                this.camera.position.x = 0

                this.scene = new THREE.Scene()

                //给场景添加一个坐标轴，长度是100，红X，绿Y，蓝Z
                //let axesHelper = new THREE.AxesHelper(200);
                //this.scene.add(axesHelper);

                //添加一个环境光
                var ambient = new THREE.AmbientLight(0xffffff);
                this.scene.add(ambient);//环境光对象添加到scene场景中

                //添加一个平行光
                var directionalLight = new THREE.DirectionalLight(0xffffff, 0.4);
                directionalLight.position.set(3000, 3000, 3000);     // 设置光源位置
                this.scene.add(directionalLight);

                //初始化渲染器，并添加到dom中
                this.renderer = new THREE.WebGLRenderer({ antialias: true })
                this.renderer.setSize(container.clientWidth, container.clientHeight)
                container.appendChild(this.renderer.domElement)

                //添加控制器
                this.orbitControl = new OrbitControls(this.camera, this.renderer.domElement)

            },
            animate: function () {
                requestAnimationFrame(this.animate)
                this.orbitControl.update();
                this.renderer.render(this.scene, this.camera)

                if (this.playing) {
                    //随音频变化
                    if (this.audioAnalyser) {

                        // 获得频率数据N个
                        var arr = this.audioAnalyser.getFrequencyData();
                        // console.log(arr);
                        // 遍历组对象，每个网格子对象设置一个对应的频率数据
                        this.meshGroup.children.forEach((elem, index) => {
                            elem.scale.y = arr[index] / 80
                            elem.material.color.r = arr[index] / 200;
                        });
                    }
                }
            },

            addObjects: function () {

                /**
                 * 创建多个网格模型组成的组对象
                 */
                var group = new THREE.Group();
                let N = 128; //控制音频分析器返回频率数据数量
                for (let i = 0; i < N / 2; i++) {
                    var box = new THREE.BoxGeometry(10, 100, 10); //创建一个立方体几何对象
                    var material = new THREE.MeshPhongMaterial({
                        color: 0x0000ff
                    }); //材质对象
                    var mesh = new THREE.Mesh(box, material); //网格模型对象
                    // 长方体间隔20，整体居中
                    mesh.position.set(20 * i - N / 2 * 10, 0, 0)
                    group.add(mesh)
                }
                this.scene.add(group)
                this.meshGroup = group;

                //添加音频
                var listener = new THREE.AudioListener() //监听者
                this.audio = new THREE.Audio(listener); //非位置音频对象
                var audioLoader = new THREE.AudioLoader(); //音频加载器
                // 加载音频文件
                audioLoader.load('./audio/1004523.mp3', (AudioBuffer) => {
                    this.audio.setBuffer(AudioBuffer); // 音频缓冲区对象关联到音频对象audio
                    this.audio.setLoop(true); //是否循环
                    this.audio.setVolume(0.5); //音量
                    // 音频分析器和音频绑定，可以实时采集音频时域数据进行快速傅里叶变换
                    this.audioAnalyser = new THREE.AudioAnalyser(this.audio);
                });

            },

            playAudio() {
                if (this.playing) {
                    this.audio.pause(); //暂停
                    this.playing = false;
                } else {
                    this.audio.play(); //播放
                    this.playing = true;
                }
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