<template>
    <!-- Carousel -->
    <div class="relative h-56 drop-shadow-lg">
        <div v-for="(slide, index) in carouselSlides" :key="index">
            <Transition
                enter-active-class="transition-opacity duration-700 ease-in-out"
                leave-active-class="transition-opacity duration-700 ease-in-out"
                enter-from-class="opacity-0"
                leave-to-class="opacity-0"
                enter-to-class="opacity-100"
                leave-from-class="opacity-100">
                <div v-show="currentSlide === index + 1" class="top-0 left-0 w-full max-h-full h-full absolute">
                    <img :src="`/media/${slide}.jpg`" alt="" class="min-w-full h-full object-cover rounded">
                </div>
            </Transition>
        </div>
        <!-- Carousel navigation -->
        <div class="absolute py-0 px-2 h-full w-full flex items-center">
            <div class="flex-1">
                <i @click="prevSlide" class="fas fa-chevron-left cursor-pointer flex items-center justify-center 
                            rounded-full w-8 h-8 bg-eerie-black bg-opacity-90 text-white"></i>
            </div>
            <div @click="nextSlide" class="flex-1 flex justify-end ">
                <i class="fas fa-chevron-right cursor-pointer flex items-center justify-center 
                            rounded-full w-8 h-8 bg-eerie-black bg-opacity-90 text-white"></i>                </div>
        </div>
        <!-- Carousel pagination -->
        <div class="absolute bottom-0 left-0 w-full flex justify-center my-2">
            <div v-for="(slide, index) in carouselSlides" :key="index" class="mx-1">
                <div @click="currentSlide = index + 1" class="w-3 h-3 rounded-full bg-eerie-black bg-opacity-90 
                            cursor-pointer" :class="{'bg-magenta-haze': currentSlide === index + 1}"></div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const carouselSlides = ["arch-1", "arch-2", "arch-3"];
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
    getSlideCount.value = carouselSlides.length;
})
</script>