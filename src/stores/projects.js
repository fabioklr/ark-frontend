import { defineStore } from 'pinia'
import { pb } from '../assets/pocketbase'

export const useProjectsStore = defineStore('projects', {
    state: () => ({
      projects: [],
      singleProject: {},
      photoCount: 0,
        locationCleaned: '',
        fullYear: 0,
    }),
    actions: {
      async getProjects () {
          const res = await pb.collection('projects').getFullList({sort: '-year_completed'});
          this.projects = res;
      },
      async getSingleProject (id) {
        const res = await pb.collection('projects').getOne(id, {
            expand: 'relField1,relField2.subRelField',
        });
        this.singleProject = res;
        this.photoCount = res.photos.length;
        this.locationCleaned = res.location.formatted.split(',')[0].replace(/[\d\s]/g, '');
        this.fullYear = res.year_completed.slice(0, 4);
      }
    },
  })