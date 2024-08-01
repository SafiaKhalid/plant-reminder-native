import React, { useContext, useEffect, useState } from 'react'
import AsyncStorage, { useAsyncStorage } from '@react-native-async-storage/async-storage'

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
        if ((JSON.parse(time) >= 86400000) && (data.length > 0)) {
            let newTimeData = data
            newTimeData.forEach(item => {
                if (item.timeLeft > 0) {
                    item.timeLeft = item.timeLeft-1
                }
            })
            setData(newTimeData)
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

// Change date to include months and years (doesnt calculate if more than a month passed between renders)
// Date currently can only be max 31, gives inaccurate date differences if more than a month between renders