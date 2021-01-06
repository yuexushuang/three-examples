<!--three.js初始化例子-->
<template>
    <div class="three-view">

    </div>
</template>
<script>
    import * as Three from 'three'

    export default {
        name: "Sample00",
        data() {
            return {
                camera: null,
                scene: null,
                renderer: null,
                mesh: null
            }
        },
        mounted() {
            this.init()
            this.animate()
        },
        methods: {
            init: function () {
                let container = this.$el;
                this.camera = new Three.PerspectiveCamera(70, container.clientWidth / container.clientHeight, 0.01, 10)
                this.camera.position.z = 0.6
                this.scene = new Three.Scene()
                let geometry = new Three.BoxGeometry(0.2, 0.2, 0.2)
                let material = new Three.MeshNormalMaterial()
                this.mesh = new Three.Mesh(geometry, material)
                this.scene.add(this.mesh)

                this.renderer = new Three.WebGLRenderer({ antialias: true })
                this.renderer.setSize(container.clientWidth, container.clientHeight)
                container.appendChild(this.renderer.domElement)
            },
            animate: function () {
                requestAnimationFrame(this.animate)
                this.mesh.rotation.x += 0.005
                this.mesh.rotation.y += 0.005
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
