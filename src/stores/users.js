import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('users', () => {
    const user = ref(null);
    const errorMessage = ref(null);
    const validateEmail = (email) => {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    };
    const handleLogin = () => {};
    const handleSignup = (credentials) => {
        const {email, password, username} = credentials;
        if (password.length < 6) {
            return errorMessage.value = 'Das Passwort muss mindestens 6 Zeichen lang sein.';
        }
        if (username.length < 4) {
            return errorMessage.value = 'Der Benutzername muss mindestens 4 Zeichen lang sein.';
        }
        if (!validateEmail(email)) {
            return errorMessage.value = 'Bitte gib eine gültige E-Mail Adresse ein.';
        }
    };
    const handleLogout = () => {};
    const getUser = () => {};
    return { user, handleLogin, handleSignup, handleLogout, getUser };
});
