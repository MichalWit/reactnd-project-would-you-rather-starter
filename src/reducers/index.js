import { combineReducers } from 'redux'
import { users } from './users'
import { authedUserId } from './authedUser'

// TODO: apply reducers here !
export default combineReducers({
    users,
    authedUserId
})
