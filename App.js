import React, { Component } from 'react';
import { Provider } from 'react-redux'
import store from "./store/store"
import {NavigationContainer} from "@react-navigation/native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import PadItems, { Samples} from "./components/PadItems";
import persistStore from "redux-persist/es/persistStore";
import { PersistGate } from "redux-persist/integration/react";
import PadItem from "./components/PadItem";
import PadItemView from "./components/PadItemView";
import LibraryView from "./components/LibraryView";


const Tab = createBottomTabNavigator();
let persistor = persistStore(store);
const App = () => {
        return (
            <Provider store={store}>
                <PersistGate persistor={persistor}>
                    <NavigationContainer>
                        <Tab.Navigator>
                        <Tab.Screen name="PadItems" component={PadItems} />
                        <Tab.Screen name="PadItemView" component={PadItemView} />
                        <Tab.Screen name="LibraryView" component={LibraryView} />
                            </Tab.Navigator>
                    </NavigationContainer>
                </PersistGate>
            </Provider>
        );

}

export default App;
