<template>
    <div class="mt-16 pb-12 p-4">
        <div v-if="showMap" class="flex flex-col items-center w-full h-96 md:h-[64vh]">
            <!-- Header -->
            <h1 class="text-4xl text-center font-bold">übersicht</h1>
            <!-- Map showing the projects' location -->
            <div class="w-full h-full mt-16 md:w-2/3">
                <ProjectsMap />
            </div>
        </div>
        <!-- Project Groups Section -->
        <div v-if="groups.length" class="flex flex-col">
            <h2 class="text-center text-4xl font-bold mb-4 mt-12">activ fitness</h2>
            <div class="flex overflow-x-scroll gap-8">
                <div class="flex overflow-x-scroll overflow-y-hidden snap-x gap-8">
                    <ObjectCard v-for="group in groups" :key="group.id" :object="group" />
                </div>
            </div>
        </div>
        <!-- Projects by type (only projects without a group) -->
        <div class="flex flex-col">
            <div v-for="projectType in projectsByType.slice(0, typesToDisplay)" :key="projectType[0]">
                <h2 class="text-center text-4xl font-bold mb-4 mt-12">
                    {{ projectType[0] }}
                </h2>
                <div class="flex overflow-x-scroll overflow-y-hidden snap-x gap-8">
                    <ObjectCard v-for="project in projectType[1]" :key="project.id" :object="project" />
                </div>
            </div>
            <div v-if="typesToDisplay < projectsByType.length" class="flex justify-evenly my-12">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 transform rotate-270" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, ref, watchEffect, defineAsyncComponent, onMounted, onUnmounted } from 'vue'
import ProjectsMap from '../components/ProjectsMap.vue'
import { useProjectsStore } from '../stores/projects';
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';

const ObjectCard = defineAsyncComponent(() =>
  import('../components/ObjectCard.vue')
)

const projectStore = useProjectsStore();
const { projects } = storeToRefs(projectStore);
const { groups } = storeToRefs(projectStore);
const typesToDisplay = ref(3); // Start with 1 type displayed
const showMap = ref(false);
const route = useRoute();

// If the URL ends with '/projekte', set the number of projects to display to 10
watchEffect(() => {
    if (route.path === '/projekte') {
        showMap.value = true;
    }
});

const projectsByType = computed(() => {
    const projectsByType = {}
    projects.value.forEach(project => {
        if (project.projektgruppe) return
        if (project.projekttyp && project.projekttyp.length > 0 && project.projekttyp[0].name) {
            const typeName = project.projekttyp[0].name
            if (!projectsByType[typeName]) {
                projectsByType[typeName] = []
            }
            projectsByType[typeName].push(project)
        }
    })
    return Object.entries(projectsByType).sort((a, b) => b[1].length - a[1].length)
})

const handleScroll = () => {
  const bottomOfWindow = 
    window.innerHeight + window.scrollY >= document.documentElement.offsetHeight - 100;

  if (bottomOfWindow && typesToDisplay.value < projectsByType.value.length) {
    typesToDisplay.value += 1;
  }
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style>
::-webkit-scrollbar {
    height: 12px; /* Change the height as needed */
    width: 12px; /* Change the width as needed */
}

::-webkit-scrollbar-thumb {
    background-color: rgba(0,0,0,0.3); /* Change the color as needed */
    border-radius: 10px; /* Change the border radius as needed */
}

::-webkit-scrollbar-thumb:hover {
    background-color: rgba(0,0,0,0.5); /* Change the color as needed */
}
</style>