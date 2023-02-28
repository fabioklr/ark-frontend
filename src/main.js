import { createApp } from 'vue'
import App from './App.vue'
import './style.css'
import HomePage from './components/HomePage.vue';
import ContactForm from './components/ContactForm.vue';
import AllProjects from './components/AllProjects.vue';
import ProjectDetails from './components/ProjectDetails.vue';
import AboutCompany from './components/AboutCompany.vue';
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    { path: '/', name: 'Home', component: HomePage },
    { path: '/projekte', name: 'Projects', component: AllProjects },
    { path: '/projekte/:id', name: 'Project-Details', component: ProjectDetails },
    { path: '/unternehmen', name: 'About', component: AboutCompany },
    { path: '/kontakt', name: 'Contact', component: ContactForm },
  ]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

const app = createApp(App)

app.use(router)

app.mount('#app')
