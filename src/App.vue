<template>
    <div :class="{ 'blur-sm': showMenu }" class="flex flex-col bg-gradient-to-t from-magenta-haze to-eerie-black text-white max-w-full overflow-x-hidden min-h-screen">
        <!-- Header -->
        <div class="flex items-center justify-between px-4 py-6 w-full">
            <!-- Logo -->
            <div class="flex-none">
                <router-link :to="{name: 'home'}" class="text-xl md:text-3xl italic font-bold z-20">architektur rolf keller</router-link>
            </div>
            <!-- Hamburger Menu (Mobile Only) -->
            <div @click="showMenu = !showMenu" class="block md:hidden text-xl">
                <i class="fa-sharp fa-solid fa-bars"></i>
            </div>
            <!-- Desktop Navigation Links -->
            <div class="hidden md:flex md:items-center md:text-2xl">
                <div class="mx-4 my-0">
                    <router-link @click="projectStore.setSelectedProjectType(null)" :to="{name: 'projects'}" class="font-semibold hover:text-gray">projekte</router-link>
                </div>
                <div class="mx-4 my-0">
                    <router-link :to="{name: 'about'}" class="font-semibold hover:text-gray">unternehmen</router-link>
                </div>
                <div class="mx-4 my-0">
                    <router-link :to="{name: 'contact'}" class="inline-block bg-magenta-haze hover:bg-chinese-violet text-white font-semibold skew-x-[-8deg] py-1.5 px-4">kontakt</router-link>
                </div>
            </div>
        </div>
        <!-- Main content -->
        <div class="flex-grow">
            <router-view v-if="!isLoading" />
        </div>
        <!-- Copyright section -->
        <div class="flex justify-between items-end px-4 py-6 text-white text-xs">
            <p>Copyright &copy; {{ new Date().getFullYear() }} Architektur Rolf Keller.<br>All rights reserved.</p>
            <p>ark@arkeller.ch</p>
        </div>
    </div>
    <!-- Menu Modal -->
    <MenuModal 
        :showMenu="showMenu"
        @update-show-menu="showMenu = $event"
        v-if="showMenu"
    />
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
    try {
        // Get projects from API
        await projectStore.fetchProjects();
        await projectStore.fetchProjectGroups();
    } catch (error) {
        console.error("Failed to load initial data:", error);
    } finally {
        isLoading.value = false;
    }
});
</script>
