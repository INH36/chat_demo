import {createRouter, createWebHistory} from "vue-router";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path:'/',
            name: 'login',
            component: ()=>import('../components/login.vue')
        },
        {
            path:'/chat',
            name: 'chat',
            component: ()=>import('../components/chat.vue')
        }
    ]
})


export default router;