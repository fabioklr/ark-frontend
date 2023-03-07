<template>
    <div @click="router.push(`/`); closeModal()" class="fixed z-30 inset-0 overflow-y-auto text-eerie-black">
      <div class="flex items-center justify-center min-h-screen">
        <div @click.stop="keepModal" class="bg-white rounded-lg shadow-lg w-3/4 md:w-1/2 opacity-100 z-40">
          <div class="bg-gray-200 rounded-t-lg px-6 py-4">
            <h2 class="text-2xl font-semibold">Login</h2>
          </div>
          <div class="p-6">
            <form>
              <div class="mb-4">
                <label class="block text-gray-700 font-semibold mb-2" for="email">
                  Email
                </label>
                <input class="border rounded-lg py-2 px-3 w-full" type="email" id="email" name="email" required>
              </div>
              <div class="mb-4">
                <label class="block text-gray-700 font-semibold mb-2" for="password">
                  Password
                </label>
                <input class="border rounded-lg py-2 px-3 w-full" type="password" id="password" name="password" required>
              </div>
              <div class="flex items-center justify-between">
                <button class="bg-magenta-haze hover:bg-chinese-violet font-sm
                      text-white font-semibold skew-x-[-8deg] py-1.5 px-4 opacity-100" type="submit">
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
        <div class="fixed inset-0 bg-eerie-black opacity-50"></div>
      </div>
    </div>
</template>
  

<script setup>
import { useRouter } from 'vue-router';
import { defineEmits } from 'vue';

const props = {
    showModal: Boolean,
}

const emits = defineEmits(['update-show-modal']);

const closeModal = () => {
    emits('update-show-modal', false);
};

const keepModal = () => {
    event.stopPropagation();
};

const router = useRouter();
</script>