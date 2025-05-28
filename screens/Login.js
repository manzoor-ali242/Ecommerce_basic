import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Animated,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; // You can use any icon lib

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, []);

  const onLogin = () => {
  if (email && password) {
    navigation.navigate('Home');
  } else {
    alert('Please enter email and password');
  }
};


  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Animated.View style={{ opacity: fadeAnim, width: '100%' }}>
        <Text style={styles.title}>Welcome Back!</Text>

        <TextInput
          style={[
            styles.input,
            emailFocused && { borderColor: 'rgb(103, 58, 183)' },
          ]}
          placeholder="Email"
          placeholderTextColor="rgba(255,255,255,0.7)"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
          onFocus={() => setEmailFocused(true)}
          onBlur={() => setEmailFocused(false)}
        />

        <View
          style={[
            styles.passwordContainer,
            passwordFocused && { borderColor: 'rgb(103, 58, 183)' },
          ]}
        >
          <TextInput
            style={styles.passwordInput}
            placeholder="Password"
            placeholderTextColor="rgba(255,255,255,0.7)"
            secureTextEntry={!passwordVisible}
            value={password}
            onChangeText={setPassword}
            onFocus={() => setPasswordFocused(true)}
            onBlur={() => setPasswordFocused(false)}
          />
          <TouchableOpacity
            onPress={() => setPasswordVisible(!passwordVisible)}
            style={styles.eyeIcon}
            activeOpacity={0.7}
            accessibilityLabel={passwordVisible ? 'Hide password' : 'Show password'}
          >
            <MaterialCommunityIcons
              name={passwordVisible ? 'eye-off' : 'eye'}
              size={24}
              color="rgba(255,255,255,0.7)"
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={onLogin}
          activeOpacity={0.85}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <View style={styles.signupTextContainer}>
          <Text style={styles.signupTextLight}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.signupText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(48, 63, 159)', // deep indigo blue
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 38,
    fontWeight: '800',
    color: 'white',
    marginBottom: 50,
    textAlign: 'center',
  },
  input: {
    height: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.2)', // translucent white
    borderRadius: 12,
    paddingHorizontal: 20,
    marginBottom: 20,
    fontSize: 16,
    color: 'white',
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.4)',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.4)',
    marginBottom: 25,
    paddingHorizontal: 20,
  },
  passwordInput: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: 'white',
  },
  eyeIcon: {
    paddingLeft: 10,
  },
  button: {
    backgroundColor: 'rgb(103, 58, 183)', // bright purple
    paddingVertical: 16,
    borderRadius: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 7,
    elevation: 8,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '800',
    textAlign: 'center',
    letterSpacing: 1.2,
  },
  signupTextContainer: {
    flexDirection: 'row',
    marginTop: 35,
    justifyContent: 'center',
  },
  signupTextLight: {
    color: 'rgba(255,255,255,0.75)',
    fontSize: 15,
  },
  signupText: {
    color: 'rgb(186, 104, 200)', // soft lavender purple
    fontWeight: '700',
    textDecorationLine: 'underline',
    fontSize: 15,
  },
});

export default Login;
