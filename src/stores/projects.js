import { defineStore } from 'pinia'
import { pb } from '../assets/pocketbase'

export const useProjectsStore = defineStore('projectsstore', {
    state: () => ({
      projects: [],
    }),
    actions: {
      async getProjects() {
        const projects = await pb.collection('project').getFullList({sort: '-year_completed'});
        const projecttypes = await pb.collection('projecttype').getFullList();
        projects.forEach(project => {
          project.type = projecttypes.filter(pt => project.type.includes(pt.id)).map(pt => ({ id: pt.id, name: pt.name }));
        });
        this.projects = projects;
      }    
    }
})