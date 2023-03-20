<template>
    <div>
        <h1 v-if="!complete" class="text-4xl text-center font-bold mt-16 mb-8">Neues Projekt</h1>
        <div class="flex flex-col items-center text-eerie-black">
            <FormKit
                v-if="!complete"
                ref="projectForm"
                type="form"
                :actions="false"
                form-class="w-full">
                <FormKit
                    type="text"
                    name="title"
                    minlength=3
                    maxlength=30
                    placeholder="Titel"
                    wrapper-class="flex justify-center"
                    inner-class="bg-white w-full max-w-xl" />
                <FormKit
                    type="textarea"
                    name="description"
                    minlength=3
                    maxlength=1000
                    rows=15
                    placeholder="Beschreibung"
                    outer-class="mb-5"
                    label-class="block mb-1 font-bold text-sm"
                    wrapper-class="flex justify-center"
                    inner-class="bg-white w-full max-w-xl" />
                <FormKit
                    type="date"
                    name="date"
                    outer-class="mb-5"
                    help="Geben Sie das Datum ein, an dem das Objekt fertiggestellt wurde."
                    label-class="block mb-1 font-bold text-sm"
                    wrapper-class="flex justify-center"
                    inner-class="bg-white w-full max-w-xl"
                    help-class="text-white text-center" />
                <FormKit
                    type="text"
                    name="location"
                    minlength=3
                    maxlength=30
                    help="Geben Sie die Adresse, PLZ und den Ort ein, wo das Objekt gebaut wurde."
                    placeholder="Ort"
                    wrapper-class="flex justify-center"
                    inner-class="bg-white w-full max-w-xl"
                    help-class="text-white text-center" />
                <FormKit
                    type="file"
                    name="photos"
                    accept=".jpg,.jpeg,.png,.webp"
                    multiple="true"
                    help="Wählen Sie zwischen 1 und 3 Fotos aus."
                    wrapper-class="flex justify-center"
                    inner-class="bg-white max-w-xl"
                    help-class="text-white text-center" />
            </FormKit>
            <div v-else class="text-white text-2xl text-center font-bold mt-16 mb-8">
                <h1>Projekt erfolgreich erstellt! &#127881;</h1>
            </div>
            <div v-if="!complete" class="mb-12 mt-6 flex justify-center">
                <SiteButton @click="submitHandler" button-text="Erstellen" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { pb } from '../assets/pocketbase'
import SiteButton from '../components/SiteButton.vue'
import { getCoordinates } from '../assets/helpers'

const projectForm = ref(null);
const complete = ref(false);

const submitHandler = async () => {
    const data = projectForm.value.node
    const locationData = await getCoordinates(data.value.location)
    console.log(locationData.results[0])
    const body = new FormData()
    // We can append other data to our form data:
    body.append('title', data.value.title)
    body.append('description', data.value.description)
    body.append('year_completed', data.value.date)
    body.append('location', JSON.stringify(locationData.results[0]))    
    body.append('user', pb.authStore.model.id)
    // upload and create new record
    await pb.collection('projects').create(body);
    // Set complete to 'true' if the form was submitted successfully
    complete.value = true
}
</script>