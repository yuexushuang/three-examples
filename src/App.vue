<template>
    <el-container style="height: 100%;width:100% ;">
        <el-aside width="250px" style="background-color:#545c64">
            <el-scrollbar style="height:100%;">
                <el-menu style="border-right:1px solid #545c64"
                         background-color="#545c64"
                         :text-color="'#ffffff'"
                         :active-text-color="'#00ffff'"
                         router
                         :unique-opened="true"
                         @select="selectMenu"
                         :default-active="activeMenu"
                         :default-openeds="openedMenu">
                    <el-submenu v-for="(item,index) in menus" :key="index" :index="index+''">
                        <template slot="title">
                            <i class="el-icon-menu"></i>
                            {{item.text}}
                        </template>
                        <el-menu-item v-for="(citem,cindex) in menus[index].children" :key="cindex" :index="citem.route">{{citem.text}}</el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-scrollbar>
        </el-aside>
        <el-container>
            <router-view></router-view>
        </el-container>
    </el-container>
</template>
<script>
    import { Menus } from "./config/menus"

    export default {
        name: 'App',
        data() {
            return {
                openedMenuIndex: "0",
                menus: Menus
            }
        },
        mounted() {

        },
        computed: {
            activeMenu() {
                const route = this.$route
                return route.path
            },
            openedMenu() {
                const path = this.$route.path
                for (var i = 0; i < this.menus.length; i++) {
                    if (this.menus[i].children) {
                        for (var j = 0; j < this.menus[i].children.length; j++) {
                            if (this.menus[i].children[j].route == path) {
                                return [i + ""];
                            }
                        }
                    }
                }

                return [this.openedMenuIndex];
            }
        },
        methods: {
            selectMenu(index, indexPath) {
                if (indexPath[1] == this.$route.path) {
                    return;
                }
            }
        }
    }

</script>
<style>
    html, body {
        height: 100%;
        width: 100%;
        margin: 0px;
        padding: 0px;
        overflow: hidden;
    }

    .el-scrollbar__wrap {
        overflow-x: hidden !important;
    }
</style>
