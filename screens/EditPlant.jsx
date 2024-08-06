import React, { useState } from "react";
import { View, Text, Pressable } from 'react-native';
import { useGlobalContext } from "../context";

const EditPlant = ({route, navigation}) => {
    const {id} = route.params
    const { data } = useGlobalContext()

    const [plant, setPlant] = useState(data[data.findIndex(item => item.plantId === id)])

    console.log('plant: ', plant);
    
    console.log('id: ', id);
    

    const goBack = () => {
        navigation.goBack()
    }

    return <View>
        <Text>edit plant</Text>        
        <Pressable onPress={goBack}>
            <Text>Back</Text>
        </Pressable>                            
    </View>
}

export default EditPlant