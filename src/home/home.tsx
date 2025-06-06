import { router } from "expo-router";
import { Button, View, StyleSheet, TouchableOpacity, Text } from "react-native";

export const Home = () => {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button}
                onPress={() => router.push('/piada/piada')}>
                    <Text style={styles.textButton}> Ir para a tela de piadas </Text>
                    </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#001801',
    },
    button: {
        padding: 10,
        backgroundColor: 'gray',
        color: 'black',
        borderRadius: 50,
        borderWidth: 1,
        borderColor: '#4b0082',
        shadowColor: '#000',
    },
    textButton: {
        color: '#4b0082',
        fontSize: 18,
        fontWeight: 'bold',
    },
});