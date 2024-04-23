<template>
    <Suspense>
        <div class="flex flex-col items-center">
            <!-- Title -->
            <h1 class="text-4xl text-center pt-20 pb-12 font-bold">{{ singleProject.name }}</h1>
            <!-- Photo carousel -->
            <div class="relative w-full md:w-2/3 h-64 md:h-[36rem]">
                <div v-for="(photoUrl, index) in singleProject.photos">
                    <Transition
                        enter-active-class="transition-opacity duration-700 ease-in-out"
                        leave-active-class="transition-opacity duration-700 ease-in-out"
                        enter-from-class="opacity-0"
                        leave-to-class="opacity-0"
                        enter-to-class="opacity-100"
                        leave-from-class="opacity-100">
                        <div v-if="currentSlide === index + 1">
                            <img 
                                :src="`https://docker118434-ark-backend.jcloud.ik-server.com/api/files/nbz149u8u9p575z/${singleProject.id}/${photoUrl}`"
                                alt="Project image"
                                width="640"
                                height="360"
                                class="absolute w-full h-full object-cover rounded">
                        </div>
                    </Transition>
                </div>
                <div v-if="singleProject.photos?.length > 1" class="absolute inset-0 py-0 px-2 w-full flex items-center">
                    <div class="flex-1">
                        <i @click="prevSlide" class="fas fa-chevron-left cursor-pointer flex items-center justify-center 
                                    rounded-full w-8 h-8 bg-eerie-black bg-opacity-90 text-white"></i>
                    </div>
                    <div @click="nextSlide" class="flex-1 flex justify-end ">
                        <i class="fas fa-chevron-right cursor-pointer flex items-center justify-center 
                                    rounded-full w-8 h-8 bg-eerie-black bg-opacity-90 text-white"></i>
                    </div>
                </div>
                <div v-if="singleProject.photos?.length > 1" class="absolute bottom-0 w-full flex justify-center my-2">
                    <div v-for="(photo, index) in singleProject.photos" class="mx-1">
                        <div @click="currentSlide = index + 1" class="w-3 h-3 rounded-full bg-eerie-black bg-opacity-90 
                                    cursor-pointer" :class="{'bg-magenta-haze': currentSlide === index + 1}"></div>
                    </div>
                </div>
            </div>
            <!-- Project description, location and year of completion -->
            <p class="text-lg my-6">
                {{ singleProject.ort + ', ' + singleProject.year_completed?.slice(0, 4) }}
            </p>
            <p class="text-xl mb-24">
                {{ singleProject.description }}
            </p>
        </div>
        <template #fallback>
            <div class="flex justify-center items-center h-screen">
                <div class="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
            </div>
        </template>
    </Suspense>
</template>

<script setup>
import { ref, Suspense, computed } from 'vue'
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

const nextSlide = () => {
    if (currentSlide.value < singleProject.value.photos?.length) {
        currentSlide.value++;
    } else {
        currentSlide.value = 1;
    }
}

const prevSlide = () => {
    if (currentSlide.value > 1) {
        currentSlide.value--;
    } else {
        currentSlide.value = singleProject.value.photos?.length;
    }
}

const autoPlay = () => {
    autoPlayInterval.value = setInterval(() => {
        nextSlide();
    }, timeoutDuration.value);
}

if (autoPlayEnabled.value) {
    autoPlay();
}

// Get a single project based on the id in the route
const singleProject = computed(() => {
    let project = {};
    projects.value.forEach(p => {
        if (p.id === route.params.id) {
            project = p;
        }
    });
    return project;
});
</script>