import { ChakraProvider } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import { GlobalStyle } from './GlobalStyle';
import Router from './routes/Router';
import { GlobalContext } from './contexts/GlobalContext';


const App = () => {
  const [isAuth, setIsAuth] = useState(false)

  useEffect(()=>{
    const token = window.localStorage.getItem("labeddit-token")
    if(token){
      setIsAuth(true)
    }
  },[])

  const context = {
    isAuth,
    setIsAuth
  }

  return (
    <GlobalContext.Provider value={context}>
      <ChakraProvider>
        <GlobalStyle />
        <Router />
      </ChakraProvider>
    </GlobalContext.Provider>
  );
}

export default App;