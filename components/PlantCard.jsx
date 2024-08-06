import React, {useState, useEffect} from 'react'
import { View, Text, Image, Pressable, StyleSheet } from 'react-native'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useGlobalContext } from "../context";

const PlantCard = ({id, image, name, species, waterInterval, timeLeft}) => {    
    const { data, setData, writeStorage } = useGlobalContext()    
    const [dataCopy, setDataCopy] = useState(data)
    const [waterAlert, setWaterAlert] = useState(false)
    const [plantIcon, setPlantIcon] = useState('')

    const waterPlant = () => {        
        setDataCopy(dataCopy.map(item => item.plantId == id ? {...item, timeLeft:waterInterval} : item))   
        setWaterAlert(true)     
    }

    useEffect(() => {        
        setData(dataCopy)    
        writeStorage(dataCopy)    
    }, [dataCopy])

    useEffect(() => {
        if (waterAlert) {
            setTimeout(() => {
                setWaterAlert(false)
            }, 2000)
        }
    }, [waterAlert])

    return <View>
        {image === '' ? <View style={styles.image}><FontAwesome5 name="seedling" size={60} color="green" /></View> : <Image source={{uri: image}} style={styles.image} /> }        
        <Text>Name: {name}</Text>
        {species !== '' && <Text>Species: {species}</Text>}
        <Text>Time left: {timeLeft}</Text>
        <FontAwesome6 name="face-grin-squint" size={24} color="black" />
        {timeLeft===waterInterval ? 
        <Ionicons name="water" size={40} color="grey" /> : 
        <Pressable onPress={waterPlant}>
            <Ionicons name="water" size={40} color="blue" />
        </Pressable>}
        
        {waterAlert && <Text>Plant watered!</Text>}    
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


//Branch - icons reflecting timeLeft (happy, sad, angry etc?)
//Branch - edit plantCard (make sure info copied into text inputs)
//Branch - delete plant card (are you sure modal)
//Branch - add image to plant card
//Branch - order plant card list (time left to water?)