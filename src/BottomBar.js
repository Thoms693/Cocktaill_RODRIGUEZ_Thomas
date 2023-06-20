import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const BottomBar = ({ navigation }) => {
    //clic bouton Home
    const handleHomePress = () => {
        navigation.navigate('Home');
    };

    //clic bouton liste categories
    const handleAutrePagesPress = () => {
        navigation.navigate('AutresPages');
    };
    //rendu
    return (
        <View style={styles.bottomBar}>
            <TouchableOpacity style={styles.bottomBarButton} onPress={handleHomePress}>
                <Text style={styles.bottomBarButtonText}>🏠 Home 🏠</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.bottomBarButton} onPress={handleAutrePagesPress}>
                <Text style={styles.bottomBarButtonText}>🍹 Catégories 🍹</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    bottomBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'skyblue',
        paddingVertical: 1,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },
    bottomBarButton: {
        padding: 10,
    },
    bottomBarButtonText: {
        fontSize: 15,
        fontWeight: 'bold',
    },
});

export default BottomBar;
