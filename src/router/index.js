import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';


//解决ElementUI导航栏中重复点击报Avoided redundant navigation to current location错误的问题
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err);
};

Vue.use(VueRouter);

import { Menus } from "../config/menus"

const concatMenuRoute = function (routes, menuItem) {
    if (menuItem.route && menuItem.route != '') {
        if (menuItem.compath) {
            routes.push({
                name: menuItem.route.substring(1, menuItem.route.length),
                path: menuItem.route,
                component: () => import('@/' + menuItem.compath),
                meta: { title: menuItem.text }
            });
        }
    }
}

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        redirect: 'sample00'
    },
];

for (var i = 0; i < Menus.length; i++) {
    let menuItem = Menus[i];
    concatMenuRoute(routes, menuItem);
    if (menuItem.children) {
        //有下级
        for (var j = 0; j < menuItem.children.length; j++) {
            let submenuItem = menuItem.children[j];
            concatMenuRoute(routes, submenuItem);
        }
    }
}


const router = new VueRouter({
    routes
});

router.beforeEach((to, from, next) => {
    if (to.meta.title) {
        document.title = to.meta.title
    }
    next();
});

export default router;
