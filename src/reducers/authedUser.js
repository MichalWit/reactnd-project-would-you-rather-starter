import { SET_SIGNED_IN_USER } from '../actions/authedUser'

export function authedUserId(state = null, action) {
    switch (action.type) {
        case SET_SIGNED_IN_USER:
            return action.authedUserId
        default:
            return state
    }
}
