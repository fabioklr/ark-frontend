<template>
    <div>
        <div 
            @click="openProject(project.id)" 
            class="w-72 h-80 md:w-96 md:h-96 snap-center drop-shadow-lg hover:drop-shadow-2xl
                    bg-eerie-black rounded-lg cursor-pointer
                    grayscale hover:grayscale-0">
            <img 
                v-if="project.photos.length > 0"
                :src="`${backendUrl}/api/files/nbz149u8u9p575z/${project.id}/${project.photos[0]}`"
                alt="Project image"
                width="640"
                height="360"
                class="w-full h-2/3 object-cover rounded-lg">
            <div v-else class="w-full h-2/3 bg-gray-300 rounded-lg text-center flex items-center justify-center text-4xl">🚧🏰🚧</div>
            <!-- Project card text -->
            <div class="p-4 overflow-hidden">
                <p class="text-lg font-bold truncate">
                    {{ project.name }}
                </p>
                <p class="truncate">
                    {{ project.description }}
                </p>
                <p>
                    {{ project.ort }}, {{ project.year_completed.slice(0, 4) }}
                </p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const { project } = defineProps(['project']);
const router = useRouter();
const backendUrl = import.meta.env.VITE_BACKEND_URL;

const openProject = (projectId) => {
  router.push({ 
    name: 'project-details', 
    params: { id: projectId }
    })
}
</script>