<template>
    <div class="p-4 py-24 mt-16">
      <h1 class="text-4xl font-bold mb-4 text-center">{{ group?.name || 'Projektgruppe' }}</h1>
      <table class="w-full bg-transparent text-white">
        <tbody>
          <tr v-for="project in projectsInGroup" :key="project.id" class="border-b border-white">
            <td class="py-8 px-2 text-xl font-bold">{{ project.name }}</td>
            <td class="py-8 px-2 text-xl">{{ project.beschreibung || '' }}</td>
            <td class="py-8 px-2 text-xl">{{ project.ende.slice(0, 4) }}</td>
            <td class="py-8 px-2 text-xl">{{ project.ort }}</td>
          </tr>
        </tbody>
      </table>
    </div>
</template>
  
<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useProjectsStore } from '../stores/projects'
import { storeToRefs } from 'pinia'

const route = useRoute();
const projectStore = useProjectsStore();
const { projects } = storeToRefs(projectStore);
const { groups } = storeToRefs(projectStore);
const groupId = route.params.groupId;

const group = computed(() => {
  return groups.value.find(group => group.id == groupId);
});

// Filter projects that belong to the specified group
const projectsInGroup = computed(() => {
  return projects.value.filter(project => project.projektgruppe == groupId);
});
</script>