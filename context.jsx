import React, { useContext, useState } from 'react'
import { dataOriginal } from './assets/data'
import App from './App'

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
    const [data, setData] = useState(dataOriginal)
    
    return (<AppContext.Provider value={{data, setData}}>        
        {children}
    </AppContext.Provider>)
}

const useGlobalContext = () => {
    return useContext(AppContext)
}

export { AppContext, AppProvider, useGlobalContext }