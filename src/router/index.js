import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import ProjectView from '../views/ProjectView.vue';
import ProjectDetailsView from '../views/ProjectDetailsView.vue';
import AboutView from '../views/AboutView.vue';
import ContactView from '../views/ContactView.vue';
import AuthModal from '../components/AuthModal.vue';

const routes = [
    { 
        path: '/', 
        name: 'home', 
        component: HomeView,
        props: true
    },
    {
        path: '/projekte',
        name: 'projects',
        component: ProjectView
    },
    { 
        path: '/projekte/:id',
        name: 'project-details',
        component: ProjectDetailsView
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
    }
  ]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

export default router;