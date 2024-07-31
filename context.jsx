import React, { useContext, useEffect, useState } from 'react'
import { useAsyncStorage } from '@react-native-async-storage/async-storage'

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
    const [data, setData] = useState({})
    const { setItem, getItem } = useAsyncStorage('data-key')

    const readStorage = async () => {
        const item = await getItem()
        setData(JSON.parse(item) ? [...(JSON.parse(item))] : [] )
        console.log('data: ', [...(JSON.parse(item))])
        console.log('item: ', item);
    }

    useEffect(() => {
        readStorage()
    }, [])
    
    return (<AppContext.Provider value={{data, setData, setItem, getItem}}>        
        {children}
    </AppContext.Provider>)
}

const useGlobalContext = () => {
    return useContext(AppContext)
}

export { AppContext, AppProvider, useGlobalContext }