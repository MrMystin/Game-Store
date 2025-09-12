import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TextInput, Button, Image, TouchableOpacity} from "react-native";
// import "./buy.css";

function PaymentScreen() {

  const [cardName, setCardName] = useState('')
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [ccv, setCcv] = useState('');

  function handleCardNumberChange(text: string) {
    if (!text) text = "";   // <-- garante que nunca vai ser undefined
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
    return (
      
        <View style={styles.container}>
          <View style={styles.content}>
          <View style={styles.buttonXContainer}>
            <TouchableOpacity onPress={() => {}}>
              <Text style={styles.buttonX}>X</Text>
            </TouchableOpacity>
          </View>

            <View style={styles.banner}>
              <Image
                source={{}}
              />
            </View>
            <View style={styles.itemlist}>
                <Image style={styles.itemBanner}
                  source={{}}
                />
              <Text>Nome do Produto</Text>
              <Text>R$ </Text>
            </View>

            <Text style={styles.totalText}>Total: R${" "}</Text>
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
            <TouchableOpacity style={styles.buttonPurContainer} onPress={() => {}}>
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