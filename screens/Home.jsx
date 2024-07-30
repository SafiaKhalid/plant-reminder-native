import React from "react";
import { View, Text, FlatList, Pressable } from 'react-native'
import PlantCard from "../components/PlantCard";

const Home = ({ navigation }) => {
    const data = [
        {
            plantId:'1',
            image:'https://images.pexels.com/photos/1974508/pexels-photo-1974508.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            name:'Basil',
            species:'Ocimum basilicum',
            waterInterval:'20',
            timeLeft: '13' ,
            age: {
            years: '2',
            months: '3'
            }
        },
        {
            plantId:'2',
            image:'https://images.pexels.com/photos/1974508/pexels-photo-1974508.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            name:'Mint',
            species:'Mentha piperita',
            waterInterval:'3',
            timeLeft: '1' ,
            age: {
                years: '1',
                months: '4'
            }
        }
    ]   
    
    const addPlantButton = () => {
        navigation.navigate('Add Plant')
        console.log('Add plant')
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