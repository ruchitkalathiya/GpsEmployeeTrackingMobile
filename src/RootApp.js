import React from 'react'
import store from './store'
import {Text} from "react-native";
import {Provider} from 'react-redux'

import App from './App'

const RootApp = () => {
    return(
        <Provider store={store}>
            <App />
            {/* <Text>vivek</Text> */}
        </Provider>
    )
}

export default RootApp