import React, { Component } from 'react'

class NewQuestion extends Component {

    render() {
        return (
            <form>
                <ul>
                    <li>Would you rather</li>
                    <li>Option a</li>
                    <li>Option b</li>
                </ul>
                <button>Submit</button>
            </form>
        )
    }
}

export default NewQuestion
