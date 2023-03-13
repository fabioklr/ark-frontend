<template>
    <div class="my-16 drop-shadow-lg col-span-full">
        <!-- Card with project information -->
        <div v-for="(project, index) in slicedProjects">
            <!-- Header with project's date of completion if first project of the year -->
            <h2 
                v-if="index === 0 || project.year_completed.slice(0, 4) !== projects[index - 1].year_completed.slice(0, 4)"
                class="text-white text-center text-4xl font-bold mb-4 mt-12">
                {{ project.year_completed.slice(0, 4) }}
            </h2>
            <ProjectCard :project="project"></ProjectCard>
        </div>
        <div class="flex justify-evenly my-12">
            <SiteButton 
                v-if="numberOfProjectsToDisplay < projects.length" 
                @click="numberOfProjectsToDisplay += 3"
                class="text-lg"
                buttonText="Mehr">
            </SiteButton>
        </div>
    </div>
</template>

<script setup>
import { computed, ref, watchEffect } from 'vue'
import ProjectCard from '../components/ProjectCard.vue'
import SiteButton from '../components/SiteButton.vue'
import { useProjectStore } from '../stores/projects';
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';

const projectStore = useProjectStore();
const { projects } = storeToRefs(projectStore);
const numberOfProjectsToDisplay = ref(3);
const route = useRoute();

// If the URL ends with '/projekte', set the number of projects to display to 10
watchEffect(() => {
    if (route.path === '/projekte') {
        numberOfProjectsToDisplay.value = 10;
    }
});

// Create a new computed property that returns a subset of the projects array
const slicedProjects = computed(() => projects.value.slice(0, numberOfProjectsToDisplay.value));
</script>