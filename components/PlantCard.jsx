import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

const PlantCard = ({image, name, species, timeLeft}) => {
    return <View>
        {image === '' ? <View style={styles.image}><FontAwesome5 name="seedling" size={60} color="green" /></View> : <Image source={{uri: image}} style={styles.image} /> }        
        <Text>Name: {name}</Text>
        <Text>Species: {species}</Text>
        <Text>Time left: {timeLeft}</Text>        
    </View>
}

const styles = StyleSheet.create({
    image: {
        height: 100,
        width: 100,
        borderRadius: 50,
        borderWidth: 5,
        borderColor: 'green',
        marginRight: 10,        
        alignItems: 'center',
        justifyContent: 'center',        
    }
})

export default PlantCard

//Information for card:
//Image
//Name
//Species
//Days left
//Status icon
//Water button