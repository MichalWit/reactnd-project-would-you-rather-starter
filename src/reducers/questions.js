import { RECEIVE_QUESTIONS, QUESTION_ANSWERED } from '../actions/questions'

const buildOptionVotes = (optionToChange, authedUserId) => {
    return [optionToChange.votes].concat([authedUserId])
}

export function questions(state = {}, action) {
    switch (action.type) {
        case RECEIVE_QUESTIONS:
            return {
                ...state,
                ...action.questions
            }
        case QUESTION_ANSWERED:
            const question = state[action.questionId]
            const optionToChange = question[action.answer]
            return {
                ...state,
                [action.questionId]: {
                    ...question,
                    [action.answer]: {
                        ...optionToChange,
                        votes: buildOptionVotes(optionToChange, action.authedUserId)
                    }
                }
            }
        default:
            return state
    }
}
