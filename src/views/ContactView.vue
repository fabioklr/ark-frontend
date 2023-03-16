<template>
    <div>
        <div v-if="!complete" class="text-white text-4xl text-center font-bold mt-16 mb-8">
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
                    validation="required|alpha|length:5,20"
                    placeholder="Vor- und Nachname"
                    wrapper-class="flex justify-center"
                    inner-class="bg-white w-full max-w-xl" />
                <FormKit
                    type="email"
                    name="email"
                    placeholder="Ihre E-Mail"
                    validation="required|email"
                    wrapper-class="flex justify-center"
                    inner-class="bg-white w-full max-w-xl" />
                <FormKit
                    type="textarea"
                    name="message"
                    validation="required|length:5,500"
                    rows=15
                    placeholder="Nachricht"
                    outer-class="mb-5"
                    label-class="block mb-1 font-bold text-sm"
                    wrapper-class="flex justify-center"
                    inner-class="bg-white w-full max-w-xl" />
            </FormKit>
            <div v-else class="text-white text-2xl text-center font-bold mt-16 mb-8">
                <h1>Nachricht gesendet &#128233; <br> Gerne werde ich mich bei Ihnen melden.</h1>
            </div>
            <div
                v-if="!complete"
                class="my-4 w-full flex justify-center">
                <vue-hcaptcha
                    id="hcaptcha"
                    sitekey="f57d8a5c-4419-470f-afab-8f05bb721b44"
                    size="compact"
                    theme="dark" />
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
import { getValidationMessages } from '@formkit/validation';

const contactForm = ref(null);
const complete = ref(false);

const submitHandler = () => {
    const validationMessages = getValidationMessages(contactForm.value.node)

    if (!validationMessages.size) {
        hcaptcha.execute();
        const data = contactForm.value.node;
        const templateParams = {
            user_name: data.value.name,
            user_email: data.value.email,
            message: data.value.message,
        }

        emailjs.send('service_rkwh0oc', 'contact_form', templateParams, import.meta.env.VITE_EMAILJS_API_KEY)

        complete.value = true;
    };
}
</script>