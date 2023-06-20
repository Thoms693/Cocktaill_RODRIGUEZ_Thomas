import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, FlatList } from 'react-native';
import axios from 'axios';

const CocktailDetail = ({ route }) => {
    const [cocktail, setCocktail] = useState(null);

    useEffect(() => {
        const { id } = route.params;
        axios
            //recup détails cocktail avec son id
            .get(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
            .then(response => {
                setCocktail(response.data.drinks[0]);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    if (!cocktail) {
        return null;
    }
    //recup  liste des ingrédients avec mesures
    const ingredients = [];
    for (let i = 1; i <= 15; i++) {
        const ingredient = cocktail[`strIngredient${i}`];
        const measure = cocktail[`strMeasure${i}`];
        if (ingredient && ingredient.trim() !== '') {
            ingredients.push({ ingredient, measure });
        }
    }
    //fonction liste ingrédients image , texte mesure
    const renderIngredientItem = ({ item }) => (
        <View style={styles.ingredientItem}>
            <Image
                style={styles.ingredientImage}
                source={{ uri: `https://www.thecocktaildb.com/images/ingredients/${item.ingredient}-Small.png` }}
            />
            <Text>{`${item.measure} ${item.ingredient}`}</Text>
        </View>
    );
    //rendu
    return (
        <View style={styles.container}>
            <Image
                style={styles.image}
                source={{ uri: cocktail.strDrinkThumb }}
            />
            <Text style={styles.title}>{cocktail.strDrink}</Text>
            <Text style={styles.subtitle}>Ingrédients:</Text>
            <FlatList
                data={ingredients}
                renderItem={renderIngredientItem}
                keyExtractor={(item, index) => `${index}`}
            />
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
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    subtitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    image: {
        width: 200,
        height: 200,
        borderRadius: 100,
        marginVertical: 20,
    },
    ingredientItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
    },
    ingredientImage: {
        width: 30,
        height: 30,
        marginRight: 10,
    },
});

export default CocktailDetail;
