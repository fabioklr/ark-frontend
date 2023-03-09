import { ref } from 'vue'
import { defineStore } from 'pinia'
import { pb } from '../assets/pocketbase'

export const useUserStore = defineStore('users', () => {
    const user = ref(null);
    const errorMessage = ref(null);

    const validateEmail = (email) => {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    };

    const handleLogin = async (credentials) => {
        const { email, password } = credentials;

        if (!validateEmail(email)) {
            return errorMessage.value = 'Bitte gib eine gültige E-Mail Adresse ein.';
        }

        if (!password.length) {
            return errorMessage.value = 'Das Passwort kann nicht leer sein.';
        }
        
        const authData = await pb.collection('users').authWithPassword(email, password);

        if (!pb.authStore.isValid) {
            return errorMessage.value = authData.message;
        }

        user.value = {
            id: authData.record.id,
            username: authData.record.username,
            email: authData.record.email
        }
    };

    const handleSignup = async (credentials) => {
        const {username, email, password} = credentials;
        if (username.length < 3) {
            return errorMessage.value = 'Der Benutzername muss mindestens 3 Zeichen lang sein.';
        }
        if (!validateEmail(email)) {
            return errorMessage.value = 'Bitte gib eine gültige E-Mail Adresse ein.';
        }
        if (password.length < 6) {
            return errorMessage.value = 'Das Passwort muss mindestens 6 Zeichen lang sein.';
        }
        errorMessage.value = '';

        const userExists = await pb.collection('users').getFirstListItem(`username="${username}"`, {
            expand: 'relField1,relField2.subRelField',
        });

        if (userExists.code === 404) {
            return errorMessage.value = userExists.message;
        }
        
        const data = {
            "username": username,
            "email": email,
            "emailVisibility": true,
            "verified": true,
            "password": password,
            "passwordConfirm": password,
            "name": "test"
        };
        
        const newUser = await pb.collection('users').create(data);

        if (newUser.code === 400 || newUser.code === 403) {
            return errorMessage.value = newUser.message;
        }
    
        user.value = {
            id: newUser.id,
            username: newUser.username,
            email: newUser.email
        }
    };

    const handleLogout = async () => {
        pb.authStore.clear();
        user.value = null;
    };

    const getUser = async () => {
        if (pb.authStore.token) {
            const authData = await pb.collection('users').authRefresh();
            user.value = {
                id: authData.record.id,
                username: authData.record.username,
                email: authData.record.email
            }
        }
    };

    const clearErrorMessage = () => {
        errorMessage.value = '';
    };

    return { 
                user,
                errorMessage,
                user,
                handleLogin,
                handleSignup,
                handleLogout,
                getUser,
                clearErrorMessage 
            };
});
