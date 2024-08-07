import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Pressable, Modal } from 'react-native';
import { useGlobalContext } from "../context";

const EditPlant = ({route, navigation}) => {
    const {id} = route.params
    const { data, setData, writeStorage } = useGlobalContext()

    const [plant, setPlant] = useState(data[data.findIndex(item => item.plantId === id)])
    const [alert, setAlert] = useState('')
    const [dataCopy, setDataCopy] = useState(data)

    const goBack = () => {
        navigation.goBack()
    }

    const verifyInput = () => {
        console.log('verify input');
        if (!plant.name) {
            setAlert('Enter a name for your plant')
        } else if (!parseInt(plant.waterInterval)) {
            setAlert('Enter how often you want your plant to be watered')
        } else if (!parseInt(plant.timeLeft) && plant.timeLeft !== '') {
            setAlert('Enter how long left to next water your plant')
        } else if (!parseInt(plant.age.years) && plant.age.years !== '') {
            setAlert('Enter your plant\'s age')
        } else if (!parseInt(plant.age.months) && plant.age.months !== '') {
            setAlert('Enter your plant\'s age')
        } else {
            setDataCopy(dataCopy.map(item => item.plantId == id ? plant : item))
            setAlert('Youv\'e edited your plant!')
            setTimeout(() => {
                    setAlert('')
            }, 5000)
        }
    }

    useEffect(() => {        
        setData(dataCopy)
        writeStorage(dataCopy)
    }, [dataCopy])

    return <View>             
        <Pressable onPress={goBack}>
            <Text>Back</Text>
        </Pressable>

        <View>
            <View>
                <Text>Name: </Text>
                <TextInput
                    onChangeText={(text) => setPlant({...plant, name:text})}
                    value={plant.name}
                    placeholder={(plant.name=='' ? 'Name' : plant.name)}
                    keyboardType="default"
                />            
            </View>
            <View>
                <Text>Species (optional): </Text>   
                <TextInput
                    onChangeText={(text) => setPlant({...plant, species:text})}
                    value={plant.species}
                    placeholder={(plant.species=='' ? 'Species' : plant.species)}
                    keyboardType="default"
                /> 
            </View>
            <View>
                <Text>Water Interval: </Text>            
                <Text>Every</Text>            
                <TextInput
                    onChangeText={(text) => setPlant({...plant, waterInterval:text})}
                    value={plant.waterInterval}
                    placeholder={(plant.waterInterval=='' ? 'Water Interval' : plant.waterInterval)}
                    keyboardType="number-pad"
                />
                <Text>days</Text>            
            </View>
            <View>
                <Text>Time Left (optional): </Text>
                <TextInput
                    onChangeText={(text) => setPlant({...plant, timeLeft:text})}
                    value={plant.timeLeft}
                    placeholder={(plant.timeLeft=='' ? 'Time left' : plant.timeLeft)}
                    keyboardType="number-pad"
                />            
            </View>
            <View>
                <Text>Age (optional): </Text> 
                <TextInput
                    onChangeText={(text) => setPlant({...plant, age:{...plant.age, years:text}})} 
                    value={plant.age.years}
                    placeholder={(plant.age.years=='' ? 'Years' : plant.age.years)}
                    keyboardType="number-pad"
                /> 
                <Text>years</Text>
                <TextInput
                    onChangeText={(text) => setPlant({...plant, age:{...plant.age, months:text}})}
                    value={plant.age.months}
                    placeholder={(plant.age.months=='' ? 'Months' : plant.age.months)}
                    keyboardType="number-pad"
                />
                <Text>months</Text>           
            </View>
            
            <Pressable onPress={verifyInput}>
                <Text>Confirm</Text>
            </Pressable>
            
            <Pressable onPress={() => console.log('Delete plant?')}>
                <Text>Delete</Text>
            </Pressable>

            <Text>{alert}</Text>
        </View>                            
    </View>
}

export default EditPlant