import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage'

const { apiUrl } = Constants.expoConfig?.extra || {};

export async function getUser(): Promise<any> { 
    try {
        const response = await fetch(`${apiUrl}/users/${await AsyncStorage.getItem('cpf')}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
            },
        });
        const data = await response.json();
        if (data.user) {
            const { password, ...userWithoutPassword } = data.user;
            console.log(userWithoutPassword);
            return userWithoutPassword;
        }
        return Promise.reject('Usuário não encontrado');
    }
    catch (error) {
        console.error(error);
        return Promise.reject('Erro ao obter produtos');
    }
}

export async function deleteUser(): Promise<number> { 
    try {
        const response = await fetch(`${apiUrl}/users/${await AsyncStorage.getItem('cpf')}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
            },
        });
        if (response.status === 200) {
            return response.status;
        } else {
            return Promise.reject(`Erro ao deletar usuário: ${response.status}`);
        }
    }
    catch (error) {
        console.error(error);
        return Promise.reject('Erro ao obter produtos');
    }
}

export async function updateUser(data: any): Promise<number> { 
    try {
        const { username, cpf, id, registerDate, ...dataWithoutUsernameCpf } = data;
        console.log(dataWithoutUsernameCpf);
        const response = await fetch(`${apiUrl}/users/${await AsyncStorage.getItem('cpf')}`, {
            method: 'PATCH',
            headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
            },
            body: JSON.stringify(dataWithoutUsernameCpf),
        });
        if (response.status === 200) {
            return response.status;
        } else {
            return Promise.reject(`Erro ao atualizar usuário: ${response.status}`);
        }
    }
    catch (error) {
        console.error(error);
        return Promise.reject('Erro ao atualizar usuário');
    }
}

export async function getTransactions(): Promise<any[]> { 
    try {
        const response = await fetch(`${apiUrl}/transaction`, {
            method: 'GET',
            headers: {
            Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
            },
        });
        const data = await response.json();
        return data.transactions
    }
    catch (error) {
        console.error(error);
        return Promise.reject('Erro ao pegar as transações usuário');
    }
}