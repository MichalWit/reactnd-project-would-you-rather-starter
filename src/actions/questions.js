import { _saveQuestion } from '../utils/_DATA'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const QUESTION_ANSWERED = 'QUESTION_ANSWERED'
export const ADD_NEW_QUESTION = 'ADD_NEW_QUESTION'

export function questionAnswered({questionId, answer, authedUserId}) {
    return {
        type: QUESTION_ANSWERED,
        questionId,
        answer,
        authedUserId
    }
}

export function receiveQuestions(questions) {
    return {
        type: RECEIVE_QUESTIONS,
        questions
    }
}

function addNewQuestion(question) {
    return {
        type: ADD_NEW_QUESTION,
        question
    }
}

export function handleAddNewQuestion(optionOne, optionTwo, authedUserId) {
    
    return (dispatch) => {
        _saveQuestion(
            {
                optionOneText: optionOne,
                optionTwoText: optionTwo,
                author: authedUserId
            }
        ).then((question) => {
            dispatch(addNewQuestion(question))
        })
    }
}
