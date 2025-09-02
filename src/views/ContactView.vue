<template>
    <div>
        <div v-if="!complete" class="text-4xl text-center font-bold mt-16 mb-8">
            <h1>Kontakt</h1>
        </div>
        <div class="flex flex-col items-center text-eerie-black">
            <form
                v-if="!complete"
                ref="contactForm"
                @submit.prevent="submitHandler"
                class="w-full max-w-2xl px-4">
                
                <!-- Name Field -->
                <div class="flex flex-col items-center">
                    <div class="w-full">
                        <div>
                            <input
                                v-model="formData.name"
                                type="text"
                                name="name"
                                placeholder="Vor- und Nachname"
                                required
                                minlength="5"
                                maxlength="30"
                                pattern="^[a-zA-ZäöüÄÖÜß\s]+$"
                                class="bg-white w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                @input="clearError('name')" />
                        </div>
                        <div v-if="errors.name" class="text-center text-red-500 text-sm mt-1">
                            {{ errors.name }}
                        </div>
                    </div>
                </div>

                <!-- Email Field -->
                <div class="flex flex-col items-center mt-4">
                    <div class="w-full">
                        <div>
                            <input
                                v-model="formData.email"
                                type="email"
                                name="email"
                                placeholder="Ihre E-Mail"
                                required
                                class="w-full bg-white p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                @input="clearError('email')" />
                        </div>
                        <div v-if="errors.email" class="text-center text-red-500 text-sm mt-1">
                            {{ errors.email }}
                        </div>
                    </div>
                </div>

                <!-- Message Field -->
                <div class="flex flex-col items-center mt-4">
                    <div class="w-full">
                        <div>
                            <textarea
                                v-model="formData.message"
                                name="message"
                                placeholder="Nachricht"
                                required
                                minlength="5"
                                maxlength="500"
                                rows="15"
                                class="w-full bg-white p-3 border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                                @input="clearError('message')"></textarea>
                        </div>
                        <div v-if="errors.message" class="text-center text-red-500 text-sm mt-1">
                            {{ errors.message }}
                        </div>
                    </div>
                </div>
            </form>
            
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
import { ref, reactive } from 'vue'
import SiteButton from '@/components/SiteButton.vue'
import VueHcaptcha from '@hcaptcha/vue3-hcaptcha';
import { send } from '@emailjs/browser';

const contactForm = ref(null);
const complete = ref(false);
const hcaptchaKey = ref(import.meta.env.VITE_HCAPTCHA_KEY);
const hcaptcha = ref(null);
const verified = ref(false);
const errorMessage = ref(null);

const formData = reactive({
    name: '',
    email: '',
    message: ''
});

const errors = reactive({
    name: '',
    email: '',
    message: ''
});

const validateForm = () => {
    let isValid = true;
    
    // Reset errors
    errors.name = '';
    errors.email = '';
    errors.message = '';
    
    // Name validation
    if (!formData.name.trim()) {
        errors.name = 'Name ist erforderlich';
        isValid = false;
    } else if (formData.name.trim().length < 5 || formData.name.trim().length > 20) {
        errors.name = 'Name muss zwischen 5 und 20 Zeichen lang sein';
        isValid = false;
    } else if (!/^[a-zA-ZäöüÄÖÜß\s]+$/.test(formData.name.trim())) {
        errors.name = 'Name darf nur Buchstaben und Leerzeichen enthalten';
        isValid = false;
    }
    
    // Email validation
    if (!formData.email.trim()) {
        errors.email = 'E-Mail ist erforderlich';
        isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
        errors.email = 'Bitte geben Sie eine gültige E-Mail-Adresse ein';
        isValid = false;
    }
    
    // Message validation
    if (!formData.message.trim()) {
        errors.message = 'Nachricht ist erforderlich';
        isValid = false;
    } else if (formData.message.trim().length < 5 || formData.message.trim().length > 500) {
        errors.message = 'Nachricht muss zwischen 5 und 500 Zeichen lang sein';
        isValid = false;
    }
    
    return isValid;
};

const clearError = (field) => {
    errors[field] = '';
};

const resetForm = () => {
    formData.name = '';
    formData.email = '';
    formData.message = '';
    errors.name = '';
    errors.email = '';
    errors.message = '';
};

const onVerify = () => {
    verified.value = true;
}

const submitHandler = () => {
    if (!validateForm()) {
        return;
    }
    
    if (verified.value) {
        const templateParams = {
            user_name: formData.name.trim(),
            user_email: formData.email.trim(),
            message: formData.message.trim(),
        }

        send('service_rkwh0oc', 'contact_form', templateParams, import.meta.env.VITE_EMAILJS_KEY)
            .then(() => {
                complete.value = true;
                resetForm();
                hcaptcha.value.reset();
                verified.value = false;
            })
            .catch((error) => {
                console.error('Email send error:', error);
                errorMessage.value = 'Fehler beim Senden der Nachricht. Bitte versuchen Sie es erneut.';
            });
    } else {
        errorMessage.value = 'Bitte füllen Sie alle Felder korrekt aus und bestätigen Sie mit hCaptcha.';
    }
}
</script>