<template>
    <div class="my-16 drop-shadow-lg col-span-full mx-4">
        <!-- Card with project information -->
        <div v-for="(project, index) in projects">
            <!-- Header with project's date of completion if first project of the year -->
            <h2 
                v-if="index === 0 || project.date_of_completion.slice(0, 4) !== projects[index - 1].date_of_completion.slice(0, 4)"
                class="text-white text-center text-2xl font-bold mb-4 mt-12">
                {{ project.date_of_completion.slice(0, 4) }}
            </h2>
            <ProjectCard :project="project"></ProjectCard>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '../assets/supabase'
import ProjectCard from '../components/ProjectCard.vue'

const projects = ref([])

async function getProjects() {
    let { data } = await supabase.from('Projects').select()
    projects.value = data
    // Sort projects in descending order by date_of_completion
    projects.value.sort((a, b) => {
        return new Date(b.date_of_completion) - new Date(a.date_of_completion)
    })
}

onMounted(() => {
    getProjects()
})
</script>