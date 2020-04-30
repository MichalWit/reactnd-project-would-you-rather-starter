import { RECEIVE_USERS } from '../actions/users'
import { QUESTION_ANSWERED } from '../actions/questions'


export function users(state = {}, action) {
    switch (action.type) {
        case RECEIVE_USERS:
            return {
                ...state,
                ...action.users
            }
        case QUESTION_ANSWERED:
            const user = state[action.authedUserId]
            return {
                ...state,
                [action.authedUserId]: {
                    ...user,
                    answers: {
                        ...user.answers,
                        [action.questionId]: action.answer
                    }
                }
            }
        default:
            return state
    }
}
