import React from "react";
import { View, Text, Pressable } from 'react-native';

const EditPlant = ({navigation}) => {
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