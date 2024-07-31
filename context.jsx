import React, { useContext, useEffect, useState } from 'react'
import { useAsyncStorage } from '@react-native-async-storage/async-storage'
import { dataOriginal } from './assets/data'
import App from './App'

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
    const [data, setData] = useState(/* dataOriginal */ {})
    const { getItem } = useAsyncStorage('data-key')

    const readStorage = async () => {
        const item = await getItem()
        setData(JSON.parse(item) ? [...(JSON.parse(item))] : [] )
        console.log('data: ', [...(JSON.parse(item))])
        console.log('item: ', item);
    }

    useEffect(() => {
        readStorage()
    }, [])
    
    return (<AppContext.Provider value={{data, setData}}>        
        {children}
    </AppContext.Provider>)
}

const useGlobalContext = () => {
    return useContext(AppContext)
}

export { AppContext, AppProvider, useGlobalContext }