<template>
    <div class="mt-16">
        <div v-if="showMap" class="flex flex-col items-center w-full h-96 md:h-[64vh]">
            <!-- Header -->
            <h1 class="text-4xl text-center font-bold">Übersicht</h1>
            <!-- Map showing the projects' location -->
            <div class="w-full h-full mt-16 md:w-2/3">
                <ProjectsMap />
            </div>
        </div>
        <div class="flex flex-col">
            <!-- Card with project information -->
            <div v-for="projectYear in projectsByYear.slice(0, yearsToDisplay)">
                <!-- Header with project's date of completion if first project of the year -->
                <h2 
                    class="text-center text-4xl font-bold mb-4 mt-12">
                    {{ projectYear[0] }}
                </h2>
                <div class="flex overflow-x-scroll snap-x gap-8">
                    <ProjectCard v-for="project in projectYear[1]" :project="project" />
                </div>
            </div>
            <div class="flex justify-evenly my-12">
                <SiteButton 
                    v-if="yearsToDisplay < projectsByYear.length" 
                    @click="yearsToDisplay += 1"
                    class="text-lg"
                    buttonText="Mehr">
                </SiteButton>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, ref, watchEffect, defineAsyncComponent } from 'vue'
import SiteButton from '../components/SiteButton.vue'
import ProjectsMap from '../components/ProjectsMap.vue'
import { useProjectsStore } from '../stores/projects';
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';

const ProjectCard = defineAsyncComponent(() =>
  import('../components/ProjectCard.vue')
)

const projectStore = useProjectsStore();
const { projects } = storeToRefs(projectStore);
const yearsToDisplay = ref(3);
const showMap = ref(false);
const route = useRoute();

// If the URL ends with '/projekte', set the number of projects to display to 10
watchEffect(() => {
    if (route.path === '/projekte') {
        yearsToDisplay.value = 7;
        showMap.value = true;
    }
});

// Create an object whose keys are the individual years of the projects and the values are all the projects of that year.
// The object is then sorted by the year with the most recent year first.
const projectsByYear = computed(() => {
    const projectsByYear = {};
    projects.value.forEach(project => {
        const year = project.year_completed.slice(0, 4);
        if (projectsByYear[year]) {
            projectsByYear[year].push(project);
        } else {
            projectsByYear[year] = [project];
        }
    });
    return Object.entries(projectsByYear).sort((a, b) => b[0] - a[0]);
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