import React, { useState } from "react";
import { View, Text, FlatList, Pressable } from 'react-native'
import PlantCard from "../components/PlantCard";


const Home = ({ navigation }) => {
    
    
    const dataEmpty = []

    const addPlantButton = () => {
        navigation.navigate('Add Plant', {data: data})        
    }

    return <View>
        <Text>Home</Text>
        <Pressable onPress={addPlantButton}>
            <Text>Add Plant</Text>
        </Pressable>
        <FlatList 
            data={dataEmpty} 
            renderItem={({item}) => <PlantCard image={item.image} name={item.name} species={item.species} timeLeft={item.timeLeft} />}
            keyExtractor={item => item.plantId} 
            ListEmptyComponent={<Text>Empty List</Text>} 
        />
    </View>
}

export default Home