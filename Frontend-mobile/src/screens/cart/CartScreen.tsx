import React from 'react';
import { View, Text, FlatList, StyleSheet, Button, TouchableOpacity } from 'react-native';

import CartItem from './CartItem';

import { useShop } from '../../contexts/ShopContext';
import { useAuth } from "../../contexts/AuthContext"; 

const CartScreen = ({ navigation }: any) => {
    const { user } = useAuth();
    const { cartItems, clearCart } = useShop();
    console.log(cartItems)
    const renderItem = ({item} : any) => (
        <CartItem item={item} />
    );

    const handleCheckout = () => {
        console.log('Concluindo a compra');
    }

    const handleClear = () => {
        clearCart();
    }
    return (
        <View style={styles.container}>
            {cartItems.length === 0 ? (
                <View style={styles.container}>
                    <Text style={styles.empty}>Seu carrinho está vazio.</Text>
                    <Button 
                        title='Ver produtos'
                        onPress={ () => navigation.navigate('Catalog') }
                    />
                </View>
            ) : (
                <View style={styles.listContainer}>
                    {/* <Text>Carrinho de compras</Text> */}
                    <FlatList 
                        data={cartItems}
                        renderItem={renderItem}
                        keyExtractor={(item: any) => item.id.toString()}
                    />
                    <View style={styles.totalContainer}>
                        <Text style={styles.totalText}>
                            Total R$ {cartItems.reduce((sum: number, item: any) => sum + (item.discount), 0).toFixed(2)}
                        </Text>
                        <TouchableOpacity
                            onPress={handleClear}
                            style={styles.clearButton}
                        >
                            <Text style={styles.clearButtonText}>Limpar carrinho</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                if (!user) {
                                    navigation.navigate("Login" as never);

                                } else {
                                    navigation.navigate("Payment", { products: cartItems });
                                }
                            }}
                            style={styles.checkoutButton}
                        >
                            <Text style={styles.checkoutButtonText}>Concluir Pedido</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )
            }
        </View>
    );
};
export default CartScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 100,
    },
    empty: {
        fontSize: 16,
        marginBottom: 20,
    },
    listContainer: {
        flex: 1,
    },
    totalContainer: {
        padding: 10,
        borderWidth: 1,
        backgroundColor: '#F9F9F9',
        borderTopColor: '#CCC',
    },
    totalText: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    clearButton: {
        marginTop: 10,
        backgroundColor: 'grey',
        padding: 10,
        borderRadius: 5,
    },
    clearButtonText: {
        color: '#FFF',
        textAlign: 'center',
    },
    continueButton: {
        marginTop: 10,
        backgroundColor: '#007BFF',
        padding: 10,
        borderRadius: 5,
    },
    continueButtonText: {
        color: '#FFF',
        textAlign: 'center',
        fontSize: 16,
    },
    checkoutButton: {
        marginTop: 10,
        backgroundColor: '#28A745',
        padding: 10,
        borderRadius: 5,
    },
    checkoutButtonText: {
        color: '#FFF',
        textAlign: 'center',
        fontSize: 16,
    },
});