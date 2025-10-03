import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import Constants from 'expo-constants';
import { useNavigation } from '@react-navigation/native';
import { buyProduct } from '../services/catalogServices';
import { useShop } from '../contexts/ShopContext';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList, AuthTabParamList } from '../navigation/types';

function PaymentScreen({ route }: any) {
  const { clearCart } = useShop();
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [ccv, setCcv] = useState('');

  const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
  const { apiUrl } = Constants.expoConfig?.extra || {};

  const rawProducts = route?.params?.products || route?.params?.product;

  const products = Array.isArray(rawProducts) ? rawProducts : rawProducts ? [rawProducts] : [];

  // Função para obter a imagem do produto
  function getProductImageUrl(product: any) {
    const banner = product.photos?.find((p: any) => p.type?.toLowerCase() === 'banner');
    const photo = banner || product.photos?.[0];
    if (photo) {
      return `${apiUrl}/images/${product.id}/${photo.photo}`;
    }
    return undefined;
  }

  // Funções de formatação de inputs
  function handleCardNumberChange(text: string) {
    if (!text) text = "";
    let value = text.replace(/\D/g, "");
    if (value.length > 16) value = value.slice(0, 16);
    const formattedValue = value.match(/.{1,4}/g)?.join(" ") || "";
    setCardNumber(formattedValue);
  }

  function handleCardExpiryChange(text: string) {
    if (!text) text = "";
    let value = text.replace(/\D/g, "");
    if (value.length > 4) value = value.slice(0, 4);
    if (value.length >= 3) {
      value = value.slice(0, 2) + "/" + value.slice(2);
    }
    setExpiryDate(value);
  }

  function handleCardCcvChange(text: string) {
    if (!text) text = "";
    let value = text.replace(/\D/g, "");
    if (value.length > 3) value = value.slice(0, 3);
    setCcv(value);
  }

  // Valor total
  const totalValue = products.reduce(
    (acc: number, prod: any) => acc + parseFloat(prod.discount || '0'),
    0
  ).toFixed(2);

  async function handleConfirmPurchase() {
    try {
      const itemsToBuy = products.map((p: any) => ({
        productId: Number(p.id)
      }));

      await buyProduct(itemsToBuy);
      clearCart();
      Alert.alert(
        'Compra Confirmada',
        `Você comprou ${products.length} produto(s) no valor total de R$ ${totalValue}`,
        [{ text: 'OK', onPress: () => navigation.navigate("Tabs", { screen: "Catalog" }) }]
      );
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Ocorreu um erro ao processar a compra.');
    }
  }


  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.buttonXContainer}>
        </View>

        <View style={styles.banner}>
          {products[0] && (
            <Image
              source={{ uri: getProductImageUrl(products[0]) }}
              style={{ width: 200, height: 100, resizeMode: 'contain' }}
            />
          )}
        </View>

        {/* Lista de produtos */}
        {products.map((product: any) => (
          <View key={product.id} style={styles.itemlist}>
            <Image
              style={[styles.itemBanner, { width: 60, height: 60 }]}
              source={getProductImageUrl(product) ? { uri: getProductImageUrl(product) } : undefined}
            />
            <Text style={{ marginLeft: 12, fontWeight: '600' }}>
              {product.name}
            </Text>
          </View>
        ))}

        <Text style={styles.totalText}>Total: R$ {totalValue}</Text>

        {/* Formulário de pagamento */}
        <View style={styles.buyForm}>
          <Text>Name on Card</Text>
          <TextInput
            style={styles.input}
            value={cardName}
            onChangeText={setCardName}
            placeholder="Full name as on card"
            autoCapitalize="characters"
          />

          <Text>Credit Card Number</Text>
          <TextInput
            style={styles.input}
            value={cardNumber}
            onChangeText={handleCardNumberChange}
            placeholder="1234 5678 9012 3456"
            keyboardType="numeric"
            maxLength={19}
          />

          <Text>Expiry Date</Text>
          <TextInput
            style={styles.input}
            value={expiryDate}
            onChangeText={handleCardExpiryChange}
            placeholder="MM/YY"
            keyboardType="numeric"
            maxLength={5}
          />

          <Text>CCV</Text>
          <TextInput
            style={styles.input}
            value={ccv}
            onChangeText={handleCardCcvChange}
            placeholder="123"
            keyboardType="numeric"
            maxLength={3}
          />
        </View>

        {/* Botão de confirmar */}
        <TouchableOpacity style={styles.buttonPurContainer} onPress={handleConfirmPurchase}>
          <Text style={{ color: '#fff', textAlign: 'center', padding: 12, fontSize: 16, fontWeight: 'bold' }}>
            Confirm Purchase
          </Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  content: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonXContainer: {
    alignItems: 'flex-end',
  },
  buttonX: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    padding: 5,
  },
  banner: {
    alignItems: 'center',
    marginBottom: 20,
  },
  itemlist: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  itemBanner: {
    borderRadius: 8,
    backgroundColor: '#eee',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 15,
  },
  buyForm: {
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  buttonPurContainer: {
    marginTop: 10,
    backgroundColor: '#008000',
    borderRadius: 8,
    overflow: 'hidden',
  },
});

export default PaymentScreen;
