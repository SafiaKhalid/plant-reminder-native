import React, { useContext, useEffect, useState } from 'react'
import AsyncStorage, { useAsyncStorage } from '@react-native-async-storage/async-storage'
import MockDate from 'mockdate'

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
    const [data, setData] = useState({})
    const [date, setDate] = useState({
        old: '',
        new: ''
    })    
    const [dateDifference, setDateDifference] = useState(null)
    const { setItem, getItem } = useAsyncStorage('data-key')    
    
    const currentDate = Date.now().toString()    

    const setDateStorage = async (inputDate) => {
        try {
            await AsyncStorage.setItem('date-key', inputDate)            
        } catch (error) {
            console.log(error)
        }
    }

    const readDateStorage = async () => {
        try {
            const newDate = await AsyncStorage.getItem('date-key')
            if (!newDate) {
                setDateStorage(currentDate)                                            
            }
            setDate({old:(newDate ? newDate : currentDate), new: currentDate})            
        } catch (error) {
            console.log(error);
        }
    }

    const checkTimeElapsed = (time) => {                              
        if (data.length > 0) {
            const oldDate = new Date(JSON.parse(date.old))
            const newDate = new Date(JSON.parse(date.new))
            let newTimeData = data

            if (JSON.parse(time) >= 86400000) {
                const daysDifference = Math.floor(JSON.parse(time) / (1000 * 60 * 60 * 24))

                newTimeData.forEach(item => {
                if (JSON.parse(item.timeLeft) > 0) {
                    item.timeLeft = (JSON.parse(item.timeLeft)-daysDifference).toString()
                    if (JSON.parse(item.timeLeft) < 0) {
                        item.time = '0'
                    }
                }
                })
                setData(newTimeData)
            } else if (oldDate.getDate() !== newDate.getDate()) {
                const daysDifference = Math.abs(oldDate.getDate() - newDate.getDate())

                newTimeData.forEach(item => {
                if (JSON.parse(item.timeLeft) > 0) {
                    item.timeLeft = (JSON.parse(item.timeLeft)-daysDifference).toString()
                    if (JSON.parse(item.timeLeft) < 0) {
                        item.time = '0'
                    }
                }
                })
                setData(newTimeData)
            }
        }
    }

    const readStorage = async () => {
        const item = await getItem()
        setData(JSON.parse(item) ? [...(JSON.parse(item))] : [] )
        checkTimeElapsed(dateDifference)                
    }

    const removeDateStorage = async () => {
        try{
            await AsyncStorage.removeItem('date-key')
            console.log('removed date from storage');
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        readDateStorage()                 
        /* removeDateStorage() */
        setDateDifference(date.new-date.old)
        readStorage()
    }, [])

    return (<AppContext.Provider value={{data, setData, setItem, getItem, dateDifference}}>        
        {children}
    </AppContext.Provider>)
}

const useGlobalContext = () => {
    return useContext(AppContext)
}

export { AppContext, AppProvider, useGlobalContext }

//Use mockdate to check date testing