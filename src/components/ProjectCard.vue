<template>
    <div>
        <div 
            @click="openProject(project.id)" 
            class="w-72 h-80 md:w-96 md:h-96 snap-center drop-shadow-lg hover:drop-shadow-2xl
                    bg-eerie-black rounded-lg cursor-pointer
                    grayscale hover:grayscale-0">
            <img 
                :src="`https://docker118434-ark-backend.jcloud.ik-server.com/api/files/nbz149u8u9p575z/${project.id}/${project.photos[0]}`"
                alt="Project image"
                width="640"
                height="360"
                class="w-full h-2/3 object-cover rounded-lg">
            <!-- Project card text -->
            <div class="p-4 overflow-hidden">
                <p class="text-lg font-bold truncate">
                    {{ project.title }}
                </p>
                <p class="truncate">
                    {{ project.description }}
                </p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const { project } = defineProps(['project']);
const router = useRouter();

const openProject = (projectId) => {
  router.push({ 
    name: 'project-details', 
    params: { id: projectId }
    })
}
</script>