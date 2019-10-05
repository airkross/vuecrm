/* ВСЕ РОУТЫ ЗАЩИЩЕНЫ, РЕАЛИЗАЦИЯ ЗАЩИТЫ В САМОМ НИЗУ */

import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase/app'

Vue.use(Router);

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/login',
            name: 'login',
            meta: {
                layout: 'empty'
            },
            component: () => import('./views/Login.vue')
        },
        {
            path: '',
            name: 'home',
            meta: {
                layout: 'main',
                auth: true
            },
            component: () => import('./views/Home.vue')
        },
        {
            path: '/categories',
            name: 'categories',
            meta: {
                layout: 'main',
                auth: true
            },
            component: () => import('./views/Categories.vue')
        },
        {
            path: '/detailRecord/:id',
            name: 'detailRecord',
            meta: {
                layout: 'main',
                auth: true
            },
            component: () => import('./views/DetailRecord.vue')
        },
        {
            path: '/history',
            name: 'history',
            meta: {
                layout: 'main',
                auth: true
            },
            component: () => import('./views/History.vue')
        },
        {
            path: '/planing',
            name: 'planing',
            meta: {
                layout: 'main',
                auth: true
            },
            component: () => import('./views/Planing.vue')
        },
        {
            path: '/profile',
            name: 'profile',
            meta: {
                layout: 'main',
                auth: true
            },
            component: () => import('./views/Profile.vue')
        },
        {
            path: '/record',
            name: 'record',
            meta: {
                layout: 'main',
                auth: true
            },
            component: () => import('./views/Record.vue')
        },
        {
            path: '/register',
            name: 'registr',
            meta: {
                layout: 'empty'
            },
            component: () => import('./views/Register.vue')
        }
    ]
});

// beforeEach - будет вызываться перед каждой сменой роута и в нем можно проверять наличие авторизации и делать какую-либо логику
// to - куда идем from - откуда идем и next - это функция которую надо вызвать, если хотим продолжить выполнение смены роута 
// или наоборот с помощью next мы можем редеректнуть пользователя в другое месте, например на страницу логина
router.beforeEach((to, from, next) => {
    const currentUser = firebase.auth().currentUser;
    // при помощи перебора some который возвращает либо true либо false, мы проверяем нежна ли авторизация на данном роуте или нет
    // matched - это массив с данными роута, то есть это все объекты которые содержатся в свойстве routes объекта new Router
    const requireAuth = to.matched.some(record => record.meta.auth);
    // если роут на который мы пытаемся перейти требует авторизации и текущего пользователя нет, то делаем редирект на страницу логина
    if (requireAuth && !currentUser) {
        next('/login?message=login');
    } else {
        next();
    }


});


export default router;