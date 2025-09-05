import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TextInput, Button, Image } from "react-native";
// import "./buy.css";

function PaymentScreen() {

  const [cardName, setCardName] = useState('')
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [ccv, setCcv] = useState('');

    return (
      
        <View style={styles.container}>
          <View style={styles.content}>
            <View style={styles.buttonXContainer}>
              <Button title="X"></Button>
            </View>
            <View style={styles.itemlist}>
                <Image
                  source={{}}
                />
              <Text>Nome do Produto</Text>
              <Text>R$</Text>
            </View>

            <Text>Total: R${" "}</Text>
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
                    onChangeText={setCardNumber}
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                />
                <Text>Expiry Date</Text>
              <TextInput 
                    style={styles.input}
                    value={expiryDate}
                    onChangeText={setExpiryDate}
                    placeholder="MM/YY"
                    maxLength={5}
                />
                <Text>CCV</Text>
              <TextInput 
                    style={styles.input}
                    value={ccv}
                    onChangeText={setCcv}
                    placeholder="123"
                    maxLength={3}
                />
            </View>
            <View style={styles.buttonPurContainer}>
              <Button 
                title="Confirm Purchase"
                // onPress={}  
              ></Button>
              <Text></Text>
            </View>
          </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      padding: 20,
  },
  input: {
      borderWidth: 1,
      borderColor: '#ccc',
      padding: 8,
      marginBottom: 12,
  },
  content: {

  },
  buttonXContainer: {

  },
  itemlist: {
  },
  buyForm: {

  },
  buttonPurContainer: {

  },
})

  
export default PaymentScreen;