<template>
  <div 
      @click="object.projekttyp ? openProject(object.id) : openGroup(object.id)"
      class="h-72 bg-eerie-black rounded-lg overflow-hidden grayscale hover:grayscale-0">
      <img
          loading="lazy"
          v-if="object.photos.length > 0"
          :src="`${backendUrl}/api/files/${object.collectionId}/${object.id}/${object.photos[0]}`"
          alt="object image"
          width="640"
          height="360"
          class="w-full h-2/3 object-cover rounded-lg bg-white">
      <div v-else class="w-full h-2/3 bg-gray-300 rounded-lg text-center flex items-center justify-center text-4xl md:text-4xl">🚧🏰🚧</div>
      <!-- Object card text -->
      <div class="p-4 overflow-hidden">
          <p class="text-lg font-bold truncate">
              {{ object.name }}
          </p>
          <p class="truncate">
              {{ object.beschreibung }}
          </p>
          <p v-if ="object.ort && object.ende">
              {{ object.ort }}, {{ object.ende.slice(0, 4) }}
          </p>
      </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const { object } = defineProps(['object']);
const router = useRouter();
const backendUrl = import.meta.env.VITE_BACKEND_URL;

const openProject = (id) => {
  router.push({ 
    name: 'project-details', 
    params: { id }
  })
}

const openGroup = (id) => {
  router.push({
    name: 'project-group',
    params: { groupId: id }
  })
}
</script>