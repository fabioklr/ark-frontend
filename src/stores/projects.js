import { defineStore } from "pinia";
import { pb } from "../assets/pocketbase";

export const useProjectsStore = defineStore("projects", {
  state: () => ({
    projects: JSON.parse(localStorage.getItem("projects")) || [],
    groups: [],
    loading: false,
    error: null,
  }),
  actions: {
    async fetchProjects() {
      this.loading = true;
      this.error = null;
      try {
        const [projects, projecttypes] = await Promise.all([
          pb.collection("projekt").getFullList({ sort: "-ende" }),
          pb.collection("projekttyp").getFullList(),
        ]);

        projects.forEach((project) => {
          if (project.projekttyp) {
            project.projekttyp = projecttypes
              .filter((pt) => project.projekttyp.includes(pt.id))
              .map((pt) => ({ id: pt.id, name: pt.name }));
          } else {
            project.projekttyp = [];
          }
        });
        
        this.projects = projects;
        localStorage.setItem("projects", JSON.stringify(projects));
      } catch (error) {
        console.error("Failed to fetch projects:", error);
        this.error = error;
      } finally {
        this.loading = false;
      }
    },
    async fetchProjectGroups() {
      this.loading = true;
      this.error = null;
      try {
        const projectGroups = await pb.collection("projektgruppe").getFullList();
        this.groups = projectGroups;
      } catch (error) {
        console.error("Failed to fetch project groups:", error);
        this.error = error;
      } finally {
        this.loading = false;
      }
    },
  },
});
