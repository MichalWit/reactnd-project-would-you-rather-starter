export const SET_SIGNED_IN_USER = 'SET_SIGNED_IN_USER'

export function setSignedInUser(authedUserId) {
    return {
        type: SET_SIGNED_IN_USER,
        authedUserId
    }
}
