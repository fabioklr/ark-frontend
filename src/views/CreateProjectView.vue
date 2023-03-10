<template>
    <div>
        <div class="text-white text-4xl text-center font-bold mt-16 mb-8">
            <h1>Neues Projekt</h1>
        </div>
        <div class="flex flex-col justify-center">
            <FormKit
                v-if="!complete"
                id="projectForm"
                type="form"
                @submit="submitHandler">
                <FormKit
                    type="text"
                    name="title"
                    minlength=3
                    maxlength=30
                    placeholder="Titel"
                    outer-class="mb-5"
                    wrapper-class="flex justify-center"
                    label-class="block mb-1 font-bold text-sm"
                    inner-class="rounded-lg mb-1 overflow-hidden focus-within:border-blue-500 grow md:max-w-lg"
                    input-class="w-full h-10 px-3 border-none text-base text-gray-700 placeholder-gray-400" />
                <FormKit
                    type="textarea"
                    name="description"
                    minlength=3
                    maxlength=1000
                    rows=15
                    placeholder="Beschreibung"
                    outer-class="mb-5"
                    label-class="block mb-1 font-bold text-sm"
                    inner-class="max-w-md rounded-lg mb-1 overflow-hidden focus-within:border-blue-500"
                    input-class="w-full rounded px-3 border-none text-base text-gray-700 placeholder-gray-400" />
                <FormKit
                    type="date"
                    name="date"
                    outer-class="mb-5"
                    label-class="block mb-1 font-bold text-sm"
                    inner-class="max-w-md rounded-lg mb-1 overflow-hidden focus-within:border-blue-500"
                    input-class="w-full h-10 px-3 border-none text-base text-gray-700 placeholder-gray-400" />
                <FormKit
                    type="file"
                    name="photos"
                    accept=".jpg,.jpeg,.png,.webp"
                    multiple="true"
                    noFiles-class="invisible"
                    inner-class="bg-white rounded-lg"
                    outer-class="mb-12" />
            </FormKit>
            <div v-else class="complete">Projekt erstellt 👍</div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { pb } from '../assets/pocketbase'

const complete = ref(false)

const submitHandler = async (data) => {
    const body = new FormData()
    // We can append other data to our form data:
    body.append('title', data.title)
    body.append('description', data.description)
    body.append('year_completed', data.date)
    data.photos.forEach((fileItem) => {
        console.log(fileItem.file)
        body.append('photos', fileItem.file)
    })

    // upload and create new record
    await pb.collection('projects').create(body);
}
</script>