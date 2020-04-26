import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import SignIn from './SignIn'
import Dashboard from './Dashboard'
import NewQuestion from './NewQuestion'
import Nav from './Nav';
import Poll from './Poll'
import LeaderBoard from './LeaderBoard';
import { handleInitialData } from '../actions/shared'

class App extends React.Component {

  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }

  render() {
    const { authedUserId } = this.props
    return (
      <div className='container'>
        <BrowserRouter>
          {
            authedUserId
              ? <React.Fragment>
                  <Nav/>
                  <Route path='/' exact component={Dashboard}/>
                  <Route path='/signin' component={SignIn}/>
                  <Route path='/newquestion' component={NewQuestion}/>
                  <Route path='/leaderboard' component={LeaderBoard}/>
                  <Route path='/questions/:question_id' component={Poll}/>
                </React.Fragment>
              : <Route path='/' component={SignIn}/>
          }
        </BrowserRouter>
      </div>
    )
  }
}

export default connect((state) => ({authedUserId: state.authedUserId}))(App)
