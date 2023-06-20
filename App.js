import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from './src/Home';
import CocktailDetail from './src/CocktailDetail';
import AutresPages from './src/AutresPages';
import Categorie from './src/Categorie';
import BottomBar from './src/BottomBar';
import CocktailDetailCategorie from "./src/CocktailDetailCategorie";

//instances de stack et navigator
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

//navigator
const MainStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
            <Stack.Screen name="CocktailDetail" component={CocktailDetail} options={{ headerShown: false }} />
            <Stack.Screen name="AutresPages" component={AutresPages} options={{ headerShown: false }} />
            <Stack.Screen name="Categorie" component={Categorie} options={{ headerShown: false }} />
            <Stack.Screen name="CocktailDetailCategorie" component={CocktailDetailCategorie} options={{ headerShown: false }} />

        </Stack.Navigator>
    );
};

//principal de l'appli
const App = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator tabBar={props => <BottomBar {...props} />}>
                <Tab.Screen name="Application Cocktail" component={MainStack} />
            </Tab.Navigator>
        </NavigationContainer>
    );
};

export default App;
