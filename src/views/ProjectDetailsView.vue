<template>
    <div class="flex flex-col items-center">
        <!-- Title -->
        <h1 class="text-4xl text-center pt-20 pb-12 font-bold">{{ project.name }}</h1>
        <!-- Photo carousel -->
        <div v-if="project.photos?.length > 1" class="relative w-full md:w-2/3 h-64 md:h-[36rem]">
            <div v-for="(photoUrl, index) in project.photos">
                <Transition
                    enter-active-class="transition-opacity duration-700 ease-in-out"
                    leave-active-class="transition-opacity duration-700 ease-in-out"
                    enter-from-class="opacity-0"
                    leave-to-class="opacity-0"
                    enter-to-class="opacity-100"
                    leave-from-class="opacity-100">
                    <div v-if="currentSlide === index + 1">
                        <img
                            loading="lazy"
                            :src="`${backendUrl}/api/files/nbz149u8u9p575z/${project.id}/${photoUrl}`"
                            alt="Project image"
                            width="640"
                            height="360"
                            class="absolute w-full h-full object-contain rounded bg-white">
                    </div>
                </Transition>
            </div>
            <div class="absolute inset-0 py-0 px-2 w-full flex items-center">
                <div class="flex-1">
                    <i @click="prevSlide" class="fas fa-chevron-left cursor-pointer flex items-center justify-center 
                                rounded-full w-8 h-8 bg-eerie-black bg-opacity-90 text-white"></i>
                </div>
                <div @click="nextSlide" class="flex-1 flex justify-end ">
                    <i class="fas fa-chevron-right cursor-pointer flex items-center justify-center 
                                rounded-full w-8 h-8 bg-eerie-black bg-opacity-90 text-white"></i>
                </div>
            </div>
            <div class="absolute bottom-0 w-full flex justify-center my-2">
                <div v-for="(photo, index) in project.photos" class="mx-1">
                    <div @click="currentSlide = index + 1" class="w-3 h-3 rounded-full bg-eerie-black bg-opacity-90 
                                cursor-pointer" :class="{'bg-magenta-haze': currentSlide === index + 1}"></div>
                </div>
            </div>
        </div>
        <div v-else-if="project.photos?.length === 1" class="relative w-full md:w-2/3 h-64 md:h-[36rem]">
            <img
                loading="lazy"
                :src="`${backendUrl}/api/files/nbz149u8u9p575z/${project.id}/${project.photos[0]}`"
                alt="Project image"
                width="640"
                height="360"
                class="absolute w-full h-full object-contain rounded bg-white">
        </div>
        <!-- Project description, location and year of completion -->
        <p class="text-lg my-6">
            {{ project.ort + ', ' + project.ende?.slice(0, 4) }}
        </p>
        <p class="text-xl text-center mb-24">
            {{ project.beschreibung }}
        </p>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useProjectsStore } from '@/stores/projects';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';

const route = useRoute();
const currentSlide = ref(1);
const autoPlayEnabled = ref(true);
const timeoutDuration = ref(5000);
const autoPlayInterval = ref(null);
const projectStore = useProjectsStore();
const { projects } = storeToRefs(projectStore);
const backendUrl = import.meta.env.VITE_BACKEND_URL;

const nextSlide = () => {
    currentSlide.value = (currentSlide.value % project.value.photos?.length) + 1;
}

const prevSlide = () => {
    currentSlide.value = currentSlide.value === 1 
        ? project.value.photos?.length 
        : currentSlide.value - 1;
}

const autoPlay = () => {
    autoPlayInterval.value = setInterval(nextSlide, timeoutDuration.value);
}

if (autoPlayEnabled.value) {
    autoPlay();
}

// Get a single project based on the id in the route
const project = computed(() => 
    projects.value.find(p => p.id === route.params.id) || {}
);
</script>