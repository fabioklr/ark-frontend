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

        <!-- Projects -->
        <div class="my-16 drop-shadow-lg">
            <h2 class="text-white text-center text-4xl font-bold">
                2022
            </h2>
            <!-- Card with project information -->
            <div class="rounded bg-eerie-black mt-4">
                <ProjectCarousel></ProjectCarousel>
                <div class="p-4 text-white">
                    <p class="text-lg font-bold">
                        Project 1
                    </p>
                    <p class="">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    </p>
                </div>
            </div>
        </div>

    </div>
</template>

<script setup>
import ProjectCarousel from './ProjectCarousel.vue'
</script>