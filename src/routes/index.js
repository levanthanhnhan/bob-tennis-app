import { createRouter, createWebHistory } from 'vue-router'
import Main from '../components/main/Main.vue'
import Member from '../components/member/Member.vue'
import Fund from '../components/fund/Fund.vue'
import Login from '../components/login/Login.vue'

const routes = [
    {
        path: '/',
        name: 'main',
        component: Main,
        children: [
            {
                path: '/',
                name: 'defauft',
                component: Member
            },
            {
                path: '/member',
                name: 'member',
                component: Member
            },
            {
                path: '/fund',
                name: 'fund',
                component: Fund
            },
        ]
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router      