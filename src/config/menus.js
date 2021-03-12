export const Menus = [
    {
        text: '基础功能', children: [
            { text: 'three初始化', route: '/sample00', compath: 'views/Sample00.vue' },
            { text: '加载obj模型', route: '/sample01', compath: 'views/Sample01.vue' },
            { text: '加载倾斜摄影单个瓦片（obj）', route: '/sample02', compath: 'views/Sample02.vue' },
            { text: '加载倾斜摄影（obj）', route: '/sample03', compath: 'views/Sample03.vue' },
        ]
    },
    {
        text: '理论学习', children: [
            { text: '点材质', route: '/sample10', compath: 'views/Sample10.vue' },
            { text: '线材质', route: '/sample11', compath: 'views/Sample11.vue' },
            { text: '虚线材质', route: '/sample12', compath: 'views/Sample12.vue' },
            { text: 'MeshBasic材质', route: '/sample13', compath: 'views/Sample13.vue' },
            { text: 'MeshLambert材质', route: '/sample14', compath: 'views/Sample14.vue' },
            { text: 'MeshPhong材质', route: '/sample15', compath: 'views/Sample15.vue' },
            { text: '平行光投影计算', route: '/sample16', compath: 'views/Sample16.vue' },
            { text: '聚光灯投影计算', route: '/sample17', compath: 'views/Sample17.vue' },
        ]
    },
    {
        text: '纹理贴图', children: [
            { text: '创建纹理贴图', route: '/sample20', compath: 'views/Sample20.vue' },
            { text: '修改纹理坐标', route: '/sample22', compath: 'views/Sample22.vue' },
            { text: '修改纹理坐标2', route: '/sample23', compath: 'views/Sample23.vue' },
            { text: '创建纹理贴图2', route: '/sample21', compath: 'views/Sample21.vue' },
            { text: '数组材质', route: '/sample24', compath: 'views/Sample24.vue' },
            { text: '纹理阵列-草地效果', route: '/sample25', compath: 'views/Sample25.vue' },
            { text: '动态纹理-管道效果', route: '/sample26', compath: 'views/Sample26.vue' },
            { text: '视频纹理贴图', route: '/sample27', compath: 'views/Sample27.vue' },
            { text: '监控视频纹理贴图', route: '/sample28', compath: 'views/Sample28.vue' },
            { text: '法线贴图', route: '/sample29', compath: 'views/Sample29.vue' },
        ]
    },
    {
        text: '简单案例', children: [
            { text: '天空盒实现一', route: '/sample30', compath: 'views/Sample30.vue' },
            { text: '天空盒实现二', route: '/sample31', compath: 'views/Sample31.vue' },
            { text: '加载gltf', route: '/sample32', compath: 'views/Sample32.vue' },
        ]
    },
    {
        text: '音频操作', children: [
            { text: '音乐可视化-平均频率', route: '/sample40', compath: 'views/Sample40.vue' },
            { text: '音乐可视化-实时频率', route: '/sample41', compath: 'views/Sample41.vue' },
        ]
    }
];
