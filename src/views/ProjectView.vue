<template>
    <div class="my-16 drop-shadow-lg col-span-full">
        <!-- Card with project information -->
        <div v-for="(project, index) in projects">
            <!-- Header with project's date of completion if first project of the year -->
            <h2 
                v-if="index === 0 || project.year_completed.slice(0, 4) !== projects[index - 1].year_completed.slice(0, 4)"
                class="text-white text-center text-2xl font-bold mb-4 mt-12">
                {{ project.year_completed.slice(0, 4) }}
            </h2>
            <ProjectCard :project="project"></ProjectCard>
        </div>
    </div>
</template>

<script setup>
import { onMounted } from 'vue'
import ProjectCard from '../components/ProjectCard.vue'
import { useProjectStore } from '../stores/projects';
import { storeToRefs } from 'pinia';

const projectStore = useProjectStore();
const { projects } = storeToRefs(projectStore);
</script>