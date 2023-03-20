import { defineStore } from 'pinia'
import { pb } from '../assets/pocketbase'

export const useProjectsStore = defineStore('projects', {
    state: () => ({
      projects: [],
    }),
    actions: {
      async getProjects () {
          const res = await pb.collection('projects').getFullList({sort: '-year_completed'});
          this.projects = res;
      }
    }
})