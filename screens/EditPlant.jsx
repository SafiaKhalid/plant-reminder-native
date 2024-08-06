import React, { useState } from "react";
import { View, Text, TextInput, Pressable } from 'react-native';
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
        <Pressable onPress={goBack}>
            <Text>Back</Text>
        </Pressable>

        <View>
            <View>
                <Text>Name: </Text>
                <TextInput
                    onChangeText={/* (text) => setPlant({...plant, name:text}) */ () => console.log('textChange')}
                    value={plant.name}
                    placeholder={plant.name}
                    keyboardType="default"
                />            
            </View>
            <View>
                <Text>Species (optional): </Text>   
                <TextInput
                    onChangeText={/* (text) => setPlant({...plant, species:text}) */ () => console.log('textChange')}
                    value={plant.species}
                    placeholder={(plant.species=='' ? 'Species' : plant.species)}
                    keyboardType="default"
                /> 
            </View>
            <View>
                <Text>Water Interval: </Text>            
                <Text>Every</Text>            
                <TextInput
                    onChangeText={/* (text) => setPlant({...plant, waterInterval:text}) */ () => console.log('textChange')}
                    value={plant.waterInterval}
                    placeholder={plant.waterInterval}
                    keyboardType="number-pad"
                />
                <Text>days</Text>            
            </View>
            <View>
                <Text>Time Left (optional): </Text>
                <TextInput
                    onChangeText={/* (text) => setPlant({...plant, timeLeft:text}) */ () => console.log('textChange')}
                    value={plant.timeLeft}
                    placeholder={(plant.timeLeft=='' ? 'Time left' : plant.timeLeft)}
                    keyboardType="number-pad"
                />            
            </View>
            <View>
                <Text>Age (optional): </Text> 
                <TextInput
                    onChangeText={/* (text) => setPlant({...plant, age:{...plant.age, years:text}}) */ () => console.log('textChange')} 
                    value={plant.age.years}
                    placeholder={(plant.age.years=='' ? 'Years' : plant.age.years)}
                    keyboardType="number-pad"
                /> 
                <Text>years</Text>
                <TextInput
                    onChangeText={/* (text) => setPlant({...plant, age:{...plant.age, months:text}}) */ () => console.log('textChange')}
                    value={plant.age.months}
                    placeholder={(plant.age.months=='' ? 'Months' : plant.age.months)}
                    keyboardType="number-pad"
                />
                <Text>months</Text>           
            </View>
            
            <Pressable onPress={() => console.log('submittd')}>
                <Text>Add Plant</Text>
            </Pressable>

            <Text>{alert}</Text>
        </View>                            
    </View>
}

export default EditPlant