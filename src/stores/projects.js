import { defineStore } from 'pinia'
import { pb } from '../assets/pocketbase'

export const useProjectsStore = defineStore('projectsstore', {
    state: () => ({
      projects: JSON.parse(localStorage.getItem('projects')) || [],
    }),
    actions: {
      async getProjects() {
        try {
          // Try to get fresh data
          const projects = await pb.collection('projekt').getFullList({sort: '-ende'});
          const projecttypes = await pb.collection('projekttyp').getFullList();
          
          projects.forEach(project => {
            if (project.projekttyp) {
              project.projekttyp = projecttypes
                .filter(pt => project.projekttyp.includes(pt.id))
                .map(pt => ({ id: pt.id, name: pt.name }));
            } else {
              project.projekttyp = [];
            }
          });
          
          this.projects = projects;
          // Cache the results
          localStorage.setItem('projects', JSON.stringify(projects));
        } catch (error) {
          console.error('Failed to fetch projects:', error);
          // If fetch fails, we'll still have the cached data in this.projects
        }
      }    
    }
})