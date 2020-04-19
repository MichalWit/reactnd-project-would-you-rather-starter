import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom'
import SignIn from './SignIn'
import Dashboard from './Dashboard'
import NewQuestion from './NewQuestion'
import Nav from './Nav';
import LeaderBoard from './LeaderBoard';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Nav/>
        <Route path='/' exact component={Dashboard}/>
        <Route path='/signin' component={SignIn}/>
        <Route path='/newquestion' component={NewQuestion}/>
        <Route path='/leaderboard' component={LeaderBoard}/>
      </BrowserRouter>
    </div>
  );
}

export default App;
