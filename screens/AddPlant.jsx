import React, { useState, useEffect, useCallback } from "react";
import { View, Text, Pressable, TextInput, StatusBar } from 'react-native';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import * as DocumentPicker from 'expo-document-picker';
import { useGlobalContext } from "../context";

const AddPlant = ({ navigation }) => {  
    const { data, setData, setItem } = useGlobalContext()       

    const [plant, setPlant] = useState({
        image: '',
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
        image: '',
        name:'',
        species: '',
        waterInterval: '',
        timeLeft: '',
        age: {
            years: '',
            months: '',
        },
    })    
    const [fileResponse, setFileResponse] = useState()

    const writeStorage = async newData => {
        await setItem(JSON.stringify([...data, newData]))        
        setData([...data, newData])
    }

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
                image: '',
                name: plant.name,
                species: plant.species,
                waterInterval: plant.waterInterval,
                timeLeft: (plant.timeLeft ? plant.timeLeft : plant.waterInterval),
                age: plant.age
            })               
            setPlant({
                image: '',
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
            writeStorage(newPlant)
            setValidInput(false)                       
        }        
    }, [newPlant])

    /* const handleDocumentSelection = useCallback(async () => {
        try {
            const response = await DocumentPicker.pick({
                presentationStyle: 'fullScreen',
            })
            setFileResponse(response)
            console.log('Fetched');            
        } catch (e) {
            console.error(e)
        }
    }, []) */

    const handleDocumentSelection = async () => {
        try {
            const documentResponse = await DocumentPicker.getDocumentAsync({})
            if (documentResponse !== undefined) {
                setFileResponse(documentResponse.assets[0].uri)                
                console.log('document response : ', documentResponse.assets[0].uri)                         
            } else {
                console.log('Not fetched')                
            }            
        } catch (e) {
            console.log(e)            
        }
    }

    useEffect(() => {
        console.log(fileResponse)        
    }, [fileResponse])

    return <View>
        <StatusBar />
        {/* {fileResponse.map((file, index) => {
            <Text
                key={index.toString()}
                numberOfLines={1}
            >
                {file?.url}
            </Text>
        })} */}
        <Pressable onPress={handleDocumentSelection}>
            <Text>Select</Text>
            <Text>File name: {fileResponse}</Text>
        </Pressable>
       {/*  {<Pressable onPress={backHomeButton}>
            <Text>Back Home</Text>
        </Pressable>}

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
        </View> */}
    </View>
}

export default AddPlant