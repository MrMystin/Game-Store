import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage'

const { apiUrl } = Constants.expoConfig?.extra || {};

export async function getCatalog(): Promise<any[]> { 
    try {
        const response = await fetch(`${apiUrl}/products/`);
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.error(error);
        return Promise.reject('Erro ao obter produtos');
    }
}

export async function getProduct(id: string): Promise<any[]> { 
    try {
        const response = await fetch(`${apiUrl}/products/${id}`);
        const data = await response.json();
        return data.product;
    }
    catch (error) {
        console.error(error);
        return Promise.reject('Erro ao obter produtos');
    }
}

type ItemToBuy = {
  productId: number;
};

export async function buyProduct(itemsToBuy: ItemToBuy[]): Promise<any[]> {
  try {
    const token = await AsyncStorage.getItem("token");

    const body = {
      paymentType: "credit_card",
      transactionItems: itemsToBuy.map(item => ({
        productId: item.productId,
      })),
    };

    const response = await fetch(`${apiUrl}/transaction/`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });
    console.log(response)
    const data = await response.json();
    console.log(data)
    return data.product;
  } catch (error) {
    console.error(error);
    return Promise.reject('Erro ao processar a transação');
  }
}