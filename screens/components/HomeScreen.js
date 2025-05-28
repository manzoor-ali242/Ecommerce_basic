import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [search, setSearch] = useState('');
  const [products, setProducts] = useState([]);
  const [favorites, setFavorites] = useState([]);  // favorites state
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const response = await fetch('https://api.escuelajs.co/api/v1/products');
      const data = await response.json();
      setProducts(data.slice(0, 12));
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const addToFavorites = (item) => {
    // Check if item already in favorites
    if (favorites.find((fav) => fav.id === item.id)) {
      Alert.alert('Already in favorites');
      return;
    }
    setFavorites((prev) => [...prev, item]);
    // Navigate to Favorites screen with updated favorites list
    navigation.navigate('Favorites', { favorites: [...favorites, item] });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.productCard}
      onPress={() => navigation.navigate('Categories', { product: item })}
      activeOpacity={0.8}
    >
      <View style={styles.imageWrapper}>
        <Image source={{ uri: item.images[0] }} style={styles.productImage} />
        <TouchableOpacity
          style={styles.heartButton}
          onPress={() => addToFavorites(item)}
          activeOpacity={0.7}
        >
          <Ionicons name="heart-outline" size={24} color="red" />
        </TouchableOpacity>
      </View>

      <Text style={styles.productName} numberOfLines={1}>
        {item.title}
      </Text>
      <Text style={styles.productPrice}>${item.price}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header with icons and title */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="menu" size={28} color="white" />
        </TouchableOpacity>
        <Text style={styles.title}>Shop</Text>
        <TouchableOpacity>
          <Feather name="shopping-cart" size={26} color="white" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <TextInput
        style={styles.searchBar}
        placeholder="Search for products..."
        placeholderTextColor="white"
        value={search}
        onChangeText={setSearch}
      />

      {/* Products Grid */}
      {loading ? (
        <ActivityIndicator size="large" color="#fff" style={{ marginTop: 40 }} />
      ) : (
        <FlatList
          data={products}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          contentContainerStyle={styles.productList}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: 'rgb(87, 107, 242)',
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  title: {
    fontSize: 26,
    color: 'white',
    fontWeight: '700',
    textAlign: 'center',
    flex: 1,
    marginHorizontal: 12,
  },
  searchBar: {
    height: 42,
    borderColor: 'white',
    borderWidth: 1.2,
    borderRadius: 10,
    paddingHorizontal: 12,
    marginBottom: 20,
    fontSize: 16,
    color: 'white',
  },
  productList: {
    paddingBottom: 20,
    gap: 10,
  },
  productCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    margin: 8,
    flex: 1,
    maxWidth: '47%',
    alignItems: 'center',
  },
  imageWrapper: {
    position: 'relative',
    width: '100%',
    alignItems: 'center',
  },
  heartButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderRadius: 16,
    padding: 4,
    zIndex: 2,
  },
  productImage: {
    width: 170,
    height: 170,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  productName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#555',
  },
});
