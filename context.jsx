import React, { useContext, useEffect, useState } from 'react'
import AsyncStorage, { useAsyncStorage } from '@react-native-async-storage/async-storage'

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
    const [data, setData] = useState({})
    const [date, setDate] = useState({
        old: '',
        new: ''
    })
    const { setItem, getItem } = useAsyncStorage('data-key')

    const currentFullDate = new Date()
    const currentDate = currentFullDate.getDate().toString()
    
    console.log('Current day: ', currentDate)

    const setDateStorage = async (inputDate) => {
        try {
            await AsyncStorage.setItem('date-key', inputDate)
            console.log('stored date: ', inputDate);
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
            console.log('date state object: ', date);
            console.log('newDate: ', newDate);
        } catch (error) {
            console.log(error);
        }
    }

    const readStorage = async () => {
        const item = await getItem()
        setData(JSON.parse(item) ? [...(JSON.parse(item))] : [] )        
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
        readStorage()
    }, [])

    useEffect(() => {
        console.log('useEffect date state: ', date)
    }, [date])
    
    return (<AppContext.Provider value={{data, setData, setItem, getItem}}>        
        {children}
    </AppContext.Provider>)
}

const useGlobalContext = () => {
    return useContext(AppContext)
}

export { AppContext, AppProvider, useGlobalContext }