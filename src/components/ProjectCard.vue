<template>
    <div @click="openProject(project.id)" class="min-h-64 drop-shadow-lg bg-eerie-black mt-4 rounded flex flex-col">
        <div class="h-3/4 w-full">
            <img :src="`https://mammoth-rainbow.pockethost.io/api/files/nbz149u8u9p575z/${project.id}/${project.photos[0]}`" alt="" class="min-w-full h-full object-cover rounded">
        </div>
        <!-- Project card text -->
        <div class="h-1/4 p-4 text-white overflow-hidden">
            <p class="text-lg font-bold">
                {{ project.title }}
            </p>
            <p>
                {{ truncateDescription(project.description) }}
            </p>
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

const truncateDescription = (string) => {
  return string.length > 50 ? string.substring(0, 50) + "…" : string;
};
</script>