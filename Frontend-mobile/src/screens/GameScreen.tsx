import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";

export default function GameScreen() {
  const [activeTab, setActiveTab] = useState("windows");
  const [currentIndex, setCurrentIndex] = useState(0);

  // Dados simulados (depois serão puxados do banco)
  const game = {
    name: "Game Title",
    rating: 4.8,
    price: 59.9,
    discount: 39.9,
    discountUntil: "2025-12-01",
    languages: ["Português", "Inglês", "Espanhol"],
    photos: [
      { id: 1, uri: "https://via.placeholder.com/300x200" },
      { id: 2, uri: "https://via.placeholder.com/300x200" },
      { id: 3, uri: "https://via.placeholder.com/300x200" },
    ],
    description:
      "Lorem ipsum dolor sit amet, explore infinite worlds and build everything.",
  };

  return (
    <ScrollView style={styles.container}>
      {/* Banner */}
      <Image
        source={{ uri: "https://via.placeholder.com/600x250" }}
        style={styles.banner}
      />

      {/* Info básica */}
      <View style={styles.header}>
        <Text style={styles.title}>{game.name}</Text>
        <Text style={styles.rating}>⭐ {game.rating}/5</Text>
        <Text style={styles.languages}>
          {game.languages[0]} & {game.languages.length - 1} more
        </Text>
      </View>

      {/* Preço e compra */}
      <View style={styles.priceBox}>
        <View style={styles.priceContainer}>
          <Text style={styles.originalPrice}>R$ {game.price}</Text>
          <Text style={styles.discountPrice}>R$ {game.discount}</Text>
        </View>
        <View style={styles.buttonsRow}>
          <TouchableOpacity style={styles.cartButton}>
            <Text style={styles.cartButtonText}>Adicionar ao carrinho</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buyButton}>
            <Text style={styles.buyButtonText}>Buy now</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Carrossel */}
      <FlatList
        data={game.photos}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <Image source={{ uri: item.uri }} style={styles.carouselImage} />
        )}
      />

      {/* Descrição */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.description}>{game.description}</Text>
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
        <Text style={styles.requirementsText}>
          {activeTab.toUpperCase()} requirements will appear here...
        </Text>
      </View>

      {/* Outras seções */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Why buy on MINECRAFT.COM?</Text>
        <Text>- DRM Free</Text>
        <Text>- Safety and satisfaction</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Time to beat</Text>
        <Text>Main: 15h</Text>
        <Text>Main + Sides: 30h</Text>
        <Text>Completionist: 100h</Text>
        <Text>All Styles: 40h</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Game details</Text>
        <Text>Genre: Adventure - Sandbox</Text>
        <Text>Release date: Nov 17, 2011</Text>
        <Text>Company: Mojang Studios</Text>
        <Text>Size: 146 GB</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Languages</Text>
        {game.languages.map((lang, i) => (
          <Text key={i}>- {lang}</Text>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Goodies</Text>
        <Text>- Wallpapers</Text>
        <Text>- Soundtrack</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
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
