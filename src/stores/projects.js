import { defineStore } from "pinia";
import { pb } from "../assets/pocketbase";

export const useProjectsStore = defineStore("projects", {
  state: () => {
    let projects = [];
    let projecttypes = [];
    let projectgroups = [];
    
    try {
      const storedProjects = localStorage.getItem("projects");
      const storedProjectTypes = localStorage.getItem("projecttypes");
      const storedProjectGroups = localStorage.getItem("projectgroups");
      
      if (storedProjects) {
        projects = JSON.parse(storedProjects);
      }
      if (storedProjectTypes) {
        projecttypes = JSON.parse(storedProjectTypes);
      }
      if (storedProjectGroups) {
        projectgroups = JSON.parse(storedProjectGroups);
      }
    } catch (e) {
      console.error("Failed to parse projects from localStorage", e);
      localStorage.removeItem("projects");
      localStorage.removeItem("projecttypes");
      localStorage.removeItem("projectgroups");
    }
    
    return {
      projects,
      projectgroups,
      projecttypes,
      selectedProjectType: null,
      loading: false,
      error: null,
    };
  },
  actions: {
    async fetchProjects() {
      this.loading = true;
      this.error = null;
      try {
        const [projects, projecttypes] = await Promise.all([
          pb.collection("projekt").getFullList({ sort: "-ende" }),
          pb.collection("projekttyp").getFullList(),
        ]);

        // Initialize count for each project type
        projecttypes.forEach(type => {
          type.count = 0;
        });

        projects.forEach((project) => {
          if (project.projekttyp) {
            project.projekttyp = projecttypes
              .filter((pt) => project.projekttyp.includes(pt.id))
              .map((pt) => {
                // Increment count for this project type
                const typeIndex = projecttypes.findIndex(type => type.id === pt.id);
                if (typeIndex !== -1) {
                  projecttypes[typeIndex].count++;
                }
                return { id: pt.id, name: pt.name };
              });
          } else {
            project.projekttyp = [];
          }
        });
        
        this.projecttypes = projecttypes;
        this.projects = projects;
        localStorage.setItem("projects", JSON.stringify(projects));
        localStorage.setItem("projecttypes", JSON.stringify(projecttypes));
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
        this.projectgroups = projectGroups;
        localStorage.setItem("projectgroups", JSON.stringify(projectGroups));
      } catch (error) {
        console.error("Failed to fetch project groups:", error);
        this.error = error;
      } finally {
        this.loading = false;
      }
    },
    setSelectedProjectType(projectType) {
      this.selectedProjectType = projectType; // Now accepts the entire object
    },
  },
});