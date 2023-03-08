import { ref } from 'vue'
import { defineStore } from 'pinia'
import { supabase } from '../assets/supabase'

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
        
        const { error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        });

        if (error) {
            return errorMessage.value = error.message;
        }

        const { data: currentUser } = await supabase
            .from('users')
            .select()
            .eq('email', email)
            .single();

        user.value = {
            id: currentUser.id,
            username: currentUser.username,
            email: currentUser.email
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

        const { data: userWithUsernameAlreadyExists } = await supabase
            .from('users')
            .select()
            .eq('username', username)
            .single();

        if (userWithUsernameAlreadyExists) {
            return errorMessage.value = 'Der Benutzer ist bereits registriert.';
        }
        
        const { error } = await supabase.auth.signUp({
            email,
            password
        })

        if (error) {
            return errorMessage.value = error.message;
        }

        await supabase.from('users').insert({
            username,
            email
        })

        const { data: newUser } = await supabase
            .from('users')
            .select()
            .eq('email', email)
            .single();
    
        user.value = {
            id: newUser.id,
            username: newUser.username,
            email: newUser.email
        }
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        user.value = null;
    };

    const getUser = async () => {
        const { data } = await supabase.auth.getUser();

        if (!data.user) {
            return user.value = null;
        }

        const { data: userWithEmail } = await supabase
            .from('users')
            .select()
            .eq('email', data.user.email)
            .single();
        
        user.value = {
            id: userWithEmail.id,
            username: userWithEmail.username,
            email: userWithEmail.email
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
