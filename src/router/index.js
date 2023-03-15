import { createRouter, createWebHistory } from 'vue-router';
import { pb } from '../assets/pocketbase';

const HomeView = () => import('../views/HomeView.vue');

const routes = [
    { 
        path: '/', 
        name: 'home', 
        component: HomeView,
    },
    {
        path: '/projekte',
        name: 'projects',
        component: () => import('../views/ProjectView.vue')
    },
    {
        path: '/projekte/neu',
        name: 'create-project',
        component: () => import('../views/CreateProjectView.vue'),
        // only authenticated users can create projects
        meta: { requiresAuth: true }
    },
    {
        path: '/projekte/:id',
        name: 'project-details',
        component: () => import('../views/ProjectDetailsView.vue'),
        // anybody can read a project
        meta: { requiresAuth: false }
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
    },
    {
        path: '/login',
        component: HomeView
    },
    {
        path: '/signup',
        component: HomeView
    }
  ]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

router.beforeEach((to, from) => {
    if (to.meta.requiresAuth && !pb.authStore.token) {
      return {
        path: '/login'
      }
    }
  })

export default router;