import { router } from "expo-router";
import { Button, View, StyleSheet } from "react-native";

export const Home = () => {
    return (
        <View style={styles.container}>
            <Button
                title="Ir para a tela de piadas"
                onPress={() => router.push('/piada/piada')}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'gray'
    },
});