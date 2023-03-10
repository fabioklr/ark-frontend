import { ref } from 'vue'
import { defineStore } from 'pinia'
import { pb } from '../assets/pocketbase'

export const useProjectStore = defineStore('projects', () => {
    const projects = ref(null);

    const getProjects = async () => {
        const response = await pb.collection('projects').getFullList({
            sort: 'created'
        });
        
        projects.value = response;
    };
    
    return { projects, getProjects }
});