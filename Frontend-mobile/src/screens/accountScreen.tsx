import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from '../contexts/AuthContext';
import { getUser, deleteUser, updateUser } from '../services/userService';

export default function ProfileScreen() {
  const { logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState({
    fullName: "Jussara Souza",
    username: "juh123",
    cpf: "123.456.789-00",
    email: "jussara@email.com",
    password: "",
  });
  const [oldUser, setOldUser] = useState({
    fullName: "Jussara Souza",
    username: "juh123",
    cpf: "123.456.789-00",
    email: "jussara@email.com",
    password: "",
  });

  useEffect(() => {
      const fetchUser = async () => {
          try {
                const data = await getUser();
                const userData = Array.isArray(data) ? data[0] : data;
                setUser(userData);
                setOldUser(userData)
                console.log('Pegou usuário')
          }
          catch (error) {
              console.error('Erro ao carregar o usuário:', error);
          }
      };
      fetchUser();
  }, []);
      
  const handleSave = () => {
    setIsEditing(false);
    if (
      user.fullName === oldUser.fullName &&
      user.email === oldUser.email &&
      user.password.trim() === ""
    ) {
      alert("Nenhum dado foi alterado.");
      return;
    }
    updateUser(user)
    Alert.alert("Sucesso", "Dados atualizados");
  };

  const handleDelete = () => {
    Alert.alert(
      "Excluir Conta",
      "Tem certeza que deseja excluir sua conta?",
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Excluir", 
          style: "destructive",
          onPress: async () => {
            try {
              await deleteUser();
              Alert.alert("Conta excluída", "Sua conta foi excluída com sucesso.");
              logout();
            } catch (error) {
              Alert.alert("Erro", "Não foi possível excluir a conta.");
            }
          }
        },
      ]
    );
  };

  const handleLogout = () => {
    Alert.alert("Logout", "Você saiu da conta.");
    logout();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Foto do usuário */}
      <View style={styles.avatarContainer}>
        <Image source={require("../../assets/Steveimage.jpg")} style={styles.avatar} />
      </View>

      {/* Nome completo */}
      {isEditing ? (
        <TextInput
          style={styles.inputName}
          value={user.fullName}
          onChangeText={(text) => setUser({ ...user, fullName: text })}
        />
      ) : (
        <Text style={styles.name}>{user.fullName}</Text>
      )}

      {/* Dados */}
      <View style={styles.infoCard}>
        {/* Nome Completo */}
        <View style={styles.infoRow}>
          <Ionicons name="person-outline" size={20} color="#1d1d21" />
          {isEditing ? (
            <TextInput
              style={styles.input}
              value={user.fullName}
              onChangeText={(text) => setUser({ ...user, fullName: text })}
            />
          ) : (
            <Text style={styles.infoText}>{user.fullName}</Text>
          )}
        </View>
        {/* Username */}
        <View style={styles.infoRow}>
          <Ionicons name="at-outline" size={20} color="#1d1d21" />
          <Text style={styles.infoText}>{user.username}</Text>
        </View>
        {/* Email */}
        <View style={styles.infoRow}>
          <Ionicons name="mail-outline" size={20} color="#1d1d21" />
          {isEditing ? (
            <TextInput
              style={styles.input}
              value={user.email}
              onChangeText={(text) => setUser({ ...user, email: text })}
            />
          ) : (
            <Text style={styles.infoText}>{user.email}</Text>
          )}
        </View>
        {/* CPF */}
        <View style={styles.infoRow}>
          <Ionicons name="card-outline" size={20} color="#1d1d21" />
          <Text style={styles.infoText}>{user.cpf}</Text>
        </View>
        {/* Senha (apenas ao editar) */}
        {isEditing && (
          <View style={styles.infoRow}>
            <Ionicons name="lock-closed-outline" size={20} color="#1d1d21" />
            <TextInput
              style={styles.input}
              value={user.password}
              onChangeText={(text) => setUser({ ...user, password: text })}
              secureTextEntry
              placeholder="Nova senha"
            />
          </View>
        )}
      </View>

      {/* Botões */}
      {isEditing ? (
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Ionicons name="checkmark-outline" size={18} color="#fff" />
          <Text style={styles.buttonText}>Salvar</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => setIsEditing(true)}
        >
          <Ionicons name="create-outline" size={18} color="#fff" />
          <Text style={styles.buttonText}>Editar Dados</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
        <Ionicons name="trash-outline" size={18} color="#fff" />
        <Text style={styles.buttonText}>Excluir Conta</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={18} color="#fff" />
        <Text style={styles.buttonText}>Sair da Conta</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    padding: 20,
  },
  avatarContainer: {
    marginTop: 30,
    marginBottom: 15,
    borderWidth: 3,
    borderColor: "#0eaeae",
    borderRadius: 100,
    padding: 5,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  name: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 20,
    color: "#333",
  },
  infoCard: {
    backgroundColor: "#fff",
    width: "100%",
    borderRadius: 12,
    padding: 20,
    marginBottom: 30,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  infoText: {
    marginLeft: 10,
    fontSize: 16,
    color: "#444",
  },
  input: {
    marginLeft: 10,
    fontSize: 16,
    color: "#444",
    borderBottomWidth: 1,
    borderColor: "#ccc",
    flex: 1,
    paddingVertical: 2,
  },
  inputName: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 20,
    color: "#333",
    borderBottomWidth: 1,
    borderColor: "#ccc",
    paddingVertical: 4,
  },
  editButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0eaeae",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 15,
  },
  saveButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#4caf50",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 15,
  },
  deleteButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e53935",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    marginLeft: 6,
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#31302b",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 10,
  },
});