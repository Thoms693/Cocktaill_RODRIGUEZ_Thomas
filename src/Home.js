import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import BottomBar from './BottomBar';

const Home = ({ navigation }) => {
    const [cocktails, setCocktails] = useState([]);

    useEffect(() => {
        axios
            //recup la liste des cocktails commencant par la lettre a
            .get('https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a')
            .then((response) => {
                setCocktails(response.data.drinks);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    //clic sur un cocktail et va vers l'écran du détail du cocktail
    const handleCocktailPress = (id) => {
        navigation.navigate('CocktailDetail', { id });
    };

    //rendu
    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.item} onPress={() => handleCocktailPress(item.idDrink)}>
            <Image style={styles.image} source={{ uri: item.strDrinkThumb }} />
            <Text style={styles.title}>{item.strDrink}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <FlatList data={cocktails} renderItem={renderItem} keyExtractor={(item) => item.idDrink} />
            <BottomBar navigation={navigation} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 5,
        backgroundColor: '#f2f2f2',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    image: {
        width: 45,
        height: 45,
        borderRadius: 30,
    },
});

export default Home;
