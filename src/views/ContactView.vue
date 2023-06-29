<template>
    <div>
        <div v-if="!complete" class="text-4xl text-center font-bold mt-16 mb-8">
            <h1>Kontakt</h1>
        </div>
        <div class="flex flex-col items-center text-eerie-black">
            <FormKit
                v-if="!complete"
                ref="contactForm"
                type="form"
                :actions="false"
                form-class="w-full">
                <FormKit
                    type="text"
                    name="name"
                    minlength=3
                    maxlength=30
                    validation="required|alpha_spaces:latin|length:5,20"
                    placeholder="Vor- und Nachname"
                    outer-class="flex flex-col items-center"
                    wrapper-class="w-full"
                    inner-class="bg-white"
                    message-class="text-center" />
                <FormKit
                    type="email"
                    name="email"
                    placeholder="Ihre E-Mail"
                    validation="required|email"
                    outer-class="flex flex-col items-center"
                    wrapper-class="w-full"
                    inner-class="bg-white"
                    message-class="text-center" />
                <FormKit
                    type="textarea"
                    name="message"
                    validation="required|length:5,500"
                    rows=15
                    placeholder="Nachricht"
                    outer-class="flex flex-col items-center"
                    wrapper-class="w-full"
                    inner-class="bg-white"
                    message-class="text-center" />
            </FormKit>
            <div v-else class="text-4xl text-center text-white font-bold mt-16 mb-8">
                <h1>Nachricht gesendet &#128233; <br> Gerne werde ich mich bei Ihnen melden.</h1>
            </div>
            <div
                v-if="!complete"
                class="my-4 w-full flex justify-center">
                <vue-hcaptcha
                    ref="hcaptcha"
                    :sitekey="hcaptchaKey"
                    size="compact"
                    theme="dark"
                    @verify="onVerify" />
            </div>
            <div v-if="errorMessage" class="text-center text-red-500">
                {{ errorMessage }}
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
import * as formkitValidation from '@formkit/validation';

const contactForm = ref(null);
const complete = ref(false);
const hcaptchaKey = ref(import.meta.env.VITE_HCAPTCHA_KEY);
const hcaptcha = ref(null);
const verified = ref(false);
const errorMessage = ref(null);

const onVerify = () => {
    verified.value = true;
}

const submitHandler = () => {
    hcaptcha.value.execute();
    const validationMessages = formkitValidation.getValidationMessages(contactForm.value.node);
    if (!validationMessages.size && verified.value) {
        const data = contactForm.value.node;
        const templateParams = {
            user_name: data.value.name,
            user_email: data.value.email,
            message: data.value.message,
        }

        emailjs.send('service_rkwh0oc', 'contact_form', templateParams, import.meta.env.VITE_EMAILJS_KEY)

        complete.value = true;
    } else {
        errorMessage.value = 'Bitte füllen Sie alle Felder korrekt aus und bestätigen Sie mit hCaptcha.';
    };
}
</script>