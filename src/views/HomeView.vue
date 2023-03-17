<template>
    <div class="mt-12 md:mt-32">

        <!-- Hero -->
        <div class="md:mb-24 flex flex-col md:px-44 gap-y-2 text-center">
            <h1 class="text-4xl md:text-7xl font-bold">
                Design, Planung und Bauleitung aus einer Hand.
            </h1>
            <h2 class="text-lg md:text-2xl text-gray">
                Seit 30 Jahren realisiere ich in der ganzen Schweiz Wohnhäuser, Gewerbeflächen, Fitnesscenter und mehr.
            </h2>
        </div>

        <ProjectView />

    </div>
</template>

<script setup>
import ProjectView from '../views/ProjectView.vue'
</script>