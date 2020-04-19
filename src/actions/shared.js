import { _getUsers, _getQuestions } from '../utils/_DATA'

export function handleInitialData() {
    return (dispatch) => {
        // TODO show loading bar
        Promise.all([_getUsers(), _getQuestions()])
            .then(([users, questions]) => {
                // TODO: dispatch loaded users
                // TODO: dispatch loaded questionss
                console.log("received users")
                console.log(users)
                console.log("received questions")
                console.log(questions)
                // TODO hide loading bar
            })
    }
}
