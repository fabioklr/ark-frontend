<template>
  <div id="map" class="h-full"></div>
</template>

<script setup>
import { onMounted } from 'vue';
import { createMap } from '../assets/helpers'
import { useProjectsStore } from '../stores/projects';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';

const projectStore = useProjectsStore();
const { projects } = storeToRefs(projectStore);
const router = useRouter();

const openProject = (projectId) => {
  router.push({ name: 'project-details', params: { id: projectId }
  })
}

onMounted(() => {
  createMap(projects.value);
  // Select the target node
  const targetNode = document.getElementById("map");
  // Options for the observer (which mutations to observe)
  const config = { childList: true, subtree: true };
  // Create a new observer object
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      // Check if the mutation added a node with class ".project-popup"
      const addedNodes = mutation.addedNodes;
      for (let i = 0; i < addedNodes.length; i++) {
        if (addedNodes[i].classList && addedNodes[i].classList.contains("project-popup")) {
          addedNodes[i].addEventListener("click", () => {
            openProject(addedNodes[i].classList[0]);
          });
        }
      }
    });
  });
  // Start observing the target node for mutations
  observer.observe(targetNode, config);
});
</script>

<style>
.mapboxgl-canvas {
  height: 100%;
  width: 100%;
}
.mapboxgl-canvas-container {
  height: 100%;
  width: 100%;
}
</style>