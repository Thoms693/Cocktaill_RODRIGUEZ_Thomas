import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import axios from 'axios';

const AutresPages = ({ navigation }) => {
    //état local pour stocket les categories
    const [categories, setCategories] = useState([]);

    //appel fonction fetchCategories
    useEffect(() => {
        fetchCategories();
    }, []);

    //recup liste categories
    const fetchCategories = async () => {
        try {
            const response = await axios.get('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
            setCategories(response.data.drinks);}
        catch (error) {
            console.log(error);
        }
    };
    //clic sur une catégorie et va vers l'écran catégorie
    const handleCategoryPress = (category) => {
        navigation.navigate('Categorie', { category });
    };
    //rendu
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.buttonContainer}>
                {categories.map((category) => (
                    <TouchableOpacity
                        style={styles.button}
                        key={category.strCategory}
                        onPress={() => handleCategoryPress(category.strCategory)}
                    >
                        <Text style={styles.buttonText}>{category.strCategory}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
    },
    button: {
        flexBasis: '48%',
        backgroundColor: 'skyblue',
        paddingVertical: 10,
        marginBottom: 16,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 13,
        fontWeight: 'bold',
        color: 'white',
    },
});

export default AutresPages;
