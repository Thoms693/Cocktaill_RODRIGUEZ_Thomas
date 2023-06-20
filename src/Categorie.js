import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import axios from 'axios';

const Categorie = ({ route, navigation }) => {
    const { category } = route.params;
    const [cocktails, setCocktails] = useState([]);

    useEffect(() => {
        fetchCocktailsByCategory();
    }, []);

    //recup les cocktails de la categorie choisie
    const fetchCocktailsByCategory = async () => {
        try {
            const response = await axios.get(
                `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`
            );
            setCocktails(response.data.drinks);
        } catch (error) {
            console.log(error);
        }
    };

    //clic sur un cocktail et va vers l'écran du détail du cocktail
    const handleCocktailPress = (id) => {
        navigation.navigate('CocktailDetailCategorie', { id });
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
            <Text style={styles.categoryTitle}>{category}</Text>
            <FlatList data={cocktails} renderItem={renderItem} keyExtractor={(item) => item.idDrink} />
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
    categoryTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
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
        fontSize: 15,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    image: {
        width: 45,
        height: 45,
        borderRadius: 25,
    },
});

export default Categorie;
