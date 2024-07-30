import React from "react";
import { View, Text, FlatList } from 'react-native'

const Home = () => {
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

    return <View>
        <Text>Home</Text>
        <FlatList data={data} keyExtractor={item => item.plantId} ListEmptyComponent={<Text>Empty List</Text>} />
    </View>
}

export default Home