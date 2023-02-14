import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import firebaseReducers from '../reducers/Firebasereducer'

const rootReducer = combineReducers({
    firebaseData: firebaseReducers
})
const store = () => {
    return createStore(rootReducer, applyMiddleware(thunk))
}

export default store