<template>
    <div @click="router.push(`/`); closeModal()" class="fixed z-30 inset-0 overflow-y-auto text-eerie-black">
      <div class="flex items-center justify-center min-h-screen">
        <div @click.stop="keepModal" class="bg-white rounded-lg shadow-lg w-3/4 md:w-1/2 opacity-100 z-40">
          <div class="bg-gray-200 rounded-t-lg px-6 pt-4">
            <h2 class="text-2xl font-semibold">{{ title }}</h2>
          </div>
          <div class="p-6">
            <div>
              <div class="mb-4">
                <input
                  v-if="!isLogin"
                  v-model="userCredentials.username"
                  class="border rounded-lg py-2 px-3 w-full"
                  placeholder="Benuterzname"
                  type="text"
                  required>
              </div>
              <div class="mb-4">
                <input 
                  v-model="userCredentials.email"
                  class="border rounded-lg py-2 px-3 w-full"
                  placeholder="E-Mail"
                  type="email"
                  required>
              </div>
              <div class="mb-4">
                <input
                  v-if="!isLogin"
                  v-model="userCredentials.passcode"
                  class="border rounded-lg py-2 px-3 w-full"
                  placeholder="Code"
                  type="text"
                  required>
              </div>
              <div @keyup.enter="formSubmit" class="mb-4">
                <input
                  v-model="userCredentials.password"
                  class="border rounded-lg py-2 px-3 w-full"
                  placeholder="Passwort"
                  type="password"
                  required>
              </div>
              <div
                v-if="!isLogin"
                class="my-4 w-full flex justify-center">
                <vue-hcaptcha sitekey="f57d8a5c-4419-470f-afab-8f05bb721b44" size="compact"></vue-hcaptcha>
              </div>
              <p v-if="errorMessage" class="text-red-500 mb-4">{{ errorMessage }}</p>
              <div class="flex gap-4 items-center justify-evenly text-xs">
                <!-- Submit button -->
                <SiteButton @click="formSubmit" :magenta="true" :button-text="buttonText" />
                <!-- Cancel button -->
                <SiteButton @click="router.push(`/`); closeModal()" :magenta="false" button-text="Abbrechen" />
              </div>
            </div>
          </div>
        </div>
        <div class="fixed inset-0 bg-eerie-black opacity-50"></div>
      </div>
    </div>
</template>
  

<script setup>
import { reactive } from 'vue';
import { useUserStore } from '@/stores/users.js';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import SiteButton from '@/components/SiteButton.vue';
import VueHcaptcha from '@hcaptcha/vue3-hcaptcha';

const props = defineProps({
  showModal: Boolean,
  isLogin: Boolean
})

const emits = defineEmits(['update-show-modal', 'update-is-login']);
const title = props.isLogin ? 'Login' : 'Registrierung';
const buttonText = props.isLogin ? 'Login' : 'Registrieren';
const userStore = useUserStore();
const { errorMessage, user } = storeToRefs(userStore);
const userCredentials = reactive({
    username: '',
    email: '',
    passcode: '',
    password: ''
})
const router = useRouter();

const clearUserCredentials = () => {
  userCredentials.username = '';
  userCredentials.email = '';
  userCredentials.passcode = '';
  userCredentials.password = '';
}

const closeModal = () => {
    emits('update-show-modal', false);
    clearUserCredentials();
};

const keepModal = (event) => {
    event.stopPropagation();
};

const formSubmit = async () => {
  if (props.isLogin) {
    await userStore.handleLogin({
      email: userCredentials.email,
      password: userCredentials.password
    });
  } else {
    await userStore.handleSignup(userCredentials);
  }
  if (user.value) {
      router.push(`/`);
      userStore.clearErrorMessage();
      closeModal();
      clearUserCredentials();
  }
}
</script>