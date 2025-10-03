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
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, TabParamList } from '../navigation/types';
import { requestRegister, requestLogin } from "../services/authService";
import { useAuth } from "../contexts/AuthContext";

export default function SignUpScreen({ }) {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const { login, cpfState } = useAuth();
  const [username, setUsername] = useState("");
  const [cpf, setCpf] = useState("");

  const handleRegister = async () => {
      try {
          // Lógica de login / conexão com backend.
          await requestRegister(email, password, username, cpf, name);
          const {jwt, cpfValue} = await requestLogin(email, password);
          login(jwt);
          cpfState(cpfValue)
          console.log('Register ok');
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
        <View style={styles.card}>
          <Text style={styles.title}>Create an account</Text>

          {/* Nome */}
          <View style={styles.inputContainer}>
            <Ionicons name="person-outline" size={20} color="#0eaeae" />
            <TextInput
              style={styles.input}
              placeholder="Name"
              placeholderTextColor="#aaa"
              value={name}
              onChangeText={setName}
            />
          </View>

          {/* Username */}
          <View style={styles.inputContainer}>
            <Ionicons name="at-outline" size={20} color="#0eaeae" />
            <TextInput
              style={styles.input}
              placeholder="Username"
              placeholderTextColor="#aaa"
              value={username}
              onChangeText={setUsername}
            />
          </View>

          {/* CPF */}
          <View style={styles.inputContainer}>
            <Ionicons name="card-outline" size={20} color="#0eaeae" />
            <TextInput
              style={styles.input}
              placeholder="CPF"
              placeholderTextColor="#aaa"
              keyboardType="numeric"
              value={cpf}
              onChangeText={setCpf}
              maxLength={14}
            />
          </View>

          {/* Email */}
          <View style={styles.inputContainer}>
            <Ionicons name="mail-outline" size={20} color="#0eaeae" />
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#aaa"
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
              placeholderTextColor="#aaa"
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

          {/* Confirm Password */}
          <View style={styles.inputContainer}>
            <Ionicons name="lock-closed-outline" size={20} color="#0eaeae" />
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              placeholderTextColor="#aaa"
              secureTextEntry={!showConfirmPassword}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
            <TouchableOpacity
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              <Ionicons
                name={showConfirmPassword ? "eye-off-outline" : "eye-outline"}
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

          {/* Botão Sign Up */}
          <TouchableOpacity onPress={handleRegister} style={styles.signUpButton}>
            <Text style={styles.signUpText}>SIGN UP</Text>
          </TouchableOpacity>

          {/* Link Login */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Tabs", { screen: "Login" })}>
              <Text style={styles.footerLink}>Login</Text>
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
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 25,
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
  signUpButton: {
    backgroundColor: "#31302b",
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: "center",
    marginBottom: 15,
  },
  signUpText: {
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