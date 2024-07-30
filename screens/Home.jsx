import React from "react";
import { View, Text, FlatList, Pressable } from 'react-native'
import PlantCard from "../components/PlantCard";
import { data } from '../assets/data'

const Home = ({ navigation }) => {    
    const addPlantButton = () => {
        navigation.navigate('Add Plant')        
    }

    return <View>
        <Text>Home</Text>
        <Pressable onPress={addPlantButton}>
            <Text>Add Plant</Text>
        </Pressable>
        <FlatList 
            data={data} 
            renderItem={({item}) => <PlantCard image={item.image} name={item.name} species={item.species} timeLeft={item.timeLeft} />}
            keyExtractor={item => item.plantId} 
            ListEmptyComponent={<Text>Empty List</Text>} 
        />
    </View>
}

export default Home