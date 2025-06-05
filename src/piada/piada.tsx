import React, { useState } from 'react';
import { Button, View, Text, StyleSheet, ActivityIndicator } from "react-native";

type Joke = {
    type: 'single' | 'twopart';
    jokes: string;
    setup: string;
    delivery: string;
};

export const Piadas = () => {
    const [piada, setPiada] = useState<Joke | null>(null);
    const [carregando, setCarregando] = useState(false);
    const [erro, setErro] = useState<string | null>(null);

    const buscarPiada = async () => {
        setCarregando(true);
        setErro(null);
        setPiada(null);

        try {
            // A URL da API para piadas em português
            const response = await fetch('https://v2.jokeapi.dev/joke/Any?lang=pt');
            const data: Joke = await response.json();
            
            // Sucesso! Armazena a piada no estado
            setPiada(data);

        } catch (e: any) {
            // Captura erros de rede ou da lógica acima
            setErro('Falha ao buscar piada. Tente novamente.');
            console.error(e);
        } finally {
            // Garante que o loading sempre vai parar
            setCarregando(false);
        }
    };

    // --- FUNÇÃO PARA RENDERIZAR O CONTEÚDO DA PIADA ---
    // Separa a lógica de como exibir a piada do resto do componente
    const renderizarConteudoPiada = () => {
        if (carregando) {
            return <ActivityIndicator size="large" color="#007AFF" />;
        }

        if (erro) {
            return <Text style={styles.errorText}>{erro}</Text>;
        }

        if (!piada) {
            return <Text style={styles.placeholder}>Clique no botão para ver uma piada!</Text>;
        }

        // Renderiza a piada de acordo com o seu tipo
        if (piada.type === 'single') {
            return <Text style={styles.jokeText}>{piada.jokes}</Text>;
        }

        if (piada.type === 'twopart') {
            return (
                <>
                    <Text style={styles.setupText}>{piada.setup}</Text>
                    <Text style={styles.deliveryText}>{piada.delivery}</Text>
                </>
            );
        }
        
        // Caso a API retorne um tipo inesperado
        return <Text style={styles.placeholder}>Tipo de piada não suportado.</Text>;
    };

    return (
        <View style={styles.container}>
            <View style={styles.jokeContainer}>
                {renderizarConteudoPiada()}
            </View>

            <Button
                title="Ver piada"
                onPress={buscarPiada}
                disabled={carregando}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: 'gray',
    },
    jokeContainer: {
        minHeight: 200,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30,
        paddingHorizontal: 15,
    },
    placeholder: {
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    jokeText: {
        fontSize: 20,
        textAlign: 'center',
        color:  'white'
    },
    setupText: {
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 10,
        fontStyle: 'italic',
        color:  'white'
    },
    deliveryText: {
        fontSize: 22,
        textAlign: 'center',
        fontWeight: 'bold',
        color:  'white'
    },
    errorText: {
        fontSize: 18,
        color: 'red',
        textAlign: 'center',
    }
});