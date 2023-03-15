<template>
    <button 
        class="text-white font-semibold skew-x-[-8deg] py-1.5 px-4 opacity-100 drop-shadow-lg"
        :class="{ 'bg-magenta-haze hover:bg-chinese-violet': magenta, 'bg-eerie-black hover:bg-gray': !magenta }">
        {{ buttonText }}
    </button>
</template>

<script setup>
const props = defineProps({
  buttonText: String,
  magenta: Boolean
})
</script>