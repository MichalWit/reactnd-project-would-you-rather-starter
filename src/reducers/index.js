import { combineReducers } from 'redux'
import { users } from './users'
import { questions } from './questions'
import { authedUserId } from './authedUser'

export default combineReducers({
    users,
    questions,
    authedUserId
})
