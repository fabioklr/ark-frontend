<template>
    <div>
        <ul>
            <li v-for="field in fields">
                <input v-model.trim="field.value" type="text" id="field.id">
            </li>
        </ul>
        
        {{ fields['item-1'].value }}
    </div>
</template>

<script setup>
import { ref } from 'vue';
const fields = ref({    
            'item-1': { id: 1, label: 'Name', value: '' },
            'item-2': { id: 2, label: 'E-Mail', value: '' },
            'item-3': { id: 3, label: 'Natel', value: '' },
            'item-4': { id: 4, label: 'Nachricht', value: '' }
    })
</script>