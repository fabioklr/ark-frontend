<template>
    <div class="h-64 drop-shadow-lg bg-eerie-black mt-4 rounded flex flex-col">
        <!-- Carousel -->
        <div class="relative h-3/4">
            <div v-for="(slide, index) in projectImgs">
                <Transition
                    enter-active-class="transition-opacity duration-700 ease-in-out"
                    leave-active-class="transition-opacity duration-700 ease-in-out"
                    enter-from-class="opacity-0"
                    leave-to-class="opacity-0"
                    enter-to-class="opacity-100"
                    leave-from-class="opacity-100">
                    <div v-show="currentSlide === index + 1" class="absolute w-full h-full">
                        <img :src="`/media/${slide}.jpg`" alt="" class="min-w-full h-full object-cover rounded">
                    </div>
                </Transition>
            </div>
            <!-- Carousel navigation -->
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
            <!-- Carousel pagination -->
            <div class="absolute bottom-0 w-full flex justify-center my-2">
                <div v-for="(slide, index) in projectImgs" class="mx-1">
                    <div @click="currentSlide = index + 1" class="w-3 h-3 rounded-full bg-eerie-black bg-opacity-90 
                                cursor-pointer" :class="{'bg-magenta-haze': currentSlide === index + 1}"></div>
                </div>
            </div>
        </div>

        <!-- Project card text -->
        <div class="p-4 text-white">
            <p class="text-lg font-bold">
                {{ project.title }}
            </p>
            <p class="">
                {{ project.description }}
            </p>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const { project } = defineProps(['project'])
// const projectImgs = [project.image_1, project.image_2, project.image_3]
const projectImgs = ['arch-1', 'arch-2', 'arch-3']
const getSlideCount = ref(null);
const currentSlide = ref(1);
const autoPlayEnabled = ref(true);
const timeoutDuration = ref(5000);

const nextSlide = () => {
    if (currentSlide.value < getSlideCount.value) {
        currentSlide.value++;
    } else {
        currentSlide.value = 1;
    }
}

const prevSlide = () => {
    if (currentSlide.value > 1) {
        currentSlide.value--;
    } else {
        currentSlide.value = getSlideCount.value;
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

onMounted(() => {
    getSlideCount.value = projectImgs.length;
})
</script>