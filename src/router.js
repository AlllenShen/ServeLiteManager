import home from './views/home'
import login from './views/login'
import register from './views/register'
import app from './App.vue'
import db_manager from './views/db_manager.vue'
import module_reg from './views/module_reg'
import table_reg from './views/table_reg'

const router = [
    {
        path: '/',
        component: app,
    },
    {
        path: '/home/:username',
        name: 'home',
        component: home,
        meta: {
            title: '控制台'
        },
        props: true,
        children: [
            {
                name: 'db_manage',
                path: 'db_manage',
                component: db_manager,
                props: true,
            },
            {
                name: 'module_reg',
                path: 'module_reg',
                component: module_reg,
                props: true,
            },
            {
                name: 'table_reg',
                path: 'table_reg',
                component: table_reg,
                props: true,
            },
        ]
    },
    {
        path: '/login',
        name: 'login',
        component: login,
        meta: {
            title: '用户登录'
        }
    },
    {
        path: '/register',
        name: 'register',
        component: register,
        meta: {
            title: '用户注册'
        }
    }
    
]

export default router