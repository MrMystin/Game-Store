import Constants from 'expo-constants';
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";

import { getProduct } from '../services/catalogServices';
import { getTransactions } from '../services/userService';
import { useShop } from "../contexts/ShopContext";
import { useAuth } from "../contexts/AuthContext"; 

import { AuthStackParamList } from '../navigation/types';
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

export default function GameScreen({ route }: any) {
  const { user } = useAuth();
  const [hasPurchased, setHasPurchased] = useState(false);
  const { addToCart, cartItems, removeFromCart } = useShop();
  const [activeTab, setActiveTab] = useState("windows");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [product, setProduct] = useState<any>(null);
  const { apiUrl } = Constants.expoConfig?.extra || {};
  const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();

  useEffect(() => {
    const fetchProduct = async () => {
        try {
          const data: any = await getProduct(route?.params?.productId);
          setProduct(data);
          const transactions = await getTransactions();
          const hasBought = transactions.some((transaction) =>
            transaction.transactionItems.some(
              (item: any) => item.productId === data.id
            )
          );
          setHasPurchased(hasBought);
          }
        catch (error) {
        }
    };
    fetchProduct();
  }, []);

  if (!product) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f8f8f8' }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const carouselPhotos = product.photos?.filter((p: any) => p.type?.toLowerCase() === 'photos') || [];

  return (
    <ScrollView style={styles.container}>
      {/* Banner */}
      <Image
        source={{ uri: `${apiUrl}/images/${product.id}/banner.png` }}
        style={styles.banner}
      />

      {/* Info básica */}
      <View style={styles.header}>
        <Text style={styles.title}>{product.name}</Text>
        <Text style={styles.rating}>⭐ {product.rating}/5</Text>
        <Text style={styles.languages}>
          {product.languages[0]?.language} & {product.languages.length - 1} more
        </Text>
      </View>

      {/* Preço e compra */}
      <View style={styles.priceBox}>
        <View style={styles.priceContainer}>
          <Text style={styles.originalPrice}>R$ {product.value}</Text>
          <Text style={styles.discountPrice}>R$ {product.discount}</Text>
        </View>
        <View style={styles.buttonsRow}>
          {!hasPurchased && (
            cartItems.some((item: any) => item.id === product.id) ? (
              <TouchableOpacity style={styles.removeCartButton} onPress={() => removeFromCart(product.id)}>
                <Text style={styles.removeCartButtonText}>Remover do carrinho</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.cartButton} onPress={() => addToCart(product)}>
                <Text style={styles.cartButtonText}>Adicionar ao carrinho</Text>
              </TouchableOpacity>
            )
          )}
            <TouchableOpacity
              onPress={() => {
                if (hasPurchased) return;

                if (!user) {
                  navigation.navigate("Login" as never);

                } else {
                  navigation.navigate("Payment", { product });
                }
              }}
              disabled={hasPurchased}
              style={styles.buyButton}
            >
              <Text style={styles.buyButtonText}>
                {hasPurchased ? 'Comprado' : 'Buy now'}
              </Text>
            </TouchableOpacity>
        </View>
      </View>

      {/* Carrossel */}
      <FlatList
        data={carouselPhotos}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <Image source={{ uri: `${apiUrl}/images/${product.id}/${item.photo}`}} style={styles.carouselImage} />
        )}
      />

      {/* Descrição */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.description}>{product.description}</Text>
      </View>

      {/* Requisitos de sistema */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>System requirements</Text>
        <View style={styles.tabsRow}>
          {['windows', 'mac', 'linux'].map((tab) => (
            <TouchableOpacity
              key={tab}
              onPress={() => setActiveTab(tab)}
              style={[styles.tabButton, activeTab === tab && styles.tabActive]}
            >
              <Text style={styles.tabText}>{tab.toUpperCase()}</Text>
            </TouchableOpacity>
          ))}
        </View>
        {product.requirements && product.requirements[activeTab] ? (
          <View style={styles.requirementsBox}>
            <Text style={styles.requirementsText}>OS: {product.requirements[activeTab].OS}</Text>
            <Text style={styles.requirementsText}>Processor: {product.requirements[activeTab].processor}</Text>
            <Text style={styles.requirementsText}>Memory: {product.requirements[activeTab].memory} GB</Text>
            <Text style={styles.requirementsText}>Graphics: {product.requirements[activeTab].graphics}</Text>
            <Text style={styles.requirementsText}>DirectX: {product.requirements[activeTab].directX}</Text>
            <Text style={styles.requirementsText}>Storage: {(product.requirements[activeTab].storage / 1000).toFixed(0)} MB</Text>
          </View>
        ) : (
          <Text style={styles.requirementsText}>No requirements data available.</Text>
        )}
      </View>

      {/* Outras seções */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Why buy on MINECRAFT.COM?</Text>
        <Text>- DRM Free</Text>
        <Text>- Safety and satisfaction</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Time to beat</Text>
        <Text>Main: {product.timeToBeats[0].value}h</Text>
        <Text>Main + Sides: {product.timeToBeats[1].value}h</Text>
        <Text>Completionist: {product.timeToBeats[2].value}h</Text>
        <Text>All Styles: {product.timeToBeats[3].value}h</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Game details</Text>
        <Text>Genre: {product.genres && product.genres.length > 0 ? product.genres.map((g: { name: string }, i: number) => g.name).join(' - ') : 'N/A'}</Text>
        <Text>Release date: {product.releaseDate ? new Date(product.releaseDate).toLocaleDateString() : 'N/A'}</Text>
        <Text>Company: {product.company?.name || 'N/A'}</Text>
        <Text>Size: {product.fileSize ? `${(product.fileSize / 1000).toFixed(0)} MB` : 'N/A'}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Languages</Text>
        {product.languages.map((lang: { id: number; language: string; audio?: boolean; text?: boolean; productId?: number }, i: number) => (
          <Text key={lang.id ?? i}>- {lang.language}</Text>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Goodies</Text>
        {product.goodies && product.goodies.length > 0 ? (
          product.goodies.map(
          (goodie: { id: number; text: string; productId?: number }, i: number) => (
            <Text key={goodie.id ?? i}>- {goodie.text}</Text>
          )
          )
        ) : (
          <>
          <Text>- Wallpapers</Text>
          <Text>- Soundtrack</Text>
          </>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  removeCartButton: {
    backgroundColor: '#FF0000',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 5,
  },
  removeCartButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  requirementsBox: {
    marginTop: 10,
  },
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  banner: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
  header: {
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
  },
  rating: {
    marginTop: 4,
    fontSize: 16,
  },
  languages: {
    marginTop: 4,
    fontSize: 14,
    color: "gray",
  },
  priceBox: {
    padding: 16,
    backgroundColor: "#fff",
    margin: 10,
    borderRadius: 8,
    elevation: 2,
  },
  priceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  originalPrice: {
    textDecorationLine: "line-through",
    fontSize: 16,
    color: "gray",
  },
  discountPrice: {
    fontSize: 18,
    fontWeight: "bold",
    color: "green",
  },
  buttonsRow: {
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "space-between",
  },
  cartButton: {
    backgroundColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 5,
  },
  cartButtonText: {
    textAlign: "center",
  },
  buyButton: {
    backgroundColor: "#6c5ce7",
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginLeft: 5,
  },
  buyButtonText: {
    color: "#fff",
    textAlign: "center",
  },
  carouselImage: {
    width: 250,
    height: 150,
    borderRadius: 10,
    margin: 8,
  },
  section: {
    padding: 16,
    backgroundColor: "#fff",
    margin: 10,
    borderRadius: 8,
    elevation: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: "#333",
  },
  tabsRow: {
    flexDirection: "row",
    marginVertical: 10,
  },
  tabButton: {
    padding: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    marginRight: 8,
    borderRadius: 5,
  },
  tabActive: {
    backgroundColor: "#6c5ce7",
  },
  tabText: {
    color: "#000",
  },
  requirementsText: {
    marginTop: 10,
    color: "#333",
  },
});
