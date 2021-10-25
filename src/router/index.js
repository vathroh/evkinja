import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('../views/pages/Index')
    },
    {
        path: '/upload',
        name: 'upload',
        component: () => import('../views/pages/Upload')
    },
    {
        path: '/settings',
        name: 'settings',
        component: () => import('../views/pages/Setting'),
        children: [
            {
                path: '',
                name: 'setup-setting',
                component: () => import('../views/pages/setting/Setup.vue')
            },
            {
                path: '/criteria',
                name: 'citeria-setting',
                component: () => import('../views/pages/setting/Criteria.vue')
            },
            {
                path: '/aspects',
                name: 'aspects-setting',
                component: () => import('../views/pages/setting/Aspects.vue')
            },
            {
                path: '/assessors',
                name: 'assessors-setting',
                component: () => import('../views/pages/setting/Assessors.vue')
            }
        ]
    },
    {
        path: '/assessment/:id',
        name: 'assessment',
        component: () => import('../views/pages/AssessmentForm')
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/pages/Login')
    }
];


const router = createRouter ({
    history: createWebHistory(),
    routes
});

router.beforeEach( (to, from, next) => {
    let authenticated = localStorage.getItem('authenticated');
    if(to.name !== "login" && !authenticated ) next({ name: "login" });
    if(to.name === "login" && authenticated ) next({ name: "home" });
    else next()
})

export default router;


