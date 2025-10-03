import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import Constants from 'expo-constants';
import { getCatalog } from '../../services/catalogServices';
import { RootStackParamList } from '../../navigation/types';

const { width } = Dimensions.get('window');

export default function MenuScreen() {
  const [catalog, setCatalog] = useState<any>([]);
  const { apiUrl } = Constants.expoConfig?.extra || {};
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    const fetchCatalog = async () => {
      try {
        const data = await getCatalog() as any;
        setCatalog(data.products);

        console.log('Catálogo carregado com sucesso');
      } catch (error) {
        console.error('Erro ao buscar o catálogo:', error);
      }
    };

    fetchCatalog();
  }, []);

  const renderProductCard = ({ item }: { item: any }) => {
    const banner = item.photos.find((p: any) => p.type === 'banner');
    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('Game', { productId: item.id })}
      >
        <Image
          source={{ uri: `${apiUrl}/images/${item.id}/${banner?.photo}` }}
          style={styles.cardImage}
        />
        <View style={styles.cardInfo}>
          <Text style={styles.cardTitle}>{item.name}</Text>
          <Text style={styles.cardPrice}>R$ {item.discount}</Text>
          <Text style={styles.cardRating}>⭐ {item.rating}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView style={styles.container}>
      {/* Banner topo */}
      <View style={styles.topBanner}>
        <Text style={styles.bannerText}>Mojang</Text>
      </View>

      {/* Lista de produtos */}
      <View style={styles.productsSection}>
        <Text style={styles.sectionTitle}>Jogos disponíveis</Text>
        <FlatList
          data={catalog}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderProductCard}
          scrollEnabled={false}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  topBanner: {
    width: '100%',
    height: 180,
    backgroundColor: '#6c5ce7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bannerText: {
    color: '#fff',
    fontSize: 36,
    fontWeight: 'bold',
  },
  productsSection: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  card: {
    marginBottom: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 3,
  },
  cardImage: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
  },
  cardInfo: {
    padding: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardPrice: {
    fontSize: 16,
    color: 'green',
    marginTop: 4,
  },
  cardRating: {
    marginTop: 4,
    color: '#555',
  },
});
