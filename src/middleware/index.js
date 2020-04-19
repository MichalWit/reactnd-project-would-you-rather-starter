import thunk from 'redux-thunk'
import { applyMiddleware } from 'redux'

// TODO: create a logger middleware
export default applyMiddleware(
    thunk
)
