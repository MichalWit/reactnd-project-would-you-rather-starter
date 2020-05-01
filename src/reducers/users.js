import { RECEIVE_USERS } from '../actions/users'
import { QUESTION_ANSWERED, ADD_NEW_QUESTION } from '../actions/questions'


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
                [user.id]: {
                    ...user,
                    answers: {
                        ...user.answers,
                        [action.questionId]: action.answer
                    }
                }
            }
        case ADD_NEW_QUESTION:
            const user_ = state[action.question.author]
            return {
                ...state,
                [user_.id]: {
                    ...user_,
                    questions: user_.questions.concat([action.question.id])
                }
            }
        default:
            return state
    }
}
