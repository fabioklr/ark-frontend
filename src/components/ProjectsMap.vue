<template>
  <div id="map" class="h-full"></div>
</template>

<script setup>
import { onMounted } from 'vue';
import { createMap } from '../assets/helpers'
import { useProjectStore } from '../stores/projects';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';

const projectStore = useProjectStore();
const { projects } = storeToRefs(projectStore);
const router = useRouter();

const redirectProject = (id) => {
    router.push({ name: 'project', params: { id } });
  };

onMounted(() => {
  const map = createMap(projects.value, redirectProject);
});
</script>

<script>

</script>


<style>
.mapboxgl-canvas-container {
  height: 100%;
}
</style>