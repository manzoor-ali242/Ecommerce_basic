import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native';

const ProfileScreen = ({ route, navigation }) => {
  const product = route?.params?.product;
  const [amount, setAmount] = useState(product ? product.price.toString() : '');
  const [error, setError] = useState('');

  const handlePay = () => {
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      setError('Please enter a valid payment amount.');
      return;
    }
    setError('');
    Keyboard.dismiss();
    Alert.alert('Payment', `You have to pay $${amount}`, [
      { text: 'OK', onPress: () => navigation.goBack() },
    ]);
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  const onChangeAmount = (val) => {
    setAmount(val);
    if (error) setError('');
  };

  const isPayDisabled = !amount || isNaN(amount) || Number(amount) <= 0;

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Text style={styles.header}>Checkout</Text>

      {product ? (
        <>
          <Image source={{ uri: product.images[0] }} style={styles.image} />
          <Text style={styles.title}>{product.title}</Text>
          <Text style={styles.price}>Price: ${product.price}</Text>

          <Text style={styles.label}>Enter Amount to Pay</Text>
          <TextInput
            style={[styles.input, error ? styles.inputError : null]}
            keyboardType="numeric"
            value={amount}
            onChangeText={onChangeAmount}
            placeholder="Enter payment amount"
            placeholderTextColor="#999"
            returnKeyType="done"
            onSubmitEditing={handlePay}
          />
          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <View style={styles.buttonsRow}>
            <TouchableOpacity
              style={[styles.payButton, isPayDisabled && styles.disabledButton]}
              onPress={handlePay}
              disabled={isPayDisabled}
            >
              <Text style={styles.payButtonText}>Pay Now</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.cancelButton}
              onPress={handleCancel}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <View style={styles.center}>
          <Text style={styles.noProductText}>No product selected.</Text>
        </View>
      )}
    </KeyboardAvoidingView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: 'rgb(87, 107, 242)',
    alignItems: 'center',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 30,
    marginTop:23,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noProductText: {
    color: 'white',
    fontSize: 18,
  },
  image: {
  width: '100%',         // fill container width
  height: 280,           // fixed height (or use 'aspectRatio')
  resizeMode: 'cover',   // fill entire area, cropping if necessary
  borderRadius: 16,
  marginBottom: 24,
  backgroundColor: 'white',
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 5 },
  shadowOpacity: 0.3,
  shadowRadius: 8,
  elevation: 8,
},

  title: {
    fontSize: 24,
    fontWeight: '700',
    color: 'white',
    marginBottom: 12,
    textAlign: 'center',
  },
  price: {
    fontSize: 20,
    fontWeight: '600',
    color: '#ffd700',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: 'white',
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 16,
    fontSize: 18,
    marginBottom: 8,
    color: '#333',
  },
  inputError: {
    borderWidth: 1,
    borderColor: '#ff5252',
  },
  errorText: {
    color: '#ff5252',
    marginBottom: 12,
    alignSelf: 'flex-start',
  },
  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
  },
  payButton: {
    flex: 1,
    backgroundColor: 'white',
    paddingVertical: 14,
    borderRadius: 25,
    marginRight: 10,
    alignItems: 'center',
  },
  payButtonText: {
    color: 'rgb(87, 107, 242)',
    fontWeight: '700',
    fontSize: 18,
  },
  cancelButton: {
    flex: 1,
    borderWidth: 2,
    borderColor: 'white',
    paddingVertical: 14,
    borderRadius: 25,
    marginLeft: 10,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 18,
  },
});
