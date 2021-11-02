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
        path: '/myEvaluation',
        name: 'myEvaluation',
        component: () => import('../views/pages/MyEvaluation')
    },
    {
        path: '/assessment/:id',
        name: 'assessment',
        component: () => import('../views/pages/AssessmentForm')
    },
    {
        path: '/request-edit',
        name: 'requestEdit',
        component: () => import('../views/pages/RequestEdit')
    },
    {
        path: '/request-edit-by-assessor',
        name: 'requestEditByAssessor',
        component: () => import('../views/pages/RequestEditByAssessor')
    },
    {
        path: '/recap',
        name: 'recap',
        component: () => import('../views/pages/Recapitulation')
    },
    {
        path: '/print',
        name: 'print',
        component: () => import('../views/pages/Print')
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/pages/Login')
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
            },
            {
                path: '/setup-details/:id',
                name: 'setup-details',
                component: () => import('../views/pages/setting/SetupDetails.vue')
            }
        ]
    },
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
