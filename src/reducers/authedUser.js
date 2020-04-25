import { SET_SIGNED_IN_USER } from '../actions/authedUser'

export function authedUserId(state = {}, action) {
    switch (action.type) {
        case SET_SIGNED_IN_USER:
            return {
                authedUserId: action.authedUserId
            }
        default:
            return state
    }
}
