<template>
    <Suspense>
        <div class="flex flex-col items-center">
            <!-- Title -->
            <h1 class="text-4xl text-center pt-20 pb-12 font-bold">{{ store.singleProject.title }}</h1>
            <!-- Photo carousel -->
            <div class="relative w-full md:w-2/3 h-64 md:h-[36rem]">
                <div v-for="(photoUrl, index) in store.singleProject.photos">
                    <Transition
                        enter-active-class="transition-opacity duration-700 ease-in-out"
                        leave-active-class="transition-opacity duration-700 ease-in-out"
                        enter-from-class="opacity-0"
                        leave-to-class="opacity-0"
                        enter-to-class="opacity-100"
                        leave-from-class="opacity-100">
                        <div v-if="currentSlide === index + 1">
                            <img 
                                :src="`https://docker118434-ark-backend.jcloud.ik-server.com/api/files/nbz149u8u9p575z/${store.singleProject.id}/${photoUrl}`"
                                alt="Project image"
                                width="640"
                                height="360"
                                class="absolute w-full h-full object-cover rounded">
                        </div>
                    </Transition>
                </div>
                <div v-if="store.photoCount > 1" class="absolute inset-0 py-0 px-2 w-full flex items-center">
                    <div class="flex-1">
                        <i @click="prevSlide" class="fas fa-chevron-left cursor-pointer flex items-center justify-center 
                                    rounded-full w-8 h-8 bg-eerie-black bg-opacity-90 text-white"></i>
                    </div>
                    <div @click="nextSlide" class="flex-1 flex justify-end ">
                        <i class="fas fa-chevron-right cursor-pointer flex items-center justify-center 
                                    rounded-full w-8 h-8 bg-eerie-black bg-opacity-90 text-white"></i>
                    </div>
                </div>
                <div v-if="store.photoCount > 1" class="absolute bottom-0 w-full flex justify-center my-2">
                    <div v-for="(photo, index) in store.singleProject.photos" class="mx-1">
                        <div @click="currentSlide = index + 1" class="w-3 h-3 rounded-full bg-eerie-black bg-opacity-90 
                                    cursor-pointer" :class="{'bg-magenta-haze': currentSlide === index + 1}"></div>
                    </div>
                </div>
            </div>
            <!-- Project description, location and year of completion -->
            <p class="text-lg my-6">
                {{ store.locationCleaned + ', ' + store.fullYear }}
            </p>
            <p class="text-xl mb-24">
                {{ store.singleProject.description }}
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
import { ref, onMounted, onUnmounted, Suspense } from 'vue'
import { useProjectsStore } from '@/stores/projects';
import { useRoute } from 'vue-router';

const route = useRoute();
const store = useProjectsStore();
const currentSlide = ref(1);
const autoPlayEnabled = ref(true);
const timeoutDuration = ref(5000);
const autoPlayInterval = ref(null);

const nextSlide = () => {
    if (currentSlide.value < store.photoCount) {
        currentSlide.value++;
    } else {
        currentSlide.value = 1;
    }
}

const prevSlide = () => {
    if (currentSlide.value > 1) {
        currentSlide.value--;
    } else {
        currentSlide.value = store.photoCount;
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

onMounted(() => {
    store.getSingleProject(route.params.id);
});

onUnmounted(() => {
    store.$reset;
});
</script>