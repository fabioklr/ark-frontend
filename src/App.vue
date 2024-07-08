<template>
    <div class="relative min-h-screen bg-gradient-to-t from-magenta-haze to-eerie-black text-white">
        <div :class="{ 'blur-sm': showMenu }" class="min-h-screen">
            <!-- Header -->
            <div class="text-white items-center px-4 py-6 flex justify-between">
                <router-link :to="{name: 'home'}" class="text-xl md:text-3xl italic font-bold z-20">architektur rolf keller</router-link>
                    <div v-if="windowWidth < 768" @click="showMenu = !showMenu" class="text-xl">
                        <i v-if="showMenu" class="fa-sharp fa-solid fa-xmark"></i>
                        <i v-else class="fa-sharp fa-solid fa-bars"></i>
                    </div>
                    <div v-else class="flex flex-row md:text-2xl">
                        <div class="mx-4 my-0 opacity-100 self-center">
                            <router-link :to="{name: 'projects'}" class="font-semibold hover:text-gray">projekte</router-link>
                        </div>
                        <div class="mx-4 my-0 opacity-100 self-center">
                            <router-link :to="{name: 'about'}" class="font-semibold hover:text-gray">unternehmen</router-link>
                        </div>
                        <router-link :to="{name: 'contact'}" class="bg-magenta-haze hover:bg-chinese-violet font-sm text-white font-semibold skew-x-[-8deg] py-1.5 px-4 opacity-100">kontakt</router-link>
                    </div>
            </div>
        <!-- Main content -->
        <main>
          <router-view v-if="!isLoading" />
        </main>
    </div>
    <!-- Copyright section -->
    <div class="absolute inset-4 pointer-events-none">
        <div class="flex justify-between items-end h-full text-white text-xs">
            <p>Copyright &copy; {{ new Date().getFullYear() }} Architektur Rolf Keller.<br> Alle Rechte vorbehalten.</p>
            <p>ark@arkeller.ch</p>
        </div>
    </div>
  
      <MenuModal 
        :showMenu="showMenu"
        @update-show-menu="showMenu = $event"
        v-if="showMenu" />
    </div>
  </template>

<script setup>
import { onMounted, ref } from 'vue';
import { RouterView } from 'vue-router';
import MenuModal from './components/MenuModal.vue';
import { useProjectsStore } from './stores/projects';

const showMenu = ref(false)
const windowWidth = ref(window.innerWidth);
const projectStore = useProjectsStore();
const isLoading = ref(true);

onMounted(async () => {
    // Get projects from API
    await projectStore.getProjects();
    isLoading.value = false;
    // Update window width on resize
    window.addEventListener('resize', () => {
        windowWidth.value = window.innerWidth;
    });
});
</script>
