import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'

const PlantCard = ({image, name, species, timeLeft}) => {
    return <View>
        <Image source={{uri:image}} style={styles.image} />
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
        marginRight: 10,
    }
})

export default PlantCard