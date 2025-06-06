import React, { useState } from 'react';
import { Button, View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from "react-native";

// --- DEFINIÇÃO DE TIPO PARA A PIADA ---
type Joke = {
    type: 'single' | 'twopart';
    jokes: string;
    setup: string;
    delivery: string;
    flags: {
        nsfw: boolean;
        religious: boolean;
        political: boolean;
        racist: boolean;
        sexist: boolean;
        explicit: boolean;
    };
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
            const response = await fetch('https://v2.jokeapi.dev/joke/Any?lang=pt');
            
            const data: Joke = await response.json();
            console.log("Dados recebidos da API:", data); // Log para depuração
            
            setPiada(data);

        } catch (e: any) {
            setErro('Falha ao buscar piada. Tente novamente.');
            console.error("Erro ao buscar piada:", e); // Log para depuração.
        } finally {
            setCarregando(false);
        }
    };

    // --- FUNÇÃO PARA RENDERIZAR O CONTEÚDO DA PIADA ---
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
        
        return <Text style={styles.placeholder}>Tipo de piada não suportado.</Text>;
    };

    // --- RENDERIZAÇÃO A TELA) ---
    return (
        <View style={styles.container}>
            <View style={styles.jokeContainer}>
                {renderizarConteudoPiada()}
            </View>

            <TouchableOpacity style={styles.button}
            onPress={buscarPiada}
            disabled={carregando}>
                <Text style={styles.textButton}>Ver Piada</Text>
                </TouchableOpacity>
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
    button: {
        padding: 10,
        backgroundColor: '#001801',
        borderRadius: 50,
        borderWidth: 1,
        borderColor: '#4b0082',
        shadowColor: '#000',
    },
    textButton: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
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