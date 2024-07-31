import React, { useState, useEffect } from "react";
import { View, Text, Pressable, TextInput } from 'react-native';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { useGlobalContext } from "../context";

const AddPlant = ({ route, navigation }) => {  
    const { data, setData } = useGlobalContext()    

    const [plant, setPlant] = useState({
        image: 'https://images.pexels.com/photos/1974508/pexels-photo-1974508.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        name:'',
        species: '',
        waterInterval: '',
        timeLeft: '',
        age: {
            years: '',
            months: '',
        },
    })
    const [alert, setAlert] = useState('')
    const [validInput, setValidInput] = useState(false)    
    const [newPlant, setNewPlant] = useState({
        id: '',
        image: 'https://images.pexels.com/photos/1974508/pexels-photo-1974508.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        name:'',
        species: '',
        waterInterval: '',
        timeLeft: '',
        age: {
            years: '',
            months: '',
        },
    })

    const backHomeButton = () => {
        navigation.navigate('Home')
    }

    const verifyInput = () => {
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
            setNewPlant({
                plantId: uuidv4(),
                image: 'https://images.pexels.com/photos/1974508/pexels-photo-1974508.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
                name: plant.name,
                species: plant.species,
                waterInterval: plant.waterInterval,
                timeLeft: (plant.timeLeft ? plant.timeLeft : '0'),
                age: plant.age
            })               
            setPlant({
                image: 'https://images.pexels.com/photos/1974508/pexels-photo-1974508.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
                name:'',
                species: '',
                waterInterval: '',
                timeLeft: '',
                age: {
                    years: '',
                    months: '',
                }, 
            })                 
            setValidInput(true)    
            setAlert('Submitted new plant!')
            setTimeout(() => {
                    setAlert('')
            }, 5000)
        }        
    }    

    useEffect(() => {
        if (validInput == true) {
            setData([...data, newPlant])                        
            setValidInput(false)                       
        }        
    }, [newPlant])

    return <View>
        <Pressable onPress={backHomeButton}>
            <Text>Back Home</Text>
        </Pressable>

        <View>
            <View>
                <Text>Name: </Text>
                <TextInput
                    onChangeText={(text) => setPlant({...plant, name:text})}
                    value={plant.name}
                    placeholder={'Name'}
                    keyboardType="default"
                />            
            </View>
            <View>
                <Text>Species (optional): </Text>   
                <TextInput
                    onChangeText={(text) => setPlant({...plant, species:text})}
                    value={plant.species}
                    placeholder={'Species'}
                    keyboardType="default"
                /> 
            </View>
            <View>
                <Text>Water Interval: </Text>            
                <Text>Every</Text>            
                <TextInput
                    onChangeText={(text) => setPlant({...plant, waterInterval:text})}
                    value={plant.waterInterval}
                    placeholder={'Water interval'}
                    keyboardType="number-pad"
                />
                <Text>days</Text>            
            </View>
            <View>
                <Text>Time Left (optional): </Text>
                <TextInput
                    onChangeText={(text) => setPlant({...plant, timeLeft:text})}
                    value={plant.timeLeft}
                    placeholder={'Time left'}
                    keyboardType="number-pad"
                />            
            </View>
            <View>
                <Text>Age (optional): </Text> 
                <TextInput
                    onChangeText={(text) => setPlant({...plant, age:{...plant.age, years:text}})}
                    value={plant.age.years}
                    placeholder={'Years'}
                    keyboardType="number-pad"
                /> 
                <Text>years</Text>
                <TextInput
                    onChangeText={(text) => setPlant({...plant, age:{...plant.age, months:text}})}
                    value={plant.age.months}
                    placeholder={'Months'}
                    keyboardType="number-pad"
                />
                <Text>months</Text>           
            </View>
            
            <Pressable onPress={verifyInput}>
                <Text>Add Plant</Text>
            </Pressable>

            <Text>{alert}</Text>
        </View>
    </View>
}

export default AddPlant

//Set newPlant to plant info
//push newPlant to data