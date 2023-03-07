<template>
  <div class="relative grid grid-cols-6 bg-gradient-to-t from-magenta-haze
               to-eerie-black min-h-screen md:h-screen md:max-h-screen">
    <div class="absolute inset-x-0 top-0 text-white items-center py-6 px-8 col-span-full flex justify-between z-10">
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
          <ul v-if="showMenu || windowWidth > 768" class="bg-eerie-black bg-opacity-90 md:bg-transparent drop-shadow-lg md:drop-shadow-none 
          md:flex px-8 md:py-0 py-4 md:static md:w-auto w-full absolute top-14">
              <li class="md:mx-4 md:my-0 mb-6 opacity-100 self-center">
                  <router-link :to="{name: 'projects'}" class="font-semibold hover:text-gray">Projekte</router-link>
              </li>
              <li class="md:mx-4 md:my-0 mb-6 opacity-100 self-center">
                  <router-link :to="{name: 'about'}" class="font-semibold hover:text-gray">Unternehmen</router-link>
              </li>
              <router-link to="/kontakt" class="bg-magenta-haze hover:bg-chinese-violet font-sm
                      text-white font-semibold skew-x-[-8deg] py-1.5 px-4 opacity-100">
                  Kontakt
              </router-link>
          </ul>
      </Transition>
    </div>
    <router-view />
    <AuthModal :showModal="showModal" @update-show-modal="showModal = $event" v-if="showModal"/>
    <div class="bottom-0 inset-x-0 top-0 text-white items-end py-6 px-8 text-xs
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
import { RouterView } from 'vue-router';
import AuthModal from './components/AuthModal.vue';

const showMenu = ref(false)
const showModal = ref(false)
const windowWidth = ref(window.innerWidth);

onMounted(() => {
    // Listen to window resize event to close the modal when the window size is changed manually.
    window.addEventListener('resize', () => {
        windowWidth.value = window.innerWidth;
    })
})

watchEffect(() => {
    if (window.location.pathname === '/login') {
        showModal.value = true;
    } else {
        showModal.value = false;
    }
})
</script>
