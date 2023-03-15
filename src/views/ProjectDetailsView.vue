<template>
    <div>
        <!-- Title -->
        <div class="flex place-content-center text-white font-bold text-4xl text-center py-12 mt-6">
            <h1>{{ project.title }}</h1>
        </div>
        <!-- Photo carousel -->
        <div class="relative h-64">
            <div v-for="(photoUrl, index) in project.photos">
                <Transition
                    enter-active-class="transition-opacity duration-700 ease-in-out"
                    leave-active-class="transition-opacity duration-700 ease-in-out"
                    enter-from-class="opacity-0"
                    leave-to-class="opacity-0"
                    enter-to-class="opacity-100"
                    leave-from-class="opacity-100">
                    <div v-show="currentSlide === index + 1" class="absolute w-full h-full">
                        <img :src="`https://docker118434-ark-backend.jcloud.ik-server.com/api/files/nbz149u8u9p575z/${project.id}/${photoUrl}`" alt="" class="min-w-full h-full object-cover rounded">
                    </div>
                </Transition>
            </div>
            <div v-if="photoCount > 1" class="absolute inset-0 py-0 px-2 w-full flex items-center">
                <div class="flex-1">
                    <i @click="prevSlide" class="fas fa-chevron-left cursor-pointer flex items-center justify-center 
                                rounded-full w-8 h-8 bg-eerie-black bg-opacity-90 text-white"></i>
                </div>
                <div @click="nextSlide" class="flex-1 flex justify-end ">
                    <i class="fas fa-chevron-right cursor-pointer flex items-center justify-center 
                                rounded-full w-8 h-8 bg-eerie-black bg-opacity-90 text-white"></i>
                </div>
            </div>
            <div v-if="photoCount > 1" class="absolute bottom-0 w-full flex justify-center my-2">
                <div v-for="(photo, index) in project.photos" class="mx-1">
                    <div @click="currentSlide = index + 1" class="w-3 h-3 rounded-full bg-eerie-black bg-opacity-90 
                                cursor-pointer" :class="{'bg-magenta-haze': currentSlide === index + 1}"></div>
                </div>
            </div>
        </div>
        <!-- Project description and year of completion -->
        <div class="flex flex-col place-content-center text-white text-center py-12">
            <p class="text-lg mb-6">
                Jahr: {{ project.year_completed.slice(0, 4) }}
            </p>
            <p class="text-lg">
                {{ project.description }}
            </p>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useProjectStore } from '../stores/projects';
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';

const route = useRoute();
const projectStore = useProjectStore();
const { projects } = storeToRefs(projectStore);
const project = projects.value.find(project => project.id === route.params.id);
console.log(project.photos);
const photoCount = project.photos.length;
const currentSlide = ref(1);
const autoPlayEnabled = ref(true);
const timeoutDuration = ref(5000);

const nextSlide = () => {
    if (currentSlide.value < photoCount) {
        currentSlide.value++;
    } else {
        currentSlide.value = 1;
    }
}

const prevSlide = () => {
    if (currentSlide.value > 1) {
        currentSlide.value--;
    } else {
        currentSlide.value = photoCount;
    }
}

const autoPlay = () => {
    setInterval(() => {
        nextSlide();
    }, timeoutDuration.value)
}

if (autoPlayEnabled.value) {
    autoPlay();
}
</script>