import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import { Dimensions } from 'react-native';
const { height, width } = Dimensions.get('window');

const FavoritesScreen = ({ route, navigation }) => {
  const favorites = route?.params?.favorites || [];

  if (favorites.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.emptyText}>No favorites added yet.</Text>
      </View>
    );
  }

  const renderItem = ({ item }) => (
    <View style={styles.productCard}>
      <Image source={{ uri: item.images[0] }} style={styles.productImage} />
      <Text style={styles.productName} numberOfLines={1}>
        {item.title}
      </Text>
      <Text style={styles.productPrice}>${item.price}</Text>

      <TouchableOpacity
        style={styles.buyButton}
        onPress={() => navigation.navigate('Profile', { product: item })}
      >
        <Text style={styles.buyButtonText}>Buy Now</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={favorites}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default FavoritesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'rgb(87, 107, 242)',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: 'white',
  },
  list: {
    paddingBottom: 20,
  },
  productCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginBottom: 16,
    width: width - 32,         // Full width minus container padding
    height: height * 0.5,      // 50% of screen height
    alignItems: 'center',
    justifyContent: 'center',  // center content vertically
  },
  productImage: {
    width: '100%',              // large image width inside the card
    height: '70%',             // large image height inside the card
    resizeMode: 'contain',
    marginBottom: 10,
  },
  productName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    marginBottom: 3,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555',
    marginBottom: 12,
  },
  buyButton: {
    backgroundColor: 'rgb(87, 107, 242)',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  buyButtonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 18,
  },
});