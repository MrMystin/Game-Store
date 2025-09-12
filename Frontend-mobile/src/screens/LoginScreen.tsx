import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { IoMdHome } from "react-icons/io";
import { Colors } from "react-native/Libraries/NewAppScreen";

function LoginScreen() {

    return (
        <View style={styles.back}>
            <IoMdHome />
            <Text>Cadastro</Text>
            <View style={styles.email} id="container_email">

            </View>
            <View style={styles.senha} id="container_senha">
                
            </View>
            <View style={styles.login} id="loginbtn">
                
            </View>
            <Text>Nâo possui uma conta?Crie uma conta</Text>

        </View>
    );
}

const styles = StyleSheet.create({
    email: {
        backgroundColor: 'green',
        height: 50,
        marginVertical: 10,
    },
    senha: {
        backgroundColor: 'green',
        height: 50,
        marginVertical: 10,
    },
    login: {
        backgroundColor: 'green',
        height: 50,
        marginVertical: 10,
    },
    back: {
        backgroundColor: 'green',
        width: 2000
    }
})
export default LoginScreen;