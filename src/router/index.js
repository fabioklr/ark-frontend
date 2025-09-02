import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    { 
        path: '/', 
        name: 'home', 
        component: () => import('../views/HomeView.vue')
    },
    {
        path: '/projekte',
        name: 'projects',
        component: () => import('../views/GroupsProjectsView.vue')
    },
    {
        path: '/projekte/:id',
        name: 'project-details',
        component: () => import('../views/ProjectView.vue')
    },
    {
        path: '/projektgruppe/:groupId',
        name: 'project-group',
        component: () => import('../views/ProjectGroupView.vue'),
    },
    { 
        path: '/unternehmen',
        name: 'about',
        component: () => import('../views/AboutView.vue')
    },
    { 
        path: '/kontakt',
        name: 'contact',
        component: () => import('../views/ContactView.vue')
    }
  ]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

export default router;