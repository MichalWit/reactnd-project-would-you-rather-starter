import { _saveQuestion, _saveQuestionAnswer } from '../utils/_DATA'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const QUESTION_ANSWERED = 'QUESTION_ANSWERED'
export const ADD_NEW_QUESTION = 'ADD_NEW_QUESTION'

function questionAnswered({questionId, answer, authedUserId}) {
    return {
        type: QUESTION_ANSWERED,
        questionId,
        answer,
        authedUserId
    }
}

export function handleQuestionAnswered({questionId, answer, authedUserId}) {
    return (dispatch) => {
        _saveQuestionAnswer(
            {
                authedUser: authedUserId,
                qid: questionId,
                answer: answer
            }
        )
        .then(() => {
            dispatch(questionAnswered({questionId, answer, authedUserId}))
        })
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

export function handleAddNewQuestion(optionOne, optionTwo, authedUserId, history) {
    
    return (dispatch) => {
        _saveQuestion(
            {
                optionOneText: optionOne,
                optionTwoText: optionTwo,
                author: authedUserId
            }
        ).then((question) => {
            dispatch(addNewQuestion(question))
            history.push("/")
        })
    }
}
