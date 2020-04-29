import { RECEIVE_QUESTIONS, QUESTION_ANSWERED } from '../actions/questions'

export function questions(state = {}, action) {
    switch (action.type) {
        case RECEIVE_QUESTIONS:
            return {
                ...state,
                ...action.questions
            }
        case QUESTION_ANSWERED:
            return {
                ...state,
                [action.questionId]: {
                    ...state[action.questionId],
                    votes: [state[action.questionId].votes].concat([action.authedUserId])
                }
            }
        default:
            return state
    }
}
