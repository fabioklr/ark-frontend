<template>
    <div class="col-span-full mx-4">

        <!-- Hero -->
        <div class="mt-24 mb-16 mx-4 flex-col gap-y-2">
            <h1 class="text-white text-center text-4xl font-bold mb-4">
                Design, Planung und Bauleitung aus einer Hand.
            </h1>
            <h2 class="text-center text-lg text-gray">
                Seit 30 Jahren realisiere ich in der ganzen Schweiz Wohnhäuser, Gewerbeflächen, Fitnesscenter und mehr.
            </h2>
        </div>

        <ProjectView />

    </div>
</template>

<script setup>
import ProjectView from '../views/ProjectView.vue'
</script>