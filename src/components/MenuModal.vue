<template>
    <div @click="updateMenu" class="absolute inset-0 h-full bg-transparent px-24 pt-28 z-10">
        <Transition
            enter-active-class="duration-300 ease-out"
            enter-from-class="transform opacity-0"
            enter-to-class="opacity-100"
            leave-active-class="duration-200 ease-in"
            leave-from-class="opacity-100"
            leave-to-class="transform opacity-0">
            <ul class="bg-eerie-black bg-opacity-90 drop-shadow-lg flex flex-col p-4 text-lg text-center font-semibold text-white blur-none">
                <li class="mb-6 opacity-100">
                    <router-link 
                        :to="{name: 'projects'}"
                        @click="updateMenu"
                        class="hover:text-gray">
                            Projekte
                    </router-link>
                </li>
                <li class="mb-6 opacity-100">
                    <router-link 
                        :to="{name: 'about'}"
                        @click="updateMenu"
                        class="hover:text-gray">
                            Unternehmen
                    </router-link>
                </li>
                <router-link 
                    :to="{name: 'contact'}"
                    @click="updateMenu"
                    class="bg-magenta-haze hover:bg-chinese-violet skew-x-[-8deg] py-1.5 opacity-100">
                        Kontakt
                </router-link>
            </ul>
        </Transition>
    </div>
</template>

<script setup>
const props = defineProps({
    showMenu: {
        type: Boolean,
        required: true
    }
});

const emits = defineEmits(['update-show-menu']);

const updateMenu = () => {
    emits('update-show-menu', !props.showMenu);
}
</script>