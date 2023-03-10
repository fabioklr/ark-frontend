import { createRouter, createWebHistory } from 'vue-router';
import { pb } from '../assets/pocketbase';

const HomeView = () => import('../views/HomeView.vue')
const ProjectView = () => import('../views/ProjectView.vue')
const ProjectDetailsView = () => import('../views/ProjectDetailsView.vue')
const CreateProjectView = () => import('../views/CreateProjectView.vue')
const AboutView = () => import('../views/AboutView.vue')
const ContactView = () => import('../views/ContactView.vue')

const routes = [
    { 
        path: '/', 
        name: 'home', 
        component: HomeView,
    },
    {
        path: '/projekte',
        name: 'projects',
        component: ProjectView,
    },
    {
        path: '/projekte/neu',
        name: 'create-project',
        component: CreateProjectView,
        // only authenticated users can create projects
        meta: { requiresAuth: true }
    },
    {
        path: '/projekte/:id',
        name: 'project-details',
        component: ProjectDetailsView,
        // anybody can read a project
        meta: { requiresAuth: false }
    },
    { 
        path: '/unternehmen',
        name: 'about',
        component: AboutView
    },
    { 
        path: '/kontakt',
        name: 'contact',
        component: ContactView
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
        path: '/login',
        query: { redirect: to.fullPath },
      }
    }
  })

export default router;