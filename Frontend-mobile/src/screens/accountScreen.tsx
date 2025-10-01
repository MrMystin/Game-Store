import React, { useState } from "react";
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

export default function ProfileScreen() {
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState({
    name: "Jussara Souza",
    username: "juh123",
    email: "jussara@email.com",
    password: "1234567",
    photo: require("../assets/user-avatar.png"), // coloque sua imagem em assets
  });

  const handleSave = () => {
    setIsEditing(false);
    Alert.alert("Sucesso", "Dados atualizados (apenas no front).");
  };

  const handleDelete = () => {
    Alert.alert(
      "Excluir Conta",
      "Tem certeza que deseja excluir sua conta? (apenas simulação no front)",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Excluir", style: "destructive" },
      ]
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Foto do usuário */}
      <View style={styles.avatarContainer}>
        <Image source={user.photo} style={styles.avatar} />
      </View>

      {/* Nome */}
      {isEditing ? (
        <TextInput
          style={styles.inputName}
          value={user.name}
          onChangeText={(text) => setUser({ ...user, name: text })}
        />
      ) : (
        <Text style={styles.name}>{user.name}</Text>
      )}

      {/* Dados */}
      <View style={styles.infoCard}>
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
        <View style={styles.infoRow}>
          <Ionicons name="call-outline" size={20} color="#1d1d21" />
          {isEditing ? (
            <TextInput
              style={styles.input}
              value={user.password}
              onChangeText={(text) => setUser({ ...user, password: text })}
            />
          ) : (
            <Text style={styles.infoText}>{user.password}</Text>
          )}
        </View>
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
});