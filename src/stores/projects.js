import { defineStore } from 'pinia'
import { pb } from '../assets/pocketbase'
import { getCoordinates } from '../assets/helpers'

export const useProjectsStore = defineStore('projects', {
    state: () => ({
      projects: [],
    }),
    actions: {
      async getProjects() {
        const res = await pb.collection('projects').getFullList({sort: '-year_completed'});
        const types = await pb.collection('projecttypes').getFullList();
        // An array to store promises from multiple update operations
        const updatePromises = [];
    
        for (const project of res) {
            // Check if the location is a string
            if (typeof project.location === 'string') {
                const data = await getCoordinates(project.location);
                project.location = data.results[0];
                // Push the promise returned from pb.collection('projects').update() to the array
                updatePromises.push(pb.collection('projects').update(project.id, project));
            }
            project.type = types.find(type => type.id === project.type).name;
        };
    
        // Await all update operations
        await Promise.all(updatePromises);
        this.projects = res;
      }    
    }
})