export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const QUESTION_ANSWERED = 'QUESTION_ANSWERED'

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
