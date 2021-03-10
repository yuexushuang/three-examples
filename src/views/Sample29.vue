<!--法线贴图-->
<template>
    <div class="three-view">

    </div>
</template>
<script>
    import * as THREE from 'three'

    import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

    export default {
        name: "Sample21",
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

                //正交相机
                //this.camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.01, 10000)
                //this.camera.position.z = 300

                this.camera = new THREE.OrthographicCamera(container.clientWidth / - 2, container.clientWidth / 2, container.clientHeight / 2, container.clientHeight / - 2, 1, 1000);
                this.camera.position.z = 300

                this.scene = new THREE.Scene()

                //给场景添加一个坐标轴，长度是100，红X，绿Y，蓝Z
                let axesHelper = new THREE.AxesHelper(200);
                this.scene.add(axesHelper);

                //添加一个环境光
                var ambient = new THREE.AmbientLight(0xffffff);
                this.scene.add(ambient);//环境光对象添加到scene场景中

                //添加一个平行光
                var directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
                directionalLight.position.set(3000, 3000, 3000);     // 设置光源位置
                this.scene.add(directionalLight);

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
                // 纹理贴图映射到一个球体面上
                var geometry = new THREE.SphereGeometry(100, 48, 48);   //创建一个球体几何对象
                // TextureLoader创建一个纹理加载器对象，可以加载图片作为几何体纹理
                var textureLoader = new THREE.TextureLoader();
                // 执行load方法，加载纹理贴图成功后，返回一个纹理对象Texture
                var texture = textureLoader.load('./img/world.jpg');
                var textureNormal = textureLoader.load('./img/earth_normal_2048.jpg');
                var textureSpecular = textureLoader.load('./img/earth_specular_2048.jpg');

                var material = new THREE.MeshPhongMaterial({
                    // 设置颜色纹理贴图：Texture对象作为材质map属性的属性值
                    map: texture,   //设置颜色贴图属性值
                    specularMap: textureSpecular,
                    normalMap: textureNormal, //法线贴图
                    //设置深浅程度，默认值(1,1)。
                    normalScale: new THREE.Vector2(1.5, 1.5),

                }); //材质对象Material
                var mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
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
