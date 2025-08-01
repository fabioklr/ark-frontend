<template>
    <div class="flex flex-col justify-center items-center md:my-32">
      <h1 class="text-4xl font-bold mb-4 text-center">{{ projectgroup?.name || 'Projektgruppe' }}</h1>
      <table class="w-full md:w-3/4 lg:w-1/2 bg-transparent text-white">
        <tbody>
          <tr v-for="project in projectsInGroup" :key="project.id" class="border-b border-white">
            <td class="py-8 px-2 text-lg md:text-xl font-bold">{{ project.name }}</td>
            <td class="py-8 px-2 text-lg md:text-xl">{{ project.beschreibung || '' }}</td>
            <td class="py-8 px-2 text-lg md:text-xl">{{ project.ende.slice(0, 4) }}</td>
            <td class="py-8 px-2 text-lg md:text-xl">{{ project.ort }}</td>
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
const { projectgroups } = storeToRefs(projectStore);
const groupId = route.params.groupId;

const projectgroup = computed(() => {
  return projectgroups.value.find(group => group.id == groupId);
});

// Filter projects that belong to the specified group
const projectsInGroup = computed(() => {
  return projects.value.filter(project => project.projektgruppe == groupId);
});
</script>