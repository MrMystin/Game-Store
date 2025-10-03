import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    ImageBackground,
  } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { RootStackParamList, TabParamList } from '../navigation/types';
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { requestLogin } from "../services/authService";
import { useAuth } from "../contexts/AuthContext";

export default function LoginScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { login, cpfState } = useAuth();

  const handleLogin = async () => {
      try {
          // Lógica de login / conexão com backend.
          const {jwt, cpfValue} = await requestLogin(email, password);
          login(jwt);
          cpfState(cpfValue)
          console.log('Login ok');
      } catch (err: any) {
          setError(err);
      }
  }

  return ( 
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
      <ImageBackground
          source={require("../../assets/Steveimage.jpg")} // sua imagem
          style={styles.waveBackground}
          resizeMode="cover"
        >
          {/* overlay amarelo translúcido */}
          <View style={styles.waveOverlay} />
        </ImageBackground>

        {/* Conteúdo */}
        <View style={styles.card} >
          <Text style={styles.title}>Login</Text>

          {/* Email */}
          <View style={styles.inputContainer}>
            <Ionicons name="mail-outline" size={20} color="#0eaeae" />
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#fff"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          {/* Password */}
          <View style={styles.inputContainer}>
            <Ionicons name="lock-closed-outline" size={20} color="#0eaeae" />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#fff"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Ionicons
                name={showPassword ? "eye-off-outline" : "eye-outline"}
                size={20}
                color="#555"
              />
            </TouchableOpacity>
          </View>

          {/* Extra opções */}
          <View style={styles.rowBetween}>
            <View style={styles.row}>
              <View style={styles.checkbox} />
              <Text style={styles.rememberText}>Remember me</Text>
            </View>
            <TouchableOpacity>
              <Text style={styles.forgotText}>Forgot password?</Text>
            </TouchableOpacity>
          </View>

          {/* Botão Login */}
          <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
            <Text style={styles.loginText}>LOGIN</Text>
          </TouchableOpacity>

          {/* Link Sign Up */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Don’t have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
              <Text style={styles.footerLink}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0eaeae", // azul claro
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
  },
  waveBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 300,
    overflow: "hidden", // importante p/ respeitar o borderRadius
  },
  waveOverlay: {
    flex: 1,
  },
  card: {
    position: "relative",
    backgroundColor: "#494697",
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#fff",
    marginBottom: 20,
    paddingBottom: 5,
  },
  input: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: "#31302b",
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 25,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    width: 16,
    height: 16,
    borderWidth: 1,
    borderColor: "#fff",
    marginRight: 6,
  },
  rememberText: {
    fontSize: 14,
    color: "#fff",
  },
  forgotText: {
    fontSize: 14,
    color: "#fff",
  },
  loginButton: {
    backgroundColor: "#31302b",
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: "center",
    marginBottom: 15,
  },
  loginText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  footerText: {
    fontSize: 14,
    color: "#fff",
  },
  footerLink: {
    fontSize: 14,
    color: "#0eaeae",
    fontWeight: "600",
  },
});