<template>
  <div class="relative bg-gradient-to-t from-magenta-haze px-4
               to-eerie-black min-h-screen md:h-screen md:max-h-screen">
    <div class="inset-x-0 top-0 text-white items-center py-6 px-8 col-span-full flex justify-between z-10">
      <router-link :to="{name: 'home'}" class="text-xl italic font-bold z-20">architektur rolf keller</router-link>
      <button @click="showMenu = !showMenu" class="md:hidden
      cursor-pointer text-xl z-20">
          <i v-if="showMenu" class="fa-sharp fa-solid fa-xmark"></i>
          <i v-else class="fa-sharp fa-solid fa-bars"></i>
      </button>
        <Transition
            enter-active-class="duration-300 ease-out"
            enter-from-class="transform opacity-0"
            enter-to-class="opacity-100"
            leave-active-class="duration-200 ease-in"
            leave-from-class="opacity-100"
            leave-to-class="transform opacity-0"
            >
            <ul v-if="showMenu || windowWidth > 768" class="absolute bg-eerie-black bg-opacity-90 md:bg-transparent drop-shadow-lg md:drop-shadow-none 
            md:flex w-3/4 px-4 md:py-0 py-4 md:static md:w-auto text-white top-14">
                <li class="md:mx-4 md:my-0 mb-6 opacity-100 self-center">
                    <router-link :to="{name: 'projects'}" @click="showMenu = !showMenu" class="font-semibold hover:text-gray">Projekte</router-link>
                </li>
                <li class="md:mx-4 md:my-0 mb-6 opacity-100 self-center">
                    <router-link :to="{name: 'about'}" @click="showMenu = !showMenu" class="font-semibold hover:text-gray">Unternehmen</router-link>
                </li>
                <router-link :to="{name: 'contact'}" @click="showMenu = !showMenu" class="bg-magenta-haze hover:bg-chinese-violet font-sm
                        text-white font-semibold skew-x-[-8deg] py-1.5 px-4 opacity-100">
                    Kontakt
                </router-link>
            </ul>
        </Transition>
    </div>
    <router-view />
    <AuthModal :showModal="showModal" :isLogin="isLogin" @update-show-modal="showModal = $event" v-if="showModal"/>
    <div v-if="user" class="flex justify-evenly mb-8">
        <SiteButton buttonText="Neues Projekt" @click="createNewProject" />
        <SiteButton buttonText="Logout" @click="logoutSubmit" />
    </div>
    <div class="bottom-0 inset-x-0 top-0 text-white items-end py-6 text-xs
                col-span-full flex justify-between z-10 h-12">
      <p>
        Copyright &copy; {{ new Date().getFullYear() }} by Rolf Keller.<br> All rights reserved.
      </p>
      <p>
        ark@arkeller.ch
      </p>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watchEffect } from 'vue';
import { RouterView, useRouter, useRoute } from 'vue-router';
import SiteButton from './components/SiteButton.vue';
import AuthModal from './components/AuthModal.vue';
import { useUserStore } from './stores/users';
import { useProjectStore } from './stores/projects';
import { storeToRefs } from 'pinia';

const showMenu = ref(false)
const showModal = ref(false)
const isLogin = ref(false)
const windowWidth = ref(window.innerWidth);
const userStore = useUserStore();
const projectStore = useProjectStore();
const { user } = storeToRefs(userStore);
const router = useRouter();
const route = useRoute();

onMounted(() => {
    // Auth refresh
    userStore.getUser();
    // Get projects from API
    projectStore.getProjects();
    // Listen to window resize event to close the modal when the window size is changed manually.
    window.addEventListener('resize', () => {
        windowWidth.value = window.innerWidth;
    })
})

const logoutSubmit = () => {
    userStore.handleLogout();
}

const createNewProject = () => {
    router.push({name: 'create-project'});
}

watchEffect(() => {
    if (route.path === '/signup') {
        showModal.value = true;
    } else if (route.path === '/login') {
        showModal.value = true;
        isLogin.value = true;
    } else {
        showModal.value = false;
        isLogin.value = false;
    }
})
</script>
