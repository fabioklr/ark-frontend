<template>
    <div>
        <div class="text-white text-4xl text-center font-bold mt-16 mb-8">
            <h1>Kontakt</h1>
        </div>
        <div class="flex flex-col items-center">
            <FormKit
                v-if="!complete"
                ref="contactForm"
                type="form"
                :actions="false"
                @submit="formSubmit"
                form-class="w-full">
                <FormKit
                    type="text"
                    name="name"
                    minlength=3
                    maxlength=30
                    placeholder="Vor- und Nachname"
                    wrapper-class="flex justify-center"
                    inner-class="bg-white w-full max-w-xl" />
                <FormKit
                    type="email"
                    name="email"
                    placeholder="Ihre E-Mail"
                    wrapper-class="flex justify-center"
                    inner-class="bg-white w-full max-w-xl" />
                <FormKit
                    type="textarea"
                    name="message"
                    minlength=3
                    maxlength=1000
                    rows=15
                    placeholder="Nachricht"
                    outer-class="mb-5"
                    label-class="block mb-1 font-bold text-sm"
                    wrapper-class="flex justify-center"
                    inner-class="bg-white w-full max-w-xl" />
            </FormKit>
            <div v-else class="text-white text-2xl text-center font-bold mt-16 mb-8">
                <h1>Nachricht gesendet. &#128233; <br> Gerne werde ich mich bei Ihnen melden.</h1>
            </div>
            <div
                v-if="!complete"
                class="my-4 w-full flex justify-center">
                <vue-hcaptcha sitekey="f57d8a5c-4419-470f-afab-8f05bb721b44" size="compact"></vue-hcaptcha>
            </div>
            <div v-if="!complete" class="mb-12 mt-6 flex justify-center">
                <SiteButton @click="submitHandler" button-text="Senden" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import SiteButton from '@/components/SiteButton.vue'
import VueHcaptcha from '@hcaptcha/vue3-hcaptcha';
import emailjs from '@emailjs/browser';

const contactForm = ref(null);
const complete = ref(false);

const submitHandler = () => {
    const data = contactForm.value.node;
    const templateParams = {
        user_name: data.value.name,
        user_email: data.value.email,
        message: data.value.message,
    };

    emailjs.send('service_rkwh0oc', 'contact_form', templateParams, '6VxtryOYsbCjFWTxj')

    complete.value = true;
}
</script>