import React from "react";
import HomeScreen from "./src/screen/HomeScreen.js";
import { Provider } from "react-redux";
import store from "./src/redux/config/store.js";

const App = () =>{
  const configData =  store()
  return (
    <Provider store={configData}>
         <HomeScreen/>
    </Provider>
  )
}

export default App