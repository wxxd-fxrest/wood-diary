import React, { useState } from 'react';
import AppLoading from "expo-app-loading"; 
import { NavigationContainer } from '@react-navigation/native';
import Realm from "realm";
import Navigator from './navigator';
import { RealmContext } from './context';

const FeelingSchema = {
    name: "Feeling",
    properties: {
        _id: "int",
        emotion: "string",
        message: "string",
    },
    primaryKey: "_id",
};

export default function App() {
    const [ready, setReady] = useState(false);
    const onFinish = () => setReady(true);
    const [realm, setRealm] = useState(null);

    const startLoading = async() => {
        const connection = await Realm.open({
            path: "woodDiaryDB",
            schema: [FeelingSchema],
        });
        setRealm(connection);
    };

    if(!ready) {
        return <AppLoading 
            startAsync={startLoading} 
            onFinish={onFinish}
            onError={console.error} />
    }

    return (
        <RealmContext.Provider value={realm}>
            <NavigationContainer>
                <Navigator />
            </NavigationContainer>
        </RealmContext.Provider>
    );
}; 