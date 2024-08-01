import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, Text, FlatList, Pressable } from 'react-native'
import PlantCard from "../components/PlantCard";
import { useGlobalContext } from "../context";

const Home = ({ navigation }) => {
    const { data } = useGlobalContext()        

    const addPlantButton = () => {
        navigation.navigate('Add Plant')        
    }

    const clearStorage = async () => {
        try {
            await AsyncStorage.clear()
        } catch (e) {
            console.log(e);
        }        
    }

    return <View>
        <Text>Home</Text>
        <Pressable onPress={addPlantButton}>
            <Text>Add Plant</Text>
        </Pressable>
        <Pressable onPress={clearStorage}>
            <Text>Clear Storage</Text>
        </Pressable>
        <FlatList 
            data={data} 
            renderItem={({item}) => <PlantCard image={item.image} name={item.name} species={item.species} waterInterval={item.waterInterval} timeLeft={item.timeLeft} />}
            keyExtractor={item => item.plantId} 
            ListEmptyComponent={<Text>Empty List</Text>} 
        />        
    </View>
}

export default Home