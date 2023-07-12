import { legacy_createStore, applyMiddleware } from 'redux'
import rootReducer from './reducer/rootReducer'
import logger from 'redux-logger'

const store = legacy_createStore(rootReducer, applyMiddleware(logger))

export default store