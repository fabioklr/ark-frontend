<template>
    <!-- Hero Section -->
    <div class="h-[45vh] md:h-[60vh] flex flex-col justify-center items-center gap-y-4 text-center px-4 md:px-8">
        <h1 class="text-4xl md:text-6xl lg:text-8xl font-bold leading-tight tracking-wide md:mx-28">
            design, planung und bauleitung aus einer hand.
        </h1>
        <h2 class="text-lg md:text-2xl lg:text-3xl text-gray max-w-2xl mx-auto">
            seit 30 jahren realisiere ich in der ganzen Schweiz wohnhäuser,
            gewerbeflächen, fitnesscenter und mehr.
        </h2>
    </div>
    <!-- Project Types Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-4 md:px-8 py-8">
        <div
            v-for="projectType in sortedProjectTypes"
            :key="projectType.id"
            @click="navigateToGroupsProjects(projectType)"
            class="cursor-pointer"
        >
            <div v-if="projectType.count > 0" class="flex flex-col">
                <div class="text-center text-2xl md:text-3xl font-bold h-24 lg:h-36 flex items-center justify-center p-4">
                    {{ projectType.name }}
                </div>
                <div class="w-auto h-64 md:h-72 bg-white rounded-lg overflow-hidden md:grayscale hover:grayscale-0">
                    <img
                        loading="lazy"
                        v-if="projectType.image"
                        :src="`${backendUrl}/api/files/${projectType.collectionId}/${projectType.id}/${projectType.image}`"
                        :alt="`Bild für ${projectType.name}`"
                        class="w-full h-full object-cover"
                    />
                    <div v-else class="flex items-center justify-center h-full text-4xl md:text-6xl bg-gray-200">
                        🚧🏰🚧
                    </div>
                </div>
                <div class="p-4 text-center">
                    <p class="text-lg font-bold text-gray-800">
                        {{ projectType.count }}
                        {{ projectType.count === 1 ? "Projekt" : "Projekte" }}
                    </p>
                </div>
            </div>
        </div>
    </div>
    <!-- Fallback if no project types -->
    <div v-if="sortedProjectTypes.length === 0" class="text-center py-8 text-gray text-lg">
        Keine Projektarten verfügbar. Bitte später erneut versuchen.
    </div>
</template>

<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useProjectsStore } from "@/stores/projects";
import { storeToRefs } from "pinia";

const backendUrl = import.meta.env.VITE_BACKEND_URL;
const router = useRouter();
const projectStore = useProjectsStore();
const { projecttypes } = storeToRefs(projectStore);

// Computed sorted project types
const sortedProjectTypes = computed(() =>
    projecttypes.value
        .slice()
        .sort((a, b) => b.count - a.count)
);

// Navigate to projects filtered by type
const navigateToGroupsProjects = (projectType) => {
    projectStore.setSelectedProjectType(projectType); // Pass entire object
    router.push({
        path: "/projekte",
    });
};
</script>