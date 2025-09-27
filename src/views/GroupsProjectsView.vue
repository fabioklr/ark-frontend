<template>
    <div class="flex flex-col min-h-screen p-4 md:p-6 lg:p-8">
        <!-- Projects Map -->
        <div class="w-full max-w-7xl mx-auto my-8 md:my-16">
            <ProjectsMap />
        </div>
        <!-- Title of the project type -->
        <h2 class="text-center text-2xl md:text-3xl font-bold h-24 flex items-center justify-center p-4">
            {{ selectedProjectType?.name || 'alle projekte' }}
        </h2>
        <!-- Activ Fitness Project Groups -->
        <div
            v-if="selectedProjectType?.id === 'i6tcglti5das3fg'"
            class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:px-8 py-8"
        >
            <ObjectCard
                v-for="projectgroup in projectgroups"
                :key="projectgroup.id"
                :object="projectgroup"
            />
        </div>
        <!-- Other Projects -->
        <div
            v-else-if="selectedProjectType"
            class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:px-8 py-8"
        >
            <ObjectCard
                v-for="project in filteredProjects"
                :key="project.id"
                :object="project"
            />
        </div>
        <!-- Fallback -->
        <div
            v-else
            class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:px-8 py-8"
        >
            <ObjectCard
                v-for="project in sortedProjects"
                :key="project.id"
                :object="project"
            />
        </div>
    </div>
</template>

<script setup>
import { computed, defineAsyncComponent, onUnmounted } from 'vue';
import ProjectsMap from '../components/ProjectsMap.vue';
import { useProjectsStore } from '../stores/projects';
import { storeToRefs } from 'pinia';

const ObjectCard = defineAsyncComponent(() =>
    import('../components/ObjectCard.vue')
);

const projectStore = useProjectsStore();
const { projects, projectgroups, selectedProjectType } = storeToRefs(projectStore);

// Computed property for filtered projects, sorted by number of photos
const filteredProjects = computed(() =>
    projects.value
        .filter(
            project =>
                project.projekttyp.some(pt => pt.id === selectedProjectType.value?.id) &&
                !project.projektgruppe?.length
        )
        .sort((a, b) => (b.photos ? b.photos.length : 0) - (a.photos ? a.photos.length : 0))
);

// Computed property for all projects sorted by number of photos
const sortedProjects = computed(() =>
    projects.value
        .slice()
        .sort((a, b) => (b.photos ? b.photos.length : 0) - (a.photos ? a.photos.length : 0))
);
</script>