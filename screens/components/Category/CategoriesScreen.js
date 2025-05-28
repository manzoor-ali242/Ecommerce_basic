import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

const CategoriesScreen = ({ route }) => {
  const product = route?.params?.product;

  if (!product) {
    return (
      <View style={styles.center}>
        <Text style={styles.noDataText}>No product data provided.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: product.images[0] }} style={styles.image} />
      <Text style={styles.title}>{product.title}</Text>
      <Text style={styles.price}>${product.price}</Text>
      <Text style={styles.description}>{product.description}</Text>
    </ScrollView>
  );
};

export default CategoriesScreen;

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: 'rgb(48, 63, 159)',
    alignItems: 'center',
    minHeight: '100%',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(48, 63, 159)',
  },
  noDataText: {
    fontSize: 18,
    color: 'white',
  },
  image: {
    width: 380,
    height: 380,
    resizeMode: 'contain',
    borderRadius: 16,
    marginTop:40,
    marginBottom: 24,
    // Add subtle shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8, // Android shadow
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 12,
  },
  price: {
    fontSize: 22,
    fontWeight: '600',
    color: '#ffd700', // gold/yellow accent
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: '#d0d0d0',
    lineHeight: 24,
    textAlign: 'center',
  },
});
