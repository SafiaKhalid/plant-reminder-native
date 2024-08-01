import React, {useState, useEffect} from 'react'
import { View, Text, Image, Pressable, StyleSheet } from 'react-native'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useGlobalContext } from "../context";

const PlantCard = ({id, image, name, species, waterInterval, timeLeft}) => {    
    const { data, setData } = useGlobalContext()    
    const [dataCopy, setDataCopy] = useState(data)

    const waterPlant = () => {
        console.log('water plant');
        console.log('dataCopy: ', dataCopy);
        dataCopy.forEach(item => {
            console.log('Item id: ', item.plantId);
        });        
        setDataCopy(dataCopy.map(item => item.plantId == id ? {...item, timeLeft:waterInterval} : item))        
    }

    useEffect(() => {
        console.log('Changed dataCopy: ',dataCopy);
        setData(dataCopy)        
    }, [dataCopy])

    return <View>
        {image === '' ? <View style={styles.image}><FontAwesome5 name="seedling" size={60} color="green" /></View> : <Image source={{uri: image}} style={styles.image} /> }        
        <Text>Name: {name}</Text>
        {species !== '' && <Text>Species: {species}</Text>}
        <Text>Time left: {timeLeft}</Text>
        <Pressable onPress={waterPlant}>
            <Ionicons name="water" size={40} color="blue" />
        </Pressable>        
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

//Find a way to update time left to equal water interval when press water button (make new branch?)