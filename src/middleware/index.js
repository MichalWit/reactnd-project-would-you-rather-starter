import thunk from 'redux-thunk'
import { applyMiddleware } from 'redux'
import logger from './logger'

// TODO: create a logger middleware
export default applyMiddleware(
    thunk,
    logger
)
