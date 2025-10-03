import Constants from 'expo-constants'; // novo
import { BiData } from 'react-icons/bi';

const { apiUrl } = Constants.expoConfig?.extra || {};

export async function fakeLogin(email: string, password: string): Promise<string> {
    if (email === 'teste@example.com' && password === '123') {
        return Promise.resolve('fake-jwt-token');
    }
    return Promise.reject('Credenciais inválidas');
}

export async function requestLogin(email: string, password: string): Promise<{ jwt: string; cpfValue: string }> {
    try {
        const response = await fetch(`${apiUrl}/users/login`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({email, password}),
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Erro no login');
        }
        const jwt = data.token;
        console.log(jwt)
        const cpfValue = data.user.cpf;
        return Promise.resolve({ jwt, cpfValue });
    }
    catch (error) {
        return Promise.reject(error);
    }
}

export async function requestRegister(email: string, password: string, username: string, cpf: string, name: string): Promise<string> {
    try {
        const response = await fetch(`${apiUrl}/users/`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({email, password, username, cpf, fullName: name}),
        });
        const data = await response.json();
        if (!response.ok) {
            console.log(data)
            throw new Error(data.message || 'Erro ao registrar');
        }
        return Promise.resolve("success");
    }
    catch (error) {
        console.error(error);
        return Promise.reject(error);
    }
}